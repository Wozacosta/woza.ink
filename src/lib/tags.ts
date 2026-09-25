/** URL-safe, case-insensitive slug for a tag ("AI" and "ai" share one page) */
export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^\w-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function tagHref(tag: string): string {
  return `/blog/tag/${tagSlug(tag)}`;
}
