import type { InteractiveDiagramConfig } from "./types";

export const rngCommit: InteractiveDiagramConfig = {
  tourLabel: "Play a round",
  intro: "Tap a box to see what each side controls, or play one provably fair round.",
  nodes: [
    {
      id: "operator",
      title: "Operator",
      description: "Commits to a secret server seed by publishing its hash first, so it can't change the seed once bets are in.",
      links: ["player"],
    },
    {
      id: "player",
      title: "Player",
      description: "Supplies a client seed the operator can't control, then checks everything once the server seed is revealed.",
      links: ["operator"],
    },
    {
      id: "round",
      title: "Each round",
      description: "Server seed, client seed and a nonce that goes up each round run through HMAC-SHA256 to give the outcome.",
      links: [],
    },
  ],
  steps: [
    {
      text: "The operator publishes hash(server seed), and is now bound to a value it can't show yet.",
      nodes: ["operator", "player"],
      edges: ["operator-player"],
    },
    {
      text: "The player adds a client seed, so part of the entropy is out of the operator's hands.",
      nodes: ["operator", "player"],
      edges: ["player-operator"],
    },
    {
      text: "Each round runs both seeds and an incrementing nonce through HMAC-SHA256.",
      nodes: ["round"],
      edges: [],
    },
    {
      text: "The operator reveals the server seed. Anyone can hash it and compare it with the commitment.",
      nodes: ["operator", "player"],
      edges: ["operator-player-reveal"],
    },
    {
      text: "The player recomputes every past round. This proves nothing changed after the bet, and says nothing about the odds.",
      nodes: ["player"],
      edges: [],
    },
  ],
};
