---
title: "Ghostty: The Terminal Emulator That Shouldn't Need to Exist"
date: "2026-03-22"
description: "Mitchell Hashimoto built a terminal from scratch in Zig because every existing option forced a tradeoff between speed, features, and native feel. Here's why Ghostty matters."
tags: ["dx", "tools", "productivity"]
---

# Ghostty: The Terminal Emulator That Shouldn't Need to Exist

Terminals are a solved problem. That's what Mitchell Hashimoto thought when he started writing one in 2022. He'd shipped Vagrant, co-founded HashiCorp, helped build Terraform — tools used by millions. He wasn't looking for another project. He wanted to learn Zig and graphics programming.

Then he started actually looking at terminal emulators. Really looking. And the same tradeoff kept showing up: you could have fast, or you could have feature-rich, or you could have native UI. Pick two. Every existing terminal made you choose.

Ghostty is what happens when someone with a track record of building developer infrastructure decides that tradeoff is fake.

---

## What Ghostty actually is

Ghostty is a terminal emulator for macOS and Linux. GPU-accelerated. Written in Zig. Uses platform-native UI — Swift and AppKit on macOS, GTK4 on Linux. Not Electron. Not a thin wrapper around a web view. Actual native widgets for tabs, splits, dialogs, everything.

It launched publicly in December 2024 after two years of closed development and a private beta of around 5,000 users. It went open source under the MIT license on day one of the public release. Within 15 months it hit 45,000 GitHub stars — more than Kitty, WezTerm, and Alacritty.

The pitch is simple: fastest-in-class rendering, deep feature set, and a UI that feels like it belongs on your OS. No compromises between those three.

---

## Why Zig

Hashimoto chose Zig for the core — over 90% of the codebase is shared Zig across platforms. The platform-specific GUI layers are thin: Swift on macOS, Zig calling GTK4's C API on Linux.

Zig gives you C-level performance with better ergonomics for the kind of low-level work a terminal demands: custom memory allocators, direct GPU API access, zero-cost abstractions. No garbage collector pauses. No runtime. Hashimoto has called Zig "an absolute joy to work with" for this kind of project.

The choice also enables libghostty — more on that below — because Zig compiles to a C ABI, making the core embeddable in any language that can call C functions.

---

## Performance: actually fast, not marketing fast

Terminal benchmarks are tricky. Most of the time your terminal is sitting idle, waiting for input. But when it matters — catting a massive log file, streaming build output, running a verbose test suite — rendering speed is the bottleneck.

Ghostty's numbers:

- **Key-to-screen latency:** ~2ms, at the threshold of human perception. Alacritty and Kitty are close at ~3ms.
- **Large output throughput:** Catting 100,000 lines of text takes ~0.7 seconds — faster than Alacritty in some benchmarks, roughly 4x faster than iTerm2 and Kitty, 2x faster than Terminal.app.
- **Startup time:** Under 100ms on most systems.

Hashimoto is honest about this. The official docs say Ghostty "aims to be in the same class as the fastest terminal emulators" and note that "in some benchmarks it is faster, in others it is slower." No inflated claims. The real-world difference: scrolling through a large log file feels instant, and you never see the terminal struggle to keep up with output.

The GPU rendering uses Metal on macOS and OpenGL on Linux, with a custom rendering pipeline built specifically for terminal text. This isn't bolted-on GPU acceleration — it's the foundation of the rendering architecture.

---

## How it compares

The terminal space has real options now. Here's where each one sits:

**Alacritty** — The minimalist. Rust, GPU-accelerated, extremely fast, deliberately stripped down. No ligatures, no image protocol, no tabs or splits (use tmux). If you want a fast rectangle that renders text and nothing else, Alacritty is honest about what it is.

**Kitty** — The platform. Python-based configuration, its own graphics protocol (now a de facto standard), "kittens" for extending functionality, opinionated about how terminals should work. Feature-rich and fast, but the configuration has a learning curve and it doesn't use native UI.

**WezTerm** — The programmer's terminal. Lua-based configuration that's basically a scripting language. First-class remote multiplexing, WebGPU rendering, deep customizability. If you want to script your terminal behavior programmatically, WezTerm is unmatched. The tradeoff is complexity.

**iTerm2** — The macOS incumbent. Enormous feature set built over many years. Not GPU-accelerated in the same way, noticeably slower on large output. Still the most feature-complete option on macOS if you need every edge case covered. But it's showing its age in rendering performance.

**Ghostty** — Fast like Alacritty, featured like Kitty, native like iTerm2. Supports the Kitty graphics protocol, styled underlines, the Kitty keyboard protocol, and more xterm escape sequences than any terminal besides xterm itself. Configuration is simple. UI is native. The bet is that you shouldn't have to choose.

---

## Configuration: simple on purpose

Ghostty uses a plain text config file at `~/.config/ghostty/config`. Key-value pairs. No scripting language, no Lua, no TOML nesting, no YAML indentation games.

```
font-family = JetBrains Mono
font-size = 14
theme = catppuccin-mocha
window-padding-x = 8
window-padding-y = 8
cursor-style = block
```

That's a complete, functional config. Most people need fewer lines than that. Ghostty's defaults are good enough that zero configuration is a viable starting point.

This is a deliberate choice. WezTerm gives you a full Lua runtime. Kitty has its own config syntax with conditionals and includes. Ghostty says: you don't need a programming language to configure a terminal. If the option exists, it's a key-value pair. If it doesn't exist as an option, file an issue.

The community has debated adding a scripting language. The project has consistently declined. The philosophy is that configuration complexity is a cost, not a feature.

---

## libghostty: the bigger play

The terminal emulator is the product. But libghostty might be the legacy.

Hashimoto's long-term vision is to extract Ghostty's core into a set of standalone libraries that any application can use to embed a terminal. Not a fork. Not a wrapper. A proper, documented, C-ABI library.

The first piece is already taking shape: **libghostty-vt**, a zero-dependency library for parsing terminal sequences and maintaining terminal state. Zero dependencies means no libc — it can run anywhere. The underlying logic is battle-tested from Ghostty itself.

Future components will cover input handling, GPU rendering, and ready-made widgets for GTK and Swift. The vision: any app that needs a terminal view — an IDE, a monitoring tool, a custom developer environment — can embed one without reimplementing decades of terminal specification from scratch.

This is already happening. cmux, the agentic terminal for running multiple AI coding agents, uses libghostty for its rendering engine. Your Ghostty config carries over. The performance carries over. It's a different app built on the same foundation.

---

## The open-source story

Ghostty was closed-source during development. The private beta ran through Discord with around 5,000 active testers and 28,000 community members. Hashimoto's reasoning was practical: managing his first child's first year while building something of this scope required controlling the surface area of feedback and contributions.

The tradeoff was real. The closed beta generated hype that the project didn't seek. Some perceived it as elitism. Others were frustrated at being excluded from a tool they wanted to use.

When 1.0 launched in December 2024, it went fully open source under MIT. No delayed source release, no open-core model, no commercial license. MIT from day one of the public release.

Then in December 2025, Hashimoto went further: Ghostty became a non-profit project, fiscally sponsored by Hack Club under their 501(c)(3) status. His stated reason: "I believe infrastructure of this kind should be stewarded by a mission-driven, non-commercial entity that prioritizes public benefit over private profit."

No VC funding. No acquisition path. No funds going to Hashimoto personally — that's legally guaranteed by the non-profit structure. His family donated $150,000 to Hack Club separately. All financial transactions are transparent on Hack Club Bank's public ledger.

This is a rare move. Most developer tools either stay side projects until they die, get acquired, or take VC and pivot to enterprise. Ghostty chose a fourth path.

---

## What makes it worth switching to

**You should try Ghostty if:**

- You want a fast terminal with native macOS or Linux UI out of the box
- Your current terminal config is already minimal (or you want it to be)
- You care about standards compliance — Kitty graphics protocol, modern escape sequences, proper Unicode handling
- You're interested in the libghostty ecosystem and want your terminal investment to carry forward
- The idea of a non-profit terminal with transparent governance appeals to you

**You might not switch if:**

- You rely on WezTerm's Lua scripting for complex dynamic configuration
- You're deeply invested in Kitty's kitten ecosystem and its specific workflows
- You need Windows support (Ghostty doesn't have it yet, though it's planned)
- Your terminal is iTerm2 and you use features Ghostty hasn't replicated — iTerm2's feature surface is enormous

---

## The bottom line

Terminal emulators aren't supposed to be exciting. They render text, they accept input, they get out of the way. The fact that Ghostty attracted 45,000 GitHub stars in just over a year says something about how much latent frustration existed with the status quo.

Hashimoto didn't set out to build the most popular terminal. He set out to prove that the speed-features-native tradeoff was artificial. The result is a terminal that's genuinely fast, genuinely full-featured, and genuinely native — backed by a non-profit structure that means it can't be acquired, can't pivot to enterprise, and can't enshittify.

That's a strong foundation. Whether you switch today or just keep it on your radar, Ghostty is shaping what terminals look like going forward.
