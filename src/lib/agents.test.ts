import { describe, it, expect } from "vitest";
import { getAllPosts, getPostBySlug } from "@/data/blog";
import { aboutToMarkdown, llmsFullTxt, llmsTxt, postToMarkdown } from "./agents";

describe("llms.txt", () => {
  const txt = llmsTxt();

  it("follows the llmstxt.org shape: h1, blockquote summary, h2 sections", () => {
    expect(txt).toMatch(/^# woza\.ink\n\n> .+\n/);
    expect(txt).toContain("\n## Blog\n");
    expect(txt).toContain("\n## Projects\n");
    expect(txt).toContain("\n## Optional\n");
  });

  it("links every post to its markdown version", () => {
    for (const post of getAllPosts()) {
      expect(txt).toContain(`(https://www.woza.ink/blog/${post.slug}.md)`);
    }
  });
});

describe("postToMarkdown", () => {
  const post = getPostBySlug("true-randomness-and-dice")!;
  const md = postToMarkdown(post);

  it("has one title heading and metadata", () => {
    expect(md.match(/^# /gm)).toHaveLength(1);
    expect(md).toContain(`> ${post.description}`);
    expect(md).toContain("- URL: https://www.woza.ink/blog/true-randomness-and-dice");
  });

  it("appends sidenotes as a Notes section", () => {
    expect(md).toContain("\n## Notes\n");
    expect(md).toMatch(/\n1\. \*\*\w+\*\* on "/);
  });

  it("makes site-relative links absolute", () => {
    for (const p of getAllPosts()) {
      expect(postToMarkdown(p)).not.toMatch(/\]\(\/(?!\/)/);
    }
  });
});

describe("llms-full.txt and about", () => {
  it("contains every post", () => {
    const full = llmsFullTxt();
    for (const post of getAllPosts()) expect(full).toContain(`# ${post.title}`);
  });

  it("renders the about page as markdown", () => {
    expect(aboutToMarkdown()).toMatch(/^# /);
  });
});
