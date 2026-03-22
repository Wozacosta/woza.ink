export interface Sidenote {
  /** Heading ID this note is anchored to */
  heading: string;
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
