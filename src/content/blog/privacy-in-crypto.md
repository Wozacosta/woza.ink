---
title: "Privacy in Crypto: Monero, Zcash, and What Ethereum Is Trying to Become"
date: "2026-03-15"
description: "Every transaction on a public blockchain is permanently visible to anyone. Here's how Monero, Zcash, and Ethereum's RAILGUN are trying to fix that — and what they're each betting on."
tags: ["web3", "ethereum", "privacy", "protocols", "blockchain"]
---

# Privacy in Crypto: Monero, Zcash, and What Ethereum Is Trying to Become

Every transaction you make on Ethereum is public. Not just visible to the person you sent money to — visible to everyone, forever, indexed and searchable. Your wallet address is a permanent identifier. Every app you've ever used, every token you've ever held, every protocol you've ever interacted with is on-chain and traceable. Nansen, Etherscan, Arkham — tools that make this analysis effortless — treat this transparency as a feature.

For most use cases, it's not. Businesses don't publish their bank statements. Individuals don't post their salary history and spending habits publicly. Privacy isn't about hiding wrongdoing; it's a baseline expectation in financial systems that public blockchains simply don't provide.

The crypto privacy ecosystem is the attempt to fix this. It's split into two broad approaches: purpose-built privacy chains, and privacy as a layer on top of existing infrastructure. Monero and Zcash represent the first. Ethereum's RAILGUN represents the second. They make fundamentally different bets about where privacy should live.

---

## Why blockchain is so un-private by default

Before getting into solutions, it's worth being precise about the problem.

Bitcoin and Ethereum use a transparent ledger model. Every account balance, every transaction, every smart contract interaction is stored in full and publicly accessible. This is the design — it's what makes the state verifiable without trusting a central server.

The consequence: if anyone ever links your wallet address to your real identity — through an exchange KYC, a public ENS name, a tweet with your address, anything — your entire transaction history becomes retroactively de-anonymized. Not just future transactions. Everything, going back to the first time that wallet was ever used.

"Pseudonymous" is the word people use. But pseudonymity is weak. Chain analysis firms have become sophisticated enough that even multi-hop transaction paths can often be traced. The privacy guarantee is much thinner than most users assume.

The demand for something better is real and legitimate. Doctors can't reveal that a client paid for a consultation. Companies have competitive reasons not to broadcast who they're paying. Individuals have a basic interest in not having their spending patterns permanently visible to anyone who cares to look.

---

## Monero: privacy by default, at the protocol level

[Monero](https://www.getmonero.org/) (XMR) launched in April 2014 as a fork of the CryptoNote reference codebase. Its design premise is simple and uncompromising: every transaction should be private, mandatory, for everyone, all the time. There's no "transparent mode." Privacy isn't an option — it's the protocol.

Three cryptographic mechanisms do the work:

**Ring signatures** obscure the sender. When you send XMR, your transaction is bundled with a ring of other outputs from the blockchain — decoys. An observer can see that one of the ring members sent funds, but can't determine which one. The ring size (number of decoys) has grown over time; it's currently 16, making the decoy set large enough to provide meaningful cover.

**Stealth addresses** obscure the receiver. Rather than sending to a static public address (as you would on Ethereum), each Monero transaction generates a one-time address for that specific payment. The sender derives it from the recipient's public key; only the recipient can identify it as theirs. To an outside observer, there's no link between a payment and the recipient's known address.

**RingCT** (Ring Confidential Transactions) obscures the amount. Implemented in January 2017 and mandatory by September of the same year, RingCT hides the value of every transaction using a cryptographic commitment scheme called Pedersen commitments. The network can verify that inputs equal outputs (no money created from nothing) without knowing what the actual amounts are.

Together, these three mechanisms mean that on Monero, the sender, receiver, and amount of every transaction are hidden by default. This is qualitatively different from Bitcoin or Ethereum — not privacy added on top, but privacy built into the base layer.

Monero also uses [Dandelion++](https://arxiv.org/abs/1805.11060) for broadcast privacy — transactions propagate through the network in a way that makes it harder to correlate a transaction with the IP address that first broadcast it.

**The tradeoffs are real.** Ring signatures are much larger than regular signatures — Monero transactions are significantly heavier than Bitcoin transactions at the same economic throughput. The ASIC-resistant RandomX proof-of-work algorithm is intentional: Monero prioritizes CPU mining to maintain broad decentralization. Monero has also faced delisting pressure from regulated exchanges precisely because its privacy is so strong that compliance tools can't analyze its blockchain. That's the point, but it has practical consequences for liquidity and accessibility.

**The honest picture:** Monero is the most private major cryptocurrency in active use. It's also an island. It doesn't compose with the broader DeFi ecosystem, it runs its own chain with its own liquidity, and you can't use Monero to interact with Ethereum protocols. If financial privacy is your primary need and you're transacting in XMR, it's hard to beat. But it's a separate world from what most of crypto is building.

---

## Zcash: optional privacy with zero-knowledge proofs

[Zcash](https://z.cash/) (ZEC) launched in October 2016, created by a group of cryptographers from Johns Hopkins, MIT, and other institutions. Its founding technology is the first real-world deployment of zk-SNARKs (Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge) — a cryptographic primitive that lets you prove a computation was done correctly without revealing the inputs.

The Zcash insight: you can prove that a transaction is valid (sender had the funds, the amounts balance, no double-spending) without revealing the sender, receiver, or amount. The math does the verification; the data stays private.

Zcash has two address types:

**Transparent addresses** (t-addresses) work like Bitcoin — fully public, on-chain. All the transparency problems of Bitcoin apply.

**Shielded addresses** (z-addresses, and more recently unified addresses) use zk-SNARKs to fully encrypt the transaction. Sender, receiver, and amount are all hidden. The blockchain records that a valid shielded transaction occurred; it reveals nothing else.

This duality is both Zcash's strength and its persistent weakness. In theory, optional privacy lets Zcash work with regulated exchanges and compliance tools that need some level of visibility. In practice, if most users stick to transparent addresses (which historically they have — shielded usage has been growing but took years to become significant), the anonymity set for shielded transactions is small. A small anonymity set weakens privacy guarantees: if very few people are using shielded addresses, the pool of possible senders and receivers is small enough to narrow inference.

The cryptography is genuinely impressive. The original Groth16 zk-SNARK that Zcash used required a trusted setup — a ceremony where participants generated cryptographic parameters that had to be discarded. If anyone in the ceremony kept their "toxic waste" portion, they could theoretically forge transactions undetected. Zcash ran elaborate multi-party ceremonies (Sprout and Sapling) to mitigate this. Electric Coin Co.'s subsequent breakthrough, [Halo](https://electriccoin.co/blog/explaining-halo-2/), eliminates the trusted setup requirement entirely — a significant cryptographic advance.

**The tradeoffs:** Generating a shielded Zcash transaction is computationally expensive (though this has improved significantly with newer proving systems). Zcash has faced similar exchange delistings as Monero, despite the transparent/shielded choice. And Zcash, like Monero, is a standalone chain — it doesn't compose with Ethereum's DeFi ecosystem.

**The honest picture:** Zcash is the most cryptographically sophisticated privacy coin, with a research pedigree that's influenced much of the broader zero-knowledge space. The optional nature of privacy is a genuine weakness in practice — privacy guarantees require large anonymity sets, which requires most users to use shielded mode. That's an adoption problem, not a cryptography problem.

---

## The Ethereum privacy problem: why purpose-built coins aren't enough

Monero and Zcash are impressive solutions, but they exist in isolation. The vast majority of DeFi — lending, trading, yield, NFTs, DAOs — lives on Ethereum and EVM-compatible chains. You can't use Monero to interact with Aave. You can't use Zcash to swap on Uniswap.

This creates a fork-in-road for users who want privacy: either stay in the isolated Monero/Zcash ecosystems, or accept full transparency whenever you want to participate in Ethereum's financial infrastructure.

The privacy problem on Ethereum is also qualitatively different from just "who sent money to whom." On Ethereum, every DeFi interaction — every swap, every liquidity position, every loan — is on-chain. Sophisticated traders have entire strategies that get front-run because they're visible in the mempool before confirmation. Professional traders and funds have alpha that's systematically exploited because their positions are readable. Lawyers and doctors who accept crypto payments can't maintain client confidentiality on a public ledger.

This is the gap that Ethereum-native privacy solutions are trying to fill.

---

## Tornado Cash and what happened to it

The first major Ethereum privacy tool was [Tornado Cash](https://tornado.cash/) — a smart contract mixer that worked by pooling deposits and allowing withdrawals to different addresses. You'd deposit 1 ETH into the pool; someone else would withdraw 1 ETH to a fresh address. By breaking the on-chain link between deposit and withdrawal, it provided basic anonymity.

Tornado Cash worked. It also became the primary tool for laundering crypto stolen in major hacks — the Lazarus Group (a North Korea state hacking outfit) used it extensively after the Ronin Bridge hack, the Harmony Bridge hack, and others. In August 2022, the US Treasury's OFAC [sanctioned Tornado Cash](https://home.treasury.gov/news/press-releases/jy0916), designating it as a Specially Designated National — the same classification used for terrorist organizations and state adversaries.

The sanctions were unprecedented and legally contested. OFAC wasn't sanctioning a company or a person — they were sanctioning immutable open-source code deployed on a blockchain. A Dutch court initially convicted the protocol's developer Roman Storm on money laundering charges; the legal fight over whether writing and deploying privacy software constitutes a crime is ongoing.

The Tornado Cash episode established something important: a fully anonymous mixer with no compliance tooling will be targeted, and the people who built it will face legal consequences regardless of the tool's stated purpose.

---

## RAILGUN: ZK privacy on Ethereum, with compliance built in

[RAILGUN](https://railgun.org/) is the current state-of-the-art attempt to provide Ethereum-native privacy while addressing the regulatory lessons of Tornado Cash.

The technical approach: RAILGUN is a system of smart contracts on Ethereum (and Arbitrum, Polygon, BSC) that uses zk-SNARKs to shield ERC-20 tokens and NFTs. When you shield assets into RAILGUN, they enter an encrypted balance state associated with your `0zk` address — a RAILGUN-specific private address. From that point, your balances, transfers, and DeFi interactions are encrypted and invisible on-chain.

What makes RAILGUN different from a mixer:

**It stays on Ethereum.** There's no bridge, no separate chain, no fragmented liquidity. Shielded tokens are still Ethereum tokens. You can interact with DeFi protocols — swap on Uniswap, lend on Aave — from within the RAILGUN privacy system. This is possible because RAILGUN can generate ZK proofs that authorize specific contract interactions without revealing the calling address. The DeFi protocol sees a valid interaction; it doesn't see who initiated it.

**Composable privacy.** Because you can do DeFi while shielded, there's an economic incentive to stay shielded longer. In a mixer, you deposit, wait, withdraw, use. In RAILGUN, you deposit, then trade, borrow, earn, transfer — all while shielded. The longer users stay in the shielded pool, the larger the anonymity set grows, which improves privacy for everyone. This is structurally better than a simple mixer.

**Compliance tooling built in.** RAILGUN ships with three mechanisms designed for the post-Tornado Cash world:

- **Viewing keys:** Shareable read-only keys that reveal the origin of funds to a designated third party (auditor, regulator, employer) without exposing anything to the public. You can prove your transaction history without making it public.
- **Private Proofs of Innocence:** Zero-knowledge proofs that demonstrate non-interaction with flagged addresses without revealing anything about your actual transaction history. You prove you're not a bad actor without revealing who you are.
- **Tax exports:** Transaction history exports for tax software, accessible to the wallet holder.

The combination is deliberate: privacy for the public, disclosure for those you choose, provable non-interaction with sanctioned entities. This is the design response to "but what about money launderers?" — not "trust us," but "here's a cryptographic proof that these funds didn't pass through sanctioned addresses."

**Governance and decentralization.** RAILGUN has no company behind it — it's governed by `$RAIL` token holders. The contracts are immutable and publicly verifiable. The RAIL token is purely for governance, not required to use the protocol.

**Honest limitations.** RAILGUN is newer than Monero or Zcash, and its anonymity set is still growing. The privacy guarantee is only as strong as the number of users shielding assets — a small shielded pool is more traceable than a large one. ZK proof generation on mobile has improved dramatically but is still non-trivial. And the regulatory environment for any privacy tool is uncertain; RAILGUN's compliance features don't guarantee it won't face the same treatment as Tornado Cash.

---

## Comparing the approaches

| | Monero | Zcash | RAILGUN |
|---|---|---|---|
| Privacy model | Protocol-level, mandatory | Optional (transparent/shielded) | Smart contract ZK shielding |
| Underlying chain | Monero L1 | Zcash L1 | Ethereum / EVM |
| DeFi composability | None | None | Full — swap, lend, earn while shielded |
| Cryptography | Ring sigs + RingCT + stealth | zk-SNARKs (Sapling/Orchard) | zk-SNARKs |
| Compliance tools | None | Viewing keys | Viewing keys + POI + tax exports |
| Exchange listings | Delisted from many major exchanges | Partial listings | N/A (token, not required to use) |
| Anonymity set | All Monero users | Shielded Zcash users only | All RAILGUN shielded users |
| Status | Mainnet, active | Mainnet, active | Mainnet, Ethereum + 3 other chains |

---

## The regulatory reality

Privacy in crypto exists in a hostile regulatory environment. The argument that privacy tools serve primarily criminal purposes conflates the tool with its worst use case. Cash is private. Lawyers are bound by confidentiality. Banking systems have privacy protections. The expectation that all financial activity should be permanently public is new, specific to blockchain, and not a principle that applies anywhere else.

But the regulatory trajectory is real. OFAC's Tornado Cash sanctions were upheld in key respects even as they were challenged. The EU's travel rule requires identifying information for crypto transfers. Exchanges face pressure to delist assets with strong privacy features.

The practical consequence: privacy tools that offer no compliance path face increasing legal risk. Monero and Zcash have faced and will continue to face exchange delistings. RAILGUN's compliance architecture is a deliberate attempt to offer a different answer — not "trust the tool," but "here's cryptographic proof of legitimacy, verifiable without revealing private information."

Whether that's sufficient legally is an open question. Whether it's the right design direction is a different question, and most people who think about this seriously say yes — privacy with selective disclosure is more defensible than either full transparency or full opacity.

---

## P2P exchanges: the last mile problem

There's a practical problem that all privacy coins run into: how do you get them in the first place?

The standard path — buy on a centralized exchange, withdraw to your wallet — immediately undermines the privacy. Coinbase, Kraken, Binance all require KYC. When you withdraw Monero from a KYC'd exchange, the exchange has a record of your identity linked to the receiving address. You've linked your real name to the first transaction in your shielded history. Everything after is private; the entry point isn't.

This is why peer-to-peer exchanges exist — platforms where you can buy and sell crypto directly with another person, often for cash or bank transfer, without a central intermediary recording your identity. The privacy coin community has historically depended on them heavily.

**LocalMonero and AgoraDesk** were the two main P2P platforms specifically built for Monero. LocalMonero launched in 2017 as a LocalBitcoins-style marketplace for XMR trades — sellers post offers, buyers respond, trades execute with an escrow system and a dispute resolution layer. At its peak it was the primary way to acquire Monero without KYC. AgoraDesk was its sister platform for Bitcoin.

Both shut down in May 2024. The team cited "a changed landscape" — a phrase widely understood to mean regulatory pressure — and gave six months of notice for users to withdraw funds. The closure was a significant blow to the Monero ecosystem's on-ramp infrastructure. No successor platform of the same scale has fully emerged.

**Haveno** is the most serious attempt to fill the gap. It's a decentralized, non-custodial exchange built specifically for Monero, forked from the Bisq codebase and modified to use XMR as the base currency. Trades run on Tor, there's no central server, and the protocol uses Monero's multisig for escrow — the exchange itself holds nothing. 

Haveno reached mainnet readiness in late 2024, with third-party networks operating since then. The user experience is still rough in places (it's desktop software, not a slick web app), and liquidity is thin compared to LocalMonero at its peak. But the architecture is more censorship-resistant than any hosted platform — there's nothing to shut down because there's no company and no central server.

**Bisq** is the equivalent for Bitcoin — a long-running decentralized P2P exchange with a desktop client, Tor routing, no KYC, and multisig escrow. It doesn't support Monero directly, but it's the reference implementation for the P2P exchange model that Haveno is built on. If you're buying BTC privately and then converting to XMR, Bisq + an atomic swap is one path.

**Atomic swaps** between Bitcoin and Monero are worth mentioning: the [COMIT](https://github.com/comit-network/xmr-btc-swap) `xmr-btc-swap` tool lets you trade BTC for XMR directly peer-to-peer with no exchange at all — just two wallets, a cryptographic protocol, and no intermediary. It's technically sound but not consumer-friendly; you're running command-line tools and finding a trading partner yourself. Haveno is partly trying to build a better UX layer on top of this pattern.

**RoboSats** is a Lightning-native P2P Bitcoin exchange that runs over Tor, uses disposable robot identities (no account, no persistence), and Lightning HODL invoices for escrow. It's not a Monero exchange, but it illustrates the direction the P2P space is moving: ephemeral identities, no registration, Tor by default, Lightning for settlement speed.

**The broader problem the P2P layer is solving** is entry and exit without identity linkage. Privacy coins can make everything that happens on-chain private. They can't make the on-ramp private if you bought through a KYC'd exchange. The P2P layer is where that linkage gets broken — or doesn't. LocalMonero's closure exposed how fragile this layer is when it's built on hosted platforms rather than decentralized protocols.

The Haveno model — decentralized protocol, no company, no server — is the right architectural answer. The practical answer, for now, is that the tooling is less mature and the liquidity is thinner than what LocalMonero offered. That gap will take time to close.

---

## The EVM privacy roadmap

RAILGUN isn't the only privacy project in the Ethereum ecosystem. [Aztec Network](https://aztec.network/) is building a privacy-first L2 where computation is natively private — smart contracts that operate on encrypted state. [Penumbra](https://penumbra.zone/) is building privacy-native DeFi on a Cosmos-based chain. [Noir](https://noir-lang.org/) is a ZK programming language from Aztec that makes writing privacy-preserving smart contracts more accessible.

The broader trajectory: zero-knowledge proofs are becoming a general-purpose tool for privacy in crypto, not just for payment systems. The research is moving fast. Proof generation times that took minutes in 2019 take milliseconds in 2026. The theoretical ceiling for what's possible with ZK-based privacy on EVM is much higher than what's currently deployed.

The direction matters: Ethereum's privacy future is probably not a separate privacy coin. It's ZK-native privacy composable with existing DeFi — the bet RAILGUN and Aztec are making. Whether that's true in two years or ten depends on how fast the tooling matures and how the regulatory environment evolves.

---

## Further reading

- [Privacy coins explainer video](https://www.youtube.com/watch?v=VwHtXwWSlnA) — the video that prompted this article; good overview of Monero, Zcash, and RAILGUN
- [Monero](https://www.getmonero.org/) — homepage and technical documentation
- [Zcash](https://z.cash/) — homepage; the [zero-knowledge proofs explainer](https://z.cash/learn/what-are-zero-knowledge-proofs/) is a good starting point
- [RAILGUN](https://railgun.org/) — homepage; [the docs](https://docs.railgun.org/wiki/learn/overview) go deep on how the shielding system actually works
- [OFAC Tornado Cash sanctions](https://home.treasury.gov/news/press-releases/jy0916) — the August 2022 press release, worth reading to understand what regulators actually said
- [Haveno](https://haveno.exchange/) — decentralized P2P Monero exchange, built on Tor and Monero multisig; the current best attempt at a LocalMonero successor
- [Bisq](https://bisq.network/) — the reference implementation for decentralized P2P Bitcoin exchange; the codebase Haveno forked from
- [Decentralized Social Protocols](/blog/decentralized-social-protocols) — the same tension between openness and privacy shows up in identity and social layers
