import type { InteractiveDiagramConfig } from "./types";

export const flashspaceSwitch: InteractiveDiagramConfig = {
  tourLabel: "Press Alt+2",
  intro: "Tap a box to see what happens to it, or press the key and follow one switch.",
  nodes: [
    {
      id: "key",
      title: "Alt+2",
      description: "A hotkey you assigned to workspace 2. One keystroke, no Mission Control.",
      links: ["flashspace"],
    },
    {
      id: "flashspace",
      title: "Flashspace",
      description: "A menu bar app. It knows which apps you assigned to each workspace, and it doesn't touch window layouts.",
      links: ["key", "shown", "hidden"],
    },
    {
      id: "shown",
      title: "Workspace 2",
      description: "The assigned apps are presented. In my setup that's Firefox.",
      links: ["flashspace"],
    },
    {
      id: "hidden",
      title: "Everything else",
      description: "All other apps on that display are hidden. They're still running, one keystroke away.",
      links: ["flashspace"],
    },
  ],
  steps: [
    {
      text: "You press Alt+2.",
      nodes: ["key"],
      edges: [],
    },
    {
      text: "Flashspace looks up which apps belong to workspace 2.",
      nodes: ["key", "flashspace"],
      edges: ["key-flashspace"],
    },
    {
      text: "It presents those apps.",
      nodes: ["flashspace", "shown"],
      edges: ["flashspace-shown"],
    },
    {
      text: "It hides everything else on that display. macOS never changes Space, so nothing slides.",
      nodes: ["flashspace", "hidden"],
      edges: ["flashspace-hidden"],
    },
  ],
};
