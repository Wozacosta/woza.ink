export const PROJECT_CATEGORIES = [
  "Learning",
  "Health",
  "Productivity",
  "Travel",
  "Culture",
  "Utilities",
  "Crypto",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export interface Project {
  slug: string;
  title: string;
  /** One-line tagline */
  description: string;
  /** Two or three sentences on what it does and how */
  summary: string;
  category: ProjectCategory;
  color: string;
  url: string;
  github?: string;
  /** Slug of a blog post about the project */
  post?: string;
  active?: boolean; // false = not live yet: no screenshot, no site link
}

export const projects: Project[] = [
  {
    slug: "uchronia",
    title: "Uchronia",
    description: "An alternate history generator",
    summary:
      "Change one moment in the past, like Napoleon winning at Waterloo or the Library of Alexandria never burning, and Uchronia rewrites every decade since. Each era comes with a redrawn world map, so you can watch the borders shift as the timeline plays out.",
    category: "Culture",
    color: "#a16207",
    url: "https://uchronia.app",
  },
  {
    slug: "cytisinio",
    title: "Cytisinio",
    description: "A companion for the 25-day cytisine quit course",
    summary:
      "Built for people quitting nicotine with cytisine (Desmoxan, Tabex, Recigar). It works out your pill schedule from your start date, then tracks nicotine use, mood and cravings each day, with guidance for every phase of the course.",
    category: "Health",
    color: "#0f766e",
    url: "https://cytisine.fit",
  },
  {
    slug: "juzi-chinese-grammar",
    title: "Chinese Sentences",
    description: "Chinese grammar that sticks",
    summary:
      "Learn Chinese grammar from real sentences instead of rule tables. New sentences arrive daily and come back for review on a spaced-repetition schedule, in simplified, traditional or both.",
    category: "Learning",
    color: "#dc2626",
    url: "https://chinesesentences.com",
  },
  {
    slug: "mandarin-atlas",
    title: "Mandarin Atlas",
    description: "A map from first tones to native media",
    summary:
      "Pick your level and Mandarin Atlas tells you what to study next, plus the books, apps, films and shows that fit that stage. Six stages take you from complete beginner to native content.",
    category: "Learning",
    color: "#d97706",
    url: "https://mandarin-atlas-one.vercel.app",
  },
  {
    slug: "triplan",
    title: "Triplan",
    description: "Plan trips by neighborhood, not by pin",
    summary:
      "Hand-written walks through the neighborhoods of 200 cities, stitched into day-by-day itineraries around your dates and hotel. You spend your days exploring one area at a time instead of crossing town between pins.",
    category: "Travel",
    color: "#e11d48",
    url: "https://triplan.ink",
  },
  {
    slug: "habitu",
    title: "Habitu",
    description: "A grid-based habit tracker",
    summary:
      "Track habits on a day-by-day grid: one tap marks a day done, two marks it partial, and 7- and 30-day scores show how you're doing. It's a local-first PWA that works offline and needs no account; sign in only if you want sync.",
    category: "Productivity",
    color: "#6366f1",
    url: "https://habitu.xyz",
  },
  {
    slug: "laterlist",
    title: "LaterList",
    description: "Save any link to read or watch later",
    summary:
      "Paste an article, video, paper, repo or podcast and AI fills in the title, category, tags and read time. Everything lives in your browser and works offline; sign in to sync across devices.",
    category: "Productivity",
    color: "#f97316",
    url: "https://laterlist.cc",
    github: "https://github.com/Wozacosta/laterlist",
  },
  {
    slug: "baseline",
    title: "Baseline",
    description: "An offline-first quit companion",
    summary:
      "Choose what you're quitting, set a quit date, and Baseline tracks your progress alongside science-backed reasons to stay quit and support for rough moments. Nicotine is supported today, alcohol is next.",
    category: "Health",
    color: "#10b981",
    url: "https://basel.ink",
  },
  {
    slug: "guideto",
    title: "Guide To",
    description: "Photo and audio guides to music scenes",
    summary:
      "Short guides to music scenes, venues and artists, from London's trip-hop revival to Tokyo's Shibuya-kei. Each one pairs the history and photos with the music to listen to.",
    category: "Culture",
    color: "#8b5cf6",
    url: "https://guideto.vercel.app",
  },
  {
    slug: "wezer",
    title: "Wezer",
    description: "Where the weather is strangest right now",
    summary:
      "Compares today's temperature in 50 cities worldwide against their historical daily averages and ranks the biggest anomalies. The most unusual ones come with related news coverage.",
    category: "Utilities",
    color: "#3b82f6",
    url: "https://wezer.vercel.app",
    github: "https://github.com/Wozacosta/wezer",
  },
  {
    slug: "pomo",
    title: "Pomo",
    description: "A calm Pomodoro timer",
    summary:
      "A big countdown, a progress ring and nothing in the way. It keeps tasks, streaks and session history in your browser, with one-click concentration music from NTS, SomaFM and lo-fi radio.",
    category: "Productivity",
    color: "#ef4444",
    url: "https://pomodo.ink",
    github: "https://github.com/Wozacosta/pomo",
    post: "building-pomo",
  },
  {
    slug: "fitlog",
    title: "FitLog",
    description: "A simple workout log",
    summary:
      "Log your exercises day by day and see how they progress over time with per-exercise statistics. Your log is tied to an account, so it follows you across devices.",
    category: "Health",
    color: "#f59e0b",
    url: "https://fitlog-theta.vercel.app",
  },
  {
    slug: "leplein",
    title: "Le Plein",
    description: "The cheapest fuel near you in France",
    summary:
      "Uses the French government's live fuel price feed to find the cheapest station nearby. Filter by fuel type, sort by price or distance, see which stations are out of stock, and open directions in one tap.",
    category: "Utilities",
    color: "#22c55e",
    url: "https://leple.ink",
    github: "https://github.com/Wozacosta/leplein",
  },
  {
    slug: "payp",
    title: "Payp",
    description: "Pay and get paid with crypto, simply",
    summary:
      "A straightforward way to send and request crypto payments. Still in development.",
    category: "Crypto",
    color: "#0ea5e9",
    url: "https://payp.ink",
    active: false,
  },
];
