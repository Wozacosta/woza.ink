"""Diagram for the Flashspace post. Run: python3 scripts/diagrams/flashspace.py"""
from diagram_lib import *

# ── 1. Four workspaces, eight keybindings ───────────────────────
s = Svg("flashspace-spaces", 400, 244, "Four workspaces, each one keystroke away. Alt+1 is the terminal with Ghostty, Alt+2 the browser with Firefox, Alt+3 communication with Slack, Discord and email, and Alt+4 everything else. Alt+Shift plus a number moves the focused window there")
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
s.text(20, 220, "Alt+Shift+number moves the focused window to that workspace.", "d-s")
s.render()

# ── 2. What a keypress does (interactive: src/data/diagrams/flashspace-switch.ts) ──
s = Svg("flashspace-switch", 400, 272, "Pressing Alt+2 goes to Flashspace, which shows the workspace's apps and hides every other app. All of it happens on one macOS Space, so there is no transition")
s.text(20, 22, "What one keypress does", "d-t")
s.text(20, 38, "Workspaces are shown and hidden apps, not Spaces", "d-s")
s.box(20, 54, 100, 46, "Alt+2", anchor="middle", accent=None, node="key")
s.box(150, 54, 230, 46, "Flashspace", "Looks up workspace 2's apps", accent="violet", node="flashspace")
s.arrow([(120, 77), (148, 77)], edge="key-flashspace")
s.add('<rect x="20" y="130" width="360" height="130" rx="8" class="d-ext"/>')
s.box(34, 146, 160, 66, "Firefox", "Workspace 2: shown", accent="green", node="shown")
s.box(206, 146, 160, 66, "Everything else", "Hidden", dashed=True, node="hidden")
s.text(34, 240, "One macOS Space, so no transition", "d-t")
s.arrow([(200, 100), (200, 118), (114, 118), (114, 144)], edge="flashspace-shown")
s.arrow([(300, 100), (300, 144)], edge="flashspace-hidden")
s.render()

# ── 3. What each tool gave me ───────────────────────────────────
s = Svg("i3-tools-compare", 400, 258, "A table comparing i3, Aerospace and Flashspace. Instant workspaces: yes for i3 and Flashspace, a beat of delay on Aerospace. Apps go to their workspace and keyboard control: yes for all three. A tiling tree: yes for i3 and Aerospace, no for Flashspace. Fights macOS: Aerospace sometimes, Flashspace no")
s.text(20, 22, "What each tool gave me", "d-t")
s.text(20, 38, "On my setup, not a benchmark", "d-s")
cols = [("i3", 206), ("Aerospace", 276), ("Flashspace", 354)]
for name, x in cols:
    s.text(x, 64, name, "d-s", "middle")
s.add('<line x1="20" y1="72" x2="380" y2="72" class="d-line d-faint"/>')
rows = [
    ("Instant workspaces", ("yes", ("a beat", "amber"), "yes")),
    ("Apps follow rules", ("yes", "yes", "yes")),
    ("Keyboard-first", ("yes", "yes", "yes")),
    ("A tiling tree", ("yes", "yes", "no")),
    ("Fights macOS", ("n/a", ("at times", "amber"), ("no", "green"))),
]
for i, (name, cells) in enumerate(rows):
    y = 96 + i * 34
    s.text(20, y, name, "d-t")
    for (_, x), cell in zip(cols, cells):
        if cell == "yes":
            s.text(x, y, "✓", "d-t d-green d-ct", "middle")
        elif cell == "no":
            s.text(x, y, "✗", "d-t d-rose d-ct", "middle")
        elif cell == "n/a":
            s.text(x, y, "n/a", "d-s", "middle")
        else:
            s.text(x, y, cell[0], f"d-s d-{cell[1]} d-ct", "middle")
    if i < len(rows) - 1:
        s.add(f'<line x1="20" y1="{y + 13}" x2="380" y2="{y + 13}" class="d-line d-faint"/>')
s.render()

# ── 4. Spaces against Aerospace's workspaces ────────────────────
s = Svg("i3-workspace-models", 400, 258, "Two wireframes. macOS Spaces slide a whole desktop in with an animation that can't be turned off. Aerospace keeps one Space and parks the windows of inactive workspaces off-screen, in a bottom corner")
s.text(20, 22, "Two ways to get a workspace", "d-t")
s.text(20, 38, "Wireframes of what happens on a switch", "d-s")
s.text(20, 66, "macOS Spaces", "d-t")
s.add('<rect x="20" y="78" width="120" height="84" rx="4" class="d-box"/>')
s.add('<rect x="30" y="90" width="72" height="50" rx="3" class="d-blue d-fill" opacity="0.3"/>')
s.add('<rect x="146" y="78" width="46" height="84" rx="4" class="d-ext"/>')
s.add('<rect x="154" y="90" width="38" height="50" rx="3" class="d-violet d-fill" opacity="0.3"/>')
s.arrow([(166, 172), (118, 172)])
s.text(20, 192, "The whole desktop slides in", "d-s")
s.text(20, 208, "Slow, and it can't be turned off", "d-s d-rose d-ct")
s.text(208, 66, "Aerospace", "d-t")
s.add('<rect x="208" y="78" width="160" height="84" rx="4" class="d-box"/>')
s.add('<rect x="218" y="90" width="66" height="50" rx="3" class="d-blue d-fill" opacity="0.3"/>')
s.add('<rect x="290" y="90" width="66" height="50" rx="3" class="d-blue d-fill" opacity="0.3"/>')
s.add('<rect x="362" y="152" width="30" height="22" rx="3" class="d-violet d-fill" opacity="0.5"/>')
s.text(208, 192, "One Space, windows parked", "d-s")
s.text(208, 208, "off-screen in a bottom corner", "d-s")
s.rule(222)
s.text(20, 246, "Neither is what Flashspace does, as you'll see.", "d-s")
s.render()
