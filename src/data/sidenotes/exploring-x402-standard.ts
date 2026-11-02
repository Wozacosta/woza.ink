import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "exploring-x402-standard",
  notes: [
    {
      marker: "was reserved for future use and then left there",
      type: "context",
      content:
        "HTTP status 402 (\"Payment Required\") was reserved in the original HTTP/1.1 spec (RFC 2068) with the intention of supporting digital cash or micropayment schemes. It sat unused for over 25 years because no universal payment system materialized. The spec literally says: \"This code is reserved for future use.\"",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/402",
    },
    {
      marker: "A server answers a request with a price",
      type: "note",
      content:
        "Despite 402's \"reserved\" status, it has seen informal adoption. Google APIs return 402 when a developer exceeds quotas. Shopify uses it when a store hasn't paid its fees. Stripe returns it for blocked payments. These uses are technically non-standard but demonstrate the demand for a payment-aware HTTP status code.",
      url: "https://http.dev/402",
    },
    {
      marker: "is a CAIP-2 chain ID",
      type: "source",
      content:
        "CAIP-2 is a chain-agnostic way to name a blockchain: a namespace plus a reference. `eip155:8453` is Base, and `solana:...` names a Solana cluster. It's why one `network` field can describe any ecosystem x402 supports.",
      url: "https://chainagnostic.org/CAIPs/caip-2",
    },
    {
      marker: "the client signs a `transferWithAuthorization` message",
      type: "source",
      content:
        "EIP-3009 lets a token holder sign a transfer that someone else submits. The signature carries a validity window and a random nonce, so it can't be replayed, and whoever broadcasts it pays the gas without being able to change the amount or the recipient.",
      url: "https://eips.ethereum.org/EIPS/eip-3009",
    },
    {
      marker: "L402 is the real rival",
      type: "counter",
      content:
        "L402 answers the same 402 with a macaroon and a Lightning invoice. Proof of payment lives in the credential, so no facilitator has to attest that anything settled. It avoids x402's facilitator entirely, at the cost of needing a Lightning wallet that returns payment preimages.",
      url: "https://github.com/lightninglabs/L402",
    },
  ],
};
