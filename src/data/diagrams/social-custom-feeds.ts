import type { InteractiveDiagramConfig } from "./types";

export const socialCustomFeeds: InteractiveDiagramConfig = {
  tourLabel: "Build your home screen",
  intro: "Tap a feed to see where it comes from, or follow the posts to your home screen.",
  nodes: [
    {
      id: "network",
      title: "Every post on the network",
      description: "The raw material. Any feed can draw on it.",
      links: ["default", "science", "city"],
    },
    {
      id: "default",
      title: "Default",
      description: "Bluesky's own feed, and only one option among many.",
      links: ["network", "you"],
    },
    {
      id: "science",
      title: "Best science",
      description:
        "An example of a feed built by an independent developer. Tools like Graze let you build one without code.",
      links: ["network", "you"],
    },
    {
      id: "city",
      title: "My city",
      description: "Posts from people near you, another feed anyone could build and publish.",
      links: ["network", "you"],
    },
    {
      id: "you",
      title: "Your home screen",
      description: "You subscribe to the feeds you want, so the algorithm is a choice rather than a given.",
      links: ["default", "science", "city"],
    },
  ],
  steps: [
    {
      text: "Every post is available to every feed.",
      nodes: ["network"],
      edges: [],
    },
    {
      text: "Anyone can build and publish a feed algorithm, and Bluesky's default is just one of them.",
      nodes: ["network", "default", "science", "city"],
      edges: ["network-default", "network-science", "network-city"],
    },
    {
      text: "You pick which ones to subscribe to.",
      nodes: ["default", "science", "city", "you"],
      edges: ["default-you", "science-you", "city-you"],
    },
  ],
};
