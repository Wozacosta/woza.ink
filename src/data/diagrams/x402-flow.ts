import type { InteractiveDiagramConfig } from "./types";

export const x402Flow: InteractiveDiagramConfig = {
  tourLabel: "Follow a payment",
  intro: "Tap a box to see its part, or follow one paid request from start to finish.",
  nodes: [
    {
      id: "agent",
      title: "Agent",
      description:
        "The client paying for the call. It holds no account or API key: it reads the price from the 402, signs a payment and retries.",
      links: ["server"],
    },
    {
      id: "server",
      title: "Server",
      description:
        "The API being paid. It names the price, token and chain in a 402, and only returns the resource once the payment checks out.",
      links: ["agent", "check"],
    },
    {
      id: "check",
      title: "Settlement check",
      description:
        "Either the server does this itself or it hands the job to a facilitator. The resource goes out only after the payment has settled onchain.",
      links: ["server"],
    },
  ],
  steps: [
    {
      text: "The agent requests the resource with a plain GET.",
      nodes: ["agent", "server"],
      edges: ["agent-server"],
    },
    {
      text: "The server answers 402 Payment Required. The PAYMENT-REQUIRED header gives the price, accepted token and chain.",
      nodes: ["server", "agent"],
      edges: ["server-agent"],
    },
    {
      text: "The agent constructs a payment, signs it and retries the same request with a PAYMENT-SIGNATURE header.",
      nodes: ["agent", "server"],
      edges: ["agent-server-paid"],
    },
    {
      text: "The server, or a facilitator for it, verifies that the payment settled onchain.",
      nodes: ["server", "check"],
      edges: ["server-check"],
    },
    {
      text: "The resource comes back. One request, one payment, one response.",
      nodes: ["server", "agent"],
      edges: ["server-agent-paid"],
    },
  ],
};
