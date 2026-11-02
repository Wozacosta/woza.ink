import type { InteractiveDiagramConfig } from "./types";

export const pmDecision: InteractiveDiagramConfig = {
  tourLabel: "Make a decision",
  intro: "Tap a box to see its role, or run one decision through the markets.",
  nodes: [
    {
      id: "a",
      title: "Market on policy A",
      description: "A conditional market: it prices some metric, like a token price or a health outcome, on the condition that A is chosen.",
      links: ["compare"],
    },
    {
      id: "b",
      title: "Market on policy B",
      description: "The same metric, priced on the condition that B is chosen instead.",
      links: ["compare"],
    },
    {
      id: "compare",
      title: "Compare",
      description: "Both prices measure the same thing, so the gap between them is the market's view of which policy does better.",
      links: ["a", "b", "adopt"],
    },
    {
      id: "adopt",
      title: "Adopt the winner",
      description: "You pick the policy the market prices higher. That's futarchy: voters choose the metric, and bettors estimate what moves it.",
      links: ["compare"],
    },
  ],
  steps: [
    {
      text: "You want to know which policy is better, so you choose a metric that measures it.",
      nodes: ["a", "b"],
      edges: [],
    },
    {
      text: "Traders price the metric under each policy, and each price feeds the comparison.",
      nodes: ["a", "b", "compare"],
      edges: ["a-compare", "b-compare"],
    },
    {
      text: "The policy with the higher price is the one you adopt.",
      nodes: ["compare", "adopt"],
      edges: ["compare-adopt"],
    },
  ],
};
