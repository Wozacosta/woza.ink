"""Diagram for the clear signing post. Run: python3 scripts/diagrams/clear_signing.py"""
from diagram_lib import *

# ── 1. From calldata to the screen ──────────────────────────────
s = Svg("clear-signing-render", 400, 372, "The wallet takes the transaction's calldata and the ERC-7730 descriptor for that contract, checks that the descriptor is bound to the contract, and applies its formats. The screen says Approve, Uniswap Universal Router, Unlimited USDC. With no matching format it shows Unknown function and the raw arguments")
s.box(20, 16, 172, 54, "Calldata", "0x095ea7b3…", accent="rose")
s.box(208, 16, 172, 54, "Descriptor", "ERC-7730, per contract", accent="blue")
s.arrow([(106, 70), (106, 104)])
s.arrow([(294, 70), (294, 104)])
s.box(20, 106, 360, 54, "Wallet's parser", "Checks the binding, then applies each field's format", accent="violet")
s.arrow([(200, 160), (200, 194)], "plain words", 210, 181)
s.add('<rect x="66" y="196" width="268" height="102" rx="12" class="d-box"/>')
s.text(86, 224, "Approve", "d-t")
s.text(86, 250, "Spender", "d-s")
s.text(142, 250, "Uniswap Universal Router", "d-t")
s.text(86, 274, "Amount", "d-s")
s.text(142, 274, "Unlimited USDC", "d-t d-rose d-ct")
s.rule(318)
s.text(20, 342, "No matching format? \"Unknown function\" and the raw arguments.", "d-s")
s.text(20, 360, "Never a format borrowed from something nearby.", "d-s")
s.render()
