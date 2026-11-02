import type { InteractiveDiagramConfig } from "./types";

export const lightroomDam: InteractiveDiagramConfig = {
  tourLabel: "Compare the three",
  intro: "Tap a column to see how that kind of library works, or compare them in turn.",
  nodes: [
    {
      id: "catalog",
      title: "Catalog",
      description:
        "Lightroom and Capture One. A database tracks files, edits, keywords, ratings and collections, so search is powerful. The catalog is also a proprietary file that ties you to the software.",
      links: [],
    },
    {
      id: "folders",
      title: "Folders",
      description:
        "DxO, RawTherapee and most others. Your filesystem is the organization, and edits sit in sidecar files beside the originals. It's portable, but it needs disciplined naming and can't search across folders without other tools.",
      links: [],
    },
    {
      id: "cloud",
      title: "Cloud",
      description:
        "Lightroom CC and Apple Photos. The platform handles everything and works anywhere. You depend on the service, storage costs money, and migration is painful.",
      links: [],
    },
  ],
  steps: [
    {
      text: "A catalog is the strongest at search, and the hardest to walk away from.",
      nodes: ["catalog"],
      edges: [],
    },
    {
      text: "Folders and sidecars travel with you, and the searching is left to you.",
      nodes: ["folders"],
      edges: [],
    },
    {
      text: "Cloud works from anywhere, for as long as you stay with the service.",
      nodes: ["cloud"],
      edges: [],
    },
  ],
};
