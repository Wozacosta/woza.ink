import type { InteractiveDiagramConfig } from "./types";

export const lightroomTriage: InteractiveDiagramConfig = {
  tourLabel: "Sort a shoot",
  intro: "Tap a tool to see which files it gets, or sort a shoot one group at a time.",
  nodes: [
    {
      id: "shoot",
      title: "One shoot",
      description: "Not every frame needs the same treatment, so the files are sorted by what they need most.",
      links: ["lightroom", "dxo", "capture-one"],
    },
    {
      id: "lightroom",
      title: "Lightroom",
      description: "Neutral, predictable defaults, which makes it the fast route for the cleanest files.",
      links: ["shoot"],
    },
    {
      id: "dxo",
      title: "DxO PhotoLab",
      description: "DeepPRIME XD3 pulls detail out of high-ISO RAW files, so the keepers from low light go here.",
      links: ["shoot"],
    },
    {
      id: "capture-one",
      title: "Capture One",
      description: "Its color rendering from RAW is widely considered the most pleasing for skin tones, so the hero shots get it.",
      links: ["shoot"],
    },
  ],
  steps: [
    {
      text: "Start with one shoot and sort it by what each file needs.",
      nodes: ["shoot"],
      edges: [],
    },
    {
      text: "Clean files go through Lightroom, where speed matters most.",
      nodes: ["shoot", "lightroom"],
      edges: ["shoot-lightroom"],
    },
    {
      text: "High-ISO keepers go through DxO for noise reduction.",
      nodes: ["shoot", "dxo"],
      edges: ["shoot-dxo"],
    },
    {
      text: "The few hero shots go through Capture One for color.",
      nodes: ["shoot", "capture-one"],
      edges: ["shoot-capture-one"],
    },
  ],
};
