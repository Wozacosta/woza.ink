import type { InteractiveDiagramConfig } from "./types";

export const pomoScreen: InteractiveDiagramConfig = {
  tourLabel: "Read the screen",
  intro: "Tap a part of the screen, or read it in the order your eye does.",
  nodes: [
    {
      id: "timer",
      title: "Timer",
      description: "A big number and a subtle progress ring. It takes the most space because it's the only thing you need while you work.",
      links: [],
    },
    {
      id: "controls",
      title: "Controls",
      description: "Start, stop and skip. There's no onboarding and no nagging modal in front of them.",
      links: [],
    },
    {
      id: "music",
      title: "Music links",
      description: "A handful of focus playlists. One tap opens a new tab, so there's no player to load or manage here.",
      links: [],
    },
    {
      id: "count",
      title: "Today's count",
      description: "How many pomodoros you finished that day. A quiet record, not a score.",
      links: [],
    },
  ],
  steps: [
    {
      text: "The clock comes first. You should be able to read it from across the desk.",
      nodes: ["timer"],
      edges: [],
    },
    {
      text: "The controls sit right under it, and there are only three.",
      nodes: ["controls"],
      edges: [],
    },
    {
      text: "Music is one tap away, and then it's out of the way.",
      nodes: ["music"],
      edges: [],
    },
    {
      text: "The count stays small, so you can glance at it or ignore it.",
      nodes: ["count"],
      edges: [],
    },
  ],
};
