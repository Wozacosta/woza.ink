import { getAllPosts, BlogPost } from "@/data/blog";
import { renderMarkdown } from "@/lib/render";
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION } from "@/lib/site";

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

/** Wrap HTML in CDATA, splitting any `]]>` so it can't end the section early */
function cdata(html: string): string {
  return `<![CDATA[${html.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
}

function formatRFC822Date(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return new Date().toUTCString();
  }
  return date.toUTCString();
}

/** Post HTML suitable for feed readers: absolute links, no duplicate title */
export async function renderFeedContent(post: BlogPost): Promise<string> {
  const html = await renderMarkdown(post.content);
  return html
    .replace(/^\s*<h1>[\s\S]*?<\/h1>\s*/, "") // readers already show the title
    .replace(/(href|src)="\/(?!\/)/g, `$1="${SITE_URL}/`);
}

async function generateItemXml(post: BlogPost): Promise<string> {
  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const content = await renderFeedContent(post);
  const categories = post.tags
    .map((tag) => `      <category>${escapeXml(tag)}</category>`)
    .join("\n");

  return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${escapeXml(post.description)}</description>
      <content:encoded>${cdata(content)}</content:encoded>
${categories}
      <pubDate>${formatRFC822Date(post.date)}</pubDate>
    </item>`;
}

export async function generateRssFeed(): Promise<string> {
  const allPosts = getAllPosts();
  const posts = allPosts.slice(0, FEED_ITEM_LIMIT);
  const lastBuildDate =
    posts.length > 0
      ? formatRFC822Date(posts[0].date)
      : formatRFC822Date(new Date().toISOString());

  const items = (await Promise.all(posts.map(generateItemXml))).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
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
