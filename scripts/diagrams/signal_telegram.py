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

# ── 2. What one stolen key opens ────────────────────────────────
s = Svg("signal-ratchet", 400, 214, "A sketch of a row of nine messages, each with its own key. A key is stolen at the fifth message. The four earlier messages stay locked, which is forward secrecy. The thief can read on until the next ratchet step, after which messages lock again, which is future secrecy")
s.text(20, 22, "Each message gets its own key", "d-t")
s.text(20, 38, "Stealing one doesn't open the conversation", "d-s")
pitch, size = 41.25, 30
xs = [20 + i * pitch for i in range(9)]
readable = (4, 5)
for i, x in enumerate(xs):
    cx = x + size / 2
    if i in readable:
        s.add(f'<rect x="{x}" y="98" width="{size}" height="{size}" rx="5" class="d-rose d-fill" opacity="0.85"/>')
    else:
        s.add(f'<rect x="{x}" y="98" width="{size}" height="{size}" rx="5" class="d-box"/>')
        lock(s, cx, 113, "green")
    if i < 8:
        s.add(f'<line x1="{x + size + 1}" y1="113" x2="{x + pitch - 2}" y2="113" class="d-line d-faint"/>')
stolen = xs[4] + size / 2
ratchet = xs[5] + size + (pitch - size) / 2
s.text(stolen, 62, "key stolen", "d-s d-rose d-ct", "middle")
s.arrow([(stolen, 68), (stolen, 96)])
s.text(ratchet, 80, "next ratchet step", "d-s d-violet d-ct", "middle")
s.add(f'<line x1="{ratchet}" y1="86" x2="{ratchet}" y2="134" class="d-line d-violet d-stroke" stroke-dasharray="3 3"/>')
groups = [(0, 3, "Forward secrecy", "Stay locked", "d-t"), (4, 5, "Readable", "By the thief", "d-t d-rose d-ct"), (6, 8, "Future secrecy", "Lock again", "d-t")]
for a, b, title, sub, cls in groups:
    x1, x2 = xs[a], xs[b] + size
    s.add(f'<path d="M{x1},142 v6 H{x2} v-6" class="d-line d-faint"/>')
    s.text((x1 + x2) / 2, 170, title, cls, "middle")
    s.text((x1 + x2) / 2, 186, sub, "d-s", "middle")
s.render()

# ── 3. One message, two designs (interactive: src/data/diagrams/messenger-flow.ts) ──
s = Svg("messenger-flow", 400, 342, "On Signal your device encrypts the message, the server passes on ciphertext and your friend's device decrypts it. In a Telegram cloud chat the message is encrypted only as far as Telegram's server, which holds the keys, reads the message and uses it for history, search, bots and sync before sending it on")
s.text(20, 22, "Signal", "d-t")
s.box(20, 34, 104, 54, "You", "Has the keys", accent="green", node="signalyou")
s.box(148, 34, 104, 54, "Server", "Can't read it", accent="green", node="signalserver")
s.box(276, 34, 104, 54, "Friend", "Has the keys", accent="green", node="signalfriend")
s.arrow([(124, 61), (146, 61)], edge="signalyou-signalserver")
s.arrow([(252, 61), (274, 61)], edge="signalserver-signalfriend")
s.rule(108)
s.text(20, 136, "Telegram cloud chat", "d-t")
s.box(20, 148, 104, 54, "You", "Transit only", accent="amber", node="tgyou")
s.box(148, 148, 104, 54, "Server", "Has the keys", accent="rose", node="tgserver")
s.box(276, 148, 104, 54, "Friend", "Transit only", accent="amber", node="tgfriend")
s.arrow([(124, 175), (146, 175)], edge="tgyou-tgserver")
s.arrow([(252, 175), (274, 175)], edge="tgserver-tgfriend")
s.arrow([(200, 202), (200, 240)], "reads the message", 210, 225, edge="tgserver-tgfeatures")
s.box(20, 242, 360, 54, "Stored on Telegram's servers", "History, search, bots and sync run on the plaintext", accent="rose", node="tgfeatures")
s.text(20, 322, "The same design that enables the features exposes the message.", "d-s")
s.render()
