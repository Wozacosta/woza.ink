# Architecture Documentation

## Executive Summary

**woza.ink** is a personal landing page and portfolio website built with Next.js 16 (App Router). It serves as a central hub linking to external projects hosted on various platforms, with placeholder sections for blog and about content.

## Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Next.js | 16.1.4 |
| UI Library | React | 19.2.3 |
| Language | TypeScript | 5.9.3 |
| Styling | Tailwind CSS | 3.4.19 |
| Typography | @tailwindcss/typography | 0.5.19 |
| Markdown | marked | 17.0.1 |
| Frontmatter | gray-matter | 4.0.3 |
| Package Manager | pnpm | - |

## Architecture Pattern

**Page-based Architecture with Next.js App Router**

The application follows Next.js 13+ App Router conventions:
- File-system based routing (`src/app/` directory)
- Server Components by default (no `'use client'` directives needed for current pages)
- Layouts for shared UI structure
- Static data for project information

## Application Structure

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
└─────────────────────────────┬───────────────────────────────┘
                              │
┌─────────────────────────────▼───────────────────────────────┐
│                    Next.js App Router                        │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                   RootLayout                         │    │
│  │  - Inter font (Google Fonts)                        │    │
│  │  - Global CSS (Tailwind)                            │    │
│  │  - Metadata (title, description)                    │    │
│  └─────────────────────────────────────────────────────┘    │
│                              │                               │
│  ┌───────────┬───────────────┼───────────────┬───────────┐  │
│  │           │               │               │           │  │
│  ▼           ▼               ▼               ▼           │  │
│ /          /projects       /blog          /about        │  │
│ HomePage   ProjectsPage    BlogPage       AboutPage     │  │
│            (Gallery)       /blog/[slug]   (Placeholder) │  │
│                            BlogPostPage                 │  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Data Layer                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  src/data/projects.ts                                │    │
│  │  - Project interface definition                      │    │
│  │  - Static array of project metadata                  │    │
│  │  - External URLs (no local project code)             │    │
│  └─────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  src/data/blog.ts                                    │    │
│  │  - BlogPost interface definition                     │    │
│  │  - Markdown file reading from src/content/blog/      │    │
│  │  - Frontmatter parsing via gray-matter               │    │
│  └─────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  src/content/blog/*.md                               │    │
│  │  - Markdown files with YAML frontmatter              │    │
│  │  - Contains: title, date, description, tags          │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   External Services                          │
│  ┌─────────────────┐  ┌─────────────────────────────────┐   │
│  │ microlink.io    │  │ External Project Sites           │   │
│  │ (Screenshots)   │  │ - pomo-coral-eight.vercel.app   │   │
│  │                 │  │ - guideto.vercel.app            │   │
│  │                 │  │ - basel.ink     │   │
│  │                 │  │ - fitlog-theta.vercel.app       │   │
│  │                 │  │ - wezer.vercel.app              │   │
│  └─────────────────┘  └─────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Page Components

### Homepage (`/`)
- Minimal landing page
- Navigation links to Projects, Blog, About
- Centered layout with title "woza.ink"

### Projects Page (`/projects`)
- Grid gallery of external projects
- Uses `next/image` with microlink.io API for screenshots
- Links open in new tabs to external project URLs
- Optional GitHub links displayed with icon

### Blog Page (`/blog`)
- Lists all blog posts sorted by date (newest first)
- Displays post title, date, description, and tags
- Links to individual post pages

### Blog Post Page (`/blog/[slug]`)
- Dynamic route for individual blog posts
- Renders markdown content via `marked` library
- Displays post metadata (date, title, tags)
- Uses Tailwind Typography (`prose`) for styled content
- Static generation via `generateStaticParams()`

### About Page (`/about`)
- Placeholder page ("Coming soon...")
- Ready for future about content

## Data Architecture

### Project Interface

```typescript
interface Project {
  slug: string;        // URL-friendly identifier
  title: string;       // Display name
  description: string; // Short description
  color: string;       // Theme color (hex)
  url: string;         // External project URL
  github?: string;     // Optional GitHub repo URL
}
```

### BlogPost Interface

```typescript
interface BlogPost {
  slug: string;        // Derived from filename (e.g., my-post.md → my-post)
  title: string;       // From frontmatter
  date: string;        // ISO date string from frontmatter
  description: string; // Short description from frontmatter
  tags: string[];      // Array of tag strings from frontmatter
  content: string;     // Raw markdown content (rendered via marked)
}
```

### Blog Content Structure

Blog posts are stored as markdown files in `src/content/blog/`:

```
src/content/blog/
├── my-first-post.md
├── another-post.md
└── ...
```

Each markdown file uses YAML frontmatter:

```markdown
---
title: "My First Post"
date: "2024-01-15"
description: "A brief description of the post"
tags: ["tag1", "tag2"]
---

Post content in markdown...
```

### Current Projects

| Project | URL | Description |
|---------|-----|-------------|
| Pomo | pomo-coral-eight.vercel.app | Pomodoro timer with music links |
| Guide To | guideto.vercel.app | Music guides with rich media |
| Baseline | basel.ink | Nicotine quit helper PWA |
| FitLog | fitlog-theta.vercel.app | Exercise tracking app |
| Wezer | wezer.vercel.app | Weather anomaly tracker |

## Styling Architecture

### Theme

- **Background**: Cream (#faf8f5)
- **Foreground**: Ink (#1a1a1a)
- **Font**: Inter (variable font via next/font)

### CSS Strategy

1. **Tailwind CSS**: Utility-first styling
2. **CSS Variables**: Theme colors in `:root`
3. **Custom Selection**: Inverted colors on text selection

## External Dependencies

### Runtime
- **microlink.io API**: Screenshot generation for project cards (no API key required)

### Build Time
- **next/font**: Google Fonts optimization
- **next/image**: Image optimization with external sources

## Security Considerations

- All external links use `rel="noopener noreferrer"`
- No user input or authentication
- No API routes or server-side data processing
- Static site generation possible

## Performance Characteristics

- **SSG-compatible**: All pages can be statically generated
- **Image optimization**: Via Next.js Image component
- **Font optimization**: Via next/font (no layout shift)
- **Minimal bundle**: No client-side state management

## Future Expansion Points

1. **About Page**: Add personal content and bio
2. **Components**: Build reusable components in `src/components/`
3. **Local Projects**: Optionally host project demos locally
4. **Analytics**: Add privacy-friendly analytics
5. **Blog Enhancements**: Syntax highlighting, table of contents, RSS feed
