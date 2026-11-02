import type { InteractiveDiagramConfig } from "./types";

export const socialNostr: InteractiveDiagramConfig = {
  tourLabel: "Publish an event",
  intro: "Tap a box to see what it does, or publish one event and block a relay.",
  nodes: [
    {
      id: "key",
      title: "Your keypair",
      description:
        "Your key is your identity, portable to any client and stored anywhere. A government can block relays but can't take it.",
      links: ["relaya", "relayb", "relayc"],
    },
    {
      id: "relaya",
      title: "Relay A",
      description: "Stores and forwards signed events. You publish to whatever relays you like.",
      links: ["key", "primal", "snort"],
    },
    {
      id: "relayb",
      title: "Relay B",
      description: "Blocked in this sketch. Losing it costs nothing, because the event is on the others.",
      links: ["key"],
    },
    {
      id: "relayc",
      title: "Relay C",
      description:
        "Another relay with the same signed event. Clients can check the signature wherever they got it.",
      links: ["key", "snort", "damus"],
    },
    {
      id: "primal",
      title: "Primal",
      description: "One of the better current clients. Clients read from relays and show you what they want.",
      links: ["relaya"],
    },
    {
      id: "snort",
      title: "Snort",
      description:
        "Another client. Spam filtering is a client-side problem, so each one handles it its own way.",
      links: ["relaya", "relayc"],
    },
    {
      id: "damus",
      title: "Damus",
      description: "A client for iOS. UX varies wildly from one client to the next.",
      links: ["relayc"],
    },
  ],
  steps: [
    {
      text: "You sign an event with your key. That's the whole identity system.",
      nodes: ["key"],
      edges: [],
    },
    {
      text: "You publish it to several relays of your choice.",
      nodes: ["key", "relaya", "relayc"],
      edges: ["key-relaya", "key-relayc"],
    },
    {
      text: "One relay is blocked, so that copy never lands.",
      nodes: ["key", "relayb"],
      edges: ["key-relayb"],
    },
    {
      text: "Clients read from the relays that are left, and the event still arrives.",
      nodes: ["relaya", "relayc", "primal", "snort", "damus"],
      edges: ["relaya-primal", "relaya-snort", "relayc-snort", "relayc-damus"],
    },
  ],
};
