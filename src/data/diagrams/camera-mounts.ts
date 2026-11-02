import type { InteractiveDiagramConfig } from "./types";

export const cameraMounts: InteractiveDiagramConfig = {
  tourLabel: "Oldest to newest",
  intro: "Tap a mount for the short version, or go through them from oldest to newest.",
  nodes: [
    {
      id: "mft",
      title: "Micro Four Thirds",
      description: "The oldest of the five, launched with the Panasonic G1 in 2008. Panasonic and OM System share it, so the lens library is enormous.",
      links: [],
    },
    {
      id: "sony",
      title: "Sony E",
      description: "Launched in 2010 on APS-C cameras, then full-frame with the A7 in 2013. It's fully open to third-party lenses from Sigma, Tamron and Samyang.",
      links: [],
    },
    {
      id: "fuji",
      title: "Fujifilm X",
      description: "APS-C only since 2012. Fujifilm doesn't make full-frame mirrorless, and its film simulations are the main reason to pick it.",
      links: [],
    },
    {
      id: "nikon",
      title: "Nikon Z",
      description: "Launched in 2018, with a wider diameter than its competitors, which gives lens designers more flexibility.",
      links: [],
    },
    {
      id: "canon",
      title: "Canon RF",
      description: "Also launched in 2018, and the biggest ecosystem now, from the R100 up to the R1. Canon is the strictest about third-party lenses.",
      links: [],
    },
  ],
  steps: [
    {
      text: "Micro Four Thirds came first, in 2008, with the smallest sensor of the five.",
      nodes: ["mft"],
      edges: [],
    },
    {
      text: "Sony followed in 2010, and took E to full-frame in 2013.",
      nodes: ["sony"],
      edges: [],
    },
    {
      text: "Fujifilm arrived in 2012, and stayed with APS-C.",
      nodes: ["fuji"],
      edges: [],
    },
    {
      text: "Nikon and Canon moved in 2018, so the two largest DSLR makers have the youngest mounts.",
      nodes: ["nikon", "canon"],
      edges: [],
    },
  ],
};
