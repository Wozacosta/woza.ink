import type { InteractiveDiagramConfig } from "./types";

export const matrixStack: InteractiveDiagramConfig = {
  tourLabel: "Build a stack",
  intro: "Tap a layer to see the options, or build a stack from the top.",
  nodes: [
    {
      id: "walled",
      title: "A walled app",
      description:
        "You pick an app and hope they don't sell out. The app, the server and the network all come as one.",
      links: [],
    },
    {
      id: "client",
      title: "Client",
      description:
        "The app UI you use. Element is the polished one, FluffyChat is mobile-friendly, and Cinny suits Discord-like folks. You can change it without losing your identity.",
      links: ["homeserver"],
    },
    {
      id: "homeserver",
      title: "Homeserver",
      description:
        "Who stores your data. Use a public one like matrix.org to start quickly, or self-host Synapse or Conduit.",
      links: ["client", "bridges"],
    },
    {
      id: "bridges",
      title: "Bridges",
      description:
        "Only if you want interoperability. They connect Matrix rooms to Slack, IRC, Telegram and more, and quality varies.",
      links: ["homeserver"],
    },
  ],
  steps: [
    {
      text: "A normal app decides everything for you.",
      nodes: ["walled"],
      edges: [],
    },
    {
      text: "With Matrix you start by picking a client.",
      nodes: ["client"],
      edges: [],
    },
    {
      text: "Then a homeserver, which is the choice that decides who holds your data.",
      nodes: ["client", "homeserver"],
      edges: ["client-homeserver"],
    },
    {
      text: "Bridges are optional, for reaching people who haven't moved.",
      nodes: ["homeserver", "bridges"],
      edges: ["homeserver-bridges"],
    },
  ],
};
