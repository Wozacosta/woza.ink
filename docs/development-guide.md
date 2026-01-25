# Development Guide

## Prerequisites

- **Node.js**: v18+ recommended (for Next.js 16 compatibility)
- **pnpm**: Package manager (install via `npm install -g pnpm`)

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Start Development Server

```bash
pnpm dev
```

The site will be available at `http://localhost:3000`

### 3. Build for Production

```bash
pnpm build
```

### 4. Start Production Server

```bash
pnpm start
```

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `next dev` | Start development server with hot reload |
| `build` | `next build` | Create optimized production build |
| `start` | `next start` | Start production server |
| `lint` | `next lint` | Run ESLint for code quality |

## Project Configuration

### TypeScript (`tsconfig.json`)

- **Strict mode**: Enabled for type safety
- **Path alias**: `@/*` maps to `./src/*`
- **Target**: ES2017
- **Module resolution**: Bundler (for Next.js compatibility)

### Tailwind CSS (`tailwind.config.js`)

Custom theme extensions:
- **Fonts**: Inter (sans), system monospace (mono)
- **Colors**: `cream` (#faf8f5), `ink` (#1a1a1a)

### PostCSS (`postcss.config.js`)

Plugins:
- `tailwindcss` - Utility-first CSS
- `autoprefixer` - Automatic vendor prefixes

### Tailwind Plugins

Configured in `tailwind.config.js`:
- `@tailwindcss/typography` - Provides `prose` classes for styling rendered markdown content in blog posts

## Environment Variables

No environment variables are currently required. The project uses:
- Static data for projects (`src/data/projects.ts`)
- External API for screenshots (microlink.io - no API key needed)

## Deployment

The project is configured for Vercel deployment (indicated by `.vercel` in `.gitignore`).

### Deploy to Vercel

1. Push to GitHub
2. Import project in Vercel dashboard
3. Vercel auto-detects Next.js and deploys

No build configuration needed - Next.js defaults are used.

## Code Style

- **TypeScript**: Strict mode enabled
- **Formatting**: Standard Next.js conventions
- **Imports**: Use `@/` alias for src imports (e.g., `@/data/projects`)
