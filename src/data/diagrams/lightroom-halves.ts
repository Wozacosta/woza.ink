import type { InteractiveDiagramConfig } from "./types";

export const lightroomHalves: InteractiveDiagramConfig = {
  tourLabel: "Build a setup",
  intro: "Tap a tool to see who it's for, or walk through the setups one by one.",
  nodes: [
    {
      id: "lightroom",
      title: "Lightroom",
      description:
        "A RAW processor and a digital asset manager in one, with the most capable catalog and a massive ecosystem. Subscription only: there's no way to buy it outright.",
      links: [],
    },
    {
      id: "capture-one",
      title: "Capture One",
      description:
        "Best-in-class color tools and tethered shooting, with a perpetual license at $299. Its DAM features are weaker than Lightroom's.",
      links: [],
    },
    {
      id: "on1",
      title: "ON1 Photo RAW",
      description:
        "An all-in-one editor and organizer for around $100, or a subscription. Decent at everything, exceptional at nothing.",
      links: [],
    },
    {
      id: "darktable",
      title: "darktable",
      description:
        "A free, non-destructive RAW editor with a built-in DAM, running on Linux, macOS and Windows. It offers more control over the pipeline than Lightroom, and the learning curve is brutal.",
      links: [],
    },
    {
      id: "digikam",
      title: "digiKam",
      description:
        "The library half of Lightroom, open-sourced: importing, tagging, face recognition, geolocation and metadata editing, plus basic editing tools.",
      links: ["rawtherapee"],
    },
    {
      id: "rawtherapee",
      title: "RawTherapee",
      description:
        "A pure RAW processor with no library at all. Fine-grained control over every step, lightweight, and great for a handful of files.",
      links: ["digikam"],
    },
    {
      id: "apple-photos",
      title: "Apple Photos",
      description: "Basic organization for Mac and iPad users, and the natural partner for Photomator, which has almost no DAM of its own.",
      links: ["photomator"],
    },
    {
      id: "photomator",
      title: "Photomator",
      description:
        "A fast, simple RAW editor built for Apple's stack, with a one-time purchase or a subscription. Apple only, and its DAM features are basically nonexistent.",
      links: ["apple-photos"],
    },
    {
      id: "dxo",
      title: "DxO PhotoLab",
      description:
        "The noise reduction leader, with lens corrections from lab-measured data. A one-time purchase at around $230, but its DAM is minimal, so it needs a separate tool for organization.",
      links: [],
    },
  ],
  steps: [
    {
      text: "Already in Lightroom and it works? Stay. Switching costs are real.",
      nodes: ["lightroom"],
      edges: [],
    },
    {
      text: "Want one tool you own? ON1 Photo RAW has both DAM and editing at a one-time price.",
      nodes: ["on1"],
      edges: [],
    },
    {
      text: "Technical and value freedom? darktable does both jobs, and digiKam can take over the library.",
      nodes: ["darktable", "digikam"],
      edges: [],
    },
    {
      text: "Prefer parts? digiKam for organization and RawTherapee for editing. It works, but the handoff is clunky.",
      nodes: ["digikam", "rawtherapee"],
      edges: ["digikam-rawtherapee"],
    },
    {
      text: "In the Apple ecosystem and want it simple? Photomator, with Apple Photos for basic organization.",
      nodes: ["apple-photos", "photomator"],
      edges: ["apple-photos-photomator"],
    },
    {
      text: "Shooting wildlife, events or low light? DxO PhotoLab for processing, with Lightroom or darktable for organization.",
      nodes: ["dxo", "lightroom", "darktable"],
      edges: [],
    },
    {
      text: "A working professional? Capture One, for the color tools and tethering.",
      nodes: ["capture-one"],
      edges: [],
    },
  ],
};
