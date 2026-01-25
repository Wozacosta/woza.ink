---
title: "Building Pomo: A Pomodoro Timer That Actually Helps You Focus"
date: "2026-01-20"
description: "The story behind building a minimalist Pomodoro timer with concentration music and productivity tracking."
tags: ["project", "react", "productivity"]
---

# Building Pomo: A Pomodoro Timer That Actually Helps You Focus

I've tried dozens of Pomodoro apps over the years. Most of them are either too complicated or too simple. So I decided to build my own.

## The Problem with Existing Apps

Most Pomodoro timers fall into two categories:

1. **Overly simple** - Just a timer with no context or motivation
2. **Feature bloated** - So many settings and stats that they become distractions themselves

I wanted something in between. A timer that:

- Looks clean and stays out of the way
- Provides gentle motivation through music links
- Tracks progress without making it feel like a chore

## The Solution

Pomo is built with React and focuses on three core features:

### 1. Clean Timer Interface

The timer is front and center. No sidebars, no menus cluttering your screen. Just the time remaining and a subtle progress indicator.

### 2. Concentration Music

Instead of building in a music player (which would add complexity), I curated a list of links to focus music on YouTube and Spotify. One click and you're in the zone.

### 3. Simple Progress Tracking

At the end of each day, you can see how many pomodoros you completed. No graphs, no streaks, no gamification. Just the facts.

## Technical Decisions

- **React** for the UI (simple state management needs)
- **Local Storage** for persistence (no backend needed)
- **Vercel** for hosting (instant deploys)

## What I Learned

Building something "simple" is surprisingly hard. Every feature I wanted to add, I had to ask myself: "Does this help people focus, or does it distract them?"

Most of the time, the answer was the latter.

---

*Check out [Pomo](https://pomo-coral-eight.vercel.app) and let me know what you think.*
