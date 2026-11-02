import type { InteractiveDiagramConfig } from "./types";

export const contextHandoff: InteractiveDiagramConfig = {
  tourLabel: "Carry a decision across",
  intro: "Tap a box to see what it holds, or follow one decision across a reset.",
  nodes: [
    {
      id: "session1",
      title: "Session 1",
      description:
        "Everything the agent knows is text in this window: rules, loaded docs, tool output and the conversation. When the window resets, all of it is gone.",
      links: ["docs"],
    },
    {
      id: "docs",
      title: "Files on disk",
      description:
        "The only thing that persists. Rules load in every session, docs like ARCHITECTURE.md load when you point to them, and a handoff summary says what was done and what's next.",
      links: ["session1", "session2"],
    },
    {
      id: "session2",
      title: "Session 2",
      description:
        "A fresh agent that knows nothing about session 1. What it can do depends on what you load: your rules, the docs for this task and a clear first message.",
      links: ["docs"],
    },
  ],
  steps: [
    {
      text: "In session 1 you decide: \"we'll use optimistic updates for this feature.\" So far that's only text in the window.",
      nodes: ["session1"],
      edges: [],
    },
    {
      text: "You put the decision in a file, not in the chat.",
      nodes: ["session1", "docs"],
      edges: ["session1-docs"],
    },
    {
      text: "The task ends and the window resets. Nothing in it reaches the next session.",
      nodes: ["session1", "session2"],
      edges: ["session1-session2"],
    },
    {
      text: "Session 2 starts from scratch, then reads your rules and the doc you point it to.",
      nodes: ["docs", "session2"],
      edges: ["docs-session2"],
    },
  ],
};
