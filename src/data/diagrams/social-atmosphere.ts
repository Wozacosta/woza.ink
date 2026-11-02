import type { InteractiveDiagramConfig } from "./types";

export const socialAtmosphere: InteractiveDiagramConfig = {
  tourLabel: "One login, many apps",
  intro: "Tap an app to see what it does, or follow one account through them.",
  nodes: [
    {
      id: "bluesky",
      title: "Bluesky",
      description:
        "The microblogging app most people know. If you have a login here, you already have an account for the rest.",
      links: [],
    },
    {
      id: "tangled",
      title: "Tangled",
      description:
        "Code collaboration, think GitHub. Your repos, issues and PRs are tied to your AT Protocol identity.",
      links: [],
    },
    {
      id: "popfeed",
      title: "Popfeed",
      description:
        "Log movies, TV shows, music and games, and share reviews. Like a Letterboxd and Trakt hybrid.",
      links: [],
    },
    {
      id: "anisota",
      title: "Anisota",
      description:
        "A Bluesky client that shows posts as collectible cards in stamina-limited decks, to slow you down.",
      links: [],
    },
    {
      id: "leaflet",
      title: "Leaflet",
      description: "Blogs and newsletters, with posts stored on your own PDS.",
      links: [],
    },
    {
      id: "graze",
      title: "Graze",
      description: "A no-code custom feed builder, with drag-and-drop logic gates and regex filters.",
      links: [],
    },
    {
      id: "account",
      title: "One account",
      description:
        "Your identity and social graph. No rebuilding your network from scratch for each new app.",
      links: ["host"],
    },
    {
      id: "host",
      title: "A host you pick",
      description: "The account stays with your host, not with any of these apps.",
      links: ["account"],
    },
  ],
  steps: [
    {
      text: "These are separate apps, built by different people.",
      nodes: ["bluesky", "tangled", "popfeed", "anisota", "leaflet", "graze"],
      edges: [],
    },
    {
      text: "They all log in with the same account.",
      nodes: ["account"],
      edges: ["apps-account"],
    },
    {
      text: "That account lives with a host you choose, so an app closing doesn't take it away.",
      nodes: ["account", "host"],
      edges: ["account-host"],
    },
  ],
};
