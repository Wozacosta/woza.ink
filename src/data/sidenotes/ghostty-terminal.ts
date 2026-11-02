import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "ghostty-terminal",
  notes: [
    {
      marker:
        "He'd shipped Vagrant, co-founded HashiCorp, helped build Terraform",
      type: "context",
      content:
        "Mitchell Hashimoto co-founded HashiCorp in 2012. The company created Vagrant, Terraform, Vault, Consul, and Nomad — infrastructure tools used across the industry. HashiCorp went public in 2021 (Nasdaq: HCP), and IBM announced a $6.4 billion acquisition in 2024 that closed in February 2025. Hashimoto left the company in December 2023.",
      url: "https://www.hashicorp.com/en/blog/mitchell-reflects-as-hashicorp-turns-10",
    },
    {
      marker:
        "Within 15 months it hit 45,000 GitHub stars",
      type: "source",
      content:
        "As of March 2026, Ghostty had approximately 45,247 GitHub stars, past Hyper (~44,600), Kitty and WezTerm, in under 15 months from its December 2024 public launch. Alacritty stayed ahead: in November 2026 it had about 66,000 stars to Ghostty's 63,000.",
      url: "https://github.com/ghostty-org/ghostty",
    },
    {
      marker:
        "Hashimoto has called Zig \"an absolute joy to work with\"",
      type: "quote",
      content:
        "From Hashimoto's 1.0 reflection post: \"Zig has been an absolute joy to work with. I have fun writing Zig every single day and that fun hasn't diminished a bit over two years. The build system is fantastic, the community is amazing, and the core maintainers are brilliant.\"",
      attribution: "Mitchell Hashimoto",
      url: "https://mitchellh.com/writing/ghostty-1-0-reflection",
    },
    {
      marker:
        "more xterm escape sequences than any terminal besides xterm itself",
      type: "source",
      content:
        "Ghostty's standards compliance is a deliberate differentiator. It supports the Kitty keyboard protocol, Kitty graphics protocol, styled underlines (curly, dotted, dashed), synchronized output, and extensive xterm escape sequence coverage. The project maintains its own conformance test suite to verify compatibility.",
      url: "https://ghostty.org/docs/about",
    },
    {
      marker:
        "cmux, the agentic terminal for running multiple AI coding agents, uses libghostty",
      type: "context",
      content:
        "cmux launched in February 2026 as a native macOS terminal built specifically for running multiple AI coding agents in parallel. It uses libghostty for terminal rendering, which means it inherits Ghostty's GPU-accelerated performance and configuration compatibility. This is the first major third-party application built on libghostty, validating Hashimoto's embeddable library vision.",
      url: "https://www.cmux.dev/",
    },
    {
      marker:
        "I believe infrastructure of this kind should be stewarded by a mission-driven, non-commercial entity that prioritizes public benefit over private profit",
      type: "quote",
      content:
        "Hashimoto elaborated: \"A non-profit structure provides enforceable assurances: the mission cannot be quietly changed, funds cannot be diverted to private benefit, and the project cannot be sold off or repurposed for commercial gain.\" Hack Club, the fiscal sponsor, is a 501(c)(3) non-profit that manages compliance, donations, and financial oversight. All transactions are publicly visible on Hack Club Bank's ledger.",
      attribution: "Mitchell Hashimoto",
      url: "https://mitchellh.com/writing/ghostty-non-profit",
    },
    {
      marker:
        "libghostty-vt, a zero-dependency library for parsing terminal sequences",
      type: "source",
      content:
        "libghostty-vt is the first standalone component extracted from Ghostty. It provides APIs for parsing terminal sequences and maintaining terminal state (cursor position, styles, text wrapping) with literally zero dependencies — not even libc. It's currently available as a Zig module, with a C API in development. Future libghostty components will cover input handling, GPU rendering, and ready-made GTK/Swift widgets.",
      url: "https://mitchellh.com/writing/libghostty-is-coming",
    },
    {
      marker:
        "Most developer tools either stay side projects until they die, get acquired, or take VC and pivot to enterprise",
      type: "counter",
      content:
        "Not every project that rejects VC succeeds long-term. Non-profit governance introduces its own challenges: slower decision-making, donation fatigue, and dependency on a single maintainer's motivation. Hashimoto remains the project lead and final authority on all decisions. The non-profit structure lays groundwork for succession, but Ghostty's bus factor is still effectively one.",
      url: "https://mitchellh.com/writing/ghostty-non-profit",
    },
  ],
};
