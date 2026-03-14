---
title: "cmux: A Terminal Built for Agentic Workflows"
date: "2026-03-14"
description: "Why a terminal designed around running multiple AI agents simultaneously is worth paying attention to."
tags: ["dx", "AI", "productivity", "tools"]
---

# cmux: A Terminal Built for Agentic Workflows

The terminal hasn't changed much in decades. Tabs, splits, a shell. That's mostly fine — until you start running several AI coding agents in parallel and realize the mental model breaks down fast.

[cmux](https://www.cmux.dev/) is a macOS terminal app built specifically for this. It's powered by libghostty (the same rendering engine as Ghostty, used as a library) but layers a bunch of agentic-workflow-specific UI on top: vertical tabs with context, notification rings, a scriptable embedded browser, and a socket API.

---

## What's different

The headline feature is the **notification rings**. When an agent finishes a task or needs your attention, the pane lights up — you get a visual ring around it, an unread badge in the sidebar, and an optional macOS desktop notification. This fires automatically via standard terminal escape sequences, or you can hook into it explicitly with the cmux CLI.

This sounds small. It isn't. The normal workflow without it: run an agent, stare at the terminal waiting to see if it's done, or compulsively switch tabs. With notification rings you can just let it run and glance over when it calls for you. That's a different relationship with the tool.

The **vertical tab sidebar** shows git branch, working directory, open ports, and notification text for each tab. At a glance you know which agent is on which branch doing what. With four agents running in parallel that's genuinely useful context.

The **embedded browser** lets you split a browser pane alongside your terminal, with a scriptable API. The use case is keeping PRs, docs, or design references pinned next to the code — without context-switching to a separate app.

---

## What it's built on

cmux is native Swift + AppKit. Not Electron. It uses libghostty for terminal rendering, which means you get Ghostty's GPU-accelerated performance without actually running Ghostty. Your existing Ghostty config (keybindings, fonts, colors) carries over.

It's not a fork, not a wrapper — it's a different app that happens to use the same rendering library.

---

## The tradeoff

It's macOS only. If you're on Linux or Windows this isn't for you yet.

It's also a fairly new tool — the surface area is smaller than something like iTerm2 or Warp. You're adopting it for the agentic workflow features specifically, not because it has the deepest feature set across the board.

---

## Worth it if

You're running multiple Claude Code sessions, or any mix of terminal-based agents, and the cognitive overhead of tracking which one needs attention is real friction. The notification system alone is worth the switch if that's your daily workflow.

*Still placeholder notes here — will expand with actual usage over time.*
