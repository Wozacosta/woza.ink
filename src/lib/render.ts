import { Marked, Renderer } from "marked";

const defaultRenderer = new Renderer();
import { highlight } from "@/lib/highlight";

/**
 * Render post markdown to HTML with Shiki-highlighted code blocks.
 * Code blocks are collected during the (sync) parse and highlighted after,
 * since Shiki is async. A fresh Marked instance keeps the global `marked`
 * untouched.
 */
export async function renderMarkdown(markdown: string): Promise<string> {
  const codeBlocks: { lang: string; code: string }[] = [];
  const md = new Marked({
    renderer: {
      // Wide tables scroll in their own box instead of widening the page
      table(token) {
        return `<div class="table-wrap">${defaultRenderer.table.call(this, token)}</div>`;
      },
      code({ text, lang }) {
        codeBlocks.push({ lang: lang || "", code: text });
        return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
      },
    },
  });
  const parsed = await md.parse(markdown);
  const blocks = await Promise.all(
    codeBlocks.map((block) => highlight(block.code, block.lang)),
  );
  // Function replacer so `$&`, `$'` etc. in highlighted code are not treated as patterns
  return parsed.replace(/__CODE_BLOCK_(\d+)__/g, (_match, i) => blocks[Number(i)]);
}

/**
 * Posts open with `# Title`; pages and feeds already show the title, so drop
 * that first h1 to avoid a duplicate heading.
 */
export function stripLeadingH1(html: string): string {
  return html.replace(/^\s*<h1>[\s\S]*?<\/h1>\s*/, "");
}
