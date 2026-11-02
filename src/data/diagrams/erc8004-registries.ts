import type { InteractiveDiagramConfig } from "./types";

export const erc8004Registries: InteractiveDiagramConfig = {
  tourLabel: "Vet a stranger agent",
  intro: "Tap a box to see what it holds, or vet a stranger agent one registry at a time.",
  nodes: [
    {
      id: "client",
      title: "Your agent",
      description:
        "It has found an agent it has never seen, run by someone it has no relationship with. There's no organizational hierarchy to fall back on, so it checks the registries and makes its own call.",
      links: ["identity", "reputation", "validation"],
    },
    {
      id: "identity",
      title: "Identity",
      description:
        "Registering mints an ERC-721 NFT, so agents work with existing wallets, multisigs and explorers. It stores an agentURI, and the reserved agentWallet key needs a signature from the wallet itself.",
      links: ["client", "offchain"],
    },
    {
      id: "reputation",
      title: "Reputation",
      description:
        "Clients leave a numeric value with two tags, like starred or uptime, plus a link to the details. The registry can summarize it, but it defines no formula: interpretation is up to the reader.",
      links: ["client", "offchain"],
    },
    {
      id: "validation",
      title: "Validation",
      description:
        "An independent validator answers a request on a 0 to 100 scale. It could be stakers re-running the task, a zkML proof or a TEE attestation: the registry records the result and doesn't care which.",
      links: ["client", "offchain"],
    },
    {
      id: "offchain",
      title: "Offchain data",
      description:
        "The registration file can sit on IPFS, Arweave or HTTPS, and detailed feedback and evidence stay offchain too. Onchain there's only a URI, plus a KECCAK-256 hash for feedback and validation data, which keeps the footprint small.",
      links: ["identity", "reputation", "validation"],
    },
  ],
  steps: [
    {
      text: "Your agent meets a stranger advertising a service. Claims are cheap, so it goes to the registries.",
      nodes: ["client"],
      edges: [],
    },
    {
      text: "Who is it? The Identity Registry has an NFT for it, with an agentURI.",
      nodes: ["client", "identity"],
      edges: ["client-identity"],
    },
    {
      text: "The URI leads to the Agent Registration File: its name, services and endpoints. The contract keeps no hash of it, so an IPFS URI is what pins the content.",
      nodes: ["identity", "offchain"],
      edges: ["identity-offchain"],
    },
    {
      text: "What's its record? getSummary aggregates feedback, filtered by the clients and tags your agent cares about.",
      nodes: ["client", "reputation"],
      edges: ["client-reputation"],
    },
    {
      text: "Need more than opinions? Each feedback entry can link to its details, committed with a hash.",
      nodes: ["reputation", "offchain"],
      edges: ["reputation-offchain"],
    },
    {
      text: "Has anyone checked its work? The Validation Registry holds a response from 0 (failed) to 100 (passed).",
      nodes: ["client", "validation"],
      edges: ["client-validation"],
    },
    {
      text: "The evidence behind that response is offchain too, referenced by URI and hash.",
      nodes: ["validation", "offchain"],
      edges: ["validation-offchain"],
    },
    {
      text: "The standard stops here. It never says who to trust: your agent applies its own rules to the raw data.",
      nodes: ["client", "identity", "reputation", "validation"],
      edges: ["client-identity", "client-reputation", "client-validation"],
    },
  ],
};
