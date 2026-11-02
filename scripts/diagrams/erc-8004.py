"""Diagram for the ERC-8004 post. Run: python3 scripts/diagrams/erc-8004.py"""
from diagram_lib import *

# ── 1. Three registries ─────────────────────────────────────────
s = Svg("erc8004-registries", 400, 372, "Three onchain registries answer three questions about an agent. Identity is an ERC-721 NFT, Reputation stores client feedback, and Validation records third-party checks. Heavy data stays offchain, referenced by a URI and a KECCAK-256 hash")
s.text(20, 22, "Should I trust this agent?", "d-t")
s.add('<rect x="20" y="36" width="360" height="222" rx="8" class="d-ext"/>')
s.text(34, 56, "Onchain, one small contract each", "d-s")
s.box(34, 66, 332, 54, "Identity", "Who are you? An ERC-721 NFT per agent", accent="blue")
s.box(34, 128, 332, 54, "Reputation", "What's your track record? Client feedback", accent="green")
s.box(34, 190, 332, 54, "Validation", "Can a third party verify it? Stake, zkML, TEE", accent="violet")
s.arrow([(200, 258), (200, 300)], "a URI and a KECCAK-256 hash", 210, 283)
s.box(20, 302, 360, 54, "Offchain", "Agent registration file, validation evidence", dashed=True)
s.render()
