import type { InteractiveDiagramConfig } from "./types";

export const rssAnatomy: InteractiveDiagramConfig = {
  tourLabel: "Read the item",
  intro: "Tap a line to see what it's for, or read the item top to bottom.",
  nodes: [
    {
      id: "title",
      title: "title",
      description: "The headline your reader shows in its list.",
      links: [],
    },
    {
      id: "link",
      title: "link",
      description: "The address of the post on the publisher's own site.",
      links: [],
    },
    {
      id: "pubdate",
      title: "pubDate",
      description:
        "When it was published. That's what puts your list in chronological order, with no ranking involved.",
      links: [],
    },
    {
      id: "description",
      title: "description",
      description: "The body. Whether it holds the full content or an excerpt is up to the publisher.",
      links: [],
    },
    {
      id: "enclosure",
      title: "enclosure",
      description:
        "An attached file. Add an audio file here and the feed is a podcast: podcasts are just RSS with enclosures.",
      links: [],
    },
  ],
  steps: [
    {
      text: "Each new post adds one item like this to the file.",
      nodes: ["title", "link"],
      edges: [],
    },
    {
      text: "Dates order the list, and that's all the ranking there is.",
      nodes: ["pubdate"],
      edges: [],
    },
    {
      text: "The body is the publisher's call: full text or excerpt.",
      nodes: ["description"],
      edges: [],
    },
    {
      text: "One extra tag turns the same format into a podcast.",
      nodes: ["enclosure"],
      edges: [],
    },
  ],
};
