import type { InteractiveDiagramConfig } from "./types";

export const cameraExposure: InteractiveDiagramConfig = {
  tourLabel: "Trade a stop",
  intro: "Tap a setting to see what it does, or trade one stop of light around the triangle.",
  nodes: [
    {
      id: "aperture",
      title: "Aperture",
      description:
        "How wide the lens opens, written as an f-number: a smaller number is a wider opening. Each full stop (f/2.8, f/4, f/5.6) halves the light. A wider opening also blurs the background more.",
      links: ["shutter", "iso"],
    },
    {
      id: "shutter",
      title: "Shutter speed",
      description: "How long the sensor collects light. Half the time is half the light. A slow shutter lets moving subjects and shaky hands blur.",
      links: ["aperture", "iso"],
    },
    {
      id: "iso",
      title: "ISO",
      description: "How much the signal is amplified after the light has been collected. It adds no light, so doubling it makes the picture brighter and brings noise up with it.",
      links: ["aperture", "shutter"],
    },
  ],
  steps: [
    {
      text: "Start at f/2.8, 1/250 and ISO 400.",
      nodes: ["aperture", "shutter", "iso"],
      edges: [],
    },
    {
      text: "Close the aperture to f/4 for a less blurry background. That's half the light.",
      nodes: ["aperture"],
      edges: [],
    },
    {
      text: "Win it back with a 1/125 shutter. Same brightness, with more risk of motion blur.",
      nodes: ["aperture", "shutter"],
      edges: ["aperture-shutter"],
    },
    {
      text: "Or keep 1/250 and go to ISO 800. Same brightness again, with more noise.",
      nodes: ["aperture", "iso"],
      edges: ["aperture-iso"],
    },
  ],
};
