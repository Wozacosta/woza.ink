import type { InteractiveDiagramConfig } from "./types";

export const privacyP2p: InteractiveDiagramConfig = {
  tourLabel: "Walk the options",
  intro: "Tap an option for how it works, or walk from the hosted past to what's left.",
  nodes: [
    {
      id: "localmonero",
      title: "LocalMonero",
      description: "A hosted marketplace with escrow and dispute resolution, and the main way to get Monero without KYC. A hosted platform can be closed, and it was, in May 2024.",
      links: [],
    },
    {
      id: "haveno",
      title: "Haveno",
      description: "Forked from Bisq with XMR as the base currency. Trades run on Tor with Monero multisig escrow, and there's no company or central server.",
      links: [],
    },
    {
      id: "bisq",
      title: "Bisq",
      description: "A long-running desktop exchange with Tor routing, no KYC and multisig escrow, with Bitcoin as its base currency. It's the model Haveno is built on.",
      links: [],
    },
    {
      id: "swap",
      title: "xmr-btc-swap",
      description: "Trades BTC for XMR between two wallets with no exchange at all. It's technically sound, but you run command-line tools and find your own partner.",
      links: [],
    },
    {
      id: "robosats",
      title: "RoboSats",
      description: "Lightning-native Bitcoin trades over Tor, with disposable robot identities and HODL invoices for escrow. It doesn't trade Monero.",
      links: [],
    },
  ],
  steps: [
    {
      text: "For years the easy route was a hosted site. It closed, and took the largest on-ramps with it.",
      nodes: ["localmonero"],
      edges: [],
    },
    {
      text: "Haveno is the direct successor: the same job with no server to shut down, and thinner liquidity.",
      nodes: ["haveno"],
      edges: [],
    },
    {
      text: "On the Bitcoin side, Bisq has run this model for years, and RoboSats shows where it's heading.",
      nodes: ["bisq", "robosats"],
      edges: [],
    },
    {
      text: "With an atomic swap, Bitcoin bought privately can become Monero with no exchange in between.",
      nodes: ["swap"],
      edges: [],
    },
  ],
};
