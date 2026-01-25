export interface ReadingItem {
  slug: string;
  title: string;
  url: string;
  source: string;
  author?: string;
  date?: string;
  readDate: string;
  description: string;
  tags: string[];
}

export const readingItems: ReadingItem[] = [
  {
    slug: "local-first-software",
    title: "Local-first software: You own your data, in spite of the cloud",
    url: "https://www.inkandswitch.com/local-first/",
    source: "Ink & Switch",
    author: "Martin Kleppmann et al.",
    date: "2019-04-01",
    readDate: "2026-01-20",
    description:
      "A manifesto for software that prioritizes local data storage while still enabling collaboration. Explores CRDTs and the tension between cloud convenience and data ownership.",
    tags: ["software architecture", "CRDTs", "data ownership"],
  },
  {
    slug: "against-the-dark-pattern",
    title: "Against the dark pattern",
    url: "https://www.robinrendle.com/notes/against-the-dark-pattern/",
    source: "Robin Rendle",
    author: "Robin Rendle",
    date: "2024-03-15",
    readDate: "2026-01-18",
    description:
      "A critique of manipulative design practices in modern software and why we should resist them.",
    tags: ["design", "ethics", "ux"],
  },
  {
    slug: "the-art-of-finishing",
    title: "The Art of Finishing",
    url: "https://www.scattered-thoughts.net/writing/the-art-of-finishing/",
    source: "Scattered Thoughts",
    author: "Jamie Brandon",
    readDate: "2026-01-15",
    description:
      "On the difficulty of completing projects and strategies for getting things across the finish line.",
    tags: ["productivity", "projects"],
  },
  {
    slug: "blog-post-search-query",
    title: "A blog post is a very long and complex search query",
    url: "https://www.henrikkarlsson.xyz/p/search-query",
    source: "Escaping Flatland",
    author: "Henrik Karlsson",
    date: "2022-11-15",
    readDate: "2026-01-10",
    description:
      "Writing as a way to attract people who share your interests and find collaborators in the vast expanse of the internet.",
    tags: ["writing", "blogging", "internet"],
  },
  {
    slug: "choose-boring-technology",
    title: "Choose Boring Technology",
    url: "https://mcfunley.com/choose-boring-technology",
    source: "mcfunley.com",
    author: "Dan McKinley",
    date: "2015-03-30",
    readDate: "2026-01-05",
    description:
      "The case for using well-established, boring technologies instead of chasing the new and shiny. Innovation tokens are limited.",
    tags: ["software architecture", "engineering culture"],
  },
];

export function getAllReadingItems(): ReadingItem[] {
  return [...readingItems].sort(
    (a, b) => new Date(b.readDate).getTime() - new Date(a.readDate).getTime(),
  );
}
