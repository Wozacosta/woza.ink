export interface Sidenote {
  /** Unique phrase from the article text — the sidenote anchors here */
  marker: string;
  /** Note type */
  type: "quote" | "source" | "context" | "counter" | "note";
  /** The note content (markdown allowed) */
  content: string;
  /** Attribution for quotes */
  attribution?: string;
  /** URL for sources */
  url?: string;
}

export interface ArticleSidenotes {
  slug: string;
  notes: Sidenote[];
}

/** A sidenote with its markdown content rendered to inline HTML */
export interface RenderedSidenote extends Sidenote {
  html: string;
}
