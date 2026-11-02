---
title: "Kohaku: Ethereum's Privacy Problem Is in the Wallet"
date: "2026-11-01"
description: "Ethereum already has private transactions, and almost nobody uses them. Kohaku is the Ethereum Foundation's attempt to fix that in the wallet: what a wallet leaks, what Kohaku does about it, and what works today."
tags: ["web3", "ethereum", "privacy", "protocols"]
series: wallets-keys
atUri: "at://did:plc:l72dcexjk4ytyh4nhy5vtix4/site.standard.document/3mzbwjvyq4s2t"
---

# Kohaku: Ethereum's Privacy Problem Is in the Wallet

On November 3, Nicolas Consigny and Vitalik Buterin are [scheduled to go on stage at Devcon](https://crypto.news/ethereum-foundation-default-wallet-privacy-kohaku/) with a talk called "Kohaku: privacy for everyone, by default," and to demonstrate it on Ethereum mainnet using Ambire Wallet.

Ethereum already has private transactions. Tornado Cash, Railgun and Privacy Pools are all live, and I've [written about the protocols](/blog/privacy-in-crypto) before. The problem is that almost nobody touches them. Privacy Pools, which grew out of Buterin's own research, had handled [about $6 million from some 1,500 users](https://thedefiant.io/news/defi/0xbow-raises-usd3-5-million-to-expand-privacy-pools) at the last count I could find. And Buterin's complaints aren't about cryptography. They're about [extra seed phrases, no multisig support in private pools, unreliable broadcasters](https://www.tradingview.com/news/cointelegraph:26954e03d094b:0-why-kohaku-is-central-to-ethereum-s-2025-privacy-shift/), and flows clunky enough to push people back to centralized exchanges.

Kohaku is the Ethereum Foundation's bet that the missing piece is the wallet. This post is about what a wallet actually leaks, what Kohaku does about each leak, and what works two days before the demo.

---

## Four places a wallet leaks

Most writing on crypto privacy, mine included, starts with the public ledger. But a wallet gives you away in at least four places, and the ledger is only one of them.

![A wallet talks to four parties. The dapp sees the same address everywhere, the RPC sees your addresses and IP, the first hop of a broadcast sees which IP sent the transaction, and the chain shows everything forever. Each has a different fix: one address per dapp, a light client and private reads, P2P or Tor, and shielded pools.](diagram:kohaku-leaks)

- **The dapp.** Connect one address everywhere and every dapp sees your whole history, and anyone can join your activity across them.
- **The RPC.** Your wallet doesn't read the chain. It asks a server, in plain text and from your IP, for the balances of your addresses. In 2022 ConsenSys [said](https://www.theblock.co/post/189717/terms-service) that Infura would collect IP and wallet addresses on transactions when it was MetaMask's default.
- **The broadcast.** Whoever receives your transaction first learns which IP it came from.
- **The chain.** Everything onchain is public, forever.

A shielded pool only fixes the last one. Say you withdraw to a fresh address. The chain shows no link between the old address and the new one. But your wallet now checks both balances, from one IP, through one RPC, so that server can link them anyway. Privacy at one layer gets undone by the layer next to it.

![The pool removes the link onchain. The balance check brings it back at the RPC.](diagram:kohaku-relink)

That's the argument for doing this in the wallet: it's the only piece of software that touches all four.

---

## What Kohaku is

The Foundation [announced it in October 2025](https://blog.ethereum.org/2025/10/08/privacy-commitment), as part of a 47-person Privacy Cluster: "a new reference implementation of a privacy-preserving wallet and an open-source wallet SDK." So it's two things:

- **An SDK** that other wallets can build on, in [TypeScript](https://github.com/ethereum/kohaku) and [Rust](https://github.com/ethereum/kohaku-rs).
- **A reference wallet**, a browser extension forked from Ambire. The [roadmap](https://notes.ethereum.org/@niard/KohakuRoadmap) is blunt about who it's for: it "will not be a consumer oriented product."

The SDK is the point. Nobody is meant to switch to the Kohaku wallet. The aim is that the wallet you already have gains these features, because privacy tools fail when they require a separate app. The market got this immediately: Railgun's token rose [almost 300%](https://www.dlnews.com/articles/defi/railgun-token-soars-as-ethereum-foundation-integrates-protocol-into-kohaku/) within two days of the announcement, on the prospect of being integrated rather than visited.

---

## Shielding from a normal wallet

The docs state the pitch in two sentences: ["You implement one host. Each protocol plugin does the rest."](https://ethereum.github.io/kohaku/) A wallet supplies a chain provider, storage and keys. Each privacy protocol sits behind the same calls: shield, balance, unshield. The protocols themselves are quite different:

| Protocol | How it hides you | What it asks of you |
| --- | --- | --- |
| Tornado Cash | Fixed pools of 0.1, 1, 10 and 100 ETH | Round amounts, split across pools |
| Privacy Pools | A proof that your deposit belongs to an approved set | A vetting fee, and approval before a private withdrawal |
| Railgun | Private balances you can transfer and use in DeFi | A shielded address of its own |

Then comes the gas problem. A fresh address holds no ETH, and if you fund it from an address you've already used, you've just linked the two. The usual answer is a relayer, a third party that submits your withdrawal and takes its fee from the proceeds. That's the "unreliable broadcasters" in Buterin's list: each protocol has its own.

![An ordinary address deposits into a shielded pool, in public. A proof goes to a bundler, a paymaster covers gas out of the withdrawal, and a fresh address with no ETH receives the funds. Nothing visible connects the deposit to the withdrawal.](diagram:kohaku-withdraw)

Kohaku's default is ERC-4337, the standard route for account abstraction. The wallet builds a user operation containing the proof, a bundler submits it, and a paymaster covers gas and [prices it into the withdrawal](https://github.com/ethereum/kohaku/blob/master/docs/pages/privacy-pools/withdrawals.mdx). "The user's public account does not need ETH for gas." One shared route replaces a separate relayer network for each protocol.

The deposit itself stays public: it's sent from your ordinary address, for anyone to see. A pool can't hide that you used it. It hides which withdrawal was yours, and how well depends on how many other people are in it.

---

## Correct isn't the same as private

The read side is the most interesting part of the design, because it separates two problems that are easy to confuse.

An RPC can lie to you, and it can spy on you. A light client solves the first. Kohaku's provider package wraps [Helios](https://github.com/a16z/helios) and Colibri, which check the RPC's answers against the chain themselves. The roadmap words this carefully: Helios "removes the need to trust RPC providers for **validity**." The wallet still has to ask somebody for the data, so that somebody still sees the question.

Hiding the question is harder, and there are three approaches in progress:

- **Tor.** The [`anon` provider](https://github.com/ethereum/kohaku/blob/master/packages/provider/README.md) hides your IP from the endpoint. It doesn't hide what you asked, and for now it's a browser-only proof of concept.
- **TEE plus ORAM.** A server inside a secure enclave, using oblivious RAM so that even its memory access pattern doesn't reveal which addresses you read. [Oblivious Labs](https://hackmd.io/@tkmct/BywaGeY2le) is building this one, and it moves the trust to Intel's hardware.
- **PIR.** Private information retrieval: the server answers your query without learning what it was, using cryptography alone. The roadmap calls this the longer-term goal. The Foundation's [Reads team](https://reads.ethereum.foundation/roadmap/) lists a mainnet demo with Kohaku for Q4 2026, serving ETH balances, nonces, top ERC-20 balances and ENS names from GPUs, with production-ready PIR in 2027.

![A light client checks the answers, Tor hides your IP, and TEE plus ORAM and PIR hide what you asked.](diagram:kohaku-reads)

---

## The rest of the roadmap

The other leaks and the security half are at different stages:

- **One address per dapp.** The [roadmap](https://notes.ethereum.org/@niard/KohakuRoadmap)'s default is to prompt for a new address whenever you connect to a dapp. This one sounds trivial and isn't: funds then sit across many addresses, and moving them between those addresses must not link them, which is why it depends on the shielded pools.
- **P2P broadcast.** An option to send transactions directly to the peer-to-peer network, skipping the RPC.
- **Social recovery.** A [new package](https://github.com/ethereum/kohaku/tree/master/packages/social-recovery), first released on October 28, aimed at methods like zkPassport, Anon Aadhaar and passkeys, so that "extra seed phrases" stops being the backup plan. This release ships interfaces and formats, with the clients still to come.
- **Post-quantum accounts.** A [4337 account](https://github.com/ethereum/kohaku/tree/master/packages/pq-account) that verifies two signatures, the current kind and a post-quantum one (Falcon or ML-DSA), so you aren't betting everything on either.
- **Hardware wallets.** Shielded protocols rely on ZK-friendly curves like Jubjub and Bandersnatch, so the roadmap wants a "ZK hardware signer" that lets a device work with them. This also raises the stakes for [clear signing](/blog/clear-signing): a device has to show you something meaningful about a private transaction it can only partly describe.

![The account checks a current signature and a post-quantum one on every operation.](diagram:kohaku-pq)

Further out, the roadmap wants the wallet "as close as possible to the silicon / kernel," which it says means a native Ethereum browser. The Rust repo also lists two experimental immutable privacy protocols, `tint` and `msp`, targeting the Hegota fork.

---

## Where it stands

The coverage tends to describe the roadmap as if it were the product, so here's what the repositories showed on November 1, 2026.

| Piece | Status |
| --- | --- |
| Privacy Pools plugin | Alpha (`0.1.0-alpha.35`), still undergoing audits |
| Tornado Cash plugin | Alpha (`0.1.0-alpha.32`), still undergoing audits |
| Railgun plugin | [A placeholder](https://github.com/ethereum/kohaku/tree/master/packages/railgun), "while the real implementation is reintroduced"; a Rust crate is listed as an experiment |
| Reference wallet | [Sepolia testnet only](https://github.com/ethereum/kohaku-extension), with a prebuilt demo from March 2026 |
| Light clients | Helios and Colibri adapters |
| Tor reads | Browser-only proof of concept |
| PIR reads | Experimental branch, mainnet demo planned |
| Social recovery | Alpha, interfaces and formats |
| Post-quantum accounts | Deployed on testnets |

The top of the repo carries the warning that matters: "NOT READY FOR PRODUCTION USE. Packages contain UNAUDITED CODE." There's [no public release date](https://crypto.news/ethereum-foundation-default-wallet-privacy-kohaku/).

The Railgun line is the surprising one. Railgun is the protocol used in the [November 2025 demo](https://www.theblock.co/post/379149/vitalik-buterin-unveils-kohaku-privacy-focused-framework-ethereum), the one that saw its token jump, and the only one of the three offering private DeFi rather than private withdrawals. In the JavaScript SDK it's currently a stub, and the repo doesn't say why. That's a snapshot, not a verdict: the project is shipping alpha releases almost daily, and Ambire says it has spent months on integrations.

![The same four leaks, by how far the code had got. My reading of the repositories on November 1, 2026.](diagram:kohaku-today)

---

## What it won't fix

**The anonymity set.** Everything here depends on how many people are in the pool. That's the [same weakness I described in Zcash](/blog/privacy-in-crypto): optional privacy leaves you with a small crowd, and a small crowd hides nobody. A wallet integration only helps if it brings ordinary users in, which is why "by default" is the phrase carrying the most weight in that talk title. An opt-in button in an advanced menu is not a default.

**The law.** The Treasury [lifted its sanctions on Tornado Cash](https://home.treasury.gov/news/press-releases/sb0057) in March 2025, while saying it remained "deeply concerned" about North Korean laundering. That didn't end the matter for its developers. Roman Storm was [convicted in August 2025](https://cointelegraph.com/news/roman-storm-retrial-delayed-april-2027) of conspiring to run an unlicensed money-transmitting business, and his retrial on the remaining counts is set for April 2027. An Ethereum Foundation project is shipping a Tornado Cash client while that's unresolved.

**The politics of screening.** Privacy Pools' answer to regulators is that an association set can keep out flagged deposits. For part of the community, [that's a slippery slope](https://www.tradingview.com/news/cointelegraph:26954e03d094b:0-why-kohaku-is-central-to-ethereum-s-2025-privacy-shift/), and Kohaku doesn't settle it. It just offers both kinds of pool.

**Wallet quality.** [An SDK can't force a good interface](https://www.tradingview.com/news/cointelegraph:26954e03d094b:0-why-kohaku-is-central-to-ethereum-s-2025-privacy-shift/), and a wallet juggling more keys, recovery paths and privacy toggles has more ways to go wrong. A single sloppy integration that leaks metadata would also be invisible to its users, which is the worst way for privacy software to fail.

**The on-ramp.** Buy on an exchange that knows your name and the deposit into the pool still [starts from your identity](/blog/privacy-in-crypto).

---

## What to look for on November 3

"Privacy for everyone, by default" is a much bigger claim than the repo currently supports, and a stage demo can blur that. Three questions will tell you how far along it really is:

1. **Which pool does it use?** Railgun would mean the integration is back. Privacy Pools or Tornado Cash would be a sign of what's actually ready.
2. **Where do the reads go?** If the balance after a shielded withdrawal still comes from an ordinary RPC, the demo has fixed one leak out of four.
3. **What's the default?** Whether a new Ambire user gets any of this without changing a setting is the only thing that moves the anonymity set.

As Buterin [put it](https://www.theblock.co/post/379149/vitalik-buterin-unveils-kohaku-privacy-focused-framework-ethereum) a year ago: "We're in this very last mile stage." The last mile was always going to be the wallet. It's also the part where cryptography stops being the hard problem, and product work takes over.

---

## Further reading

- [Kohaku roadmap](https://notes.ethereum.org/@niard/KohakuRoadmap): Nicolas Consigny's feature list, still the clearest statement of the project's scope
- [Kohaku docs](https://ethereum.github.io/kohaku/): the wallet developer guide for the Privacy Pools and Tornado Cash plugins
- [The Ethereum Foundation's Commitment to Privacy](https://blog.ethereum.org/2025/10/08/privacy-commitment): the Privacy Cluster announcement
- [Ethereum Foundation Reads roadmap](https://reads.ethereum.foundation/roadmap/): the private reads work, including PIR and anonymous RPC
- [Privacy in Crypto](/blog/privacy-in-crypto): the protocols underneath, including Railgun and what happened to Tornado Cash
- [A maximally simple L1 privacy roadmap](https://ethereum-magicians.org/t/a-maximally-simple-l1-privacy-roadmap/23459): Buterin's shorter list of what Ethereum should do
