import type { InteractiveDiagramConfig } from "./types";

export const buildExperiment: InteractiveDiagramConfig = {
  tourLabel: "Run one experiment",
  intro: "Tap a step to see the rule behind it, or run one experiment from idea to lesson.",
  nodes: [
    {
      id: "idea",
      title: "Idea",
      description: "Start tiny: one feature, one goal. Pick a stack you already know, so the friction goes into the idea and not the tooling.",
      links: ["prototype", "lesson"],
    },
    {
      id: "prototype",
      title: "Two-hour prototype",
      description: "The cheapest possible test. It's small enough that throwing it away costs nothing.",
      links: ["idea", "mvp"],
    },
    {
      id: "mvp",
      title: "Weekend MVP",
      description: "Ship the core and keep the scope mercilessly small. It only starts teaching you once other people can click it.",
      links: ["prototype", "polish", "sunset"],
    },
    {
      id: "polish",
      title: "Polish pass",
      description: "One path after shipping: iterate on the thing, because release comes before perfect, not instead of it.",
      links: ["mvp", "lesson"],
    },
    {
      id: "sunset",
      title: "Graceful sunset",
      description: "The other path. Stopping isn't failing if the project already taught what it could.",
      links: ["mvp", "lesson"],
    },
    {
      id: "lesson",
      title: "Log one concrete lesson",
      description: "Auth patterns, DB migrations, UX fail cases. Every project should teach one thing, written down, and that goes into the next idea.",
      links: ["polish", "sunset", "idea"],
    },
  ],
  steps: [
    {
      text: "One idea, cut down to one feature and one goal.",
      nodes: ["idea"],
      edges: [],
    },
    {
      text: "Two hours on a prototype, to see whether it deserves more.",
      nodes: ["idea", "prototype"],
      edges: ["idea-prototype"],
    },
    {
      text: "One weekend on an MVP. Ship the core.",
      nodes: ["prototype", "mvp"],
      edges: ["prototype-mvp"],
    },
    {
      text: "Then it goes one of two ways: a polish pass or a graceful sunset.",
      nodes: ["mvp", "polish", "sunset"],
      edges: ["mvp-polish", "mvp-sunset"],
    },
    {
      text: "Either way, it ends the same: log what it taught you.",
      nodes: ["polish", "sunset", "lesson"],
      edges: ["polish-lesson", "sunset-lesson"],
    },
    {
      text: "Then move on. The lesson comes with you to the next idea.",
      nodes: ["lesson", "idea"],
      edges: ["lesson-idea"],
    },
  ],
};
