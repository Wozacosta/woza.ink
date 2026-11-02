import type { InteractiveDiagramConfig } from "./types";

export const ethStandardsTimeline: InteractiveDiagramConfig = {
  tourLabel: "Walk the eras",
  intro: "Tap a standard to see what it changed, or walk the four eras in order.",
  nodes: [
    {
      id: "erc20",
      title: "ERC-20",
      description: "A shared interface of six functions, so any token can be listed on any exchange and held in any wallet.",
      links: [],
    },
    {
      id: "eip155",
      title: "EIP-155",
      description: "Added a chain ID to the signing scheme, so a transaction signed for one chain is invalid on all others.",
      links: [],
    },
    {
      id: "erc721",
      title: "ERC-721",
      description: "Tokens where every unit is unique, each with a tokenId. It enabled ENS names, art NFTs and game items.",
      links: [],
    },
    {
      id: "erc1155",
      title: "ERC-1155",
      description: "One contract for fungible and non-fungible tokens together, with batch transfers in a single transaction.",
      links: [],
    },
    {
      id: "erc2981",
      title: "ERC-2981",
      description: "A standard way to ask who gets a royalty and how much. It's informational: nothing makes anyone pay.",
      links: [],
    },
    {
      id: "eip1559",
      title: "EIP-1559",
      description: "Replaced the blind auction with an algorithmic base fee, which is burned, plus an optional tip to validators.",
      links: [],
    },
    {
      id: "erc4337",
      title: "ERC-4337",
      description: "Smart contract wallets without a protocol change, through bundlers, paymasters and one EntryPoint contract.",
      links: [],
    },
    {
      id: "erc6551",
      title: "ERC-6551",
      description: "Gives any ERC-721 token its own smart contract account. Transfer the NFT and everything in the account goes with it.",
      links: [],
    },
    {
      id: "eip4844",
      title: "EIP-4844",
      description: "Blobs: temporary, cheaper data for rollups, kept for about 18 days. L2 fees dropped 10-100x overnight.",
      links: [],
    },
    {
      id: "eip7702",
      title: "EIP-7702",
      description: "Lets an existing EOA delegate to a smart contract, so it gains smart wallet powers at the same address.",
      links: [],
    },
  ],
  steps: [
    {
      text: "What can exist onchain? These standards defined the asset types and kept the chain from splitting into chaos.",
      nodes: ["erc20", "eip155", "erc721"],
      edges: [],
    },
    {
      text: "How should the chain work? Multi-token efficiency, fee reform and royalty info improved what already existed.",
      nodes: ["erc1155", "erc2981", "eip1559"],
      edges: [],
    },
    {
      text: "How does it scale? Blobs were the defining upgrade: the answer is rollups, and 4844 made them economically viable.",
      nodes: ["eip4844"],
      edges: [],
    },
    {
      text: "What can accounts become? These turn an account from a private key into a programmable entity.",
      nodes: ["erc4337", "erc6551", "eip7702"],
      edges: [],
    },
  ],
};
