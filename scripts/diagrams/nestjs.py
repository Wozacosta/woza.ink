"""Diagram for the NestJS post. Run: python3 scripts/diagrams/nestjs.py"""
from diagram_lib import *

# ── 1. The request lifecycle (interactive: src/data/diagrams/nest-lifecycle.ts) ──
s = Svg("nest-lifecycle", 400, 390, "A request goes through middleware, guards, interceptors and pipes to your handler. On the way out it passes back through the interceptors. If something throws, an exception filter formats the response instead.")
s.text(115, 18, "Request", "d-s", "middle")
s.arrow([(115, 24), (115, 42)])
layers = [
    ("middleware", "Middleware", "Logging, CORS, body parsing", "blue"),
    ("guards", "Guards", "Authorization: true or false", "amber"),
    ("before", "Interceptors", "Before the handler", "violet"),
    ("pipes", "Pipes", "Validate and transform", "blue"),
    ("handler", "Your handler", "Just handles", "green"),
]
for i, (node, name, sub, acc) in enumerate(layers):
    y = 44 + i * 62
    s.box(20, y, 190, 48, name, sub, accent=acc, node=node)
    if i < len(layers) - 1:
        s.arrow([(115, y + 48), (115, y + 60)], edge=f"{node}-{layers[i + 1][0]}")

# The way back out, drawn beside the layers it wraps
s.box(240, 44, 140, 48, "Response", node="response")
s.box(240, 168, 122, 48, "Interceptors", "After the handler", accent="violet", node="after")
s.box(240, 292, 140, 48, "Exception filters", "If something threw", accent="rose", dashed=True, node="filters")
s.arrow([(210, 304), (225, 304), (225, 192), (238, 192)], edge="handler-after")
s.arrow([(301, 168), (301, 94)], edge="after-response")
s.arrow([(210, 328), (238, 328)], dashed=True, edge="handler-filters")
s.arrow([(372, 292), (372, 94)], dashed=True, edge="filters-response")
s.rule(354)
s.text(20, 378, "Within a layer: global first, then controller, then route.", "d-s")
s.render()

# ── 2. Module boundaries ────────────────────────────────────────
s = Svg("nest-modules", 400, 352, "UsersModule contains UsersController, which injects UsersService, and it imports DatabaseModule. UsersService is exported, so another module can inject it. Anything not exported stays out of reach")
s.text(20, 22, "A module shares only what it exports", "d-t")
s.text(20, 38, "UsersModule from the example above", "d-s")
s.add('<rect x="20" y="52" width="236" height="214" rx="8" class="d-ext"/>')
s.text(34, 74, "UsersModule", "d-t")
s.box(34, 86, 208, 40, "UsersController", accent="blue")
s.arrow([(138, 126), (138, 146)], "injects", 146, 140)
s.box(34, 148, 208, 40, "UsersService", accent="green")
s.box(34, 212, 208, 40, "Anything not exported", accent="rose")
s.add('<rect x="316" y="148" width="64" height="104" rx="8" class="d-box"/>')
s.text(348, 194, "Another", "d-t", "middle")
s.text(348, 212, "module", "d-t", "middle")
s.arrow([(314, 168), (244, 168)])
s.text(286, 160, "exported", "d-s d-green d-ct", "middle")
s.add('<path d="M316,232 L274,232" class="d-line d-rose d-stroke" stroke-dasharray="4 3"/>')
s.text(267, 236.5, "✗", "d-t d-rose d-ct", "middle")
s.text(294, 222, "blocked", "d-s d-rose d-ct", "middle")
s.box(20, 300, 236, 40, "DatabaseModule", accent="amber")
s.arrow([(138, 300), (138, 268)], "imports", 146, 288)
s.render()
