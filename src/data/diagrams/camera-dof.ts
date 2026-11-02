import type { InteractiveDiagramConfig } from "./types";

export const cameraDof: InteractiveDiagramConfig = {
  tourLabel: "Shrink the sensor",
  intro: "Tap a row for the numbers behind it, or shrink the sensor one step at a time.",
  nodes: [
    {
      id: "ff",
      title: "Full-frame",
      description: "A 50mm lens at f/1.8 with a 0.03 mm circle of confusion. Sharp from about 1.92 m to 2.09 m, which is about 17 cm.",
      links: [],
    },
    {
      id: "apsc",
      title: "APS-C",
      description: "For the same framing you need about a 33mm lens. At f/1.8 that's sharp from about 1.88 m to 2.14 m, or about 26 cm.",
      links: [],
    },
    {
      id: "mft",
      title: "Micro Four Thirds",
      description: "A 25mm lens frames the same shot. At f/1.8 it's sharp from about 1.84 m to 2.19 m, or about 34 cm.",
      links: [],
    },
    {
      id: "phone",
      title: "1-inch phone",
      description: "A sensor with a crop factor of about 2.7, using about an 18mm lens. Even at f/1.8 it's sharp from about 1.79 m to 2.27 m, or about 47 cm. Portrait modes fake the rest in software.",
      links: [],
    },
  ],
  steps: [
    {
      text: "Full-frame keeps about 17 cm sharp around the subject, so the background falls away fast.",
      nodes: ["ff"],
      edges: [],
    },
    {
      text: "APS-C needs a shorter lens for the same framing, and a shorter lens keeps more in focus: about 26 cm.",
      nodes: ["apsc"],
      edges: [],
    },
    {
      text: "Micro Four Thirds doubles the full-frame figure: about 34 cm.",
      nodes: ["mft"],
      edges: [],
    },
    {
      text: "A 1-inch phone sensor keeps about 47 cm sharp at the same f-number.",
      nodes: ["phone"],
      edges: [],
    },
  ],
};
