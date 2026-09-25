import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { projects, PROJECT_CATEGORIES } from "./projects";
import { getAllSlugs } from "./blog";

describe("projects data", () => {
  it("should export an array of projects", () => {
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
  });

  it("each project should have required fields", () => {
    projects.forEach((project) => {
      expect(project.slug).toBeDefined();
      expect(typeof project.slug).toBe("string");
      expect(project.slug.length).toBeGreaterThan(0);

      expect(project.title).toBeDefined();
      expect(typeof project.title).toBe("string");
      expect(project.title.length).toBeGreaterThan(0);

      expect(project.description).toBeDefined();
      expect(typeof project.description).toBe("string");

      expect(project.color).toBeDefined();
      expect(project.color).toMatch(/^#[0-9a-fA-F]{6}$/);

      expect(project.url).toBeDefined();
      expect(project.url).toMatch(/^https?:\/\//);
    });
  });

  it("each project should have unique slug", () => {
    const slugs = projects.map((p) => p.slug);
    const uniqueSlugs = new Set(slugs);
    expect(slugs.length).toBe(uniqueSlugs.size);
  });

  it("github field should be valid URL when present", () => {
    projects.forEach((project) => {
      if (project.github) {
        expect(project.github).toMatch(/^https:\/\/github\.com\//);
      }
    });
  });

  it("should have expected projects", () => {
    const slugs = projects.map((p) => p.slug);
    expect(slugs).toContain("pomo");
    expect(slugs).toContain("guideto");
    expect(slugs).toContain("baseline");
  });

  it("each project has a summary and a known category", () => {
    projects.forEach((project) => {
      expect(project.summary.length).toBeGreaterThan(40);
      expect(PROJECT_CATEGORIES).toContain(project.category);
    });
  });

  it("each live project has a screenshot in public/projects", () => {
    projects
      .filter((p) => p.active !== false)
      .forEach((project) => {
        const file = path.join(process.cwd(), "public/projects", `${project.slug}.webp`);
        expect(fs.existsSync(file), `${project.slug}.webp`).toBe(true);
      });
  });

  it("linked blog posts exist", () => {
    const slugs = getAllSlugs();
    projects.forEach((project) => {
      if (project.post) expect(slugs).toContain(project.post);
    });
  });
});
