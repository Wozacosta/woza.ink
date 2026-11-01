"""Diagrams for the Kohaku post. Run: python3 scripts/diagrams/kohaku.py"""
from diagram_lib import *

# ── 1. Where a wallet leaks ─────────────────────────────────────
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
s.box(20, top + total / 2 - 28, 74, 56, "Wallet", anchor="middle")
for i, (name, leak, fix) in enumerate(rows):
    y = top + i * (height + gap)
    s.add(f'<rect x="130" y="{y}" width="250" height="{height}" rx="8" class="d-box"/>')
    s.text(144, y + 21, name, "d-t")
    s.text(144, y + 38, leak, "d-s d-rose d-ct")
    s.text(144, y + 54, fix, "d-s d-green d-ct")
    s.arrow([(94, top + total / 2), (112, top + total / 2), (112, y + height / 2), (128, y + height / 2)])
s.render()

# ── 2. A shielded withdrawal through ERC-4337 ───────────────────
s = Svg("kohaku-withdraw", 400, 428, "An ordinary address deposits into a shielded pool, in public. A proof goes to a bundler, a paymaster covers gas out of the withdrawal, and a fresh address with no ETH receives the funds. Nothing visible connects the deposit to the withdrawal")
s.box(20, 16, 360, 54, "Your address", "Public, with a history", accent="rose")
s.arrow([(200, 70), (200, 104)], "deposit, visible onchain", 210, 91)
s.box(20, 106, 360, 54, "Shielded pool", "Holds everyone's deposits together", accent="blue")
s.arrow([(200, 160), (200, 194)], "proof, not your address", 210, 181)
s.box(20, 196, 360, 54, "Bundler and paymaster", "Submits the proof, takes gas from the withdrawal", accent="violet")
s.arrow([(200, 250), (200, 284)], "withdrawal", 210, 271)
s.box(20, 286, 360, 54, "Fresh address", "Holds no ETH, never needed any", accent="green")
s.add('<line x1="20" y1="362" x2="380" y2="362" class="d-line d-faint"/>')
s.text(20, 386, "Nothing visible connects the top box to the bottom one.", "d-t")
s.text(20, 406, "How well that hides you depends on who else is in the pool.", "d-s")
s.render()
