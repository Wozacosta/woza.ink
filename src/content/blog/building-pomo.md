---
title: "Building Pomo: A Pomodoro Timer That Actually Helps You Focus"
date: "2026-01-20"
description: "The story behind building a minimalist Pomodoro timer with concentration music and productivity tracking."
tags: ["project", "react", "productivity"]
---

# Building Pomo: A Pomodoro Timer That Actually Helps You Focus

🔥 Quick vibe: Minimal UI, maximal focus. No bloat. No bells. Just a little app that gets out of your way and helps you get stuff done.

**Hook:** Want a Pomodoro timer that doesn't try to be your life coach? Same. I built one that respects your attention and only nudges you when it matters — with a splash of chill music links and a tiny bit of accountability.

> CALL OUT — Why this exists
>
> Most Pomodoro apps are either a shrine to metrics or a blank timer. Pomo lives between those extremes: simple UI, optional concentration music, and non-invasive progress tracking. Use it. Ignore it. Either way, it respects your focus.

## TL;DR — The short, funky version
- Clean, distraction-free timer front-and-center ⏱️  
- One-click concentration music links (YouTube/Spotify) 🎧  
- Local-only persistence — no backend, no tracking 👀  
- Built with React + Local Storage, deployed on Vercel 🚀

---

## The Problem with Existing Apps

Here's the pattern I kept running into:

1. Overly simple: just a timer — no context, no nudge, no soul.  
2. Feature-bloated: settings, badges, streaks, and a dashboard that screams for attention.

I wanted something that sat politely on your screen and helped you do one thing: focus.

## Design Goals (the short manifesto)
- Visible timer, minimal chrome.  
- Quick access to calming audio — one click to get into the zone.  
- Keep the data local and private.  
- Make progress visible without turning it into a KPI contest.

## What I Built

Pomo focuses on three core things:

### 1) Clean Timer Interface
The timer is the whole point. Big number. Subtle progress ring. Start / stop / skip. No intrusive onboarding, no nagging modals.

### 2) Concentration Music
Rather than embed a full player (hello complexity), I curated a handful of links to focus playlists. One tap, new tab, get back to work.

### 3) Simple Progress Tracking
At the end of the day you can glance at how many pomodoros you finished. No streak shame. No gamified dopamine loop. Just a quiet record.

---

## Tech Notes (for the curious engineer)
- UI: React with tiny local state (no heavy global state nonsense)  
- Persistence: Local Storage for speed and privacy  
- Hosting: Vercel for instant deploys and effortless CI

Minimal dependencies. Maximum focus.

### Small example: the timer hook (concept)
```javascript
// Example: super-simple React hook (concept)
import { useState, useEffect, useRef } from 'react';

function useTimer(initialSeconds = 25 * 60) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(s => {
          if (s <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  return { secondsLeft, running, start: () => setRunning(true), stop: () => setRunning(false), reset: (s = initialSeconds) => setSecondsLeft(s) };
}
```

(Yes, `useReducer` + effects gives you better control for a production hook — this is the idea.)

---

## UX Decisions I Stand By (short, opinionated)
- No default gamification: if you want streaks, build them into your routine, not the app.  
- Minimal UI: reduce the number of decisions the user must make while focused.  
- `styling` matters: subtle shadows, a readable type scale, and a single accent color keep attention on the tasks, not the app.

## The Hard Part: Simplicity Is Discipline
Every feature request gets the same test: "Does this help people focus, or will it distract them?" The latter loses.

Features that were rejected:
- Built-in music player (too heavy)
- Push notifications for every session (nope)
- Deep analytics dashboards (tempting, but noisy)

---

## Pocket Tips — Make Pomo Work For You
- Use a short playlist for high-focus sessions; a longer one when doing shallow work.  
- Combine a pomodoro with a tiny, clear goal: "Write 200 words" beats "work on project".  
- If you need gentle accountability, share your daily count with a friend — outside the app.

## Final Thoughts
Building simple tooling is deceptively difficult. You strip away features until only what matters remains — and then you ship. That's the essence of Pomo: small, useful, and polite.

If you try it, I'd love to hear what you changed to make it yours.

---

*Try Pomo: https://pomo-coral-eight.vercel.app — and tell me what you changed. Make it funky, make it yours.*