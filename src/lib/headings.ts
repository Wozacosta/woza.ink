import { decodeEntities } from "./html";

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/&[^;]+;/g, "") // strip HTML entities like &#39;
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/**
 * Add unique IDs to rendered heading elements and collect h2/h3 for the TOC.
 * Working from the HTML (not the markdown) means `#` lines inside code
 * blocks are ignored and TOC ids always match the rendered ids.
 */
export function addHeadingIds(html: string): {
  html: string;
  headings: Heading[];
} {
  const seen = new Map<string, number>();
  const headings: Heading[] = [];

  const withIds = html.replace(
    /<h([1-6])>([\s\S]*?)<\/h\1>/g,
    (_match, level: string, inner: string) => {
      const text = decodeEntities(inner.replace(/<[^>]*>/g, "")).trim();
      const base = slugify(text) || "section";
      const count = seen.get(base) ?? 0;
      seen.set(base, count + 1);
      const id = count === 0 ? base : `${base}-${count}`;
      if (level === "2" || level === "3") {
        headings.push({ id, text, level: Number(level) });
      }
      return `<h${level} id="${id}">${inner}</h${level}>`;
    },
  );

  return { html: withIds, headings };
}
