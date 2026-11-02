import type { InteractiveDiagramConfig } from "./types";

export const pmUma: InteractiveDiagramConfig = {
  tourLabel: "Resolve a market",
  intro: "Tap a box to see what happens there, or resolve a market both ways.",
  nodes: [
    {
      id: "proposal",
      title: "Proposal",
      description: "Someone says what happened and posts a bond behind it.",
      links: ["window"],
    },
    {
      id: "window",
      title: "Challenge window",
      description: "Anyone who disagrees can dispute the answer before the window closes. The system is optimistic: silence counts as agreement.",
      links: ["proposal", "stands", "vote"],
    },
    {
      id: "stands",
      title: "Answer stands",
      description: "With no challenge, the proposal becomes the result. It's fast and cheap, and it's what happens almost always.",
      links: ["window"],
    },
    {
      id: "vote",
      title: "UMA token vote",
      description: "A dispute goes to UMA holders, weighted by how many tokens they hold. This is the weak spot: weight can be bought.",
      links: ["window"],
    },
  ],
  steps: [
    {
      text: "The event is over. Someone proposes the answer and posts a bond.",
      nodes: ["proposal"],
      edges: [],
    },
    {
      text: "The challenge window opens, and anyone can dispute the answer.",
      nodes: ["proposal", "window"],
      edges: ["proposal-window"],
    },
    {
      text: "If nobody challenges, the answer stands. That's almost every market.",
      nodes: ["window", "stands"],
      edges: ["window-stands"],
    },
    {
      text: "If someone does, it goes to a token-weighted vote, and whoever holds the most tokens has the most say.",
      nodes: ["window", "vote"],
      edges: ["window-vote"],
    },
  ],
};
