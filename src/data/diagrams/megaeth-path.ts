import type { InteractiveDiagramConfig } from "./types";

export const megaethPath: InteractiveDiagramConfig = {
  tourLabel: "Send a transaction",
  intro: "Tap a stage for the detail, or send one transaction through.",
  nodes: [
    {
      id: "rpc",
      title: "RPC endpoint",
      description: "Checks the format, signature and balance, then forwards the transaction to the sequencer.",
      links: ["sequencer"],
    },
    {
      id: "sequencer",
      title: "Sequencer",
      description: "Executes the transaction against the current state and seals it into a mini-block about every 10 milliseconds.",
      links: ["rpc", "stream"],
    },
    {
      id: "stream",
      title: "RPC nodes",
      description: "Each mini-block is streamed out, and its receipts and state updates are queryable as soon as it arrives. That's how a wallet shows a result in milliseconds.",
      links: ["sequencer", "evm"],
    },
    {
      id: "evm",
      title: "EVM block",
      description: "About every second, the mini-blocks are bundled into a standard Ethereum-format block that existing tools can read.",
      links: ["stream", "l1"],
    },
    {
      id: "l1",
      title: "EigenDA, then Ethereum",
      description: "Block data goes to EigenDA, a certificate goes to Ethereum, and block proposals can be challenged through dispute resolution.",
      links: ["evm"],
    },
  ],
  steps: [
    {
      text: "Your transaction reaches an RPC endpoint, which checks it and forwards it.",
      nodes: ["rpc"],
      edges: [],
    },
    {
      text: "The sequencer, the only node that orders transactions, executes it.",
      nodes: ["rpc", "sequencer"],
      edges: ["rpc-sequencer"],
    },
    {
      text: "A mini-block seals about 10 ms later and streams to RPC nodes. Your wallet can show the result now.",
      nodes: ["sequencer", "stream"],
      edges: ["sequencer-stream"],
    },
    {
      text: "About a second later, an EVM block bundles the mini-blocks.",
      nodes: ["stream", "evm"],
      edges: ["stream-evm"],
    },
    {
      text: "The data goes to EigenDA and a certificate to Ethereum, where it can still be challenged. This is where security comes from.",
      nodes: ["evm", "l1"],
      edges: ["evm-l1"],
    },
  ],
};
