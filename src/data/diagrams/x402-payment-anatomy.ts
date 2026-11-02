import type { InteractiveDiagramConfig } from "./types";

export const x402PaymentAnatomy: InteractiveDiagramConfig = {
  tourLabel: "Read a price",
  intro: "Tap a field to see what it means, or read the entry the way a client does.",
  nodes: [
    {
      id: "scheme",
      title: "scheme",
      description: "How the payment works. exact transfers a specific amount; the other schemes are below.",
      links: [],
    },
    {
      id: "network",
      title: "network",
      description: "A CAIP-2 chain ID. eip155:84532 is the Base Sepolia testnet.",
      links: [],
    },
    {
      id: "amount",
      title: "amount",
      description: "In the token's smallest unit. USDC has six decimals, so 10000 is 0.01 USDC.",
      links: [],
    },
    {
      id: "asset",
      title: "asset",
      description: "The token's contract address, here USDC on Base Sepolia.",
      links: [],
    },
    {
      id: "payto",
      title: "payTo",
      description: "The address that gets paid. The client's signature fixes it, so a facilitator can't change it.",
      links: [],
    },
    {
      id: "timeout",
      title: "maxTimeoutSeconds",
      description: "How long the payment stays usable, in seconds.",
      links: [],
    },
  ],
  steps: [
    {
      text: "Can I pay this way at all? The client checks the scheme and network against what it supports.",
      nodes: ["scheme", "network"],
      edges: [],
    },
    {
      text: "How much, and in what? 10000 of this token is 0.01 USDC.",
      nodes: ["amount", "asset"],
      edges: [],
    },
    {
      text: "To whom, and how fast? Then it signs a payment matching this entry.",
      nodes: ["payto", "timeout"],
      edges: [],
    },
  ],
};
