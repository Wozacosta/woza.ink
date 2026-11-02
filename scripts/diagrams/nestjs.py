"""Diagram for the NestJS post. Run: python3 scripts/diagrams/nestjs.py"""
from diagram_lib import *

# ── 1. The request lifecycle ────────────────────────────────────
s = Svg("nest-lifecycle", 400, 390, "A request goes through middleware, guards, interceptors and pipes to your handler. On the way out it passes back through the interceptors. If something throws, an exception filter formats the response instead.")
s.text(115, 18, "Request", "d-s", "middle")
s.arrow([(115, 24), (115, 42)])
layers = [
    ("Middleware", "Logging, CORS, body parsing", "blue"),
    ("Guards", "Authorization: true or false", "amber"),
    ("Interceptors", "Before the handler", "violet"),
    ("Pipes", "Validate and transform", "blue"),
    ("Your handler", "Just handles", "green"),
]
for i, (name, sub, acc) in enumerate(layers):
    y = 44 + i * 62
    s.box(20, y, 190, 48, name, sub, accent=acc)
    if i < len(layers) - 1:
        s.arrow([(115, y + 48), (115, y + 60)])

# The way back out, drawn beside the layers it wraps
s.box(240, 44, 140, 48, "Response")
s.box(240, 168, 122, 48, "Interceptors", "After the handler", accent="violet")
s.box(240, 292, 140, 48, "Exception filters", "If something threw", accent="rose", dashed=True)
s.arrow([(210, 304), (225, 304), (225, 192), (238, 192)])
s.arrow([(301, 168), (301, 94)])
s.arrow([(210, 328), (238, 328)], dashed=True)
s.arrow([(372, 292), (372, 94)], dashed=True)
s.rule(354)
s.text(20, 378, "Within a layer: global first, then controller, then route.", "d-s")
s.render()
