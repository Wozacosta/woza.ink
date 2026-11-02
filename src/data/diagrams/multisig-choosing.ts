import type { InteractiveDiagramConfig } from "./types";

export const multisigChoosing: InteractiveDiagramConfig = {
  tourLabel: "Try four setups",
  intro: "Tap a box for the details, or run four setups through the questions.",
  nodes: [
    {
      id: "q1",
      title: "Must the public verify it?",
      description: "An MPC wallet leaves no on-chain record that a policy was followed. A Safe does. This is the one case where MPC is simply the wrong tool.",
      links: ["onchain", "q2"],
    },
    {
      id: "q2",
      title: "An institution across many chains?",
      description: "MPC works on chains with no multisig support, and suits exchanges and custodians with thousands of wallets across dozens of chains.",
      links: ["q1", "mpc", "q3"],
    },
    {
      id: "q3",
      title: "Just one person?",
      description: "Individuals optimize for lost keys. A DAO also has to allow for the possibility that some signers are adversarial.",
      links: ["q2", "solo", "safe"],
    },
    {
      id: "onchain",
      title: "On-chain multisig",
      description: "The chain records it, so anyone can check the rules were followed.",
      links: ["q1"],
    },
    {
      id: "mpc",
      title: "MPC",
      description: "With the understanding that you've moved the trust boundary into your provider's implementation and lost the on-chain audit trail.",
      links: ["q2"],
    },
    {
      id: "solo",
      title: "2-of-3",
      description: "Keys in three physically separate locations, at least one not your home. Back up the descriptor with the seeds, and test recovery first and again yearly. Worried about a backdoored RNG? Multisig plus dice-generated entropy closes that gap.",
      links: ["q3"],
    },
    {
      id: "safe",
      title: "Safe",
      description: "A threshold matched to your actual governance, and a hard requirement that at least one signer verifies calldata on independent infrastructure.",
      links: ["q3"],
    },
  ],
  steps: [
    {
      text: "A treasury that has to show the public its rules were followed: on-chain multisig.",
      nodes: ["q1", "onchain"],
      edges: ["q1-onchain"],
    },
    {
      text: "A custodian running thousands of wallets across dozens of chains: MPC.",
      nodes: ["q1", "q2", "mpc"],
      edges: ["q1-q2", "q2-mpc"],
    },
    {
      text: "One person with meaningful savings on a single chain: 2-of-3.",
      nodes: ["q1", "q2", "q3", "solo"],
      edges: ["q1-q2", "q2-q3", "q3-solo"],
    },
    {
      text: "A team that doesn't need public proof: a Safe, with one signer checking calldata independently.",
      nodes: ["q1", "q2", "q3", "safe"],
      edges: ["q1-q2", "q2-q3", "q3-safe"],
    },
  ],
};
