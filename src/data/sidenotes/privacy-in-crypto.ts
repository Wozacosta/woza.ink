import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "privacy-in-crypto",
  notes: [
    {
      marker:
        "The ring size (number of decoys) has grown over time",
      type: "source",
      content:
        "Monero upgraded to Bulletproofs+ in June 2022, reducing transaction sizes by 5-7%. The next major leap is FCMP++ (Full-Chain Membership Proofs), currently on testnet since October 2025, which replaces ring signatures entirely with zero-knowledge proofs. This expands the anonymity set from 16 decoys to potentially 100 million outputs across the entire chain -- a qualitative change in privacy guarantees. Mainnet activation is tentatively planned for mid-2026.",
      url: "https://www.getmonero.org/2024/04/27/fcmps.html",
    },
    {
      marker:
        "the first real-world deployment of zk-SNARKs",
      type: "context",
      content:
        "Zcash's Sapling trusted setup ceremony in 2018 accepted over 90 participants, of which only one needed to behave honestly for the setup to be secure. The earlier Powers of Tau ceremony (organized by the Zcash Foundation) was the largest multi-party computation ceremony ever performed at the time. The Halo proving system, developed by Electric Coin Co., later eliminated the need for trusted setups entirely -- a breakthrough that influenced the entire ZK ecosystem.",
      url: "https://electriccoin.co/blog/completion-of-the-sapling-mpc/",
    },
    {
      marker:
        "your balances, transfers, and DeFi interactions are encrypted and invisible on-chain",
      type: "quote",
      content:
        "Vitalik Buterin has repeatedly used RAILGUN for personal transactions (most recently a $2.6M transfer in June 2025), citing its Private Proofs of Innocence as a key differentiator. He has argued that user privacy should be treated as a default feature, not an optional add-on, and outlined recommended steps for making Ethereum more private in an April 2024 developer forum post.",
      attribution: "Vitalik Buterin, via Ethereum developer forum and onchain usage",
      url: "https://www.coindesk.com/tech/2025/06/04/vitalik-buterin-uses-privacy-tool-railgun-again-signaling-ongoing-embrace-of-on-chain-anonymity",
    },
    {
      marker:
        "RAILGUN's compliance features don't guarantee it won't face the same treatment as Tornado Cash",
      type: "note",
      content:
        "RAILGUN's TVL grew from ~$14M in January 2024 to $106M by 2025 -- a roughly 650% increase. All-time shielded volume hit $2B in October 2024, with monthly volume exceeding $140M and $300K in protocol fees on a 13-month growth streak. The protocol is live on Ethereum, Arbitrum, Polygon, and BSC.",
      url: "https://medium.com/@Railgun_Project/railgun-2024-a-year-in-review-fb93e6420172",
    },
    {
      marker:
        "Chain analysis firms have become sophisticated enough that even multi-hop transaction paths can often be traced",
      type: "context",
      content:
        "Chainalysis KYT now monitors over 250 cryptocurrencies (up from 120 in 2023). Over 800 government agencies in 70 countries use Chainalysis Reactor for blockchain investigations. The firm has helped seize over $12.6 billion in illicit funds. A leaked 2024 training video showed limited Monero tracing via malicious node IP correlation -- not transaction graph analysis, but still a crack in the armor.",
      url: "https://yellow.com/research/crypto-surveillance-in-2025-how-chainalysis-the-fbi-and-ai-track-your-wallet",
    },
    {
      marker:
        "OFAC [sanctioned Tornado Cash](https://home.treasury.gov/news/press-releases/jy0916)",
      type: "source",
      content:
        "The Tornado Cash legal saga reached a split verdict in August 2025. Roman Storm was convicted of conspiracy to operate an unlicensed money transmitting business (up to 5 years), but the jury deadlocked on the more serious charges: conspiracy to commit money laundering and conspiracy to violate sanctions (each carrying up to 20 years). Earlier, in December 2024, the Fifth Circuit ruled OFAC exceeded its authority by sanctioning autonomous smart contract code, and in March 2025 the Trump administration officially removed Tornado Cash from the sanctions list.",
      url: "https://www.coindesk.com/policy/2025/08/06/roman-storm-guilty-of-unlicensed-money-transmitting-conspiracy-in-partial-verdict",
    },
    {
      marker:
        "privacy tools that offer no compliance path face increasing legal risk",
      type: "counter",
      content:
        "The \"privacy = crime\" framing has a concrete counterexample: Chainalysis's own 2024 report showed that the vast majority of Monero usage is legitimate. The same firm that helps trace illicit transactions acknowledges that illicit activity represents a small fraction of total crypto volume. Privacy tools are used overwhelmingly for ordinary financial privacy -- the same kind banks provide by default.",
    },
    {
      marker:
        "LocalMonero launched in 2017 as a LocalBitcoins-style marketplace for XMR trades",
      type: "note",
      content:
        "LocalMonero's shutdown in May 2024 left a real gap. Haveno, its decentralized successor (forked from Bisq, runs on Tor, uses Monero multisig escrow), reached mainnet readiness in late 2024 but liquidity remains thin. The architectural shift from hosted platform to decentralized protocol is the right direction, but the UX and liquidity gap shows that decentralization alone does not solve the market-making problem.",
    },
  ],
};
