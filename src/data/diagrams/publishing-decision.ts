import type { InteractiveDiagramConfig } from "./types";

export const publishingDecision: InteractiveDiagramConfig = {
  tourLabel: "Answer the questions",
  intro: "Tap an answer to see why, or go through the three questions in order.",
  nodes: [
    {
      id: "q1",
      title: "Who's your audience?",
      description: "Distribution decides this one more than ideology does.",
      links: ["paragraph", "substack"],
    },
    {
      id: "paragraph",
      title: "Paragraph",
      description: "For crypto-native readers it gives you web2 usability with web3 upside.",
      links: ["q1"],
    },
    {
      id: "substack",
      title: "Substack or Medium",
      description: "For a general audience they still win on distribution by a wide margin.",
      links: ["q1"],
    },
    {
      id: "q2",
      title: "What does ownership mean?",
      description: "The word covers two very different things.",
      links: ["export", "arweave"],
    },
    {
      id: "export",
      title: "Substack is fine",
      description:
        "If owning your content means being able to export a markdown file, you don't need a chain.",
      links: ["q2"],
    },
    {
      id: "arweave",
      title: "Arweave-backed",
      description:
        "If it means your writing sits on a decentralized storage layer no company can delete, this is the option.",
      links: ["q2"],
    },
    {
      id: "q3",
      title: "Want an identity that outlives any app?",
      description: "A long-term bet on protocol-level audiences rather than platform-locked ones.",
      links: ["lens"],
    },
    {
      id: "lens",
      title: "Lens or Farcaster",
      description:
        "They offer a social graph that survives platform death, which no web2 platform can match.",
      links: ["q3"],
    },
  ],
  steps: [
    {
      text: "Start with your readers. Crypto-native readers point to Paragraph.",
      nodes: ["q1", "paragraph"],
      edges: ["q1-paragraph"],
    },
    {
      text: "Everyone else is on Substack and Medium, and that's where distribution is.",
      nodes: ["q1", "substack"],
      edges: ["q1-substack"],
    },
    {
      text: "Next, ownership. If exporting a file is enough, stay put.",
      nodes: ["q2", "export"],
      edges: ["q2-export"],
    },
    {
      text: "If it has to outlast any company, you want Arweave-backed publishing.",
      nodes: ["q2", "arweave"],
      edges: ["q2-arweave"],
    },
    {
      text: "Last, identity. Lens and Farcaster are a bet that audiences will live at the protocol level.",
      nodes: ["q3", "lens"],
      edges: ["q3-lens"],
    },
  ],
};
