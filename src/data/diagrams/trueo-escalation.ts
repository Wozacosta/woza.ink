import type { InteractiveDiagramConfig } from "./types";

export const trueoEscalation: InteractiveDiagramConfig = {
  tourLabel: "Climb the ladder",
  intro: "Tap a rung to see who decides, or climb the ladder one dispute at a time.",
  nodes: [
    {
      id: "created",
      title: "Market created",
      description: "Title, resolution criteria and approved data sources go on-chain at creation and can't be edited, so what counts is settled before anyone has a position.",
      links: ["proposal"],
    },
    {
      id: "proposal",
      title: "Proposal",
      description: "When the event is over, a resolver proposes the outcome and posts a bond, 250 TYD by default. Anyone can challenge within 12 hours with a matching bond.",
      links: ["created", "council"],
    },
    {
      id: "council",
      title: "Oracle Council",
      description: "Five members pick the outcome and decide who gets slashed. They're selected by the protocol, so this rung relies on people.",
      links: ["proposal", "holders"],
    },
    {
      id: "holders",
      title: "TRUE holders",
      description: "The council's decision can be escalated within another 12 hours with a 750 TYD bond. Holders then vote on the outcome and the slashing.",
      links: ["council", "attesters"],
    },
    {
      id: "attesters",
      title: "Random attesters",
      description: "Someone holding or staking at least 250,000 TRUE can escalate to 11 attesters chosen at random, who give the final verdict.",
      links: ["holders"],
    },
  ],
  steps: [
    {
      text: "The market's rules go on-chain before anyone trades.",
      nodes: ["created"],
      edges: [],
    },
    {
      text: "The event happens and a resolver proposes an outcome with a bond. Almost every market ends here.",
      nodes: ["created", "proposal"],
      edges: ["created-proposal"],
    },
    {
      text: "Someone disagrees and matches the bond within 12 hours. The Oracle Council decides.",
      nodes: ["proposal", "council"],
      edges: ["proposal-council"],
    },
    {
      text: "Someone disagrees with the council and posts 750 TYD. TRUE holders vote.",
      nodes: ["council", "holders"],
      edges: ["council-holders"],
    },
    {
      text: "A holder of at least 250,000 TRUE takes it to the last rung. Eleven random attesters give the verdict.",
      nodes: ["holders", "attesters"],
      edges: ["holders-attesters"],
    },
  ],
};
