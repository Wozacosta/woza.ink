import { describe, it, expect } from "vitest";
import { getAllPosts, getPostBySlug, getAllSlugs, type BlogPost } from "./blog";

describe("blog utilities", () => {
  describe("getAllPosts", () => {
    it("should return an array of posts", () => {
      const posts = getAllPosts();
      expect(Array.isArray(posts)).toBe(true);
    });

    it("each post should have required fields", () => {
      const posts = getAllPosts();
      posts.forEach((post) => {
        expect(post.slug).toBeDefined();
        expect(typeof post.slug).toBe("string");
        expect(post.slug.length).toBeGreaterThan(0);

        expect(post.title).toBeDefined();
        expect(typeof post.title).toBe("string");

        expect(post.date).toBeDefined();
        expect(typeof post.date).toBe("string");

        expect(post.description).toBeDefined();
        expect(typeof post.description).toBe("string");

        expect(post.tags).toBeDefined();
        expect(Array.isArray(post.tags)).toBe(true);

        expect(post.content).toBeDefined();
        expect(typeof post.content).toBe("string");
      });
    });

    it("should return posts sorted by date (newest first)", () => {
      const posts = getAllPosts();
      if (posts.length > 1) {
        for (let i = 0; i < posts.length - 1; i++) {
          const currentDate = new Date(posts[i].date).getTime();
          const nextDate = new Date(posts[i + 1].date).getTime();
          expect(currentDate).toBeGreaterThanOrEqual(nextDate);
        }
      }
    });

    it("each post should have unique slug", () => {
      const posts = getAllPosts();
      const slugs = posts.map((p) => p.slug);
      const uniqueSlugs = new Set(slugs);
      expect(slugs.length).toBe(uniqueSlugs.size);
    });
  });

  describe("getPostBySlug", () => {
    it("should return null for non-existent slug", () => {
      const post = getPostBySlug("this-post-definitely-does-not-exist-12345");
      expect(post).toBeNull();
    });

    it("should return a post when given a valid slug", () => {
      const posts = getAllPosts();
      if (posts.length > 0) {
        const firstPost = posts[0];
        const retrieved = getPostBySlug(firstPost.slug);

        expect(retrieved).not.toBeNull();
        expect(retrieved?.slug).toBe(firstPost.slug);
        expect(retrieved?.title).toBe(firstPost.title);
        expect(retrieved?.date).toBe(firstPost.date);
        expect(retrieved?.description).toBe(firstPost.description);
      }
    });

    it("should return post with all required fields", () => {
      const posts = getAllPosts();
      if (posts.length > 0) {
        const post = getPostBySlug(posts[0].slug);
        expect(post).not.toBeNull();
        expect(post?.slug).toBeDefined();
        expect(post?.title).toBeDefined();
        expect(post?.date).toBeDefined();
        expect(post?.description).toBeDefined();
        expect(post?.tags).toBeDefined();
        expect(post?.content).toBeDefined();
      }
    });
  });

  describe("getAllSlugs", () => {
    it("should return an array of strings", () => {
      const slugs = getAllSlugs();
      expect(Array.isArray(slugs)).toBe(true);
      slugs.forEach((slug) => {
        expect(typeof slug).toBe("string");
      });
    });

    it("slugs should not contain .md extension", () => {
      const slugs = getAllSlugs();
      slugs.forEach((slug) => {
        expect(slug).not.toMatch(/\.md$/);
      });
    });

    it("should match slugs from getAllPosts", () => {
      const slugs = getAllSlugs();
      const posts = getAllPosts();
      const postSlugs = posts.map((p) => p.slug);

      expect(slugs.sort()).toEqual(postSlugs.sort());
    });
  });

  describe("BlogPost type", () => {
    it("should have correct shape for blog posts", () => {
      const posts = getAllPosts();
      if (posts.length > 0) {
        const post: BlogPost = posts[0];
        // Type checking - these will fail compilation if types are wrong
        const _slug: string = post.slug;
        const _title: string = post.title;
        const _date: string = post.date;
        const _description: string = post.description;
        const _tags: string[] = post.tags;
        const _content: string = post.content;

        expect(true).toBe(true); // Type checking passed
      }
    });
  });
});
