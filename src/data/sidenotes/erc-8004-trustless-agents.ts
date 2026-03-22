import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "erc-8004-trustless-agents",
  notes: [
    {
      heading: "the-problem-communication-without-trust",
      type: "source",
      content:
        "Google's **Agent2Agent (A2A)** protocol was introduced in April 2025 and later donated to the Linux Foundation. It defines Agent Cards (JSON capability advertisements), task lifecycle management, and communication over HTTPS with JSON-RPC 2.0. Anthropic's **MCP** (Model Context Protocol), launched November 2024, provides the tool-use layer with three primitives: tools (model-controlled), resources (app-controlled), and prompts (user-controlled). ERC-8004 explicitly positions itself as a trust layer that sits beneath both.",
      url: "https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/",
    },
    {
      heading: "the-problem-communication-without-trust",
      type: "quote",
      content:
        "McKinsey research shows that **80% of organizations** have encountered risky behavior from AI agents. Galileo AI found that a single compromised agent can poison 87% of downstream decision-making within 4 hours through cascading failures. The trust problem is not theoretical — it is the top operational risk in multi-agent systems.",
      url: "https://www.mckinsey.com/capabilities/risk-and-resilience/our-insights/trust-in-the-age-of-agents",
    },
    {
      heading: "identity-registry-agents-as-nfts",
      type: "context",
      content:
        "The W3C's **Decentralized Identifiers (DIDs)** and **Verifiable Credentials (VCs)** are the established prior art for self-sovereign identity. A 2025 arXiv paper proposed equipping AI agents with DID-anchored identities and VCs for autonomous trust establishment. ERC-8004 takes a different approach — using ERC-721 NFTs instead of DIDs — which trades W3C interoperability for deep composability with the existing Ethereum ecosystem (wallets, marketplaces, multisigs, DAOs).",
      url: "https://arxiv.org/abs/2511.02841",
    },
    {
      heading: "identity-registry-agents-as-nfts",
      type: "note",
      content:
        "**ERC-6551** (Token Bound Accounts) could complement ERC-8004 by giving each agent identity NFT its own smart contract wallet. This means an agent's identity and its wallet become a single composable unit — the NFT *is* the agent, and the token-bound account *is* its treasury. Several community proposals explore this pairing.",
    },
    {
      heading: "reputation-registry-structured-feedback-at-scale",
      type: "counter",
      content:
        "The deliberate absence of a reputation formula is both ERC-8004's greatest strength and its biggest risk. Without a standard scoring mechanism, every consumer must implement their own trust model — which means early adopters may end up with incompatible interpretations of the same data. The Ethereum Magicians discussion thread shows active debate on whether a minimal \"recommended\" algorithm should be included as a non-normative appendix.",
      url: "https://ethereum-magicians.org/t/erc-8004-trustless-agents/25098",
    },
    {
      heading: "validation-registry-third-party-verification",
      type: "context",
      content:
        "The three validation approaches mentioned (crypto-economic, zkML, TEE) represent different points on the trust-cost spectrum. **Crypto-economic validation** (stakers re-execute tasks) is cheapest but slowest. **zkML proofs** are cryptographically rigorous but computationally expensive to generate. **TEE attestation** (Intel SGX/TDX) offers real-time verification but requires hardware trust assumptions. The registry's agnosticism lets applications pick the right tradeoff.",
    },
    {
      heading: "whos-behind-it",
      type: "source",
      content:
        "The ERC-8004 spec was first published as a draft in **August 2025**, moved to Review in October 2025, then reverted to Draft in January 2026 after community feedback warranted significant changes. The contracts were deployed to mainnet on January 29, 2026 using CREATE2 for deterministic addresses across 30+ EVM chains. Over 100 industry contributors shaped the spec, including representatives from ENS, EigenLayer, and The Graph.",
      url: "https://eips.ethereum.org/EIPS/eip-8004",
    },
    {
      heading: "what-i-think",
      type: "quote",
      content:
        "\"AI went from assistant to autonomous actor, and security never caught up.\" Autonomous agents now outnumber humans 82:1 in the average enterprise, and OWASP's 2025 LLM Top 10 ranks prompt injection as the #1 risk. ERC-8004's bet is that onchain trust primitives can provide the verification layer that centralized identity systems cannot — because in a permissionless network, there is no central authority to vouch for anyone.",
      url: "https://www.helpnetsecurity.com/2026/03/03/enterprise-ai-agent-security-2026/",
    },
  ],
};
