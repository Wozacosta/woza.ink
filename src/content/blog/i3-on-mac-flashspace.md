---
title: "Reproducing i3 on Mac: From Aerospace to Flashspace"
date: "2026-03-22"
description: "How I landed on a tiling + workspace setup on macOS that actually feels like i3. The journey from Aerospace to Flashspace, and why snappiness matters more than features."
tags: ["dx", "productivity", "tools", "setup"]
atUri: "at://did:plc:l72dcexjk4ytyh4nhy5vtix4/site.standard.document/3mzbwjxime22t"
---

# Reproducing i3 on Mac: From Aerospace to Flashspace

If you've used i3 on Linux, you know the feeling. Workspaces bound to keys. Windows tile automatically. No animations, no transitions, no waiting. You press a key and you're there. Everything else feels slow after that.

When I moved to macOS full-time I wanted that back. This is the setup I landed on after trying several approaches — and the one thing I wish someone had told me earlier.

---

## What i3 actually gives you

Before jumping into tools, it helps to name what makes i3 great. Tiling is table stakes. The parts that matter are:

1. **Workspaces on a keybind.** `Super+1` takes you to workspace 1. Instantly. No animation, no slide.
2. **Windows follow rules.** Browser goes to workspace 2, terminal to workspace 1, Slack to workspace 4. You don't arrange anything manually.
3. **Keyboard-first everything.** Moving, resizing, focusing — all keys. The mouse is there if you need it, but you shouldn't.

The challenge on macOS is that Spaces exist but they're slow, animated, and not really designed for keyboard-driven workflows. Mission Control is a visual picker, not a workspace switcher.

---

## The Aerospace phase

[Aerospace](https://github.com/nikitabobko/AeroSpace) was my first attempt. It's a tiling window manager for macOS inspired directly by i3. Tree-based layouts, configurable keybindings, workspace support — the feature list reads like an i3 port.

And it works. The tiling is solid. You get i3-style layouts with `tiles`, `accordion`, and manual splits. Config is a `.toml` file. The i3 mental model translates.

But I ran into friction:

**Workspace switching felt heavy.** Aerospace manages its own workspace abstraction instead of macOS Spaces. Switching between workspaces had a noticeable delay — not huge, but enough that it didn't feel like i3. On i3, workspace switching is instant. On Aerospace, there was a beat.

![Native Spaces slide. Aerospace reimplements them and parks inactive windows off-screen.](diagram:i3-workspace-models)

**Conflicts with macOS.** Aerospace fights the OS in subtle ways. Stage Manager, fullscreen apps, multi-monitor setups — things would occasionally break or behave unexpectedly. The tool is doing a lot of work to paper over the fact that macOS doesn't want to be a tiling WM.

**More than I needed.** I realized I don't actually need full i3-style tiling on Mac. Most of my work happens in a terminal and a browser. What I really needed was fast workspace switching and basic window placement — not a full tree-based layout engine.

---

## Flashspace: the thing that clicked

[Flashspace](https://github.com/wojciech-kulik/FlashSpace) is a workspace manager for macOS. Not a tiling window manager — a workspace manager. The distinction matters.

It skips macOS Spaces altogether. You define virtual workspaces, and a keyboard shortcut shows one workspace's apps and hides the rest. `Super+1` goes to workspace 1. `Super+2` goes to workspace 2. No animation. No transition. It's instant in a way that macOS's built-in Space switching is not.

The first time I pressed a keybind and was just *there* — no slide, no fade, no delay — I knew this was it. That's the i3 feeling.

![A workspace switch is apps being shown and hidden on one Space, which is why nothing slides.](diagram:flashspace-switch)

---

## What Flashspace does

**Instant workspace switching.** This is the core feature and the reason to use it. There's no Space transition to wait for, because it never changes Space: it presents the workspace's apps and hides the others, and each workspace gets a keyboard shortcut. The switch is effectively zero-latency.

**App-to-workspace assignment.** You can configure which apps belong to which workspace. Browser on workspace 2, terminal on workspace 1, communication tools on workspace 3. When you switch to a workspace, the right apps are presented.

**Lightweight.** Flashspace is a menu bar app. It doesn't manage window layouts, it doesn't override macOS window management, it doesn't fight the OS. It replaces Spaces with something actually usable, and gets out of the way.

---

## My setup

Here's my actual configuration:

**Workspace 1 — Terminal.** Ghostty, usually with multiple tmux sessions. This is where the actual work happens.

**Workspace 2 — Browser.** Firefox. Research, docs, PRs, deployed apps.

**Workspace 3 — Communication.** Slack, Discord, email. Isolated from work so it can't steal focus.

**Workspace 4 — Misc.** Finder, system preferences, whatever doesn't have a permanent home.

Keybindings:

- `Alt+1` through `Alt+4` — switch to workspace 1-4
- `Alt+Shift+1` through `Alt+Shift+4` — move the focused window to that workspace

That's the whole setup. Four workspaces, eight keybindings.

![Four workspaces, each one keystroke away.](diagram:flashspace-spaces)

---

## For tiling: pair it with a lightweight tiler

Flashspace handles workspaces but not window tiling. If you want windows to snap into place without dragging, pair it with macOS's native tiling (Sequoia added keyboard-driven tiling) or a lightweight tool like [Loop](https://github.com/MrKai77/Loop) for quick half-screen / quarter-screen snapping.

I use macOS native tiling for the simple cases (left half, right half) and that's enough. I don't need a tree-based layout engine — I need my terminal on the left and my browser on the right, and I need to switch workspaces instantly.

---

## Why snappiness matters

The temptation with window management tools is to chase features. More layout options, more rules, more automation. But the thing that makes i3 great isn't the feature set — it's the speed. You think "I need the browser" and the browser is there. No animation, no waiting, no context switch.

Aerospace has more features than Flashspace. It's closer to a full i3 port. But in my use it couldn't match the raw speed of Flashspace, which just shows and hides apps.

![The three tools against what I wanted from i3.](diagram:i3-tools-compare)

The lesson: when you're trying to reproduce a Linux workflow on Mac, optimize for the *feeling* first. Get the speed right, then add complexity only if you need it. I needed fast workspaces. I didn't need a tiling tree.

---

## Getting started

1. Install Flashspace from [GitHub](https://github.com/wojciech-kulik/FlashSpace) or Homebrew
2. In System Settings → Desktop & Dock, make sure "Displays have separate Spaces" is on
3. Move all your apps to a single macOS Space
4. Create your workspaces in Flashspace and set a hotkey for each
5. Assign apps to workspaces

The whole setup takes ten minutes. The speed difference is immediate.
