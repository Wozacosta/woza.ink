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

# ── 2. How Bybit lost $1.44 billion (interactive: src/data/diagrams/multisig-bybit.ts) ──
s = Svg("multisig-bybit", 400, 508, "Attackers went from a Safe developer's machine to Safe's cloud and modified the multisig frontend. Signers saw a routine transfer while the payload replaced the wallet's code. Hardware wallets showed only a hash, so nobody could compare the two. The threshold was met, every signature was valid, and 1.44 billion dollars left the wallet")
s.box(20, 16, 172, 54, "Developer's machine", "Compromised first", accent="rose", node="dev")
s.box(208, 16, 172, 54, "Safe's cloud", "Reached from there", accent="rose", node="cloud")
s.arrow([(192, 43), (206, 43)], edge="dev-cloud")
s.arrow([(294, 70), (294, 104)], edge="cloud-frontend")
s.box(20, 106, 360, 54, "Compromised frontend", "Attackers modified the multisig UI's JavaScript", accent="rose", node="frontend")
s.arrow([(106, 160), (106, 194)], edge="frontend-screen")
s.arrow([(294, 160), (294, 194)], edge="frontend-payload")
s.box(20, 196, 172, 54, "Screen showed", "A routine transfer", accent="green", node="screen")
s.box(208, 196, 172, 54, "Payload held", "Replace the wallet's code", accent="rose", node="payload")
s.arrow([(106, 250), (106, 284)], edge="screen-hardware")
s.arrow([(294, 250), (294, 284)], edge="payload-hardware")
s.box(20, 286, 360, 54, "Hardware wallets", "Showed a hash, so nobody could compare the two", accent="amber", node="hardware")
s.arrow([(200, 340), (200, 374)], "signed", 210, 361, edge="hardware-multisig")
s.box(20, 376, 360, 54, "The multisig", "Threshold met, every signature valid", accent="green", node="multisig")
s.rule(448)
s.text(20, 472, "$1.44 billion gone, and no key was ever stolen.", "d-t")
s.text(20, 490, "Multisig guards signatures. The attack came through the display.", "d-s")
s.render()

# ── 3. Where the rule lives ─────────────────────────────────────
s = Svg("multisig-mpc", 400, 330, "In multisig, n separate keys each produce a signature and the blockchain enforces the threshold, so it rejects an under-signed transaction. In MPC, one key is split into n shares, an off-chain signing protocol enforces the threshold, and the chain sees one ordinary signature, so it can't catch a broken or compromised protocol")
s.text(20, 22, "Multisig", "d-t")
s.text(20, 38, "n separate keys", "d-s")
s.text(210, 22, "MPC / TSS", "d-t")
s.text(210, 38, "One key, split into n shares", "d-s")
for i in range(3):
    s.box(20 + i * 60, 52, 50, 28, "key", anchor="middle")
    s.box(210 + i * 60, 52, 50, 28, "share", anchor="middle")
    s.arrow([(45 + i * 60, 80), (45 + i * 60, 204)])
    s.arrow([(235 + i * 60, 80), (235 + i * 60 + (295 - (235 + i * 60)) * 0.4, 110)])
s.arrow([(295, 164), (295, 204)], "one signature", 287, 181, "end")
s.add('<line x1="20" y1="186" x2="380" y2="186" class="d-line d-faint" stroke-dasharray="3 4"/>')
s.text(380, 180, "off-chain", "d-s", "end")
s.text(380, 200, "on-chain", "d-s", "end")
s.text(75, 136, "signs", "d-s", "middle")
s.add('<rect x="210" y="112" width="170" height="52" rx="8" class="d-box d-violet"/>')
s.add('<rect x="210" y="112" width="170" height="52" rx="8" class="d-violet d-fill" opacity="0.1"/>')
s.text(224, 134, "Signing protocol", "d-t")
s.text(224, 150, "The rule lives here", "d-s d-violet d-ct")
s.add('<rect x="20" y="206" width="170" height="52" rx="8" class="d-box d-violet"/>')
s.add('<rect x="20" y="206" width="170" height="52" rx="8" class="d-violet d-fill" opacity="0.1"/>')
s.text(34, 228, "The blockchain", "d-t")
s.text(34, 244, "The rule lives here", "d-s d-violet d-ct")
s.box(210, 206, 170, 52, "The blockchain", "Sees an ordinary signature")
s.text(20, 282, "Rejects an under-signed", "d-s d-green d-ct")
s.text(20, 298, "transaction by consensus", "d-s d-green d-ct")
s.text(210, 282, "Nothing here catches a broken", "d-s d-rose d-ct")
s.text(210, 298, "or compromised protocol", "d-s d-rose d-ct")
s.render()
