import type { InteractiveDiagramConfig } from "./types";

export const libghosttyStack: InteractiveDiagramConfig = {
  tourLabel: "Walk the stack",
  intro: "Tap a box to see what it is, or walk from the apps down to what's still planned.",
  nodes: [
    {
      id: "ghostty",
      title: "Ghostty",
      description: "The terminal itself. Its macOS and Linux GUIs sit on the same shared Zig core, and that core is what's being extracted.",
      links: ["vt"],
    },
    {
      id: "cmux",
      title: "cmux",
      description: "A different app on the same foundation. Your Ghostty config carries over, and so does the performance.",
      links: ["vt"],
    },
    {
      id: "app",
      title: "Your app",
      description: "Any app that needs a terminal view: an IDE, a monitoring tool, a custom developer environment. It can embed one without reimplementing decades of terminal specification.",
      links: ["vt"],
    },
    {
      id: "vt",
      title: "libghostty-vt",
      description: "The first piece. It parses terminal sequences and keeps terminal state, with zero dependencies, not even libc, so it can run anywhere.",
      links: ["ghostty", "cmux", "app"],
    },
    {
      id: "input",
      title: "Input",
      description: "A planned component for input handling.",
      links: [],
    },
    {
      id: "gpu",
      title: "GPU rendering",
      description: "A planned component that covers rendering a terminal on the GPU.",
      links: [],
    },
    {
      id: "widgets",
      title: "Widgets",
      description: "Planned ready-made widgets for GTK and Swift.",
      links: [],
    },
  ],
  steps: [
    {
      text: "Ghostty is the product, and the core underneath it is written to be shared.",
      nodes: ["ghostty", "vt"],
      edges: ["ghostty-vt"],
    },
    {
      text: "libghostty-vt comes first: terminal sequences and state, with no dependencies.",
      nodes: ["vt"],
      edges: [],
    },
    {
      text: "Other apps can build on the same library instead of writing a terminal from scratch.",
      nodes: ["cmux", "app", "vt"],
      edges: ["cmux-vt", "app-vt"],
    },
    {
      text: "Input handling, GPU rendering and ready-made widgets are still to come.",
      nodes: ["input", "gpu", "widgets"],
      edges: [],
    },
  ],
};
