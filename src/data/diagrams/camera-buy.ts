import type { InteractiveDiagramConfig } from "./types";

export const cameraBuy: InteractiveDiagramConfig = {
  tourLabel: "Walk the paths",
  intro: "Tap a box for the reasoning, or walk through each path in turn.",
  nodes: [
    {
      id: "sure",
      title: "Sure you want one?",
      description: "The first question isn't which camera. It's whether your phone is actually what's holding you back.",
      links: ["phone", "budget"],
    },
    {
      id: "phone",
      title: "Phone first",
      description: "Shoot with your phone for a month. Turn off HDR, use manual mode if it has one, and frame deliberately. If you're happy with the results, save your money.",
      links: ["sure", "budget"],
    },
    {
      id: "budget",
      title: "How far can you go?",
      description: "Tight, stretching, or full-frame from the start. Each answer has a single pick.",
      links: ["sure", "phone", "tight", "stretch", "full"],
    },
    {
      id: "tight",
      title: "Nikon Z50 II",
      description: "With the kit lens. Learn the fundamentals, then add a Sigma prime after three months, once you know which focal length you gravitate toward.",
      links: ["budget", "lenses"],
    },
    {
      id: "stretch",
      title: "X-M5 or R10",
      description: "The Fuji if you care about color and the shooting experience, the Canon for its ecosystem and autofocus. Either way, skip the kit lens.",
      links: ["budget", "lenses"],
    },
    {
      id: "full",
      title: "Sony A7C II",
      description: "The most mature E-mount lens ecosystem, unmatched third-party support, and a body small enough to carry around.",
      links: ["budget", "lenses"],
    },
    {
      id: "lenses",
      title: "One body, two lenses",
      description: "The one rule on every path. The glass is the investment, and the body is the part that gets replaced.",
      links: ["tight", "stretch", "full"],
    },
  ],
  steps: [
    {
      text: "Not sure yet? Spend a month with your phone, shooting on purpose.",
      nodes: ["sure", "phone"],
      edges: ["sure-phone"],
    },
    {
      text: "If what you want is shallower depth of field, more reach, better low light or raw files, buy a camera.",
      nodes: ["phone", "budget"],
      edges: ["phone-budget"],
    },
    {
      text: "A tight budget: the Nikon Z50 II with its kit lens.",
      nodes: ["budget", "tight"],
      edges: ["budget-tight"],
    },
    {
      text: "If you can stretch: the Fujifilm X-M5 or the Canon R10.",
      nodes: ["budget", "stretch"],
      edges: ["budget-stretch"],
    },
    {
      text: "Full-frame from the start: the Sony A7C II.",
      nodes: ["budget", "full"],
      edges: ["budget-full"],
    },
    {
      text: "Whichever you pick, buy one body and two lenses.",
      nodes: ["tight", "stretch", "full", "lenses"],
      edges: ["tight-lenses", "stretch-lenses", "full-lenses"],
    },
  ],
};
