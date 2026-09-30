# AGENTS.md

Personal site at **https://www.woza.ink**: a markdown blog with margin sidenotes, a projects
showcase, a reading list and a setup page. Next.js 16 (App Router), React 19, TypeScript
(strict), Tailwind CSS 3, Vitest. Deployed on Vercel from `main`; nearly every route is
statically generated at build time.

## Commands

```bash
pnpm install
pnpm dev                     # http://localhost:3000
pnpm check                   # lint + typecheck + tests — run before every commit
pnpm build                   # production build (also type-checks scripts/)
pnpm test:watch              # Vitest in watch mode (`pnpm test` runs once)
pnpm screenshots [slug...]   # refresh public/projects/<slug>.webp using local Chrome
pnpm sync                    # revalidate /reading in production (needs REVALIDATE_SECRET in .env)
```

Use **pnpm** only (`packageManager` is pinned; there is no npm lockfile).

## Where things live

| Path | What |
| --- | --- |
| `src/content/blog/*.md` | Blog posts. Frontmatter: `title`, `date` (`"YYYY-MM-DD"`), `description`, `tags`. The body starts with `# Title`, which is stripped when rendering (the page shows the title itself). |
| `src/content/about.md` | About page |
| `src/data/sidenotes/<slug>.ts` | Margin notes for a post; register new files in `src/data/sidenotes/index.ts` |
| `src/data/projects.ts` | Projects page and home page cards; categories in `PROJECT_CATEGORIES` |
| `src/data/reading.ts` | Reading list: manual items plus the Laterlist API (`LATERLIST_API_KEY`) |
| `src/data/setup.ts` | Setup page categories and items (`article` / `video` / `post`) |
| `src/lib/render.ts` | Markdown → HTML (marked + Shiki; wraps tables for mobile) |
| `src/lib/sidenotes.ts` | Places sidenote markers by matching rendered text |
| `src/lib/agents.ts` | `/llms.txt`, `/llms-full.txt` and the markdown views of posts |
| `src/lib/site.ts` | Canonical URL (`https://www.woza.ink`), site copy, nav links |
| `src/app/` | Routes. `md/*` is internal: `/blog/<slug>.md` and `/about.md` rewrite to it (`next.config.ts`) |
| `scripts/capture-project-screenshots.ts` | Screenshot capture; per-project setup lives in its `CAPTURE` map |

## Common tasks

**Add a blog post**: create `src/content/blog/<slug>.md` with the frontmatter above. RSS,
sitemap, tag pages, the social image, `llms.txt` and `/blog/<slug>.md` all pick it up
automatically.

**Add sidenotes**: create `src/data/sidenotes/<slug>.ts` exporting `sidenotes` and add it
to `index.ts`. Each `marker` must be a phrase that appears in the post; markdown in the
marker is fine because matching runs on the rendered text. `src/lib/sidenotes.test.ts`
fails if a marker isn't found, which usually means the post was reworded.

**Add a project**: append to `src/data/projects.ts` (tagline in `description`, 2–3
sentences in `summary`), then run `pnpm screenshots <slug>`. A test fails if a live project
has no screenshot. If the landing page is empty for first-time visitors, add a `CAPTURE`
entry to the script (a different URL, or a `prepare` step that seeds demo data).

## Conventions

- **Commits** follow commitlint: `feat:`, `fix:`, `docs:`, `refactor:`, `perf:`, `style:`,
  `test:`, `build:`, `ci:`, `chore:`.
- **Colors** come from semantic tokens: `text-fg`, `text-muted`, `text-subtle`,
  `border-line`, `border-line-strong`, `bg-surface`, `bg-bg`. They're defined per theme in
  `src/app/globals.css` and each text token passes WCAG AA. Don't reach for raw
  `gray-*` classes. Tag chips in `TagBadge` are the one intentional exception.
- **Layout**: pages render inside the root layout's `<main>`; start them with
  `<PageHeader>`. Use `px-5 sm:px-8` gutters and `max-w-3xl` (text) or `max-w-6xl` (grids).
- **Static by default**: dynamic routes export `generateStaticParams` and
  `dynamicParams = false`. Only `/reading` (ISR, 1h) and `/api/revalidate` run at request time.
- **Dates** are `YYYY-MM-DD` strings; format them with `formatDate` (UTC) from `src/lib/format.ts`.
- **Tests** sit next to the code as `*.test.ts(x)`. Add one for any new data rule or parser.

## Verifying changes

- `pnpm check` and `pnpm build` must pass.
- For UI changes, look at the page at 390px and 1440px wide, in both light and dark themes
  (the theme toggle is in the header). Nothing should scroll horizontally on a phone.
- Content changes that reword a sentence can break a sidenote marker; `pnpm check` catches it.
