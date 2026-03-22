import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "megaeth-real-time-blockchain",
  notes: [
    {
      marker:
        "Visa's network processes around 1,700 TPS at peak",
      type: "note",
      content:
        "For calibration: Solana's real-world sustained TPS sits around 1,000-4,000 (vs 65,000 theoretical max). On testnet in March 2025, MegaETH demonstrated 1,700 MGas/s vs Monad's 300 MGas/s. The mainnet stress test in January 2026 targeted 15,000-35,000 TPS with 11 billion transactions over seven days. Claimed numbers and sustained production numbers always diverge -- mainnet data over the next year is what matters.",
      url: "https://www.theblock.co/post/389015/megaeth-debuts-mainnet",
    },
    {
      marker:
        "you let one purpose-built machine do the heavy lifting, then solve the trust problem separately",
      type: "quote",
      content:
        "Creating hyper-scalable EVM implementations is a key prerequisite for truly scaling Ethereum. I am excited to see brilliant developers taking on this challenge.",
      attribution: "Vitalik Buterin, on investing in MegaLabs' $20M seed round",
      url: "https://www.theblock.co/post/302271/vitalik-buterin-megaeth-funding-token-valuation",
    },
    {
      marker:
        "make node specialization the *explicit* design principle",
      type: "context",
      content:
        "Co-founder Yilong Li holds a Stanford CS PhD; CTO Lei Yang holds an MIT PhD. The team's academic pedigree is part of the pitch -- SALT and the node specialization architecture came out of systems research, not a typical crypto startup ideation process. Li conceived MegaETH in 2022 with the thesis that radical specialization is the only path to real-time performance.",
      url: "https://leiy.me/",
    },
    {
      marker:
        "the authentication structure — the part you hash on every state access — doesn't need to live on disk if you have enough RAM",
      type: "source",
      content:
        "In standard Ethereum, updating the Merkle Patricia Trie -- the cryptographic state authentication structure -- can take up to 10x longer than actually processing the transactions themselves. SALT keeps the authentication tree in RAM and is purely CPU-bound, meaning it can be parallelized linearly across CPU cores. This is the key insight: the bottleneck was never compute, it was I/O.",
      url: "https://www.megaeth.com/blog-news/endgame-how-salt-breaks-the-bottleneck-thats-been-strangling-blockchains",
    },
    {
      marker:
        "a single sequencer is still a single point of censorship and liveness failure",
      type: "counter",
      content:
        "The centralization critique is concrete: MegaETH operates with just 16 validators (vs Ethereum's 800K+) and a 4-of-8 multisig smart contract. A rotating sequencer architecture is planned but not yet live. The mitigations -- L1 exit hatch, fraud proofs, stateless validation -- protect against data loss but not against censorship or liveness failure while the single sequencer is running.",
      url: "https://www.ainvest.com/news/megaeth-centralization-risks-implications-long-term-2601/",
    },
    {
      marker:
        "Monad takes a different approach: parallel EVM execution across decentralized validators",
      type: "context",
      content:
        "Monad launched mainnet November 24, 2025, taking a fundamentally different approach: parallel EVM execution across decentralized validators targeting 10,000 TPS with 1-second finality. It trades peak throughput for better decentralization properties. The MegaETH vs Monad comparison is the clearest articulation of the performance-decentralization tradeoff in the current L2/L1 design space.",
      url: "https://heybeluga.com/articles/megaeth-monad-comparison/",
    },
    {
      marker:
        "raw sequential execution latency — not parallel throughput, not validator count — is the binding constraint",
      type: "quote",
      content:
        "A real-time blockchain will only be realized if we don't apologize for putting performance first. The goal was never to be an L1 or an L2. The goal was to build the most performant chain possible, and this architecture is the logical conclusion of blockchain design.",
      attribution: "MegaETH team",
      url: "https://www.megaeth.com/",
    },
    {
      marker:
        "Chainlink live at launch",
      type: "note",
      content:
        "Total funding: $93.2M across four rounds, with the seed round valuing MegaETH at $100M+ fully diluted. Launching with Chainlink oracles (and therefore Aave, GMX, Lido, Lombard) on day one brought ~$14B in DeFi assets -- a deliberate strategy to avoid the cold-start problem that kills most new chains. Data availability is outsourced to EigenDA rather than posting full calldata to Ethereum.",
    },
  ],
};
