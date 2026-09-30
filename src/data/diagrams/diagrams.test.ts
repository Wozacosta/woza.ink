import fs from "fs";
import path from "path";
import { describe, it, expect } from "vitest";
import { interactiveDiagrams } from "./index";

const ids = (svg: string, attr: string) =>
  new Set([...svg.matchAll(new RegExp(`${attr}="([^"]+)"`, "g"))].map((m) => m[1]));

describe.each(Object.entries(interactiveDiagrams))("interactive diagram %s", (name, config) => {
  const svg = fs.readFileSync(path.join(process.cwd(), "public/diagrams", `${name}.svg`), "utf-8");
  const nodes = ids(svg, "data-node");
  const edges = ids(svg, "data-edge");

  it("describes every clickable box in the SVG", () => {
    expect(new Set(config.nodes.map((n) => n.id))).toEqual(nodes);
  });

  it("only links to boxes that exist", () => {
    for (const n of config.nodes) for (const l of n.links) expect(nodes, `${n.id} → ${l}`).toContain(l);
  });

  it("tour steps reference real boxes and arrows", () => {
    for (const [i, step] of config.steps.entries()) {
      for (const n of step.nodes) expect(nodes, `step ${i + 1}: ${n}`).toContain(n);
      for (const e of step.edges) expect(edges, `step ${i + 1}: ${e}`).toContain(e);
    }
  });

  it("every link between two boxes has an arrow", () => {
    for (const n of config.nodes)
      for (const l of n.links)
        expect(edges.has(`${n.id}-${l}`) || edges.has(`${l}-${n.id}`), `${n.id} ↔ ${l}`).toBe(true);
  });
});
