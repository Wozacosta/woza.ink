---
title: "Exploring the x402 Standard"
date: "2026-02-03"
description: "x402 turns HTTP's long-dormant 402 status code into a way to pay for a single API call with stablecoins. What goes over the wire, who does what, and where it falls short."
tags: ["web3", "protocols", "standards", "payments", "web"]
series: agent-payments
atUri: "at://did:plc:l72dcexjk4ytyh4nhy5vtix4/site.standard.document/3mzbwjzq5za2a"
---

# Exploring the x402 Standard

> **Correction, November 2026.** The first version of this post described x402 as a format for explaining authorization decisions. That was wrong: x402 is a payment protocol. This is a full rewrite.

HTTP has had a status code for "pay me" since the 1990s. `402 Payment Required` was reserved for future use and then left there, because the web never got a payment method a server could ask for in a response.

x402 is the attempt to finally use it. A server answers a request with a price, the client pays in stablecoins and retries the same request, and the data comes back. No account, no API key, no invoice at the end of the month.

It started at Coinbase and launched in May 2025. Since July 2026 it has lived at the x402 Foundation under the Linux Foundation, with about 40 member organizations. The protocol charges no fee of its own; you pay the network's.

---

## Why bother

Normal API billing assumes a person: sign up, add a card, copy a key, get a bill. That works when a developer picks a vendor once. It doesn't work for an AI agent that found a service a minute ago and needs one response from it.

It doesn't work for small amounts either. Card fees make it impossible to charge a tenth of a cent, so APIs sell subscriptions and prepaid credits instead. x402 makes a single request the thing you buy.

---

## What goes over the wire

The exchange uses three headers, each carrying Base64-encoded JSON:

| Header | Sent by | Carries |
| --- | --- | --- |
| `PAYMENT-REQUIRED` | Server, with the 402 | What it costs and how to pay |
| `PAYMENT-SIGNATURE` | Client, on the retry | The signed payment |
| `PAYMENT-RESPONSE` | Server, with the final answer | What happened at settlement |

Here's what `PAYMENT-REQUIRED` decodes to, trimmed from the spec's example:

```json
{
  "x402Version": 2,
  "error": "PAYMENT-SIGNATURE header is required",
  "resource": {
    "url": "https://api.example.com/premium-data",
    "mimeType": "application/json"
  },
  "accepts": [
    {
      "scheme": "exact",
      "network": "eip155:84532",
      "amount": "10000",
      "asset": "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
      "payTo": "0x209693Bc6afc0C5328bA36FaF03C514EF312287C",
      "maxTimeoutSeconds": 60,
      "extra": { "name": "USDC", "version": "2" }
    }
  ]
}
```

`accepts` is a menu: a server can list several chains and tokens, and the client picks one it can pay with. `network` is a CAIP-2 chain ID, here the Base Sepolia testnet. `amount` is in the token's smallest unit, so `10000` is 0.01 USDC.

The client signs a payment matching one entry and resends the same request with it in `PAYMENT-SIGNATURE`. The server answers with the data and a `PAYMENT-RESPONSE` holding the transaction hash.

Developers rarely touch any of this. A middleware does it: you declare a price per route, like `"$0.001"` on `GET /weather`, and it handles the rest.

---

## The facilitator

Checking a payment and putting it onchain means running chain infrastructure, which most API authors don't want to do. So x402 lets the server hand both jobs to a **facilitator**, an optional service with two main endpoints.

`/verify` is read-only. For the default EVM method it checks that the signature recovers to the payer, that the payer has the balance, that the amount and validity window meet the requirement, and that the token and network match. Then it simulates the transfer.

`/settle` puts the transaction onchain and waits for it to confirm.

![The server verifies first, does the work, and only then settles. The facilitator broadcasts the transaction and pays the gas.](diagram:x402-settlement)

The facilitator never holds the money. The client's signature fixes the amount and the destination, so it can't change either. The public facilitator at x402.org only serves testnets, so production means picking another one or running your own.

---

## Paying without gas

An agent shouldn't need a second balance just to pay for gas. On EVM chains the default path is [EIP-3009](https://eips.ethereum.org/EIPS/eip-3009): the client signs a `transferWithAuthorization` message, the facilitator broadcasts it and pays the gas, and the tokens move straight from payer to payee.

Tokens without EIP-3009 go through Permit2 instead. That needs a one-time approval, which the user pays gas for unless a gas-sponsoring extension covers it.

---

## Three ways to charge

- **`exact`** transfers a specific amount. This is the weather API case.
- **`upto`** authorizes a maximum, and the seller settles what was actually used, up to that cap. It suits anything priced by what the response turned out to cost.
- **`batch-settlement`** uses escrow and offchain vouchers, redeemed onchain in batches, for high-frequency use.

---

## Trade-offs

**The server works before it's paid.** In the default flow the order is verify, resource, settle, respond. A payment can pass verification and still fail settlement, and the spec doesn't give the server anything back when that happens. For a cheap response that's noise. For an expensive job it's real exposure.

**Clients can't safely retry.** Once `PAYMENT-SIGNATURE` is sent, the outcome is unknown until the server answers. The docs tell clients not to create a second payment automatically, and a `settlement_pending` error is "non-terminal, not permission to pay again." A timeout is harder to handle here than on a normal API call.

**Confirmation is latency.** With `exact`, every call waits for a chain confirmation. That's quick on a fast L2, but it's still slower than checking an API key.

**Paying isn't permission.** x402 says how to pay. It doesn't say whether this agent is allowed to spend, or whether the server on the other end is any good. Those are separate problems with separate protocols.

---

## Where it fits

x402 is the settlement layer: it moves the money and nothing else. AP2 handles whether an agent may spend, ACP handles the checkout, and L402 is the real rival, using the same status code over Lightning. [The Agentic Payments Stack](/blog/mpp-vs-x402) maps all of them. [ERC-8004](/blog/erc-8004-trustless-agents) covers the other question, which agent you're dealing with.

The appeal is how little it asks for. One status code, three headers and a signature, on top of HTTP, which everything already speaks.

---

## Further reading

- [x402 documentation](https://docs.x402.org/): the concepts, SDKs and supported networks
- [x402 specification](https://github.com/x402-foundation/x402/blob/main/specs/x402-specification-v2.md): the V2 payload formats and the verify and settle steps
- [The exact scheme on EVM](https://github.com/x402-foundation/x402/blob/main/specs/schemes/exact/scheme_exact_evm.md): EIP-3009, Permit2 and what verification actually checks
- [EIP-3009](https://eips.ethereum.org/EIPS/eip-3009): transfers authorized by signature
- [402 Payment Required on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/402): the status code's own history
