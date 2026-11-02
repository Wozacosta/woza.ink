"""Diagrams for the clear signing post. Run: python3 scripts/diagrams/clear_signing.py"""
from diagram_lib import *

# ── 1. From calldata to the screen (interactive: src/data/diagrams/clear-signing-render.ts) ──
s = Svg("clear-signing-render", 400, 392, "The wallet takes the transaction's calldata and the ERC-7730 descriptor for that contract, checks that the descriptor is bound to the contract, and applies its formats. The screen says Approve, Uniswap Universal Router, Unlimited USDC. With no matching format it shows Unknown function and the raw arguments")
s.box(20, 16, 172, 54, "Calldata", "0x095ea7b3…", accent="rose", node="calldata")
s.box(208, 16, 172, 54, "Descriptor", "ERC-7730, per contract", accent="blue", node="descriptor")
s.arrow([(106, 70), (106, 104)], edge="calldata-parser")
s.arrow([(294, 70), (294, 104)], edge="descriptor-parser")
s.box(20, 106, 360, 54, "Wallet's parser", "Checks the binding, then applies each field's format", accent="violet", node="parser")
s.arrow([(170, 160), (170, 194)], "format found", 180, 181, edge="parser-screen")
s.arrow([(352, 160), (352, 306)], "no format", 344, 181, "end", edge="parser-fallback")
s.add('<g data-node="screen">')
s.add('<rect x="20" y="196" width="300" height="102" rx="12" class="d-box"/>')
s.text(40, 224, "Approve", "d-t")
s.text(40, 250, "Spender", "d-s")
s.text(96, 250, "Uniswap Universal Router", "d-t")
s.text(40, 274, "Amount", "d-s")
s.text(96, 274, "Unlimited USDC", "d-t d-rose d-ct")
s.add("</g>")
s.box(20, 308, 360, 54, "Safe fallback", "\"Unknown function\" and the raw arguments", accent="amber", node="fallback")
s.text(20, 384, "Never a format borrowed from something nearby.", "d-s")
s.render()

# ── 2. Bybit, replayed with a descriptor ────────────────────────
s = Svg("clear-signing-bybit", 400, 356, "A Safe execTransaction has ten parameters. With the Safe descriptor, the enum format turns operation 1 into Delegate Call, and the calldata format looks up the nested call, finds no descriptor for its target and shows it as unknown. The device says Sign multisig operation, Delegate Call, Unknown function, where Bybit's signers saw a hash")
s.text(20, 22, "Safe execTransaction: ten parameters", "d-t")
s.text(20, 38, "Two of them decide what the device says", "d-s")
for i in range(10):
    x = round(20 + i * 36.44, 1)
    if i == 2:
        s.add(f'<rect x="{x}" y="50" width="32" height="22" rx="4" class="d-amber d-fill" opacity="0.85"/>')
    elif i == 3:
        s.add(f'<rect x="{x}" y="50" width="32" height="22" rx="4" class="d-rose d-fill" opacity="0.85"/>')
    else:
        s.add(f'<rect x="{x}" y="50" width="32" height="22" rx="4" class="d-box"/>')
s.arrow([(106, 72), (106, 124)])
s.arrow([(145, 72), (145, 92), (294, 92), (294, 124)])
s.text(98, 102, "data", "d-s d-m d-amber d-ct", "end")
s.text(153, 86, "operation = 1", "d-s d-m d-rose d-ct")
s.box(20, 126, 172, 68, "calldata format", "Looks up the inner call", accent="amber")
s.text(46, 184, "Finds no descriptor", "d-s")
s.box(208, 126, 172, 68, "enum format", "0 Call, 1 Delegate Call", accent="rose")
s.text(234, 184, "Finds Delegate Call", "d-s")
s.arrow([(106, 194), (106, 224)])
s.arrow([(294, 194), (294, 224)])
s.add('<rect x="20" y="226" width="360" height="94" rx="12" class="d-box"/>')
s.text(40, 252, "Sign multisig operation", "d-t")
s.text(40, 276, "Operation type", "d-s")
s.text(136, 276, "Delegate Call", "d-t d-rose d-ct")
s.text(40, 300, "Transaction", "d-s")
s.text(136, 300, "Unknown function", "d-t d-rose d-ct")
s.text(20, 346, "Without the descriptor, this screen was a hash.", "d-t")
s.render()

# ── 3. Plugins vs a parser plus data ────────────────────────────
s = Svg("clear-signing-parser", 400, 436, "With plugins, each protocol needs its own firmware-level code on the device, written or reviewed by the wallet maker. With a parser plus data, each protocol publishes a JSON descriptor to a public registry, and any wallet that implements the parser can show all of them")
s.text(20, 22, "Plugins: code per protocol", "d-t")
s.text(20, 38, "Firmware-level, written or reviewed by the wallet maker", "d-s")
for i, tag in enumerate("ABC"):
    x = 20 + i * 125
    s.box(x, 52, 110, 32, f"Protocol {tag}", anchor="middle")
    s.arrow([(x + 55, 84), (x + 55, 114)])
s.add('<rect x="20" y="104" width="360" height="72" rx="8" class="d-ext"/>')
for i, tag in enumerate("ABC"):
    x = 27 + i * 125
    s.box(x, 116, 96, 32, f"Plugin {tag}", anchor="middle")
s.text(200, 166, "One device", "d-s", "middle")
s.rule(194)
s.text(20, 220, "Parser plus data: one format", "d-t")
s.text(20, 236, "A protocol describes itself in JSON", "d-s")
for i, tag in enumerate("ABC"):
    x = 20 + i * 125
    s.box(x, 250, 110, 32, f"Descriptor {tag}", anchor="middle")
    s.arrow([(x + 55, 282), (x + 55, 306)])
s.box(20, 308, 360, 34, "Public registry", anchor="middle")
for i in range(3):
    x = 20 + i * 125
    s.arrow([(x + 55, 342), (x + 55, 366)])
    s.box(x, 368, 110, 52, f"Wallet {i + 1}", "Same parser", accent="green")
s.render()
