import { describe, it, expect } from "vitest";
import { readingItems, getAllReadingItems, type ReadingItem } from "./reading";

describe("reading data", () => {
  it("should export an array of reading items", () => {
    expect(Array.isArray(readingItems)).toBe(true);
    expect(readingItems.length).toBeGreaterThan(0);
  });

  it("each reading item should have required fields", () => {
    readingItems.forEach((item) => {
      expect(item.slug).toBeDefined();
      expect(typeof item.slug).toBe("string");
      expect(item.slug.length).toBeGreaterThan(0);

      expect(item.title).toBeDefined();
      expect(typeof item.title).toBe("string");
      expect(item.title.length).toBeGreaterThan(0);

      expect(item.url).toBeDefined();
      expect(item.url).toMatch(/^https?:\/\//);

      expect(item.source).toBeDefined();
      expect(typeof item.source).toBe("string");

      expect(item.readDate).toBeDefined();
      expect(item.readDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);

      expect(item.description).toBeDefined();
      expect(typeof item.description).toBe("string");

      expect(Array.isArray(item.tags)).toBe(true);
      expect(item.tags.length).toBeGreaterThan(0);
    });
  });

  it("each reading item should have unique slug", () => {
    const slugs = readingItems.map((item) => item.slug);
    const uniqueSlugs = new Set(slugs);
    expect(slugs.length).toBe(uniqueSlugs.size);
  });

  it("optional date field should be valid format when present", () => {
    readingItems.forEach((item) => {
      if (item.date) {
        expect(item.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    });
  });

  it("optional author field should be string when present", () => {
    readingItems.forEach((item) => {
      if (item.author) {
        expect(typeof item.author).toBe("string");
        expect(item.author.length).toBeGreaterThan(0);
      }
    });
  });
});

describe("getAllReadingItems", () => {
  it("should return all reading items", () => {
    const items = getAllReadingItems();
    expect(items.length).toBe(readingItems.length);
  });

  it("should return items sorted by readDate descending", () => {
    const items = getAllReadingItems();
    for (let i = 1; i < items.length; i++) {
      const prevDate = new Date(items[i - 1].readDate).getTime();
      const currDate = new Date(items[i].readDate).getTime();
      expect(prevDate).toBeGreaterThanOrEqual(currDate);
    }
  });

  it("should not mutate the original array", () => {
    const originalLength = readingItems.length;
    const items = getAllReadingItems();
    items.pop();
    expect(readingItems.length).toBe(originalLength);
  });
});
