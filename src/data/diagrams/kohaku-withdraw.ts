import type { InteractiveDiagramConfig } from "./types";

export const kohakuWithdraw: InteractiveDiagramConfig = {
  tourLabel: "Withdraw privately",
  intro: "Tap a box to see what it can see, or follow one withdrawal through.",
  nodes: [
    {
      id: "address",
      title: "Your address",
      description: "The deposit comes from here, in public. A pool can't hide that you used it.",
      links: ["pool"],
    },
    {
      id: "pool",
      title: "Shielded pool",
      description: "It holds everyone's deposits together, and it hides which withdrawal was yours. How well depends on how many others are in it.",
      links: ["address", "bundler"],
    },
    {
      id: "bundler",
      title: "Bundler and paymaster",
      description: "The bundler submits a user operation containing the proof. The paymaster covers gas and prices it into the withdrawal. One shared route replaces a relayer network per protocol.",
      links: ["pool", "fresh"],
    },
    {
      id: "fresh",
      title: "Fresh address",
      description: "It holds no ETH and never needs any, so there's no funding transaction to link it to you.",
      links: ["bundler"],
    },
  ],
  steps: [
    {
      text: "You deposit from your ordinary address. This step is visible to everyone.",
      nodes: ["address", "pool"],
      edges: ["address-pool"],
    },
    {
      text: "Later your wallet builds a user operation with a proof, which shows the right to withdraw without showing which deposit.",
      nodes: ["pool", "bundler"],
      edges: ["pool-bundler"],
    },
    {
      text: "The bundler submits it, and the paymaster covers gas out of the withdrawal.",
      nodes: ["bundler"],
      edges: [],
    },
    {
      text: "The funds reach a fresh address that never held ETH. Nothing visible connects it to the deposit.",
      nodes: ["bundler", "fresh"],
      edges: ["bundler-fresh"],
    },
  ],
};
