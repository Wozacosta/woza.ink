import type { Sidenote } from "@/data/sidenotes/types";
import { decodeEntities } from "./html";

const INLINE_CLOSING_TAG = /^<\/(strong|em|b|i|code|a|del|s|mark)>/;

/** Strip inline markdown and normalize whitespace so a marker matches rendered text */
export function markerText(marker: string): string {
  return marker
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Visible text of an HTML string (tags skipped, entities decoded, whitespace
 * collapsed), plus a map from each text index to the HTML offset just after it.
 */
function textIndex(html: string): { text: string; ends: number[] } {
  let text = "";
  const ends: number[] = [];
  let i = 0;

  const push = (chars: string, end: number) => {
    for (const ch of chars) {
      const c = /\s/.test(ch) ? " " : ch;
      if (c === " " && text.endsWith(" ")) continue;
      text += c;
      for (let k = 0; k < c.length; k++) ends.push(end);
    }
  };

  while (i < html.length) {
    if (html[i] === "<") {
      const close = html.indexOf(">", i);
      i = close === -1 ? html.length : close + 1;
      continue;
    }
    if (html[i] === "&") {
      const entity = /^&(#x[0-9a-f]+|#\d+|[a-z]+);/i.exec(html.slice(i, i + 12));
      if (entity) {
        push(decodeEntities(entity[0]), i + entity[0].length);
        i += entity[0].length;
        continue;
      }
    }
    push(html[i], i + 1);
    i++;
  }

  return { text, ends };
}

/**
 * HTML offset where the superscript for `marker` should go, or -1 if the
 * marker's text doesn't appear in the rendered article.
 */
export function locateMarker(html: string, marker: string): number {
  const { text, ends } = textIndex(html);
  const needle = markerText(marker);
  const idx = needle ? text.indexOf(needle) : -1;
  if (idx === -1) return -1;

  let pos = ends[idx + needle.length - 1];

  // Step out of inline formatting that closes right after the marker
  let m: RegExpExecArray | null;
  while ((m = INLINE_CLOSING_TAG.exec(html.slice(pos)))) pos += m[0].length;

  // Never nest the marker link inside an existing link
  const before = html.slice(0, pos);
  const opens = (before.match(/<a[\s>]/g) ?? []).length;
  const closes = (before.match(/<\/a>/g) ?? []).length;
  if (opens > closes) {
    const close = html.indexOf("</a>", pos);
    if (close !== -1) pos = close + "</a>".length;
  }

  return pos;
}

/**
 * Inject superscript markers into rendered article HTML.
 * Each marker phrase is matched against the article's visible text, so
 * markdown syntax and HTML entities in the source don't prevent a match.
 */
export function injectSidenoteMarkers(
  html: string,
  notes: Sidenote[],
): string {
  const inserts = notes
    .map((note, index) => ({ index, pos: locateMarker(html, note.marker) }))
    .filter(({ pos }) => pos !== -1)
    // Insert back-to-front so earlier offsets stay valid
    .sort((a, b) => b.pos - a.pos || b.index - a.index);

  let result = html;
  for (const { index, pos } of inserts) {
    const n = index + 1;
    const sup = `<sup class="sn-ref" data-sn="${index}"><a href="#sn-${n}" aria-label="Note ${n}">${n}</a></sup>`;
    result = result.slice(0, pos) + sup + result.slice(pos);
  }

  return result;
}
