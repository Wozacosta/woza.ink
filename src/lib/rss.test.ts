// @vitest-environment node
import { describe, it, expect, beforeAll } from "vitest";
import { generateRssFeed } from "./rss";

let feed: string;
beforeAll(async () => {
  feed = await generateRssFeed();
}, 60_000);

describe("RSS feed generation", () => {
  describe("generateRssFeed", () => {
    it("should return a valid XML string", () => {
      expect(feed).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(feed).toContain("<rss");
      expect(feed).toContain("</rss>");
    });

    it("should include RSS 2.0 version attribute", () => {
      expect(feed).toContain('version="2.0"');
    });

    it("should include Atom namespace for self-reference", () => {
      expect(feed).toContain('xmlns:atom="http://www.w3.org/2005/Atom"');
    });

    it("should include channel metadata", () => {
      expect(feed).toContain("<title>woza.ink</title>");
      expect(feed).toContain("<link>https://www.woza.ink</link>");
      expect(feed).toContain("<description>");
      expect(feed).toContain("<language>en-us</language>");
    });

    it("should include lastBuildDate", () => {
      expect(feed).toContain("<lastBuildDate>");
      expect(feed).toContain("</lastBuildDate>");
    });

    it("should include atom:link self-reference", () => {
      expect(feed).toContain('href="https://www.woza.ink/feed.xml"');
      expect(feed).toContain('rel="self"');
      expect(feed).toContain('type="application/rss+xml"');
    });

    it("should include blog post items", () => {
      expect(feed).toContain("<item>");
      expect(feed).toContain("</item>");
    });

    it("each item should have required elements", () => {
      // Check that items have the required RSS elements
      expect(feed).toMatch(/<item>[\s\S]*<title>[\s\S]*<\/title>[\s\S]*<\/item>/);
      expect(feed).toMatch(/<item>[\s\S]*<link>[\s\S]*<\/link>[\s\S]*<\/item>/);
      expect(feed).toMatch(/<item>[\s\S]*<guid[\s\S]*>[\s\S]*<\/guid>[\s\S]*<\/item>/);
      expect(feed).toMatch(/<item>[\s\S]*<description>[\s\S]*<\/description>[\s\S]*<\/item>/);
      expect(feed).toMatch(/<item>[\s\S]*<pubDate>[\s\S]*<\/pubDate>[\s\S]*<\/item>/);
    });

    it("should have valid blog post URLs", () => {
      expect(feed).toMatch(/<link>https:\/\/www\.woza\.ink\/blog\/[\w-]+<\/link>/);
    });

    it("should have guid with isPermaLink attribute", () => {
      expect(feed).toContain('isPermaLink="true"');
    });

    it("should produce well-formed XML without unescaped special characters", () => {
      // Should not have unescaped ampersands (except in entity references)
      const unescapedAmpersand = /&(?!(amp|lt|gt|quot|apos);)/;
      const outsideCdata = feed.replace(/<!\[CDATA\[[\s\S]*?\]\]>/g, "");
      expect(outsideCdata).not.toMatch(unescapedAmpersand);
    });

    it("should limit items to a reasonable number", () => {
      const itemCount = (feed.match(/<item>/g) || []).length;
      expect(itemCount).toBeLessThanOrEqual(20);
    });

    it("should declare the content namespace", () => {
      expect(feed).toContain('xmlns:content="http://purl.org/rss/1.0/modules/content/"');
    });

    it("should include full post HTML in content:encoded", () => {
      const items = feed.match(/<item>[\s\S]*?<\/item>/g) ?? [];
      expect(items.length).toBeGreaterThan(0);
      for (const item of items) {
        expect(item).toMatch(/<content:encoded><!\[CDATA\[[\s\S]*<p>[\s\S]*\]\]><\/content:encoded>/);
      }
    });

    it("should not repeat the post title as an h1 in content", () => {
      expect(feed).not.toMatch(/<content:encoded><!\[CDATA\[\s*<h1>/);
    });

    it("should make site-relative links absolute", () => {
      const contents = (feed.match(/<content:encoded>[\s\S]*?<\/content:encoded>/g) ?? []).join("");
      expect(contents).not.toMatch(/(href|src)="\/(?!\/)/);
      expect(contents).toContain('href="https://www.woza.ink/blog/');
    });

    it("should include tags as categories", () => {
      expect(feed).toMatch(/<category>[^<]+<\/category>/);
    });
  });
});
