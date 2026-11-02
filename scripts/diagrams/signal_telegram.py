"""Diagram for the Signal vs Telegram post. Run: python3 scripts/diagrams/signal_telegram.py"""
from diagram_lib import *


def lock(s, x, y, accent):
    s.add(f'<rect x="{x - 9}" y="{y - 9}" width="18" height="18" rx="4" class="d-box"/>')
    s.add(f'<path d="M{x - 3},{y - 1} v-2 a3,3 0 0 1 6,0 v2" class="d-line d-{accent} d-stroke"/>')
    s.add(f'<rect x="{x - 4.5}" y="{y - 1}" width="9" height="6" rx="1" class="d-{accent} d-fill"/>')


# ── 1. What the server sees ─────────────────────────────────────
s = Svg("messenger-servers", 400, 318, "Signal encrypts every chat end to end, so its server only sees ciphertext. Telegram's default cloud chats are encrypted in transit but Telegram holds the keys and can read everything. Telegram's secret chats are end to end, but opt-in and one-to-one")
rows = [
    ("Signal", "Every chat, by default", "green", "sees ciphertext only", "green"),
    ("Telegram cloud chat", "The default", "amber", "holds the keys, reads everything", "rose"),
    ("Telegram secret chat", "Opt-in, one-to-one, one device pair", "green", "sees ciphertext only", "green"),
]
for i, (name, note, wire, sees, tone) in enumerate(rows):
    y = 22 + i * 90
    s.text(20, y, name, "d-t")
    s.text(380, y, note, "d-s", "end")
    cy = y + 31
    s.box(20, y + 12, 70, 38, "You", anchor="middle")
    s.box(160, y + 12, 80, 38, "Server", anchor="middle")
    s.box(310, y + 12, 70, 38, "Friend", anchor="middle")
    s.arrow([(90, cy), (158, cy)])
    s.arrow([(240, cy), (308, cy)])
    lock(s, 123, cy, wire)
    lock(s, 273, cy, wire)
    s.text(200, y + 67, sees, f"d-s d-{tone} d-ct", "middle")
s.rule(282)
s.text(20, 306, "Encrypted in transit is not end-to-end.", "d-t")
s.render()
