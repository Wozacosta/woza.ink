"""Diagrams for the Kohaku post. Run: python3 scripts/diagrams/kohaku.py"""
from diagram_lib import *

# ── 1. Where a wallet leaks (interactive: src/data/diagrams/kohaku-leaks.ts) ──
s = Svg("kohaku-leaks", 400, 366, "A wallet talks to four parties. The dapp sees the same address everywhere, the RPC sees your addresses and IP, the first hop of a broadcast sees which IP sent the transaction, and the chain shows everything forever. Each has a different fix: one address per dapp, a light client and private reads, P2P or Tor, and shielded pools")
s.text(20, 22, "Four places a wallet leaks", "d-t")
s.text(20, 38, "Each one has its own fix. Shielded pools only cover the last.", "d-s")
rows = [
    ("Dapp", "Sees one address everywhere", "One address per dapp"),
    ("RPC", "Sees your addresses and your IP", "Light client, private reads"),
    ("Broadcast", "Sees which IP sent it", "P2P network, Tor"),
    ("Chain", "Shows everything, forever", "Shielded pools"),
]
top, height, gap = 56, 66, 10
total = height * 4 + gap * 3
s.box(20, top + total / 2 - 28, 74, 56, "Wallet", anchor="middle", node="wallet")
for i, (name, leak, fix) in enumerate(rows):
    y = top + i * (height + gap)
    node = name.lower()
    s.add(f'<g data-node="{node}">')
    s.add(f'<rect x="130" y="{y}" width="250" height="{height}" rx="8" class="d-box"/>')
    s.text(144, y + 21, name, "d-t")
    s.text(144, y + 38, leak, "d-s d-rose d-ct")
    s.text(144, y + 54, fix, "d-s d-green d-ct")
    s.add("</g>")
    s.arrow([(94, top + total / 2), (112, top + total / 2), (112, y + height / 2), (128, y + height / 2)], edge=f"wallet-{node}")
s.render()

# ── 2. A shielded withdrawal through ERC-4337 (interactive: src/data/diagrams/kohaku-withdraw.ts) ──
s = Svg("kohaku-withdraw", 400, 428, "An ordinary address deposits into a shielded pool, in public. A proof goes to a bundler, a paymaster covers gas out of the withdrawal, and a fresh address with no ETH receives the funds. Nothing visible connects the deposit to the withdrawal")
s.box(20, 16, 360, 54, "Your address", "Public, with a history", accent="rose", node="address")
s.arrow([(200, 70), (200, 104)], "deposit, visible onchain", 210, 91, edge="address-pool")
s.box(20, 106, 360, 54, "Shielded pool", "Holds everyone's deposits together", accent="blue", node="pool")
s.arrow([(200, 160), (200, 194)], "proof, not your address", 210, 181, edge="pool-bundler")
s.box(20, 196, 360, 54, "Bundler and paymaster", "Submits the proof, takes gas from the withdrawal", accent="violet", node="bundler")
s.arrow([(200, 250), (200, 284)], "withdrawal", 210, 271, edge="bundler-fresh")
s.box(20, 286, 360, 54, "Fresh address", "Holds no ETH, never needed any", accent="green", node="fresh")
s.add('<line x1="20" y1="362" x2="380" y2="362" class="d-line d-faint"/>')
s.text(20, 386, "Nothing visible connects the top box to the bottom one.", "d-t")
s.text(20, 406, "How well that hides you depends on who else is in the pool.", "d-s")
s.render()

# ── 3. How the RPC undoes the pool ──────────────────────────────
s = Svg("kohaku-relink", 400, 300, "After a shielded withdrawal nothing onchain links the old address and the fresh one. But the wallet then asks one RPC for both balances from one IP, so that server can link them anyway")
s.text(20, 22, "After a shielded withdrawal", "d-t")
s.box(20, 36, 120, 44, "Old address", anchor="middle")
s.box(260, 36, 120, 44, "Fresh address", anchor="middle")
s.add('<line x1="142" y1="58" x2="258" y2="58" class="d-line d-faint" stroke-dasharray="3 4"/>')
s.text(200, 52, "no link onchain", "d-s d-green d-ct", "middle")
s.arrow([(80, 80), (80, 126)])
s.arrow([(320, 80), (320, 126)])
s.box(20, 128, 360, 54, "Your wallet", "Checks both balances", accent="blue")
s.arrow([(200, 182), (200, 228)], "one IP, both addresses", 210, 209)
s.box(20, 230, 360, 54, "The RPC", "Sees that the two go together", accent="rose")
s.render()

# ── 4. What each read fix solves ────────────────────────────────
s = Svg("kohaku-reads", 400, 298, "Four approaches to reading the chain, and the one problem each solves. A light client proves the answer is right. Tor hides your IP. TEE plus ORAM and PIR hide the question, the first by trusting Intel's hardware and the second with cryptography alone")
s.text(20, 22, "Four read fixes, one problem each", "d-t")
s.text(20, 38, "Filled: the problem it's built to solve", "d-s")
cols = [(206, "Validity"), (270, "Your IP"), (338, "Your question")]
for x, label in cols:
    s.text(x, 66, label, "d-s", "middle")
rows = [
    ("Light client", "Helios and Colibri", 0),
    ("Tor", "Browser-only for now", 1),
    ("TEE plus ORAM", "Trusts Intel's hardware", 2),
    ("PIR", "Cryptography alone", 2),
]
for i, (name, note, solved) in enumerate(rows):
    y = 76 + i * 54
    s.add(f'<rect x="20" y="{y}" width="360" height="46" rx="8" class="d-box"/>')
    s.text(34, y + 20, name, "d-t")
    s.text(34, y + 36, note, "d-s")
    for c, (x, _) in enumerate(cols):
        if c == solved:
            s.add(f'<circle cx="{x}" cy="{y + 23}" r="7" class="d-green d-fill"/>')
        else:
            s.add(f'<circle cx="{x}" cy="{y + 23}" r="6" class="d-line d-faint"/>')
s.render()

# ── 5. Two signatures on one account ────────────────────────────
s = Svg("kohaku-pq", 400, 214, "A post-quantum account checks two signatures on every operation, the current kind and a post-quantum one such as Falcon or ML-DSA. Both have to pass, so a break in either scheme alone isn't enough")
s.text(20, 22, "Two signatures, one account", "d-t")
s.box(20, 40, 170, 54, "Current signature", "today's kind", accent="blue")
s.box(210, 40, 170, 54, "Post-quantum", "Falcon or ML-DSA", accent="violet")
s.arrow([(105, 94), (105, 118), (200, 118), (200, 134)])
s.arrow([(295, 94), (295, 118), (200, 118), (200, 134)])
s.box(90, 136, 220, 54, "4337 account", "both must verify", accent="green", anchor="start")
s.text(200, 208, "Breaking one scheme alone isn't enough.", "d-s", "middle")
s.render()

# ── 6. The four leaks today ─────────────────────────────────────
s = Svg("kohaku-today", 400, 280, "The four leaks and how far Kohaku had got on November 1, 2026. Dapp: one address per dapp is on the roadmap. RPC: light client adapters exist and private reads are experimental. Broadcast: direct P2P sending is on the roadmap. Chain: Privacy Pools and Tornado Cash plugins are alpha, and Railgun is a placeholder")
s.text(20, 22, "The four leaks, November 1, 2026", "d-t")
s.text(20, 38, "A reading of the repositories, not a score", "d-s")
rows = [
    ("Dapp", "One address per dapp: roadmap", 0),
    ("RPC", "Light clients ship, private reads experimental", 1),
    ("Broadcast", "P2P sending: roadmap", 0),
    ("Chain", "Two pool plugins in alpha, Railgun a stub", 2),
]
stages = ["Planned", "Experimental", "Alpha"]
for i, label in enumerate(stages):
    s.text(170 + i * 86, 60, label, "d-s", "middle")
for i, (name, note, stage) in enumerate(rows):
    y = 72 + i * 50
    s.text(20, y + 24, name, "d-t")
    s.add(f'<line x1="170" y1="{y + 11}" x2="{170 + 86 * 2}" y2="{y + 11}" class="d-line d-faint"/>')
    for j in range(3):
        cls = "d-green d-fill" if j <= stage else "d-line d-faint"
        r = 6 if j <= stage else 5
        s.add(f'<circle cx="{170 + j * 86}" cy="{y + 11}" r="{r}" class="{cls}"/>')
    s.text(100, y + 40, note, "d-s")
s.render()
