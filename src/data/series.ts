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
  {
    slug: "agentic-coding",
    title: "Agentic coding",
    description:
      "Working with coding agents day to day: how to configure them, what they remember, and how to run several at once.",
  },
  {
    slug: "agent-payments",
    title: "Agent payments",
    description:
      "How software pays for things on its own: the protocols, who's behind them, and how agents come to trust each other.",
  },
  {
    slug: "wallets-keys",
    title: "Wallets & keys",
    description:
      "What actually protects your crypto: where keys come from, who can sign, what you're signing, and what your wallet leaks.",
  },
  {
    slug: "open-protocols",
    title: "Open protocols",
    description:
      "Networks nobody owns: how they work, what they cost you, and where they've ended up centralized anyway.",
  },
];

export function getSeries(slug: string): Series | null {
  return SERIES.find((series) => series.slug === slug) ?? null;
}
