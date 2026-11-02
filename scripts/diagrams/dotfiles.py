"""Diagram for the dotfiles post. Run: python3 scripts/diagrams/dotfiles.py"""
from diagram_lib import *

# ── 1. What stow does ───────────────────────────────────────────
s = Svg("dotfiles-stow", 400, 264, "The files your tools read in your home directory are symlinks into the dotfiles repo, one package per tool")
s.text(20, 22, "Your home directory", "d-t")
s.text(20, 38, "Symlinks, where tools look", "d-s")
s.text(204, 22, "~/dotfiles", "d-t")
s.text(204, 38, "The git repo, one folder per tool", "d-s")
rows = [
    ("~/.zshrc", "zsh/.zshrc"),
    ("~/.gitconfig", "git/.gitconfig"),
    ("~/.config/nvim", "nvim/.config/nvim"),
    ("~/.config/ghostty", "ghostty/.config/ghostty"),
]
for i, (home, repo) in enumerate(rows):
    y = 54 + i * 42
    s.add(f'<rect x="20" y="{y}" width="148" height="34" rx="6" class="d-ext"/>')
    s.text(32, y + 21, home, "d-s d-m")
    s.add(f'<rect x="204" y="{y}" width="176" height="34" rx="6" class="d-box"/>')
    s.text(216, y + 21, repo, "d-s d-m")
    s.arrow([(168, y + 17), (202, y + 17)])
s.rule(228)
s.text(20, 252, "stow makes the links. The files only live in the repo.", "d-s")
s.render()

# ── 2. Three ways to do it ──────────────────────────────────────
s = Svg("dotfiles-approaches", 400, 272, "Three approaches. Making the home directory a git repo makes git status noise and lets you commit the wrong file. Manual symlinks take one command per file and are easy to forget. Stow takes one command per package")
s.text(20, 22, "Three ways to version a dotfile", "d-t")
s.text(20, 38, "What you type, and what it costs you", "d-s")
rows = [
    ("Make ~ a git repo", "git init ~", "git status is noise, easy to commit too much", "rose"),
    ("Symlink by hand", "ln -s ~/dotfiles/.zshrc ~/.zshrc", "One per file, easy to forget one", "amber"),
    ("GNU Stow", "stow zsh", "One command per package", "green"),
]
for i, (name, cmd, cost, acc) in enumerate(rows):
    y = 52 + i * 72
    s.add(f'<rect x="20" y="{y}" width="360" height="64" rx="8" class="d-box"/>')
    s.add(f'<circle cx="34" cy="{y + 18}" r="4" class="d-{acc} d-fill"/>')
    s.text(46, y + 22, name, "d-t")
    s.text(366, y + 22, cmd, "d-s d-m", "end")
    s.text(46, y + 48, cost, f"d-s d-{acc} d-ct")
s.render()

# ── 3. A new machine (interactive: src/data/diagrams/dotfiles-new-machine.ts) ──
s = Svg("dotfiles-new-machine", 400, 318, "One repo on GitHub is cloned to every machine. A laptop stows all four packages, a server stows only git and zsh. Either way the result is symlinks in the home directory that the tools read")
s.text(20, 22, "One repo, each machine picks", "d-t")
s.text(20, 38, "Clone everywhere, stow what that machine needs", "d-s")
s.box(20, 54, 360, 46, "you/dotfiles", "On GitHub, the one copy you edit and push", accent="violet", node="repo")
machines = [("laptop", "Laptop", 20, ("zsh", "git", "nvim", "ghostty")), ("server", "Server", 210, ("zsh", "git"))]
packages = ("zsh", "git", "nvim", "ghostty")
for node, name, x, stowed in machines:
    s.add(f'<g data-node="{node}">')
    s.add(f'<rect x="{x}" y="132" width="170" height="104" rx="8" class="d-box"/>')
    s.text(x + 14, 154, name, "d-t")
    s.text(x + 156, 154, f"stows {len(stowed)}", "d-s", "end")
    for i, pkg in enumerate(packages):
        cx, cy = x + 14 + (i % 2) * 74, 166 + (i // 2) * 30
        s.add(f'<rect x="{cx}" y="{cy}" width="68" height="24" rx="5" class="{"d-green d-fill" if pkg in stowed else "d-ext"}"{" opacity=\"0.25\"" if pkg in stowed else ""}/>')
        s.text(cx + 34, cy + 16, pkg, "d-s d-m", "middle")
    s.add("</g>")
    s.arrow([(x + 85, 100), (x + 85, 130)], "clone", x + 93, 120, edge=f"repo-{node}")
    s.arrow([(x + 85, 236), (x + 85, 262)], edge=f"{node}-links")
s.box(20, 264, 360, 44, "Symlinks in ~", "Your tools read them as if nothing changed", accent="amber", node="links")
s.render()
