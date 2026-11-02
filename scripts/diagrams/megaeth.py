"""Diagrams for the MegaETH post. Run: python3 scripts/diagrams/megaeth.py"""
import math

from diagram_lib import *

# ── 1. Block times on a log scale ───────────────────────────────
s = Svg("megaeth-block-times", 400, 262, "Block times on a log scale: Ethereum about 12 seconds, Arbitrum and Optimism 250 milliseconds to 2 seconds, Solana about 400 milliseconds, MegaETH mini-blocks about 10 milliseconds")
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
    ("MegaETH", "~10 ms mini-blocks", 10, None, "green"),
]
for i, (name, value, ms, upper, acc) in enumerate(chains):
    y = 70 + i * 44
    s.text(20, y, name, "d-t")
    s.text(380, y, value, f"d-s d-{acc} d-ct", "end")
    if upper:
        s.add(f'<rect x="20" y="{y + 7}" width="{x_at(upper) - 20:.1f}" height="14" rx="3" class="d-{acc} d-fill" opacity="0.35"/>')
    s.add(f'<rect x="20" y="{y + 7}" width="{x_at(ms) - 20:.1f}" height="14" rx="3" class="d-{acc} d-fill" opacity="0.85"/>')
s.render()

# ── 2. Splitting up the node (interactive: src/data/diagrams/megaeth-roles.ts) ──
s = Svg("megaeth-roles", 400, 388, "A typical node does everything. MegaETH splits the roles: one sequencer orders and executes every transaction, provers re-execute blocks to produce proofs, full nodes re-execute every transaction to check it themselves, and replica nodes apply state diffs without re-executing and serve reads")
s.box(20, 16, 360, 54, "Typical node", "Executes, stores state, runs consensus, broadcasts", accent="rose", node="typical")
s.arrow([(200, 70), (200, 104)], "MegaETH splits that up", 210, 91, edge="typical-sequencer")
s.box(20, 106, 360, 54, "Sequencer", "One high-spec machine runs every transaction", accent="blue", node="sequencer")
trunk = 44
s.add(f'<line x1="{trunk}" y1="160" x2="{trunk}" y2="344" class="d-line"/>')
roles = [
    ("provers", "Provers", "Re-execute blocks and prove the results", "amber"),
    ("full", "Full nodes", "Re-execute every transaction themselves", "green"),
    ("replicas", "Replica nodes", "Apply state diffs, serve RPC and indexers", "violet"),
]
for i, (node, title, sub, acc) in enumerate(roles):
    y = 178 + i * 66
    s.box(70, y, 310, 54, title, sub, accent=acc, node=node)
    s.arrow([(trunk, y + 27), (68, y + 27)], edge=f"sequencer-{node}")
s.text(20, 378, "One machine does the work. Everyone else checks it or reads it.", "d-s")
s.render()

# ── 3. SALT: what the hot path touches ──────────────────────────
s = Svg("megaeth-salt", 400, 346, "On a standard EVM node, every transaction that touches storage makes four trips to disk: look up the account, look up the storage slot, update the trie and write back. With SALT the authentication tree fits in RAM, so the hot path of every transaction stays off disk, and only the cold path of full proofs and syncing a new node uses it")
s.text(20, 22, "Standard EVM node", "d-t")
s.text(20, 38, "A transaction that touches storage waits on disk", "d-s")
steps = ["Look up the account", "Look up the storage slot", "Update the trie", "Write back"]
for i, label in enumerate(steps):
    y = 50 + i * 32
    s.add(f'<rect x="20" y="{y}" width="196" height="26" rx="6" class="d-box"/>')
    s.text(34, y + 17, label, "d-s")
    s.arrow([(216, y + 13), (284, y + 13)])
s.box(286, 50, 94, 122, "Disk", accent="rose")
s.rule(190)
s.text(20, 216, "SALT", "d-t")
s.text(20, 232, "The authentication tree fits in memory", "d-s")
s.box(20, 244, 196, 44, "Every transaction", accent="green")
s.arrow([(216, 266), (284, 266)], "hot path", 250, 260, "middle")
s.box(286, 244, 94, 44, "RAM", accent="green")
s.box(20, 296, 196, 44, "Full proofs, node sync", accent="amber")
s.arrow([(216, 318), (284, 318)], "cold path", 250, 312, "middle", faint=True, dashed=True)
s.box(286, 296, 94, 44, "Disk", accent="amber")
s.render()

# ── 4. Blocks inside a block, to scale ──────────────────────────
s = Svg("megaeth-slots", 400, 220, "One Ethereum block of about 12 seconds drawn as a grid of 1,200 cells. Each cell is one MegaETH mini-block of about 10 milliseconds. A 250 millisecond Arbitrum block fills 25 cells and a 2 second Optimism block fills 200")
s.text(20, 22, "One Ethereum block, to scale", "d-t")
s.text(20, 38, "Each cell is one mini-block, about 10 ms: 1,200 fit in 12 s", "d-s")
cell, cols, rows = 6, 60, 20
x0, y0 = 20, 50
s.add(f'<rect x="{x0}" y="{y0}" width="{cols * cell}" height="{rows * cell}" class="d-box"/>')
s.add(f'<rect x="{x0}" y="{y0}" width="{cols * cell}" height="{10 * cell / 3:.1f}" class="d-amber d-fill" opacity="0.5"/>')
s.add(f'<rect x="{x0}" y="{y0}" width="{25 * cell}" height="{cell}" class="d-violet d-fill" opacity="0.85"/>')
s.add(f'<rect x="{x0}" y="{y0}" width="{cell}" height="{cell}" class="d-green d-fill"/>')
for i in range(1, cols):
    s.add(f'<line x1="{x0 + i * cell}" y1="{y0}" x2="{x0 + i * cell}" y2="{y0 + rows * cell}" class="d-line d-faint" style="stroke-width:.4"/>')
for i in range(1, rows):
    s.add(f'<line x1="{x0}" y1="{y0 + i * cell}" x2="{x0 + cols * cell}" y2="{y0 + i * cell}" class="d-line d-faint" style="stroke-width:.4"/>')
legend = [("green", "Mini-block", "1 cell"), ("violet", "Arbitrum, 250 ms", "25 cells"), ("amber", "Optimism, 2 s", "200 cells")]
for i, (acc, name, count) in enumerate(legend):
    x = 20 + i * 124
    s.add(f'<rect x="{x}" y="184" width="10" height="10" class="d-{acc} d-fill"/>')
    s.text(x + 15, 193, name, "d-s")
    s.text(x + 15, 209, count, f"d-s d-{acc} d-ct")
s.render()

# ── 5. A transaction's path (interactive: src/data/diagrams/megaeth-path.ts) ──
s = Svg("megaeth-path", 400, 374, "A transaction on MegaETH. An RPC endpoint checks it and forwards it to the sequencer. The sequencer executes it and seals a mini-block about every 10 milliseconds. RPC nodes receive the stream, so the result is queryable. About every second an EVM block bundles the mini-blocks. Block data goes to EigenDA, and a certificate goes to Ethereum")
stages = [
    ("rpc", "RPC endpoint", "checks it, forwards it", "blue", ""),
    ("sequencer", "Sequencer", "executes, seals a mini-block", "violet", "~10 ms"),
    ("stream", "RPC nodes", "receive it, result is queryable", "green", "at once"),
    ("evm", "EVM block", "bundles the mini-blocks", "amber", "~1 s"),
    ("l1", "EigenDA, then Ethereum", "data, then a certificate on L1", "rose", "later"),
]
for i, (node, title, sub, acc, when) in enumerate(stages):
    y = 16 + i * 72
    s.box(20, y, 290, 54, title, sub, accent=acc, node=node)
    if when:
        s.text(380, y + 32, when, f"d-t d-{acc} d-ct", "end")
    if i < len(stages) - 1:
        s.arrow([(64, y + 54), (64, y + 70)], edge=f"{node}-{stages[i + 1][0]}")
s.render()

# ── 6. Three bets ───────────────────────────────────────────────
s = Svg("megaeth-bets", 400, 238, "Three approaches to a fast chain. MegaETH bets on one sequencer and raw sequential speed, settled on Ethereum. Monad runs parallel EVM execution across decentralized validators, giving up some throughput ceiling. Solana is already fast and already has liquidity")
s.text(20, 22, "Three answers to the same problem", "d-t")
rows = [
    ("MegaETH", "One sequencer, raw sequential speed", "Settles on Ethereum", "green"),
    ("Monad", "Parallel EVM, decentralized validators", "Lower throughput ceiling", "violet"),
    ("Solana", "Already fast, already has liquidity", "Its own L1", "amber"),
]
for i, (name, how, cost, acc) in enumerate(rows):
    y = 36 + i * 66
    s.add(f'<rect x="20" y="{y}" width="360" height="58" rx="8" class="d-box"/>')
    s.add(f'<circle cx="34" cy="{y + 19}" r="4" class="d-{acc} d-fill"/>')
    s.text(46, y + 23, name, "d-t")
    s.text(380 - 12, y + 23, cost, f"d-s d-{acc} d-ct", "end")
    s.text(46, y + 42, how, "d-s")
s.render()
