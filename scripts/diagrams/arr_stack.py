"""Diagrams for the *arr stack post. Run: python3 scripts/diagrams/arr_stack.py"""
from diagram_lib import *

# ── 1. Architecture ─────────────────────────────────────────────
s = Svg("arr-architecture", 400, 470, "How the *arr apps connect: requests, managers, indexers, download client, import, media server and subtitles")
L, R = (10, 130), (160, 390)  # left column (external / indexers), right column (pipeline)
rw = R[1] - R[0]
rc = R[0] + rw / 2
s.box(L[0], 16, L[1] - L[0], 52, "Indexers", "trackers, Usenet", dashed=True, node="indexers")
s.box(R[0], 16, rw, 52, "Seerr", "family asks for a title", accent="violet", node="seerr")
s.box(L[0], 124, L[1] - L[0], 52, "Prowlarr", "syncs to apps", accent="amber", node="prowlarr")
s.box(R[0], 124, rw, 52, "Sonarr · Radarr · Lidarr", "want list vs files on disk", accent="blue", node="managers")
s.box(R[0], 232, rw, 52, "qBittorrent · SABnzbd", "moves the bytes", accent="green", node="download")
s.box(R[0], 340, rw, 52, "Import", "rename, hardlink into /data/media", accent="blue", node="import")
s.box(10, 412, 180, 48, "Jellyfin · Plex", "you press play", accent="rose", node="media")
s.box(210, 412, 180, 48, "Bazarr", "fetches subtitles", accent="rose", node="bazarr")
# arrows
s.arrow([(70, 68), (70, 122)], "RSS + search", 78, 99, edge="indexers-prowlarr")
s.arrow([(130, 150), (158, 150)], edge="prowlarr-managers")
s.arrow([(rc, 68), (rc, 122)], "adds title + profile", rc + 8, 99, edge="seerr-managers")
s.arrow([(rc - 20, 176), (rc - 20, 230)], "sends release", rc - 28, 207, "end", edge="managers-download")
s.arrow([(rc + 20, 232), (rc + 20, 178)], "polls status", rc + 28, 207, dashed=True, edge="download-managers")
s.arrow([(rc, 284), (rc, 338)], "download finished", rc + 8, 315, edge="download-import")
s.arrow([(rc, 392), (rc, 400), (100, 400), (100, 410)], edge="import-media")
s.arrow([(rc, 400), (300, 400), (300, 410)], edge="import-bazarr")
s.render()

# ── 2. RSS vs backlog ───────────────────────────────────────────
s = Svg("arr-rss-sync", 400, 262, "Sonarr only sees what appears in indexer RSS feeds after the show is added; the backlog needs a one-time search")
x0, x1 = 20, 385
lane = 112
s.text(20, 22, "Indexer RSS feed (newest uploads)", "d-t")
s.add(f'<line x1="{x0}" y1="{lane}" x2="{x1}" y2="{lane}" class="d-line d-faint"/>')
s.arrow([(x1 - 10, lane), (x1, lane)])
s.text(x1, lane + 18, "time", "d-s", "end")
for x in [22, 44, 66, 88, 110]:
    s.add(f'<rect x="{x}" y="{lane - 22}" width="16" height="16" rx="3" class="d-ext"/>')
s.text(20, lane + 18, "S01E01–E05: uploaded", "d-s")
s.text(20, lane + 31, "long before, already gone", "d-s")
s.text(20, lane + 44, "from the feed", "d-s")
s.add(f'<line x1="146" y1="56" x2="146" y2="{lane + 8}" class="d-line d-violet d-stroke" stroke-width="1.5"/>')
s.text(146, 50, "you add the show", "d-s d-violet d-ct", "middle")
for x in [166, 192, 222, 300, 322, 352]:
    s.add(f'<rect x="{x}" y="{lane - 18}" width="12" height="12" rx="3" class="d-box"/>')
s.add(f'<rect x="250" y="{lane - 24}" width="20" height="20" rx="4" class="d-green d-fill"/>')
s.text(260, lane - 32, "S02E01", "d-s d-green d-ct", "middle")
ticks = [176, 221, 266, 311, 356]
for x in ticks:
    s.add(f'<line x1="{x}" y1="{lane + 46}" x2="{x}" y2="{lane + 60}" class="d-line"/>')
s.add(f'<line x1="{ticks[0]}" y1="{lane + 53}" x2="{ticks[-1]}" y2="{lane + 53}" class="d-line d-faint"/>')
s.text(266, lane + 78, "RSS sync every 15 min", "d-s", "middle")
s.arrow([(266, lane + 44), (261, lane + 2)])
s.text(20, 222, "✓ New release matches the want list: grabbed within minutes.", "d-s d-green d-ct")
s.text(20, 240, "✗ The backlog never reappears in the feed. Tick \u201cSearch for", "d-s")
s.text(20, 255, "   missing\u201d when adding the show, or it stays missing.", "d-s")
s.render()

# ── 3. Picking a release ────────────────────────────────────────
s = Svg("arr-release-scoring", 400, 420, "Choosing a release: quality profile filters candidates, custom formats score them, the highest score is grabbed, then upgraded until the cutoff")
s.text(20, 24, "30 releases found for S02E05", "d-t")
for i in range(15):
    x = 20 + i * 24
    s.add(f'<rect x="{x}" y="36" width="18" height="12" rx="3" class="d-box"/>')
    s.add(f'<rect x="{x}" y="52" width="18" height="12" rx="3" class="d-box"/>')
s.arrow([(200, 72), (200, 96)])
s.box(20, 98, 360, 52, "1 · Quality profile", "drop what's not allowed: too small, wrong source, CAM", accent="blue")
s.arrow([(200, 150), (200, 174)])
s.box(20, 176, 360, 128, "2 · Custom formats score what's left", None, accent="amber")
rows = [
    ("2160p WEB-DL · DV · Atmos", "+3100", "d-green"),
    ("1080p WEB-DL · trusted group", "+1750", None),
    ("1080p WEB-DL · unknown group", "+0", None),
    ("720p HDTV · re-encode", "−10000", "d-rose"),
]
for i, (name, score, acc) in enumerate(rows):
    y = 222 + i * 20
    s.text(46, y, name, "d-s d-m")
    cls = f"d-s d-m {acc} d-ct" if acc else "d-s d-m"
    s.text(364, y, score, cls, "end")
s.arrow([(200, 304), (200, 328)])
s.box(20, 330, 360, 44, "3 · Highest score wins → sent to the download client", None, accent="green")
s.text(20, 398, "Later, a better release appears? It's grabbed again and replaces", "d-s")
s.text(20, 413, "the file. Upgrades stop once the profile's cutoff is reached.", "d-s")
s.render()

# ── 4. Hardlinks ─────────────────────────────────────────────────
s = Svg("arr-hardlinks", 400, 360, "One filesystem: two paths hardlink to the same data. Separate Docker volumes: the import becomes a full copy")
s.text(20, 22, "One /data volume: hardlink", "d-t")
s.box(20, 36, 282, 36, "", None)
s.text(34, 58, "/data/torrents/tv/Show.S02E05.1080p.mkv", "d-s d-m")
s.box(20, 82, 282, 36, "", None)
s.text(34, 104, "/data/media/tv/Show/Season 02/S02E05.mkv", "d-s d-m")
s.add('<path d="M302,54 L330,54 L330,100" class="d-line"/>')
s.add('<path d="M302,100 L330,100" class="d-line"/>')
s.arrow([(330, 100), (330, 140)])
s.box(250, 142, 130, 48, "2.1 GB on disk", "one copy, shared", accent="green")
s.text(20, 150, "The client seeds from the first", "d-s")
s.text(20, 164, "path, the library uses the second.", "d-s")
s.text(20, 178, "Import is instant.", "d-s d-green d-ct")
s.add('<line x1="20" y1="208" x2="380" y2="208" class="d-line d-faint"/>')
s.text(20, 234, "Separate /downloads and /tv volumes: copy", "d-t")
s.box(20, 248, 170, 48, "/downloads", "2.1 GB", accent="rose")
s.box(210, 248, 170, 48, "/tv", "2.1 GB more", accent="rose")
s.arrow([(190, 272), (208, 272)])
s.text(20, 322, "Docker treats each volume as its own filesystem, so the", "d-s")
s.text(20, 337, "import copies every byte. Slow, double the disk, no warning.", "d-s d-rose d-ct")
s.render()

# ── 5. Prowlarr fan-out ─────────────────────────────────────────
s = Svg("arr-prowlarr", 400, 240, "Before Prowlarr every manager configured every indexer; with Prowlarr indexers are configured once and pushed to each manager")
def column(x, labels, cls):
    for i, lab in enumerate(labels):
        y = 44 + i * 44
        s.box(x, y, 70, 30, lab, None, anchor="middle")
    return [(x, 59 + i * 44) for i in range(len(labels))]
s.text(95, 22, "Before Prowlarr", "d-t", "middle")
idx = ["Idx A", "Idx B", "Idx C", "Idx D"]
mgr = ["Sonarr", "Radarr", "Lidarr"]
left = column(10, idx, "")
rightm = [(110, 66 + i * 50) for i in range(3)]
for i, lab in enumerate(mgr):
    y = 51 + i * 50
    s.box(110, y, 72, 30, lab, None, anchor="middle")
for (ax, ay) in left:
    for (bx, by) in rightm:
        s.add(f'<line x1="{ax + 70}" y1="{ay}" x2="{bx}" y2="{by}" class="d-line d-faint"/>')
s.text(95, 228, "12 configurations", "d-s d-rose d-ct", "middle")
s.add('<line x1="200" y1="30" x2="200" y2="226" class="d-line d-faint" stroke-dasharray="3 4"/>')
s.text(305, 22, "With Prowlarr", "d-t", "middle")
left2 = [(212, 59 + i * 44) for i in range(4)]
for i, lab in enumerate(idx):
    s.box(212, 44 + i * 44, 56, 30, lab, None, anchor="middle")
s.box(284, 101, 34, 76, "", None)
s.add('<text x="301" y="139" class="d-t" text-anchor="middle" transform="rotate(-90 301 139)" style="font-size:11px">Prowlarr</text>')
for (ax, ay) in left2:
    s.add(f'<line x1="{ax + 56}" y1="{ay}" x2="284" y2="139" class="d-line d-faint"/>')
for i, lab in enumerate(mgr):
    y = 51 + i * 50
    s.box(330, y, 62, 30, lab, None, anchor="middle")
    s.arrow([(318, 139), (328, y + 15)])
s.text(305, 228, "4 configurations, synced", "d-s d-green d-ct", "middle")
s.render()
