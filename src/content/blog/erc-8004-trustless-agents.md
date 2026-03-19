---
title: "ERC-8004: Building a Trust Layer for AI Agents Onchain"
date: "2026-03-20"
description: "ERC-8004 gives AI agents verifiable identity, reputation, and validation on Ethereum. Here's what the standard actually defines, why it matters, and where it's headed."
tags: ["web3", "ethereum", "ai", "protocols", "standards"]
---

# ERC-8004: Building a Trust Layer for AI Agents Onchain

AI agents can talk to each other. Protocols like Google's A2A and Anthropic's MCP handle communication and tool use. What they don't handle is trust. When your agent encounters a stranger agent on the open internet — one it's never seen before, operated by someone it has no relationship with — how does it decide whether to interact? How does it verify that agent is who it claims to be? How does it check its track record?

ERC-8004, titled **Trustless Agents**, is an Ethereum standard that answers those three questions with three onchain registries: Identity, Reputation, and Validation. It doesn't replace A2A or MCP — it gives them a trust layer they don't have.

> Note: ERC-8004 is currently in **Draft** status. The spec is actively evolving, with significant community input from Consensys, Ethereum Foundation, Coinbase, and Google contributors. What's described here reflects the standard as of March 2026.

---

## TL;DR

- Three registries: Identity (who are you?), Reputation (what's your track record?), Validation (can a third party verify your work?)
- Agent identity is an ERC-721 NFT — transferable, composable, works with existing wallet infrastructure
- Heavy data stays off-chain via URIs with KECCAK-256 hash commitments; only the trust primitives live onchain
- Deliberately excludes payment mechanisms, reputation formulas, and specific validation methods — those are left to other protocols
- Deployed on Ethereum mainnet and 30+ EVM chains since January 2026, with 45,000+ registered agents

---

## The problem: communication without trust

MCP lets an agent use tools. A2A lets agents talk to each other. Neither answers the fundamental question of an open, permissionless network: **should I trust this agent?**

In a closed system — agents within the same company, or agents from pre-approved partners — trust is inherited from the organizational relationship. You trust your own agents because you deployed them. You trust your partner's agents because you signed a contract with the partner.

In an open system, none of that exists. An agent advertising a service could be competent, incompetent, or actively malicious. There's no organizational hierarchy to fall back on. The agent might claim to be a financial advisor, a code reviewer, or a data analyst — but claims are cheap.

ERC-8004 provides three primitives that let agents establish trust without pre-existing relationships:

1. **Identity**: a verifiable, onchain record of who an agent is
2. **Reputation**: a history of what other agents think of its work
3. **Validation**: independent third-party verification of its outputs

Each is a separate smart contract registry. Each is minimal by design. The standard defines the interfaces; it doesn't dictate how you interpret the data.

---

## Identity Registry: agents as NFTs

The Identity Registry extends ERC-721. When an agent registers, it gets an NFT — a unique onchain identity that's transferable, composable with existing Ethereum tooling, and owned by the address that minted it.

```solidity
function register(
    string agentURI,
    MetadataEntry[] calldata metadata
) external returns (uint256 agentId);
```

The `agentURI` points to an off-chain JSON file — the Agent Registration File — that describes the agent: its name, description, services it offers, and endpoints for protocols like A2A, MCP, or OASF. The URI can point to IPFS, Arweave, or a traditional HTTPS endpoint. What matters is that the onchain record commits to the content via hash.

Agents can store key-value metadata onchain:

```solidity
function setMetadata(
    uint256 agentId,
    string metadataKey,
    bytes metadataValue
) external;
```

One reserved metadata key is `agentWallet` — the payment address for the agent. Setting it requires an EIP-712 or EIP-1271 signature, which means the wallet address must actively consent to being associated with the agent. This prevents impersonation: you can't point your agent's payment address at someone else's wallet without their signature.

The global identifier format is `eip155:{chainId}:{identityRegistry}`, which makes agent identity chain-aware and interoperable across EVM networks.

**Why NFTs?** Because the entire ERC-721 ecosystem already exists. Agents can be transferred between owners, listed on marketplaces, held by multisigs, governed by DAOs, or used as collateral. Every wallet, explorer, and indexer already knows how to handle them. The standard gets composability for free.

---

## Reputation Registry: structured feedback at scale

After interacting with an agent, a client can leave structured feedback onchain:

```solidity
function giveFeedback(
    uint256 agentId,
    int128 value,
    uint8 valueDecimals,
    string tag1,
    string tag2,
    string endpoint,
    string feedbackURI,
    bytes32 feedbackHash
) external;
```

This isn't a five-star review system. The `value` field is a signed 128-bit integer with configurable decimal precision. The `tag1` and `tag2` fields categorize the feedback — `starred` for general quality, `reachable` for endpoint liveness, `uptime` for availability, `tradingYield` with a time period as `tag2`. The `feedbackURI` links to detailed off-chain feedback data, committed with a hash.

Agents can respond to feedback:

```solidity
function appendResponse(
    uint256 agentId,
    address clientAddress,
    uint64 feedbackIndex,
    string responseURI,
    bytes32 responseHash
) external;
```

And clients can revoke feedback if circumstances change. The registry also provides aggregation:

```solidity
function getSummary(
    uint256 agentId,
    address[] clientAddresses,
    string tag1,
    string tag2
) external view returns (
    uint64 count,
    int128 summaryValue,
    uint8 summaryValueDecimals
);
```

**What the standard intentionally doesn't do**: it doesn't define a reputation *formula*. It doesn't say "agents with score > X are trustworthy." That's a deliberate choice. Different applications need different trust models. A DeFi protocol might weight recent trading performance heavily. A code review service might care about long-term consistency. A data pipeline might only care about uptime. The registry provides the raw data; interpretation is left to the consumer.

---

## Validation Registry: third-party verification

The Validation Registry handles cases where you want an independent party to verify an agent's work — not just client opinions, but cryptographic or computational proof.

```solidity
function validationRequest(
    address validatorAddress,
    uint256 agentId,
    string requestURI,
    bytes32 requestHash
) external;

function validationResponse(
    bytes32 requestHash,
    uint8 response,
    string responseURI,
    bytes32 responseHash,
    string tag
) external;
```

The `response` is a 0-100 scale (0 = failed, 100 = passed). The `tag` categorizes the type of validation.

This registry is intentionally generic because the standard supports multiple validation approaches:

- **Crypto-economic validation**: stakers re-execute an agent's task and are slashed if they attest dishonestly
- **zkML proofs**: zero-knowledge proofs that an ML model produced a specific output for a specific input — cryptographic proof of correct inference
- **TEE attestation**: Trusted Execution Environment attestations (Intel SGX/TDX) proving code ran in a secure enclave

The registry doesn't care which mechanism you use. It provides the interface for recording that validation happened and what the result was.

---

## Design philosophy: minimal onchain surface

ERC-8004 is opinionated about what it *excludes*:

- **No payment mechanism.** Protocols like x402 or direct ERC-20 transfers handle payments. The standard only stores the agent's wallet address.
- **No reputation algorithm.** The registry stores raw feedback. How you interpret it is your problem.
- **No mandated validation method.** zkML, TEE, staking — use whatever fits your threat model.
- **No heavy data onchain.** URIs point to off-chain data; KECCAK-256 hashes commit to integrity. The onchain footprint stays small.

This minimalism is the point. The standard provides the thinnest viable trust layer — just enough to let heterogeneous systems compose. A Solidity contract, a Python script, and a browser extension can all query the same registries and make their own trust decisions.

---

## Who's behind it

The authors list includes Marco De Rossi (MetaMask/Consensys), Davide Crapis (Ethereum Foundation), Jordan Ellis (Google), and Erik Reppel (Coinbase). The broader contributor list includes people from ENS, EigenLayer, The Graph, and others — reportedly 100+ industry contributors shaped the spec.

That cross-organizational authorship matters. An agent trust standard only works if it's not owned by any single platform. The fact that MetaMask, EF, Google, and Coinbase are all at the table suggests this isn't a proprietary play dressed as a standard.

---

## Current state and adoption

ERC-8004 contracts were deployed to Ethereum mainnet on January 29, 2026, using CREATE2 for deterministic addresses across 30+ EVM chains:

- **IdentityRegistry**: `0x8004A169FB4a3325136EB29fA0ceB6D2e539a432`
- **ReputationRegistry**: `0x8004BAa17C55a88189AE136b182e5fdA19dE9b63`

As of early 2026, over 45,000 agents have been registered across these chains. Notable implementations include Phala Network (TEE-based agents), Vistara Agent Arena (CrewAI demo), and AgentStore (marketplace using ERC-8004 identity with x402 payments).

The spec itself has had an interesting status journey: it moved from Draft to Review in October 2025, then back to Draft in January 2026 — likely because community feedback warranted significant changes. Multiple companion ERCs have been proposed: multichain agent relationships, zero-knowledge payment verification, agent subscriptions, and agentic commerce extensions.

---

## What I think

ERC-8004 is solving a real problem at the right layer. The agent communication protocols (MCP, A2A) are necessary but not sufficient — they give agents a language without giving them judgment. If the agentic economy is going to be more than agents talking to pre-approved partners inside walled gardens, something like this has to exist.

The NFT-based identity is clever. Not because agents need to be traded on OpenSea, but because it makes agent identity immediately composable with every tool Ethereum already has — wallets, multisigs, governance, indexers. That's a lot of infrastructure you don't have to rebuild.

The deliberate minimalism is the strongest design choice. A standard that tried to define *the* reputation algorithm or *the* validation method would be dead on arrival — different applications need different trust models. By providing only the raw primitives, ERC-8004 stays useful across use cases without prescribing solutions.

The open question is adoption velocity. 45,000 registered agents sounds impressive, but the real test is whether agents are actually *querying* these registries before making trust decisions, or whether registration is just a checkbox. The reputation and validation registries are where the value lives, and they're only useful if populated with meaningful data.

The spec is still in Draft. It's moving fast, and the interfaces may shift. But the core insight — that open agent networks need onchain trust primitives the same way the web needed DNS and TLS — feels right. Whether ERC-8004 becomes *the* standard or just the first serious attempt, the problem it's addressing isn't going away.

---

## Links

- [ERC-8004 spec](https://eips.ethereum.org/EIPS/eip-8004)
- [Ethereum Magicians discussion](https://ethereum-magicians.org/t/erc-8004-trustless-agents/25098)
- [Official contracts repo](https://github.com/erc-8004/erc-8004-contracts)
- [Awesome ERC-8004](https://github.com/sudeepb02/awesome-erc8004)

*Related reading: [Exploring the x402 Standard](/blog/exploring-x402-standard) — the payment protocol several ERC-8004 implementations are pairing with for agent commerce.*
