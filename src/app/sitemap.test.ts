import { describe, it, expect } from "vitest";
import { getAllPosts, getAllSeries, getPublishedPosts } from "@/data/blog";
import { SITE_URL } from "@/lib/site";
import sitemap from "./sitemap";

describe("sitemap", () => {
  const urls = sitemap().map((entry) => entry.url);

  it("lists every finished post", () => {
    for (const post of getPublishedPosts()) expect(urls).toContain(`${SITE_URL}/blog/${post.slug}`);
  });

  it("leaves out work in progress", () => {
    for (const post of getAllPosts().filter((p) => p.wip)) {
      expect(urls).not.toContain(`${SITE_URL}/blog/${post.slug}`);
    }
  });

  it("lists every series", () => {
    for (const series of getAllSeries()) {
      expect(urls).toContain(`${SITE_URL}/blog/series/${series.slug}`);
    }
  });
});
