import type { InteractiveDiagramConfig } from "./types";

export const kohakuLeaks: InteractiveDiagramConfig = {
  tourLabel: "Find the leaks",
  intro: "Tap a leak for the detail, or go through all four in order.",
  nodes: [
    {
      id: "wallet",
      title: "Wallet",
      description: "The only piece of software that touches all four, which is the argument for fixing this here.",
      links: ["dapp", "rpc", "broadcast", "chain"],
    },
    {
      id: "dapp",
      title: "Dapp",
      description: "Connect one address everywhere and every dapp sees your whole history. Anyone can join your activity across them.",
      links: ["wallet"],
    },
    {
      id: "rpc",
      title: "RPC",
      description: "Your wallet asks a server for your balances, in plain text and from your IP.",
      links: ["wallet"],
    },
    {
      id: "broadcast",
      title: "Broadcast",
      description: "Whoever receives your transaction first learns which IP it came from.",
      links: ["wallet"],
    },
    {
      id: "chain",
      title: "Chain",
      description: "Everything onchain is public, forever. This is the only one a shielded pool fixes.",
      links: ["wallet"],
    },
  ],
  steps: [
    {
      text: "You connect to a dapp, and it sees the same address every other dapp saw.",
      nodes: ["wallet", "dapp"],
      edges: ["wallet-dapp"],
    },
    {
      text: "Your wallet loads balances from an RPC, which sees your addresses and your IP.",
      nodes: ["wallet", "rpc"],
      edges: ["wallet-rpc"],
    },
    {
      text: "You send a transaction, and the first hop sees which IP it came from.",
      nodes: ["wallet", "broadcast"],
      edges: ["wallet-broadcast"],
    },
    {
      text: "It lands onchain, public forever. Most privacy writing starts and stops here.",
      nodes: ["wallet", "chain"],
      edges: ["wallet-chain"],
    },
  ],
};
