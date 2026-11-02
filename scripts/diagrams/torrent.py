"""Diagrams for the BitTorrent post. Run: python3 scripts/diagrams/torrent.py"""
import math

from diagram_lib import *

# ── 1. One server vs a swarm ────────────────────────────────────
s = Svg("torrent-swarm", 400, 268, "Over HTTP one server uploads every copy of a file. In a BitTorrent swarm every peer uploads the pieces it has, so more downloaders add capacity instead of load")
s.text(20, 22, "HTTP", "d-t")
s.text(20, 38, "One server uploads every copy", "d-s")
s.box(65, 58, 80, 36, "Server", anchor="middle")
for i in range(5):
    x = 33 + i * 36
    dx, dy = x - 105, 195 - 94
    length = math.hypot(dx, dy)
    s.arrow([(105, 94), (round(x - dx / length * 13, 1), round(195 - dy / length * 13, 1))])
    s.add(f'<circle cx="{x}" cy="195" r="11" class="d-box"/>')

s.text(210, 22, "BitTorrent", "d-t")
s.text(210, 38, "Every peer uploads what it has", "d-s")
peers = [(295 + 62 * math.cos(math.radians(a)), 131 + 62 * math.sin(math.radians(a))) for a in range(-90, 270, 60)]
for i, (x1, y1) in enumerate(peers):
    for x2, y2 in peers[i + 1:]:
        s.add(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" class="d-line d-faint"/>')
for i, (x, y) in enumerate(peers):
    s.add(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="11" class="d-box"/>')
    s.add(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="4" class="d-{"green" if i == 0 else "blue"} d-fill"/>')
s.rule(226)
s.text(20, 250, "More downloaders slow a server down, and speed a swarm up.", "d-s")
s.render()

# ── 2. Rarest first ─────────────────────────────────────────────
s = Svg("torrent-rarest", 400, 262, "Bars show how many peers in the swarm hold each of ten pieces. Your client already has some of them, and fetches the rarest piece it is still missing next")
s.text(20, 22, "Copies of each piece in the swarm", "d-t")
s.text(20, 38, "Your client fetches the rarest piece it doesn't have yet", "d-s")
base, unit, width = 170, 14, 30
pieces = [(6, True), (4, False), (7, True), (3, False), (5, False), (2, True), (1, False), (4, False), (6, False), (2, False)]
for i, (copies, held) in enumerate(pieces):
    x = 23 + i * 36
    y = base - copies * unit
    if held:
        s.add(f'<rect x="{x}" y="{y}" width="{width}" height="{copies * unit}" rx="3" class="d-green d-fill" opacity="0.8"/>')
    elif copies == 1:
        s.add(f'<rect x="{x}" y="{y}" width="{width}" height="{copies * unit}" rx="3" class="d-amber d-fill"/>')
    else:
        s.add(f'<rect x="{x}" y="{y}" width="{width}" height="{copies * unit}" rx="3" class="d-box"/>')
    s.text(x + width / 2, y - 5, str(copies), "d-s", "middle")
    s.text(x + width / 2, base + 16, str(i + 1), "d-s", "middle")
s.add(f'<line x1="20" y1="{base}" x2="380" y2="{base}" class="d-line"/>')
s.text(200, base + 32, "Piece number", "d-s", "middle")
s.rule(214)
for x, cls, label in ((20, "d-green d-fill", "you have it"), (124, "d-box", "you need it"), (228, "d-amber d-fill", "fetch this one next")):
    s.add(f'<rect x="{x}" y="226" width="12" height="12" rx="2" class="{cls}"/>')
    s.text(x + 18, 236, label, "d-s")
s.text(20, 256, "Rare pieces spread first, so the last 10% doesn't go missing.", "d-s")
s.render()

# ── 3. From a magnet link to a download ─────────────────────────
s = Svg("torrent-magnet", 400, 392, "A magnet link holds only the infohash. Your client asks the DHT which peers are in the swarm, downloads the torrent's metadata from those peers, and then the normal transfer starts")
s.box(20, 16, 360, 54, "Magnet link", "A URI holding the 40-character infohash", accent="violet")
s.arrow([(200, 70), (200, 104)], "look up the infohash", 210, 91)
s.box(20, 106, 360, 54, "DHT", "Peers run the lookup, with no central server", accent="blue")
s.arrow([(200, 160), (200, 194)], "a list of peers", 210, 181)
s.box(20, 196, 360, 54, "Peers in the swarm", "Send the torrent's metadata over the wire protocol", accent="amber")
s.arrow([(200, 250), (200, 284)], "now you know the pieces", 210, 271)
s.box(20, 286, 360, 54, "The transfer", "Rarest first, choking, tit-for-tat", accent="green")
s.rule(358)
s.text(20, 382, "No .torrent file, no tracker, no website.", "d-t")
s.render()

# ── 4. Joining a swarm (interactive: src/data/diagrams/torrent-peers.ts) ──
s = Svg("torrent-peers", 400, 300, "Your client asks a tracker or the DHT who is in the swarm. A seeder sends it pieces and a leecher trades with it. A newcomer gets an optimistic unchoke, and a free-rider stays choked")
s.box(10, 16, 180, 50, "Tracker", "Lists the swarm's peers", dashed=True, node="tracker")
s.box(210, 16, 180, 50, "DHT", "Same lookup, no server", dashed=True, node="dht")
s.box(10, 106, 112, 50, "Seeder", "Every piece", accent="green", node="seeder")
s.box(278, 106, 112, 50, "Leecher", "Trades pieces", accent="blue", node="leecher")
s.box(10, 206, 112, 50, "Free-rider", "Never uploads", accent="rose", node="freerider")
s.box(278, 206, 112, 50, "Newcomer", "No pieces yet", accent="amber", node="newcomer")
s.box(160, 148, 80, 66, "You", "Your client", anchor="middle", node="you")
s.arrow([(180, 148), (112, 68)], edge="you-tracker")
s.arrow([(220, 148), (288, 68)], edge="you-dht")
s.arrow([(122, 138), (158, 168)], edge="seeder-you")
s.arrow([(240, 166), (276, 136)], edge="you-leecher")
s.arrow([(278, 148), (242, 178)], edge="leecher-you")
s.arrow([(240, 196), (276, 224)], edge="you-newcomer")
s.arrow([(160, 194), (124, 224)], faint=True, dashed=True, edge="you-freerider")
s.text(20, 284, "Solid: pieces flow. Dashed: choked, so no upload from you.", "d-s")
s.render()

# ── 5. The handshake (interactive: src/data/diagrams/torrent-handshake.ts) ──
s = Svg("torrent-handshake", 400, 286, "The 68-byte handshake drawn to scale: one length byte, 19 bytes of protocol name, 8 reserved bytes, the 20-byte infohash and the 20-byte peer ID")
s.text(20, 22, "The handshake, byte by byte", "d-t")
s.text(20, 38, "68 bytes, drawn to scale", "d-s")
fields = [
    ("len", 1, "Length", "1 byte", "The number 19", "violet"),
    ("name", 19, "Protocol name", "19 bytes", "BitTorrent protocol", "blue"),
    ("reserved", 8, "Reserved", "8 bytes", "Extension flags", "amber"),
    ("hash", 20, "Infohash", "20 bytes", "Which torrent", "green"),
    ("peer", 20, "Peer ID", "20 bytes", "Who's talking", "rose"),
]
unit = 360 / 68
x = 20
for i, (node, size, name, bytes_, note, acc) in enumerate(fields):
    w = size * unit
    y = 112 + i * 34
    s.add(f'<g data-node="{node}">')
    s.add(f'<rect x="{x:.1f}" y="54" width="{max(w - 1.5, 2):.1f}" height="36" rx="2" class="d-{acc} d-fill" opacity="0.85"/>')
    s.add(f'<rect x="20" y="{y - 14}" width="360" height="28" rx="6" class="d-box"/>')
    s.add(f'<circle cx="34" cy="{y}" r="4" class="d-{acc} d-fill"/>')
    s.text(46, y + 4, name, "d-t")
    s.text(176, y + 4, bytes_, "d-s")
    s.text(366, y + 4, note, "d-s", "end")
    s.add("</g>")
    x += w
s.render()

# ── 6. The timeline, to scale ───────────────────────────────────
s = Svg("torrent-timeline", 400, 396, "A vertical timeline to scale from 2001 to 2017, beside the post's four phases. The protocol in 2001, the incentives paper in 2003, the Mainline DHT in 2005, BEPs 5, 9, 10 and 27 in 2008, BEP 29 in 2009, The Pirate Bay going magnet-only in 2012, and BEP 52 last revised in 2017")
s.text(20, 22, "The dates behind the phases", "d-t")
s.text(20, 38, "Years to scale", "d-s")
y_of = lambda year: 62 + (year - 2001) * 20
phases = [(2001, 2005, "Phase 1", "green"), (2005, 2008, "Phase 2", "blue"), (2008, 2012, "Phase 3", "amber"), (2012, 2017.6, "Phase 4", "violet")]
for start, end, name, acc in phases:
    y0, y1 = y_of(start), y_of(end)
    s.add(f'<rect x="72" y="{y0 + 1}" width="6" height="{y1 - y0 - 2}" rx="2" class="d-{acc} d-fill" opacity="0.85"/>')
    s.text(20, (y0 + y1) / 2 + 4, name, "d-s")
events = [
    (2001, "Bram Cohen sketches the protocol"),
    (2003, "The incentives paper"),
    (2005, "The Mainline DHT ships"),
    (2008, "BEPs 5, 9, 10 and 27 are written"),
    (2009, "BEP 29: uTP"),
    (2012, "The Pirate Bay goes magnet-only"),
    (2017, "BEP 52, BitTorrent v2, last revised"),
]
for year, label in events:
    y = y_of(year) + 5
    s.add(f'<line x1="78" y1="{y}" x2="90" y2="{y}" class="d-line d-faint"/>')
    s.text(96, y + 4, str(year), "d-s d-m")
    s.text(132, y + 4, label, "d-s")
s.render()

# ── 7. Cost against popularity ──────────────────────────────────
s = Svg("torrent-cost", 400, 250, "A sketch of cost for the source against the number of downloaders. For HTTP it climbs in a straight line. For BitTorrent it falls, because every downloader also uploads")
s.text(20, 22, "What popularity costs the source", "d-t")
s.text(20, 38, "A sketch of the shapes, not a measurement", "d-s")
x0, x1, y0, y1 = 44, 372, 212, 60
s.add(f'<line x1="{x0}" y1="{y0}" x2="{x1}" y2="{y0}" class="d-line d-faint"/>')
s.add(f'<line x1="{x0}" y1="{y1}" x2="{x0}" y2="{y0}" class="d-line d-faint"/>')
s.add(f'<path d="M{x0},{y0 - 6} L{x1},{y1}" fill="none" stroke-width="2" stroke-linecap="round" class="d-rose d-stroke"/>')
s.add(f'<path d="M{x0},150 C120,176 220,192 {x1},198" fill="none" stroke-width="2" stroke-linecap="round" class="d-green d-stroke"/>')
s.text(214, 92, "HTTP: linear", "d-t", "end")
s.text(214, 108, "One more copy to serve", "d-s", "end")
s.text(372, 156, "BitTorrent: inverse", "d-t", "end")
s.text(372, 172, "One more uploader", "d-s", "end")
s.text(x1, y0 + 18, "Downloaders", "d-s", "end")
s.text(x0, y0 + 18, "Cost", "d-s")
s.render()
