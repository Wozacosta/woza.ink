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
    id: "terminal",
    title: "Terminal",
    description: "Where I actually spend most of my time.",
    items: [
      {
        type: "post",
        slug: "cmux-terminal-for-agentic-coding",
        note: "My current daily driver. The notification rings alone justify the switch if you're running agents in parallel.",
      },
      {
        type: "post",
        slug: "dotfiles",
        note: "The single highest-leverage thing you can do for your dev environment. stow makes the symlink management painless.",
      },
      {
        type: "post",
        slug: "git-worktrees-parallel-agents",
        note: "Once you're running multiple agents in parallel, worktrees become load-bearing. worktrunk is the CLI that makes it frictionless.",
      },
      {
        type: "article",
        title: "Worktrunk — Git worktree CLI for parallel agents",
        url: "https://worktrunk.dev",
        source: "worktrunk.dev",
        note: "wt switch, wt list, wt merge. Three commands that replace a dozen git incantations. The daily driver once you're running agents at scale.",
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
      {
        type: "video",
        title: "My Opencode Workflow As A Senior Engineer",
        url: "https://www.youtube.com/watch?v=UhRGHr7pgnU",
      },
      {
        type: "video",
        title: "Stop Using Git Worktrees. Do THIS Instead.",
        url: "https://www.youtube.com/watch?v=WBQiqr6LevQ",
        note: "The video that introduced worktrunk to most people. Good walkthrough of why the raw git worktree UX breaks down at scale and what worktrunk does differently.",
      },
    ],
  },
  {
    id: "window-management",
    title: "Window Management",
    description: "Reproducing i3 on macOS.",
    items: [
      {
        type: "post",
        slug: "i3-on-mac-flashspace",
        note: "My full journey from Aerospace to Flashspace — and why snappiness matters more than features when you're chasing the i3 feeling.",
      },
      {
        type: "article",
        title: "FlashSpace — Virtual workspace manager for macOS",
        url: "https://github.com/wojciech-kulik/FlashSpace",
        source: "github.com/wojciech-kulik",
        note: "The tool that finally made macOS Spaces feel like i3 workspaces. Instant switching, app assignment, zero friction.",
      },
      {
        type: "article",
        title: "AeroSpace — i3-like tiling window manager for macOS",
        url: "https://github.com/nikitabobko/AeroSpace",
        source: "github.com/nikitabobko",
        note: "A solid i3 port for Mac. I moved away from it but it's the right choice if you want full tree-based tiling.",
      },
    ],
  },
  {
    id: "shell",
    title: "Shell",
    description: "The layer between me and the machine.",
    items: [
      {
        type: "post",
        slug: "dotfiles",
        note: "Where shell config actually lives. stow makes the symlink management trivial.",
      },
      {
        type: "article",
        title: "Starship: Cross-Shell Prompt",
        url: "https://starship.rs/",
        source: "starship.rs",
        note: "Fast, minimal, written in Rust. Shows git branch, language versions, and command duration without needing a bloated theme framework.",
      },
      {
        type: "article",
        title: "zsh plugin list (oh-my-zsh wiki)",
        url: "https://github.com/ohmyzsh/ohmyzsh/wiki/Plugins",
        source: "ohmyzsh",
        note: "The plugins I actually use: git, z, zsh-autosuggestions, zsh-syntax-highlighting. Everything else is noise.",
      },
    ],
  },
  {
    id: "editor",
    title: "Editor",
    description: "Where most of the thinking happens.",
    items: [
      {
        type: "article",
        title: "Neovim",
        url: "https://neovim.io/",
        source: "neovim.io",
        note: "My main editor. The startup time, the composability, the fact that it runs in the terminal — these compound. Takes a week to get comfortable, months to get fast.",
      },
      {
        type: "article",
        title: "kickstart.nvim",
        url: "https://github.com/nvim-lua/kickstart.nvim",
        source: "github.com/nvim-lua",
        note: "The right starting point for a neovim config in 2026 — a single documented file, not a plugin framework you have to reverse-engineer.",
      },
      {
        type: "article",
        title: "Cursor",
        url: "https://www.cursor.com/",
        source: "cursor.com",
        note: "VSCode fork with deep AI integration. I use it for heavier AI-assisted work when I want inline suggestions and a GUI editor.",
      },
      {
        type: "post",
        slug: "opencode-vs-claude-code",
        note: "OpenCode has a neovim plugin that makes agentic coding feel native to the editor rather than a separate terminal tool.",
      },
    ],
  },
  {
    id: "rss",
    title: "RSS",
    description: "How I follow things without an algorithm deciding what I see.",
    items: [
      {
        type: "post",
        slug: "what-is-rss",
        note: "The why and the basics, if you're not already using RSS.",
      },
      {
        type: "post",
        slug: "personal-rss-setup-2026",
        note: "The reader, the feeds, the workflow I actually use.",
      },
      {
        type: "article",
        title: "NetNewsWire",
        url: "https://netnewswire.com/",
        source: "netnewswire.com",
        note: "Free, open source, native Mac and iOS. The fastest and least fussy RSS reader I've used.",
      },
    ],
  },
];

export function getAllSetupCategories(): SetupCategory[] {
  return setupCategories;
}
