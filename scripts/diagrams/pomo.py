"""Diagrams for the Pomo post. Run: python3 scripts/diagrams/pomo.py"""
from diagram_lib import *

# ── 1. The timer hook (interactive: src/data/diagrams/pomo-timer.ts) ──
s = Svg("pomo-timer", 400, 318, "The useTimer hook as four states. Ready at 25 minutes goes to Running with start. Running goes to Stopped with stop, and back with start. The last tick takes Running to Done at zero. reset returns to Ready from Stopped or Done")
s.text(20, 22, "useTimer as four states", "d-t")
s.text(20, 38, "All it stores is secondsLeft and running", "d-s")
s.box(100, 60, 140, 52, "Ready", "25:00", accent="blue", node="ready")
s.box(100, 156, 140, 52, "Running", "-1 every second", accent="green", node="running")
s.box(290, 156, 90, 52, "Stopped", "Time kept", node="stopped")
s.box(100, 252, 140, 52, "Done", "0:00", accent="rose", node="done")
s.arrow([(170, 112), (170, 154)], "start()", 178, 138, edge="ready-running")
s.arrow([(240, 170), (288, 170)], "stop()", 264, 164, "middle", edge="running-stopped")
s.arrow([(290, 194), (242, 194)], "start()", 266, 208, "middle", edge="stopped-running")
s.arrow([(170, 208), (170, 250)], "last tick", 178, 234, edge="running-done")
s.arrow([(100, 278), (56, 278), (56, 86), (98, 86)], "reset()", 48, 186, "end", edge="done-ready")
s.arrow([(335, 156), (335, 86), (242, 86)], "reset()", 290, 78, "middle", edge="stopped-ready")
s.render()

# ── 2. What got cut ─────────────────────────────────────────────
s = Svg("pomo-features", 400, 222, "Three rejected features and the lighter thing Pomo does instead. A built-in music player became playlist links. Analytics dashboards became a count for the day. Push notifications for every session became nudges only when it matters")
s.text(20, 22, "Cut, and what's left in its place", "d-t")
s.text(20, 38, "Each feature had to help people focus", "d-s")
rows = [
    ("Built-in music player", "Too heavy", "Playlist links", "One tap, new tab"),
    ("Analytics dashboards", "Tempting, but noisy", "Today's count", "A quiet record"),
    ("Push notifications", "For every session", "Nudges", "Only when it matters"),
]
for i, (cut, why, kept, how) in enumerate(rows):
    y = 56 + i * 54
    s.box(20, y, 176, 46, cut, why, dashed=True)
    s.box(236, y, 144, 46, kept, how, accent="green")
    s.arrow([(196, y + 23), (234, y + 23)])
s.render()
