import fs from "fs";
import path from "path";
import { Marked, Renderer, type Tokens } from "marked";
import { highlight } from "@/lib/highlight";

const defaultRenderer = new Renderer();

/** Diagrams are SVG files in public/diagrams, referenced as `![caption](diagram:name)` */
export const DIAGRAM_DIR = path.join(process.cwd(), "public/diagrams");
const DIAGRAM_PREFIX = "diagram:";

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function diagramName(href: string): string | null {
  if (!href.startsWith(DIAGRAM_PREFIX)) return null;
  const name = href.slice(DIAGRAM_PREFIX.length);
  // Names map to files; keep them to a safe charset
  if (!/^[a-z0-9-]+$/.test(name)) throw new Error(`Invalid diagram name: ${name}`);
  return name;
}

function renderDiagram(name: string, caption: string, mode: DiagramMode): string {
  const file = path.join(DIAGRAM_DIR, `${name}.svg`);
  if (!fs.existsSync(file)) throw new Error(`Diagram not found: public/diagrams/${name}.svg`);
  const figcaption = caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : "";
  const body =
    mode === "inline"
      ? // Inline so the SVG's CSS variables follow the page theme
        fs.readFileSync(file, "utf-8").replace(/<\?xml[^>]*>\s*/, "")
      : `<img src="/diagrams/${name}.svg" alt="${escapeHtml(caption)}" />`;
  // data-diagram lets the client add interactivity where a config exists (src/data/diagrams)
  return `<figure class="diagram" data-diagram="${name}">${body}${figcaption}</figure>`;
}

type DiagramMode = "inline" | "img";

export interface RenderOptions {
  /** "inline" themes with the page; "img" for feeds and other contexts without our CSS */
  diagrams?: DiagramMode;
}

/**
 * Render post markdown to HTML with Shiki-highlighted code blocks.
 * Code blocks are collected during the (sync) parse and highlighted after,
 * since Shiki is async. A fresh Marked instance keeps the global `marked`
 * untouched.
 */
export async function renderMarkdown(
  markdown: string,
  { diagrams = "inline" }: RenderOptions = {},
): Promise<string> {
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
      // A paragraph holding only a diagram becomes a <figure>, not <p><figure>
      paragraph(token) {
        const [only] = token.tokens;
        if (token.tokens.length === 1 && only.type === "image") {
          const name = diagramName((only as Tokens.Image).href);
          if (name) return renderDiagram(name, (only as Tokens.Image).text, diagrams);
        }
        return false;
      },
      image(token) {
        const name = diagramName(token.href);
        return name ? renderDiagram(name, token.text, diagrams) : false;
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
