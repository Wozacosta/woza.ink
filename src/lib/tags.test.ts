import { describe, it, expect } from "vitest";
import { tagSlug, tagHref } from "./tags";
import { getAllPosts, getAllTags, getPostsByTag } from "@/data/blog";

describe("tagSlug", () => {
  it("is case-insensitive and URL-safe", () => {
    expect(tagSlug("AI")).toBe("ai");
    expect(tagSlug("open-source")).toBe("open-source");
    expect(tagSlug(" Local First ")).toBe("local-first");
    expect(tagSlug("C++")).toBe("c");
  });

  it("builds tag page hrefs", () => {
    expect(tagHref("AI")).toBe("/blog/tag/ai");
  });
});

describe("getAllTags", () => {
  const tags = getAllTags();

  it("merges tags that differ only by case", () => {
    const slugs = tags.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("counts match the posts returned for each tag", () => {
    for (const tag of tags) {
      expect(getPostsByTag(tag.slug)).toHaveLength(tag.count);
    }
  });

  it("covers every tag used by a post", () => {
    const slugs = new Set(tags.map((t) => t.slug));
    for (const post of getAllPosts()) {
      for (const tag of post.tags) expect(slugs.has(tagSlug(tag))).toBe(true);
    }
  });

  it("is sorted by post count, most used first", () => {
    const counts = tags.map((t) => t.count);
    expect(counts).toEqual([...counts].sort((a, b) => b - a));
  });
});

describe("getPostsByTag", () => {
  it("returns nothing for an unknown tag", () => {
    expect(getPostsByTag("definitely-not-a-tag")).toEqual([]);
  });
});
