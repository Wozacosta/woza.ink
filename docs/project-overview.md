# Project Overview

## woza.ink

A personal landing page and portfolio website showcasing external projects.

## Purpose

woza.ink serves as a central hub that:
- Displays a curated portfolio of projects hosted on external platforms
- Provides navigation to blog and about sections (currently placeholders)
- Presents a minimal, clean aesthetic with a cream/ink color scheme

## Tech Stack Summary

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + Typography plugin |
| Markdown | marked |
| Frontmatter | gray-matter |
| Deployment | Vercel (inferred) |

## Current State

### Implemented
- Homepage with navigation
- Projects gallery with live screenshots
- Blog with markdown support (gray-matter + marked)
- Responsive design
- Custom theme (cream/ink colors)

### Placeholders
- About page ("Coming soon...")

### Empty/Ready for Expansion
- `src/components/` - No reusable components yet
- `src/styles/` - No additional style files
- `public/` - No static assets

### Content Directories
- `src/content/blog/` - Markdown blog posts with YAML frontmatter

## Featured Projects

The site showcases 5 external projects:

1. **Pomo** - Pomodoro timer with productivity features
2. **Guide To** - Music guides platform
3. **Baseline** - Nicotine quit support PWA
4. **FitLog** - Exercise tracking application
5. **Wezer** - Weather anomaly tracker

All projects are hosted externally (Vercel) and linked from this landing page.

## Repository Type

**Monolith** - Single cohesive codebase with ~200 lines of TypeScript.

## Key Characteristics

- **Static-first**: No dynamic data fetching or API routes
- **Minimal dependencies**: Core Next.js + React + Tailwind only
- **External projects**: Portfolio items link out rather than being hosted locally
- **Screenshot API**: Uses microlink.io for project thumbnails
