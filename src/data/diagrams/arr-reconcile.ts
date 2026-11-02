import type { InteractiveDiagramConfig } from "./types";

export const arrReconcile: InteractiveDiagramConfig = {
  tourLabel: "Run the loop",
  intro: "Tap a box to see its job, or run the loop once, from a request to an upgrade.",
  nodes: [
    {
      id: "want",
      title: "What you want",
      description: "You declare it: this show, 1080p, these formats preferred. You never say which file or which episode to fetch.",
      links: ["compare"],
    },
    {
      id: "have",
      title: "What you have",
      description: "The files on disk. It's the other half of the comparison, and every finished import changes it.",
      links: ["compare", "act"],
    },
    {
      id: "compare",
      title: "Compare",
      description: "Each RSS sync, new releases are checked against everything still missing or below its quality goal.",
      links: ["want", "have", "act"],
    },
    {
      id: "act",
      title: "Close the gap",
      description: "Grab the release, let the download client move the bytes, import the file. An upgrade is the same move on a file you already have.",
      links: ["compare", "have"],
    },
  ],
  steps: [
    {
      text: "You state what you want. Nothing downloads yet.",
      nodes: ["want"],
      edges: [],
    },
    {
      text: "The want list is compared with what's on disk. The difference is the work to do.",
      nodes: ["want", "have", "compare"],
      edges: ["want-compare", "have-compare"],
    },
    {
      text: "A matching release appears, so the stack grabs it, and imports it when it's done.",
      nodes: ["compare", "act"],
      edges: ["compare-act"],
    },
    {
      text: "The import changes what's on disk, which closes that gap.",
      nodes: ["act", "have"],
      edges: ["act-have"],
    },
    {
      text: "The loop keeps running. A better release reopens the gap until the cutoff is reached, and the file is upgraded.",
      nodes: ["have", "compare", "act"],
      edges: ["have-compare", "compare-act"],
    },
  ],
};
