import type { InteractiveDiagramConfig } from "./types";

export const dexieConflict: InteractiveDiagramConfig = {
  tourLabel: "Replay the edits",
  intro: "Tap a box to see what happened, or replay both cases.",
  nodes: [
    {
      id: "phone",
      title: "Phone, offline",
      description: "Marks the task as done. Only the status property changes.",
      links: ["merged"],
    },
    {
      id: "laptop",
      title: "Laptop, offline",
      description: "Renames the task at the same time. Only the title changes.",
      links: ["merged"],
    },
    {
      id: "merged",
      title: "Both survive",
      description: "The changes touch different properties, so there's nothing to resolve.",
      links: ["phone", "laptop"],
    },
    {
      id: "phone2",
      title: "Phone, offline",
      description: "Edits the title.",
      links: ["laptop2"],
    },
    {
      id: "laptop2",
      title: "Laptop, later",
      description:
        "Edits the same title. With last-write-wins this one is kept. For complex domains, design merge logic or use CRDTs.",
      links: ["phone2"],
    },
  ],
  steps: [
    {
      text: "Two devices edit the same task while offline, but different fields.",
      nodes: ["phone", "laptop"],
      edges: [],
    },
    {
      text: "Sync merges by property, so both edits are kept.",
      nodes: ["phone", "laptop", "merged"],
      edges: ["phone-merged", "laptop-merged"],
    },
    {
      text: "Now both change the same field.",
      nodes: ["phone2", "laptop2"],
      edges: [],
    },
    {
      text: "The later write wins and the earlier one is lost.",
      nodes: ["phone2", "laptop2"],
      edges: ["phone2-laptop2"],
    },
  ],
};
