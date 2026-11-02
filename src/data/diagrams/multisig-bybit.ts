import type { InteractiveDiagramConfig } from "./types";

export const multisigBybit: InteractiveDiagramConfig = {
  tourLabel: "Follow the attack",
  intro: "Tap a box to see its part in the theft, or follow the attack from a developer's laptop to the empty wallet.",
  nodes: [
    {
      id: "dev",
      title: "Developer's machine",
      description: "The way in: the attackers compromised the machine of a Safe developer.",
      links: ["cloud"],
    },
    {
      id: "cloud",
      title: "Safe's cloud",
      description: "From that machine they reached Safe's cloud infrastructure, which serves the multisig's web interface.",
      links: ["dev", "frontend"],
    },
    {
      id: "frontend",
      title: "Compromised frontend",
      description:
        "The attackers modified the JavaScript so that what Bybit's signers reviewed and what they signed were two different things. No key was touched.",
      links: ["cloud", "screen", "payload"],
    },
    {
      id: "screen",
      title: "Screen showed",
      description: "A benign transfer. The signers approved what they were shown, and they were shown a lie.",
      links: ["frontend", "hardware"],
    },
    {
      id: "payload",
      title: "Payload held",
      description:
        "A transaction replacing the wallet's implementation contract with the attacker's. Bybit's Safe supported delegatecall, a general mechanism it didn't need for cold storage.",
      links: ["frontend", "hardware"],
    },
    {
      id: "hardware",
      title: "Hardware wallets",
      description:
        "This was the one place that could have caught it, and it showed a hash. A hash is not information. The defense is independent verification: a second device decoding the calldata and saying in words what it does.",
      links: ["screen", "payload", "multisig"],
    },
    {
      id: "multisig",
      title: "The multisig",
      description:
        "A Safe, properly configured, doing its job. Requiring more signers does nothing when every signer is looking at the same compromised screen.",
      links: ["hardware"],
    },
  ],
  steps: [
    { text: "The attackers compromise a Safe developer's machine.", nodes: ["dev"], edges: [] },
    { text: "From there they reach Safe's cloud infrastructure.", nodes: ["dev", "cloud"], edges: ["dev-cloud"] },
    { text: "They modify the multisig frontend's JavaScript.", nodes: ["cloud", "frontend"], edges: ["cloud-frontend"] },
    {
      text: "Bybit's signers review a transaction, and the interface shows a benign transfer.",
      nodes: ["frontend", "screen"],
      edges: ["frontend-screen"],
    },
    {
      text: "The payload they're about to sign replaces the wallet's implementation contract.",
      nodes: ["frontend", "payload"],
      edges: ["frontend-payload"],
    },
    {
      text: "Their hardware wallets show a hash, so nobody can compare the two.",
      nodes: ["screen", "payload", "hardware"],
      edges: ["screen-hardware", "payload-hardware"],
    },
    {
      text: "They sign. The threshold is met and every signature is valid.",
      nodes: ["hardware", "multisig"],
      edges: ["hardware-multisig"],
    },
    { text: "Roughly $1.44 billion leaves the wallet. No key was ever stolen.", nodes: ["multisig"], edges: [] },
  ],
};
