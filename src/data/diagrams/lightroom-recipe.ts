import type { InteractiveDiagramConfig } from "./types";

export const lightroomRecipe: InteractiveDiagramConfig = {
  tourLabel: "Follow one edit",
  intro: "Tap a box to see what it holds, or follow one edit from import to export.",
  nodes: [
    {
      id: "original",
      title: "Original RAW",
      description: "The file from your camera. Lightroom reads it and never writes to it, which is why any edit can be undone years later.",
      links: ["processing"],
    },
    {
      id: "catalog",
      title: "Catalog",
      description:
        "In Lightroom Classic, a local SQLite database. It tracks every photo you've imported and stores your edits as instructions, along with keywords, ratings and collections.",
      links: ["processing"],
    },
    {
      id: "processing",
      title: "Processing",
      description: "Combines the original with the list of instructions. It takes both to get a picture, and it leaves both as they were.",
      links: ["original", "catalog", "preview", "export"],
    },
    {
      id: "preview",
      title: "Preview",
      description: "What you see while editing. Change a slider and only the list changes, then the preview is drawn again.",
      links: ["processing"],
    },
    {
      id: "export",
      title: "Export",
      description: "The instructions are applied for real, and the result is written to a new file. The original still hasn't been touched.",
      links: ["processing"],
    },
  ],
  steps: [
    {
      text: "You import a photo. The RAW file stays as it is, and the catalog starts tracking it.",
      nodes: ["original", "catalog"],
      edges: [],
    },
    {
      text: "You move a slider. Only a line in the catalog changes.",
      nodes: ["catalog"],
      edges: [],
    },
    {
      text: "To show you the result, processing reads the original and the list together.",
      nodes: ["original", "catalog", "processing"],
      edges: ["original-processing", "catalog-processing"],
    },
    {
      text: "The picture on screen is that combination. It isn't saved over anything.",
      nodes: ["processing", "preview"],
      edges: ["processing-preview"],
    },
    {
      text: "On export, the same list is applied and written to a new file.",
      nodes: ["processing", "export"],
      edges: ["processing-export"],
    },
  ],
};
