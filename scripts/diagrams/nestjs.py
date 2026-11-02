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
s.text(20, 378, "On the way in: global first, then controller, then route.", "d-s")
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

# ── 3. What wraps what ──────────────────────────────────────────
s = Svg("nest-adapter", 400, 262, "Layers from top to bottom: your code, NestJS, an HTTP adapter that is Express by default and can be swapped for Fastify, and Node.js")
s.text(20, 22, "NestJS wraps the server, it doesn't replace it", "d-t")
s.text(20, 38, "The layer you swap is one line of config", "d-s")
s.box(20, 54, 360, 44, "Your code", "Controllers, providers, modules", accent="green")
s.box(20, 106, 360, 44, "NestJS", "The opinions, the structure, the dependency graph", accent="violet")
s.box(20, 158, 172, 44, "Express", "The default adapter", accent="blue")
s.box(208, 158, 172, 44, "Fastify", "Swap it in", accent="amber", dashed=True)
s.text(200, 184, "or", "d-s", "middle")
s.box(20, 210, 360, 40, "Node.js", anchor="middle")
s.render()

# ── 4. How injection works (interactive: src/data/diagrams/nest-di.ts) ──
s = Svg("nest-di", 400, 372, "UsersController declares UsersService in its constructor. The TypeScript compiler stores that type as metadata, the DI container reads it, finds the provider in UsersModule, and builds the controller with the service injected")
s.text(20, 22, "From a constructor to an instance", "d-t")
s.text(20, 38, "You declare the dependency, the framework resolves it", "d-s")
s.box(20, 54, 360, 52, "UsersController", "constructor(usersService: UsersService)", accent="blue", node="controller")
s.box(20, 140, 360, 52, "TypeScript compiler", "Keeps the type as design:paramtypes metadata", accent="violet", node="compiler")
s.box(20, 226, 216, 52, "DI container", "Reads the types at runtime", accent="amber", node="container")
s.box(262, 226, 118, 52, "UsersModule", "providers", accent="green", node="module")
s.box(20, 312, 360, 48, "A ready controller", "UsersService injected, no new anywhere", accent="green", node="instance")
s.arrow([(128, 106), (128, 138)], edge="controller-compiler")
s.arrow([(128, 192), (128, 224)], edge="compiler-container")
s.arrow([(262, 252), (238, 252)], edge="module-container")
s.arrow([(128, 278), (128, 310)], edge="container-instance")
s.render()

# ── 5. The field ────────────────────────────────────────────────
s = Svg("nest-frameworks", 400, 264, "A table of six options. Express is minimal with no opinions. Fastify is faster and also works as a NestJS adapter. Hono runs everywhere and suits edge functions. tRPC gives end-to-end types and is a protocol layer. Elysia is Bun-native and very fast. NestJS brings structure and suits big teams and long-lived projects")
s.text(20, 22, "Where NestJS sits", "d-t")
s.text(20, 38, "What each one is, and when it wins", "d-s")
s.text(20, 62, "Option", "d-s")
s.text(92, 62, "What it is", "d-s")
s.text(232, 62, "Wins when", "d-s")
s.add('<line x1="20" y1="70" x2="380" y2="70" class="d-line d-faint"/>')
rows = [
    ("Express", "Minimal, no opinions", "You build your own"),
    ("Fastify", "Faster, plugin system", "Also a Nest adapter"),
    ("Hono", "Runs everywhere", "Edge, small APIs"),
    ("tRPC", "End-to-end types", "You own both ends"),
    ("Elysia", "Bun-native, very fast", "You're on Bun"),
    ("NestJS", "Modules, DI, structure", "Big team, long life"),
]
for i, (name, what, when) in enumerate(rows):
    y = 92 + i * 30
    if name == "NestJS":
        s.add(f'<rect x="12" y="{y - 18}" width="376" height="28" rx="6" class="d-box"/>')
    s.text(20, y, name, "d-t")
    s.text(92, y, what, "d-s")
    s.text(232, y, when, "d-s")
    if i < 4:
        s.add(f'<line x1="20" y1="{y + 11}" x2="380" y2="{y + 11}" class="d-line d-faint"/>')
s.render()

# ── 6. Swapping a transport ─────────────────────────────────────
s = Svg("nest-transports", 400, 262, "One handler stays the same while a configuration option picks the transport from TCP, Redis, NATS, RabbitMQ, Kafka, gRPC and MQTT. TCP while developing locally, Kafka in production")
s.text(20, 22, "One handler, seven transports", "d-t")
s.text(20, 38, "Change the option, not the code", "d-s")
s.box(20, 54, 360, 46, "Your handler", "Stays the same", accent="green")
s.arrow([(200, 100), (200, 128)])
s.box(20, 130, 360, 40, "transport: the configuration option", accent="violet")
s.arrow([(200, 170), (200, 192)])
chips = [("TCP", 38, "green"), ("Redis", 48, None), ("NATS", 46, None), ("RabbitMQ", 70, None), ("Kafka", 50, "blue"), ("gRPC", 44, None), ("MQTT", 46, None)]
x = 20.0
gap = (360 - sum(w for _, w, _ in chips)) / 6
for name, w, acc in chips:
    s.add(f'<rect x="{x:.1f}" y="194" width="{w}" height="30" rx="6" class="{"d-box" if not acc else f"d-{acc} d-fill"}"{" opacity=\"0.22\"" if acc else ""}/>')
    if acc:
        s.add(f'<rect x="{x:.1f}" y="194" width="{w}" height="30" rx="6" fill="none" class="d-{acc} d-stroke" stroke-width="1.5"/>')
    s.text(round(x + w / 2, 1), 213, name, "d-s", "middle")
    x += w + gap
s.text(20, 244, "Develop locally", "d-s")
s.text(380, 244, "Deploy", "d-s", "end")
s.add('<circle cx="108" cy="240" r="4" class="d-green d-fill"/>')
s.add('<circle cx="334" cy="240" r="4" class="d-blue d-fill"/>')
s.render()
