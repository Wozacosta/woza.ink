import type { InteractiveDiagramConfig } from "./types";

export const searxngBreakage: InteractiveDiagramConfig = {
  tourLabel: "Walk through 2026",
  intro: "Tap a month for the details, or walk through the year.",
  nodes: [
    {
      id: "feb",
      title: "February",
      description:
        "CJ's video shows a search returning results from Google, Startpage, Brave and DuckDuckGo. It was accurate at the time.",
      links: [],
    },
    {
      id: "jul",
      title: "July",
      description:
        "The maintainers switch off the main Google engine as \"completely broken\" and add a workaround through Google's custom search widget. The same note says it \"will be broken in 2027.\"",
      links: [],
    },
    {
      id: "aug",
      title: "August",
      description: "The old engine gets a fix by pretending to be a Nokia phone.",
      links: [],
    },
    {
      id: "sep",
      title: "September",
      description:
        "Startpage puts a proof-of-work wall in front of its search endpoint. The engine still works, but it's off by default now.",
      links: [],
    },
    {
      id: "oct",
      title: "October",
      description: "People on home connections are getting 403s from Google again.",
      links: [],
    },
    {
      id: "nov",
      title: "November",
      description:
        "Google and Startpage are off by default. What's left is DuckDuckGo, Brave, the Google workaround and a set of smaller sources.",
      links: [],
    },
  ],
  steps: [
    {
      text: "In February the setup worked as advertised.",
      nodes: ["feb"],
      edges: [],
    },
    {
      text: "Five months later Google's main engine was switched off.",
      nodes: ["jul"],
      edges: [],
    },
    {
      text: "A fix arrived in August, and by October it was failing on home connections.",
      nodes: ["aug", "oct"],
      edges: [],
    },
    {
      text: "Startpage closed its own door in September.",
      nodes: ["sep"],
      edges: [],
    },
    {
      text: "So a fresh install in November doesn't match the video, and that's nobody's fault.",
      nodes: ["nov"],
      edges: [],
    },
  ],
};
