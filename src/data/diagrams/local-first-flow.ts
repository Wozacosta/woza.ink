import type { InteractiveDiagramConfig } from "./types";

export const localFirstFlow: InteractiveDiagramConfig = {
  tourLabel: "Follow a write",
  intro: "Tap a box to see what it does, or follow one write out to your other devices.",
  nodes: [
    {
      id: "ui",
      title: "UI",
      description:
        "Talks to the local database, not to a server. Local changes show up immediately, so there's no spinner to design.",
      links: ["db"],
    },
    {
      id: "db",
      title: "Local database",
      description:
        "IndexedDB through Dexie. This is the source of truth, and it works with no network at all.",
      links: ["ui", "cloud"],
    },
    {
      id: "cloud",
      title: "DexieCloud",
      description:
        "Handles two-way sync, auth and access control. It's an eventually consistent replica, not the gatekeeper.",
      links: ["db", "other"],
    },
    {
      id: "other",
      title: "Other devices",
      description: "They get the change through sync, so your data follows you.",
      links: ["cloud"],
    },
  ],
  steps: [
    {
      text: "You change something, and the UI writes it straight to the local database.",
      nodes: ["ui", "db"],
      edges: ["ui-db"],
    },
    {
      text: "The UI reads it back at once. No network was involved.",
      nodes: ["db", "ui"],
      edges: ["db-ui"],
    },
    {
      text: "In the background, sync sends the change to DexieCloud whenever it can.",
      nodes: ["db", "cloud"],
      edges: ["db-cloud"],
    },
    {
      text: "Your other devices pull it from there.",
      nodes: ["cloud", "other"],
      edges: ["cloud-other"],
    },
  ],
};
