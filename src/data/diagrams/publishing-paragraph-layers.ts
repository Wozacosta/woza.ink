import type { InteractiveDiagramConfig } from "./types";

export const publishingParagraphLayers: InteractiveDiagramConfig = {
  tourLabel: "Walk the layers",
  intro: "Tap a feature to see what it does, or walk the two layers.",
  nodes: [
    {
      id: "email",
      title: "Email",
      description:
        "Newsletter delivery, as on any newsletter platform. It's the inbox presence Mirror never had.",
      links: [],
    },
    {
      id: "seo",
      title: "SEO",
      description:
        "Posts are normal web pages that search engines can read. No wallet is needed to read them.",
      links: [],
    },
    {
      id: "analytics",
      title: "Analytics",
      description: "The usual newsletter numbers, available without touching anything onchain.",
      links: [],
    },
    {
      id: "arweave",
      title: "Arweave copy",
      description:
        "Optional permanent storage at about $0.005 per MB. Without it, the content lives on Paragraph's servers.",
      links: [],
    },
    {
      id: "collects",
      title: "NFT collects",
      description: "Readers can collect an article as an NFT.",
      links: [],
    },
    {
      id: "memberships",
      title: "NFT memberships",
      description:
        "Readers buy a membership for gated content. Paragraph takes a 3% platform fee on onchain memberships.",
      links: [],
    },
    {
      id: "gating",
      title: "Token-gated posts",
      description: "Restrict a post to holders of specific NFTs or tokens.",
      links: [],
    },
  ],
  steps: [
    {
      text: "The web2 layer works like any newsletter platform, and it's what most readers touch.",
      nodes: ["email", "seo", "analytics"],
      edges: [],
    },
    {
      text: "Monetizing onchain is opt-in: collects, memberships and gated posts.",
      nodes: ["collects", "memberships", "gating"],
      edges: [],
    },
    {
      text: "Permanence is opt-in too. Skip Arweave and the post lives on Paragraph's servers.",
      nodes: ["arweave"],
      edges: [],
    },
  ],
};
