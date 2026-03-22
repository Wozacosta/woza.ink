import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "mpp-vs-x402",
  notes: [
    {
      marker:
        "Today's payment infrastructure was built for humans",
      type: "context",
      content:
        "Micropayments on the web have been attempted for decades. Ted Nelson envisioned them in Project Xanadu before the web existed. Brave's Basic Attention Token (BAT) raised $35 million in a 30-second ICO in 2017 but remained locked inside the Brave browser. The Lightning Network enabled sub-cent Bitcoin transactions but never broke into mainstream commerce. The mental burden of assessing fairness for penny-scale prices has been a persistent barrier. AI agents may finally solve the demand side — they don't experience \"payment fatigue.\"",
    },
    {
      marker:
        'has had a [402 Payment Required](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/402) status code since the late 1990s',
      type: "source",
      content:
        "HTTP 402 was defined in **RFC 2068** (HTTP/1.1, 1997) with the note: \"reserved for future use.\" Every HTTP specification since has carried it unchanged — nearly three decades of dormancy. The original intent was to enable digital cash or micropayment systems, but no standard convention was ever adopted. x402 is the first serious attempt to give it a real meaning.",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/402",
    },
    {
      marker:
        "The protocol is open source under Apache 2.0, backed by the x402 Foundation",
      type: "source",
      content:
        "The x402 Foundation was co-established by Coinbase and Cloudflare, with Visa and Google as founding members. Cloudflare's integration means x402 paywalls can be deployed at the CDN edge, adding payment gating to any API endpoint without modifying the origin server. The protocol supports CAIP-2 network identifiers and all ERC-20 tokens, not just USDC.",
      url: "https://blog.cloudflare.com/x402/",
    },
    {
      marker:
        "runs on [Tempo](https://www.tempo.network/), a purpose-built L1 blockchain that does 10,000+ TPS",
      type: "quote",
      content:
        "Patrick Collison on Tempo: \"These businesses are not using crypto because it's crypto or for speculative benefit. They're performing real-world financial activity, and they've found that crypto (via stablecoins) is easier, faster, better than the status quo.\" He called Tempo a \"decentralized, internet-scale SWIFT\" — an imperfect but useful analogy.",
      attribution: "Patrick Collison, Stripe CEO",
      url: "https://x.com/patrickc/status/1963638753752420407",
    },
    {
      marker:
        "the protocol also supports fiat: cards, buy-now-pay-later, and hybrid crypto-fiat flows",
      type: "context",
      content:
        "MPP's reach extends beyond crypto rails. Visa has extended MPP to support card-based payments on its network. Lightspark has extended it to Bitcoin payments over Lightning. Stripe itself bridges to cards, wallets, and other fiat methods through Shared Payment Tokens (SPTs). The protocol is blockchain-native but designed to be payment-method agnostic.",
      url: "https://fortune.com/2026/03/18/stripe-tempo-paradigm-mpp-ai-payments-protocol/",
    },
    {
      marker:
        "an agent that makes 500 API calls to complete a task would execute 500 on-chain transactions",
      type: "counter",
      content:
        "The community consensus is emerging that x402 and MPP are **not in direct competition** — they're distributed across different segments. x402 covers the long-tail of the open web (indie APIs, permissionless endpoints), while MPP handles high-frequency commercial traffic (enterprise SaaS, platform marketplaces). An agent that supports both can navigate the entire spectrum.",
      url: "https://defiprime.com/stripe-mpp-vs-x402",
    },
    {
      marker:
        "The volume is there; the commercial usage is still forming",
      type: "source",
      content:
        "A CoinDesk analysis from early March 2026 noted that while x402 transaction counts have exceeded 15 million total, \"demand is just not there yet\" for real commercial usage. A significant share of activity comes from Coinbase itself, followed by Daydreams Systems. The gap between protocol readiness and actual agent-driven commerce remains the central question for both protocols.",
      url: "https://www.coindesk.com/markets/2026/03/11/coinbase-backed-ai-payments-protocol-wants-to-fix-micropayment-but-demand-is-just-not-there-yet",
    },
    {
      marker:
        "two of the largest payment companies in the world shipped machine payment protocols on the same day",
      type: "quote",
      content:
        "Collison's pragmatic philosophy extends to how Stripe approaches the x402-vs-MPP question: \"Every time there's a super elegant way to do things and a practical, pragmatic way to do things, we're just gonna cut the corner — at least until we validate that there's actual user value here.\" Stripe supports both protocols through separate integration paths, settling everything into Stripe balances regardless of which the agent used.",
      attribution: "Patrick Collison",
      url: "https://www.dwarkesh.com/p/patrick-collison",
    },
  ],
};
