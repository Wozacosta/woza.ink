/**
 * Posts are mostly written by AI. A blockquote that opens with `[!take]` (Obsidian's callout
 * syntax) holds Samy's own words, and renders as a labelled box:
 *
 *   > [!take]
 *   > What I actually think.
 */
export const TAKE_MARKER = /^\[!take\]/i;

const TAKE_LINE = /^>[ \t]*\[!take\]/gim;
const FENCED_CODE = /^(```|~~~)[\s\S]*?^\1/gm;

export function countTakes(markdown: string): number {
  return markdown.replace(FENCED_CODE, "").match(TAKE_LINE)?.length ?? 0;
}

export function takesLabel(count: number): string {
  return `${count} ${count === 1 ? "take" : "takes"}`;
}
