import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "rules-commands-skills-agentic-coding",
  notes: [
    {
      heading: "the-mental-model",
      type: "quote",
      content:
        "\"'Agentic' because the new default is that you are not writing the code directly 99% of the time, you are orchestrating agents who do and acting as oversight. 'Engineering' to emphasize that there is an art & science and expertise to it.\"",
      attribution: "Andrej Karpathy, February 2026",
    },
    {
      heading: "rules-always-on-constraints",
      type: "context",
      content:
        "The rules-file pattern has converged across tools under different names: Claude Code uses `CLAUDE.md` / `AGENTS.md`, Cursor uses `.cursorrules` (now migrating to `.cursor/rules/*.mdc`), and Windsurf uses `.windsurfrules`. The mechanism is identical: markdown injected into every AI request as persistent context. Windsurf caps rules at 6,000 characters per file and 12,000 total — a hard constraint that forces brevity.",
      url: "https://docs.windsurf.com/windsurf/cascade/workflows",
    },
    {
      heading: "rules-always-on-constraints",
      type: "source",
      content:
        "The [awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) repository has over **36,900 GitHub stars** and 3,100+ forks — a community-curated collection of `.cursorrules` files organized by tech stack (Next.js + TypeScript, FastAPI, React Native, etc.). One community member published a collection of **879 `.mdc` rule files** for the newer Cursor format. The sheer volume suggests developers are treating rule authoring as a first-class engineering activity.",
      url: "https://github.com/PatrickJS/awesome-cursorrules",
    },
    {
      heading: "commands-repeatable-triggerable-workflows",
      type: "source",
      content:
        "Claude Code has unified commands and skills: files in `.claude/commands/` and `.claude/skills/` both create the same `/slash-command` interface. Skills can now spawn isolated subagents with their own context windows, restrict which tools the agent uses, override the model, and hook into lifecycle events. The old distinction between \"command as checklist\" and \"skill as methodology\" is now an implementation detail, not a structural one.",
      url: "https://code.claude.com/docs/en/skills",
    },
    {
      heading: "skills-deep-loaded-expertise",
      type: "note",
      content:
        "A SKILL.md file requires a YAML frontmatter header with `name` and `description`. But the real power is in the optional supporting files: templates for the agent to fill in, example outputs showing expected format, shell scripts the agent can execute to inject live data, and reference documentation. A well-built skill directory is essentially a self-contained expert system.",
      url: "https://code.claude.com/docs/en/skills",
    },
    {
      heading: "how-they-work-together",
      type: "quote",
      content:
        "Simon Willison, speaking at the Pragmatic Engineering Summit in March 2026, described a pivotal moment: \"the moment where the agent writes more code than you do.\" At that point, the developer's primary output shifts from code to context — the rules, commands, and skills that shape agent behavior become the actual product of your engineering work.",
    },
    {
      heading: "the-practical-takeaway",
      type: "counter",
      content:
        "One caveat to the \"start with rules\" advice: Cursor users report that a well-crafted `.cursorrules` file can push AI suggestion acceptance rates **from 30% to 80%+**. But the flip side is real — over-stuffed rule files become noise. The 2026 Agentic Coding Trends Report from Anthropic emphasizes that vibe coding (typing prompts and hoping for the best) fails when code moves from prototype to production. The technique skips design, review, and testing.",
      url: "https://resources.anthropic.com/hubfs/2026%20Agentic%20Coding%20Trends%20Report.pdf",
    },
    {
      heading: "the-practical-takeaway",
      type: "context",
      content:
        "According to Gartner's 2026 CIO Agenda, **64% of technology leaders** plan to deploy agentic AI within 24 months, and over 57% of organizations surveyed by LangChain already have agents running in production. The skills that matter are shifting toward architecture, system design, prompt engineering, and quality judgment — the exact skills encoded in rules/commands/skills files.",
    },
  ],
};
