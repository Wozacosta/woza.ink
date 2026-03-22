import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "i3-on-mac-flashspace",
  notes: [
    {
      marker:
        "Before jumping into tools, it's worth naming what makes i3 great",
      type: "context",
      content:
        "i3 was created in **2009** by Michael Stapelberg, originally as a response to frustrations with wmii (Window Manager Improved Improved). The name \"i3\" stands for \"improved tiling wm\" — improved improved improved. Its design philosophy follows the Unix principle of \"do one thing and do it well\": i3 manages windows, i3bar handles the status bar, i3lock handles screen locking. The project famously prioritizes documentation and stability over new features.",
      url: "https://i3wm.org/docs/userguide.html",
    },
    {
      marker:
        "**Keyboard-first everything.** Moving, resizing, focusing — all keys",
      type: "quote",
      content:
        "From i3's own documentation: \"Only documented behavior is supported. Only add features which benefit many people, instead of going to great lengths to support rarely used workflows.\" This minimalist philosophy — the project is \"generally happy with the feature set\" — is what makes i3 feel fast. Every feature carries weight; nothing is there for show.",
      attribution: "i3wm project documentation",
      url: "https://i3wm.org/docs/userguide.html",
    },
    {
      marker:
        "a tiling window manager for macOS inspired directly by i3",
      type: "source",
      content:
        "AeroSpace deliberately emulates its own virtual workspaces rather than using native macOS Spaces, because macOS Spaces have \"considerable limitations\" for programmatic control. The design choice means AeroSpace never requires disabling SIP (System Integrity Protection) — a key advantage over **yabai**, macOS's most feature-complete tiling WM, which requires SIP to be disabled for full functionality.",
      url: "https://github.com/nikitabobko/AeroSpace",
    },
    {
      marker:
        "**Workspace switching felt heavy.** Aerospace manages its own workspace abstraction on top of macOS Spaces",
      type: "context",
      content:
        "The macOS tiling WM landscape in 2025-2026: **yabai** is the most feature-complete but requires SIP disabled and frequently loses track of windows on monitor changes. **Amethyst** requires only accessibility permissions but has a steep learning curve. **Rectangle** is the simplest (keyboard-triggered snap zones) but doesn't auto-tile. **AeroSpace** sits in the middle — i3-like tree tiling without SIP, but still in public beta.",
    },
    {
      marker:
        "Not a tiling window manager — a workspace manager. The distinction matters",
      type: "source",
      content:
        "FlashSpace supports two display modes: **Static** (each workspace is assigned to a specific display, like traditional i3) and **Dynamic** (workspaces auto-assign to displays based on where their apps are located, allowing one workspace to span multiple monitors). It also includes Space Control — a grid preview of all workspaces, navigable with 0-9 and arrow keys.",
      url: "https://github.com/wojciech-kulik/FlashSpace",
    },
    {
      marker:
        "the thing that makes i3 great isn't the feature set — it's the speed",
      type: "note",
      content:
        "Research on perceived latency in UIs suggests that anything under ~100ms feels \"instant\" to humans, while delays of 200-300ms are perceptible and break the sense of direct manipulation. macOS Space transition animations typically take 300-700ms. Disabling them (which FlashSpace does) doesn't just feel faster — it crosses a perceptual threshold that changes the quality of the interaction from \"switching\" to \"being there.\"",
    },
    {
      marker:
        "pair it with macOS's native tiling (Sequoia added keyboard-driven tiling)",
      type: "context",
      content:
        "macOS Sequoia (2024) finally added native keyboard-driven tiling — windows snap to halves and quarters with keyboard shortcuts, no third-party tool required. For most developers who just need terminal-left, browser-right, this eliminates the need for a dedicated tiling WM. The combination of Flashspace (workspaces) + native Sequoia tiling (layout) gives you 80% of the i3 experience with zero external dependencies beyond Flashspace itself.",
    },
  ],
};
