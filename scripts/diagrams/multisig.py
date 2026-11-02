"""Diagrams for the multisig post. Run: python3 scripts/diagrams/multisig.py"""
from diagram_lib import *


def key(s, x, y, needed):
    cls = "d-green d-stroke" if needed else "d-faint"
    s.add(f'<circle cx="{x + 5}" cy="{y}" r="4.5" class="d-line {cls}"/>')
    s.add(f'<path d="M{x + 9.5},{y} h13 M{x + 18},{y} v4 M{x + 22},{y} v4" class="d-line {cls}"/>')


# ── 1. What each quorum buys you ────────────────────────────────
s = Svg("multisig-quorums", 400, 276, "Compared with one key, 1-of-2 lets you lose a key but is easier to steal from. 3-of-3 needs three stolen keys but one lost key is fatal. 2-of-3 is the smallest setup that improves both: a thief needs two keys and you can lose one")
s.text(240, 22, "Thief needs", "d-s", "middle")
s.text(332, 22, "You can lose", "d-s", "middle")
rows = [("1 key", 1, 1, None, None), ("1-of-2", 1, 2, "rose", "green"), ("2-of-3", 2, 3, "green", "green"), ("3-of-3", 3, 3, "green", "rose")]
for i, (label, m, n, thief, lose) in enumerate(rows):
    y = 58 + i * 46
    if label == "2-of-3":
        s.add(f'<rect x="20" y="{y - 22}" width="360" height="44" rx="6" class="d-green d-fill" opacity="0.1"/>')
    s.text(32, y + 4.5, label, "d-t")
    for k in range(n):
        key(s, 92 + k * 30, y, k < m)
    s.text(240, y + 4.5, str(m), f"d-t d-{thief} d-ct" if thief else "d-t", "middle")
    s.text(332, y + 4.5, str(n - m), f"d-t d-{lose} d-ct" if lose else "d-t", "middle")
s.rule(232)
s.text(20, 256, "2-of-3 is the smallest setup that improves both.", "d-t")
s.render()

# ── 2. How Bybit lost $1.44 billion ─────────────────────────────
s = Svg("multisig-bybit", 400, 418, "Attackers modified the multisig frontend. Signers saw a routine transfer while the payload replaced the wallet's code. Hardware wallets showed only a hash, so nobody could compare the two. The threshold was met, every signature was valid, and 1.44 billion dollars left the wallet")
s.box(20, 16, 360, 54, "Compromised frontend", "Attackers modified the multisig UI's JavaScript", accent="rose")
s.arrow([(106, 70), (106, 104)])
s.arrow([(294, 70), (294, 104)])
s.box(20, 106, 172, 54, "Screen showed", "A routine transfer", accent="green")
s.box(208, 106, 172, 54, "Payload held", "Replace the wallet's code", accent="rose")
s.arrow([(106, 160), (106, 194)])
s.arrow([(294, 160), (294, 194)])
s.box(20, 196, 360, 54, "Hardware wallets", "Showed a hash, so nobody could compare the two", accent="amber")
s.arrow([(200, 250), (200, 284)], "signed", 210, 271)
s.box(20, 286, 360, 54, "The multisig", "Threshold met, every signature valid", accent="green")
s.rule(358)
s.text(20, 382, "$1.44 billion gone, and no key was ever stolen.", "d-t")
s.text(20, 400, "Multisig guards signatures. The attack came through the display.", "d-s")
s.render()
