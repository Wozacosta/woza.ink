import type { InteractiveDiagramConfig } from "./types";

export const multisigSafeFlow: InteractiveDiagramConfig = {
  tourLabel: "Follow a spend",
  intro: "Tap a box to see what it does, or follow one spend from the first signature to execution.",
  nodes: [
    {
      id: "owners",
      title: "Owners",
      description: "The keys on the Safe's owner list. Changing that list is a transaction, not a migration to a new address.",
      links: ["signatures"],
    },
    {
      id: "signatures",
      title: "Signatures collected",
      description: "EIP-712 signatures gathered off-chain. Nothing happens on the chain until there are enough of them.",
      links: ["owners", "safe"],
    },
    {
      id: "safe",
      title: "The Safe contract",
      description: "It holds the funds and enforces its own rules, so you can add spending limits, time delays and modules. It also adds the contract's correctness and upgrade mechanism to your threat model.",
      links: ["signatures", "target"],
    },
    {
      id: "target",
      title: "The transaction runs",
      description: "The contract executes only once the threshold is met, and the chain keeps the record, so anyone can check the policy was followed.",
      links: ["safe"],
    },
  ],
  steps: [
    {
      text: "Each owner signs an EIP-712 message off-chain.",
      nodes: ["owners", "signatures"],
      edges: ["owners-signatures"],
    },
    {
      text: "Once the threshold is met, the signatures go on-chain in one transaction.",
      nodes: ["signatures", "safe"],
      edges: ["signatures-safe"],
    },
    {
      text: "The contract checks them against its owner list and threshold, then executes.",
      nodes: ["safe", "target"],
      edges: ["safe-target"],
    },
  ],
};
