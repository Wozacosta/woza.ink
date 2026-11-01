import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "kohaku-private-wallets",
  notes: [
    {
      marker: "about $6 million from some 1,500 users",
      type: "note",
      content:
        "That's since its March 2025 launch, from a 0xbow press release around its $3.5 million seed round: 1,186 withdrawals in all. The piece isn't dated, and an April 2026 article repeats the same numbers, so the real total may be higher by now.",
      url: "https://blockeden.xyz/blog/2026/04/12/0xbow-privacy-compliance-defi-fatf-travel-rule/",
    },
    {
      marker: "extra seed phrases, no multisig support in private pools",
      type: "source",
      content:
        "This is Cointelegraph's summary of his Kohaku talk, not his own wording. I couldn't find the talk's transcript.",
    },
    {
      marker: "would collect IP and wallet addresses on transactions",
      type: "context",
      content:
        "Switching provider doesn't fix this. MetaMask's own warning at the time said \"any RPC will receive your IP address and Ethereum wallet to make transactions.\"",
      url: "https://decrypt.co/120456/metamask-adds-new-wallet-settings-but-is-it-enough-for-user-privacy",
    },
    {
      marker: "will not be a consumer oriented product",
      type: "note",
      content:
        "It also starts on mainnet and adds layer 2s later, limited to those \"at least stage 1 and committed to reach stage 2.\"",
      url: "https://notes.ethereum.org/@niard/KohakuRoadmap",
    },
    {
      marker: "A proof that your deposit belongs to an approved set",
      type: "context",
      content:
        "If the set doesn't approve you, your money isn't stuck. A \"ragequit\" lets the original depositor pull an unapproved deposit back out, publicly. You lose the privacy, not the funds.",
      url: "https://github.com/ethereum/kohaku/blob/master/docs/pages/privacy-pools/state.mdx",
    },
    {
      marker: "a bundler submits it",
      type: "counter",
      content:
        "A bundler is still a party to trust a little. The docs warn that estimation sends it a signed operation with a valid proof, \"so the bundler could submit that provisional operation.\" Their advice: don't treat preparation as a dry run.",
      url: "https://github.com/ethereum/kohaku/blob/master/docs/pages/privacy-pools/withdrawals.mdx",
    },
    {
      marker: "which check the RPC's answers against the chain themselves",
      type: "counter",
      content:
        "Syncing a pool needs its whole event history, and Helios only serves logs for the latest 8,191 blocks. So the docs' Helios example passes eth_getLogs straight through to an ordinary RPC.",
      url: "https://github.com/ethereum/kohaku/blob/master/docs/pages/provider.mdx",
    },
    {
      marker: "it moves the trust to Intel's hardware",
      type: "counter",
      content:
        "The project overview says so directly: \"Trust in Intel TDX hardware root and the published enclave measurement.\" It's a planning document, not a status report, so I can't say how far along the server is.",
      url: "https://hackmd.io/@tkmct/BywaGeY2le",
    },
    {
      marker: "verifies two signatures",
      type: "note",
      content:
        "Post-quantum keys are big. For ML-DSA, each user has to store a 20 kB expanded public key in a contract as an initial step, and the gas cost is why the team deployed to Arbitrum Sepolia as well as L1 Sepolia.",
      url: "https://github.com/ethereum/kohaku/tree/master/packages/pq-account",
    },
    {
      marker: "his retrial on the remaining counts",
      type: "context",
      content:
        "The jury deadlocked on conspiracy to launder money and conspiracy to violate sanctions, which carry up to 40 years between them. The retrial is set for April 26, 2027, and his motion for acquittal is still undecided.",
      url: "https://www.theblock.co/news/regulation/2026-08-26-tornado-cash-roman-storm-retrial-april-2027-412761",
    },
    {
      marker: "Ambire says it has spent months on integrations",
      type: "quote",
      content:
        "\"The Kohaku team is working hard to make privacy a normal part of Ethereum. [...] Their SDK, including integrations with @RAILGUN_Project, @0xprivacypools, and @TornadoCash, is becoming more and more mature. Now it's time for wallets to do their part.\"",
      attribution: "Jordan Enev, October 23, 2026",
      url: "https://crypto.news/ethereum-foundation-default-wallet-privacy-kohaku/",
    },
  ],
};
