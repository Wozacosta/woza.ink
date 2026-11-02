"""Diagram for the local-first post. Run: python3 scripts/diagrams/local_first.py"""
from diagram_lib import *

# ── 1. Where reads and writes go ────────────────────────────────
s = Svg("local-first-flow", 400, 330, "On your device the UI reads and writes a local IndexedDB database through Dexie, so updates are instant. In the background DexieCloud syncs changes to a cloud database, and other devices pull them")
s.add('<rect x="20" y="16" width="360" height="112" rx="8" class="d-ext"/>')
s.text(34, 36, "Your device", "d-s")
s.box(34, 48, 124, 64, "UI", "Updates at once", accent="green")
s.box(242, 48, 124, 64, "Local database", "IndexedDB, Dexie", accent="blue")
s.arrow([(158, 72), (240, 72)], "writes", 199, 66, "middle")
s.arrow([(242, 92), (160, 92)], "reads", 201, 106, "middle")
s.arrow([(304, 128), (304, 170)], "background sync", 294, 153, "end", dashed=True)
s.box(208, 172, 172, 54, "DexieCloud", "An eventual replica", accent="violet")
s.arrow([(208, 199), (154, 199)], dashed=True)
s.box(20, 172, 132, 54, "Other devices", "Pull the changes", accent="amber")
s.rule(246)
s.text(20, 270, "Cut the network and the top box keeps working.", "d-t")
s.text(20, 288, "The device is the source of truth. The cloud is a replica,", "d-s")
s.text(20, 304, "not the gatekeeper.", "d-s")
s.render()
