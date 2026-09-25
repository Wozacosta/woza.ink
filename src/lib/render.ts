import { Marked } from "marked";
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
