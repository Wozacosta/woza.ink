---
title: "The ERCs and EIPs That Shaped Ethereum"
date: "2026-03-22"
description: "A chronological tour of the Ethereum standards that actually mattered — from ERC-20 to account abstraction — and why each one changed what you could build."
tags: ["ethereum", "web3", "protocols", "standards"]
---

# The ERCs and EIPs That Shaped Ethereum

Ethereum isn't just a blockchain. It's a standards machine. Every major capability — fungible tokens, NFTs, gas fee economics, account abstraction — started as a numbered proposal that someone wrote up, argued about, and shipped. Some proposals changed everything. Most changed nothing. A few nearly killed the chain before saving it.

This is a chronological walkthrough of the ERCs and EIPs that actually mattered. Not an exhaustive catalog — the EIP repo has 800+ entries and counting. This is the subset that changed what you could build, how the chain works, or how users experience it. In roughly the order they showed up.

> Quick note on naming: **EIPs** (Ethereum Improvement Proposals) cover everything — protocol changes, networking, interfaces. **ERCs** (Ethereum Request for Comments) are the subset that define application-level standards — token interfaces, metadata formats, account behavior. Every ERC is an EIP, but not every EIP is an ERC.

---

## TL;DR

- **ERC-20** (2015) invented the token standard. Everything — stablecoins, DeFi, governance — runs on it.
- **EIP-155** (2016) stopped replay attacks after the Ethereum Classic fork. Boring but existential.
- **ERC-721** (2018) defined NFTs. CryptoKitties broke the chain proving the concept.
- **EIP-1559** (2021) burned ETH on every transaction, turning Ethereum's fee market from chaos into something predictable.
- **ERC-1155** (2019) let one contract handle both fungible and non-fungible tokens. Gaming needed it.
- **EIP-4844** (2024) introduced blobs — cheap data for rollups, making L2s 10-100x cheaper overnight.
- **ERC-4337** (2023) and **EIP-7702** (2025) are rewriting what an Ethereum account *is* — smart wallets, session keys, gas sponsorship.
- **ERC-6551** (2023) gave NFTs their own wallets. Composable identity, onchain.

---

## ERC-20 — The Token Standard (2015)

**EIP-20 | Proposed November 2015 | Final September 2017**

Before ERC-20, every token on Ethereum was a snowflake. Each project wrote its own transfer logic, its own balance tracking, its own approval mechanism. Nothing was interoperable. You couldn't build a DEX that lists arbitrary tokens if every token has a different interface.

Fabian Vogelsteller and Vitalik Buterin proposed ERC-20 as a minimal, shared interface: `transfer`, `approve`, `transferFrom`, `balanceOf`, `totalSupply`, `allowance`. Six functions and two events. That's it.

```solidity
function transfer(address to, uint256 value) external returns (bool);
function approve(address spender, uint256 value) external returns (bool);
function transferFrom(address from, address to, uint256 value) external returns (bool);
```

The simplicity was the point. Any contract implementing these six functions could be listed on any exchange, held in any wallet, composed with any protocol. USDC, DAI, WETH, UNI, LINK — all ERC-20. Every DeFi protocol from Uniswap to Aave to Compound is built on the assumption that tokens speak this interface.

**What it broke:** The `approve` + `transferFrom` pattern requires two transactions to let a contract spend your tokens. Users have been approving infinite allowances since 2017 and getting drained by exploits since 2018. The "approve once, spend forever" UX is a security anti-pattern baked into the most successful standard in crypto.

**Why it matters:** ERC-20 didn't just create tokens. It created the idea that a standard interface, agreed upon by the community, could bootstrap an entire ecosystem of interoperable applications. Every standard on this list follows the template ERC-20 set.

---

## EIP-155 — Replay Protection (2016)

**EIP-155 | Proposed October 2016 | Implemented in Spurious Dragon hard fork**

This one doesn't get enough credit because it solved its problem so completely that nobody had to think about it again.

When Ethereum Classic forked from Ethereum after the DAO hack in July 2016, the two chains shared the same transaction format. A transaction signed on Ethereum was also valid on Ethereum Classic — and vice versa. This meant that if you sent 10 ETH on one chain, anyone could replay that exact transaction on the other chain and drain the same 10 ETH there. This was actively exploited.

EIP-155, authored by Vitalik, added a `chainId` to the transaction signing scheme. Transactions are now bound to a specific chain. Ethereum mainnet is `chainId: 1`, Ethereum Classic is `chainId: 61`. A transaction signed for one chain is invalid on all others.

**Why it matters:** Every EVM chain — Polygon, Arbitrum, Base, Optimism — has a unique chain ID because of this standard. It's the reason you can use MetaMask across dozens of networks without transactions leaking between them. Boring infrastructure that everything depends on.

---

## ERC-721 — Non-Fungible Tokens (2018)

**EIP-721 | Proposed January 2018 | Final June 2018**

ERC-20 tokens are fungible — one USDC is identical to any other USDC. ERC-721 defined the interface for tokens where every unit is unique. Each token has a `tokenId` that maps to a distinct asset: a piece of art, a domain name, a game item, a deed to a digital plot of land.

```solidity
function ownerOf(uint256 tokenId) external view returns (address);
function safeTransferFrom(address from, address to, uint256 tokenId) external;
function tokenURI(uint256 tokenId) external view returns (string);
```

The `tokenURI` function is what links onchain ownership to off-chain metadata — typically a JSON file pointing to an image, description, and attributes. This is also where most "your NFT is actually just a URL" critiques come from, and they're not entirely wrong.

CryptoKitties launched in late 2017 using a proto-721 interface and famously congested the entire Ethereum network. That congestion was both proof of concept and warning sign — the chain couldn't handle one popular collectibles game. It also accelerated work on scaling solutions that wouldn't bear fruit for years.

**The broader impact:** ERC-721 enabled ENS domains (your `.eth` name is an NFT), art NFTs (the 2021 boom/bust), gaming items, membership passes, and onchain identity primitives. [ERC-8004](/blog/erc-8004-trustless-agents) uses ERC-721 for AI agent identity — a use case nobody imagined in 2018.

**What it didn't solve:** Royalties. ERC-721 has no mechanism to enforce creator fees on secondary sales. That gap spawned years of marketplace wars and eventually ERC-2981 (more on that below).

---

## ERC-1155 — The Multi-Token Standard (2019)

**EIP-1155 | Proposed June 2018 | Final September 2019**

Witek Radomski (Enjin) proposed ERC-1155 to solve a practical problem: games need both fungible items (gold coins, potions) and non-fungible items (unique swords, characters) — and managing them across separate ERC-20 and ERC-721 contracts is expensive and unwieldy.

ERC-1155 lets a single contract manage multiple token types. Each `id` can represent a fungible token (many units) or a non-fungible token (one unit). The killer feature is batch operations:

```solidity
function safeBatchTransferFrom(
    address from,
    address to,
    uint256[] ids,
    uint256[] amounts,
    bytes data
) external;
```

One transaction to transfer a sword, 50 gold, and 3 health potions. In the ERC-20/721 world, that's three separate contract calls, three separate gas fees.

**Why it matters:** Gas efficiency and developer ergonomics for any application managing diverse asset types. Gaming (Enjin, Gods Unchained), metaverse projects, and ticketing platforms adopted it. OpenSea supports it natively. It's the quiet workhorse behind a lot of multi-asset systems.

---

## ERC-2981 — NFT Royalties (2020)

**EIP-2981 | Proposed September 2020 | Final September 2022**

The NFT royalty wars of 2022-2023 were ugly. Creators expected perpetual royalties on secondary sales. Marketplaces like Blur undercut OpenSea by making royalties optional. Billions of dollars in expected creator revenue evaporated.

ERC-2981 tried to solve this with a standard interface for royalty information:

```solidity
function royaltyInfo(uint256 tokenId, uint256 salePrice)
    external view returns (address receiver, uint256 royaltyAmount);
```

Simple: given a token ID and sale price, the contract returns who gets paid and how much. Marketplaces *can* query this and honor it.

**The catch:** ERC-2981 is informational, not enforceable. It tells you what royalty the creator wants. It doesn't make you pay it. There's no onchain mechanism to force a marketplace or P2P transfer to route funds to the creator. The standard explicitly acknowledges this — enforcement is left to marketplaces and platforms.

**Why it matters anyway:** It established a common interface that well-intentioned marketplaces could implement consistently. OpenSea, Rarible, and others honor it. But the royalty debate exposed a fundamental tension: onchain ownership gives buyers the right to transfer freely, while creators want to tax those transfers. ERC-2981 didn't resolve that tension — it just gave both sides a shared vocabulary.

---

## EIP-1559 — The Fee Market Revolution (2021)

**EIP-1559 | Proposed April 2019 | Activated in London hard fork, August 2021**

Before 1559, Ethereum's fee market was a blind auction. You guessed a gas price, hoped it was enough, and overpaid if it was too much. Wallets were bad at estimating. Users were bad at guessing. Miners pocketed everything. Congestion meant gas wars where fees spiked unpredictably.

EIP-1559 restructured the entire model:

- **Base fee**: algorithmically determined by the protocol, adjusting up or down based on block utilization. This is the minimum you pay. It's **burned** — destroyed, not given to miners/validators.
- **Priority fee (tip)**: optional extra you pay directly to validators for inclusion priority.
- **Max fee**: the ceiling you're willing to pay, protecting against spikes.

The base fee mechanism targets 50% block utilization. If blocks are more than half full, the base fee goes up. Less than half, it goes down. This creates a predictable, self-adjusting fee market instead of a chaotic auction.

**The burn is the big deal.** Every transaction destroys ETH. During periods of high activity, more ETH is burned than is issued to validators — making ETH deflationary. Since the merge to proof-of-stake (September 2022), the combination of reduced issuance and 1559 burns has made ETH's supply dynamics fundamentally different from Bitcoin's fixed-inflation model. Over 4 million ETH has been burned since London.

**Why it matters:** Better UX (wallets can estimate fees accurately), more predictable costs (the base fee moves smoothly, not in spikes), and a tokenomic shift (ETH as a deflationary asset). It's the single biggest change to how using Ethereum *feels* on a daily basis.

---

## EIP-4844 — Proto-Danksharding and Blobs (2024)

**EIP-4844 | Proposed February 2022 | Activated in Dencun hard fork, March 2024**

L2 rollups (Arbitrum, Optimism, Base, zkSync) execute transactions off Ethereum mainnet, then post the transaction data back to L1 for security. Before 4844, that data was stored in regular transaction calldata — expensive, permanent, and priced the same as contract execution data. L2 fees were dominated by the cost of posting data to L1.

EIP-4844 introduced **blobs** — a new data type that's cheaper than calldata because it's temporary. Blobs are available for ~18 days (enough for fraud proofs and data availability checks), then pruned. The chain doesn't store them forever because it doesn't need to.

Each blob is ~128 KB. Each block can carry up to 6 blobs. Blobs have their own fee market (separate from execution gas), with a target of 3 blobs per block and the same 1559-style dynamic pricing.

**The impact was immediate and dramatic:** L2 transaction fees dropped 10-100x overnight. Arbitrum and Optimism went from ~$0.10-0.50 per transaction to fractions of a cent. Base transactions became effectively free for users. This is the single biggest cost reduction in Ethereum's history.

**Why it matters:** Cheap L2s are the Ethereum scaling roadmap. The thesis is: L1 for security and settlement, L2s for execution and users. 4844 made that thesis economically viable. It also laid the groundwork for full danksharding — the future upgrade where the blob count scales much higher, supporting even more L2 throughput.

> "Proto-danksharding" is named after Dankrad Feist, the researcher who proposed the full danksharding design. 4844 is the first step — the "proto" version that introduces the blob format and fee market without the full data availability sampling mechanism.

---

## ERC-4337 — Account Abstraction via EntryPoint (2023)

**EIP-4337 | Proposed September 2021 | Final March 2023**

Every Ethereum account is one of two types: an externally owned account (EOA) controlled by a private key, or a contract account controlled by code. EOAs are what everyone uses — MetaMask, hardware wallets, seed phrases. They're also the source of most of Ethereum's worst UX problems:

- Lose your private key? Funds gone forever.
- Want someone else to pay gas for your users? Can't — the transaction sender pays.
- Want to batch multiple operations into one click? Can't — each transaction is atomic.
- Want spending limits, session keys, or social recovery? Not possible with a bare private key.

ERC-4337 introduced account abstraction *without* changing the protocol. Instead of modifying the core Ethereum client, it defines a system of smart contract wallets, bundlers, and a singleton `EntryPoint` contract that replaces the traditional transaction mempool for smart accounts.

The flow: your wallet is a smart contract. You sign a `UserOperation` (not a transaction). A **bundler** picks it up, wraps it in a real transaction, and submits it to the `EntryPoint` contract, which validates and executes your operation. Optionally, a **paymaster** contract can sponsor the gas — meaning the user pays nothing.

```solidity
struct PackedUserOperation {
    address sender;
    uint256 nonce;
    bytes initCode;
    bytes callData;
    bytes32 accountGasLimits;
    uint256 preVerificationGas;
    bytes32 gasFees;
    bytes paymasterAndData;
    bytes signature;
}
```

**What this unlocks:**
- **Social recovery**: lose your key, friends/guardians help you recover the account
- **Gas sponsorship**: apps pay gas for their users (onboarding without ETH)
- **Batch transactions**: approve + swap in a single user action
- **Session keys**: grant temporary, scoped permissions (a game can move your character without approving every action)
- **Custom validation**: sign with passkeys, biometrics, multisig — whatever the wallet contract supports

**Why it matters:** This is what "crypto UX that doesn't feel like crypto" actually requires. Every major wallet — Coinbase Smart Wallet, Safe, Biconomy, ZeroDev — now implements 4337. It's the infrastructure layer that makes "just click a button" possible instead of "sign this hex blob, pay gas in ETH, don't lose your seed phrase."

---

## ERC-6551 — Token Bound Accounts (2023)

**EIP-6551 | Proposed February 2023 | Final March 2024**

ERC-6551 answers an odd but powerful question: what if every NFT had its own wallet?

The standard defines a registry that deploys a smart contract account for any ERC-721 token. The NFT owner controls the account. Transfer the NFT, and the account (and everything in it) transfers with it.

```solidity
function createAccount(
    address implementation,
    bytes32 salt,
    uint256 chainId,
    address tokenContract,
    uint256 tokenId
) external returns (address account);
```

**Why this is interesting:** An NFT is no longer just a pointer to metadata. It's an entity that can own things — other NFTs, ERC-20 tokens, POAPs, credentials. A game character NFT can carry its inventory. A profile NFT can accumulate reputation, memberships, and assets that are inseparable from the identity.

**Use cases already in the wild:**
- **Composable characters**: game NFTs that carry their equipment, achievements, and currency
- **Brand loyalty**: an NFT membership card that accumulates rewards in its own account
- **Onchain identity bundles**: a single NFT that holds credentials, attestations, and assets — transfer the NFT, transfer the whole identity

**The deeper implication:** ERC-6551 blurs the line between "token" and "account." Combined with account abstraction (ERC-4337), it creates a model where NFTs aren't passive assets — they're autonomous agents with wallets, capable of holding assets and interacting with protocols. This is the direction [ERC-8004](/blog/erc-8004-trustless-agents) builds on for AI agent identity.

---

## EIP-7702 — Native Account Abstraction (2025)

**EIP-7702 | Proposed May 2024 | Activated in Pectra hard fork, March 2025**

ERC-4337 brought account abstraction to Ethereum without a protocol change — clever, but it required users to migrate from their EOA to a new smart contract wallet. Your existing MetaMask address, with all its history, assets, and permissions, couldn't be upgraded in place. You had to start fresh.

EIP-7702, authored by Vitalik Buterin and Sam Wilson, fixes this at the protocol level. It introduces a new transaction type that lets an EOA temporarily delegate to a smart contract. Your existing address — the one with your ENS name, your token approvals, your onchain history — can now behave like a smart wallet without migrating to a new address.

The mechanism: a new transaction type includes an `authorization_list` — a signed statement saying "for this transaction, treat my EOA as if it were this contract." The EOA's code field is temporarily set to point at the specified contract, giving it smart wallet capabilities for the duration of the transaction.

**What this means in practice:**
- Existing EOAs get batch transactions, gas sponsorship, and custom validation — without creating a new account
- Wallets can upgrade users silently: your address stays the same, but gains smart wallet powers
- The migration problem disappears: 4337 infrastructure works with 7702-enabled EOAs

**Why it matters:** 7702 is the bridge between Ethereum's current account model and the smart-wallet future. Instead of asking 100 million EOA holders to migrate, it brings smart wallet capabilities to them. Pectra (March 2025) made this live on mainnet — every EOA on Ethereum can now opt into account abstraction.

Together, 4337 and 7702 complete the account abstraction story: 4337 defines the smart wallet infrastructure (bundlers, paymasters, entry point), 7702 makes it accessible to existing accounts. It's rare that two standards complement each other this cleanly.

---

## The ones I left out (and why)

This list is deliberately not exhaustive. Some notable omissions:

- **EIP-2 / EIP-7 / Homestead (2016)** — early protocol fixes that stabilized the chain. Important, but mainly historical bookkeeping.
- **EIP-1014 (CREATE2)** — deterministic contract deployment. Essential infrastructure, but developer-facing rather than user-facing.
- **ERC-777** — attempted to improve on ERC-20 with hooks and operators. Never gained adoption, introduced reentrancy vectors, and was effectively deprecated.
- **EIP-3675 (The Merge)** — switching from proof-of-work to proof-of-stake in September 2022. This is arguably the most important upgrade in Ethereum's history. I left it out because it's a consensus change, not a standard in the ERC/interface sense — it deserves its own dedicated post.
- **ERC-3525 / ERC-5192 / ERC-5643** — semi-fungible tokens, soulbound tokens, subscription NFTs. Interesting but niche adoption so far.

---

## The pattern

Looking at this chronologically, there's a clear arc:

**2015-2018: What can exist onchain?** ERC-20 (fungible tokens) and ERC-721 (non-fungible tokens) defined the primitive asset types. EIP-155 kept the chain from splitting into chaos. This era answered "what can we represent?"

**2019-2021: How should the chain work?** ERC-1155 (multi-token efficiency), EIP-1559 (fee market reform), and ERC-2981 (royalty info) improved the mechanics of using what already existed. This era answered "how do we make it usable?"

**2022-2024: How does it scale?** EIP-4844 (blobs for cheap L2 data) was the defining upgrade. The answer to scaling is rollups, and 4844 made rollups economically viable. This era answered "how do we serve millions of users?"

**2025+: What can accounts become?** ERC-4337, EIP-7702, and ERC-6551 are redefining what an Ethereum account is. Not just a private key holding tokens — a programmable entity with social recovery, delegated permissions, gas sponsorship, and the ability to own assets compositionally. This era is answering "how do we make this feel like software people actually want to use?"

Each phase built on the last. You couldn't have DeFi without ERC-20. You couldn't have cheap DeFi without 1559 and 4844. You couldn't onboard normal users without 4337 and 7702. The standards are layers, not isolated inventions.

---

## Links

- [EIPs repository](https://eips.ethereum.org/) — the full catalog of Ethereum proposals
- [ERC-20 spec](https://eips.ethereum.org/EIPS/eip-20)
- [ERC-721 spec](https://eips.ethereum.org/EIPS/eip-721)
- [EIP-1559 spec](https://eips.ethereum.org/EIPS/eip-1559)
- [EIP-4844 spec](https://eips.ethereum.org/EIPS/eip-4844)
- [ERC-4337 spec](https://eips.ethereum.org/EIPS/eip-4337)
- [EIP-7702 spec](https://eips.ethereum.org/EIPS/eip-7702)
- [ERC-6551 spec](https://eips.ethereum.org/EIPS/eip-6551)

*Related reading: [ERC-8004: Building a Trust Layer for AI Agents Onchain](/blog/erc-8004-trustless-agents) — the latest ERC using NFT-based identity for AI agents, building directly on ERC-721 and the account abstraction stack.*
