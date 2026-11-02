import type { InteractiveDiagramConfig } from "./types";

export const searxngQuery: InteractiveDiagramConfig = {
  tourLabel: "Follow a search",
  intro: "Tap a box to see what it does, or follow one search through a fresh install.",
  nodes: [
    {
      id: "browser",
      title: "Your browser",
      description:
        "Point its default search at http://localhost:8080/?q=%s and every query goes to your own container. Bangs work too: !!w jumps to Wikipedia.",
      links: ["searxng"],
    },
    {
      id: "searxng",
      title: "SearXNG",
      description:
        "An open-source metasearch engine. It removes tracking from requests: no cookies, and a random browser profile per request. With one user, though, your whole search history still reaches each engine from a single IP.",
      links: ["browser", "ddg", "brave", "google", "others"],
    },
    {
      id: "ddg",
      title: "DuckDuckGo",
      description:
        "On by default. There's no API, so SearXNG reads its result pages the way a browser would. DuckDuckGo largely sources its links from Bing, so its vote isn't fully independent.",
      links: ["searxng", "merge"],
    },
    {
      id: "brave",
      title: "Brave",
      description: "On by default and read the same way, through result pages on a site that would prefer it didn't.",
      links: ["searxng", "merge"],
    },
    {
      id: "google",
      title: "Google",
      description:
        "A workaround through Google's custom search widget, because the main engine was switched off in July as completely broken. The same note says the workaround will be broken in 2027.",
      links: ["searxng", "merge"],
    },
    {
      id: "others",
      title: "Other engines",
      description: "A set of smaller sources. Startpage, Mojeek and Bing are all off by default, so these are what's left.",
      links: ["searxng", "merge"],
    },
    {
      id: "merge",
      title: "Merge and rank",
      description:
        "A result's weight is the number of engines that returned it, and its score adds up that weight divided by its position on each engine. The hostnames plugin can also remove, demote or boost domains by regex.",
      links: ["ddg", "brave", "google", "others", "results"],
    },
    {
      id: "results",
      title: "Your results",
      description:
        "One merged list. Pages that show up across engines rise, which measures how widely a page has won at SEO, not whether it's any good.",
      links: ["merge"],
    },
  ],
  steps: [
    {
      text: "Your browser sends the query to your own SearXNG.",
      nodes: ["browser", "searxng"],
      edges: ["browser-searxng"],
    },
    {
      text: "SearXNG uses no cookies and picks a random browser profile for the request.",
      nodes: ["searxng"],
      edges: [],
    },
    {
      text: "It asks several engines at once, reading their result pages the way a browser would.",
      nodes: ["searxng", "ddg", "brave", "google", "others"],
      edges: ["searxng-ddg", "searxng-brave", "searxng-google", "searxng-others"],
    },
    {
      text: "To those sites it's a bot, and this is where it breaks. The Google route is already a workaround, with a note saying it won't last.",
      nodes: ["google"],
      edges: [],
    },
    {
      text: "The answers merge. Each engine adds the number of engines that returned a result, divided by the result's position there.",
      nodes: ["ddg", "brave", "google", "others", "merge"],
      edges: ["ddg-merge", "brave-merge", "google-merge", "others-merge"],
    },
    {
      text: "You get one list, with any hostname rules of yours applied.",
      nodes: ["merge", "results"],
      edges: ["merge-results"],
    },
  ],
};
