export type SetupItemType = "article" | "video" | "post";

export interface SetupItemBase {
  type: SetupItemType;
  note?: string; // your personal annotation (1-3 sentences)
}

export interface SetupArticleItem extends SetupItemBase {
  type: "article";
  title: string;
  url: string;
  source?: string; // publication or site name
  author?: string;
}

export interface SetupVideoItem extends SetupItemBase {
  type: "video";
  title: string;
  url: string;
  channel?: string;
}

export interface SetupPostItem extends SetupItemBase {
  type: "post";
  slug: string; // references a blog post in src/content/blog/
}

export type SetupItem = SetupArticleItem | SetupVideoItem | SetupPostItem;

export interface SetupCategory {
  id: string;       // used as anchor: #keyboard
  title: string;
  description?: string;
  items: SetupItem[];
}

export const setupCategories: SetupCategory[] = [
  {
    id: "keyboard",
    title: "Keyboard",
    description: "The one peripheral I care most about.",
    items: [
      {
        type: "article",
        title: "A Modern Space Cadet",
        url: "https://stevelosh.com/blog/2012/10/a-modern-space-cadet/",
        source: "stevelosh.com",
        author: "Steve Losh",
        note:
          "The article that got me into custom key remapping. The idea of turning Caps Lock into a hyper key changed how I think about keyboards entirely.",
      },
      {
        type: "video",
        title: "Why I Love My Mechanical Keyboard",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        channel: "Example Channel",
        note: "Replace this with a video you actually like.",
      },
    ],
  },
  {
    id: "browser",
    title: "Browser",
    description: "Where I spend most of my working hours.",
    items: [
      {
        type: "article",
        title: "The Browser as a Tool of Thought",
        url: "https://browsercompany.substack.com/p/the-browser-company-of-new-york",
        source: "The Browser Company",
        note:
          "The manifesto that made me think differently about what a browser could be — not just a tab manager, but an extension of how you think.",
      },
      {
        type: "article",
        title: "Taming the Complexity of the Modern Web",
        url: "https://www.robinrendle.com/notes/taming-the-complexity-of-the-modern-web/",
        source: "robinrendle.com",
        author: "Robin Rendle",
        note:
          "Short and sharp. The web got complicated and browsers just followed along — this asks whether that was inevitable.",
      },
    ],
  },
  {
    id: "search",
    title: "Search Engine",
    description: "How I find things on the internet.",
    items: [
      {
        type: "article",
        title: "Google Search Is Dying",
        url: "https://dkb.io/post/google-search-is-dying",
        source: "dkb.blog",
        note:
          "Articulates the SEO spam problem better than anything else I've read. The Reddit appending trick is a symptom, not a fix.",
      },
      {
        type: "article",
        title: "In Search of a Better Search",
        url: "https://www.theverge.com/2023/2/27/23614358/google-search-results-seo-spam-people-also-ask",
        source: "The Verge",
        note:
          "Good overview of why search results have degraded and what alternatives are trying to do about it.",
      },
    ],
  },
  {
    id: "ai",
    title: "AI",
    description: "Tools and thinking around how I use AI day-to-day.",
    items: [
      {
        type: "article",
        title: "A Vision of Coding Without Syntax",
        url: "https://www.geoffreylitt.com/2023/03/25/llm-end-user-programming",
        source: "geoffreylitt.com",
        author: "Geoffrey Litt",
        note:
          "One of the more honest takes on where LLMs fit into programming — not a replacement, but a shift in what counts as the hard part.",
      },
      {
        type: "article",
        title: "The Expanding Dark Forest and Generative AI",
        url: "https://maggieappleton.com/ai-dark-forest",
        source: "maggieappleton.com",
        author: "Maggie Appleton",
        note:
          "The internet is filling up with synthetic content and humans are retreating to private spaces. Still the most useful mental model I have for what's happening.",
      },
      {
        type: "video",
        title: "Andrej Karpathy — Intro to Large Language Models",
        url: "https://www.youtube.com/watch?v=zjkBMFhNj_g",
        channel: "Andrej Karpathy",
        note:
          "The clearest 1-hour explanation of how LLMs actually work, from someone who helped build them. Required viewing before having an opinion on AI.",
      },
    ],
  },
];

export function getAllSetupCategories(): SetupCategory[] {
  return setupCategories;
}
