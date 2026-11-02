"""Diagram for the git worktrees post. Run: python3 scripts/diagrams/git_worktrees.py"""
from diagram_lib import *

# ── 1. One repo, three working trees ────────────────────────────
s = Svg("git-worktrees", 400, 318, "Three directories, each on its own branch and each with its own agent, all point at the same .git directory. They share history, remotes and refs, and keep separate working files")
trees = [("myapp/", "main", "green"), ("myapp-feat-auth/", "feat/auth", "blue"), ("myapp-fix-bug-42/", "fix/bug-42", "violet")]
for i, (path, branch, acc) in enumerate(trees):
    x = 20 + i * 122
    mid = x + 58
    s.box(x, 16, 116, 34, f"Agent {i + 1}", anchor="middle")
    s.arrow([(mid, 50), (mid, 82)])
    s.add(f'<rect x="{x}" y="84" width="116" height="60" rx="8" class="d-box"/>')
    s.text(mid, 109, path, "d-s d-m", "middle")
    s.text(mid, 128, branch, f"d-t d-{acc} d-ct", "middle")
    s.arrow([(mid, 144), (mid, 192)])
s.box(20, 194, 360, 54, "One .git directory", "History, remotes and refs are shared", accent="amber")
s.rule(266)
s.text(20, 290, "Every branch live at once.", "d-t")
s.text(20, 308, "Each agent has its own files, so nobody steps on anybody.", "d-s")
s.render()
