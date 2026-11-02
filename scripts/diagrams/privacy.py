"""Diagram for the crypto privacy post. Run: python3 scripts/diagrams/privacy.py"""
from diagram_lib import *

# ── 1. Three fields, three mechanisms ───────────────────────────
s = Svg("monero-hidden", 400, 274, "A transparent chain shows the sender, the receiver and the amount. Monero hides each with its own mechanism: a ring signature for the sender, a one-time stealth address for the receiver, and RingCT for the amount")
s.text(20, 22, "On a transparent chain", "d-s")
s.text(176, 22, "On Monero", "d-s")
rows = [
    ("Sender", "0xd8dA…6045", "Ring signature", "One of a ring of 16"),
    ("Receiver", "0x3fC9…7FAD", "Stealth address", "One-time, per payment"),
    ("Amount", "1.5 ETH", "RingCT", "Committed, still balanced"),
]
for i, (field, shown, mechanism, how) in enumerate(rows):
    y = 34 + i * 70
    s.add(f'<rect x="20" y="{y}" width="140" height="58" rx="8" class="d-box"/>')
    s.text(34, y + 23, field, "d-s")
    s.text(34, y + 41, shown, "d-t d-m d-rose d-ct")
    s.arrow([(160, y + 29), (174, y + 29)])
    s.add(f'<rect x="176" y="{y}" width="204" height="58" rx="8" class="d-box"/>')
    s.add(f'<circle cx="190" cy="{y + 19}" r="4" class="d-green d-fill"/>')
    s.text(202, y + 23, mechanism, "d-t")
    s.text(202, y + 41, how, "d-s")
s.text(20, 264, "Mandatory for everyone: there's no transparent mode.", "d-s")
s.render()
