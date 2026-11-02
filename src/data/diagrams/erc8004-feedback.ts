import type { InteractiveDiagramConfig } from "./types";

export const erc8004Feedback: InteractiveDiagramConfig = {
  tourLabel: "Follow one review",
  intro: "Tap a box to see its role, or follow one piece of feedback from a client to its readers.",
  nodes: [
    {
      id: "client",
      title: "Client",
      description: "After interacting with an agent, it leaves a signed value with decimals, two tags and a link to the details. It can revoke that feedback later.",
      links: ["registry"],
    },
    {
      id: "responder",
      title: "Anyone",
      description: "Anyone can append a response: an agent showing a refund, or an aggregator tagging feedback as spam.",
      links: ["registry"],
    },
    {
      id: "registry",
      title: "Reputation Registry",
      description: "It stores raw values and offers getSummary to aggregate them. An uptime of 99.77% is stored as 9977 with 2 decimals.",
      links: ["client", "responder", "defi", "review", "pipeline"],
    },
    {
      id: "defi",
      title: "DeFi protocol",
      description: "Might weight recent trading performance heavily.",
      links: ["registry"],
    },
    {
      id: "review",
      title: "Code review service",
      description: "Might care about long-term consistency.",
      links: ["registry"],
    },
    {
      id: "pipeline",
      title: "Data pipeline",
      description: "Might only care about uptime.",
      links: ["registry"],
    },
  ],
  steps: [
    {
      text: "A client finishes a job and calls giveFeedback, with a value, decimals and tags.",
      nodes: ["client", "registry"],
      edges: ["client-registry"],
    },
    {
      text: "Anyone can append a response to that entry, such as the agent showing a refund.",
      nodes: ["responder", "registry"],
      edges: ["responder-registry"],
    },
    {
      text: "Three applications read the same data, and none has to agree with the others.",
      nodes: ["registry", "defi", "review", "pipeline"],
      edges: ["registry-defi", "registry-review", "registry-pipeline"],
    },
  ],
};
