import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { SERIES, type Series } from "@/data/series";
import { tagSlug } from "@/lib/tags";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
  /** Slug of a series in src/data/series.ts */
  series?: string;
  /** On the site with a label, but out of feeds and search until it's finished */
  wip: boolean;
}

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

function readPost(slug: string): BlogPost {
  const fileContent = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title,
    date: data.date,
    description: data.description,
    tags: data.tags ?? [],
    content,
    series: data.series,
    wip: data.wip === true,
  };
}

/** Every post, finished or not: for pages on the site */
export function getAllPosts(): BlogPost[] {
  // Sort by date, newest first
  return getAllSlugs()
    .map(readPost)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Finished posts only: for RSS, llms.txt, the sitemap and the home page */
export function getPublishedPosts(): BlogPost[] {
  return getAllPosts().filter((post) => !post.wip);
}

export function getPostBySlug(slug: string): BlogPost | null {
  if (!fs.existsSync(path.join(BLOG_DIR, `${slug}.md`))) {
    return null;
  }

  return readPost(slug);
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(".md", ""));
}

export function getReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function getAdjacentPosts(slug: string): {
  prev: BlogPost | null;
  next: BlogPost | null;
} {
  const posts = getAllPosts(); // sorted newest first
  const idx = posts.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? posts[idx - 1] : null,
    next: idx < posts.length - 1 ? posts[idx + 1] : null,
  };
}

export interface TagSummary {
  slug: string;
  /** Most common spelling of the tag across posts */
  label: string;
  count: number;
}

export function getAllTags(): TagSummary[] {
  const bySlug = new Map<string, { count: number; spellings: Map<string, number> }>();

  for (const post of getAllPosts()) {
    for (const tag of new Set(post.tags)) {
      const slug = tagSlug(tag);
      if (!slug) continue;
      const entry = bySlug.get(slug) ?? { count: 0, spellings: new Map() };
      entry.count++;
      entry.spellings.set(tag, (entry.spellings.get(tag) ?? 0) + 1);
      bySlug.set(slug, entry);
    }
  }

  return [...bySlug.entries()]
    .map(([slug, { count, spellings }]) => ({
      slug,
      label: [...spellings.entries()].sort((a, b) => b[1] - a[1])[0][0],
      count,
    }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

export function getPostsByTag(slug: string): BlogPost[] {
  return getAllPosts().filter((post) =>
    post.tags.some((tag) => tagSlug(tag) === slug),
  );
}

/** A series' posts in reading order, oldest first */
export function getPostsInSeries(slug: string): BlogPost[] {
  return getAllPosts()
    .filter((post) => post.series === slug)
    .sort(
      (a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime() ||
        a.slug.localeCompare(b.slug),
    );
}

export interface SeriesSummary extends Series {
  count: number;
  wipCount: number;
}

/** Series with at least one post */
export function getAllSeries(): SeriesSummary[] {
  return SERIES.map((series) => {
    const posts = getPostsInSeries(series.slug);
    return {
      ...series,
      count: posts.length,
      wipCount: posts.filter((post) => post.wip).length,
    };
  }).filter((series) => series.count > 0);
}
