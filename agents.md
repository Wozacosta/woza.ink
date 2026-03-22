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
│   ├── TagBadge.tsx         # Colored tag badges (color map per tag)
│   └── ThemeToggle.tsx      # Dark/light mode toggle
├── content/
│   └── blog/               # Blog posts in Markdown (auto-discovered)
├── data/
│   ├── blog.ts             # Blog post loader (getAllPosts, getPostBySlug, etc.)
│   ├── projects.ts         # Project metadata (external URLs)
│   ├── setup.ts            # Setup page categories and items
│   ├── reading.ts          # Reading list items
│   └── about.ts            # About page content
└── lib/
    └── rss.ts              # RSS feed XML generator
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

## Adding Blog Posts

1. Create a new `.md` file in `src/content/blog/`
2. Add frontmatter with title, date, description, and tags
3. Write content in Markdown
4. The post will automatically appear on `/blog`
5. If the post is a setup/tools article, also add it to the setup page (see below)

## Adding to the Setup Page

The `/setup` page is a curated list defined in `src/data/setup.ts`. It does **not** auto-discover posts by tag — items must be added manually.

1. Open `src/data/setup.ts` and find the relevant category (or create a new one)
2. Add an item to the category's `items` array. Three types are supported:
   - `{ type: "post", slug: "my-article" }` — references an internal blog post by slug
   - `{ type: "article", title: "...", url: "..." }` — links to an external article
   - `{ type: "video", title: "...", url: "..." }` — links to an external video
3. Every item can have an optional `note` field (1-3 sentences, your personal annotation)

## Theme

- **Background**: Cream (#faf8f5)
- **Foreground**: Ink (#1a1a1a)
- **Font**: Inter (Google Fonts)

## Notes

- Projects link to external sites (not hosted locally)
- Screenshots generated via microlink.io API
- Blog posts are written in Markdown with frontmatter parsed by `gray-matter`, rendered by `marked`
- All external links use `rel="noopener noreferrer"`
- Tag badge colors are mapped in `src/components/TagBadge.tsx` — unrecognized tags get a gray default
