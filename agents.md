# Agents Guide for woza.ink

## Project Overview

**woza.ink** is a personal website with a collection of interactive projects, a blog, and an about page.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS 3.4
- **Language**: TypeScript 5.9 (strict mode)
- **Package Manager**: pnpm

## Site Structure

### Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage - minimal landing with nav links |
| `/projects` | Grid of interactive projects |
| `/blog` | Blog posts (placeholder) |
| `/about` | About page (placeholder) |
| `/{project-slug}` | Individual project pages |

### File Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage (links to projects, blog, about)
│   ├── globals.css         # Global styles (Tailwind)
│   ├── projects/
│   │   └── page.tsx        # Projects listing page
│   ├── blog/
│   │   └── page.tsx        # Blog page
│   ├── about/
│   │   └── page.tsx        # About page
│   ├── infinite-scroll/    # Project: Infinite scroll game
│   ├── color-memory/       # Project: Color memory game
│   ├── typing-test/        # Project: Typing speed test
│   ├── draw/               # Project: Drawing canvas
│   ├── password-game/      # Project: Password creation game
│   └── spend-money/        # Project: Spend a billion dollars game
├── components/
│   └── ProjectLayout.tsx   # Shared layout for projects (back link goes to /projects)
└── data/
    └── projects.ts         # Project metadata (slug, title, description, color, emoji)
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

## Adding New Projects

1. Create a new folder in `src/app/` with the project slug
2. Add a `page.tsx` file with the project component
3. Register the project in `src/data/projects.ts` with:
   - `slug`: URL path (matches folder name)
   - `title`: Display name
   - `description`: Short description
   - `color`: Hex color for theming
   - `emoji`: Optional emoji icon

## Current Projects

| Slug | Title | Description |
|------|-------|-------------|
| infinite-scroll | Infinite Scroll | How far can you scroll? |
| color-memory | Color Memory | Test your color memory |
| typing-test | Typing Test | How fast can you type? |
| draw | Draw | Simple drawing canvas |
| password-game | Password Game | Create the perfect password |
| spend-money | Spend Money | Spend a billion dollars |

## Notes

- Each project page should use `ProjectLayout` component for consistent styling
- Projects are client-side interactive experiences (use `'use client'` directive)
- Tailwind is configured with PostCSS and Autoprefixer
- Homepage is minimal: just title and nav links to projects/blog/about
