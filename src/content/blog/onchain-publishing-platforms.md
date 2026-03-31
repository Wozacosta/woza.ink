---
title: "Paragraph, Mirror, and the Onchain Publishing Landscape"
date: "2026-02-22"
description: "A tour of web3 alternatives to Medium and Substack — what works, what died, and what the trade-offs actually are."
tags: ["web3", "decentralized", "publishing", "open-source"]
---

# Paragraph, Mirror, and the Onchain Publishing Landscape

🔥 Quick vibe: Medium takes your audience. Substack takes a cut. Onchain publishing promises you keep both. But the reality is messier than the pitch.

There's a growing ecosystem of web3-native publishing platforms that let you write, own your content onchain, and monetize without a middleman. Some are thriving. Some are dead. Most sit somewhere in between.

This post maps the landscape — Paragraph, Mirror (RIP), Lens, Farcaster, Hive, Steemit, and more — so you can decide if any of them are worth your time.

> Callout — Who this is for:
> Writers, devs, and creators who've heard "publish onchain" and want to know what that actually means in practice. No wallet required to read this post.

TL;DR
- **Paragraph** absorbed Mirror and is now the default web3 publishing platform. It works like Substack with optional onchain features.
- **Mirror.xyz** pioneered writing NFTs and Arweave storage but is now dead as a standalone product.
- **Lens Protocol** and **Farcaster** are social graph protocols — not publishing platforms per se, but the infrastructure layer where portable audiences live.
- **Hive** and **Steemit** proved blockchain blogging can work but also that reward pool economics get gamed.
- The core trade-off: **ownership and censorship resistance vs. distribution and usability**. Web3 publishing wins on the first, loses badly on the second.

---

## Paragraph — The One That's Actually Working

Paragraph ([paragraph.com](https://paragraph.com/)) is the closest thing to a "web3 Substack" that doesn't feel broken. After absorbing Mirror in May 2024, it's now the default platform for crypto-native writers. Backed by Union Square Ventures.

**How it works:**
- Write and publish like any newsletter platform — email delivery, analytics, SEO, the works.
- Optionally store content permanently on **Arweave** (~$0.005/MB).
- Readers can **collect articles as NFTs** or buy **NFT memberships** for gated content.
- Token-gated posts let you restrict access to holders of specific NFTs or tokens.
- Built on **Base** (Coinbase's L2). Supports multiple EVM chains for minting.

**What's good:** You don't need a wallet to read. The web2 layer (email, SEO, analytics) actually works. The web3 layer (minting, gating, Arweave storage) is opt-in, not shoved in your face.

**What's not:** Discoverability is weak compared to Medium's algorithm. The 3% platform fee on onchain memberships adds up. And the core reading experience is still centralized — content lives on Paragraph's servers unless you opt into Arweave.

**The honest take:** Paragraph is the pragmatic choice. It bridges web2 and web3 without forcing you to pick a side. If you're writing for a crypto-native audience and want onchain primitives, it's the best option right now.

---

## Mirror.xyz — The Pioneer That Didn't Survive

Mirror was the OG. Founded by Denis Nazarov (ex-a16z), it was "the Medium of web3" — the first major platform to put writing permanently on Arweave and let readers mint articles as NFTs.

**What it did:**
- Every post was written to **Arweave** as a permanent record with onchain attestations on Ethereum.
- Introduced **Writing NFTs** — readers could collect/mint articles.
- Crowdfunding features let writers fund projects directly from their audience.
- Revenue splits enabled collaborative publishing with smart-contract-enforced payouts.

**What killed it:** Mirror never achieved product-market fit beyond the crypto bubble. The reading experience was clunky for non-crypto users (wallet connection required for many features). And critically — no email newsletter distribution. In a world where Substack proved that email is king, Mirror had no inbox presence.

**Current status:** Dead as a standalone product. Sold to Paragraph in May 2024. All posts and subscribers migrated to Paragraph by November 2025. The original team pivoted to building **Kiosk**, a Farcaster-based social/commerce app.

> ⚠️ Callout: If you had content on Mirror, it's now on Paragraph. Your Arweave copies still exist independently — that's the permanence promise actually delivering.

---

## Lens Protocol — The Portable Social Graph

Lens isn't a publishing platform. It's the infrastructure layer that publishing platforms can build on. Created by the Aave team, it's a decentralized social graph protocol — your profile, followers, and content are portable across every app in the ecosystem.

**The architecture:**
- Originally on Polygon, now migrated to **Lens Chain** (a dedicated L2 powered by zkSync).
- Social graph data lives onchain. Content is stored on **Grove** (decentralized storage built on IPFS).
- ~647K profiles, 640K handles, and 31 million publications migrated to Lens Chain.

**Why it matters for publishing:** If you publish on a Lens-powered app and that app dies, your audience and content survive. Your followers carry over to the next app. This is the portability promise that web2 platforms can never make — Medium can't export your follower relationships.

**Publishing apps on Lens:** Hey (social), Tape (video), Orb, and others. No single dominant blogging frontend yet — the ecosystem is still maturing.

**Monetization:** Collect NFTs (followers mint your post), gated content based on token/NFT holdings, secondary market revenue sharing.

**The catch:** Wallet friction, small ecosystem compared to web2, and the migration from Polygon to Lens Chain caused some turbulence. If you're not already in the crypto world, the onboarding is rough.

---

## Farcaster — The "Sufficiently Decentralized" Social Layer

Farcaster is a social protocol (think: decentralized Twitter). **Warpcast** is the main client app. It's not built for long-form publishing, but it's increasingly relevant to the publishing stack through its integration with Paragraph.

**How it's built:**
- Identity and account keys registered on **Ethereum** (OP Mainnet).
- Social data (casts, reactions, follows) lives on **Snapchain** — a custom consensus layer with sub-second finality.
- ~250K monthly active users, 100K+ funded wallets.

**The publishing angle:** Write long-form on Paragraph, distribute via Farcaster. Posts appear in feeds natively. **Frames** (interactive in-feed mini apps) enable NFT minting, payments, and commerce directly in the social feed.

**Recent drama:** In January 2026, **Neynar acquired the Farcaster protocol** from Merkle Manufactory (which returned ~$180M in venture funding). The "sufficiently decentralized" claim has been challenged — only 11 validators on Snapchain, selected via community vote every 6 months.

**The honest take:** Farcaster is where the most interesting crypto-native conversations happen right now. But "sufficiently decentralized" is doing a lot of heavy lifting in that tagline. And long-form content requires Paragraph integration — it's not native.

---

## The OGs: Hive and Steemit

These two proved that blockchain-based blogging could work at scale. They also proved that reward pool economics get gamed to death.

### Steemit (2016)

The original blockchain blogging platform. Pioneered earning crypto for creating and curating content on the Steem blockchain. Then Justin Sun bought Steemit Inc. in 2020 and used exchange-held user funds to take over governance — seizing control of the top 20 witnesses. It was unprecedented and widely condemned.

**Current status:** Still running under Tron/Justin Sun's control. ~2,600 new articles/day. But the soul of the community left.

### Hive (2020 fork)

The community's response to the Justin Sun takeover. Forked from Steem, community-governed, no single controlling entity.

**How it works:**
- Content stored **directly on the Hive blockchain** (not IPFS, not Arweave — actually onchain).
- Reward pool model: 65% of HIVE inflation feeds rewards, split between creators and curators.
- Multiple competing frontends: Peakd (~3.1K MAU), Ecency (~2.2K), Hive.Blog (~1K).
- HBD (stablecoin) savings earn ~20% APR from the blockchain itself.

**The problem:** Whale-dominated voting, self-voting schemes, reward pool gaming, declining user base, and a steep learning curve (Hive Power, delegations, resource credits). The token price decline has made the dollar value of rewards less compelling.

**The honest take:** Hive is a functioning proof-of-concept for blockchain-native content rewards. It's also a cautionary tale about how token incentives distort content quality. The dedicated community keeps it alive, but growth has stalled.

---

## The Rest of the Field

### Minds — Open-Source Social + Blogging
Privacy-focused, open-source social platform on Ethereum. MINDS token for rewards, boosts, and tips. Content is stored on centralized servers though — the "decentralized" part is mainly the token layer. Has carved a niche in the free-speech space, with all the audience composition that implies.

### Sigle — Bitcoin-Secured Writing
Built on **Stacks** (Bitcoin L2). The unique angle: inscribe your writing as **Bitcoin Ordinals** for permanent on-Bitcoin storage. Zero platform fees. Niche but interesting if you're a Bitcoin maximalist who writes.

### friend.tech — The SocialFi Cautionary Tale
[friend.tech](https://www.friend.tech/) launched on Base in 2023 with a simple hook: buy "keys" to access exclusive chat rooms with creators. It exploded — $52M in deposits at peak, $2M/day in fees. Then it collapsed just as fast. By late 2024, daily new users dropped to single digits, fees fell under $100/day, and deposits were down 92%. The founders transferred smart contract ownership to a null address — effectively making it immutable but abandoned — and walked away with roughly $44M. The FRIEND token crashed 98% from its launch. A textbook example of what happens when speculation is the product and there's no underlying utility once the hype fades.

### DeSo — Purpose-Built Social Chain
Its own L1 blockchain designed specifically for social media. Formerly BitClout (the one that launched by scraping Twitter profiles without consent). Content stored directly onchain at ~1/10,000th the cost of Ethereum. Creator Coins let you speculate on people, which is either innovative or dystopian depending on your perspective.

### Subsocial — Polkadot's Entry
Decentralized Reddit/Medium hybrid built as a Polkadot parachain. Content on IPFS, social graph onchain. Tiny user base. If you're deep in the Polkadot ecosystem, it exists.

### t2.world — The "Proof of Attention" Experiment
Built on Lens Protocol, designed as a direct Medium alternative. Interesting concept: reward deep reading, not just clicks. Raised $3.4M in 2022. Current status: appears to have stalled. Very little visible activity in 2025-2026.

### Leaflet — AT Protocol Publishing

[Leaflet](https://leaflet.pub/) takes a different path entirely — it's not onchain, it's built on the [AT Protocol](https://atproto.com/) (the thing Bluesky runs on). Open-source ([GitHub](https://github.com/hyperlink-academy/leaflet)), built by Hyperlink Academy with React, Next.js, Supabase, and Replicache for real-time collaborative editing.

The pitch: your identity is your AT Protocol handle, not a platform account. Publish long-form documents and they're interoperable with the entire Atmosphere ecosystem — engagement from Bluesky flows back to your Leaflet posts. You can create instant collaborative docs without even signing up, or run full publications as AT Protocol-native blogs.

It's not decentralized storage (no IPFS, no Arweave). It's decentralized *identity and social graph*. Your readers follow you across any app on the protocol. If Leaflet disappears tomorrow, your identity, followers, and social connections don't. That's a different bet than the crypto-native platforms above, but it's solving the same core problem: your audience shouldn't be hostage to any single service.

---

## The Access Layer: ENS Gateways and Decentralized Hosting

Publishing onchain is one thing. Actually serving that content to readers through a browser is another. This is the "last mile" problem — bridging decentralized storage to the regular web.

### eth.limo — The Privacy-Preserving ENS Gateway

[eth.limo](https://eth.limo/) is a free, open-source gateway that lets anyone access ENS-linked content through a normal browser. Add `.limo` to any ENS name — `yourname.eth.limo` — and it resolves to whatever's stored on IPFS, Arweave, or Swarm behind that ENS record. Zero configuration required.

**Why it matters for publishing:** If you host your blog on IPFS and point your ENS name at it, eth.limo is what makes it accessible without requiring readers to run a special browser or extension. It's the bridge between the decentralized web and the one people actually use.

**Key details:**
- DAO-governed, no centralized censorship
- TLSv1.3 encryption by default, privacy-preserving (no tracking, no logging)
- Supports CCIP (Cross Chain Interoperability Protocol) for L2 name resolution
- Also powers **eth.link** now, after that gateway had years of spotty availability under Cloudflare

### eth.link / eth.domains — The Alternatives

**eth.link** was the original ENS gateway, run with Cloudflare. It was unreliable for years and performed content censorship. It's now powered by eth.limo's infrastructure, so functionally they're the same service. **eth.domains** is another gateway set up in collaboration with Cloudflare — same idea, different URL suffix.

The difference: eth.limo is DAO-governed and censorship-resistant. The Cloudflare-backed gateways have historically applied content filtering. If you care about censorship resistance, eth.limo is the one to use.

### Fleek (RIP) and the Hosting Gap

**Fleek** was the go-to platform for deploying sites to IPFS with ENS integration — basically "Vercel for the decentralized web." It handled IPFS pinning, ENS configuration, and CI/CD for decentralized frontends.

**Current status:** Fleek pivoted to an AI social app and discontinued its hosting services on January 31, 2026. This left a real gap in the ecosystem. Alternatives like **Spheron** and **Filebase** exist but none have matched Fleek's developer experience yet.

### The Practical Setup

If you wanted a fully decentralized blog today, the stack would look like:

1. Write in markdown, build a static site
2. Deploy to **IPFS** (pin with Pinata, Filebase, or self-host)
3. Point your **ENS name** at the IPFS content hash
4. Readers access via **eth.limo** gateway or ENS-native browsers (Brave, Opera)

It works. It's censorship-resistant. It's permanent (as long as someone pins the content). But it's also manual, slow to update, and invisible to search engines. That's the honest trade-off.

> ⚡ Pro tip: Brave browser resolves `.eth` domains natively — no gateway needed. If your audience skews crypto-native, many of them can already access ENS sites directly.

---

## The Trade-off Matrix

| | Paragraph | Hive | Lens apps | Farcaster | Substack | Medium |
|---|---|---|---|---|---|---|
| **Content ownership** | Optional (Arweave) | Onchain | Onchain (Grove/IPFS) | Snapchain | Platform-owned | Platform-owned |
| **Audience portability** | Partial | Yes (multi-frontend) | Yes (protocol-level) | Yes (protocol-level) | No | No |
| **Discoverability** | Low | Very low | Very low | Moderate (crypto) | High | Very high |
| **Monetization** | NFTs, paid subs | Reward pool | Collect NFTs | Tips, Frames | Paid subs (10% fee) | Partner Program |
| **UX for readers** | Good | Dated | Rough | Good | Excellent | Excellent |
| **Censorship resistance** | Low-moderate | High | High | Moderate | Low | Low |

---

## So Should You Publish Onchain?

It depends on three things:

**1. Who's your audience?**
If you're writing for crypto-native readers, Paragraph is a no-brainer — it gives you web2 usability with web3 upside. If you're writing for a general audience, Substack and Medium still win on distribution by a wide margin.

**2. How much do you care about ownership?**
If "I own my content" means "I can export a markdown file," Substack is fine. If it means "my writing exists permanently on a decentralized storage layer that no company can delete," you want Arweave-backed publishing.

**3. Are you building a long-term portable identity?**
Lens and Farcaster offer something no web2 platform can: a social graph that survives platform death. If you believe the future is protocol-level audiences rather than platform-locked ones, investing in these ecosystems now is a bet on portability.

**The honest assessment:** The onchain publishing space is still early. Mirror died. t2 stalled. Steemit got hijacked. The platforms that survived (Paragraph, Hive, Lens, Farcaster) each made real trade-offs. None of them match the distribution power of Substack or Medium.

But the ownership primitives are real. The portability promise is real. And if you're already operating in web3, there's no reason not to use Paragraph for your newsletter and Farcaster for distribution. The incremental cost is near zero, and the upside — permanent content, portable audience, onchain provenance — compounds over time.

---

## Further Reading

- [Paragraph documentation](https://docs.paragraph.com/) — setup guides and onchain features
- [Lens Protocol docs](https://lens.xyz/docs/protocol) — understanding the social graph layer
- [Farcaster documentation](https://docs.farcaster.xyz/) — protocol specs and developer guides
- [Arweave.org](https://arweave.org/) — the permanent storage layer behind many of these platforms
- [Hive whitepaper](https://hive.io/whitepaper.pdf) — the reward pool model explained
