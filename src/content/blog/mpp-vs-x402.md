---
title: "MPP vs x402: Two Paths for Machine Payments"
date: "2026-03-22"
description: "Stripe's Machine Payments Protocol and Coinbase's x402 both want to let AI agents pay for things. They disagree on almost everything else."
tags: ["web3", "protocols", "standards", "AI"]
---

# MPP vs x402: Two Paths for Machine Payments

AI agents need to pay for things. Not in a hypothetical future — right now. An agent that can browse the web, call APIs, book services, and write code will eventually hit a paywall. When it does, it needs a way to pay without a human typing in a credit card number.

Two protocols launched on the same day — March 18, 2026 — with two very different answers to this problem. [x402](https://www.x402.org/) from Coinbase. [MPP](https://stripe.com/blog/machine-payments-protocol) from Stripe and Tempo. They share the goal. They disagree on almost everything else.

---

## The problem both are solving

Today's payment infrastructure was built for humans. You sign up for an account, navigate a pricing page, enter card details, confirm a subscription. An autonomous agent can't do any of that.

What agents need is a payment primitive that works at the protocol level — something a machine can discover, negotiate, and execute without human intervention. Both x402 and MPP are attempts at building that primitive.

---

## x402: HTTP 402, finally used

The HTTP spec has had a [402 Payment Required](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/402) status code since the late 1990s. It was reserved "for future use" and never standardized. x402 picks it up.

The flow is dead simple:

1. An agent requests a resource (e.g., `GET /api/weather`)
2. The server responds with `402 Payment Required` and a `PAYMENT-REQUIRED` header specifying the price, accepted token, and chain
3. The agent constructs a payment, signs it, and retries the request with a `PAYMENT-SIGNATURE` header
4. The server (or a facilitator) verifies the payment settled on-chain and returns the resource

That's it. No accounts, no API keys, no sessions. One request, one payment, one response.

x402 is chain-agnostic — Base, Polygon, and Solana are live, with Avalanche, Sui, and Near being explored. Payments are stablecoins only, settled on-chain. The protocol is open source under Apache 2.0, backed by the x402 Foundation (Coinbase, Cloudflare, Visa, Google).

Integration is a middleware call:

```javascript
app.use(paymentMiddleware({
  "GET /weather": {
    price: "$0.001",
    network: "base",
    accepts: ["USDC"]
  }
}));
```

The philosophy is Unix-like: do one thing, do it simply, let the ecosystem build on top.

---

## MPP: sessions, streaming, and the full Stripe stack

MPP takes the opposite approach. Where x402 is a thin shim, MPP is a full-stack payment system designed for high-frequency agent transactions.

The key concept is **sessions**. Instead of one blockchain transaction per request, an agent opens a session, authorizes a spending limit upfront, and streams micropayments against it continuously. This is critical for agents making hundreds or thousands of API calls in a single task — one on-chain tx per call doesn't scale.

MPP runs on [Tempo](https://www.tempo.network/), a purpose-built L1 blockchain that does 10,000+ TPS with sub-second finality and no native gas token (fees are paid in stablecoins). But the protocol also supports fiat: cards, buy-now-pay-later, and hybrid crypto-fiat flows through Shared Payment Tokens (SPTs).

For Stripe merchants, integration looks like their existing PaymentIntents API:

```javascript
const payment = await stripe.paymentIntents.create({
  amount: 100,
  currency: "usd",
  payment_method_types: ["crypto"],
  networks: ["tempo"]
});
```

Everything settles into the merchant's Stripe balance. Fraud detection, tax calculation, refunds, reporting — all the existing Stripe infrastructure applies.

Partners include Anthropic, OpenAI, DoorDash, Mastercard, Shopify, and Revolut.

---

## Where they actually differ

| | x402 | MPP |
|---|---|---|
| **Model** | One payment per request | Session-based streaming |
| **Settlement** | On-chain, 200ms to seconds | Sub-second via Tempo |
| **Payment methods** | Stablecoins only | Stablecoins + fiat + hybrid |
| **Integration** | Open middleware, no account needed | Stripe PaymentIntents API |
| **Compliance** | Merchant's responsibility | Stripe-managed |
| **Governance** | Open source, Apache 2.0 | Proprietary, Stripe-controlled |
| **Chains** | Base, Polygon, Solana (expanding) | Tempo L1 |

The fundamental tension is **simplicity vs. completeness**.

x402 is permissionless. Anyone can add a paywall to an API endpoint without signing up for anything. There's no vendor, no approval process, no compliance layer to configure. The tradeoff is that you handle everything else yourself — fraud, taxes, refunds, fiat conversion.

MPP is opinionated. You're in Stripe's ecosystem, which means you get their entire infrastructure but also their rules. The tradeoff is vendor lock-in and a proprietary protocol.

---

## The throughput question

This is where the architectural difference matters most.

x402's one-tx-per-request model works fine for low-frequency API calls — a weather lookup, a document summary, a one-off data fetch. But an agent that makes 500 API calls to complete a task would execute 500 on-chain transactions. Even on Base with sub-cent fees, that's friction and latency that compounds.

MPP's session model handles this natively. The agent authorizes once, streams payments, and the session settles periodically. For high-frequency agent workflows — an AI assistant researching a topic, calling dozens of APIs, aggregating data — this is a materially better architecture.

x402 could solve this with batching or payment channels, but that's not in the protocol today.

---

## Adoption so far

Both protocols are early. The numbers tell an honest story:

**x402** processes about 131,000 daily transactions, averaging $0.20 per payment. Analysis suggests roughly half is test or gamified activity, not real commerce. The volume is there; the commercial usage is still forming.

**MPP** launched with 100+ services in its directory — Alchemy, Dune Analytics, Merit Systems — but significant real transaction volume hasn't materialized yet. The infrastructure is ready; the agents aren't using it at scale.

Neither has won. Neither has lost. The market is still figuring out whether agents will actually pay for things autonomously, and if so, how often.

---

## Which one matters to you

**If you're building an open API or indie service** — x402. No signup, no vendor dependency, permissionless by default. You add a middleware, set a price, and any agent with a wallet can pay. This is the right model for the long tail of the web.

**If you're already on Stripe and need agent payments** — MPP. It's a config change, not a replatform. Sessions and streaming handle high-frequency use cases out of the box, and the compliance layer means you don't have to think about it.

**If you're building agents** — support both. Stripe's actual strategy here is telling: they support both x402 and MPP through separate integration paths, settling everything into Stripe balances regardless of which protocol the agent used. They don't care which wins. They care that settlements flow through them.

---

## The bigger picture

The interesting thing isn't which protocol is better. It's that two of the largest payment companies in the world shipped machine payment protocols on the same day. That's a signal.

The bet is that AI agents will become economic actors — not just tools that humans use, but autonomous participants that discover services, negotiate prices, and pay for resources. If that bet is right, the payment layer between agents and services becomes critical infrastructure.

x402 wants that layer to be open and protocol-native, like HTTP itself. MPP wants it to be managed and enterprise-grade, like Stripe itself. Both are coherent visions. The web will probably need both.
