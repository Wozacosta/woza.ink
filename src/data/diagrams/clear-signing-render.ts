import type { InteractiveDiagramConfig } from "./types";

export const clearSigningRender: InteractiveDiagramConfig = {
  tourLabel: "Follow an approve",
  intro: "Tap a box to see what it does, or follow one approve from raw bytes to the device's screen.",
  nodes: [
    {
      id: "calldata",
      title: "Calldata",
      description:
        "The transaction's data field: four bytes identifying the function, then the arguments in 32-byte words. This one is an ERC-20 approve, and to the device it's opaque.",
      links: ["parser"],
    },
    {
      id: "descriptor",
      title: "Descriptor",
      description:
        "A JSON file in the ERC-7730 format, sitting next to the contract's ABI. For each field it says where the value is, what to call it and how to render it. That meaning comes from someone who knows the contract.",
      links: ["parser"],
    },
    {
      id: "parser",
      title: "Wallet's parser",
      description:
        "The one piece of code. It must check that the transaction matches the descriptor's binding, by chain ID and address or EIP-712 domain, so a descriptor for one contract can't dress up another. Then it applies each field's format.",
      links: ["calldata", "descriptor", "screen", "fallback"],
    },
    {
      id: "screen",
      title: "The screen",
      description:
        "Plain words instead of hex. addressName resolved the spender, tokenAmount found the decimals and ticker, and the threshold turned 2²⁵⁶−1 into Unlimited.",
      links: ["parser"],
    },
    {
      id: "fallback",
      title: "Safe fallback",
      description:
        "If a function has no matching format, the spec tells the wallet to show something like \"Unknown function\" with the raw arguments, and never to apply an unrelated format that happens to be nearby.",
      links: ["parser"],
    },
  ],
  steps: [
    {
      text: "The wallet gets calldata: a selector and two 32-byte words. On their own they're opaque.",
      nodes: ["calldata"],
      edges: [],
    },
    {
      text: "The descriptor for this contract says how to present each function.",
      nodes: ["descriptor"],
      edges: [],
    },
    {
      text: "The parser takes both, and first checks that this transaction matches the descriptor's binding.",
      nodes: ["calldata", "descriptor", "parser"],
      edges: ["calldata-parser", "descriptor-parser"],
    },
    {
      text: "Formats do the rest: addressName names the spender, and tokenAmount finds the decimals and ticker.",
      nodes: ["parser"],
      edges: [],
    },
    {
      text: "The device shows what the call does: Approve, Uniswap Universal Router, Unlimited USDC.",
      nodes: ["parser", "screen"],
      edges: ["parser-screen"],
    },
    {
      text: "With no matching format, you'd get \"Unknown function\" and the raw arguments instead.",
      nodes: ["parser", "fallback"],
      edges: ["parser-fallback"],
    },
  ],
};
