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
