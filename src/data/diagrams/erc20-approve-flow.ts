import type { InteractiveDiagramConfig } from "./types";

export const erc20ApproveFlow: InteractiveDiagramConfig = {
  tourLabel: "Follow an approval",
  intro: "Tap a box to see its part, or follow the two transactions a token spend takes.",
  nodes: [
    {
      id: "you",
      title: "You (EOA)",
      description: "Your wallet sends the first transaction. It moves nothing: it only tells the token how much the spender may take.",
      links: ["token"],
    },
    {
      id: "token",
      title: "Token contract",
      description: "It holds the balances and the allowances. Any contract with these six functions can be listed, held and composed anywhere.",
      links: ["you", "dex"],
    },
    {
      id: "dex",
      title: "DEX or DApp",
      description: "The spender. It sends the second transaction, and from then on it can draw on your allowance without asking again.",
      links: ["token"],
    },
  ],
  steps: [
    {
      text: "You call approve with an infinite amount. That sets an allowance on the token contract, and no tokens move.",
      nodes: ["you", "token"],
      edges: ["you-token"],
    },
    {
      text: "The DEX calls transferFrom to take the amount it needs, spending your allowance.",
      nodes: ["dex", "token"],
      edges: ["dex-token"],
    },
  ],
};
