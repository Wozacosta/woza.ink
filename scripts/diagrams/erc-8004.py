"""Diagram for the ERC-8004 post. Run: python3 scripts/diagrams/erc-8004.py"""
from diagram_lib import *

# ── 1. Three registries (interactive: src/data/diagrams/erc8004-registries.ts) ──
s = Svg("erc8004-registries", 400, 438, "Your agent meets a stranger and asks three onchain registries three questions. Identity is an ERC-721 NFT, Reputation stores client feedback, and Validation records third-party checks. Heavy data stays offchain, referenced by a URI and a KECCAK-256 hash")
s.text(20, 22, "Should I trust this agent?", "d-t")
s.box(20, 34, 360, 54, "Your agent", "meets a stranger, and claims are cheap", accent="rose", node="client")
s.add('<rect x="20" y="106" width="360" height="222" rx="8" class="d-ext"/>')
s.text(52, 126, "Onchain, one small contract each", "d-s")
registries = [
    ("identity", "Identity", "Who are you? An ERC-721 NFT per agent", "blue"),
    ("reputation", "Reputation", "What's your track record? Client feedback", "green"),
    ("validation", "Validation", "Can a third party verify it? Stake, zkML, TEE", "violet"),
]
for i, (node, title, sub, acc) in enumerate(registries):
    y = 136 + i * 62
    s.box(52, y, 296, 54, title, sub, accent=acc, node=node)
    s.arrow([(36, 88), (36, y + 27), (50, y + 27)], edge=f"client-{node}")
    s.arrow([(348, y + 27), (364, y + 27), (364, 370)], edge=f"{node}-offchain")
s.text(356, 354, "a URI and a KECCAK-256 hash", "d-s", "end")
s.box(20, 372, 360, 54, "Offchain", "Registration file, feedback, validation evidence", dashed=True, node="offchain")
s.render()
