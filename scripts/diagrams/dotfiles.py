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
