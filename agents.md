# Agents Guide for woza.ink

## Project Overview

**woza.ink** is a personal landing page and portfolio website showcasing external projects, with a blog and about section.

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
| `/about` | About page (placeholder) |

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
│   └── about/
│       └── page.tsx        # About page (placeholder)
├── components/             # Reusable UI components (empty)
├── content/
│   └── blog/               # Blog posts in Markdown
│       ├── building-pomo.md
│       ├── why-i-build.md
│       └── learning-nextjs.md
├── data/
│   ├── projects.ts         # Project metadata (external URLs)
│   └── blog.ts             # Blog post metadata and content loader
└── styles/                 # Additional styles (empty)
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
| Pomo | Pomodoro timer with music links | pomo-coral-eight.vercel.app |
| Guide To | Music guides platform | guideto.vercel.app |
| Baseline | Nicotine quit support PWA | baseline-lilac.vercel.app |
| FitLog | Exercise tracking app | fitlog-theta.vercel.app |
| Wezer | Weather anomaly tracker | wezer.vercel.app |

## Adding New Projects

1. Add entry to `src/data/projects.ts` with:
   - `slug`: URL-friendly identifier
   - `title`: Display name
   - `description`: Short description
   - `color`: Hex color for theming
   - `url`: External project URL
   - `github`: Optional GitHub repo URL

## Adding Blog Posts

1. Create a new `.md` file in `src/content/blog/`
2. Add frontmatter with title, date, description, and tags
3. Write content in Markdown
4. The post will automatically appear on `/blog`

## Theme

- **Background**: Cream (#faf8f5)
- **Foreground**: Ink (#1a1a1a)
- **Font**: Inter (Google Fonts)

## Notes

- Projects link to external sites (not hosted locally)
- Screenshots generated via microlink.io API
- Blog posts are written in Markdown with frontmatter
- All external links use `rel="noopener noreferrer"`
