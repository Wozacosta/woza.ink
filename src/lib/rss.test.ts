import { describe, it, expect } from "vitest";
import { generateRssFeed } from "./rss";

describe("RSS feed generation", () => {
  describe("generateRssFeed", () => {
    it("should return a valid XML string", () => {
      const feed = generateRssFeed();
      expect(feed).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(feed).toContain("<rss");
      expect(feed).toContain("</rss>");
    });

    it("should include RSS 2.0 version attribute", () => {
      const feed = generateRssFeed();
      expect(feed).toContain('version="2.0"');
    });

    it("should include Atom namespace for self-reference", () => {
      const feed = generateRssFeed();
      expect(feed).toContain('xmlns:atom="http://www.w3.org/2005/Atom"');
    });

    it("should include channel metadata", () => {
      const feed = generateRssFeed();
      expect(feed).toContain("<title>woza.ink</title>");
      expect(feed).toContain("<link>https://woza.ink</link>");
      expect(feed).toContain("<description>");
      expect(feed).toContain("<language>en-us</language>");
    });

    it("should include lastBuildDate", () => {
      const feed = generateRssFeed();
      expect(feed).toContain("<lastBuildDate>");
      expect(feed).toContain("</lastBuildDate>");
    });

    it("should include atom:link self-reference", () => {
      const feed = generateRssFeed();
      expect(feed).toContain('href="https://woza.ink/feed.xml"');
      expect(feed).toContain('rel="self"');
      expect(feed).toContain('type="application/rss+xml"');
    });

    it("should include blog post items", () => {
      const feed = generateRssFeed();
      expect(feed).toContain("<item>");
      expect(feed).toContain("</item>");
    });

    it("each item should have required elements", () => {
      const feed = generateRssFeed();
      // Check that items have the required RSS elements
      expect(feed).toMatch(/<item>[\s\S]*<title>[\s\S]*<\/title>[\s\S]*<\/item>/);
      expect(feed).toMatch(/<item>[\s\S]*<link>[\s\S]*<\/link>[\s\S]*<\/item>/);
      expect(feed).toMatch(/<item>[\s\S]*<guid[\s\S]*>[\s\S]*<\/guid>[\s\S]*<\/item>/);
      expect(feed).toMatch(/<item>[\s\S]*<description>[\s\S]*<\/description>[\s\S]*<\/item>/);
      expect(feed).toMatch(/<item>[\s\S]*<pubDate>[\s\S]*<\/pubDate>[\s\S]*<\/item>/);
    });

    it("should have valid blog post URLs", () => {
      const feed = generateRssFeed();
      expect(feed).toMatch(/<link>https:\/\/woza\.ink\/blog\/[\w-]+<\/link>/);
    });

    it("should have guid with isPermaLink attribute", () => {
      const feed = generateRssFeed();
      expect(feed).toContain('isPermaLink="true"');
    });

    it("should produce well-formed XML without unescaped special characters", () => {
      const feed = generateRssFeed();
      // Should not have unescaped ampersands (except in entity references)
      const unescapedAmpersand = /&(?!(amp|lt|gt|quot|apos);)/;
      expect(feed).not.toMatch(unescapedAmpersand);
    });

    it("should limit items to a reasonable number", () => {
      const feed = generateRssFeed();
      const itemCount = (feed.match(/<item>/g) || []).length;
      expect(itemCount).toBeLessThanOrEqual(20);
    });
  });
});
