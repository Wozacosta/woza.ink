/**
 * Plain-text / markdown views of the site for LLMs and agents:
 * /llms.txt (index, llmstxt.org format), /llms-full.txt (all posts),
 * /blog/<slug>.md and /about.md.
 */
import { getAllPosts, type BlogPost } from "@/data/blog";
import { getAboutContent } from "@/data/about";
import { projects } from "@/data/projects";
import { getSidenotes } from "@/data/sidenotes";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/site";

/** Posts start with `# Title`; drop it since we write our own header */
function stripLeadingHeading(markdown: string): string {
  return markdown.replace(/^\s*#\s+[^\n]*\n+/, "");
}

/** Make site-relative markdown links absolute so they work out of context */
function absolutizeLinks(markdown: string): string {
  return markdown.replace(/\]\(\/(?!\/)/g, `](${SITE_URL}/`);
}

export function postToMarkdown(post: BlogPost): string {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const lines = [
    `# ${post.title}`,
    "",
    `> ${post.description}`,
    "",
    `- Published: ${post.date}`,
    `- Tags: ${post.tags.join(", ")}`,
    `- URL: ${url}`,
    "",
    absolutizeLinks(stripLeadingHeading(post.content)).trim(),
  ];

  const sidenotes = getSidenotes(post.slug);
  if (sidenotes?.notes.length) {
    lines.push("", "## Notes", "");
    sidenotes.notes.forEach((note, i) => {
      const source = [note.attribution && `— ${note.attribution}`, note.url && `(${note.url})`]
        .filter(Boolean)
        .join(" ");
      lines.push(
        `${i + 1}. **${note.type}** on "${note.marker.replace(/[*`]/g, "")}": ${note.content}${source ? ` ${source}` : ""}`,
      );
    });
  }

  return lines.join("\n") + "\n";
}

export function aboutToMarkdown(): string {
  const about = getAboutContent();
  if (!about) return `# About\n\nNothing here yet.\n`;
  return absolutizeLinks(about.content).trim() + "\n";
}

export function llmsTxt(): string {
  const posts = getAllPosts();
  const live = projects.filter((p) => p.active !== false);

  return [
    `# ${SITE_TITLE}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "Every blog post is available as markdown by appending `.md` to its URL, or by requesting its normal URL with `Accept: text/markdown`. All posts in one file: " +
      `${SITE_URL}/llms-full.txt`,
    "",
    "## Blog",
    "",
    ...posts.map(
      (p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}.md): ${p.description} (${p.date})`,
    ),
    "",
    "## Projects",
    "",
    ...live.map((p) => `- [${p.title}](${p.url}): ${p.description}. ${p.summary}`),
    "",
    "## Pages",
    "",
    `- [About](${SITE_URL}/about.md): Who runs this site and why`,
    `- [Projects](${SITE_URL}/projects): Everything above, with screenshots`,
    `- [Reading](${SITE_URL}/reading): Articles and essays worth keeping`,
    `- [Setup](${SITE_URL}/setup): Tools and the reasoning behind them`,
    "",
    "## Optional",
    "",
    `- [All posts, full text](${SITE_URL}/llms-full.txt)`,
    `- [RSS feed](${SITE_URL}/feed.xml): Full-content RSS 2.0`,
    `- [Sitemap](${SITE_URL}/sitemap.xml)`,
    "",
  ].join("\n");
}

export function llmsFullTxt(): string {
  const header = [`# ${SITE_TITLE}`, "", `> ${SITE_DESCRIPTION}`, ""].join("\n");
  const posts = getAllPosts().map(postToMarkdown);
  return [header, ...posts].join("\n---\n\n");
}
