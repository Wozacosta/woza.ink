import type { InteractiveDiagramConfig } from "./types";

export const arrKeys: InteractiveDiagramConfig = {
  tourLabel: "Follow a key",
  intro: "Tap a box to see what it holds, or follow one key from the add-on to whoever asked for it.",
  nodes: [
    {
      id: "anyone",
      title: "Anyone who can reach it",
      description:
        "The worst finding was an unauthenticated endpoint: no login, no API key, just a request. That's why these web UIs shouldn't face the internet.",
      links: ["huntarr"],
    },
    {
      id: "huntarr",
      title: "Huntarr",
      description:
        "A backlog-hunting add-on. To do its job it stores the API keys of every connected app, and the endpoint returned all of them in cleartext.",
      links: ["anyone", "sonarr", "radarr", "prowlarr"],
    },
    {
      id: "sonarr",
      title: "Sonarr",
      description: "An *arr API key is full admin access, so a leaked key is the whole app.",
      links: ["huntarr"],
    },
    {
      id: "radarr",
      title: "Radarr",
      description: "The same deal: every connected app handed its key to the add-on, so one leak covers all of them.",
      links: ["huntarr"],
    },
    {
      id: "prowlarr",
      title: "Prowlarr",
      description: "It holds your indexer logins, and its key went out with the rest. Users were told to rotate every key.",
      links: ["huntarr"],
    },
  ],
  steps: [
    {
      text: "You connect an add-on, and it needs the API key of each app it talks to.",
      nodes: ["huntarr", "sonarr", "radarr", "prowlarr"],
      edges: ["huntarr-sonarr", "huntarr-radarr", "huntarr-prowlarr"],
    },
    {
      text: "Someone on the network calls the settings endpoint, with no login.",
      nodes: ["anyone", "huntarr"],
      edges: ["anyone-huntarr"],
    },
    {
      text: "The reply holds every connected app's settings in cleartext, keys included.",
      nodes: ["anyone", "huntarr"],
      edges: ["anyone-huntarr"],
    },
    {
      text: "Each of those keys is full admin access, so one weak add-on opens the whole stack.",
      nodes: ["sonarr", "radarr", "prowlarr"],
      edges: ["huntarr-sonarr", "huntarr-radarr", "huntarr-prowlarr"],
    },
    {
      text: "The fix was to take it offline and rotate every key. Each tool you plug in is trusted with everything.",
      nodes: ["huntarr"],
      edges: [],
    },
  ],
};
