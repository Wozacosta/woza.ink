import type { InteractiveDiagramConfig } from "./types";

export const buildCompound: InteractiveDiagramConfig = {
  tourLabel: "Run four projects",
  intro: "Tap a skill, or run the four projects in order and watch what comes along.",
  nodes: [
    {
      id: "state",
      title: "State management",
      description: "A micro-skill you pick up once. After that, every project starts with a pattern already in hand.",
      links: [],
    },
    {
      id: "deploy",
      title: "Deployment gotchas",
      description: "A gotcha only has to surprise you once. The next deploy starts without it.",
      links: [],
    },
    {
      id: "api",
      title: "API ergonomics",
      description: "Using APIs teaches you what makes one pleasant, and that shows up in the next thing you build.",
      links: [],
    },
    {
      id: "models",
      title: "Mental models",
      description: "The model behind a library. Once it clicks, you stop memorizing calls and start predicting them.",
      links: [],
    },
  ],
  steps: [
    {
      text: "Project 1 starts from nothing and teaches one thing.",
      nodes: ["state"],
      edges: [],
    },
    {
      text: "Project 2 teaches something new, and that first skill comes along for free.",
      nodes: ["state", "deploy"],
      edges: [],
    },
    {
      text: "Project 3 starts with two skills in hand.",
      nodes: ["state", "deploy", "api"],
      edges: [],
    },
    {
      text: "By project 4 you're learning on top of everything before it. That's the compounding.",
      nodes: ["state", "deploy", "api", "models"],
      edges: [],
    },
  ],
};
