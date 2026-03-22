import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "opencode-vs-claude-code",
  notes: [
    {
      heading: "opencode",
      type: "context",
      content:
        "OpenCode was built by the team behind SST (Serverless Stack) -- Jay V, Frank Wang, Dax Raad, and Adam Elmore. SST went through Y Combinator in 2021, grew to 25K GitHub stars, and turned profitable in 2025. OpenCode launched June 19, 2025, and reached 650K monthly active users within five months. The team's insight: AI coding models would proliferate beyond just Anthropic and OpenAI, and developers would demand open-source alternatives to locked-in tools.",
      url: "https://techfundingnews.com/opencode-the-background-story-on-the-most-popular-open-source-coding-agent-in-the-world/",
    },
    {
      heading: "claude-code",
      type: "note",
      content:
        "According to SemiAnalysis, Claude Code is responsible for ~4% of all public GitHub commits as of February 2026 -- roughly 135,000 commits per day. That figure doubled in a single month and represents 42,896x growth in 13 months since the research preview launch in early 2025. The projection: 20%+ of all daily commits by end of 2026.",
      url: "https://newsletter.semianalysis.com/p/claude-code-is-the-inflection-point",
    },
    {
      heading: "opencode",
      type: "note",
      content:
        "OpenCode has 112K+ GitHub stars (vs Claude Code's ~71K as of February 2026), but raw star counts invert the usage story: Claude Code dominates actual production usage by a wide margin. OpenCode's star count reflects the open-source community's enthusiasm for auditable, provider-agnostic tooling -- a different signal than daily active developer usage.",
      url: "https://github.com/sst/opencode",
    },
    {
      heading: "the-practical-differences",
      type: "context",
      content:
        "In January 2026, Anthropic blocked OpenCode from using Claude via consumer OAuth tokens. OpenCode removed Claude Pro/Max support in response, citing \"Anthropic legal requests.\" The backlash on Hacker News was fierce and split the community -- provider-freedom advocates rallied around OpenCode, while tight-integration advocates stayed with Claude Code. This incident crystallizes the core open-vs-closed tension.",
      url: "https://news.ycombinator.com/item?id=46772249",
    },
    {
      heading: "claude-code",
      type: "context",
      content:
        "Claude Code was released as a research preview in February 2025, made generally available in May 2025 alongside Claude 4, then saw explosive viral growth over the 2025 winter holidays -- partly driven by non-programmers using it for \"vibe coding.\" Anthropic reported a 5.5x revenue increase from Claude Code by July 2025. A web version and iOS app followed in October 2025.",
      url: "https://medium.com/@lmpo/the-evolution-of-claude-code-in-2025-a7355dcb7f70",
    },
    {
      heading: "how-i-use-them",
      type: "counter",
      content:
        "The open-source vs closed-source performance gap is narrowing fast: open models like Qwen3-Coder now score 69.6% on SWE-Bench Verified, nearly matching Claude 4 Sonnet's 72.7%. Open-source models deliver ~90% of closed-model performance at up to 87% lower cost. The implication for coding agents: the model-agnostic bet that OpenCode makes becomes more compelling as the gap shrinks.",
    },
    {
      heading: "what-they-have-in-common",
      type: "quote",
      content:
        "We saw two trends converging. First, there would be an explosion of AI coding models beyond just Anthropic or OpenAI. Second, developers were going to demand open-source alternatives to locked-in, proprietary tools.",
      attribution: "Jay V, OpenCode co-creator and CEO of Anomaly",
      url: "https://techfundingnews.com/opencode-the-background-story-on-the-most-popular-open-source-coding-agent-in-the-world/",
    },
  ],
};
