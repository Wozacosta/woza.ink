import type { InteractiveDiagramConfig } from "./types";
import { arrArchitecture } from "./arr-architecture";
import { uxTrust } from "./ux-trust";

/** Diagram name (public/diagrams/<name>.svg) → interactivity config */
export const interactiveDiagrams: Record<string, InteractiveDiagramConfig> = {
  "arr-architecture": arrArchitecture,
  "ux-trust": uxTrust,
};
