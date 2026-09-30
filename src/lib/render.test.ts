// @vitest-environment node
import fs from "fs";
import path from "path";
import { describe, it, expect } from "vitest";
import { getAllPosts } from "@/data/blog";
import { DIAGRAM_DIR, renderMarkdown, stripLeadingH1 } from "./render";

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

describe("diagrams", () => {
  it("inlines the SVG in a figure, not inside a paragraph", async () => {
    const html = await renderMarkdown("Intro.\n\n![The pipeline](diagram:arr-architecture)\n\nAfter.");
    expect(html).toContain('<figure class="diagram" data-diagram="arr-architecture"><svg');
    expect(html).toContain("<figcaption>The pipeline</figcaption>");
    expect(html).not.toMatch(/<p>\s*<figure/);
  });

  it("uses a plain img in img mode (feeds)", async () => {
    const html = await renderMarkdown("![Cap](diagram:arr-architecture)", { diagrams: "img" });
    expect(html).toContain('<img src="/diagrams/arr-architecture.svg" alt="Cap" />');
    expect(html).not.toContain("<svg");
  });

  it("fails loudly on a missing or unsafe diagram name", async () => {
    await expect(renderMarkdown("![x](diagram:does-not-exist)")).rejects.toThrow(/Diagram not found/);
    await expect(renderMarkdown("![x](diagram:../secret)")).rejects.toThrow(/Invalid diagram name/);
  });

  it("every diagram referenced by a post exists", () => {
    for (const post of getAllPosts()) {
      for (const [, name] of post.content.matchAll(/\]\(diagram:([^)]+)\)/g)) {
        expect(fs.existsSync(path.join(DIAGRAM_DIR, `${name}.svg`)), `${post.slug}: ${name}`).toBe(true);
      }
    }
  });
});
