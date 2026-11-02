import type { InteractiveDiagramConfig } from "./types";

export const rssFlow: InteractiveDiagramConfig = {
  tourLabel: "Follow one post",
  intro: "Tap a box to see what it does, or follow one post from the publisher to you.",
  nodes: [
    {
      id: "source",
      title: "Publisher, on a platform",
      description: "Writes a post and hands it to the platform. What happens next isn't up to them.",
      links: ["ranking"],
    },
    {
      id: "ranking",
      title: "Ranking",
      description: "A black-box algorithm between the publisher and you, tuned for engagement. It picks what you see.",
      links: ["source", "viewer"],
    },
    {
      id: "viewer",
      title: "You, on a platform",
      description: "You get what the ranking chose, not everything the publisher posted.",
      links: ["ranking"],
    },
    {
      id: "publisher",
      title: "Publisher",
      description: "Writes something and puts it on their own site. Nobody has to approve or rank it.",
      links: ["feed"],
    },
    {
      id: "feed",
      title: "feed.xml",
      description: "A little machine-readable XML file listing the newest posts. Whether it carries full content or excerpts is up to the publisher.",
      links: ["publisher", "reader"],
    },
    {
      id: "reader",
      title: "Reader",
      description: "Checks the feeds you subscribed to and pulls in what's new. Your subscriptions come with you if you switch, through OPML.",
      links: ["feed", "you"],
    },
    {
      id: "you",
      title: "You",
      description: "You see everything the publisher posts, in chronological order and unchanged.",
      links: ["reader"],
    },
  ],
  steps: [
    {
      text: "A publisher writes a post.",
      nodes: ["publisher"],
      edges: [],
    },
    {
      text: "The website adds it to feed.xml as a new item. That's all the publisher has to do.",
      nodes: ["publisher", "feed"],
      edges: ["publisher-feed"],
    },
    {
      text: "Your reader checks the feed and finds the new item. The request comes from your side, not theirs.",
      nodes: ["reader", "feed"],
      edges: ["reader-feed"],
    },
    {
      text: "The reader shows you the post, in order and unchanged. No middleman decided what you saw.",
      nodes: ["reader", "you"],
      edges: ["reader-you"],
    },
    {
      text: "On a platform, the same post has to get past the ranking first.",
      nodes: ["source", "ranking", "viewer"],
      edges: ["source-ranking", "ranking-viewer"],
    },
  ],
};
