---
title: "The Agentic Payments Stack: x402, MPP, AP2, ACP, and L402"
date: "2026-08-21"
description: "Five protocols want to let AI agents pay for things. They turned out not to be competing — mostly. A map of who sits where, and which numbers you shouldn't trust."
tags: ["web3", "protocols", "standards", "AI", "payments"]
---

# The Agentic Payments Stack: x402, MPP, AP2, ACP, and L402

> This article originally ran in March 2026 as a head-to-head between Stripe's MPP and Coinbase's x402. That framing didn't survive contact with the next five months. This is a full rewrite.

AI agents need to pay for things. Not in a hypothetical future — right now. An agent that can browse the web, call APIs, book services, and write code will eventually hit a paywall. When it does, it needs a way to pay without a human typing in a credit card number.

In March 2026, two protocols launched on the same day with two different answers, and it looked like a fight. It wasn't. What actually emerged over the following months is a **stack** — four or five protocols operating at different layers, most of which compose rather than compete. There is exactly one real head-to-head rivalry in here, and it isn't the one anybody was writing about.

---

## The layer map

This is the thing worth internalizing before any of the individual protocols make sense:

| Layer | What it decides | Protocols |
|---|---|---|
| **Checkout** | What the agent is buying, from which merchant catalog | ACP |
| **Authorization** | Whether this agent is *allowed* to spend, and how much | AP2 |
| **Settlement** | How the money actually moves | x402, MPP, L402 |

An agent can plausibly use all three at once: ACP to negotiate the purchase, AP2 to prove it holds a valid spending mandate, and x402 to move the stablecoins. That composition is not theoretical — Google's A2A x402 extension, built with Coinbase and MetaMask, exists specifically to let AP2-authorized agents settle through x402.

So when people ask "which one wins," they're usually comparing a checkout protocol to a settlement protocol. The real contest is *inside* the settlement layer.

---

## The settlement layer: where the actual fight is

### x402 — HTTP 402, finally used

The HTTP spec has had a [402 Payment Required](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/402) status code since the late 1990s, reserved "for future use" and never standardized. x402 picks it up.

The flow is dead simple:

1. An agent requests a resource (e.g., `GET /api/weather`)
2. The server responds with `402 Payment Required` and a `PAYMENT-REQUIRED` header specifying the price, accepted token, and chain
3. The agent constructs a payment, signs it, and retries the request with a `PAYMENT-SIGNATURE` header
4. The server (or a facilitator) verifies the payment settled on-chain and returns the resource

No accounts, no API keys, no sessions. One request, one payment, one response.

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

**What changed since March.** Two things, both significant.

[x402 V2 shipped in late June 2026](https://x402.org/x402-v2-launch/), fully backward-compatible with V1. It added a unified multi-chain interface with dynamic payment routing, a plugin-driven SDK with lifecycle hooks, a modular `@x402/paywall` package covering EVM and Solana, automatic API discovery so facilitators can index endpoints and pricing, and modernized headers replacing the deprecated `X-*` convention.

It also added two things that read as direct answers to the criticisms in the original version of this article: **wallet-based identity with reusable sessions**, so agents skip re-paying on every call, and **support for legacy rails** — ACH, SEPA, card networks — inside the same model. More on why that matters below.

Second, governance moved out of Coinbase. The **x402 Foundation** was contributed to the Linux Foundation, announced in April and operational by July, with roughly 40 member organizations. Premier members now include Google, Visa, AWS, Cloudflare, Circle, Stripe, Mastercard, and Coinbase. A spec v1.0 is targeted for Q3 2026, after which backward-compatibility guarantees apply.

That members list is worth reading twice. Stripe is a premier member of the foundation governing the protocol that its own MPP supposedly competes with.

### MPP — sessions, streaming, and the full Stripe stack

MPP takes the opposite approach. Where x402 is a thin shim, MPP is a full-stack payment system designed for high-frequency agent transactions.

The key concept is **sessions**. Instead of one blockchain transaction per request, an agent opens a session, authorizes a spending limit upfront, and streams micropayments against it continuously. For an agent making hundreds of API calls in a single task, one on-chain transaction per call doesn't scale.

MPP runs on [Tempo](https://www.tempo.network/), a purpose-built L1 that does 10,000+ TPS with sub-second finality and no native gas token — fees are paid in stablecoins. It also reaches beyond crypto: cards, buy-now-pay-later, and hybrid flows through Shared Payment Tokens. Visa extended it to card rails; Lightspark extended it to Bitcoin over Lightning.

For Stripe merchants, integration looks like their existing PaymentIntents API:

```javascript
const payment = await stripe.paymentIntents.create({
  amount: 100,
  currency: "usd",
  payment_method_types: ["crypto"],
  networks: ["tempo"]
});
```

It launched March 18, 2026 with 100+ integrated services, and partners including Anthropic, OpenAI, DoorDash, Mastercard, Shopify, and Revolut.

**The problem for MPP:** its clearest architectural advantage over x402 was the session model. x402 V2 now has sessions. That doesn't erase the difference — MPP's are natively streaming, x402's are closer to reusable payment identity — but the gap narrowed considerably in a single release, and it narrowed in x402's favor.

### L402 — the one nobody puts on these lists

Here's the actual rival, and the one the original version of this article missed entirely.

[L402](https://github.com/lightninglabs/L402) is Lightning Labs' protocol for paying for and authenticating access to APIs over the Lightning Network. It solves the *same problem as x402*, using the *same HTTP status code*, with a completely different settlement layer and a completely different politics.

The mechanism is genuinely distinct. L402 combines **macaroons** — cryptographic bearer credentials — with Lightning micropayments. Proof of payment is baked into the credential itself, which means the credential *is* the receipt. No facilitator has to attest that a payment settled, because possession of the macaroon plus the payment preimage proves it. That's a meaningfully more elegant trust model than x402's facilitator-verifies-on-chain flow.

Lightning Labs shipped [Lightning Agent Tools](https://lightning.engineering/posts/2026-02-11-ln-agent-tools/) in February 2026 — seven composable skills letting agents pay L402-gated APIs, host paid endpoints, and run end-to-end buyer/seller workflows — and [launched a dedicated L402 site](https://www.l402.org/) in July.

The catch is operational, and it's a real one: L402 settlement requires the payment preimage, and **Nostr Wallet Connect doesn't return preimages**, so a large slice of the consumer Lightning wallet ecosystem simply can't do L402. You need LND, Strike, or something equivalent. That's a meaningful adoption tax that x402 doesn't pay.

x402 vs. L402 is the honest fight in this space: same status code, same one-request-one-payment shape, stablecoins-on-EVM versus Bitcoin-on-Lightning. Everything else on this page is a different layer.

---

## "Didn't Binance build an alternative?"

This one comes up a lot, and the answer is the opposite of what the framing suggests.

**Binance x402 is not an alternative to x402. It's an implementation of it.**

Binance announced x402 support for BNB Chain on May 19, 2026, extending Coinbase's protocol to their chain with programmable micropayments, automated spending limits, and settlement in U, USD1, USDT, and USDC. On July 13, the Binance Agentic Wallet added x402 payments, spanning BNB Chain, Ethereum, Solana, and Base.

Then on **August 20, 2026 — yesterday, as this is published** — Binance launched [Agent OS](https://www.prnewswire.com/news-releases/binance-introduces-agent-os-to-connect-ai-applications-to-financial-infrastructure-302856306.html), a developer platform bundling Binance APIs, the Wallet Agentic Hub, Binance x402, a Skill Hub, and newly added Model Context Protocol support. The pitch is letting agents like ChatGPT and Claude reach trading, market data, wallet, and payment infrastructure through one standardized layer.

The strategically interesting part isn't the product. It's that **Binance chose to adopt a Coinbase-originated standard rather than ship a competing one** — which is not the historically obvious move for Binance. Combine that with Stripe sitting as a premier member of the x402 Foundation while shipping MPP, and a pattern emerges: the settlement standard is consolidating around x402, and the large players are competing on the wallet, distribution, and agent-tooling layers above it instead.

If you want a single sentence for where this landed: x402 is winning the protocol war by being boring enough that everyone can adopt it without conceding anything that matters to them.

---

## The layers above

**AP2 (Agent Payments Protocol)** — Google, with 60+ organizations including Mastercard, PayPal, Amex, Adyen, Revolut, Worldpay, and Coinbase. This is the **authorization and trust** layer. Its core primitive is the cryptographic **mandate**: a signed, pre-authorized spending permission that an agent carries and a merchant can verify. It's rail-agnostic by design — cards, bank transfers, real-time payments, and stablecoins via the A2A x402 extension. The crypto path is production-ready; the broader card implementations are still maturing.

AP2 is the protocol most likely to matter to enterprises, because "can this agent legally spend my money, and can I prove it afterward" is the question compliance departments actually ask.

**ACP (Agentic Commerce Protocol)** — OpenAI and Stripe, launched February 2026 in ChatGPT's Instant Checkout. This is the **checkout** layer: merchant catalogs, product selection, order flow. Cards and fiat only, through Stripe.

ACP is also the cautionary tale here. OpenAI pivoted to an app-based model within weeks of launch, in March. The protocol survives as an open standard with Stripe, Shopify, Salesforce, and PayPal support, but its flagship distribution channel walked away almost immediately. Per-transaction card economics also make it structurally unsuitable for micropayments — it's built for an agent buying you a $40 sweater, not an agent making 500 API calls.

---

## The numbers, and why you should distrust most of them

Every article about x402 quotes an adoption figure. The figures do not agree, and the disagreement is not small.

| Source | Claim | As of |
|---|---|---|
| Chainalysis | 100M+ cumulative transactions on Base | Q1 2026 |
| RZLT | ~165M transactions, **~$50 million** cumulative volume | Late April 2026 |
| Coinbase | 169M payments, 590K buyers, 100K sellers | First year |
| Solana Foundation | 200M payments, **$50 billion** volume | Aug 5, 2026 |

The transaction counts roughly agree — call it 100–200 million. The dollar volumes differ **by three orders of magnitude**. $50M across 165M transactions is $0.30 per payment, which is a micropayment protocol working exactly as designed. $50B across 200M transactions is $250 per payment, which would be a completely different protocol serving a completely different market.

Both figures cannot be describing the same thing. And note who's publishing which: the small number comes from an independent analyst, the enormous one from a webinar by a foundation whose chain reportedly drives a majority of x402 volume.

The most rigorous source is the most cautious. [Chainalysis](https://www.chainalysis.com/blog/x402-agentic-payments-adoption/) publishes transaction counts and pointedly **declines to publish a cumulative USD volume figure at all**. What they do publish is more useful than either headline number:

- Transactions of $1+ went from 49% of volume in early 2025 to **95% by early 2026** — the mix is shifting toward economically meaningful payments
- Growth through late 2025 was "driven in large part by meme coin activity, particularly PING" — a large share of early volume was not commerce
- The average x402 payer wallet is **197 days old**, against 423 days for typical Base users — these are new wallets, consistent with agents and experimentation rather than established economic actors

That's the honest picture: real and growing, mix improving, absolute commercial volume unknown and probably smaller than the loudest numbers suggest. Anyone quoting you a round $50B figure is quoting a webinar.

---

## The vendor tier

Below the protocols sits a layer of products that are frequently listed as "x402 alternatives" but are mostly platforms built on or around them:

- **Skyfire** — KYA ("Know Your Agent") plus a USDC ledger for agent-to-merchant payments. Their positioning thesis is sharp: *x402 is plumbing; enterprises want a turnkey product with agent vetting baked in.*
- **Kite AI** — PayPal Ventures-backed Avalanche L1 targeting sub-100ms settlement and streaming payments at roughly $0.000001 per transaction.
- **Nevermined** — zero-knowledge architecture for confidential AI commerce, with outcome-based pricing alongside usage-based.
- **PayAI** — gasless cross-chain transactions, subsidized by the network, requiring native token holdings.
- **Virtuals Protocol** — tokenized agents and marketplace settlement; really a launchpad, not payment infrastructure.

Treat comparison posts in this tier carefully. Several of the "best x402 alternatives" roundups circulating are published by vendors on this list, ranking themselves first.

---

## What to actually use

**Building an open API or an indie service** — x402. No signup, no vendor dependency, permissionless. Add middleware, set a price, and any agent with a wallet can pay. V2's discovery mechanism means facilitators can index you automatically, which is the closest thing to distribution this space has.

**Already on Stripe** — MPP. It's a config change, not a replatform. The compliance layer means you don't have to think about fraud, tax, or refunds.

**Bitcoin-native, or you want the credential to be the receipt** — L402. Just verify your wallet returns preimages before committing.

**Enterprise, and someone will ask you to prove the agent was authorized** — AP2 for mandates, settling through x402 underneath.

**Building agents** — support x402 first, and treat everything else as optional. That advice has genuinely changed since March: the answer then was "support both x402 and MPP." The consolidation around x402 at the settlement layer, plus Binance and Stripe both endorsing it, makes it the single safest bet.

---

## The bigger picture

The March framing — two payment giants, same day, competing visions — made for a cleaner story than what actually happened. What happened is more boring and more consequential: the industry decided the settlement layer should be a commodity, moved it to the Linux Foundation, and started competing one level up on wallets, agent tooling, and distribution.

That's roughly how HTTP itself went. Nobody competes on the status codes. They compete on what they build with them.

The open question is still the one from March, and it's a demand question rather than a supply one. All of this infrastructure now exists and works. Whether agents actually become economic actors at scale — discovering services, negotiating prices, spending money without a human in the loop — is not something another protocol release can answer. The plumbing is finished. We're waiting to find out if anyone turns on the tap.

---

## Further reading

- [x402 V2 launch announcement](https://x402.org/x402-v2-launch/) — the primary source for what V2 changed; note that several secondary trackers date V2 to December 2025, which is wrong
- [x402 Foundation at the Linux Foundation](https://www.linuxfoundation.org/press/linux-foundation-is-launching-the-x402-foundation-and-welcoming-the-contribution-of-the-x402-protocol) — the governance handoff, and the member list
- [Chainalysis: Inside x402](https://www.chainalysis.com/blog/x402-agentic-payments-adoption/) — the only adoption analysis here that's honest about what it doesn't know
- [L402 protocol spec](https://github.com/lightninglabs/L402) — macaroons plus Lightning; the Bitcoin answer to the same question
- [Why L402 Is the Internet-Native Payments Protocol for Agents](https://lightning.engineering/posts/2026-03-11-L402-for-agents/) — Lightning Labs making their case directly
- [Agentic payments protocols compared](https://www.crossmint.com/learn/agentic-payments-protocols-compared) — a useful layer-by-layer comparison, though check its dates against primary sources
- [ERC-8004: Building a Trust Layer for AI Agents Onchain](/blog/erc-8004-trustless-agents) — the identity and reputation problem that sits underneath all of this; an agent you can pay is only useful if you know which agent you're paying
