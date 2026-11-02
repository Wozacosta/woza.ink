import type { InteractiveDiagramConfig } from "./types";

export const perpsJelly: InteractiveDiagramConfig = {
  tourLabel: "Replay March 26",
  intro: "Tap a step for the detail, or replay the day in order.",
  nodes: [
    {
      id: "short",
      title: "A large short",
      description: "A trader opened a large short on JELLYJELLY, a thin memecoin. The market was too small for a position that size.",
      links: ["liquidated"],
    },
    {
      id: "liquidated",
      title: "Liquidated",
      description: "The price moved until the position was liquidated. The book couldn't absorb it, so step one of the waterfall failed.",
      links: ["short", "hlp"],
    },
    {
      id: "hlp",
      title: "HLP inherits it",
      description: "The community-funded vault took on the short and sat on about $12 million of unrealized losses as the price kept rising.",
      links: ["liquidated", "validators"],
    },
    {
      id: "validators",
      title: "Validators step in",
      description: "Within hours, Hyperliquid's validators voted to delist the market and settled it at $0.0095, well below where it was trading. HLP's loss disappeared.",
      links: ["hlp"],
    },
  ],
  steps: [
    {
      text: "A large short opens on a thin memecoin.",
      nodes: ["short"],
      edges: [],
    },
    {
      text: "The price moves until the position is liquidated, and the book can't take it.",
      nodes: ["short", "liquidated"],
      edges: ["short-liquidated"],
    },
    {
      text: "The vault inherits the short. As the price keeps rising, its loss reaches about $12 million.",
      nodes: ["liquidated", "hlp"],
      edges: ["liquidated-hlp"],
    },
    {
      text: "Validators vote to delist the market and pick a settlement price. The loss is gone, by decision rather than by market.",
      nodes: ["hlp", "validators"],
      edges: ["hlp-validators"],
    },
  ],
};
