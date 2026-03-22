import type { Sidenote } from "@/data/sidenotes/types";

/**
 * Inject superscript markers into rendered article HTML.
 * For each sidenote, finds the marker phrase and appends a small
 * superscript number right after it.
 */
export function injectSidenoteMarkers(
  html: string,
  notes: Sidenote[],
): string {
  let result = html;

  notes.forEach((note, index) => {
    const pos = result.indexOf(note.marker);
    if (pos === -1) return;

    const end = pos + note.marker.length;
    const sup = `<sup class="sn-ref" data-sn="${index}">${index + 1}</sup>`;
    result = result.slice(0, end) + sup + result.slice(end);
  });

  return result;
}
