import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags } from "@/data/blog";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latest = posts[0] ? new Date(posts[0].date) : new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/blog`, lastModified: latest, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/projects`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/reading`, changeFrequency: "daily", priority: 0.5 },
    { url: `${SITE_URL}/setup`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/about`, changeFrequency: "yearly", priority: 0.5 },
  ];

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const tagEntries: MetadataRoute.Sitemap = getAllTags().map((tag) => ({
    url: `${SITE_URL}/blog/tag/${tag.slug}`,
    changeFrequency: "weekly",
    priority: 0.4,
  }));

  return [...pages, ...postEntries, ...tagEntries];
}
