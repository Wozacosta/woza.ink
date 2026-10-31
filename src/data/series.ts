export interface Series {
  /** Used in `series:` frontmatter and at /blog/series/<slug> */
  slug: string;
  title: string;
  description: string;
}

export const SERIES: Series[] = [
  {
    slug: "defi-trading",
    title: "DeFi & trading",
    description:
      "How on-chain markets actually work: the contracts, the mechanics, and who pays when they break.",
  },
  {
    slug: "ui-ux",
    title: "UI & UX",
    description:
      "What's known about how people use interfaces, how solid the evidence is, and what to do with it.",
  },
];

export function getSeries(slug: string): Series | null {
  return SERIES.find((series) => series.slug === slug) ?? null;
}
