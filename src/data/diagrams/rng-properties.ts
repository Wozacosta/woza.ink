import type { InteractiveDiagramConfig } from "./types";

export const rngProperties: InteractiveDiagramConfig = {
  tourLabel: "Walk the properties",
  intro: "Tap a tool to see what it gives you, or walk through the three properties.",
  nodes: [
    {
      id: "urandom",
      title: "/dev/urandom",
      description: "Nobody can guess the next value, but you can't prove to anyone that you didn't pick your favorite number.",
      links: [],
    },
    {
      id: "commit",
      title: "Commit-reveal",
      description: "Anyone can check the hash, and it can be made unbiasable. It's often entirely predictable to the first participant.",
      links: [],
    },
    {
      id: "randao",
      title: "PREVRANDAO",
      description: "Everyone can check it, but the last proposer in an epoch can skip a slot to discard a result they don't like, and sees it first.",
      links: [],
    },
    {
      id: "vrf",
      title: "VRF",
      description: "A proof shows the value was derived correctly, so nobody can swap it. The oracle computes it first, and you still trust that it answers.",
      links: [],
    },
    {
      id: "drand",
      title: "drand",
      description: "A threshold beacon where no minority can predict or bias the output. Values are public the instant they exist, so it's useless for secrets.",
      links: [],
    },
  ],
  steps: [
    {
      text: "Unpredictable: nobody can guess the next value. /dev/urandom and drand give this fully. A VRF does too, except for the oracle.",
      nodes: ["urandom", "drand", "vrf"],
      edges: [],
    },
    {
      text: "Unbiasable: no participant can steer the outcome. PREVRANDAO leaks one bit to the last proposer, and commit-reveal only gets here with care.",
      nodes: ["vrf", "drand", "commit", "randao"],
      edges: [],
    },
    {
      text: "Verifiable: anyone can confirm it afterward. Everything onchain gets this, and /dev/urandom can't.",
      nodes: ["commit", "randao", "vrf", "drand"],
      edges: [],
    },
  ],
};
