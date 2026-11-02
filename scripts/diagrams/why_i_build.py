"""Diagrams for the Why I Build post. Run: python3 scripts/diagrams/why_i_build.py"""
from diagram_lib import *

# ── 1. One experiment (interactive: src/data/diagrams/build-experiment.ts) ──
s = Svg("build-experiment", 400, 388, "One experiment from start to finish. An idea gets a two-hour prototype, then a weekend MVP that ships. It then gets either a polish pass or a graceful sunset. Both end the same way: log one lesson and carry it into the next idea")
s.text(20, 22, "One experiment, either way it goes", "d-t")
s.text(20, 38, "Time goes in small bets, and every path ends in a lesson", "d-s")
s.box(20, 56, 170, 52, "Idea", "One feature, one goal", accent="violet", node="idea")
s.box(20, 136, 170, 52, "Two-hour prototype", "Is it worth a weekend?", accent="blue", node="prototype")
s.box(20, 216, 170, 52, "Weekend MVP", "Ship the core", accent="blue", node="mvp")
s.box(236, 150, 144, 52, "Polish pass", "It earned more time", accent="green", node="polish")
s.box(236, 230, 144, 52, "Graceful sunset", "It taught enough", accent="amber", node="sunset")
s.box(20, 324, 360, 44, "Log one concrete lesson", anchor="middle", node="lesson")
s.arrow([(105, 108), (105, 134)], edge="idea-prototype")
s.arrow([(105, 188), (105, 214)], edge="prototype-mvp")
s.arrow([(190, 242), (212, 242), (212, 176), (234, 176)], edge="mvp-polish")
s.arrow([(190, 242), (212, 242), (212, 256), (234, 256)], edge="mvp-sunset")
s.arrow([(380, 176), (392, 176), (392, 346), (382, 346)], edge="polish-lesson")
s.arrow([(308, 282), (308, 322)], edge="sunset-lesson")
s.arrow([(20, 346), (8, 346), (8, 82), (18, 82)], edge="lesson-idea")
s.render()

# ── 2. Compounding (interactive: src/data/diagrams/build-compound.ts) ──
s = Svg("build-compound", 400, 262, "Four small projects in a row. Each one teaches a micro-skill, drawn as a bar that starts at that project and runs on through every later one, so the last project starts with three skills in hand. A sketch, not a measurement")
s.text(20, 22, "Each project starts further along", "d-t")
s.text(20, 38, "A sketch, not a measurement", "d-s")
Xp = lambda i: 20 + i * 82
for i in range(4):
    s.text(Xp(i) + 45, 62, f"Project {i + 1}", "d-s", "middle")
    if i:
        s.add(f'<line x1="{Xp(i)}" y1="70" x2="{Xp(i)}" y2="232" class="d-line d-faint" stroke-dasharray="4 3"/>')
skills = (
    ("state", "State management", 0, "blue"),
    ("deploy", "Deployment gotchas", 1, "violet"),
    ("api", "API ergonomics", 2, "green"),
    ("models", "Mental models", 3, "amber"),
)
for row, (node, name, start, acc) in enumerate(skills):
    x, y = Xp(start), 74 + row * 40
    s.add(f'<g data-node="{node}">')
    s.add(f'<rect x="{x}" y="{y}" width="{380 - x}" height="32" rx="6" class="d-box"/>')
    s.add(f'<rect x="{x + 6}" y="{y + 7}" width="4" height="18" rx="2" class="d-{acc} d-fill"/>')
    s.text(x + 16, y + 20.5, name)
    s.add("</g>")
s.text(20, 252, "Learned once, and in hand for everything after", "d-s")
s.render()
