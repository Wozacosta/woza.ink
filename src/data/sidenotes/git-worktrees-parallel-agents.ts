import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "git-worktrees-parallel-agents",
  notes: [
    {
      marker:
        "A worktree is an additional checkout of the same repo at a different path, on a different branch",
      type: "context",
      content:
        "Git worktree was introduced in **Git 2.5**, released July 29, 2015. The announcement described linked working trees as \"pseudo-repositories\" — each with its own checked-out working copy, whose `.git` is actually a file that refers back to the main repository's history and refs. The feature was marked experimental at launch and took years to gain mainstream awareness.",
      url: "https://github.blog/open-source/git/git-2-5-including-multiple-worktrees-and-triangular-workflows/",
    },
    {
      marker: "each agent needs its own branch",
      type: "quote",
      content:
        "\"AI agents like Claude Code and Codex can handle longer tasks without supervision, such that it's possible to manage 5-10+ in parallel.\" The rise of agentic coding has turned worktrees from a niche git feature into load-bearing infrastructure for parallel development.",
      attribution: "Worktrunk documentation",
      url: "https://worktrunk.dev/",
    },
    {
      marker:
        "running [cmux](https://www.cmux.dev/) or any parallel terminal setup with multiple Claude Code sessions",
      type: "source",
      content:
        "Claude Code v2.1.49 (February 2026) shipped native `--worktree` (`-w`) flag support. Running `claude --worktree name` creates an isolated branch and directory at `.claude/worktrees/name/`. Subagents can also use `isolation: worktree` in their frontmatter to automatically get their own worktree on every run.",
      url: "https://code.claude.com/docs/en/common-workflows",
    },
    {
      marker: "Three directories, three branches",
      type: "note",
      content:
        "Mikhail Rogov documented scaling to **371 git worktrees** (172 GB on disk) for multi-agent AI orchestration. Key lesson: for small and medium tasks, the coordination overhead of spawning, monitoring, and merging was actually slower than running agents sequentially with clear handoffs. He ended up reducing his agent count from 7 to 5 and replacing 6,460 lines of bash with 1,600 lines of Python.",
      attribution:
        'Mikhail Rogov, "What 371 Git Worktrees Taught Me About Multi-Agent AI"',
      url: "https://levelup.gitconnected.com/what-371-git-worktrees-taught-me-about-multi-agent-ai-36d4d61acfb5",
    },
    {
      marker:
        "Git enforces this — it prevents two worktrees from getting out of sync on the same branch",
      type: "context",
      content:
        "The single-branch-per-worktree constraint exists because Git's ref system assumes one HEAD per working directory. If two worktrees shared a branch, a commit in one would silently move HEAD in the other, leaving it with a dirty diff it never created. This is also why `git worktree lock` was added in Git 2.15 — to prevent accidental cleanup of worktrees on network or removable drives.",
    },
    {
      marker: "If you're doing this frequently, a small alias saves typing",
      type: "counter",
      content:
        "Shell aliases work, but dedicated tools like **worktrunk** (`wt`) go further: computed paths from branch names, lifecycle hooks for auto-installing dependencies, deterministic port allocation via `hash_port`, and `wt list --full` showing CI status and PR links across all worktrees. If you're past 3-4 concurrent worktrees, the raw git + alias approach starts to show its limits.",
      url: "https://github.com/max-sixty/worktrunk",
    },
    {
      marker:
        "Worktrees are a relatively obscure git feature — most developers have never used them",
      type: "quote",
      content:
        "\"Local AI coding agents are drastically changing both how engineers write code, and how many tasks an engineer may have in progress at a time.\" Worktrees went from obscure to essential in under a year — driven almost entirely by the agentic coding workflow.",
      attribution: "Nick Mitchinson",
      url: "https://www.nrmitchi.com/2025/10/using-git-worktrees-for-multi-feature-development-with-ai-agents/",
    },
    {
      marker:
        "Raw git worktree commands are functional but verbose",
      type: "source",
      content:
        "OpenAI's Codex also adopted worktrees as a first-class concept. Their developer docs describe worktrees as the isolation primitive for parallel agent execution — the same pattern Claude Code uses with `--worktree`. The convergence across vendors suggests this is becoming the standard approach.",
      url: "https://developers.openai.com/codex/app/worktrees",
    },
  ],
};
