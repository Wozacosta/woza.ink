import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "exploring-x402-standard",
  notes: [
    {
      heading: "tldr-the-skinny-for-people-on-a-deadline",
      type: "context",
      content:
        "The Decision / Context / Obligations / Advice pattern has deep roots in the XACML (eXtensible Access Control Markup Language) standard, an OASIS spec dating back to 2003. XACML 3.0 formally defines \"obligations\" as directives the enforcement point *must* carry out and \"advice\" as hints it may safely ignore — the same semantics described here.",
      url: "https://docs.oasis-open.org/xacml/3.0/xacml-3.0-core-spec-os-en.html",
    },
    {
      heading: "why-this-matters-and-why-you-should-care",
      type: "context",
      content:
        "HTTP status 402 (\"Payment Required\") was reserved in the original HTTP/1.1 spec (RFC 2068) with the intention of supporting digital cash or micropayment schemes. It sat unused for over 25 years because no universal payment system materialized. The spec literally says: \"This code is reserved for future use.\"",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/402",
    },
    {
      heading: "why-this-matters-and-why-you-should-care",
      type: "note",
      content:
        "Despite 402's \"reserved\" status, it has seen informal adoption. Google APIs return 402 when a developer exceeds quotas. Shopify uses it when a store hasn't paid its fees. Stripe returns it for blocked payments. These uses are technically non-standard but demonstrate the demand for a payment-aware HTTP status code.",
      url: "https://http.dev/402",
    },
    {
      heading: "key-pieces-explained",
      type: "source",
      content:
        "XACML defines four decision values: Permit, Deny, Indeterminate, and NotApplicable. The x402 pattern simplifies this to three (`allow`, `deny`, `indeterminate`), dropping NotApplicable — a pragmatic choice since most API callers don't need to distinguish \"no policy matched\" from \"denied.\"",
      url: "https://en.wikipedia.org/wiki/XACML",
    },
    {
      heading: "where-x402-fits-in-your-stack",
      type: "context",
      content:
        "Open Policy Agent (OPA) is the most widely adopted policy engine in the cloud-native ecosystem. Its decision responses can be structured to include arbitrary context and metadata, making it a natural fit for wrapping in an x402-style envelope. Several teams use OPA + API gateways to produce structured authorization responses rather than bare 403s.",
      url: "https://axiomatics.com/resources/reference-library/extensible-access-control-markup-language-xacml",
    },
    {
      heading: "trade-offs-because-nothing-is-free",
      type: "counter",
      content:
        "The security concern here is real. OWASP lists \"verbose error messages\" as a common vulnerability. Returning detailed policy reasons (like \"missing scope: read:reports\") to unauthenticated callers can help attackers enumerate permissions. Best practice: return full x402 envelopes only to authenticated, authorized callers; give external/anonymous clients a minimal deny with a `trace_id` they can share with support.",
    },
    {
      heading: "trade-offs-because-nothing-is-free",
      type: "note",
      content:
        "Meanwhile in the payments world, Coinbase launched a different \"x402\" in 2025 — an open payment protocol that finally puts the dormant HTTP 402 status code to work. Their x402 lets services respond with `402 Payment Required` plus machine-readable payment terms (amount, asset, network), enabling clients to pay and retry programmatically. By late 2025 it had processed 75M transactions worth $24M.",
      attribution: "Coinbase",
      url: "https://www.x402.org/",
    },
  ],
};
