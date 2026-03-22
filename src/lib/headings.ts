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

/** Extract h2/h3 headings from raw markdown */
export function extractHeadings(markdown: string): Heading[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const raw = match[2]
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/\*(.+?)\*/g, "$1")
      .replace(/`(.+?)`/g, "$1")
      .replace(/\[(.+?)\]\(.+?\)/g, "$1")
      .trim();
    headings.push({ id: slugify(raw), text: raw, level });
  }

  return headings;
}

/** Post-process rendered HTML to add IDs to heading elements */
export function addHeadingIds(html: string): string {
  return html.replace(
    /<h([1-6])>([\s\S]*?)<\/h[1-6]>/g,
    (_match, level, inner) => {
      const plain = inner.replace(/<[^>]*>/g, "");
      const id = slugify(plain);
      return `<h${level} id="${id}">${inner}</h${level}>`;
    },
  );
}
