---
title: "Learning Next.js 16: First Impressions"
date: "2026-01-10"
description: "My experience migrating to Next.js 16 and exploring the App Router, Server Components, and new features."
tags: ["nextjs", "react", "learning"]
---

# Learning Next.js 16: First Impressions

I recently rebuilt this site using Next.js 16, and I wanted to share my first impressions of the new features.

## The App Router

The biggest change in recent Next.js versions is the App Router. Instead of the old `pages/` directory, you now use `app/` with a different file convention:

```
app/
├── page.tsx        # Route: /
├── layout.tsx      # Shared layout
├── blog/
│   ├── page.tsx    # Route: /blog
│   └── [slug]/
│       └── page.tsx # Route: /blog/:slug
```

At first, it felt unfamiliar. But after a few hours, I started to appreciate the clarity. Layouts, loading states, and error boundaries all have dedicated files. No more prop drilling or context gymnastics.

## Server Components by Default

This was the mind-bending part. In Next.js 16, components are Server Components by default. They run on the server and send HTML to the client. No JavaScript bundle for these components.

When you need interactivity (state, effects, event handlers), you add `'use client'` at the top of the file.

```tsx
'use client'

import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

It took some getting used to, but the mental model is cleaner: **Server by default, client when needed.**

## What I Love

1. **Simpler data fetching** - Just use `async/await` in Server Components
2. **Better performance** - Less JavaScript shipped to the client
3. **Cleaner file structure** - Everything has its place

## What Tripped Me Up

1. **Mixing server and client** - Knowing when to add `'use client'`
2. **Caching behavior** - Next.js caches aggressively by default
3. **Mental model shift** - Unlearning old patterns

## Would I Recommend It?

Absolutely. The initial learning curve is worth it. Once it clicks, you'll wonder how you ever lived without Server Components.

If you're starting a new React project today, Next.js 16 with the App Router is the way to go.

---

*Have you tried Next.js 16? What was your experience?*
