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

/** Hardcoded items (fallback / manually curated) */
const manualItems: ReadingItem[] = [
  {
    slug: "web4-birth-of-superintelligent-life",
    title: "Web 4.0: The Birth of Superintelligent Life",
    url: "http://web4.ai/",
    source: "Conway Research",
    author: "Sigil Wen",
    readDate: "2026-02-22",
    description:
      "A manifesto arguing that Web 4.0 is the era of autonomous AI agents that can earn, transact, and sustain themselves. Introduces Conway as infrastructure for AI to permissionlessly buy compute, deploy apps, and operate without human intervention.",
    tags: ["AI", "crypto", "infrastructure", "web"],
  },
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

interface LaterlistItem {
  title: string;
  url: string;
  category: string;
  tags: string[];
  doneAt: string;
  addedAt: string;
  notes: string | null;
  topics: string[];
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCharCode(parseInt(n, 16)));
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .slice(0, 60);
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "";
  }
}

function toLaterlistReadingItem(item: LaterlistItem): ReadingItem {
  return {
    slug: slugify(item.title),
    title: decodeHtmlEntities(item.title),
    url: item.url,
    source: extractDomain(item.url),
    readDate: item.doneAt.slice(0, 10),
    description: item.notes ?? "",
    tags: [...item.tags, ...item.topics],
  };
}

async function fetchLaterlistItems(): Promise<ReadingItem[]> {
  const url = process.env.LATERLIST_API_URL ?? "https://www.laterlist.cc";
  const apiKey = process.env.LATERLIST_API_KEY;
  if (!apiKey) return [];
  try {
    const res = await fetch(`${url}/api/public/reading-list`, {
      headers: { Authorization: `Bearer ${apiKey}` },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data: LaterlistItem[] = await res.json();
    return data.map(toLaterlistReadingItem);
  } catch {
    return [];
  }
}

export async function getAllReadingItems(): Promise<ReadingItem[]> {
  const laterlistItems = await fetchLaterlistItems();

  // Deduplicate by URL (laterlist takes precedence)
  const seenUrls = new Set(laterlistItems.map((i) => i.url));
  const manual = manualItems.filter((i) => !seenUrls.has(i.url));

  const all = [...laterlistItems, ...manual];
  return all.sort(
    (a, b) => new Date(b.readDate).getTime() - new Date(a.readDate).getTime(),
  );
}
