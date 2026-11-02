import type { InteractiveDiagramConfig } from "./types";

export const uxTrust: InteractiveDiagramConfig = {
  tourLabel: "Walk the tiers",
  intro: "Tap a law to see what it really is, or walk the three tiers from most to least trustworthy.",
  nodes: [
    {
      id: "fitts",
      title: "Fitts's law",
      description: "A fitted model, replicated for decades. Trust it for sizing and placing targets.",
      links: [],
    },
    {
      id: "hick",
      title: "Hick's law",
      description: "A model of reaction time among known options. Trust it for fast, practiced choices, not menus.",
      links: [],
    },
    {
      id: "miller",
      title: "Miller's law",
      description: "A misquote of a paper about chunks. Trust it for grouping, not counting.",
      links: [],
    },
    {
      id: "choice",
      title: "Choice overload",
      description: "A real effect under some conditions. Trust it for options people can't tell apart.",
      links: [],
    },
    {
      id: "peak-end",
      title: "Peak-end rule",
      description: "A lab finding with limits. Trust it for short, intense episodes.",
      links: [],
    },
    {
      id: "aesthetic",
      title: "Aesthetic-usability",
      description: "A correlation in people's ratings. Trust it for knowing what your tests can't see.",
      links: [],
    },
    {
      id: "doherty",
      title: "Doherty threshold",
      description: "A vendor's practical number. Trust it as a speed budget.",
      links: [],
    },
    {
      id: "jakob",
      title: "Jakob's law",
      description: "An argument, with no study behind it. Trust it for defaulting to convention.",
      links: [],
    },
    {
      id: "tesler",
      title: "Tesler's law",
      description: "An aphorism that can't be measured. Trust it for asking who carries the complexity.",
      links: [],
    },
  ],
  steps: [
    {
      text: "Measured. Both have equations you can run on a real interface, but Hick's only covers options you already know.",
      nodes: ["fitts", "hick"],
      edges: [],
    },
    {
      text: "Real findings. The research exists, and it says something narrower than the slogan.",
      nodes: ["miller", "choice", "peak-end", "aesthetic"],
      edges: [],
    },
    {
      text: "Good advice. Useful, but nobody measured a law here: one budget, one argument, one aphorism.",
      nodes: ["doherty", "jakob", "tesler"],
      edges: [],
    },
  ],
};
