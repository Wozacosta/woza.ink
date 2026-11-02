import type { InteractiveDiagramConfig } from "./types";

export const agentPaymentsChoice: InteractiveDiagramConfig = {
  tourLabel: "Walk the cases",
  intro: "Tap a box for the reasoning, or walk through each case in turn.",
  nodes: [
    {
      id: "open",
      title: "Open API or indie service",
      description: "No signup, no vendor dependency. Add middleware, set a price, and any agent with a wallet can pay.",
      links: ["x402"],
    },
    {
      id: "agents",
      title: "Building agents",
      description: "Support x402 first and treat everything else as optional. Consolidation at the settlement layer makes it the safest bet.",
      links: ["x402"],
    },
    {
      id: "enterprise",
      title: "Must prove authorization",
      description: "For when someone will ask you to prove the agent was allowed to spend.",
      links: ["ap2"],
    },
    {
      id: "stripe",
      title: "Already on Stripe",
      description: "It's a config change, not a replatform, and the compliance layer covers fraud, tax and refunds.",
      links: ["mpp"],
    },
    {
      id: "bitcoin",
      title: "Bitcoin-native",
      description: "Or you want the credential to be the receipt. Verify that your wallet returns preimages before committing.",
      links: ["l402"],
    },
    {
      id: "x402",
      title: "x402",
      description: "Where three of the five cases end up: the settlement layer is consolidating here.",
      links: ["open", "agents", "ap2"],
    },
    {
      id: "ap2",
      title: "AP2",
      description: "Mandates on top, settling through x402 underneath.",
      links: ["enterprise", "x402"],
    },
    {
      id: "mpp",
      title: "MPP",
      description: "Sessions and the full Stripe stack.",
      links: ["stripe"],
    },
    {
      id: "l402",
      title: "L402",
      description: "Macaroons and Lightning micropayments, with no facilitator.",
      links: ["bitcoin"],
    },
  ],
  steps: [
    {
      text: "An open API or indie service: x402. V2's discovery means facilitators can index you automatically.",
      nodes: ["open", "x402"],
      edges: ["open-x402"],
    },
    {
      text: "Building agents: x402 first. The answer in March was to support both x402 and MPP.",
      nodes: ["agents", "x402"],
      edges: ["agents-x402"],
    },
    {
      text: "An enterprise that has to prove authorization: AP2 for mandates, settling through x402.",
      nodes: ["enterprise", "ap2", "x402"],
      edges: ["enterprise-ap2", "ap2-x402"],
    },
    {
      text: "Already on Stripe: MPP.",
      nodes: ["stripe", "mpp"],
      edges: ["stripe-mpp"],
    },
    {
      text: "Bitcoin-native: L402.",
      nodes: ["bitcoin", "l402"],
      edges: ["bitcoin-l402"],
    },
  ],
};
