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

<svg viewBox="0 0 800 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:800px;margin:2rem auto;display:block">
  <style>
    .tl-label { font: 600 11px ui-monospace, monospace; fill: currentColor; }
    .tl-year { font: 700 12px ui-monospace, monospace; fill: currentColor; }
    .tl-era { font: 600 10px ui-monospace, monospace; fill: currentColor; opacity: 0.5; }
    .tl-line { stroke: currentColor; opacity: 0.15; }
    .tl-dot { fill: currentColor; }
    .tl-dot-ring { fill: none; stroke: currentColor; opacity: 0.2; }
  </style>
  <!-- main timeline -->
  <line x1="40" y1="110" x2="760" y2="110" class="tl-line" stroke-width="2"/>
  <!-- era brackets -->
  <line x1="60" y1="170" x2="260" y2="170" class="tl-line" stroke-width="1.5"/>
  <text x="160" y="190" text-anchor="middle" class="tl-era">PRIMITIVES</text>
  <line x1="280" y1="170" x2="460" y2="170" class="tl-line" stroke-width="1.5"/>
  <text x="370" y="190" text-anchor="middle" class="tl-era">MECHANICS</text>
  <line x1="480" y1="170" x2="580" y2="170" class="tl-line" stroke-width="1.5"/>
  <text x="530" y="190" text-anchor="middle" class="tl-era">SCALING</text>
  <line x1="600" y1="170" x2="740" y2="170" class="tl-line" stroke-width="1.5"/>
  <text x="670" y="190" text-anchor="middle" class="tl-era">ACCOUNTS</text>
  <!-- ERC-20 2015 -->
  <circle cx="80" cy="110" r="5" class="tl-dot"/><circle cx="80" cy="110" r="10" class="tl-dot-ring"/>
  <text x="80" y="90" text-anchor="middle" class="tl-label">ERC-20</text>
  <text x="80" y="140" text-anchor="middle" class="tl-year">2015</text>
  <!-- EIP-155 2016 -->
  <circle cx="160" cy="110" r="5" class="tl-dot"/><circle cx="160" cy="110" r="10" class="tl-dot-ring"/>
  <text x="160" y="70" text-anchor="middle" class="tl-label">EIP-155</text>
  <text x="160" y="140" text-anchor="middle" class="tl-year">2016</text>
  <!-- ERC-721 2018 -->
  <circle cx="240" cy="110" r="5" class="tl-dot"/><circle cx="240" cy="110" r="10" class="tl-dot-ring"/>
  <text x="240" y="90" text-anchor="middle" class="tl-label">ERC-721</text>
  <text x="240" y="140" text-anchor="middle" class="tl-year">2018</text>
  <!-- ERC-1155 2019 -->
  <circle cx="310" cy="110" r="5" class="tl-dot"/><circle cx="310" cy="110" r="10" class="tl-dot-ring"/>
  <text x="310" y="70" text-anchor="middle" class="tl-label">ERC-1155</text>
  <text x="310" y="140" text-anchor="middle" class="tl-year">2019</text>
  <!-- ERC-2981 2020 -->
  <circle cx="380" cy="110" r="5" class="tl-dot"/><circle cx="380" cy="110" r="10" class="tl-dot-ring"/>
  <text x="380" y="90" text-anchor="middle" class="tl-label">ERC-2981</text>
  <text x="380" y="140" text-anchor="middle" class="tl-year">2020</text>
  <!-- EIP-1559 2021 -->
  <circle cx="450" cy="110" r="5" class="tl-dot"/><circle cx="450" cy="110" r="10" class="tl-dot-ring"/>
  <text x="450" y="70" text-anchor="middle" class="tl-label">EIP-1559</text>
  <text x="450" y="140" text-anchor="middle" class="tl-year">2021</text>
  <!-- ERC-4337 2023 -->
  <circle cx="530" cy="110" r="5" class="tl-dot"/><circle cx="530" cy="110" r="10" class="tl-dot-ring"/>
  <text x="530" y="90" text-anchor="middle" class="tl-label">ERC-4337</text>
  <text x="530" y="140" text-anchor="middle" class="tl-year">2023</text>
  <!-- EIP-4844 2024 -->
  <circle cx="610" cy="110" r="5" class="tl-dot"/><circle cx="610" cy="110" r="10" class="tl-dot-ring"/>
  <text x="610" y="70" text-anchor="middle" class="tl-label">EIP-4844</text>
  <text x="610" y="140" text-anchor="middle" class="tl-year">2024</text>
  <!-- ERC-6551 -->
  <circle cx="670" cy="110" r="5" class="tl-dot"/><circle cx="670" cy="110" r="10" class="tl-dot-ring"/>
  <text x="670" y="90" text-anchor="middle" class="tl-label">ERC-6551</text>
  <!-- EIP-7702 2025 -->
  <circle cx="740" cy="110" r="5" class="tl-dot"/><circle cx="740" cy="110" r="10" class="tl-dot-ring"/>
  <text x="740" y="70" text-anchor="middle" class="tl-label">EIP-7702</text>
  <text x="740" y="140" text-anchor="middle" class="tl-year">2025</text>
</svg>

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

<svg viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;margin:1.5rem auto;display:block">
  <style>
    .af-box { fill: none; stroke: currentColor; stroke-width: 1.5; rx: 6; }
    .af-box-fill { fill: currentColor; opacity: 0.05; rx: 6; }
    .af-label { font: 600 12px ui-monospace, monospace; fill: currentColor; }
    .af-sublabel { font: 400 10px ui-monospace, monospace; fill: currentColor; opacity: 0.5; }
    .af-arrow { stroke: currentColor; stroke-width: 1.5; fill: none; marker-end: url(#af-head); }
    .af-step { font: 700 11px ui-monospace, monospace; fill: currentColor; opacity: 0.35; }
  </style>
  <defs><marker id="af-head" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="currentColor" opacity="0.6"/></marker></defs>
  <!-- actors -->
  <rect x="20" y="30" width="120" height="50" class="af-box"/><rect x="20" y="30" width="120" height="50" class="af-box-fill"/>
  <text x="80" y="52" text-anchor="middle" class="af-label">You (EOA)</text>
  <text x="80" y="68" text-anchor="middle" class="af-sublabel">wallet</text>
  <rect x="270" y="30" width="140" height="50" class="af-box"/><rect x="270" y="30" width="140" height="50" class="af-box-fill"/>
  <text x="340" y="52" text-anchor="middle" class="af-label">Token Contract</text>
  <text x="340" y="68" text-anchor="middle" class="af-sublabel">ERC-20</text>
  <rect x="530" y="30" width="130" height="50" class="af-box"/><rect x="530" y="30" width="130" height="50" class="af-box-fill"/>
  <text x="595" y="52" text-anchor="middle" class="af-label">DEX / DApp</text>
  <text x="595" y="68" text-anchor="middle" class="af-sublabel">spender</text>
  <!-- tx 1: approve -->
  <text x="20" y="115" class="af-step">TX 1</text>
  <path d="M140,105 L270,105" class="af-arrow"/>
  <text x="205" y="100" text-anchor="middle" class="af-label">approve(dex, ∞)</text>
  <text x="205" y="118" text-anchor="middle" class="af-sublabel">sets allowance</text>
  <!-- tx 2: transferFrom -->
  <text x="20" y="168" class="af-step">TX 2</text>
  <path d="M530,155 L410,155" class="af-arrow"/>
  <text x="470" y="150" text-anchor="middle" class="af-label">transferFrom(you, dex, amt)</text>
  <text x="470" y="170" text-anchor="middle" class="af-sublabel">spends your allowance</text>
</svg>

**Why it matters:** ERC-20 didn't just create tokens. It created the idea that a standard interface, agreed upon by the community, could bootstrap an entire ecosystem of interoperable applications. Every standard on this list follows the template ERC-20 set.

---

## EIP-155 — Replay Protection (2016)

**EIP-155 | Proposed October 2016 | Implemented in Spurious Dragon hard fork**

This one doesn't get enough credit because it solved its problem so completely that nobody had to think about it again.

When Ethereum Classic forked from Ethereum after the DAO hack in July 2016, the two chains shared the same transaction format. A transaction signed on Ethereum was also valid on Ethereum Classic — and vice versa. This meant that if you sent 10 ETH on one chain, anyone could replay that exact transaction on the other chain and drain the same 10 ETH there. This was actively exploited.

EIP-155, authored by Vitalik, added a `chainId` to the transaction signing scheme. Transactions are now bound to a specific chain. Ethereum mainnet is `chainId: 1`, Ethereum Classic is `chainId: 61`. A transaction signed for one chain is invalid on all others.

<svg viewBox="0 0 680 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;margin:1.5rem auto;display:block">
  <style>
    .rp-box { fill: none; stroke: currentColor; stroke-width: 1.5; rx: 6; }
    .rp-fill { fill: currentColor; opacity: 0.05; rx: 6; }
    .rp-label { font: 600 12px ui-monospace, monospace; fill: currentColor; }
    .rp-sub { font: 400 10px ui-monospace, monospace; fill: currentColor; opacity: 0.5; }
    .rp-arrow { stroke: currentColor; stroke-width: 1.5; fill: none; marker-end: url(#rp-head); }
    .rp-bad { stroke: currentColor; stroke-width: 1.5; stroke-dasharray: 5,4; fill: none; marker-end: url(#rp-head); }
    .rp-x { font: 700 18px ui-monospace, monospace; fill: currentColor; }
    .rp-sect { font: 700 11px ui-monospace, monospace; fill: currentColor; opacity: 0.3; }
  </style>
  <defs><marker id="rp-head" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="currentColor" opacity="0.6"/></marker></defs>
  <!-- BEFORE -->
  <text x="20" y="22" class="rp-sect">BEFORE EIP-155</text>
  <rect x="20" y="35" width="640" height="90" rx="8" fill="none" stroke="currentColor" stroke-dasharray="3,3" opacity="0.1"/>
  <rect x="50" y="50" width="150" height="40" class="rp-box"/><rect x="50" y="50" width="150" height="40" class="rp-fill"/>
  <text x="125" y="75" text-anchor="middle" class="rp-label">Ethereum (ETH)</text>
  <rect x="480" y="50" width="160" height="40" class="rp-box"/><rect x="480" y="50" width="160" height="40" class="rp-fill"/>
  <text x="560" y="75" text-anchor="middle" class="rp-label">Eth Classic (ETC)</text>
  <path d="M200,70 L480,70" class="rp-arrow"/>
  <text x="340" y="63" text-anchor="middle" class="rp-label">send 10 ETH</text>
  <text x="340" y="80" text-anchor="middle" class="rp-sub">same tx replayed → 10 ETC also drained</text>
  <!-- AFTER -->
  <text x="20" y="160" class="rp-sect">AFTER EIP-155</text>
  <rect x="20" y="173" width="640" height="95" rx="8" fill="none" stroke="currentColor" stroke-dasharray="3,3" opacity="0.1"/>
  <rect x="50" y="188" width="150" height="40" class="rp-box"/><rect x="50" y="188" width="150" height="40" class="rp-fill"/>
  <text x="125" y="205" text-anchor="middle" class="rp-label">ETH (chain 1)</text>
  <text x="125" y="220" text-anchor="middle" class="rp-sub">tx signed for chain 1</text>
  <rect x="480" y="188" width="160" height="40" class="rp-box"/><rect x="480" y="188" width="160" height="40" class="rp-fill"/>
  <text x="560" y="205" text-anchor="middle" class="rp-label">ETC (chain 61)</text>
  <text x="560" y="220" text-anchor="middle" class="rp-sub">rejects chain 1 tx</text>
  <path d="M200,208 L370,208" class="rp-bad"/>
  <text x="395" y="213" class="rp-x">✗</text>
  <text x="310" y="250" text-anchor="middle" class="rp-sub">chainId mismatch → tx invalid</text>
</svg>

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

<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;margin:1.5rem auto;display:block">
  <style>
    .ts-box { fill: none; stroke: currentColor; stroke-width: 1.5; rx: 6; }
    .ts-fill { fill: currentColor; opacity: 0.04; rx: 6; }
    .ts-title { font: 700 12px ui-monospace, monospace; fill: currentColor; }
    .ts-sub { font: 400 10px ui-monospace, monospace; fill: currentColor; opacity: 0.5; }
    .ts-item { fill: currentColor; opacity: 0.12; rx: 3; }
    .ts-item-label { font: 600 9px ui-monospace, monospace; fill: currentColor; opacity: 0.6; }
    .ts-contract { font: 600 9px ui-monospace, monospace; fill: currentColor; opacity: 0.35; }
  </style>
  <!-- ERC-20 -->
  <rect x="15" y="30" width="200" height="170" class="ts-box"/><rect x="15" y="30" width="200" height="170" class="ts-fill"/>
  <text x="115" y="55" text-anchor="middle" class="ts-title">ERC-20</text>
  <text x="115" y="72" text-anchor="middle" class="ts-sub">fungible — all identical</text>
  <rect x="40" y="90" width="36" height="36" class="ts-item"/><text x="58" y="113" text-anchor="middle" class="ts-item-label">USDC</text>
  <rect x="86" y="90" width="36" height="36" class="ts-item"/><text x="104" y="113" text-anchor="middle" class="ts-item-label">USDC</text>
  <rect x="132" y="90" width="36" height="36" class="ts-item"/><text x="150" y="113" text-anchor="middle" class="ts-item-label">USDC</text>
  <text x="115" y="155" text-anchor="middle" class="ts-contract">1 contract per token</text>
  <text x="115" y="172" text-anchor="middle" class="ts-contract">1 tx per transfer</text>
  <!-- ERC-721 -->
  <rect x="245" y="30" width="200" height="170" class="ts-box"/><rect x="245" y="30" width="200" height="170" class="ts-fill"/>
  <text x="345" y="55" text-anchor="middle" class="ts-title">ERC-721</text>
  <text x="345" y="72" text-anchor="middle" class="ts-sub">non-fungible — all unique</text>
  <rect x="270" y="90" width="36" height="36" class="ts-item"/><text x="288" y="113" text-anchor="middle" class="ts-item-label">#01</text>
  <rect x="316" y="90" width="36" height="36" class="ts-item"/><text x="334" y="113" text-anchor="middle" class="ts-item-label">#02</text>
  <rect x="362" y="90" width="36" height="36" class="ts-item"/><text x="380" y="113" text-anchor="middle" class="ts-item-label">#03</text>
  <text x="345" y="155" text-anchor="middle" class="ts-contract">1 contract per collection</text>
  <text x="345" y="172" text-anchor="middle" class="ts-contract">1 tx per transfer</text>
  <!-- ERC-1155 -->
  <rect x="475" y="30" width="210" height="170" class="ts-box"/><rect x="475" y="30" width="210" height="170" class="ts-fill"/>
  <text x="580" y="55" text-anchor="middle" class="ts-title">ERC-1155</text>
  <text x="580" y="72" text-anchor="middle" class="ts-sub">both — multi-token</text>
  <rect x="500" y="88" width="36" height="24" class="ts-item"/><text x="518" y="105" text-anchor="middle" class="ts-item-label">gold</text>
  <rect x="542" y="88" width="36" height="24" class="ts-item"/><text x="560" y="105" text-anchor="middle" class="ts-item-label">gold</text>
  <rect x="584" y="88" width="36" height="24" class="ts-item"/><text x="602" y="105" text-anchor="middle" class="ts-item-label">gold</text>
  <rect x="632" y="88" width="36" height="24" class="ts-item"/><text x="650" y="105" text-anchor="middle" class="ts-item-label">#01</text>
  <text x="580" y="155" text-anchor="middle" class="ts-contract">1 contract for everything</text>
  <text x="580" y="172" text-anchor="middle" class="ts-contract">1 tx for batch transfer</text>
</svg>

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

<svg viewBox="0 0 680 230" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;margin:1.5rem auto;display:block">
  <style>
    .fee-label { font: 600 12px ui-monospace, monospace; fill: currentColor; }
    .fee-sub { font: 400 10px ui-monospace, monospace; fill: currentColor; opacity: 0.5; }
    .fee-box { stroke: currentColor; stroke-width: 1.5; rx: 6; }
    .fee-arrow { stroke: currentColor; stroke-width: 1.5; fill: none; marker-end: url(#fee-head); }
    .fee-sect { font: 700 11px ui-monospace, monospace; fill: currentColor; opacity: 0.3; }
  </style>
  <defs><marker id="fee-head" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="currentColor" opacity="0.6"/></marker></defs>
  <!-- BEFORE -->
  <text x="20" y="22" class="fee-sect">BEFORE 1559</text>
  <rect x="20" y="35" width="280" height="70" class="fee-box" fill="none"/>
  <rect x="20" y="35" width="280" height="70" class="fee-box" fill="currentColor" opacity="0.04"/>
  <text x="160" y="60" text-anchor="middle" class="fee-label">You pay: ??? gwei</text>
  <text x="160" y="78" text-anchor="middle" class="fee-sub">blind auction — guess and hope</text>
  <text x="160" y="92" text-anchor="middle" class="fee-sub">100% goes to miners</text>
  <!-- AFTER -->
  <text x="20" y="140" class="fee-sect">AFTER 1559</text>
  <!-- total fee bar -->
  <rect x="20" y="155" width="640" height="55" rx="6" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="3,3" opacity="0.15"/>
  <!-- base fee -->
  <rect x="30" y="160" width="380" height="44" rx="4" fill="currentColor" opacity="0.08" stroke="currentColor" stroke-width="1.5"/>
  <text x="220" y="180" text-anchor="middle" class="fee-label">Base Fee (algorithmic)</text>
  <text x="220" y="196" text-anchor="middle" class="fee-sub">🔥 burned — destroyed forever</text>
  <!-- priority fee -->
  <rect x="420" y="160" width="160" height="44" rx="4" fill="currentColor" opacity="0.04" stroke="currentColor" stroke-width="1.5"/>
  <text x="500" y="180" text-anchor="middle" class="fee-label">Priority Fee</text>
  <text x="500" y="196" text-anchor="middle" class="fee-sub">tip → validator</text>
  <!-- unused -->
  <text x="610" y="184" text-anchor="middle" class="fee-sub" opacity="0.3">unused</text>
  <text x="610" y="198" text-anchor="middle" class="fee-sub" opacity="0.3">refunded</text>
  <!-- max fee label -->
  <text x="340" y="225" text-anchor="middle" class="fee-sub">↑ max fee (your ceiling) ↑</text>
</svg>

**The burn is the big deal.** Every transaction destroys ETH. During periods of high activity, more ETH is burned than is issued to validators — making ETH deflationary. Since the merge to proof-of-stake (September 2022), the combination of reduced issuance and 1559 burns has made ETH's supply dynamics fundamentally different from Bitcoin's fixed-inflation model. Over 4 million ETH has been burned since London.

**Why it matters:** Better UX (wallets can estimate fees accurately), more predictable costs (the base fee moves smoothly, not in spikes), and a tokenomic shift (ETH as a deflationary asset). It's the single biggest change to how using Ethereum *feels* on a daily basis.

---

## EIP-4844 — Proto-Danksharding and Blobs (2024)

**EIP-4844 | Proposed February 2022 | Activated in Dencun hard fork, March 2024**

L2 rollups (Arbitrum, Optimism, Base, zkSync) execute transactions off Ethereum mainnet, then post the transaction data back to L1 for security. Before 4844, that data was stored in regular transaction calldata — expensive, permanent, and priced the same as contract execution data. L2 fees were dominated by the cost of posting data to L1.

EIP-4844 introduced **blobs** — a new data type that's cheaper than calldata because it's temporary. Blobs are available for ~18 days (enough for fraud proofs and data availability checks), then pruned. The chain doesn't store them forever because it doesn't need to.

Each blob is ~128 KB. Each block can carry up to 6 blobs. Blobs have their own fee market (separate from execution gas), with a target of 3 blobs per block and the same 1559-style dynamic pricing.

<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;margin:1.5rem auto;display:block">
  <style>
    .bl-box { fill: none; stroke: currentColor; stroke-width: 1.5; rx: 6; }
    .bl-fill { fill: currentColor; opacity: 0.04; rx: 6; }
    .bl-label { font: 600 12px ui-monospace, monospace; fill: currentColor; }
    .bl-sub { font: 400 10px ui-monospace, monospace; fill: currentColor; opacity: 0.5; }
    .bl-arrow { stroke: currentColor; stroke-width: 1.5; fill: none; marker-end: url(#bl-head); }
    .bl-sect { font: 700 11px ui-monospace, monospace; fill: currentColor; opacity: 0.3; }
    .bl-blob { fill: currentColor; opacity: 0.08; stroke: currentColor; stroke-width: 1; rx: 4; }
    .bl-calldata { fill: currentColor; opacity: 0.15; stroke: currentColor; stroke-width: 1; rx: 4; }
  </style>
  <defs><marker id="bl-head" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="currentColor" opacity="0.6"/></marker></defs>
  <!-- BEFORE -->
  <text x="20" y="22" class="bl-sect">BEFORE 4844: L2 DATA AS CALLDATA</text>
  <!-- L2s -->
  <rect x="30" y="40" width="100" height="40" class="bl-box"/><rect x="30" y="40" width="100" height="40" class="bl-fill"/>
  <text x="80" y="65" text-anchor="middle" class="bl-label">Arbitrum</text>
  <rect x="150" y="40" width="100" height="40" class="bl-box"/><rect x="150" y="40" width="100" height="40" class="bl-fill"/>
  <text x="200" y="65" text-anchor="middle" class="bl-label">Optimism</text>
  <rect x="270" y="40" width="100" height="40" class="bl-box"/><rect x="270" y="40" width="100" height="40" class="bl-fill"/>
  <text x="320" y="65" text-anchor="middle" class="bl-label">Base</text>
  <!-- arrows to L1 -->
  <path d="M80,80 L80,105 L350,105 L350,120" class="bl-arrow"/>
  <path d="M200,80 L200,105 L350,105" class="bl-arrow" style="marker-end:none"/>
  <path d="M320,80 L320,105 L350,105" class="bl-arrow" style="marker-end:none"/>
  <text x="420" y="108" class="bl-sub">calldata (expensive, permanent)</text>
  <!-- L1 block -->
  <rect x="300" y="120" width="120" height="50" class="bl-box"/><rect x="300" y="120" width="120" height="50" class="bl-calldata"/>
  <text x="360" y="140" text-anchor="middle" class="bl-label">L1 Block</text>
  <text x="360" y="158" text-anchor="middle" class="bl-sub">$0.10-0.50/tx</text>
  <!-- AFTER -->
  <text x="20" y="205" class="bl-sect">AFTER 4844: L2 DATA AS BLOBS</text>
  <!-- L2s -->
  <rect x="30" y="220" width="100" height="40" class="bl-box"/><rect x="30" y="220" width="100" height="40" class="bl-fill"/>
  <text x="80" y="245" text-anchor="middle" class="bl-label">Arbitrum</text>
  <rect x="150" y="220" width="100" height="40" class="bl-box"/><rect x="150" y="220" width="100" height="40" class="bl-fill"/>
  <text x="200" y="245" text-anchor="middle" class="bl-label">Optimism</text>
  <rect x="270" y="220" width="100" height="40" class="bl-box"/><rect x="270" y="220" width="100" height="40" class="bl-fill"/>
  <text x="320" y="245" text-anchor="middle" class="bl-label">Base</text>
  <!-- arrows to blobs -->
  <path d="M80,260 L80,275 L430,275 L430,257" class="bl-arrow"/>
  <path d="M200,260 L200,275 L430,275" class="bl-arrow" style="marker-end:none"/>
  <path d="M320,260 L320,275 L430,275" class="bl-arrow" style="marker-end:none"/>
  <!-- blob area -->
  <rect x="410" y="218" width="40" height="36" class="bl-blob"/><text x="430" y="241" text-anchor="middle" class="bl-sub">blob</text>
  <rect x="458" y="218" width="40" height="36" class="bl-blob"/><text x="478" y="241" text-anchor="middle" class="bl-sub">blob</text>
  <rect x="506" y="218" width="40" height="36" class="bl-blob"/><text x="526" y="241" text-anchor="middle" class="bl-sub">blob</text>
  <text x="478" y="275" text-anchor="middle" class="bl-sub">cheap, pruned after ~18 days</text>
  <!-- cost -->
  <text x="610" y="240" class="bl-label">~$0.001/tx</text>
  <text x="610" y="256" class="bl-sub">10-100x cheaper</text>
</svg>

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

<svg viewBox="0 0 720 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:720px;margin:1.5rem auto;display:block">
  <style>
    .aa-box { fill: none; stroke: currentColor; stroke-width: 1.5; rx: 6; }
    .aa-fill { fill: currentColor; opacity: 0.04; rx: 6; }
    .aa-label { font: 600 11px ui-monospace, monospace; fill: currentColor; }
    .aa-sub { font: 400 9px ui-monospace, monospace; fill: currentColor; opacity: 0.5; }
    .aa-arrow { stroke: currentColor; stroke-width: 1.5; fill: none; marker-end: url(#aa-head); }
    .aa-opt { stroke: currentColor; stroke-width: 1.5; stroke-dasharray: 5,4; fill: none; marker-end: url(#aa-head); }
  </style>
  <defs><marker id="aa-head" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="currentColor" opacity="0.6"/></marker></defs>
  <!-- User -->
  <rect x="10" y="50" width="100" height="55" class="aa-box"/><rect x="10" y="50" width="100" height="55" class="aa-fill"/>
  <text x="60" y="73" text-anchor="middle" class="aa-label">User</text>
  <text x="60" y="90" text-anchor="middle" class="aa-sub">signs UserOp</text>
  <!-- arrow -->
  <path d="M110,78 L160,78" class="aa-arrow"/>
  <!-- Bundler -->
  <rect x="162" y="50" width="110" height="55" class="aa-box"/><rect x="162" y="50" width="110" height="55" class="aa-fill"/>
  <text x="217" y="73" text-anchor="middle" class="aa-label">Bundler</text>
  <text x="217" y="90" text-anchor="middle" class="aa-sub">wraps into tx</text>
  <!-- arrow -->
  <path d="M272,78 L320,78" class="aa-arrow"/>
  <!-- EntryPoint -->
  <rect x="322" y="40" width="130" height="75" class="aa-box"/><rect x="322" y="40" width="130" height="75" class="aa-fill"/>
  <text x="387" y="65" text-anchor="middle" class="aa-label">EntryPoint</text>
  <text x="387" y="82" text-anchor="middle" class="aa-sub">singleton contract</text>
  <text x="387" y="98" text-anchor="middle" class="aa-sub">validate + execute</text>
  <!-- arrow -->
  <path d="M452,78 L500,78" class="aa-arrow"/>
  <!-- Smart Wallet -->
  <rect x="502" y="50" width="120" height="55" class="aa-box"/><rect x="502" y="50" width="120" height="55" class="aa-fill"/>
  <text x="562" y="73" text-anchor="middle" class="aa-label">Smart Wallet</text>
  <text x="562" y="90" text-anchor="middle" class="aa-sub">your account</text>
  <!-- Paymaster (optional, below) -->
  <rect x="322" y="140" width="130" height="35" class="aa-box" stroke-dasharray="5,4"/><rect x="322" y="140" width="130" height="35" class="aa-fill"/>
  <text x="387" y="163" text-anchor="middle" class="aa-label">Paymaster</text>
  <path d="M387,140 L387,115" class="aa-opt"/>
  <text x="477" y="163" text-anchor="middle" class="aa-sub">optional: sponsors gas</text>
</svg>

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

<svg viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:600px;margin:1.5rem auto;display:block">
  <style>
    .tb-box { fill: none; stroke: currentColor; stroke-width: 1.5; rx: 6; }
    .tb-fill { fill: currentColor; opacity: 0.04; rx: 6; }
    .tb-label { font: 600 12px ui-monospace, monospace; fill: currentColor; }
    .tb-sub { font: 400 10px ui-monospace, monospace; fill: currentColor; opacity: 0.5; }
    .tb-item { fill: currentColor; opacity: 0.08; stroke: currentColor; stroke-width: 1; rx: 4; }
    .tb-item-label { font: 600 9px ui-monospace, monospace; fill: currentColor; opacity: 0.6; }
    .tb-arrow { stroke: currentColor; stroke-width: 1.5; fill: none; marker-end: url(#tb-head); }
    .tb-brace { font: 300 36px serif; fill: currentColor; opacity: 0.2; }
  </style>
  <defs><marker id="tb-head" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="currentColor" opacity="0.6"/></marker></defs>
  <!-- Owner -->
  <rect x="20" y="20" width="120" height="45" class="tb-box"/><rect x="20" y="20" width="120" height="45" class="tb-fill"/>
  <text x="80" y="40" text-anchor="middle" class="tb-label">You (owner)</text>
  <text x="80" y="55" text-anchor="middle" class="tb-sub">0xABC...</text>
  <!-- arrow to NFT -->
  <path d="M80,65 L80,90" class="tb-arrow"/>
  <text x="100" y="82" class="tb-sub">owns</text>
  <!-- NFT -->
  <rect x="20" y="92" width="560" height="155" class="tb-box" stroke-dasharray="5,4"/><rect x="20" y="92" width="560" height="155" class="tb-fill"/>
  <text x="300" y="115" text-anchor="middle" class="tb-label">Character NFT #42 (ERC-721)</text>
  <!-- TBA inside -->
  <rect x="45" y="128" width="510" height="105" class="tb-box"/><rect x="45" y="128" width="510" height="105" class="tb-fill"/>
  <text x="300" y="150" text-anchor="middle" class="tb-sub">Token Bound Account (ERC-6551) — 0xTBA...</text>
  <!-- items inside TBA -->
  <rect x="70" y="165" width="90" height="50" class="tb-item"/><text x="115" y="185" text-anchor="middle" class="tb-item-label">Sword NFT</text><text x="115" y="200" text-anchor="middle" class="tb-item-label">(ERC-721)</text>
  <rect x="175" y="165" width="90" height="50" class="tb-item"/><text x="220" y="185" text-anchor="middle" class="tb-item-label">500 GOLD</text><text x="220" y="200" text-anchor="middle" class="tb-item-label">(ERC-20)</text>
  <rect x="280" y="165" width="90" height="50" class="tb-item"/><text x="325" y="185" text-anchor="middle" class="tb-item-label">POAP</text><text x="325" y="200" text-anchor="middle" class="tb-item-label">(ERC-721)</text>
  <rect x="385" y="165" width="110" height="50" class="tb-item"/><text x="440" y="185" text-anchor="middle" class="tb-item-label">Credentials</text><text x="440" y="200" text-anchor="middle" class="tb-item-label">(attestations)</text>
</svg>

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

<svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;margin:1.5rem auto;display:block">
  <style>
    .up-box { fill: none; stroke: currentColor; stroke-width: 1.5; rx: 6; }
    .up-fill { fill: currentColor; opacity: 0.04; rx: 6; }
    .up-label { font: 600 12px ui-monospace, monospace; fill: currentColor; }
    .up-sub { font: 400 10px ui-monospace, monospace; fill: currentColor; opacity: 0.5; }
    .up-arrow { stroke: currentColor; stroke-width: 1.5; fill: none; marker-end: url(#up-head); }
    .up-sect { font: 700 11px ui-monospace, monospace; fill: currentColor; opacity: 0.3; }
    .up-powers { fill: currentColor; opacity: 0.06; rx: 4; }
    .up-power-label { font: 600 9px ui-monospace, monospace; fill: currentColor; opacity: 0.55; }
  </style>
  <defs><marker id="up-head" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="currentColor" opacity="0.6"/></marker></defs>
  <!-- BEFORE -->
  <text x="20" y="22" class="up-sect">BEFORE 7702</text>
  <rect x="20" y="35" width="140" height="55" class="up-box"/><rect x="20" y="35" width="140" height="55" class="up-fill"/>
  <text x="90" y="57" text-anchor="middle" class="up-label">Your EOA</text>
  <text x="90" y="75" text-anchor="middle" class="up-sub">private key only</text>
  <text x="195" y="65" class="up-sub">→ just signs txs, nothing more</text>
  <!-- AFTER -->
  <text x="20" y="120" class="up-sect">WITH 7702</text>
  <rect x="20" y="133" width="140" height="55" class="up-box"/><rect x="20" y="133" width="140" height="55" class="up-fill"/>
  <text x="90" y="155" text-anchor="middle" class="up-label">Your EOA</text>
  <text x="90" y="172" text-anchor="middle" class="up-sub">same address</text>
  <!-- delegation arrow -->
  <path d="M160,160 L220,160" class="up-arrow"/>
  <text x="190" y="152" class="up-sub">delegates</text>
  <!-- Smart contract -->
  <rect x="222" y="133" width="150" height="55" class="up-box"/><rect x="222" y="133" width="150" height="55" class="up-fill"/>
  <text x="297" y="155" text-anchor="middle" class="up-label">Smart Wallet</text>
  <text x="297" y="172" text-anchor="middle" class="up-sub">code (per-tx)</text>
  <!-- gained powers -->
  <path d="M372,160 L410,160" class="up-arrow"/>
  <rect x="415" y="133" width="85" height="28" class="up-powers"/><text x="457" y="152" text-anchor="middle" class="up-power-label">batch txs</text>
  <rect x="508" y="133" width="90" height="28" class="up-powers"/><text x="553" y="152" text-anchor="middle" class="up-power-label">gas sponsor</text>
  <rect x="606" y="133" width="75" height="28" class="up-powers"/><text x="644" y="152" text-anchor="middle" class="up-power-label">passkeys</text>
  <rect x="415" y="166" width="85" height="28" class="up-powers"/><text x="457" y="185" text-anchor="middle" class="up-power-label">recovery</text>
  <rect x="508" y="166" width="90" height="28" class="up-powers"/><text x="553" y="185" text-anchor="middle" class="up-power-label">session keys</text>
  <rect x="606" y="166" width="75" height="28" class="up-powers"/><text x="644" y="185" text-anchor="middle" class="up-power-label">limits</text>
</svg>

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
