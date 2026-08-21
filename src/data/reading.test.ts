import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { manualItems, getAllReadingItems } from "./reading";

describe("reading data", () => {
  it("should export an array of reading items", () => {
    expect(Array.isArray(manualItems)).toBe(true);
    expect(manualItems.length).toBeGreaterThan(0);
  });

  it("each reading item should have required fields", () => {
    manualItems.forEach((item) => {
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
    const slugs = manualItems.map((item) => item.slug);
    const uniqueSlugs = new Set(slugs);
    expect(slugs.length).toBe(uniqueSlugs.size);
  });

  it("optional date field should be valid format when present", () => {
    manualItems.forEach((item) => {
      if (item.date) {
        expect(item.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    });
  });

  it("optional author field should be string when present", () => {
    manualItems.forEach((item) => {
      if (item.author) {
        expect(typeof item.author).toBe("string");
        expect(item.author.length).toBeGreaterThan(0);
      }
    });
  });
});

describe("getAllReadingItems", () => {
  // Without an API key the laterlist fetch short-circuits to [], so these tests
  // exercise the manual items only and never touch the network.
  beforeEach(() => {
    vi.stubEnv("LATERLIST_API_KEY", "");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("should return all reading items", async () => {
    const items = await getAllReadingItems();
    expect(items.length).toBe(manualItems.length);
  });

  it("should return items sorted by readDate descending", async () => {
    const items = await getAllReadingItems();
    for (let i = 1; i < items.length; i++) {
      const prevDate = new Date(items[i - 1].readDate).getTime();
      const currDate = new Date(items[i].readDate).getTime();
      expect(prevDate).toBeGreaterThanOrEqual(currDate);
    }
  });

  it("should not mutate the original array", async () => {
    const originalLength = manualItems.length;
    const items = await getAllReadingItems();
    items.pop();
    expect(manualItems.length).toBe(originalLength);
  });
});
