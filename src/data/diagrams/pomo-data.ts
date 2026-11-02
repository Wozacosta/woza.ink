import type { InteractiveDiagramConfig } from "./types";

export const pomoData: InteractiveDiagramConfig = {
  tourLabel: "Follow a session",
  intro: "Tap a box to see what it does, or follow one session.",
  nodes: [
    {
      id: "vercel",
      title: "Vercel",
      description: "Hosts the files and deploys them. It delivers the app, and that's its whole job here.",
      links: ["browser"],
    },
    {
      id: "browser",
      title: "Your browser",
      description: "Everything that matters runs here, on your machine.",
      links: ["vercel"],
    },
    {
      id: "app",
      title: "React app",
      description: "The timer and the rest of the interface, using tiny local state rather than a heavy global store.",
      links: ["storage", "music", "backend"],
    },
    {
      id: "storage",
      title: "Local Storage",
      description: "Where your count is kept. It's fast and private, and it belongs to this browser on this device.",
      links: ["app"],
    },
    {
      id: "music",
      title: "New tab",
      description: "Music plays on YouTube or Spotify in a separate tab, so Pomo doesn't need a player.",
      links: ["app"],
    },
    {
      id: "backend",
      title: "Backend",
      description: "There isn't one. No accounts, no database and no tracking, so there's nothing to run or to leak.",
      links: ["app"],
    },
  ],
  steps: [
    {
      text: "You open Pomo. Vercel sends the files, and from then on the app runs in your browser.",
      nodes: ["vercel", "browser"],
      edges: ["vercel-browser"],
    },
    {
      text: "You start some music. It opens in a new tab.",
      nodes: ["app", "music"],
      edges: ["app-music"],
    },
    {
      text: "You finish a pomodoro. The count is saved to Local Storage.",
      nodes: ["app", "storage"],
      edges: ["app-storage"],
    },
    {
      text: "Nothing goes anywhere else, because there's nowhere else for it to go.",
      nodes: ["app", "backend"],
      edges: ["app-backend"],
    },
  ],
};
