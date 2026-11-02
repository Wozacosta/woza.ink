import type { InteractiveDiagramConfig } from "./types";

export const contextNewSession: InteractiveDiagramConfig = {
  tourLabel: "Walk the checks",
  intro: "Tap a check to see why it matters, or walk all four in order.",
  nodes: [
    {
      id: "done",
      title: "Task complete?",
      description: "Don't continue in the same window for a different task. The prior task's context is noise for the next one.",
      links: ["sideways", "fresh"],
    },
    {
      id: "sideways",
      title: "Gone sideways?",
      description: "If the agent has made bad assumptions it keeps reinforcing, a fresh session is faster than correcting it in place.",
      links: ["done", "switching", "fresh"],
    },
    {
      id: "switching",
      title: "Switching concerns?",
      description: "Debugging a production issue and designing a new feature are different modes. Separate sessions.",
      links: ["sideways", "full", "fresh"],
    },
    {
      id: "full",
      title: "Window feels full?",
      description: "No precise signal, but you'll notice: responses get less precise, and the agent re-asks things you've answered.",
      links: ["switching", "fresh", "keep"],
    },
    {
      id: "fresh",
      title: "New session",
      description: "It costs the few seconds it takes to re-establish context. You get a fresh, focused agent.",
      links: ["done", "sideways", "switching", "full"],
    },
    {
      id: "keep",
      title: "Keep going",
      description: "None of the four apply, so the context in the window is still doing useful work.",
      links: ["full"],
    },
  ],
  steps: [
    {
      text: "Is the task complete? If so, the old context is only noise. Start fresh.",
      nodes: ["done", "fresh"],
      edges: ["done-fresh"],
    },
    {
      text: "Has it gone sideways? Bad assumptions get reinforced, so don't argue with them.",
      nodes: ["sideways", "fresh"],
      edges: ["done-sideways", "sideways-fresh"],
    },
    {
      text: "Are you switching concerns? Different modes get separate sessions.",
      nodes: ["switching", "fresh"],
      edges: ["sideways-switching", "switching-fresh"],
    },
    {
      text: "Does the window feel full? The agent re-asking things is the sign.",
      nodes: ["full", "fresh"],
      edges: ["switching-full", "full-fresh"],
    },
    {
      text: "No to all four, so carry on.",
      nodes: ["full", "keep"],
      edges: ["full-keep"],
    },
  ],
};
