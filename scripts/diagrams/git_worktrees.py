"""Diagram for the git worktrees post. Run: python3 scripts/diagrams/git_worktrees.py"""
from diagram_lib import *

# ── 1. One repo, three working trees (interactive: src/data/diagrams/git-worktrees.ts) ──
s = Svg("git-worktrees", 400, 318, "Three directories, each on its own branch and each with its own agent, all point at the same .git directory. They share history, remotes and refs, and keep separate working files")
trees = [("myapp/", "main", "green"), ("myapp-feat-auth/", "feat/auth", "blue"), ("myapp-fix-bug-42/", "fix/bug-42", "violet")]
for i, (path, branch, acc) in enumerate(trees):
    x = 20 + i * 122
    mid = x + 58
    s.box(x, 16, 116, 34, f"Agent {i + 1}", anchor="middle", node=f"agent{i + 1}")
    s.arrow([(mid, 50), (mid, 82)], edge=f"agent{i + 1}-tree{i + 1}")
    s.add(f'<g data-node="tree{i + 1}">')
    s.add(f'<rect x="{x}" y="84" width="116" height="60" rx="8" class="d-box"/>')
    s.text(mid, 109, path, "d-s d-m", "middle")
    s.text(mid, 128, branch, f"d-t d-{acc} d-ct", "middle")
    s.add("</g>")
    s.arrow([(mid, 144), (mid, 192)], edge=f"tree{i + 1}-git")
s.box(20, 194, 360, 54, "One .git directory", "History, remotes and refs are shared", accent="amber", node="git")
s.rule(266)
s.text(20, 290, "Every branch live at once.", "d-t")
s.text(20, 308, "Each agent has its own files, so nobody steps on anybody.", "d-s")
s.render()

# ── 2. Three agents, side by side ───────────────────────────────
s = Svg("worktree-parallel", 400, 268, "A sketch of three branches leaving main at the same point. Each runs an agent in its own directory at the same time, then is pushed, its worktree removed and a PR opened, at different moments")
s.text(20, 22, "Three branches, all live at once", "d-t")
s.text(20, 38, "A sketch: lengths aren't measured", "d-s")
main_y = 66
s.add(f'<line x1="20" y1="{main_y}" x2="380" y2="{main_y}" class="d-line d-faint"/>')
s.text(380, main_y - 8, "main", "d-s d-m", "end")
s.add(f'<circle cx="44" cy="{main_y}" r="4" class="d-green d-fill"/>')
s.text(44, main_y - 8, "add 3 worktrees", "d-s")
lanes = [("feat/user-auth", "../myapp-auth", 230, "blue"), ("fix/session-leak", "../myapp-session", 150, "rose"), ("refactor/db-layer", "../myapp-db", 280, "violet")]
for i, (branch, path, w, acc) in enumerate(lanes):
    y = 110 + i * 52
    s.add(f'<path d="M44,{main_y} L44,{y} L60,{y}" class="d-line d-faint"/>')
    s.text(64, y - 13, branch, "d-s d-m")
    s.add(f'<rect x="60" y="{y - 8}" width="{w}" height="16" rx="3" class="d-{acc} d-fill" opacity="0.8"/>')
    s.add(f'<circle cx="{60 + w + 12}" cy="{y}" r="4" class="d-{acc} d-fill"/>')
    s.text(60 + w + 22, y + 4, "PR", "d-s")
s.rule(232)
s.text(20, 254, "Each bar is one agent in its own directory. Finish in any order.", "d-s")
s.render()

# ── 3. What's shared (interactive: src/data/diagrams/worktree-shared.ts) ──
s = Svg("worktree-shared", 400, 318, "Inside the main .git directory, objects, refs including refs/stash, and config are shared by every worktree. A private folder under worktrees/ holds that worktree's own HEAD and index. The linked directory has a .git file pointing to that private folder, and its own working files")
s.text(20, 22, "What a linked worktree really is", "d-t")
s.text(20, 38, "Most of it lives in the main .git", "d-s")
s.add('<rect x="20" y="54" width="204" height="252" rx="8" class="d-ext"/>')
s.text(34, 76, "myapp/.git/", "d-s d-m")
s.add('<g data-node="shared">')
s.add('<rect x="32" y="86" width="180" height="108" rx="6" class="d-box"/>')
s.add('<circle cx="46" cy="104" r="4" class="d-amber d-fill"/>')
s.text(58, 108, "Shared by all", "d-t")
for i, line in enumerate(("objects/", "refs/heads/", "refs/stash", "config")):
    s.text(46, 128 + i * 16, line, "d-s d-m")
s.add("</g>")
s.add('<g data-node="private">')
s.add('<rect x="32" y="214" width="180" height="80" rx="6" class="d-box"/>')
s.add('<circle cx="46" cy="232" r="4" class="d-blue d-fill"/>')
s.text(58, 236, "Private to one", "d-t")
s.text(46, 254, "worktrees/feat-auth/", "d-s d-m")
s.text(60, 270, "HEAD", "d-s d-m")
s.text(60, 284, "index", "d-s d-m")
s.add("</g>")
s.add('<rect x="244" y="54" width="136" height="252" rx="8" class="d-ext"/>')
s.text(256, 76, "../feat-auth/", "d-s d-m")
s.box(254, 214, 116, 80, ".git", "A plain file", accent="blue", node="gitfile")
s.box(254, 86, 116, 80, "Working files", "Its own copy", accent="green", node="files")
s.arrow([(254, 254), (214, 254)], edge="gitfile-private")
s.arrow([(122, 214), (122, 196)], edge="private-shared")
s.render()

# ── 4. Characters to type, to scale ─────────────────────────────
s = Svg("worktree-keystrokes", 400, 276, "Characters to type for each task in the comparison table, to scale. worktrunk needs 17, 27 and 9 characters. Plain git needs 56, 66 and 68")
s.text(20, 22, "Characters to type", "d-t")
s.text(20, 38, "Counted from the commands in the table, to scale", "d-s")
tasks = [
    ("Create + switch", "wt switch -c feat", "git worktree add -b feat ../repo.feat && cd ../repo.feat"),
    ("Launch agent", "wt switch -c -x claude feat", "git worktree add -b feat ../repo.feat && cd ../repo.feat && claude"),
    ("Clean up", "wt remove", "cd ../repo && git worktree remove ../repo.feat && git branch -d feat"),
]
scale = 4.4
for i, (task, wt, git) in enumerate(tasks):
    y = 54 + i * 72
    s.text(20, y + 8, task, "d-t")
    for j, (name, cmd, cls) in enumerate((("wt", wt, "d-green d-fill"), ("git", git, "d-box"))):
        by = y + 18 + j * 20
        s.text(20, by + 11, name, "d-s d-m")
        s.add(f'<rect x="48" y="{by}" width="{len(cmd) * scale:.1f}" height="14" rx="2" class="{cls}"/>')
        s.text(round(48 + len(cmd) * scale + 6), by + 11, str(len(cmd)), "d-s")
s.render()
