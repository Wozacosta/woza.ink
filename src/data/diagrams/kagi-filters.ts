import type { InteractiveDiagramConfig } from "./types";

export const kagiFilters: InteractiveDiagramConfig = {
  tourLabel: "Follow a query",
  intro: "Tap a stage to see what it does, or follow one query down the funnel.",
  nodes: [
    {
      id: "sources",
      title: "A dozen or so sources",
      description:
        "Licensed indexes like Mojeek, Brave and Yandex, third-party providers for SERP-style results, and Kagi's own Teclis and TinyGem.",
      links: ["ads"],
    },
    {
      id: "ads",
      title: "Ad and tracker penalty",
      description:
        "Subscribers pay and advertisers don't, so Kagi can push down pages full of ads and trackers. It says those correlate with low quality.",
      links: ["sources", "slop"],
    },
    {
      id: "slop",
      title: "SlopStop",
      description:
        "Users report AI slop and each report gets reviewed. A domain that's mostly AI-generated, typically over 80% of pages, is flagged and downranked.",
      links: ["ads", "you"],
    },
    {
      id: "you",
      title: "Your blocks and Lenses",
      description:
        "You can block or promote domains for yourself and scope a search with Lenses. It's the hostnames plugin with a UI.",
      links: ["slop", "results"],
    },
    {
      id: "results",
      title: "Your results",
      description: "One list, with no ads.",
      links: ["you"],
    },
  ],
  steps: [
    {
      text: "A typical query calls a dozen or so sources.",
      nodes: ["sources"],
      edges: [],
    },
    {
      text: "Pages heavy with ads and trackers get pushed down.",
      nodes: ["sources", "ads"],
      edges: ["sources-ads"],
    },
    {
      text: "Domains flagged as mostly AI-generated drop too.",
      nodes: ["ads", "slop"],
      edges: ["ads-slop"],
    },
    {
      text: "Then your own rules apply.",
      nodes: ["slop", "you"],
      edges: ["slop-you"],
    },
    {
      text: "What's left is your page.",
      nodes: ["you", "results"],
      edges: ["you-results"],
    },
  ],
};
