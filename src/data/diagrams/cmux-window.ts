import type { InteractiveDiagramConfig } from "./types";

export const cmuxWindow: InteractiveDiagramConfig = {
  tourLabel: "Follow one notification",
  intro: "Tap a part of the window to see what it does, or follow one notification from agent to you.",
  nodes: [
    {
      id: "sidebar",
      title: "Vertical tabs",
      description:
        "Each tab shows its git branch, working directory, open ports and notification text, so you can see which agent is on which branch doing what. An unread badge marks the one calling for you.",
      links: [],
    },
    {
      id: "quiet",
      title: "A running agent",
      description: "Without rings you'd stare at it or compulsively switch tabs. With them you just let it run.",
      links: [],
    },
    {
      id: "pane",
      title: "Notification ring",
      description: "When an agent finishes a task or needs your attention, its pane lights up with a visual ring.",
      links: ["signal"],
    },
    {
      id: "browser",
      title: "Embedded browser",
      description:
        "A browser pane split alongside the terminal, with a scriptable API. It keeps PRs, docs or design references next to the code, without switching to a separate app.",
      links: [],
    },
    {
      id: "signal",
      title: "The signal",
      description:
        "Notifications fire automatically through standard terminal escape sequences, or you can hook into them explicitly with the cmux CLI.",
      links: ["pane", "alert"],
    },
    {
      id: "alert",
      title: "Desktop notification",
      description: "An optional macOS notification, on top of the ring and the sidebar badge.",
      links: ["signal"],
    },
    {
      id: "libghostty",
      title: "libghostty",
      description:
        "The same rendering library as Ghostty, so you get its GPU-accelerated performance without running Ghostty. Your existing Ghostty config carries over.",
      links: [],
    },
    {
      id: "native",
      title: "Swift and AppKit",
      description: "cmux is a native macOS app, not Electron. It's not a fork or a wrapper of Ghostty, and it's macOS only.",
      links: [],
    },
  ],
  steps: [
    {
      text: "You're watching Agent 1 while Agent 2 works in the next pane.",
      nodes: ["quiet", "pane"],
      edges: [],
    },
    {
      text: "Agent 2 finishes or needs you. A terminal escape sequence fires, or your own hook calls the cmux CLI.",
      nodes: ["signal", "pane"],
      edges: ["signal-pane"],
    },
    {
      text: "Its pane lights up with a ring.",
      nodes: ["pane"],
      edges: [],
    },
    {
      text: "The sidebar shows an unread badge and the notification text for that agent.",
      nodes: ["sidebar", "pane"],
      edges: [],
    },
    {
      text: "Optionally, a macOS desktop notification goes out too.",
      nodes: ["signal", "alert"],
      edges: ["signal-alert"],
    },
    {
      text: "You glance over when it calls for you. The other agents keep running.",
      nodes: ["pane", "quiet"],
      edges: [],
    },
  ],
};
