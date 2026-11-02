import type { InteractiveDiagramConfig } from "./types";

export const pomoTimer: InteractiveDiagramConfig = {
  tourLabel: "Run one pomodoro",
  intro: "Tap a state to see what the hook is doing, or run through one pomodoro.",
  nodes: [
    {
      id: "ready",
      title: "Ready",
      description: "secondsLeft is 25 * 60 and running is false. No interval exists yet.",
      links: ["running", "stopped", "done"],
    },
    {
      id: "running",
      title: "Running",
      description:
        "running is true, so the effect keeps a one-second interval going that takes 1 off secondsLeft. Calling reset() here changes the time but doesn't stop the timer.",
      links: ["ready", "stopped", "done"],
    },
    {
      id: "stopped",
      title: "Stopped",
      description:
        "stop() sets running to false and the effect's cleanup clears the interval. secondsLeft stays where it was, so start() carries on from there.",
      links: ["running", "ready"],
    },
    {
      id: "done",
      title: "Done",
      description:
        "On the last tick the interval clears itself, running goes to false and secondsLeft lands on 0. It stays there until reset().",
      links: ["running", "ready"],
    },
  ],
  steps: [
    {
      text: "The hook starts at 25:00 with nothing running.",
      nodes: ["ready"],
      edges: [],
    },
    {
      text: "start() sets running to true. The effect sees the change and starts a one-second interval.",
      nodes: ["ready", "running"],
      edges: ["ready-running"],
    },
    {
      text: "Each tick takes 1 off secondsLeft.",
      nodes: ["running"],
      edges: [],
    },
    {
      text: "stop() sets running to false. The effect's cleanup clears the interval, and secondsLeft stays put.",
      nodes: ["running", "stopped"],
      edges: ["running-stopped"],
    },
    {
      text: "start() again creates a new interval, which carries on from the same time.",
      nodes: ["stopped", "running"],
      edges: ["stopped-running"],
    },
    {
      text: "With one second left, the next tick clears the interval, sets running to false and returns 0.",
      nodes: ["running", "done"],
      edges: ["running-done"],
    },
    {
      text: "reset() puts secondsLeft back to 25:00, ready for the next one.",
      nodes: ["done", "ready"],
      edges: ["done-ready"],
    },
  ],
};
