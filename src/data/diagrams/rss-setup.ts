import type { InteractiveDiagramConfig } from "./types";

export const rssSetup: InteractiveDiagramConfig = {
  tourLabel: "Follow the subscription list",
  intro: "Tap a folder to see what goes in it, or follow the subscription list out of the reader.",
  nodes: [
    {
      id: "tech",
      title: "Tech",
      description:
        "Engineering blogs, developer tools, language and framework release notes. High volume, so it gets skimmed aggressively.",
      links: ["reader"],
    },
    {
      id: "thinking",
      title: "Thinking",
      description: "Longer essays and independent writers who publish infrequently but carefully. Lower volume, read properly.",
      links: ["reader"],
    },
    {
      id: "news",
      title: "News",
      description: "A couple of outlets, topic-filtered and deliberately small. RSS is great for news, but the rabbit hole is real.",
      links: ["reader"],
    },
    {
      id: "releases",
      title: "Releases",
      description: "GitHub release feeds for tools in active use, like neovim and Ghostty. Pure signal: something shipped a new version.",
      links: ["reader"],
    },
    {
      id: "reader",
      title: "NetNewsWire",
      description:
        "Free, open source and native on macOS and iOS. Read state syncs through iCloud with no separate account. Open it, read for 15-20 minutes, close it.",
      links: ["tech", "thinking", "news", "releases", "opml"],
    },
    {
      id: "opml",
      title: "OPML",
      description:
        "A standard format for subscription lists, supported by every serious reader. The list isn't locked to a platform. It's a file.",
      links: ["reader", "miniflux"],
    },
    {
      id: "miniflux",
      title: "Miniflux",
      description: "The right choice if you want to self-host and own the backend. Import the OPML and nothing is lost.",
      links: ["opml"],
    },
  ],
  steps: [
    {
      text: "Every feed goes in one of four folders. More granular categories and rules only added overhead.",
      nodes: ["tech", "thinking", "news", "releases"],
      edges: [],
    },
    {
      text: "They all live in NetNewsWire, which keeps read state in sync across Mac and iOS through iCloud.",
      nodes: ["tech", "thinking", "news", "releases", "reader"],
      edges: ["tech-reader", "thinking-reader", "news-reader", "releases-reader"],
    },
    {
      text: "Export the subscriptions as OPML, a standard format.",
      nodes: ["reader", "opml"],
      edges: ["reader-opml"],
    },
    {
      text: "Import that file into Miniflux or any other serious reader, and nothing is lost.",
      nodes: ["opml", "miniflux"],
      edges: ["opml-miniflux"],
    },
  ],
};
