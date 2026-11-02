import type { InteractiveDiagramConfig } from "./types";

export const socialLens: InteractiveDiagramConfig = {
  tourLabel: "See who owns what",
  intro: "Tap an app to see what it's for, or look at the network and then at who owns what.",
  nodes: [
    {
      id: "mask",
      title: "Mask Network",
      description: "Took over stewardship of Lens in January 2026, a day before the Neynar deal.",
      links: ["orb", "firefly", "network"],
    },
    {
      id: "orb",
      title: "Orb",
      description: "The mainstream option, a mobile app on iOS and Android. Mask has acquired it.",
      links: ["mask", "network"],
    },
    {
      id: "firefly",
      title: "Firefly",
      description:
        "More an aggregator than a Lens client: X, Farcaster and Lens in one app, with cross-posting. Mask builds it.",
      links: ["mask", "network"],
    },
    {
      id: "hey",
      title: "Hey",
      description: "A general feed built around social payments: pay to post, earn from what you post.",
      links: ["network"],
    },
    {
      id: "network",
      title: "Lens network",
      description:
        "Your account and followers aren't tied to an app, so any Lens app shows the same profile and audience.",
      links: ["mask", "orb", "firefly", "hey", "palus", "soclly", "cantuum"],
    },
    {
      id: "palus",
      title: "Palus",
      description:
        "The open-source client, which Lens describes as \"free, open-source Lens activity across every app.\"",
      links: ["network"],
    },
    {
      id: "soclly",
      title: "Soclly",
      description:
        "The publishing tool. You can draft and schedule posts, which makes it closer to Buffer than to a place to browse.",
      links: ["network"],
    },
    {
      id: "cantuum",
      title: "Cantuum",
      description: "A music player, and the only one here built around a single type of content.",
      links: ["network"],
    },
  ],
  steps: [
    {
      text: "One network holds your account and followers.",
      nodes: ["network"],
      edges: [],
    },
    {
      text: "Apps can't compete on who's there, so they compete on who they're for.",
      nodes: ["network", "orb", "firefly", "hey", "palus", "soclly", "cantuum"],
      edges: ["network-orb", "network-firefly", "network-hey", "network-palus", "network-soclly", "network-cantuum"],
    },
    {
      text: "Mask Network stewards the protocol.",
      nodes: ["mask", "network"],
      edges: ["mask-network"],
    },
    {
      text: "It also builds Firefly and has acquired Orb, the two apps Lens features first.",
      nodes: ["mask", "orb", "firefly"],
      edges: ["mask-orb", "mask-firefly"],
    },
    {
      text: "If those go bad, your account and followers still work in the others.",
      nodes: ["hey", "palus", "soclly", "cantuum"],
      edges: [],
    },
  ],
};
