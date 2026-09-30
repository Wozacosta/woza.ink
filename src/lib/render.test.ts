// @vitest-environment node
import { describe, it, expect } from "vitest";
import { renderMarkdown, stripLeadingH1 } from "./render";

describe("renderMarkdown", () => {
  it("wraps tables so they scroll instead of widening the page", async () => {
    const html = await renderMarkdown("| a | **b** |\n|---|---|\n| 1 | `2` |");
    expect(html).toMatch(/^<div class="table-wrap"><table>/);
    expect(html).toContain("<strong>b</strong>");
    expect(html).toContain("<code>2</code>");
  });

  it("highlights fenced code with Shiki", async () => {
    const html = await renderMarkdown("```ts\nconst x = 1;\n```");
    expect(html).toContain('class="shiki');
    expect(html).not.toContain("__CODE_BLOCK_");
  });

  it("keeps $ patterns in code verbatim", async () => {
    const html = await renderMarkdown("```bash\necho $'a' $& done\n```");
    // A string replacer would expand `$'` / `$&` into other parts of the page
    expect(html).toContain("$'a'");
    expect(html).toContain("$&#x26;");
  });

  it("strips only a leading h1", async () => {
    const html = await renderMarkdown("# Title\n\nBody\n\n# Later");
    const stripped = stripLeadingH1(html);
    expect(stripped).toMatch(/^<p>Body<\/p>/);
    expect(stripped).toContain("<h1>Later</h1>");
  });
});
