---
title: "The Four Protocols Trying to Replace Twitter"
date: "2026-02-18"
description: "Nostr, Bluesky, Mastodon, and Farcaster all want to decentralize social media. They disagree on almost everything about how to do it."
tags: ["web", "privacy", "open-source"]
---

# The Four Protocols Trying to Replace Twitter

Every time a centralized platform implodes — a policy change, an acquisition, an erratic new owner — the same conversation starts: "We should decentralize social media."

The interesting thing is that people are actually trying. And they've come up with four fundamentally different answers to the same question: how do you build a social network that no single company can control?

The answers are **Nostr**, **AT Protocol** (Bluesky), **ActivityPub** (Mastodon), and **Farcaster**. Each makes different bets on what decentralization means, what trade-offs are acceptable, and what the actual problem is.

Let's look at the protocols underneath.

## Nostr: Keys, Events, and Nothing Else

Nostr stands for "Notes and Other Stuff Transmitted by Relays." It's the most radical of the four — not because of what it includes, but because of what it doesn't.

The entire protocol has three concepts: **keys**, **events**, and **relays**.

Your identity is a cryptographic key pair using secp256k1 (the same curve as Bitcoin). Your public key is your identity. Your private key signs everything you post. There's no username, no email, no server account. You *are* your key.

Everything you do — posting, liking, following, updating your profile — is an **event**: a signed JSON blob with a kind number, some content, and your signature. That's the entire data model. Kind 0 is metadata. Kind 1 is a text note. Kind 3 is your contact list. The protocol is extended through community proposals called **NIPs** (Nostr Implementation Possibilities), which define new event kinds and behaviors.

Events are published to **relays** — simple servers that accept, store, and serve events over WebSockets. Anyone can run a relay. Relays don't talk to each other. There's no federation, no consensus, no coordination. Your client connects to multiple relays and stitches together a view of the world.

If a relay bans you, you publish to different relays. If a relay goes down, your signed events can be re-published anywhere. Your identity is your key — it doesn't live on any server.

The trade-off is obvious: the UX is rough. Key management is hard. Losing your private key means losing your identity permanently. Spam filtering is relay-by-relay. Discovery relies on the "outbox model" — clients look up which relays you publish to and connect directly.

But there's an elegance to the simplicity. Nostr doesn't need DNS, doesn't need a blockchain, doesn't need a foundation. It needs WebSockets and cryptographic signatures. Jack Dorsey donated $10 million to Nostr development in 2025, which is ironic given that the protocol's entire philosophy is that it shouldn't need anyone's permission or money to exist.

## AT Protocol: The Layered Architecture

Bluesky's AT Protocol (Authenticated Transfer Protocol) takes the opposite approach from Nostr. Where Nostr is minimal, AT Protocol is engineered.

The architecture has three layers:

**Personal Data Servers (PDS)** store your data. Think of them like your email provider — they host your posts, follows, likes, and profile in a signed data repository. You can self-host a PDS or use a provider (Bluesky runs the largest one). The key design goal: you can migrate your account to a different PDS without the server's cooperation. Your data is signed and your identity is anchored to a DID (Decentralized Identifier), not to any particular server.

**Relays** aggregate data from all PDSes into a single stream — the "firehose." Every change happening anywhere on the network flows through relays in real time. This is the indexing layer. It's expensive to run (though the 2025 roadmap has focused on making relays cheaper), and currently Bluesky operates the dominant one.

**AppViews** consume the firehose and serve processed data to client apps. An AppView is essentially an API backend — it takes the raw stream, indexes it, and presents it in whatever shape a particular application needs. Bluesky's microblogging app is one AppView. But others exist: Frontpage (a Hacker News-style link aggregator), Smoke Signal (an RSVP service), and others, all reading from the same protocol.

Everything is tied together by **Lexicons** — a global schema language that defines what data structures look like. Different AppViews can define their own lexicons, so the same protocol can support microblogging, video sharing, or anything else.

Identity uses DIDs and domain-based handles. Your handle can be your own domain (mine could be `@woza.ink`), which means you verify your identity through DNS rather than trusting a central authority.

The AT Protocol is going through IETF standardization as of January 2026. There are about 2,000 third-party PDS servers, though most are tiny. The network has crossed 20 million users, maintained by around 15 engineers.

The criticism: despite the federated architecture, the network currently depends heavily on Bluesky's infrastructure. The relay and AppView layers are technically open but practically centralized. Bluesky acknowledges this and calls true multi-stakeholder infrastructure "hard decentralization" — a goal, not a current state.

## ActivityPub: The Fediverse Standard

ActivityPub is the oldest of the four, published as a W3C Recommendation in January 2018. It's the protocol behind Mastodon, but also PeerTube (video), Pixelfed (photos), Lemmy (link aggregation), BookWyrm (book reviews), and dozens of other platforms. Together, they form the **Fediverse** — a network of independently operated servers that speak the same language.

The protocol defines two things: a **client-to-server API** for creating and modifying content, and a **server-to-server protocol** for delivering content across instances. It uses ActivityStreams 2.0 (JSON-LD) as its data format, with three core types: Objects (content), Activities (actions on content), and Actors (users, groups, services).

Every actor has an **inbox** and an **outbox**. Publishing is straightforward: you create an activity, it goes to your outbox, your server delivers it (via HTTP POST) to the inboxes of everyone in the activity's addressing fields. Receiving servers process it and update their local state.

The federation model is instance-based. You create an account on a Mastodon instance — say, `@alice@mastodon.social` — and that instance is your home. You can follow and interact with users on any other ActivityPub instance. Each instance sets its own rules, moderation policies, and content guidelines. Admins can block entire instances they find problematic.

This is both the strength and the weakness. Instance-based identity means your username is tied to a server. If that server shuts down, your identity goes with it. Account migration exists but is limited — you can move followers, but your post history stays behind. This is a known pain point and an active area of work, but it's not solved yet.

The Fediverse has over 15 million users across thousands of servers. Meta's Threads has implemented partial ActivityPub support — crossposting works, but full two-way federation is still incomplete as of 2025. WordPress added ActivityPub support in 2025, which is potentially significant given how much of the web runs on WordPress.

The W3C announced a new Social Web Working Group starting January 2026 to maintain and evolve the protocol. There's some tension here: the only two organizations active in the Fediverse that are paid W3C members are Meta and the Social Web Foundation (which receives Meta funding). Mastodon gGmbH and other major Fediverse developers aren't W3C members, creating a governance gap between protocol stewardship and the people actually building the software.

## Farcaster: The Crypto-Native Approach

Farcaster takes a different bet: put identity on a blockchain, put everything else off it.

The protocol uses a "sufficiently decentralized" hybrid architecture. Three smart contracts on OP Mainnet (an Ethereum Layer 2) handle the critical stuff: **IdRegistry** maps Farcaster IDs to Ethereum wallet addresses, **KeyRegistry** manages which signing keys can post on behalf of an account, and **StorageRegistry** tracks how much storage an account has paid for (about $7/year for 5,000 posts plus reactions and follows).

Everything else — posts ("casts"), follows, reactions, profiles — lives offchain in a peer-to-peer network. In April 2025, Farcaster upgraded from a CRDT-based system to **Snapchain**, a consensus layer built on Malachite BFT that handles 10,000+ transactions per second with sub-second finality. The data is validated by 11 community-elected validators.

The crypto-native identity opens up interesting possibilities. **Frames** let developers embed interactive applications directly in posts — an NFT mint button, a token swap, a DAO vote. It's the most composable of the four protocols, if you're already in the Ethereum ecosystem.

The challenge is that Farcaster's audience is almost entirely crypto-native. Daily active users have settled around 40,000–60,000 as of late 2025, despite the technical infrastructure being designed for millions. The protocol raised $150 million in venture funding with 80,000 daily users — a ratio that raised eyebrows. In January 2026, Farcaster transitioned to new ownership under Neynar, with the original company planning to return the $180 million it had raised.

The technical architecture is impressive. The adoption story is still being written.

## The Protocols, Compared

Here's where they diverge on the questions that matter:

### Identity

- **Nostr**: Cryptographic key pair. You are your key. Lose it, lose everything
- **AT Protocol**: DIDs anchored to domain names. Portable across servers. You can be `@yourname.com`
- **ActivityPub**: Server-bound. `@user@instance.com`. Moving means starting over (mostly)
- **Farcaster**: Ethereum wallet address mapped to an onchain ID. Your identity is an NFT, essentially

### Data Ownership

- **Nostr**: Your signed events can be re-published to any relay. True portability
- **AT Protocol**: Signed data repositories. Designed for migration without server cooperation
- **ActivityPub**: Data lives on your instance. Migration is partial — followers move, posts don't
- **Farcaster**: Identity is onchain and portable. Social data lives in the Snapchain network

### Decentralization Model

- **Nostr**: No coordination. Relays are independent. Maximum chaos, maximum censorship resistance
- **AT Protocol**: Federated layers (PDS, Relay, AppView). Designed for decentralization, currently fairly centralized in practice
- **ActivityPub**: Instance-based federation. Genuinely distributed, but identity is fragile
- **Farcaster**: Hybrid. Onchain identity, offchain data with BFT consensus. Decentralized-ish

### Governance

- **Nostr**: Nobody. Community NIPs. No foundation required
- **AT Protocol**: Bluesky PBC, moving toward IETF standardization
- **ActivityPub**: W3C, with governance tensions between corporate members and actual developers
- **Farcaster**: Originally Merkle Manufactory (VC-funded), now Neynar

### Moderation

- **Nostr**: Relay-level. Each relay decides what to host. No global moderation
- **AT Protocol**: Labelers and algorithmic feeds. Moderation is a pluggable service, not a platform decision
- **ActivityPub**: Instance-level. Admins set rules and can defederate from problematic instances
- **Farcaster**: App-level. The Warpcast client has its own moderation; the protocol doesn't enforce it

## What Actually Matters

These protocols aren't competing to solve the same problem. They're competing visions of what the problem *is*.

**Nostr** says the problem is that any intermediary can be compromised, so eliminate intermediaries. Build on cryptography and nothing else.

**AT Protocol** says the problem is data lock-in and algorithmic control, so make data portable and algorithms choosable. Engineer the layers carefully.

**ActivityPub** says the problem is centralized ownership, so federate the servers and let communities self-govern. Use existing web standards.

**Farcaster** says the problem is that identity should be an asset you own, so put it on a blockchain and build composable social primitives on top.

None of them have won. All of them work. The AT Protocol has the most users (20 million on Bluesky). ActivityPub has the broadest ecosystem (dozens of different apps speaking the same protocol). Nostr has the most radical architecture. Farcaster has the most sophisticated onchain integration.

The real test isn't technical — it's whether any of these protocols can survive the moment when they become large enough to matter. When governments want to regulate them, when spam becomes overwhelming, when the people running infrastructure get tired of doing it for free.

Centralized platforms fail in predictable ways: acquisition, enshittification, policy capture. Decentralized protocols fail in different ways: governance disputes, infrastructure costs, and the simple reality that running a server is harder than creating an account.

We're still early. But at least we have options. And unlike the last decade of social media, the data formats are open, the code is auditable, and if any of these platforms betrays its users — the protocol survives.

---

*Interested in decentralized protocols? Check out my article on [Matrix](/blog/matrix-protocol), the open protocol for encrypted messaging, or [Signal vs Telegram](/blog/signal-vs-telegram) for a look at what "encrypted" really means.*
