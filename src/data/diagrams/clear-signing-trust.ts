import type { InteractiveDiagramConfig } from "./types";

export const clearSigningTrust: InteractiveDiagramConfig = {
  tourLabel: "Follow a descriptor",
  intro: "Tap a box to see who is trusted for what, or follow a descriptor from its author to your wallet.",
  nodes: [
    {
      id: "protocol",
      title: "Protocol",
      description: "Describes its own contracts in JSON. A descriptor only applies to the exact contracts and chains in its context, so it can't dress up anything else.",
      links: ["registry"],
    },
    {
      id: "auditor",
      title: "Auditor",
      description: "Under the draft ERC-8176, it signs a specific descriptor to say the file accurately describes the contract. Its reputation is on the line.",
      links: ["registry"],
    },
    {
      id: "registry",
      title: "Public registry",
      description: "A GitHub repository organized by submitter, with test cases and review. As of late September 2026 it also stores 174 attestation files next to the descriptors they cover.",
      links: ["protocol", "auditor", "wallet"],
    },
    {
      id: "wallet",
      title: "Wallet",
      description: "It must check that what's being signed matches the descriptor's binding, and it can require attestations from auditors it trusts before rendering.",
      links: ["registry"],
    },
  ],
  steps: [
    {
      text: "A protocol writes a descriptor, bound to its own contracts, and submits it to the registry.",
      nodes: ["protocol", "registry"],
      edges: ["protocol-registry"],
    },
    {
      text: "The registry reviews it in public, so anyone can read it or mirror it.",
      nodes: ["registry"],
      edges: [],
    },
    {
      text: "An auditor signs that exact file, and the attestation is stored next to it.",
      nodes: ["auditor", "registry"],
      edges: ["auditor-registry"],
    },
    {
      text: "The wallet reads the descriptor, checks the binding and can insist on an attestation it trusts.",
      nodes: ["registry", "wallet"],
      edges: ["registry-wallet"],
    },
  ],
};
