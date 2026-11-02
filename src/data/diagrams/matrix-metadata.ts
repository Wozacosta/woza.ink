import type { InteractiveDiagramConfig } from "./types";

export const matrixMetadata: InteractiveDiagramConfig = {
  tourLabel: "Read the envelope",
  intro: "Tap a field to see what it gives away, or read it top to bottom.",
  nodes: [
    {
      id: "sender",
      title: "Who sent it",
      description: "Your ID is part of every message, so homeservers can see who you're talking to.",
      links: [],
    },
    {
      id: "room",
      title: "Which room",
      description: "Homeservers know which rooms exist, and each server in a room keeps a copy of it.",
      links: [],
    },
    {
      id: "time",
      title: "When",
      description: "Message timing stays visible to homeservers, and to bridges.",
      links: [],
    },
    {
      id: "content",
      title: "The message",
      description:
        "With E2EE on, the contents are secure between participants. Check it's on: only DMs are typically encrypted by default.",
      links: [],
    },
  ],
  steps: [
    {
      text: "The part you care about most is sealed.",
      nodes: ["content"],
      edges: [],
    },
    {
      text: "Everything around it is still readable: who, where and when.",
      nodes: ["sender", "room", "time"],
      edges: [],
    },
    {
      text: "Self-hosting and extra measures reduce that, and bridges add risk of their own.",
      nodes: ["sender", "room", "time"],
      edges: [],
    },
  ],
};
