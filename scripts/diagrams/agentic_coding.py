"""Diagrams for the agentic coding series. Run: python3 scripts/diagrams/agentic_coding.py"""
from diagram_lib import *

# ── 1. What's in the context window ─────────────────────────────
s = Svg("context-window", 400, 372, "Hours into a session the context window is full of system instructions, rules, a skill, project docs, tool output and conversation. A fresh session starts with only system instructions, rules and what you load for the task, with the rest of the window free")


def stack(s, x, segments, top=54, width=170):
    y = top
    for label, height, acc in segments:
        if acc:
            s.add(f'<rect x="{x}" y="{y}" width="{width}" height="{height}" class="d-{acc} d-fill" opacity="0.22"/>')
        s.text(x + width / 2, y + height / 2 + 4, label, "d-s", "middle")
        y += height
        if y < top + 264:
            s.add(f'<line x1="{x}" y1="{y}" x2="{x + width}" y2="{y}" class="d-line d-faint"/>')
    s.add(f'<rect x="{x}" y="{top}" width="{width}" height="264" rx="6" class="d-ext"/>')


s.text(20, 22, "Hours into one session", "d-t")
s.text(20, 38, "Long conversations degrade", "d-s")
stack(s, 20, [
    ("System instructions", 26, "blue"),
    ("Rules", 30, "green"),
    ("A skill", 40, "amber"),
    ("Project docs", 32, "violet"),
    ("Tool output", 62, "rose"),
    ("Conversation", 74, "rose"),
])
s.text(210, 22, "A fresh session", "d-t")
s.text(210, 38, "Back to what you wrote down", "d-s")
stack(s, 210, [
    ("System instructions", 26, "blue"),
    ("Rules", 30, "green"),
    ("Docs for this task", 32, "violet"),
    ("Room to work", 176, None),
])
s.rule(332)
s.text(20, 356, "Not to scale. There's no memory: only what's in the window.", "d-s")
s.render()

# ── 2. When each layer is active ────────────────────────────────
s = Svg("agent-layers", 400, 262, "Across one session rules are on the whole time, a command runs when you trigger it, such as create-story, and a skill such as dev-story loads when the task matches it")
s.text(20, 22, "One session, writing a feature", "d-t")
s.text(20, 38, "When each layer is in play", "d-s")
left, right = 112, 380
lanes = [("Rules", "Always on"), ("Commands", "You trigger them"), ("Skills", "Task type matches")]
for i, (name, how) in enumerate(lanes):
    y = 76 + i * 56
    s.text(20, y, name, "d-t")
    s.text(20, y + 15, how, "d-s")
    s.add(f'<line x1="{left}" y1="{y - 3}" x2="{right}" y2="{y - 3}" class="d-line d-faint"/>')
s.add(f'<rect x="{left}" y="60" width="{right - left}" height="28" rx="4" class="d-green d-fill" opacity="0.8"/>')
s.add(f'<rect x="{left + 20}" y="116" width="84" height="28" rx="4" class="d-blue d-fill" opacity="0.8"/>')
s.add(f'<rect x="{left + 116}" y="172" width="{right - left - 116}" height="28" rx="4" class="d-violet d-fill" opacity="0.8"/>')
s.text(left + 62, 134, "/create-story", "d-s d-m", "middle", 'style="fill:var(--background,#faf8f5)"')
s.text(left + 116 + (right - left - 116) / 2, 190, "dev-story", "d-s d-m", "middle", 'style="fill:var(--background,#faf8f5)"')
s.arrow([(left, 224), (right, 224)])
s.text(left, 242, "start", "d-s")
s.text(right, 242, "time", "d-s", "end")
s.render()
