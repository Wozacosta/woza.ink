"""Diagrams for the MegaETH post. Run: python3 scripts/diagrams/megaeth.py"""
import math

from diagram_lib import *

# ── 1. Block times on a log scale ───────────────────────────────
s = Svg("megaeth-block-times", 400, 262, "Block times on a log scale: Ethereum about 12 seconds, Arbitrum and Optimism 250 milliseconds to 2 seconds, Solana about 400 milliseconds, MegaETH under 10 milliseconds")
s.text(20, 22, "Block time, log scale", "d-t")
s.text(20, 38, "Each gridline is ten times longer than the last", "d-s")
x_at = lambda ms: 20 + math.log10(ms) * 85
for ms, label in ((1, "1 ms"), (10, "10 ms"), (100, "100 ms"), (1000, "1 s"), (10000, "10 s")):
    x = x_at(ms)
    s.add(f'<line x1="{x}" y1="54" x2="{x}" y2="232" class="d-line d-faint" stroke-dasharray="3 3"/>')
    s.text(x, 248, label, "d-s", "start" if ms == 1 else "middle")
chains = [
    ("Ethereum", "~12 s", 12000, None, "rose"),
    ("Arbitrum / Optimism", "250 ms–2 s", 250, 2000, "amber"),
    ("Solana", "~400 ms", 400, None, "violet"),
    ("MegaETH", "<10 ms", 10, None, "green"),
]
for i, (name, value, ms, upper, acc) in enumerate(chains):
    y = 70 + i * 44
    s.text(20, y, name, "d-t")
    s.text(380, y, value, f"d-s d-{acc} d-ct", "end")
    if upper:
        s.add(f'<rect x="20" y="{y + 7}" width="{x_at(upper) - 20:.1f}" height="14" rx="3" class="d-{acc} d-fill" opacity="0.35"/>')
    s.add(f'<rect x="20" y="{y + 7}" width="{x_at(ms) - 20:.1f}" height="14" rx="3" class="d-{acc} d-fill" opacity="0.85"/>')
s.render()

# ── 2. Splitting up the node ────────────────────────────────────
s = Svg("megaeth-roles", 400, 330, "A typical node does everything. MegaETH splits the roles: one sequencer executes every transaction, full nodes verify its results without re-executing, and replica nodes stream state diffs to serve reads")
s.box(20, 16, 360, 54, "Typical node", "Executes, stores state, runs consensus, broadcasts", accent="rose")
s.arrow([(200, 70), (200, 104)], "MegaETH splits that up", 210, 91)
s.box(20, 106, 360, 54, "Sequencer", "One high-spec machine runs every transaction", accent="blue")
s.arrow([(106, 160), (106, 210)], "results", 116, 189)
s.arrow([(294, 160), (294, 210)], "state diffs", 304, 189)
s.box(20, 212, 172, 64, "Full nodes", "Verify, don't re-execute", accent="green")
s.text(46, 266, "Modest hardware", "d-s")
s.box(208, 212, 172, 64, "Replica nodes", "Serve RPC and indexers", accent="violet")
s.text(234, 266, "No verification work", "d-s")
s.rule(294)
s.text(20, 318, "One machine does the work. Everyone else checks it or reads it.", "d-s")
s.render()
