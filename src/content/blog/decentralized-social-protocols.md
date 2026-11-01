---
title: "Decentralized Social Networks: The Full Map"
date: "2026-03-15"
description: "Mastodon, Bluesky, Farcaster, Lens, Nostr, Loops, Pixelfed, PeerTube — what they are, how they work, and what each one is actually betting on."
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

What works: it's production-grade. Mature apps on every platform (Ivory on iOS is excellent). A large enough user base that you can find a real community. Moderation that's distributed — your instance's rules don't have to match anyone else's.

What doesn't: the instance model is confusing to new users ("which one do I join?"). Moving instances is possible but clunky. The algorithm is deliberately minimal — chronological by default, which some people love and others find noisy. Discovery is harder than on centralized platforms.

---

## Bluesky — AT Protocol in practice

[Bluesky](https://bsky.app/) started as a Twitter-incubated project and launched publicly in 2023. It runs on AT Protocol and has grown into one of the most active decentralized social platforms — several million daily active users as of early 2026.

The product feels closer to Twitter than Mastodon does. Faster, more algorithmically surfaced, with a "starter packs" onboarding that made it easier to start. The big technical differentiator: custom feeds. Anyone can build and publish a feed algorithm — you can subscribe to "the best science posts" or "posts from people in my city" built by independent developers, not just Bluesky's default.

Custom domains as handles is notable: your Bluesky handle can be your own domain (`you.yourdomain.com`), which is a lightweight but real identity portability story — your identity is yours, not just bluesky.social's.

The AT Protocol federation is partially live but most users are on Bluesky's own infrastructure. The full vision — where anyone can run a PDS and Bluesky is just one app on a shared network — is in progress. The architecture supports it; the adoption isn't there yet.

The AT Protocol ecosystem — the "Atmosphere" — is growing beyond Bluesky itself. A few apps worth watching:

- [Tangled](https://tangled.org/) — code collaboration (think GitHub) built on atproto. Your repos, issues, and PRs are tied to your AT Protocol identity, not a platform account.
- [Popfeed](https://popfeed.social/) — a media tracking and review app. Log movies, TV shows, music, and games, share reviews, and build lists. You log in with your Bluesky identity and your social graph comes with you — no rebuilding your network from scratch. Like a Letterboxd/Trakt hybrid that runs on the protocol.
- [Anisota](https://anisota.net/) — a radically different Bluesky client. It presents posts as collectible trading cards with rarity ratings and finite stamina-limited decks. The goal: slow you down. A calming, nature-themed interface designed to make you scroll less and read more intentionally.
- [Leaflet](https://leaflet.pub/) — blogs and newsletters on the protocol, with posts stored on your own PDS. It helped create [Standard.site](https://standard.site/), a shared format for long-form writing that [any site can adopt](https://atproto.com/blog/standard-site-bluesky-timeline), and that Bluesky now renders with the publication and author.
- [Graze](https://www.graze.social/) — a no-code custom feed builder for Bluesky. Drag-and-drop logic gates, regex filters, entity matching, hashtag exclusion. Feed operators get analytics (views, engagement) and can monetize through sponsorships. It's the power-user answer to "I want a feed that shows exactly what I want and nothing else."

These are concrete proof that the protocol's promise extends beyond microblogging. If your identity is portable, every app can build on the same social graph.

The easiest way to see all of it is [Atmosphere Account](https://atmosphereaccount.com/), an open-source directory of these apps and of the 200-plus account hosts behind them. Its pitch is the idea underneath all of this: "One account for all your apps." If you have a Bluesky login, you already have one. The site doesn't hold your account, which stays with your host. Its "Login with Atmosphere" just helps you pick which account to use.

Below the apps, the infrastructure is starting to spread out too. [Microcosm](https://www.microcosm.blue/) is one developer's set of open-source building blocks for AT Protocol apps, funded by community donations. Its premise: "Every social interaction in ATProto is a link!" So [Constellation](https://constellation.microcosm.blue/) crawls every record on the network and indexes over 19 billion links, which lets an app ask who replied to something without building that index itself. [Leaflet uses it](https://updates.microcosm.blue/3mbfnzmdl7s2k) for quotes and mentions. The site also lists public relays in France and Canada, so a developer doesn't have to read the network through Bluesky's.

---

## Farcaster — crypto-native social

[Farcaster](https://farcaster.xyz/) is built differently from the start. Identities are onchain (on Optimism). Posts ("casts") are stored on Snapchain, Farcaster's own data network, but linked to your onchain identity. The result: your social graph is owned by your wallet key, not any server or company.

The primary client is the [Farcaster app](https://farcaster.xyz/), [formerly Warpcast](https://www.bankless.com/read/farcaster-fires-up), but because identities and social graphs are onchain, anyone can build a client on the same data. Several alternative clients exist.

The big Farcaster-native feature is Mini Apps, [formerly Frames](https://docs.farcaster.xyz/reference/frames-redirect) — interactive apps that run inside the feed. You can build a poll, a game, a mint button, or a payment flow that works directly in the feed. This is only possible because Farcaster's architecture treats the feed as a programmable surface.

The community is heavily developer and crypto-native. The conversations you'll find are different from Mastodon or Bluesky — more technical, more crypto-adjacent, more experimentation. Whether that's a feature or a bug depends on who you are.

Honest tradeoff: the onchain identity layer adds friction. Creating a Farcaster account costs a small amount (for storage units). The crypto-native design is a real strength for certain use cases and a real barrier for mainstream adoption.

It also changed hands recently. In January 2026, [Neynar acquired Farcaster](https://www.theblock.co/post/386549/haun-backed-neynar-acquires-farcaster-after-founders-pivot-to-wallet-app) from Merkle Manufactory, after the founders had shifted to building a wallet app.

---

## Lens — one graph, many apps

[Lens](https://lens.xyz/) is the other crypto-native social protocol. Stani Kulechov, the founder of Aave, launched it on Polygon in 2022, and in April 2025 it [moved to its own chain](https://blockeden.xyz/blog/2026/04/21/lens-protocol-v3-zksync-socialfi-layer-2/) built on ZKsync. Your account and followers aren't tied to an app, so any Lens app shows you the same profile and the same audience.

Since the network is shared, apps can't compete on who's there. They compete on who they're for:

- [Orb](https://orb.club/) — the mainstream option, a mobile app on iOS and Android.
- [Hey](https://hey.xyz/) — a general feed built around social payments: pay to post, earn from what you post.
- [Palus](https://palus.app/) — the open-source client, which Lens describes as "free, open-source Lens activity across every app."
- [Soclly](https://app.soclly.com/) — the publishing tool. You can draft and schedule posts, which makes it closer to Buffer than to a place to browse.
- [Cantuum](https://www.cantuum.xyz/) — a music player, and the only one here built around a single type of content.
- [Firefly](https://apps.apple.com/app/id1640183078) — the odd one out. It's an aggregator more than a Lens client: X, Farcaster and Lens in one app, with cross-posting to reach all of them.

Ownership is more concentrated than that list suggests. In January 2026, a day before the Neynar deal, [Mask Network took over stewardship of Lens](https://www.theblock.co/post/386293/mask-network-takes-over-lens-protocol-with-goal-to-build-products-people-actually-use). Mask builds Firefly and [has acquired Orb](https://blockeden.xyz/blog/2026/04/21/lens-protocol-v3-zksync-socialfi-layer-2/), so the two apps Lens features first now belong to its steward. Portability is the check on that: if those apps go bad, your account and followers still work in the others.

Honest tradeoff: it's small. Lens had [roughly 22,000 daily active users](https://blog.thirdweb.com/decentralized-social-2026-lens-farcaster-on-chain-identity/) at mainnet launch in 2025, the latest count I could find. A portable audience is only worth as much as the audience.

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
| Lens | Custom + onchain | Microblogging, music | Wallet | Onchain social graph |
| Nostr | Nostr | General / social | Keypair | Relay-based |
| Loops | ActivityPub | Short video | Instance choice | Federation of servers |
| Pixelfed | ActivityPub | Photos/video | Instance choice | Federation of servers |
| PeerTube | ActivityPub | Long video | Instance choice | Federation of servers |

---

## The honest takes

**Mastodon** is the most real, most deployed, most adult decentralized social network. Its problems — confusing onboarding, no account migration of posts, less algorithmic discovery — are real but not fatal. If you want to leave Twitter and find an actual community, this is the most likely path to success.

**Bluesky** has better UX than Mastodon for most users and is growing fast. The AT Protocol architecture is technically superior for portability. The main open question is whether the federation actually gets used, or whether Bluesky becomes the dominant centralized node on its own network — which would be a disappointment architecturally even if the product is good.

**Farcaster** is building crypto-native identity with programmable social primitives. Mini Apps let posts run interactive apps in the feed. The audience is self-selecting and that's fine; not everything has to be for everyone. If you're building things at the intersection of social and web3, this is the most interesting platform.

**Lens** is the cleanest demonstration of one graph with many apps, and one of the smallest networks here. With Mask behind both the protocol and its most prominent apps, the question to watch is whether it stays a shared network or turns into one company's product with an open API.

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
- [Farcaster documentation](https://docs.farcaster.xyz/) — protocol specs, Mini Apps, developer guides
- [Lens](https://lens.xyz/) — the protocol, and its current list of apps
- [Loops](https://joinloops.org/) — short-form video for the fediverse; currently in open beta
- [Pixelfed](https://pixelfed.org/) — federated photo sharing
- [PeerTube](https://joinpeertube.org/) — federated video hosting by Framasoft
- [Join Mastodon](https://joinmastodon.org/) — instance picker and onboarding for new users
