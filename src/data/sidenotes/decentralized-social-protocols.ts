import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "decentralized-social-protocols",
  notes: [
    {
      marker:
        "you can move your account — followers, posts, identity — between PDS providers without losing anything",
      type: "source",
      content:
        "The AT Protocol is being standardized through the IETF. An Internet Draft was published in September 2025, and the charter for the working group was published in January 2026. This is significant -- it means AT Protocol is on the path to becoming an actual internet standard, not just a Bluesky-specific spec.",
      url: "https://atproto.com/blog/protocol-check-in-fall-2025",
    },
    {
      marker:
        "several million daily active users as of early 2026",
      type: "note",
      content:
        "Bluesky grew from 10M users in September 2024 to 40.2M by November 2025 -- a 302% increase. Key catalysts: Brazil's ban on X and the US presidential election. But daily active users sit at ~3.5M (roughly 8-9% of registered users), suggesting many signups were curiosity-driven rather than sticky migrations.",
      url: "https://backlinko.com/bluesky-statistics",
    },
    {
      marker:
        "grew explosively each time Twitter/X had a crisis",
      type: "context",
      content:
        "Mastodon reports ~785K monthly active users as of early 2026, across 10-15M total accounts. The retention problem is real: every Twitter/X crisis sends a wave of signups, but most users don't stick. Meanwhile, Threads -- with 350M+ MAU -- is now the largest app speaking ActivityPub, dwarfing the entire existing fediverse. Meta has interacted with over 75% of all fediverse servers since launching its federation feature.",
      url: "https://about.fb.com/news/2025/06/its-now-easier-see-more-fediverse-content-threads/",
    },
    {
      marker:
        "Moderation that's distributed",
      type: "counter",
      content:
        "The elephant in the fediverse room: Threads. With 350M+ monthly active users, Meta's Threads is by far the largest ActivityPub-speaking app. As of July 2025, Threads users can see posts from Mastodon and other federated apps in a dedicated feed. Whether this is a gift to the fediverse or an embrace-extend-extinguish play remains the most contentious debate in the ecosystem.",
      url: "https://techcrunch.com/2025/06/17/threads-expands-open-social-web-integrations-with-fediverse-feed-user-profile-search/",
    },
    {
      marker:
        "stored off-chain on \"Hubs\" but linked to your onchain identity",
      type: "source",
      content:
        "Snapchain launched on mainnet in April 2025, replacing Farcaster's CRDT-based Hub system with a BFT consensus layer using Malachite (a Rust Tendermint implementation from Starknet). It delivers 10K+ TPS with 780ms average finality at 100 validators. The architecture uses account-level sharding -- each Farcaster ID's data lives in an isolated shard requiring no cross-shard communication.",
      url: "https://cuckoo.network/blog/2025/04/07/farcasters-snapchain-a-novel-data-layer-solution-for-web3-social-networks",
    },
    {
      marker:
        "you publish signed events, relays store and forward them",
      type: "note",
      content:
        "Nostr hit 5 million Zaps (Lightning micropayments) in May 2025. Zaps use NIP-57 to enable instant Bitcoin payments within the social feed -- creators on apps like Habla.news and Fountain.fm monetize without intermediaries. The relay economics problem is real though: most relays run free, which is unsustainable at scale, pushing operators toward proof-of-work requirements or paid access.",
      url: "https://github.com/nostr-protocol/nips/blob/master/57.md",
    },
    {
      marker:
        "The EU's Digital Markets Act is putting pressure on large platforms to support interoperability",
      type: "context",
      content:
        "The EU Digital Markets Act (DMA) requires designated gatekeepers to enable interoperability with messaging services. While this initially targets messaging (not social feeds), the regulatory direction is clear: forced interoperability is coming. Meta preemptively adding ActivityPub support to Threads may be partly a compliance strategy for future DMA extensions.",
    },
    {
      marker:
        "ActivityPub is the most deployed decentralized social protocol in existence",
      type: "source",
      content:
        "ActivityPub became a W3C Recommendation on January 23, 2018. The spec defines a client-to-server API (how your app talks to your server) and a server-to-server API (how instances federate). The latter is what powers the fediverse. The spec itself is surprisingly readable at ~30 pages.",
      url: "https://www.w3.org/TR/activitypub/",
    },
  ],
};
