import type { InteractiveDiagramConfig } from "./types";

export const perpsWaterfall: InteractiveDiagramConfig = {
  tourLabel: "Follow a failed position",
  intro: "Tap a step to see who pays, or follow a position that the market can't absorb all the way down.",
  nodes: [
    {
      id: "trigger",
      title: "Equity below maintenance",
      description:
        "The engine watches every account and uses the mark price, not the last trade, so one large order on a thin book can't set off a wave of liquidations.",
      links: ["book"],
    },
    {
      id: "book",
      title: "The order book",
      description:
        "The engine sends market orders. Almost every liquidation ends here, and if the fill is above the bankruptcy price, nobody else is involved.",
      links: ["trigger", "backstop"],
    },
    {
      id: "backstop",
      title: "The backstop",
      description:
        "A pool of capital takes over. On a centralized exchange it's an insurance fund. On Hyperliquid, a liquidator vault inside HLP takes accounts below two thirds of maintenance margin.",
      links: ["book", "adl"],
    },
    {
      id: "adl",
      title: "Auto-deleveraging",
      description:
        "If an account still goes negative, the exchange closes winners on the other side. Hyperliquid ranks them by unrealized profit and leverage, then closes them at the previous mark price.",
      links: ["backstop"],
    },
  ],
  steps: [
    {
      text: "The mark price falls and the account's equity drops below maintenance margin. The liquidation starts.",
      nodes: ["trigger"],
      edges: [],
    },
    {
      text: "The engine sells into the order book. On a normal day that's the end of it.",
      nodes: ["trigger", "book"],
      edges: ["trigger-book"],
    },
    {
      text: "Today the book can't take it, so the position moves to the backstop's capital.",
      nodes: ["book", "backstop"],
      edges: ["book-backstop"],
    },
    {
      text: "The backstop can't cover it either. The loss has to land somewhere, or the winner doesn't get paid.",
      nodes: ["backstop", "adl"],
      edges: ["backstop-adl"],
    },
    {
      text: "ADL closes profitable positions on the other side. They were right and fully margined, and they're out anyway.",
      nodes: ["adl"],
      edges: [],
    },
  ],
};
