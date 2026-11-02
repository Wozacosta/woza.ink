import type { InteractiveDiagramConfig } from "./types";

export const railgunShielded: InteractiveDiagramConfig = {
  tourLabel: "Follow a shielded swap",
  intro: "Tap a box to see who can see what, or follow one swap into the shielded balance and out to an auditor.",
  nodes: [
    {
      id: "wallet",
      title: "Your public address",
      description:
        "An ordinary Ethereum address. Everything it holds and does is visible, and it's the starting point for shielding ERC-20 tokens and NFTs.",
      links: ["pool"],
    },
    {
      id: "pool",
      title: "0zk balance",
      description:
        "Tokens shielded into RAILGUN's contracts become an encrypted balance on a private 0zk address. There's no bridge and no separate chain: they're still Ethereum tokens. The more people stay shielded, the bigger the crowd everyone hides in.",
      links: ["wallet", "defi", "auditor", "checker"],
    },
    {
      id: "defi",
      title: "Uniswap, Aave",
      description:
        "A ZK proof authorizes one specific contract interaction without revealing the calling address. The protocol sees a valid interaction, and it doesn't see who started it.",
      links: ["pool"],
    },
    {
      id: "auditor",
      title: "Your auditor",
      description:
        "A viewing key is a shareable, read-only key that reveals the origin of funds to a third party you pick, such as an auditor, regulator or employer. The public still sees nothing.",
      links: ["pool"],
    },
    {
      id: "checker",
      title: "Anyone checking",
      description:
        "A Private Proof of Innocence is a zero-knowledge proof of no contact with flagged addresses. It shows that without revealing anything else about your history.",
      links: ["pool"],
    },
  ],
  steps: [
    {
      text: "Your tokens start at a public address, with every balance and move visible to anyone.",
      nodes: ["wallet"],
      edges: [],
    },
    {
      text: "You shield them. They enter an encrypted balance tied to your 0zk address.",
      nodes: ["wallet", "pool"],
      edges: ["wallet-pool"],
    },
    {
      text: "From here, balances and transfers are encrypted and invisible onchain. Nothing has left Ethereum.",
      nodes: ["pool"],
      edges: [],
    },
    {
      text: "You swap on Uniswap. A ZK proof authorizes the call, so the protocol sees a valid interaction and not who made it.",
      nodes: ["pool", "defi"],
      edges: ["pool-defi"],
    },
    {
      text: "You stay shielded and keep going. Unlike a mixer, there's no need to leave, and each user who stays grows the anonymity set.",
      nodes: ["pool"],
      edges: [],
    },
    {
      text: "Your auditor asks where the funds came from. You share a viewing key with them, and only them.",
      nodes: ["pool", "auditor"],
      edges: ["pool-auditor"],
    },
    {
      text: "Someone needs to know the funds are clean. A Proof of Innocence shows no contact with flagged addresses and reveals nothing else.",
      nodes: ["pool", "checker"],
      edges: ["pool-checker"],
    },
  ],
};
