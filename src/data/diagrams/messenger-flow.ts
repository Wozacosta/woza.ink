import type { InteractiveDiagramConfig } from "./types";

export const messengerFlow: InteractiveDiagramConfig = {
  tourLabel: "Follow a message",
  intro: "Tap a box to see what it can read, or follow one message through Signal and then through a Telegram cloud chat.",
  nodes: [
    {
      id: "signalyou",
      title: "You, on Signal",
      description: "Keys are generated and stored on your device. Every chat, one-to-one or group, is end-to-end encrypted by default.",
      links: ["signalserver"],
    },
    {
      id: "signalserver",
      title: "Signal's server",
      description:
        "It delivers messages but can't read them. It keeps minimal metadata, and sealed sender reduces how easily senders and receivers can be linked. Seize it and you get no plaintext.",
      links: ["signalyou", "signalfriend"],
    },
    {
      id: "signalfriend",
      title: "Your friend, on Signal",
      description: "Only the devices at either end can decrypt. The trade-off: no server-side search, and syncing across many devices is more constrained.",
      links: ["signalserver"],
    },
    {
      id: "tgyou",
      title: "You, on Telegram",
      description:
        "A cloud chat is encrypted in transit between you and Telegram's servers, and no further. Secret Chats are the end-to-end option, but you have to create them, and they're one-to-one and tied to a device pair.",
      links: ["tgserver"],
    },
    {
      id: "tgserver",
      title: "Telegram's server",
      description:
        "Telegram holds the keys on the server side, so your messages are as private as Telegram chooses them to be. If its servers are coerced or breached, cloud chat contents are accessible.",
      links: ["tgyou", "tgfriend", "tgfeatures"],
    },
    {
      id: "tgfriend",
      title: "Your friend, on Telegram",
      description: "Gets the message from Telegram's server, on any of their devices. That easy multi-device sync comes from the server holding everything.",
      links: ["tgserver"],
    },
    {
      id: "tgfeatures",
      title: "Stored on Telegram's servers",
      description:
        "Message contents, full chat history, media and all metadata. Telegram can and does process and index messages for search, content delivery and bots. It's a real feature set, and it needs the server to read.",
      links: ["tgserver"],
    },
  ],
  steps: [
    {
      text: "On Signal, your device encrypts the message with keys stored on it.",
      nodes: ["signalyou"],
      edges: [],
    },
    {
      text: "The server delivers it without being able to read it.",
      nodes: ["signalyou", "signalserver"],
      edges: ["signalyou-signalserver"],
    },
    {
      text: "Your friend's device decrypts it. Nobody in between had the keys.",
      nodes: ["signalserver", "signalfriend"],
      edges: ["signalserver-signalfriend"],
    },
    {
      text: "In a Telegram cloud chat, the message is encrypted only as far as Telegram's servers.",
      nodes: ["tgyou", "tgserver"],
      edges: ["tgyou-tgserver"],
    },
    {
      text: "Telegram holds the keys, so its server can read the message.",
      nodes: ["tgserver"],
      edges: [],
    },
    {
      text: "That's what makes history, search, bots and sync possible on the server.",
      nodes: ["tgserver", "tgfeatures"],
      edges: ["tgserver-tgfeatures"],
    },
    {
      text: "The message reaches your friend, and a readable copy stays on Telegram's servers.",
      nodes: ["tgserver", "tgfriend", "tgfeatures"],
      edges: ["tgserver-tgfriend"],
    },
  ],
};
