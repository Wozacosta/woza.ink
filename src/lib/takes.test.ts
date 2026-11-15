import { describe, it, expect } from "vitest";
import { countTakes, takesLabel } from "./takes";

describe("countTakes", () => {
  it("counts `> [!take]` blocks, in any case", () => {
    expect(countTakes("Intro\n\n> [!take]\n> Mine\n\nMore\n\n>[!TAKE] Short")).toBe(2);
  });

  it("ignores the marker outside a blockquote's first line and inside code", () => {
    expect(countTakes("Use [!take] like this:\n\n```md\n> [!take]\n> Example\n```\n")).toBe(0);
  });
});

describe("takesLabel", () => {
  it("pluralizes", () => {
    expect(takesLabel(1)).toBe("1 take");
    expect(takesLabel(3)).toBe("3 takes");
  });
});
