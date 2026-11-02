import type { InteractiveDiagramConfig } from "./types";

export const perpsCascade: InteractiveDiagramConfig = {
  tourLabel: "Run the loop",
  intro: "Tap a box to see its part in the loop, or run it once around.",
  nodes: [
    {
      id: "liquidations",
      title: "Liquidations",
      description: "The engine closes accounts automatically and doesn't wait. A liquidation is a forced sale at whatever the book offers.",
      links: ["sells"],
    },
    {
      id: "sells",
      title: "Market sells",
      description: "Forced closes reach the book as market orders. Over a day like October 10 the book couldn't absorb them all.",
      links: ["price"],
    },
    {
      id: "price",
      title: "Lower price",
      description: "Each sale pushes the price down, and a lower price puts the next group of accounts under their maintenance margin.",
      links: ["liquidations"],
    },
  ],
  steps: [
    {
      text: "A shock moves the price. The first accounts fall below maintenance margin and the engine closes them.",
      nodes: ["liquidations"],
      edges: [],
    },
    {
      text: "Those closes are market sells, sent to the book all at once.",
      nodes: ["liquidations", "sells"],
      edges: ["liquidations-sells"],
    },
    {
      text: "The sells push the price down further.",
      nodes: ["sells", "price"],
      edges: ["sells-price"],
    },
    {
      text: "The lower price trips the next accounts, and the loop starts again from a worse place.",
      nodes: ["price", "liquidations"],
      edges: ["price-liquidations"],
    },
  ],
};
