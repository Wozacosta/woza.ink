import type { InteractiveDiagramConfig } from "./types";

export const rngPipeline: InteractiveDiagramConfig = {
  tourLabel: "Follow the entropy",
  intro: "Tap a box to see what it contributes, or follow the entropy from noise to your code.",
  nodes: [
    { id: "interrupts", title: "Interrupt timing", description: "The exact moments hardware interrupts arrive are hard to predict.", links: [] },
    { id: "io", title: "Disk and network", description: "Jitter in disk and network activity adds more noise, where a machine has any.", links: [] },
    { id: "input", title: "Keyboard and mouse", description: "Human timing helps where it's available. A server or VM may have none.", links: [] },
    {
      id: "rdrand",
      title: "RDRAND",
      description: "Intel's on-die generator. It's fast and can't be audited, so it's mixed into the pool rather than trusted alone.",
      links: [],
    },
    {
      id: "jitter",
      title: "CPU jitter",
      description: "The cycle count of a fixed instruction sequence varies. That needs no special hardware, which is why a headless VM can still seed itself at boot.",
      links: [],
    },
    {
      id: "pool",
      title: "Entropy pool",
      description: "Every source is mixed in. A weak or backdoored source degrades the result instead of owning it.",
      links: ["csprng"],
    },
    {
      id: "csprng",
      title: "CSPRNG",
      description: "A seed of a few hundred bits becomes gigabytes of unpredictable output through fast symmetric cryptography.",
      links: ["pool", "getrandom"],
    },
    {
      id: "getrandom",
      title: "getrandom()",
      description: "What your code should call. It blocks until the pool is initialized, then never again.",
      links: ["csprng"],
    },
  ],
  steps: [
    {
      text: "Small unpredictable events come from all over the machine. None has to be perfect.",
      nodes: ["interrupts", "io", "input", "rdrand", "jitter"],
      edges: [],
    },
    {
      text: "They're mixed into one pool, so no single source decides the result.",
      nodes: ["interrupts", "io", "input", "rdrand", "jitter", "pool"],
      edges: [],
    },
    {
      text: "The pool seeds a CSPRNG. Everything after this point is arithmetic.",
      nodes: ["pool", "csprng"],
      edges: ["pool-csprng"],
    },
    {
      text: "Your code asks for random bytes through getrandom().",
      nodes: ["csprng", "getrandom"],
      edges: ["csprng-getrandom"],
    },
  ],
};
