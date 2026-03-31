---
title: "Decentralized Social Networks: The Full Map"
date: "2026-03-15"
description: "Mastodon, Bluesky, Farcaster, Nostr, Loops, Pixelfed, PeerTube — what they are, how they work, and what each one is actually betting on."
tags: ["web", "decentralized", "social", "protocols"]
---

# Decentralized Social Networks: The Full Map

The pitch for decentralized social networks is simple: your account shouldn't be a hostage. One company shouldn't be able to decide what you see, who you can talk to, or whether your years of posts disappear because an executive made a bad call.

The reality is messier. "Decentralized" covers a wide range of approaches with different tradeoffs, and the ecosystem has fragmented into competing protocols, philosophies, and communities that don't always talk to each other. This is the map.

---

## The two underlying protocols

Almost everything in this space runs on one of two protocols. Understanding them first makes everything else clearer.

### ActivityPub

[ActivityPub](https://www.w3.org/TR/activitypub/) is a W3C standard from 2018. It's the protocol that powers the "fediverse" — a federation of independent servers where users on different servers can follow each other, like posts, and interact across instances.

The model: you create an account on a server (an "instance") run by someone — maybe yourself, maybe a small community, maybe a large public host. That server speaks ActivityPub, which means your account can interact with accounts on any other ActivityPub-speaking server. The servers are federated, not centralized.

ActivityPub is the most deployed decentralized social protocol in existence. Mastodon, Pixelfed, PeerTube, Loops, Lemmy, Misskey, and dozens of others all speak it. You can follow a Mastodon user from Pixelfed. A Loops video can be boosted from a Mastodon account. The fediverse is real infrastructure with real users — not a whitepaper.

### AT Protocol

[AT Protocol](https://atproto.com/) is what Bluesky runs on. It's newer and makes different architectural bets. Rather than a federation of servers, it uses a layered model: your identity and data live in a "Personal Data Server" (PDS) that you own or rent, separate from the apps you use to interact. A big Relay aggregates posts from across the network. Labeling services handle moderation. Apps read from the relay and write to your PDS.

The key difference from ActivityPub: in AT Protocol, you can move your account — followers, posts, identity — between PDS providers without losing anything. In ActivityPub, moving between instances is partially supported but your posts don't move with you. AT Protocol bakes portability in at the architecture level.

---

## Mastodon — the fediverse's flagship

[Mastodon](https://joinmastodon.org/) is the most visible ActivityPub platform and the one most people mean when they say "the fediverse." It launched in 2016 and grew explosively each time Twitter/X had a crisis (2022 Musk acquisition brought hundreds of thousands of new users).

The experience: you join an instance — mastodon.social, fosstodon.org, hachyderm.io, or hundreds of others — and get a Twitter-like timeline. You can follow anyone on any instance. Your instance has its own moderators and rules. The "federated timeline" shows everything your instance's users follow. The "local timeline" shows just your instance.

What works: it's genuinely production-grade. Mature apps on every platform (Ivory on iOS is excellent). A large enough user base that you can find a real community. Moderation that's distributed — your instance's rules don't have to match anyone else's.

What doesn't: the instance model is confusing to new users ("which one do I join?"). Moving instances is possible but clunky. The algorithm is deliberately minimal — chronological by default, which some people love and others find noisy. Discovery is harder than on centralized platforms.

---

## Bluesky — AT Protocol in practice

[Bluesky](https://bsky.app/) started as a Twitter-incubated project and launched publicly in 2023. It runs on AT Protocol and has grown into one of the most active decentralized social platforms — several million daily active users as of early 2026.

The product feels closer to Twitter than Mastodon does. Faster, more algorithmically surfaced, with a "starter packs" onboarding that made it genuinely accessible. The big technical differentiator: custom feeds. Anyone can build and publish a feed algorithm — you can subscribe to "the best science posts" or "posts from people in my city" built by independent developers, not just Bluesky's default.

Custom domains as handles is notable: your Bluesky handle can be your own domain (`you.yourdomain.com`), which is a lightweight but real identity portability story — your identity is yours, not just bluesky.social's.

The AT Protocol federation is partially live but most users are on Bluesky's own infrastructure. The full vision — where anyone can run a PDS and Bluesky is just one app on a shared network — is in progress. The architecture supports it; the adoption isn't there yet.

The AT Protocol ecosystem — the "Atmosphere" — is growing beyond Bluesky itself. A few apps worth watching:

- [Tangled](https://tangled.org/) — code collaboration (think GitHub) built on atproto. Your repos, issues, and PRs are tied to your AT Protocol identity, not a platform account.
- [Popfeed](https://popfeed.social/) — a media tracking and review app. Log movies, TV shows, music, and games, share reviews, and build lists. You log in with your Bluesky identity and your social graph comes with you — no rebuilding your network from scratch. Like a Letterboxd/Trakt hybrid that runs on the protocol.
- [Anisota](https://anisota.net/) — a radically different Bluesky client. It presents posts as collectible trading cards with rarity ratings and finite stamina-limited decks. The goal: slow you down. A calming, nature-themed interface designed to make you scroll less and read more intentionally.

These are concrete proof that the protocol's promise extends beyond microblogging. If your identity is portable, every app can build on the same social graph.

---

## Farcaster — crypto-native social

[Farcaster](https://farcaster.xyz/) is built differently from the start. Identities are onchain (on Optimism). Posts ("casts") are stored off-chain on "Hubs" but linked to your onchain identity. The result: your social graph is owned by your wallet key, not any server or company.

The primary client is [Warpcast](https://warpcast.com/), but because identities and social graphs are onchain, anyone can build a client on the same data. Several alternative clients exist.

The big Farcaster-native feature is Frames — interactive mini-apps that run inside casts. You can build a poll, a game, a mint button, or a payment flow that works directly in the feed. This is only possible because Farcaster's architecture treats the feed as a programmable surface.

The community is heavily developer and crypto-native. The conversations you'll find are different from Mastodon or Bluesky — more technical, more crypto-adjacent, more experimentation. Whether that's a feature or a bug depends on who you are.

Honest tradeoff: the onchain identity layer adds friction. Creating a Farcaster account costs a small amount (for storage units). The crypto-native design is a real strength for certain use cases and a real barrier for mainstream adoption.

---

## Nostr — cryptographic minimalism

[Nostr](https://nostr.com/) stands for "Notes and Other Stuff Transmitted by Relays." The design is extreme minimalism: you have a keypair, you publish signed events, relays store and forward them. That's it.

There's no protocol for following someone — your client handles that. There's no canonical server — you publish to whatever relays you like. Clients read from relays and show you what they want. The protocol defines the message format; everything else is up to clients and relays.

The appeal: it's censorship-resistant in a real way. There's nothing to shut down. Your key is your identity — portable to any client, stored anywhere. A government can block relays but can't take your key or your content.

The cost: UX varies wildly by client. Discovery is hard. Spam filtering is a client-side problem. The ecosystem is more experimental than production-grade. [Primal](https://primal.net/) and [Snort](https://snort.social/) are among the better current clients; [Damus](https://damus.io/) for iOS.

Nostr is also broader than social — it's being used for encrypted messaging, long-form content, marketplaces, and more. The minimal protocol makes it a general-purpose signed-event pipe.

---

## Loops — TikTok for the fediverse

[Loops](https://joinloops.org/) is the newest major fediverse app, currently in open beta. It's a short-form vertical video platform — TikTok's format, ActivityPub's infrastructure. Built by the same developer behind Pixelfed (dansup), it speaks ActivityPub natively, so your Loops videos are visible from Mastodon, and you can follow Loops creators from any fediverse account.

The pitch is direct: all the creator tools of short-form video, none of the corporate control. No ads, open-source, no algorithmic dark patterns. A chronological Following feed plus a For You feed powered by engagement and hashtags, not advertising optimization.

It's early. The community is small. The For You feed is only interesting once enough creators are on it. But the architecture is right: if short-form video is where creators live, having a federated, non-corporate version matters. And unlike building on TikTok or Instagram Reels, content on Loops is yours and portable.

---

## Pixelfed — Instagram, federated

[Pixelfed](https://pixelfed.org/) is Instagram for the fediverse. Photo and video sharing, follows, likes, stories, explore pages — the familiar format, on ActivityPub. You join an instance, or run your own, and your posts are accessible to the broader fediverse.

The moderation and community quality on Pixelfed tends to be better than Instagram by default — smaller, more intentional communities with actual human moderators. The tradeoff is smaller audiences and less discovery infrastructure.

If you're a photographer or visual artist who wants to own your work and not have it harvested for advertising models, Pixelfed is the most polished existing option.

---

## PeerTube — YouTube, federated

[PeerTube](https://joinpeertube.org/) is YouTube for the fediverse. Developed by French non-profit Framasoft, it lets anyone run a video hosting instance. Instances federate via ActivityPub — you can follow a PeerTube channel from Mastodon and see new videos in your feed. Videos use WebRTC peer-to-peer delivery to reduce server bandwidth when content gets popular.

Over 1 million videos across 1,600+ instances as of 2026. The quality varies enormously by instance — some are carefully curated communities, others are barely moderated. The UX is functional but not as polished as YouTube.

PeerTube is most meaningful for creators who want to publish content that can't be easily demonetized or taken down by a corporate content policy — educational content, journalism, political commentary, niche communities.

---

## The comparison

| Platform | Protocol | Content type | Onboarding | Decentralization |
|---|---|---|---|---|
| Mastodon | ActivityPub | Microblogging | Instance choice | Federation of servers |
| Bluesky | AT Protocol | Microblogging | Easy | PDS portability |
| Farcaster | Custom + onchain | Microblogging | Wallet required | Onchain identity |
| Nostr | Nostr | General / social | Keypair | Relay-based |
| Loops | ActivityPub | Short video | Instance choice | Federation of servers |
| Pixelfed | ActivityPub | Photos/video | Instance choice | Federation of servers |
| PeerTube | ActivityPub | Long video | Instance choice | Federation of servers |

---

## The honest takes

**Mastodon** is the most real, most deployed, most adult decentralized social network. Its problems — confusing onboarding, no account migration of posts, less algorithmic discovery — are real but not fatal. If you want to leave Twitter and find an actual community, this is the most likely path to success.

**Bluesky** has better UX than Mastodon for most users and is growing fast. The AT Protocol architecture is technically superior for portability. The main open question is whether the federation actually gets used, or whether Bluesky becomes the dominant centralized node on its own network — which would be a disappointment architecturally even if the product is good.

**Farcaster** is building something that nobody else is — crypto-native identity with programmable social primitives. Frames are genuinely novel. The audience is self-selecting and that's fine; not everything has to be for everyone. If you're building things at the intersection of social and web3, this is the most interesting platform.

**Nostr** is the most censorship-resistant and the most experimental. If you're in a country with aggressive internet censorship, or you're building on a very minimal decentralized primitive, Nostr is worth understanding. For casual social media users it's too rough.

**Loops** is early but architecturally correct. Short-form video is where creators are; having a non-corporate, federated version is worth building. Check back in a year.

**Pixelfed and PeerTube** are for specific use cases — visual creators and video publishers who care about ownership and moderation sovereignty. They're not trying to replace Instagram or YouTube at scale; they're trying to give creators an alternative that doesn't exploit them.

---

## The bigger picture

The fediverse isn't one thing competing against Twitter or TikTok. It's an infrastructure layer — a set of protocols that let different communities and platforms interoperate without a central authority controlling the pipes.

The bet isn't "one of these replaces social media." The bet is that over time, enough of the ecosystem moves to open protocols that the network effects currently locked inside corporate platforms become accessible to everyone. Whether that happens in five years or twenty depends on tooling, UX, and regulatory pressure on the incumbents.

The interesting signal: every major Twitter/X crisis sent a wave of users to Mastodon. The EU's Digital Markets Act is putting pressure on large platforms to support interoperability. The momentum is slow but real.

---

## Further reading

- [Nostr.com](https://nostr.com/) — approachable intro, apps directory, NIPs browser
- [AT Protocol documentation](https://atproto.com/) — specs, SDKs, and developer guides for Bluesky's underlying protocol
- [ActivityPub W3C specification](https://www.w3.org/TR/activitypub/) — the actual standard; [activitypub.rocks](https://activitypub.rocks/) is a more readable entry point
- [Farcaster documentation](https://docs.farcaster.xyz/) — protocol specs, Frames API, developer guides
- [Loops](https://joinloops.org/) — short-form video for the fediverse; currently in open beta
- [Pixelfed](https://pixelfed.org/) — federated photo sharing
- [PeerTube](https://joinpeertube.org/) — federated video hosting by Framasoft
- [Join Mastodon](https://joinmastodon.org/) — instance picker and onboarding for new users
