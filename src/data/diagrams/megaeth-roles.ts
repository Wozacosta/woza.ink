import type { InteractiveDiagramConfig } from "./types";

export const megaethRoles: InteractiveDiagramConfig = {
  tourLabel: "Split the node",
  intro: "Tap a role to see its job, or split a typical node into MegaETH's four.",
  nodes: [
    {
      id: "typical",
      title: "Typical node",
      description: "Executes transactions, keeps the state, runs consensus and broadcasts to peers, so the ceiling is whatever commodity hardware can do at once.",
      links: ["sequencer"],
    },
    {
      id: "sequencer",
      title: "Sequencer",
      description: "The single node that orders and executes transactions. It's a high-spec machine, and it keeps a standby that can take over.",
      links: ["typical", "provers", "full", "replicas"],
    },
    {
      id: "provers",
      title: "Provers",
      description: "Re-execute blocks and produce cryptographic proofs that the sequencer's results are correct. Those proofs settle disputes on Ethereum.",
      links: ["sequencer"],
    },
    {
      id: "full",
      title: "Full nodes",
      description: "Re-execute every transaction, so they don't have to trust the sequencer. MegaETH's whitepaper aims them at power users like bridge operators and market makers.",
      links: ["sequencer"],
    },
    {
      id: "replicas",
      title: "Replica nodes",
      description: "Apply the sequencer's state diffs without re-executing and check blocks through proofs. They're the default RPC node and need the least hardware.",
      links: ["sequencer"],
    },
  ],
  steps: [
    {
      text: "A typical node does every job, and every node has to keep up.",
      nodes: ["typical"],
      edges: [],
    },
    {
      text: "MegaETH moves ordering and execution to one purpose-built machine.",
      nodes: ["typical", "sequencer"],
      edges: ["typical-sequencer"],
    },
    {
      text: "Provers check the sequencer's work and produce proofs for disputes.",
      nodes: ["sequencer", "provers"],
      edges: ["sequencer-provers"],
    },
    {
      text: "Full nodes re-execute everything themselves, for anyone who won't rely on proofs.",
      nodes: ["sequencer", "full"],
      edges: ["sequencer-full"],
    },
    {
      text: "Replicas just apply the results and answer reads.",
      nodes: ["sequencer", "replicas"],
      edges: ["sequencer-replicas"],
    },
  ],
};
