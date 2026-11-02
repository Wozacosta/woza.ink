import type { InteractiveDiagramConfig } from "./types";

export const agentPaymentsStack: InteractiveDiagramConfig = {
  tourLabel: "Follow one purchase",
  intro: "Tap a protocol to see its layer, or follow one purchase down through all three.",
  nodes: [
    {
      id: "acp",
      title: "ACP",
      description: "The checkout layer, from OpenAI and Stripe: merchant catalogs, product selection and order flow. It's built for an agent buying a sweater, not one making 500 API calls.",
      links: ["ap2"],
    },
    {
      id: "ap2",
      title: "AP2",
      description: "The authorization layer, from Google. Its primitive is the mandate: a signed, pre-authorized spending permission that an agent carries and a merchant can verify.",
      links: ["acp", "x402"],
    },
    {
      id: "x402",
      title: "x402",
      description: "Settlement over HTTP 402, in stablecoins. One request, one payment, one response. Google's A2A x402 extension lets AP2-authorized agents settle through it.",
      links: ["ap2"],
    },
    {
      id: "mpp",
      title: "MPP",
      description: "Settlement from Stripe and Tempo, built around sessions: authorize a limit once, then stream micropayments against it.",
      links: [],
    },
    {
      id: "l402",
      title: "L402",
      description: "Settlement over Lightning, using the same 402 status code. It's x402's real rival: same one-request shape, different rail.",
      links: [],
    },
  ],
  steps: [
    {
      text: "ACP settles what the agent is buying, and from which merchant catalog.",
      nodes: ["acp"],
      edges: [],
    },
    {
      text: "The purchase moves down a layer: AP2 proves the agent holds a valid spending mandate.",
      nodes: ["acp", "ap2"],
      edges: ["acp-ap2"],
    },
    {
      text: "With the mandate in hand, x402 moves the stablecoins.",
      nodes: ["ap2", "x402"],
      edges: ["ap2-x402"],
    },
    {
      text: "Only this bottom layer is a contest. Comparing ACP to x402 compares a checkout protocol to a settlement protocol.",
      nodes: ["x402", "mpp", "l402"],
      edges: [],
    },
  ],
};
