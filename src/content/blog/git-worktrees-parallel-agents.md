---
title: "Git Worktrees for Parallel Agent Work"
date: "2026-03-14"
description: "Running multiple AI agents in parallel means running multiple branches in parallel. Git worktrees are how you do that without thrashing your working directory."
tags: ["dx", "AI", "git", "tutorial"]
---

# Git Worktrees for Parallel Agent Work

The bottleneck in agentic coding isn't the agent's speed. It's yours. You have one working directory, and switching branches mid-task means stashing, checking out, context-switching back, and hoping you remember where you were.

Git worktrees fix this. They let you check out multiple branches simultaneously into separate directories, each with its own working tree. One repo, multiple branches, all live at once.

If you'd rather skip the raw git commands and use a purpose-built CLI, jump to the [worktrunk section](#worktrunk-the-purpose-built-cli) below.

---

## What a worktree is

Normally your repo has one working tree — the directory where files exist on disk. A worktree is an additional checkout of the same repo at a different path, on a different branch.

```bash
# your main working directory
~/projects/myapp/          # branch: main

# additional worktrees
~/projects/myapp-feat-auth/   # branch: feat/auth
~/projects/myapp-fix-bug-42/  # branch: fix/bug-42
```

All three point to the same `.git` directory. They share history, remotes, and refs. They don't share working files — each directory has its own copy of the branch it's checked out on.

---

## Why this matters for agents

When you're running [cmux](https://www.cmux.dev/) or any parallel terminal setup with multiple Claude Code sessions, each agent needs its own branch. If they share a working directory, they step on each other — one agent's file write conflicts with another's read, and your git state becomes a mess.

The pattern:

1. Create a worktree per task
2. Open each worktree in its own terminal tab / cmux pane
3. Run an agent in each — they operate fully independently
4. Review, merge, delete the worktree when done

---

## The commands

**Create a worktree:**

```bash
git worktree add ../myapp-feat-auth feat/auth
```

This creates `../myapp-feat-auth/` checked out on `feat/auth`. If the branch doesn't exist yet:

```bash
git worktree add -b feat/auth ../myapp-feat-auth main
```

Creates the branch from `main` and checks it out into the new directory.

**List all worktrees:**

```bash
git worktree list
```

Output:
```
/Users/you/projects/myapp           abc1234 [main]
/Users/you/projects/myapp-feat-auth def5678 [feat/auth]
```

**Remove a worktree when you're done:**

```bash
git worktree remove ../myapp-feat-auth
```

This removes the directory and cleans up the internal bookkeeping. If the worktree has uncommitted changes it'll warn you; use `--force` to remove anyway.

**Prune stale worktree records** (e.g. after manually deleting the directory):

```bash
git worktree prune
```

---

## A concrete parallel agent workflow

Say you're working on three things at once: a feature, a bug fix, and a refactor. Here's the setup:

```bash
# from your main repo directory
git worktree add -b feat/user-auth ../myapp-auth main
git worktree add -b fix/session-leak ../myapp-session main
git worktree add -b refactor/db-layer ../myapp-db main
```

Three directories, three branches. In [cmux](https://www.cmux.dev/), open each in its own tab. Launch an agent in each. They run concurrently with zero interference.

When an agent finishes:

```bash
# in the worktree directory, push the branch
git push -u origin feat/user-auth

# back in main repo, remove the worktree
git worktree remove ../myapp-auth
```

Then open a PR as usual.

---

## A few gotchas

**You can't check out the same branch in two worktrees.** Git enforces this — it prevents two worktrees from getting out of sync on the same branch. If you try, you get an error. The fix is always to work on separate branches.

**Paths can get messy.** I put worktrees in sibling directories (`../myapp-auth`) rather than subdirectories of the main repo, to avoid accidentally including them in file searches or editor indexing. Some people use a dedicated `~/worktrees/` folder.

**Your editor might not know about them.** If you open the main repo in VSCode or Cursor, it won't automatically show the worktree directories. Open each worktree as a separate workspace window. This is fine — it's actually the point. Each agent and each editor window has its own isolated context.

**Stash doesn't cross worktrees.** Each worktree has its own index and stash. You can't stash in one worktree and pop in another.

---

## Shell alias worth having

If you're doing this frequently, a small alias saves typing:

```bash
# in your .zshrc
gwt() {
  local branch="$1"
  local dir="${2:-../${PWD##*/}-${branch//\//-}}"
  git worktree add -b "$branch" "$dir" main
  echo "Worktree created at $dir"
}
```

Then:

```bash
gwt feat/payments
# creates ../myapp-feat-payments on branch feat/payments
```

---

## The bigger picture

Worktrees are a relatively obscure git feature — most developers have never used them. But once you're running agents in parallel, they become load-bearing infrastructure. The alternative (stash + checkout + re-stash) doesn't scale past one context switch.

Pair worktrees with [cmux](https://www.cmux.dev/) for terminal organization, and you have a clean model: one pane per task, one worktree per pane, one agent per pane. The overhead is three commands to set up and one to tear down.

---

---

## Worktrunk: the purpose-built CLI

Raw git worktree commands are functional but verbose. Creating a worktree requires typing the branch name twice plus a path. Switching means a `cd`. Cleaning up is three commands. It works, but the friction adds up when you're spinning up and tearing down worktrees dozens of times a day.

[Worktrunk](https://worktrunk.dev) (`wt`) is a Rust CLI built specifically to fix this. 3.3k stars on GitHub, released early 2026, and already the default tool for this workflow in the agentic coding community.

**Install:**

```bash
brew install worktrunk && wt config shell install
```

The shell integration is what makes `wt switch` actually switch your working directory — without it, you'd need to `cd` manually after every command.

**The core three commands:**

```bash
# create a worktree + branch from main, switch to it
wt switch --create feat/auth

# list all worktrees with status (staged changes, unpushed commits, CI status)
wt list

# squash, rebase, merge, clean up — all in one
wt merge main
```

Compare this to plain git:

| Task | worktrunk | plain git |
|---|---|---|
| Create + switch | `wt switch -c feat` | `git worktree add -b feat ../repo.feat && cd ../repo.feat` |
| Launch agent | `wt switch -c -x claude feat` | (above) + `claude` |
| Clean up | `wt remove` | `cd ../repo && git worktree remove ../repo.feat && git branch -d feat` |

**Launching agents directly:**

```bash
# create worktree and immediately launch Claude Code in it
wt switch -x claude -c feat/payments -- 'Implement Stripe webhook handler'
wt switch -x claude -c fix/session-leak -- 'Fix the session memory leak in auth middleware'
```

The `-x` flag runs a command after switching; everything after `--` is passed to it as arguments. Two commands, two agents, two isolated branches, running in parallel.

**Hooks for automation:**

Worktrunk supports lifecycle hooks — run commands on create, pre-merge, post-merge. The main use cases: install dependencies automatically when a new worktree is created, start a dev server on a unique port per worktree (`hash_port` template filter gives each one a deterministic port so they don't collide).

**`wt list --full`:**

This is the underrated feature. Full mode shows CI status, AI-generated branch summaries, PR links, and whether each worktree is ahead/behind main. When you have six agents running, this is your dashboard.

**The honest comparison:**

Raw git worktrees and worktrunk get you to the same place. The question is whether the friction of the raw commands is worth avoiding. If you're running one or two parallel tasks occasionally, plain git is fine. If parallel worktrees are a daily workflow with five or more simultaneous agents, worktrunk pays for itself in the first hour.

---

## Further reading

- [worktrunk.dev](https://worktrunk.dev) — full documentation: hooks, LLM commits, interactive picker, Claude Code integration
- [worktrunk on GitHub](https://github.com/max-sixty/worktrunk) — source code and issue tracker
- [Stop Using Git Worktrees. Do THIS Instead.](https://www.youtube.com/watch?v=WBQiqr6LevQ) — the video that put worktrunk on the map; good walkthrough of the workflow
- [git-worktree documentation](https://git-scm.com/docs/git-worktree) — the raw git reference if you want to understand what's under the hood
- [cmux: A Terminal Built for Agentic Workflows](/blog/cmux-terminal-for-agentic-coding) — the terminal setup that makes parallel worktrees ergonomic
- [Rules, Commands, and Skills](/blog/rules-commands-skills-agentic-coding) — the broader framework for running agents effectively
