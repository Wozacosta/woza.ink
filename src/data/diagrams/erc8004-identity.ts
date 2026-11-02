import type { InteractiveDiagramConfig } from "./types";

export const erc8004Identity: InteractiveDiagramConfig = {
  tourLabel: "Look up an agent",
  intro: "Tap a row to see what it holds, or look up an agent from its identifier to its endpoints.",
  nodes: [
    {
      id: "id",
      title: "Global identifier",
      description: "The registry, as eip155:{chainId}:{identityRegistry}, plus the agentId, which is the ERC-721 tokenId. Together they name one agent on one chain.",
      links: [],
    },
    {
      id: "wallet",
      title: "agentWallet",
      description: "The agent's payment address. Setting it takes a signature from the wallet itself, so you can't point your agent at someone else's wallet.",
      links: [],
    },
    {
      id: "metadata",
      title: "Metadata",
      description: "Optional key-value pairs stored onchain, set with setMetadata.",
      links: [],
    },
    {
      id: "uri",
      title: "agentURI",
      description: "The link to the registration file. It can point to IPFS, Arweave or HTTPS. The contract keeps no hash, so a content-addressed URI is what pins the content.",
      links: ["file"],
    },
    {
      id: "file",
      title: "Agent Registration File",
      description: "An offchain JSON file with the agent's name, description, the services it offers, and endpoints for protocols like A2A, MCP or OASF.",
      links: ["uri"],
    },
  ],
  steps: [
    {
      text: "Start from the identifier: which registry on which chain, and which agentId.",
      nodes: ["id"],
      edges: [],
    },
    {
      text: "The NFT gives you the agentURI.",
      nodes: ["id", "uri"],
      edges: [],
    },
    {
      text: "The URI resolves to the registration file, which says what the agent does and how to reach it.",
      nodes: ["uri", "file"],
      edges: ["uri-file"],
    },
    {
      text: "If you're going to pay it, agentWallet is the address, and that wallet has signed to say so.",
      nodes: ["wallet"],
      edges: [],
    },
  ],
};
