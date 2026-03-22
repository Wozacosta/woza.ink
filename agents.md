# Agents Guide for woza.ink

## Project Overview

**woza.ink** is a personal landing page and portfolio website showcasing external projects, with a blog, setup/tools page, reading list, and about section.

## Tech Stack

- **Framework**: Next.js 16.1.4 (App Router)
- **UI**: React 19.2.3, Tailwind CSS 3.4.19
- **Language**: TypeScript 5.9.3 (strict mode)
- **Package Manager**: pnpm

## Site Structure

### Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage - minimal landing with nav links |
| `/projects` | Grid of external projects with live screenshots |
| `/blog` | Blog listing page |
| `/blog/[slug]` | Individual blog post pages |
| `/setup` | Curated setup/tools page (hardcoded in `src/data/setup.ts`) |
| `/reading` | Reading list page (hardcoded in `src/data/reading.ts`) |
| `/about` | About page |
| `/feed.xml` | RSS feed (auto-generated from blog posts) |

### File Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (Inter font, metadata)
│   ├── page.tsx            # Homepage (navigation hub)
│   ├── globals.css         # Global styles (Tailwind + CSS variables)
│   ├── projects/
│   │   └── page.tsx        # Projects gallery (external links)
│   ├── blog/
│   │   ├── page.tsx        # Blog listing page
│   │   └── [slug]/
│   │       └── page.tsx    # Individual blog post
│   ├── setup/
│   │   └── page.tsx        # Setup/tools page
│   ├── reading/
│   │   └── page.tsx        # Reading list page
│   ├── about/
│   │   └── page.tsx        # About page
│   └── feed.xml/
│       └── route.ts        # RSS feed endpoint
├── components/
│   ├── ReadingProgress.tsx  # Reading progress bar for blog posts
│   ├── RssLink.tsx          # RSS feed link component
│   ├── Sidenotes.tsx        # Margin sidenotes (positioned at marker Y-coords)
│   ├── TableOfContents.tsx  # Scroll-aware TOC sidebar
│   ├── TagBadge.tsx         # Colored tag badges (color map per tag)
│   └── ThemeToggle.tsx      # Dark/light mode toggle
├── content/
│   └── blog/               # Blog posts in Markdown (auto-discovered)
├── data/
│   ├── blog.ts             # Blog post loader (getAllPosts, getPostBySlug, etc.)
│   ├── projects.ts         # Project metadata (external URLs)
│   ├── setup.ts            # Setup page categories and items
│   ├── reading.ts          # Reading list items
│   ├── about.ts            # About page content
│   └── sidenotes/          # Per-article sidenote data
│       ├── types.ts         # Sidenote/ArticleSidenotes interfaces
│       ├── index.ts         # Barrel loader (getSidenotes by slug)
│       └── [slug].ts        # One file per article
└── lib/
    ├── headings.ts          # Extract headings from markdown, add IDs to HTML
    ├── sidenotes.ts         # Inject superscript markers into rendered HTML
    └── rss.ts               # RSS feed XML generator
```

## Commands

```bash
pnpm dev      # Start development server
pnpm build    # Production build
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## Path Aliases

- `@/*` maps to `./src/*`

## Current Projects (External)

| Project | Description | URL |
|---------|-------------|-----|
| Progress | Local-first habit tracking PWA | habitu.xyz |
| LaterList | Save-for-later app with AI categorization | laterlist.cc |
| Payp | Crypto payments (coming soon) | payp.ink |
| Baseline | Nicotine quit support PWA | basel.ink |
| Guide To | Music guides platform | guideto.vercel.app |
| Wezer | Weather anomaly tracker | wezer.vercel.app |
| Pomo | Pomodoro timer with music links | pomodo.ink |
| FitLog | Exercise tracking app | fitlog-theta.vercel.app |
| Le Plein | Cheapest fuel prices in France | leple.ink |

## Adding New Projects

1. Add entry to `src/data/projects.ts` with:
   - `slug`: URL-friendly identifier
   - `title`: Display name
   - `description`: Short description
   - `color`: Hex color for theming
   - `url`: External project URL
   - `github`: Optional GitHub repo URL
   - `active`: Optional, set `false` for coming-soon projects (card links to github instead)

## Article Layout (Gwern-style)

Blog posts use a three-column layout on larger screens:

| Breakpoint | Layout |
|------------|--------|
| < 1024px | Single column (mobile/small tablet) |
| ≥ 1024px (lg) | TOC sidebar + article |
| ≥ 1280px (xl) | TOC sidebar + article + sidenotes |

### Components

- **TableOfContents** (`src/components/TableOfContents.tsx`): Client component using IntersectionObserver to highlight the active section. Extracts h2/h3 headings from markdown.
- **Sidenotes** (`src/components/Sidenotes.tsx`): Client component that positions each note at the Y-coordinate of its marker in the article text. Uses `[data-sn="N"]` attributes injected server-side.

### Sidenotes Data Format

Each article's sidenotes are in `src/data/sidenotes/[slug].ts`:

```ts
import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "my-article",
  notes: [
    {
      marker: "exact phrase from article text",  // anchors the note here
      type: "quote",                             // quote | source | context | counter | note
      content: "The sidenote content...",
      attribution: "Author Name",                // optional
      url: "https://...",                         // optional
    },
  ],
};
```

**Important**: The `marker` must be an exact substring of the rendered article text (case-sensitive). It's matched via `string.indexOf()` in the HTML — so use plain text as it renders, including any markdown formatting characters that appear in the source (`**bold**`, `` `code` ``, `[link](url)`).

After creating a sidenotes file, add its import to `src/data/sidenotes/index.ts`.

### Rendering Pipeline

1. Markdown → HTML via `marked`
2. `addHeadingIds()` adds `id` attributes to headings
3. `injectSidenoteMarkers()` finds each marker phrase and appends `<sup class="sn-ref" data-sn="N">N</sup>`
4. Client-side `Sidenotes` component reads marker positions and absolutely positions notes in the right column

## Adding Blog Posts

1. Create a new `.md` file in `src/content/blog/`
2. Add frontmatter with title, date, description, and tags
3. Write content in Markdown
4. The post will automatically appear on `/blog`
5. Optionally create a sidenotes file in `src/data/sidenotes/[slug].ts` and register it in `index.ts`
6. If the post is a setup/tools article, also add it to the setup page (see below)

## Adding to the Setup Page

The `/setup` page is a curated list defined in `src/data/setup.ts`. It does **not** auto-discover posts by tag — items must be added manually.

1. Open `src/data/setup.ts` and find the relevant category (or create a new one)
2. Add an item to the category's `items` array. Three types are supported:
   - `{ type: "post", slug: "my-article" }` — references an internal blog post by slug
   - `{ type: "article", title: "...", url: "..." }` — links to an external article
   - `{ type: "video", title: "...", url: "..." }` — links to an external video
3. Every item can have an optional `note` field (1-3 sentences, your personal annotation)

## Laterlist Integration (Reading Page)

The `/reading` page pulls published articles from [laterlist.cc](https://laterlist.cc).

### Flow

1. In laterlist: mark an article as done (checkbox), then click **↗** to publish it
2. The client pushes the item to laterlist's server store via `PUT /api/items/sync`
3. woza.ink fetches `GET https://www.laterlist.cc/api/public/reading-list` (with API key) — filters by `publishedAt`
4. Items are mapped to `ReadingItem` objects, deduplicated against manual items, sorted by read date
5. Page revalidates every hour via ISR, or on demand via `pnpm sync`

### Force sync

```bash
pnpm sync
```

This calls `POST https://woza.ink/api/revalidate?secret=$REVALIDATE_SECRET&path=/reading` to force ISR revalidation immediately.

### Env vars

| Variable | Where | Purpose |
|----------|-------|---------|
| `LATERLIST_API_KEY` | woza.ink (Vercel) | Bearer token for the reading-list endpoint |
| `LATERLIST_API_URL` | woza.ink (Vercel, optional) | Override base URL (defaults to `https://www.laterlist.cc`) |
| `REVALIDATE_SECRET` | woza.ink (Vercel + local shell) | Secret for the on-demand revalidation endpoint |

### Adding manual reading items

Hardcoded items live in `src/data/reading.ts` in the `manualItems` array. These are merged with laterlist data and shown if no laterlist item has the same URL.

## Theme

- **Background**: Cream (#faf8f5)
- **Foreground**: Ink (#1a1a1a)
- **Font**: Inter (Google Fonts)

## Notes

- Projects link to external sites (not hosted locally)
- Screenshots generated via microlink.io API
- Blog posts are written in Markdown with frontmatter parsed by `gray-matter`, rendered by `marked` with heading IDs and sidenote markers injected server-side
- All external links use `rel="noopener noreferrer"`
- Tag badge colors are mapped in `src/components/TagBadge.tsx` — unrecognized tags get a gray default
