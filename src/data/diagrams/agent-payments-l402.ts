import type { InteractiveDiagramConfig } from "./types";

export const agentPaymentsL402: InteractiveDiagramConfig = {
  tourLabel: "Follow a payment",
  intro: "Tap a box to see its part, or follow one L402 payment from the first request to the resource.",
  nodes: [
    {
      id: "agent",
      title: "Agent",
      description: "It needs a Lightning wallet that returns the preimage, because that preimage is half of what it sends back.",
      links: ["server", "lightning"],
    },
    {
      id: "lightning",
      title: "Lightning Network",
      description: "Paying the invoice here is what reveals the preimage, a 32-byte value that proves the payment happened.",
      links: ["agent"],
    },
    {
      id: "server",
      title: "Server",
      description: "It answers with a token and a Lightning invoice. The token commits to the invoice's payment hash, so the server can verify later without storing anything.",
      links: ["agent", "check"],
    },
    {
      id: "check",
      title: "The hash check",
      description: "One sha256 of the preimage against the payment hash. No facilitator has to attest that anything settled: the credential is the receipt.",
      links: ["server"],
    },
  ],
  steps: [
    {
      text: "The agent requests the resource.",
      nodes: ["agent", "server"],
      edges: ["agent-server"],
    },
    {
      text: "The server answers 402 with a token and a Lightning invoice.",
      nodes: ["server", "agent"],
      edges: ["server-agent"],
    },
    {
      text: "The agent pays the invoice over Lightning.",
      nodes: ["agent", "lightning"],
      edges: ["agent-lightning"],
    },
    {
      text: "Settlement reveals the preimage. This is why the wallet has to hand it back.",
      nodes: ["lightning", "agent"],
      edges: ["lightning-agent"],
    },
    {
      text: "The agent retries with the token and the preimage in its Authorization header.",
      nodes: ["agent", "server"],
      edges: ["agent-server-paid"],
    },
    {
      text: "The server hashes the preimage and compares it to the hash in the token. Nobody else is involved.",
      nodes: ["server", "check"],
      edges: ["server-check"],
    },
    {
      text: "The resource comes back.",
      nodes: ["server", "agent"],
      edges: ["server-agent-paid"],
    },
  ],
};
