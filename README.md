# woza.ink

Source for [www.woza.ink](https://www.woza.ink): a blog with margin sidenotes, a showcase
of small web apps, a reading list and a setup page. Built with Next.js, deployed on Vercel.

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm check    # lint, typecheck, tests
```

Posts are markdown files in `src/content/blog/`. See [AGENTS.md](AGENTS.md) for the project
layout, conventions and common tasks (it's written for coding agents, and works for humans too).

The site is also readable by machines: [`/llms.txt`](https://www.woza.ink/llms.txt), a
markdown version of every post at `/blog/<slug>.md`, and a full-content
[RSS feed](https://www.woza.ink/feed.xml).
