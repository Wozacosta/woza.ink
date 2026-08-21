import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "mpp-vs-x402",
  notes: [
    {
      marker:
        "status code since the late 1990s, reserved \"for future use\" and never standardized",
      type: "source",
      content:
        "HTTP 402 was defined in **RFC 2068** (HTTP/1.1, 1997) with the note: \"reserved for future use.\" Every HTTP specification since has carried it unchanged — nearly three decades of dormancy. The original intent was to enable digital cash or micropayment systems, but no standard convention was ever adopted. x402 and L402 are the first serious attempts to give it a real meaning, and it's a genuine curiosity that both landed on the same dormant status code independently.",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/402",
    },
    {
      marker: "That composition is not theoretical",
      type: "context",
      content:
        "Micropayments on the web have been attempted for decades. Ted Nelson envisioned them in Project Xanadu before the web existed. Brave's Basic Attention Token raised $35 million in a 30-second ICO in 2017 but stayed locked inside the Brave browser. The Lightning Network enabled sub-cent Bitcoin transactions but never broke into mainstream commerce. The persistent barrier was always psychological — the mental burden of assessing whether a penny-scale price is fair. AI agents may finally solve the demand side, because they don't experience payment fatigue.",
    },
    {
      marker: "**wallet-based identity with reusable sessions**",
      type: "counter",
      content:
        "This is the single most consequential line in the V2 release notes, and it's easy to miss. The March 2026 case for MPP over x402 rested almost entirely on the argument that one-on-chain-transaction-per-request doesn't scale for an agent making hundreds of calls. V2 doesn't fully close that gap — MPP's streaming sessions are still architecturally different from reusable payment identity — but it removes the clean version of the criticism. Protocols rarely lose on architecture; they lose on distribution.",
      url: "https://x402.org/x402-v2-launch/",
    },
    {
      marker: "That members list is worth reading twice",
      type: "note",
      content:
        "Premier membership in the x402 Foundation includes Google (which ships AP2), Stripe (which ships MPP), Visa and Mastercard (which ship their own agent commerce products), AWS and Cloudflare (which embed x402 at the edge), plus Circle and Coinbase. Effectively every serious competitor in agentic payments is helping govern the settlement standard. That's either healthy commoditization or a very crowded room, depending on your priors.",
      url: "https://www.linuxfoundation.org/press/linux-foundation-is-launching-the-x402-foundation-and-welcoming-the-contribution-of-the-x402-protocol",
    },
    {
      marker:
        "MPP runs on [Tempo](https://www.tempo.network/), a purpose-built L1 that does 10,000+ TPS",
      type: "quote",
      content:
        "Patrick Collison on Tempo: \"These businesses are not using crypto because it's crypto or for speculative benefit. They're performing real-world financial activity, and they've found that crypto (via stablecoins) is easier, faster, better than the status quo.\" He called Tempo a \"decentralized, internet-scale SWIFT\" — an imperfect but useful analogy.",
      attribution: "Patrick Collison, Stripe CEO",
      url: "https://x.com/patrickc/status/1963638753752420407",
    },
    {
      marker: "Proof of payment is baked into the credential itself",
      type: "context",
      content:
        "Macaroons are a bearer credential format from a 2014 Google research paper. Their distinguishing feature is **attenuation**: the holder can add caveats to a macaroon — narrowing what it permits — without contacting the issuer, and without being able to broaden it. For agent payments this is genuinely elegant. A buying agent can mint a restricted credential for a subagent (\"this endpoint only, expires in 60 seconds\") entirely offline. x402 has no equivalent primitive.",
      url: "https://research.google/pubs/pub41892/",
    },
    {
      marker: "**Nostr Wallet Connect doesn't return preimages**",
      type: "counter",
      content:
        "This is a small technical detail with outsized strategic consequences. L402 settlement requires the payment preimage as proof, and NWC — the connection standard used by CoinOS, CLINK, and Alby Hub — doesn't return one. In practice that limits L402 to LND, Strike, and similar. A protocol that only works with a subset of its own ecosystem's wallets has an adoption ceiling that no amount of architectural elegance fixes.",
    },
    {
      marker:
        "**Binance x402 is not an alternative to x402. It's an implementation of it.**",
      type: "note",
      content:
        "Worth stating plainly because the naming actively misleads. \"Binance x402\" reads like a competing product the way \"Binance Smart Chain\" was a competing chain. It isn't. It's BNB Chain support for Coinbase's protocol, announced May 19, 2026, settling in U, USD1, USDT, and USDC. For a company that has historically preferred to fork or clone rather than adopt, choosing interoperability here is the actual news.",
      url: "https://blockonomi.com/binance-x402-launches-http-native-programmable-payments-for-ai-agents-on-bnb-chain/",
    },
    {
      marker:
        "OpenAI pivoted to an app-based model within weeks of launch, in March",
      type: "context",
      content:
        "ACP is the clearest reminder that protocol adoption is a distribution problem, not a technical one. The spec was fine. Stripe, Shopify, Salesforce, and PayPal all shipped support. But the protocol's reason to exist was Instant Checkout inside ChatGPT, and when OpenAI restructured around apps a few weeks later, ACP lost the only distribution channel that made it inevitable. It survives as an open standard that works and that nobody urgently needs.",
    },
    {
      marker: "declines to publish a cumulative USD volume figure at all",
      type: "source",
      content:
        "Chainalysis publishes cumulative transaction counts, value distribution, and wallet-age analysis for x402, but no cumulative dollar volume. For a firm whose entire business is measuring on-chain value flows, that omission is not an oversight — it's a judgment that the figure would be misleading given how much early volume was meme coin activity. The absence is more informative than the numbers other outlets are willing to print.",
      url: "https://www.chainalysis.com/blog/x402-agentic-payments-adoption/",
    },
    {
      marker: "ranking themselves first",
      type: "note",
      content:
        "A specific example: the widely-circulated \"6 Best x402 Alternatives\" post is published by Nevermined, which appears at position one. This is standard comparison-SEO practice and not exactly dishonest, but it means the vendor tier of this landscape is mostly documented by its own participants. Treat rankings accordingly, and prefer primary sources for anything load-bearing.",
    },
    {
      marker: "That's roughly how HTTP itself went",
      type: "context",
      content:
        "The analogy holds better than most protocol comparisons. TCP/IP and HTTP became commodities precisely because no single vendor could own them, which is what made the layers above — browsers, CDNs, cloud platforms — enormously valuable. If x402 follows that path, the money in agentic payments won't be in the settlement protocol. It'll be in the wallets, the facilitators, and the agent platforms, which is exactly where Coinbase, Binance, and Stripe are now positioning.",
    },
  ],
};
