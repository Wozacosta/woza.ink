/** Makes a diagram from public/diagrams interactive. Ids match data-node / data-edge in the SVG. */
export interface DiagramNode {
  id: string;
  title: string;
  description: string;
  /** Other nodes to highlight alongside this one */
  links: string[];
}

export interface DiagramStep {
  text: string;
  nodes: string[];
  edges: string[];
}

export interface InteractiveDiagramConfig {
  /** Label for the guided tour button */
  tourLabel: string;
  intro: string;
  nodes: DiagramNode[];
  steps: DiagramStep[];
}
