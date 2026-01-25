import { getAllPosts, BlogPost } from "@/data/blog";

const SITE_URL = "https://woza.ink";
const SITE_TITLE = "woza.ink";
const SITE_DESCRIPTION =
  "A collection of creative experiments and interactive experiences";
const FEED_ITEM_LIMIT = 20;

function escapeXml(text: string): string {
  if (!text) return "";
  // Only escape characters that are not already part of XML entities
  return text
    .replace(/&(?!(amp|lt|gt|quot|apos);)/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatRFC822Date(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return new Date().toUTCString();
  }
  return date.toUTCString();
}

function generateItemXml(post: BlogPost): string {
  const postUrl = `${SITE_URL}/blog/${post.slug}`;

  return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${formatRFC822Date(post.date)}</pubDate>
    </item>`;
}

export function generateRssFeed(): string {
  const allPosts = getAllPosts();
  const posts = allPosts.slice(0, FEED_ITEM_LIMIT);
  const lastBuildDate =
    posts.length > 0
      ? formatRFC822Date(posts[0].date)
      : formatRFC822Date(new Date().toISOString());

  const items = posts.map(generateItemXml).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/icon.png</url>
      <title>${escapeXml(SITE_TITLE)}</title>
      <link>${SITE_URL}</link>
      <width>64</width>
      <height>64</height>
      <description>woza.ink logo</description>
    </image>
${items}
  </channel>
</rss>`;
}
