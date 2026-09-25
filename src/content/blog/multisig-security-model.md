---
title: "Multisig: What It Actually Protects You From"
date: "2026-08-21"
description: "How multisig works on Bitcoin and Ethereum, why MPC isn't the same thing, and why the largest multisig theft in history didn't break a single signature."
tags: ["security", "web3", "bitcoin", "ethereum", "protocols"]
---

# Multisig: What It Actually Protects You From

The pitch for multisig is that one key is a single point of failure. Lose it, and your funds are gone. Leak it, and someone else's funds are your funds no longer. Requiring several keys to authorize a spend fixes that.

It does. But the fix is narrower than most people assume, and the cost is larger. Multisig doesn't reduce risk so much as **trade one risk for a different one** — it converts key-theft risk into coordination risk, and coordination risk kills more wallets than people expect.

The best evidence for this is that the largest crypto theft ever recorded happened to a multisig wallet, and the attacker never broke a single signature. More on that below.

---

## The basic idea

An **m-of-n** scheme requires *m* signatures from a set of *n* keys. A 2-of-3 wallet has three keys; any two can spend.

Start with the arithmetic:

- **Theft resistance** goes up. An attacker needs *m* keys, not one.
- **Loss resistance** goes up. You can lose *n − m* keys and still spend.
- **Complexity** goes up. You now have *n* things to generate, store, back up, and eventually find again.

2-of-3 is the default recommendation for individuals because it's the smallest configuration that improves both theft *and* loss resistance simultaneously. 1-of-2 improves loss resistance and makes theft easier. 3-of-3 improves theft resistance and makes loss catastrophic. 2-of-3 is the only small configuration that moves both dials the right way.

For organizations the calculus differs. A DAO treasury running 5-of-9 isn't optimizing for lost keys; it's optimizing for the possibility that some of its signers are adversarial.

---

## Bitcoin: multisig as script

Bitcoin implements multisig at the script level, and its history is a decent tour of the last decade of Bitcoin engineering.

**Bare multisig** (2010) put all the public keys directly in the output script. It worked, and it was terrible: everyone could see your whole signer set, and you paid for those bytes.

**P2SH** (BIP 16, 2012) fixed the visibility problem by committing to a hash of the redeem script. The chain sees a hash. You reveal the script only when spending. This is where the `3...` addresses came from.

**P2WSH** (SegWit, 2017) moved the script witness out of the transaction body, cutting fees for multisig spends significantly.

**Taproot** (2021) changed the shape of the problem. With Schnorr signatures, keys and signatures are *linearly aggregatable* — a property ECDSA lacks. Several parties can combine their public keys into one aggregate key, and their signatures into one aggregate signature. The result is indistinguishable on-chain from a single-signer payment.

That last property matters more than the fee saving. A 2-of-3 P2WSH spend announces to the entire world, permanently, that it was a 2-of-3. A taproot key-path spend announces nothing.

### MuSig2 and FROST

Two schemes implement this in practice, and the difference between them is the thing to remember:

**MuSig2** (BIP 327) is an *n*-of-*n* protocol. Everyone signs, and the signatures aggregate into one. [BitGo reports roughly 47 vBytes saved per input](https://bitcoinops.org/en/bitgo-musig2/) against native SegWit multisig, around 30% lower fees. The catch is in the name: *n*-of-*n*. One unresponsive signer and nobody can spend. There is no threshold.

**FROST** (Flexible Round-Optimized Schnorr Threshold) *is* a threshold scheme — a subset of *m* signers can produce a valid aggregate signature. It also supports distributed key generation, meaning the full private key never exists anywhere, at any point, including at setup. No script-based multisig offers that property.

FROST is the more interesting technology and the less deployed one. In Bitcoin it remains largely experimental, with production use concentrated in specialized systems rather than general wallets. MuSig2 shipped first because *n*-of-*n* is a much easier problem.

Worth being clear about the tradeoff taproot introduces: script-path multisig is recoverable with just the script and the keys. Aggregated signing requires the signers to run an interactive protocol, which means a live coordination step and more state to lose. Privacy costs operational simplicity.

---

## Ethereum: multisig as a contract

Ethereum has no native multisig. An externally owned account is one key, full stop. So multisig is implemented as a **smart contract that holds the funds** and enforces its own rules about who may move them.

[Safe](https://safe.global/) is the dominant implementation. The contract stores an owner list and a threshold, collects EIP-712 signatures off-chain, and executes once the threshold is met.

The consequences of doing it this way are significant and cut both directions.

**In favor:** the rules are arbitrary code. You get spending limits, time delays, role separation, module systems, and social recovery — none of which Bitcoin script can express. Changing your signer set is a transaction, not a migration to a new address. That last point is a bigger operational advantage than it sounds.

**Against:** your funds now sit behind a program, and programs have bugs. You've added the contract's correctness — and its upgrade mechanism — to your threat model. A Bitcoin multisig can't be drained by a logic error, because there's no logic beyond signature checking.

---

## MPC is not multisig

These get conflated constantly, including by people selling them. The distinction is simple and it matters:

|  | Multisig | MPC / TSS |
|---|---|---|
| **Keys** | *n* genuinely separate keys | One key, split into *n* shares |
| **Enforced by** | The blockchain | Cryptography, off-chain |
| **On-chain footprint** | Visible (unless taproot-aggregated) | A single ordinary signature |
| **Chain support needed** | Yes — script or contracts | None |
| **Change the quorum** | On-chain transaction, or new address | Refresh shares, address unchanged |
| **Auditable after the fact** | Yes, the chain records it | No |

The critical difference is **where the rule lives**. Multisig's threshold is enforced by consensus — the network itself will reject an under-signed transaction. MPC's threshold is enforced by the signing protocol. If that protocol is implemented incorrectly, or the machines running it are compromised together, nothing at the chain layer catches it.

MPC's advantages are real: it works on chains with no multisig support, it's cheaper, it leaks nothing, and you can rotate shares without moving funds. It's the right answer for exchanges and custodians managing thousands of wallets across dozens of chains.

But an MPC wallet does not leave an on-chain record that a policy was followed. A Safe does. For a DAO treasury where the point is public verifiability, that's disqualifying.

---

## What Bybit actually taught us

In February 2025, roughly **$1.44 billion** left Bybit's Ethereum cold wallet. It was the largest theft in the history of the industry. The wallet was a Safe multisig, properly configured, with signers on hardware wallets.

Every signature was valid. Every key stayed secret. The cryptography worked perfectly.

The attackers compromised a Safe developer's machine, reached Safe's cloud infrastructure, and [modified the multisig frontend's JavaScript](https://www.nccgroup.com/research/in-depth-technical-analysis-of-the-bybit-hack/) so that when Bybit's signers reviewed a transaction, the interface showed them a benign transfer while the payload they actually signed replaced the wallet's implementation contract with the attacker's.

The signers approved what they were shown. They were shown a lie.

Three things follow from this, and they generalize well beyond Safe:

**1. Multisig protects the signature layer. The attack came through the display layer.** Requiring more signers does nothing when every signer is looking at the same compromised screen. In fact it can actively hurt: the more signers a transaction has, the more each individual assumes someone else checked it properly.

**2. Blind signing is the actual vulnerability.** Hardware wallets showed the signers a hash. A hash is not information. The defense is independent verification — a second device, on separate infrastructure, decoding the calldata and telling you in words what the transaction does. Bybit's signers had no such channel.

**3. Attack surface is a security property.** Bybit's Safe supported `delegatecall`, a general mechanism they did not need for cold storage. [A purpose-built contract exposing only what they used](https://www.certora.com/blog/bybit-hack-multisig-wallet-security) would have made this specific attack impossible. General-purpose wallet contracts are convenient and each unused feature is a door.

There's a real irony in the aftermath. [EIP-7702 gets criticized](https://www.fireblocks.com/blog/security-first-approach-to-eip-7702) for letting EOAs delegate to arbitrary contracts, which sounds like exactly this attack made easy. But 7702 requires a *distinct, dedicated* signature type to authorize a delegation — it can't be smuggled inside something that looks like a transfer. The Bybit attack works precisely because the generic EIP-712 signing flow can't distinguish "send money" from "replace the wallet."

---

## The operational reality

Most multisig failures are boring. They're not attacks.

**Quorum loss.** In a 2-of-3, losing two keys loses everything. People underestimate this because they picture three independent events, but the events are correlated — keys stored in one house share a fire, keys in one password manager share a breach, keys held by three co-founders share a falling-out.

**Backup complexity scales badly.** Bitcoin multisig recovery needs the keys *and* the wallet descriptor — the output descriptor or the xpubs and script type. Back up three seed phrases and lose the descriptor and you may be unable to reconstruct the addresses at all. This has happened to real people with real money.

**Inheritance gets harder, not easier.** Explaining a 2-of-3 to someone who will need to use it while grieving, possibly years from now, on software that has since changed, is a hard design problem. Miniscript and policy languages like [Liana's](https://wizardsardine.com/liana/) time-locked recovery paths address this directly and belong in any inheritance threat model.

**Signer coordination has a cost.** A 3-of-5 across timezones means some transactions take days. Organizations respond by keeping a hot wallet for operations — which is fine, as long as everyone stays honest about how much sits in it.

---

## Choosing

Start from what you're actually defending against. The threat model determines the answer, and the answers differ:

**One person, meaningful savings, single chain.** 2-of-3, keys in three physically separate locations, at least one of them not your home. Back up the descriptor alongside the seeds. Test recovery *before* funding it, with a trivial amount, and test it again yearly.

**One person worried about a backdoored hardware RNG.** Multisig helps here in a way that's easy to miss — an attacker who has predicted one device's entropy still needs the others. Combined with [dice-generated entropy](/blog/true-randomness-and-dice), this closes a real gap.

**A team or DAO treasury.** Safe, threshold matched to your actual governance rather than to a number that sounds serious, and a hard requirement that at least one signer verifies calldata on independent infrastructure. Bybit is the argument for that last part.

**An institution across many chains.** MPC, with the understanding that you've moved the trust boundary into your provider's implementation and lost the on-chain audit trail.

**Anything where the public needs to verify the rules were followed.** On-chain multisig. This is the one case where MPC is simply the wrong tool.

---

## The uncomfortable summary

Multisig is a good primitive, and it defends a narrower perimeter than its reputation suggests. It answers "what if one key is stolen or lost." It has essentially nothing to say about a compromised interface, a malicious signer, a coerced signer, or a set of signers who all trust the same screen.

The industry's largest loss was a multisig wallet where the cryptography performed flawlessly. That should be the starting point for anyone designing a setup, not a footnote.

Add signers only where the extra key reduces a risk you're actually afraid of. Then spend the remaining effort on the part that failed at Bybit: knowing what you're signing.

---

## Further reading

- [BIP 327 (MuSig2)](https://github.com/bitcoin/bips/blob/master/bip-0327.mediawiki) — the two-round multisignature spec for Schnorr
- [MuSig2 and FROST explained](https://blog.bitbox.swiss/en/musig2-and-frost-explaining-multisignature-schemes-on-taproot/) — the clearest side-by-side of the two taproot schemes
- [NCC Group: technical analysis of the Bybit hack](https://www.nccgroup.com/research/in-depth-technical-analysis-of-the-bybit-hack/) — the full incident breakdown
- [Certora on multisig wallet security](https://www.certora.com/blog/bybit-hack-multisig-wallet-security) — the attack-surface argument, and why cold storage shouldn't support delegatecall
- [Safe documentation](https://docs.safe.global/) — modules, guards, and the contract architecture
- [Safe's own MPC vs multisig comparison](https://safe.global/blog/mpc-wallet-vs-multisig-what-s-the-difference-) — partisan, but technically accurate on the distinction
- [Where Randomness Actually Comes From](/blog/true-randomness-and-dice) — multisig assumes your keys were generated unpredictably; that assumption deserves its own scrutiny
