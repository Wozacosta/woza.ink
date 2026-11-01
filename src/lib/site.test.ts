// @vitest-environment node
import fs from "fs";
import path from "path";
import { describe, it, expect } from "vitest";
import { getAllPosts, getPublishedPosts } from "@/data/blog";
import { SITE_URL, STANDARD_SITE_PUBLICATION } from "./site";

describe("Standard.site", () => {
  it("names the same publication everywhere", () => {
    const wellKnown = fs.readFileSync(
      path.join(process.cwd(), "public/.well-known/site.standard.publication"),
      "utf-8",
    );
    const sequoia = JSON.parse(fs.readFileSync(path.join(process.cwd(), "sequoia.json"), "utf-8"));

    expect(wellKnown).toBe(STANDARD_SITE_PUBLICATION);
    expect(sequoia.publicationUri).toBe(STANDARD_SITE_PUBLICATION);
    expect(sequoia.siteUrl).toBe(SITE_URL);
  });

  it("has a record for every published post and none for work in progress", () => {
    const published = new Set(getPublishedPosts().map((post) => post.slug));

    for (const post of getAllPosts()) {
      expect(Boolean(post.atUri), post.slug).toBe(published.has(post.slug));
    }
  });
});
