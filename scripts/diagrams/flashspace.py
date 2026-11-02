"""Diagram for the Flashspace post. Run: python3 scripts/diagrams/flashspace.py"""
from diagram_lib import *

# ── 1. Four workspaces, eight keybindings ───────────────────────
s = Svg("flashspace-spaces", 400, 244, "Four spaces, each one keystroke away. Alt+1 is the terminal with Ghostty, Alt+2 the browser with Firefox, Alt+3 communication with Slack, Discord and email, and Alt+4 everything else. Alt+Shift plus a number moves the focused window there")
spaces = [
    ("Alt+1", "Terminal", "Ghostty, tmux", "green"),
    ("Alt+2", "Browser", "Firefox", "blue"),
    ("Alt+3", "Communication", "Slack, Discord, email", "amber"),
    ("Alt+4", "Misc", "Finder, settings", "violet"),
]
for i, (keys, name, apps, acc) in enumerate(spaces):
    x = 20 + (i % 2) * 184
    y = 16 + (i // 2) * 88
    s.add(f'<rect x="{x}" y="{y}" width="176" height="80" rx="8" class="d-box"/>')
    s.add(f'<rect x="{x}" y="{y}" width="176" height="6" class="d-{acc} d-fill" opacity="0.8"/>')
    s.add(f'<rect x="{x + 14}" y="{y + 18}" width="46" height="20" rx="4" class="d-ext"/>')
    s.text(x + 37, y + 32, keys, "d-s d-m", "middle")
    s.text(x + 14, y + 56, name, "d-t")
    s.text(x + 14, y + 71, apps, "d-s")
s.rule(196)
s.text(20, 220, "Alt+Shift+number moves the focused window to that space.", "d-s")
s.render()
