import type { InteractiveDiagramConfig } from "./types";

export const matrixFederation: InteractiveDiagramConfig = {
  tourLabel: "Follow a message",
  intro: "Tap a box to see what it does, or follow one message from Alice to Bob and out over a bridge.",
  nodes: [
    {
      id: "alice",
      title: "@alice:example.com",
      description: "Her ID says where her account lives. She can use whichever client she likes, because the protocol is open.",
      links: ["example"],
    },
    {
      id: "bob",
      title: "@bob:other.org",
      description: "On a different homeserver, run by someone else, in the same room. Neither needs an account on the other's server.",
      links: ["other"],
    },
    {
      id: "example",
      title: "example.com",
      description: "Alice's homeserver. It stores her messages and coordinates federation with the other servers in the room.",
      links: ["alice", "other", "third"],
    },
    {
      id: "other",
      title: "other.org",
      description: "Bob's homeserver. It keeps its own copy of the room, so it isn't just passing messages through.",
      links: ["bob", "example", "third"],
    },
    {
      id: "third",
      title: "third.net",
      description:
        "Any other homeserver with someone in the room. Every one of them carries the room, which is why large federated rooms can be heavy on CPU, RAM and storage.",
      links: ["example", "other", "bridged"],
    },
    {
      id: "bridged",
      title: "Slack, IRC, Telegram",
      description:
        "Bridges connect a Matrix room to other networks, which helps a community move over gradually. Quality varies, and a bridge can expose content to outside services.",
      links: ["third"],
    },
  ],
  steps: [
    {
      text: "Alice sends a message from her client. It goes to her homeserver, example.com.",
      nodes: ["alice", "example"],
      edges: ["alice-example"],
    },
    {
      text: "example.com sends it to every other homeserver in the room.",
      nodes: ["example", "other", "third"],
      edges: ["example-other", "example-third"],
    },
    {
      text: "other.org and third.net each keep their own copy of the room.",
      nodes: ["other", "third"],
      edges: [],
    },
    {
      text: "other.org delivers the message to Bob.",
      nodes: ["other", "bob"],
      edges: ["other-bob"],
    },
    {
      text: "A bridge carries it out to networks like Slack, IRC and Telegram.",
      nodes: ["third", "bridged"],
      edges: ["third-bridged"],
    },
    {
      text: "With E2EE on, these servers can't read the message. They still see who's talking, and when.",
      nodes: ["example", "other", "third"],
      edges: [],
    },
  ],
};
