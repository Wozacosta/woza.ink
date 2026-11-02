import type { InteractiveDiagramConfig } from "./types";

export const messengerThreats: InteractiveDiagramConfig = {
  tourLabel: "Walk the threats",
  intro: "Tap a threat or a tool to see why they're paired, or walk all three.",
  nodes: [
    {
      id: "state",
      title: "Nation-state",
      description:
        "Or a provider that can be coerced. Here the server is part of the threat, so it mustn't hold anything readable.",
      links: ["signal"],
    },
    {
      id: "signal",
      title: "Signal",
      description:
        "End-to-end encrypted by default, minimal metadata, and servers that hold no plaintext if seized.",
      links: ["state"],
    },
    {
      id: "snoop",
      title: "Casual snoopers",
      description:
        "You mostly want your chats kept from people around you, and you value multi-device sync and big groups.",
      links: ["telegram"],
    },
    {
      id: "telegram",
      title: "Telegram",
      description:
        "May be okay here, as long as you're explicit about what you're trusting. Cloud chats are readable by the server.",
      links: ["snoop"],
    },
    {
      id: "chat",
      title: "One sensitive chat",
      description: "Your contact is on Telegram and won't move, and this one conversation matters.",
      links: ["secret"],
    },
    {
      id: "secret",
      title: "Secret Chat",
      description: "True end-to-end encryption, but one-to-one, tied to a device pair, and easy to miss.",
      links: ["chat"],
    },
  ],
  steps: [
    {
      text: "If the adversary can reach the server, only a design that keeps the server blind helps.",
      nodes: ["state", "signal"],
      edges: ["state-signal"],
    },
    {
      text: "If it's casual snoopers, Telegram's features can be worth it, with your eyes open.",
      nodes: ["snoop", "telegram"],
      edges: ["snoop-telegram"],
    },
    {
      text: "For one high-sensitivity chat on Telegram, create a Secret Chat.",
      nodes: ["chat", "secret"],
      edges: ["chat-secret"],
    },
  ],
};
