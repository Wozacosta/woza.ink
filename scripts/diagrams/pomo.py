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

# ── 3. The screen (interactive: src/data/diagrams/pomo-screen.ts) ──
s = Svg("pomo-screen", 400, 322, "A wireframe of Pomo. The big countdown, here at 18:12, inside a thin progress ring takes the middle, with start, stop and skip under it, a short list of music links to the side, and today's count in small type")
s.text(20, 22, "Almost all of the screen is the clock", "d-t")
s.text(20, 38, "A sketch of what's described above", "d-s")
s.add('<rect x="20" y="52" width="360" height="256" rx="8" class="d-line d-faint"/>')
s.add('<g data-node="timer">')
s.add('<rect x="36" y="64" width="212" height="174" rx="8" class="d-ext"/>')
s.add('<circle cx="142" cy="150" r="72" class="d-line d-faint" stroke-width="5"/>')
s.add('<circle cx="142" cy="150" r="72" class="d-line d-rose d-stroke" stroke-width="5" stroke-dasharray="330 452" transform="rotate(-90 142 150)" stroke-linecap="round"/>')
s.text(142, 161, "18:12", "d-t", "middle", 'style="font-size:32px"')
s.add("</g>")
s.add('<g data-node="controls">')
s.add('<rect x="36" y="246" width="212" height="48" rx="8" class="d-ext"/>')
for x, label in ((46, "Start"), (112, "Stop"), (178, "Skip")):
    s.add(f'<rect x="{x}" y="256" width="60" height="28" rx="6" class="d-box"/>')
    s.text(x + 30, 274, label, "d-s", "middle")
s.add("</g>")
s.add('<g data-node="music">')
s.add('<rect x="260" y="64" width="108" height="130" rx="8" class="d-box"/>')
s.text(272, 86, "Music", "d-t")
for i in range(3):
    s.text(272, 110 + i * 24, "Playlist ↗", "d-s")
s.add("</g>")
s.add('<g data-node="count">')
s.add('<rect x="260" y="246" width="108" height="48" rx="8" class="d-ext"/>')
s.text(272, 266, "Today", "d-s")
s.add('<circle cx="277" cy="279" r="4" class="d-rose d-fill"/><circle cx="291" cy="279" r="4" class="d-rose d-fill"/><circle cx="305" cy="279" r="4" class="d-rose d-fill"/>')
s.add("</g>")
s.render()

# ── 4. Where things live (interactive: src/data/diagrams/pomo-data.ts) ──
s = Svg("pomo-data", 400, 300, "Vercel serves the app's files to the browser. After that the timer and the count stay in the browser's Local Storage, music opens in a new tab, and there's no backend to send anything to")
s.text(20, 22, "Your data stays in the browser", "d-t")
s.text(20, 38, "The dashed box is the part that doesn't exist", "d-s")
s.box(20, 56, 150, 52, "Vercel", "Serves the files", accent="blue", node="vercel")
s.box(200, 56, 180, 52, "Backend", "There isn't one", dashed=True, node="backend")
s.add('<g data-node="browser">')
s.add('<rect x="20" y="156" width="230" height="130" rx="8" class="d-box"/>')
s.add('<circle cx="34" cy="174" r="4" class="d-green d-fill"/>')
s.text(46, 178, "Your browser", "d-t")
s.add("</g>")
s.box(36, 192, 198, 38, "React app", node="app")
s.box(36, 238, 198, 38, "Local Storage", node="storage")
s.box(290, 185, 90, 52, "New tab", "Music", accent="amber", node="music")
s.arrow([(95, 108), (95, 154)], "HTML and JS", 103, 136, edge="vercel-browser")
s.arrow([(234, 211), (288, 211)], edge="app-music")
s.add('<path d="M135,230 V238" class="d-line" data-edge="app-storage"/>')
s.add('<path d="M226,156 V108 M221,127 l10,10 M231,127 l-10,10" class="d-line d-rose d-stroke" data-edge="app-backend"/>')
s.text(238, 136, "No requests", "d-s d-rose d-ct")
s.render()
