import type { InteractiveDiagramConfig } from "./types";

export const rssReaders: InteractiveDiagramConfig = {
  tourLabel: "Move down the list",
  intro: "Tap a reader to see what it's good at, or go from the most private to the least.",
  nodes: [
    {
      id: "netnewswire",
      title: "NetNewsWire",
      description: "Mac and iOS. Free, open source, native and fast.",
      links: [],
    },
    {
      id: "miniflux",
      title: "Miniflux",
      description: "Self-hosted, privacy-first and minimal: a Go binary you can run on a $5 VPS.",
      links: [],
    },
    {
      id: "ttrss",
      title: "Tiny Tiny RSS",
      description: "Another self-hosted reader, for running your own pipeline.",
      links: [],
    },
    {
      id: "feedly",
      title: "Feedly",
      description: "Web and mobile. Polished and freemium, good if you want AI summaries and team features.",
      links: [],
    },
    {
      id: "inoreader",
      title: "Inoreader",
      description: "Web and mobile. Advanced filtering, rules and automation, for power users.",
      links: [],
    },
  ],
  steps: [
    {
      text: "A local app keeps your subscriptions on your own devices.",
      nodes: ["netnewswire"],
      edges: [],
    },
    {
      text: "Self-hosting moves them to a server you run.",
      nodes: ["miniflux", "ttrss"],
      edges: [],
    },
    {
      text: "A cloud reader knows your subscriptions once you log in, so pick one you trust.",
      nodes: ["feedly", "inoreader"],
      edges: [],
    },
  ],
};
