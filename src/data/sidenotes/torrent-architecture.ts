import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "torrent-architecture",
  notes: [
    {
      marker:
        "Bram Cohen's 2003 paper, \"Incentives Build Robustness in BitTorrent,\" laid out the game theory that makes the whole thing work.",
      type: "source",
      content:
        "Cohen's paper was presented at the 1st Workshop on Economics of Peer-to-Peer Systems on June 5, 2003. The paper has over 3,100 citations and remains one of the most referenced works in peer-to-peer systems research. Its central thesis: \"BitTorrent file distribution uses tit-for-tat as a method of seeking Pareto efficiency.\" The protocol achieves cooperation not through trust or altruism, but through repeated-game incentive alignment.",
      attribution: "Bram Cohen",
      url: "https://bittorrent.org/bittorrentecon.pdf",
    },
    {
      marker:
        "rarest first and the choke algorithm alone are sufficient to achieve near-optimal piece diversity and download performance",
      type: "source",
      content:
        "The 2006 paper \"Rarest First and Choke Algorithms Are Enough\" by Arnaud Legout, Guillaume Urvoy-Keller, and Pietro Michiardi (INRIA/Institut Eurecom) showed through extensive real-world experiments that rarest-first guarantees close to ideal piece diversity among peers, and that these two simple algorithms account for the vast majority of BitTorrent's performance characteristics. No complex scheduling or optimization is needed.",
      attribution: "Legout, Urvoy-Keller, Michiardi — IMC 2006",
      url: "https://arxiv.org/abs/cs/0609026",
    },
    {
      marker:
        "measurements showed 16 to 28 million concurrent nodes by 2013",
      type: "source",
      content:
        "The Mainline DHT, specified in BEP 5 and based on the Kademlia distributed hash table design, is one of the largest deployed DHTs in the world. It was first shipped in BitTorrent client version 4.2.0 in November 2005. By 2013, researchers measured 16–28 million concurrent nodes with intra-day variation of at least 10 million, making it larger than many centralized services.",
      url: "https://en.wikipedia.org/wiki/Mainline_DHT",
    },
    {
      marker:
        "170 million monthly active users",
      type: "source",
      content:
        "As of 2025, the BitTorrent ecosystem reports over 170 million monthly active users, 500 million network nodes, and 10 million daily active users. The BitTorrent client software has exceeded 2 billion cumulative installations across Windows, Mac, and Android platforms.",
      url: "https://earthweb.com/bittorrent-statistics/",
    },
    {
      marker:
        "The Pirate Bay famously switched to magnet-only in 2012",
      type: "context",
      content:
        "BEP 9 (Extension for Peers to Send Metadata Files) is what makes magnet links viable. It allows clients to join a swarm and download the torrent metadata — file names, piece hashes, structure — directly from other peers using only the 20-byte infohash. The magnet URI scheme itself was originally developed by Bitzi in 2002 as a vendor-neutral generalization of earlier P2P URI formats (ed2k, freenet). BitTorrent adopted it years later.",
      url: "https://www.bittorrent.org/beps/bep_0009.html",
    },
    {
      marker:
        "IPFS borrowed heavily from BitTorrent",
      type: "context",
      content:
        "IPFS and BitTorrent both use Merkle trees and distributed hash tables, but differ fundamentally in addressing granularity. BitTorrent groups all data under a single infohash per torrent; IPFS addresses each block individually by content hash (CID). This enables cross-dataset deduplication in IPFS but comes at a cost: IPFS nodes are significantly more resource-intensive, and content retrieval benchmarks show BitTorrent at ~800ms (50th percentile) vs IPFS at ~2.9s for comparable operations.",
      url: "https://docs.ipfs.tech/concepts/comparisons/",
    },
    {
      marker:
        "BitTorrent accounts for roughly 3% of global internet traffic today, down from 35% at its peak",
      type: "source",
      content:
        "BitTorrent currently drives approximately 2.91% of global consumer internet traffic — but the distribution is asymmetric: it accounts for roughly 22% of upstream traffic and only 3% of downstream traffic globally. The decline from ~35% at peak is largely explained by the rise of streaming video, which now comprises over 50% of total internet traffic volume. BitTorrent lost its traffic crown not because fewer people use it, but because Netflix and YouTube grew the denominator.",
      url: "https://vpnalert.com/resources/torrenting-statistics/",
    },
    {
      marker:
        "Feross Aboukhadijeh, WebTorrent implements BitTorrent over WebRTC",
      type: "note",
      content:
        "WebTorrent uses WebRTC data channels as its transport layer instead of TCP/UDP, which means it works in any modern browser without plugins. The tradeoff: WebTorrent peers can only connect to other WebTorrent peers (WebRTC) by default, not traditional BitTorrent peers (TCP). WebTorrent Desktop bridges this gap by speaking both protocols. Brave browser ships WebTorrent natively, and the library has been used for browser-based video streaming, decentralized CDNs, and peer-assisted delivery.",
      url: "https://webtorrent.io/faq",
    },
  ],
};
