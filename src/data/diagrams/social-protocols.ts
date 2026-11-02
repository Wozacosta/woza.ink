import type { InteractiveDiagramConfig } from "./types";

export const socialProtocols: InteractiveDiagramConfig = {
  tourLabel: "Follow a post",
  intro: "Tap a box to see what it does, or follow one post through each design.",
  nodes: [
    {
      id: "mastodon",
      title: "Mastodon",
      description:
        "An ActivityPub server. Your account and posts live on your instance, which talks to the others.",
      links: ["pixelfed"],
    },
    {
      id: "pixelfed",
      title: "Pixelfed",
      description: "Also ActivityPub, so a Pixelfed account can follow a Mastodon user directly.",
      links: ["mastodon", "peertube"],
    },
    {
      id: "peertube",
      title: "PeerTube",
      description:
        "Video on the same protocol. You can follow a channel from Mastodon and see new videos in your feed.",
      links: ["pixelfed"],
    },
    {
      id: "pds",
      title: "PDS",
      description:
        "Your Personal Data Server, owned or rented. It holds your data, and you can move it to another provider with followers, posts and identity intact.",
      links: ["relay", "app"],
    },
    {
      id: "relay",
      title: "Relay",
      description: "Aggregates posts from across the network so apps don't have to crawl every PDS.",
      links: ["pds", "app"],
    },
    {
      id: "app",
      title: "App",
      description: "Bluesky is one. Apps read from the relay and write to your PDS.",
      links: ["relay", "pds", "labelers"],
    },
    {
      id: "labelers",
      title: "Labelers",
      description: "Services that handle moderation, separate from the app.",
      links: ["app"],
    },
  ],
  steps: [
    {
      text: "On ActivityPub your post goes to your own instance, and the servers pass it on to each other.",
      nodes: ["mastodon", "pixelfed", "peertube"],
      edges: ["mastodon-pixelfed", "pixelfed-peertube"],
    },
    {
      text: "On AT Protocol you post from an app, but the post is written to your PDS.",
      nodes: ["app", "pds"],
      edges: ["app-pds"],
    },
    {
      text: "A relay aggregates it with everyone else's.",
      nodes: ["pds", "relay"],
      edges: ["pds-relay"],
    },
    {
      text: "Apps read from the relay to build what you see.",
      nodes: ["relay", "app"],
      edges: ["relay-app"],
    },
    {
      text: "Labeling services handle moderation on top.",
      nodes: ["labelers", "app"],
      edges: ["labelers-app"],
    },
  ],
};
