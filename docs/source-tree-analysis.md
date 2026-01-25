# Source Tree Analysis

## Project Structure

```
woza.ink/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout (Inter font, metadata)
│   │   ├── page.tsx            # Homepage (navigation hub)
│   │   ├── globals.css         # Global Tailwind styles + CSS variables
│   │   ├── about/
│   │   │   └── page.tsx        # About page (placeholder)
│   │   ├── blog/
│   │   │   └── page.tsx        # Blog page (placeholder)
│   │   └── projects/
│   │       └── page.tsx        # Projects gallery (links to external sites)
│   ├── components/             # Reusable UI components (currently empty)
│   ├── data/
│   │   └── projects.ts         # Project metadata (static data)
│   └── styles/                 # Additional styles (currently empty)
├── public/                     # Static assets (currently empty)
├── docs/                       # Generated documentation
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS plugins
├── pnpm-lock.yaml              # pnpm lock file
├── next-env.d.ts               # Next.js TypeScript declarations
└── .gitignore                  # Git ignore rules
```

## Critical Directories

| Directory | Purpose |
|-----------|---------|
| `src/app/` | Next.js App Router pages and layouts |
| `src/data/` | Static data files (project metadata) |
| `src/components/` | Reusable React components (empty - ready for expansion) |
| `public/` | Static assets served at root (empty) |

## Entry Points

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout - wraps all pages, sets up fonts and metadata |
| `src/app/page.tsx` | Homepage - main entry point for users |

## Key Files

| File | Lines | Purpose |
|------|-------|---------|
| `src/app/layout.tsx` | ~25 | Root layout with Inter font and base metadata |
| `src/app/page.tsx` | ~25 | Homepage with navigation to projects/blog/about |
| `src/app/projects/page.tsx` | ~70 | Projects gallery with screenshots via microlink.io |
| `src/data/projects.ts` | ~50 | Project interface and static project data array |
| `tailwind.config.js` | ~20 | Custom fonts and colors (cream/ink theme) |

## File Statistics

- **Total TypeScript/TSX files:** 6
- **Total lines of code:** ~200
- **Components:** 0 (empty folder)
- **Pages:** 4 (home, projects, blog, about)
