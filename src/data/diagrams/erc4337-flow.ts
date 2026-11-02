import type { InteractiveDiagramConfig } from "./types";

export const erc4337Flow: InteractiveDiagramConfig = {
  tourLabel: "Follow a UserOperation",
  intro: "Tap a box to see what it does, or follow one UserOperation from your signature to execution.",
  nodes: [
    {
      id: "user",
      title: "You",
      description:
        "You sign a UserOperation, not a transaction. It says what your account should do, and the signature can be anything your wallet accepts: passkeys, biometrics or a multisig.",
      links: ["bundler"],
    },
    {
      id: "bundler",
      title: "Bundler",
      description:
        "Picks up your UserOperation, wraps it in a real transaction and submits it to the EntryPoint. Until then it's only a signed message, and the chain hasn't seen it.",
      links: ["user", "entrypoint"],
    },
    {
      id: "entrypoint",
      title: "EntryPoint",
      description:
        "One singleton contract that everything goes through. It validates each operation and then executes it. No client changes were needed: it's a contract, not a protocol change.",
      links: ["bundler", "paymaster", "wallet"],
    },
    {
      id: "wallet",
      title: "Your smart wallet",
      description:
        "Your account is a contract, so it sets its own rules. That's where social recovery, session keys, spending limits and custom signatures live, none of which a bare private key can do.",
      links: ["entrypoint"],
    },
    {
      id: "paymaster",
      title: "Paymaster",
      description:
        "An optional contract that sponsors the gas, so an app can pay for its users and someone with no ETH can still get started.",
      links: ["entrypoint"],
    },
  ],
  steps: [
    {
      text: "You sign a UserOperation. Nothing has reached the chain, and it isn't a transaction yet.",
      nodes: ["user"],
      edges: [],
    },
    {
      text: "A bundler picks it up.",
      nodes: ["user", "bundler"],
      edges: ["user-bundler"],
    },
    {
      text: "The bundler wraps it in a real transaction and submits it to the EntryPoint. This is where it goes onchain.",
      nodes: ["bundler", "entrypoint"],
      edges: ["bundler-entrypoint"],
    },
    {
      text: "Validation comes first: your smart wallet applies its own rules, so a passkey or multisig works as well as a key.",
      nodes: ["entrypoint", "wallet"],
      edges: ["wallet-entrypoint"],
    },
    {
      text: "If a paymaster is involved, it sponsors the gas. You pay nothing.",
      nodes: ["paymaster", "entrypoint"],
      edges: ["paymaster-entrypoint"],
    },
    {
      text: "The EntryPoint executes your operation through your wallet, such as an approve and a swap in a single action.",
      nodes: ["entrypoint", "wallet"],
      edges: ["entrypoint-wallet"],
    },
  ],
};
