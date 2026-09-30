---
title: "Clear Signing: Teaching Wallets to Say What You're Signing"
date: "2026-09-30"
description: "Why hardware wallets showed hashes for a decade, why decoding the ABI isn't enough, and how ERC-7730 descriptors, a public registry and auditor attestations are finally making transactions readable."
tags: ["web3", "ethereum", "security", "standards"]
---

# Clear Signing: Teaching Wallets to Say What You're Signing

A hardware wallet makes one promise: whatever the screen shows is true. Your laptop can be compromised, the website can be fake, the browser extension can be malicious, but the little screen on the device only shows what the device itself decoded from the bytes it's about to sign.

For most of the last decade, when those bytes were a smart contract call, the screen showed a hash. Or a warning that said "Blind signing" and asked you to press both buttons anyway.

In February 2025 that gap cost Bybit $1.44 billion. The signers were on hardware wallets. They approved what their compromised multisig interface told them was a routine transfer, because their devices couldn't tell them otherwise. My [post on multisig](/blog/multisig-security-model) ended on the lesson: the part that failed was knowing what you're signing.

This post is about that part. How blind signing happens, why decoding the ABI doesn't fix it, and how a Ledger side project became an Ethereum standard with a public registry behind it.

---

## What blind signing actually is

A plain ETH transfer is easy. The transaction has a recipient and an amount, the wallet understands both natively, and the screen shows "Send 1.5 ETH to 0xd8dA…6045". That's clear signing, and it has always worked.

A contract call is different. The interesting part lives in the `data` field, the calldata: four bytes identifying the function, then the arguments, ABI-encoded into 32-byte words:

```text
0x095ea7b3
  0000000000000000000000003fc91a3afd70395cd496c647d5a6cc9d4b2b7fad
  ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
```

To the device this is opaque. It doesn't know which contract it's talking to, what `0x095ea7b3` means, or which arguments matter. So it either shows the raw hex, a hash of it, or refuses unless you've switched on a "blind signing" setting. Many DeFi users switched it on years ago and never thought about it again.

That transaction, by the way, approves Uniswap's router to spend an unlimited amount of a token. It's one of the most common transactions in DeFi, and one of the most abused.

Off-chain signatures had the same problem, worse. Before [EIP-712](https://eips.ethereum.org/EIPS/eip-712), apps asked you to sign an opaque blob. EIP-712 (2017) added typed, structured messages, so a wallet could at least show field names. But the values stayed raw: an amount in base units, a spender as a hex address, a deadline as a Unix timestamp. On small screens many devices still showed only two hashes, one for the domain and one for the message. Gasless "permit" signatures, which grant token spending without an on-chain transaction, became a favourite phishing tool for exactly this reason.

---

## Decoding the ABI isn't clear signing

The obvious fix is to decode the calldata. Fetch the contract's ABI from a verified source like [Sourcify](https://sourcify.dev) or Etherscan, match the selector, decode the arguments. Every block explorer does this. So do wallet extensions.

Here's what you get for the transaction above:

```text
approve(address spender, uint256 value)
  spender  0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD
  value    115792089237316195423570985008687907853269984665640564039457584007913129639935
```

That's correct, and nearly useless. Three things are missing:

- **Units.** `value` is in the token's smallest unit. You need the token's decimals and ticker, which live in a different contract, to show "1,500 USDC". Here the number is 2²⁵⁶−1, which every UI treats as "unlimited", but nothing in the ABI says so.
- **Names.** `0x3fC9…7FAD` is Uniswap's Universal Router. The ABI doesn't know that. Neither does the user.
- **Intent and relevance.** Which fields matter to a human, which are plumbing, and what the call *does* in one word: send, swap, approve, stake. A Safe transaction has ten parameters; a few carry the meaning and the rest are gas plumbing.

Decoding tells you the structure. Clear signing needs meaning, and meaning has to come from someone who knows the contract.

---

## ERC-7730: a descriptor per contract

[ERC-7730](https://eips.ethereum.org/EIPS/eip-7730) is the format for that meaning. A **descriptor** is a JSON file that sits next to a contract's ABI and says how to present each function to a human. Here's the real one for ERC-20 `approve`, from the public registry, trimmed:

```json
"approve(address _spender, uint256 _value)": {
  "intent": "Approve",
  "fields": [
    {
      "path": "_spender",
      "label": "Spender",
      "format": "addressName",
      "params": { "types": ["eoa", "contract"] }
    },
    {
      "path": "_value",
      "label": "Amount",
      "format": "tokenAmount",
      "params": {
        "tokenPath": "@.to",
        "threshold": "0x8000000000000000000000000000000000000000000000000000000000000000"
      }
    }
  ]
}
```

Each field says where the value is (`path`), what to call it (`label`) and how to render it (`format`). `tokenAmount` looks up the token being called (`@.to`, the transaction's destination) for decimals and ticker. `threshold` says that anything above 2²⁵⁵ should be shown as a message, "Unlimited" by default. The result on screen:

```text
Approve
Spender   Uniswap Universal Router
Amount    Unlimited USDC
```

A full descriptor has three sections. **Context** binds it to specific contracts, by chain ID and address, or to an EIP-712 domain. The spec says a wallet MUST check that what it's signing matches that binding, so a descriptor for one contract can't be reused to dress up another. **Metadata** holds constants, token info and enums, like `0 → Call, 1 → Delegate Call`. **Display** holds the per-function formats.

The formatter list is where the design shows: `tokenAmount`, `amount` for native currency, `addressName` for resolving names, `date` for timestamps and block heights, `enum`, `duration`, `nftName`, and `calldata` for a call nested inside another call. That last one matters a lot, as we're about to see.

If a wallet meets a function with no matching format, the spec tells it to show a safe fallback such as "Unknown function" with the raw arguments, and never to apply some unrelated format that happens to be nearby.

---

## Bybit, replayed with a descriptor

Bybit's cold wallet was a Safe. The transaction the signers approved was a Safe `execTransaction` with ten parameters. One of them, `operation`, was set to 1: a delegatecall, which runs another contract's code inside the Safe's own storage. The attacker's contract used it to replace the Safe's implementation with their own.

The registry now has descriptors for every recent Safe version. For `execTransaction`, the intent is "sign multisig operation", and two of the fields marked `"visible": "always"` are the ones that matter here:

- **Operation type**, through an enum: `Call` or `Delegate Call`.
- **Transaction**, the nested `data` rendered with the `calldata` formatter: it looks up the descriptor for the inner call's target and shows *that* call clearly too.

A routine transfer from a cold wallet never needs a delegatecall. With this descriptor, the device would have said "Delegate Call" in plain words, followed by a nested call to a contract it didn't recognize, which it can't prettify and would show as unknown. That doesn't make the attack impossible. It makes it visible, on the one screen the attacker couldn't touch.

---

## Who vouches for the descriptor?

Clear signing moves trust; it doesn't remove it. Before, you trusted the website to show you the right transaction. Now you trust a descriptor to describe the contract honestly. A malicious descriptor that labels an `approve` as "Receive rewards" is its own attack.

ERC-7730 says this openly: turning transaction data into human-readable text "requires trust in external data sources". The answer is layered:

1. **Binding.** A descriptor only applies to the exact contracts and chains in its context, so you can't write a flattering descriptor for your drainer and have it apply elsewhere.
2. **A public registry.** Descriptors live in [a GitHub repository](https://github.com/ethereum/clear-signing-erc7730-registry), organized by the entity that submitted them, with test cases and review. As of late September 2026 it holds 387 descriptors from 57 organizations, among them Uniswap, Aave, Lido, Safe, 1inch, OpenSea, Circle and Tether. Anyone can mirror it.
3. **Attestations.** A draft standard, ERC-8176, lets auditors cryptographically sign a specific descriptor, saying "this file accurately describes this contract." Wallets can require attestations from auditors they trust before rendering. The registry already stores them next to the descriptors they cover: 174 attestation files so far.

It's a familiar shape: a public, forkable list of claims, plus signatures from parties whose reputation is on the line. Certificate Transparency and package signing work the same way.

---

## From Ledger project to Ethereum standard

Clear signing started as a Ledger problem. Every new DeFi protocol meant a new on-device app.

| Year | Step |
| --- | --- |
| 2021 | Ledger ships Ethereum *plugins*: per-protocol code running on the device to decode specific contracts |
| 2023 | The *generic parser*: the device interprets metadata instead of running protocol-specific code |
| Feb 2024 | ERC-7730 drafted and a public registry opened, turning that metadata into an open format |
| 2025 | ERC-7730 v1 released; external teams start writing their own descriptors |
| Feb 2026 | ERC-8176 (descriptor attestations) proposed |
| Apr 2026 | ERC-7730 v2: cross-chain, software wallets, encrypted amounts for confidential tokens |
| May 2026 | The Ethereum Foundation launches Clear Signing as an ecosystem standard; its Trillion Dollar Security initiative stewards the registry at [clearsigning.org](https://clearsigning.org) |

The shift from plugins to a generic parser is the key design move. Plugins meant every protocol needed firmware-level code, written or reviewed by the wallet maker. A parser plus data means a protocol can describe itself in JSON, and any wallet that implements the parser can show it. That's what makes it a standard instead of a product feature.

The contributor list at launch reads like a map of the industry: Ledger, Trezor, MetaMask, WalletConnect, Fireblocks, Keycard, Sourcify, Cyfrin, Argot, ZKnox and Zama. Trezor said it would ship full human-readable signing in the second quarter of 2026.

---

## Beyond Ethereum: Solana's sRFC 39

Solana has the same gap in a different shape. Programs publish an IDL, generated by Anchor or Codama, which plays the role of the ABI: it says what an instruction's accounts and arguments are, not how to show them to a person.

[sRFC 39](https://github.com/solana-foundation/SRFCs/discussions/4), proposed in October 2025 and still a draft, extends the IDL with display metadata at three levels: the instruction, each account, and each argument. It has formatters that will look familiar (amounts with decimals and symbols, dates, durations, account names) and adds interpolation templates, so a wallet can render `Transfer {amount} to {destination}` as "Transfer 10 SOL to toly.sol".

The open questions in that discussion are the same ones Ethereum worked through: who curates which programs get trusted descriptions, and how to render a transaction that bundles several instructions, which on Solana is the normal case.

---

## What it doesn't fix

**Coverage.** A descriptor exists only if someone wrote one. The long tail of contracts, and every brand-new drainer, will still come up as "unknown". That's the right answer, but it only helps if wallets treat unknown as a warning rather than a formality.

**Persuasion.** Clear signing defeats attacks that change the transaction behind your back. It does nothing against an attacker who convinces you to sign something that's accurately described. "Approve unlimited USDC to 0x7a4…" in plain English still gets approved by someone who believes they're claiming an airdrop.

**Effects.** A descriptor states the function's intent. It doesn't compute what will actually happen to your balances, which can depend on state. Transaction simulation answers that question, and the two work well together: clear signing says what you're calling, simulation says what it will do.

---

## Why it matters

Signing is the only moment in a blockchain transaction where a human is in the loop. Everything before it is software you can't fully trust; everything after it is irreversible. For ten years the industry made that moment unreadable and then blamed users for not reading.

Clear signing is unglamorous work: JSON files, a registry, a review process, signatures on top. But it's the kind of fix that holds up, because it doesn't ask users to be smarter. It puts the truth on the one screen attackers can't reach, in words.

---

## Further reading

- [ERC-7730 specification](https://eips.ethereum.org/EIPS/eip-7730): the descriptor format, including the security considerations section
- [ERC-7730 registry](https://github.com/ethereum/clear-signing-erc7730-registry): every published descriptor; the Safe and ERC-20 files are good starting points
- [clearsigning.org](https://clearsigning.org): the Foundation's hub, with the ecosystem list
- [Add clear signing to your protocol](https://ethereum.org/developers/tutorials/clear-signing/): the ethereum.org tutorial for writing a descriptor
- [ERC-7730 v2 and the evolution of clear signing](https://www.ledger.com/blog-the-evolution-of-clear-signing): Ledger's own history of the project
- [sRFC 39: Solana Clear Sign](https://github.com/solana-foundation/SRFCs/discussions/4): the Solana proposal and its open questions
- [In-depth technical analysis of the Bybit hack](https://www.nccgroup.com/research/in-depth-technical-analysis-of-the-bybit-hack/): NCC Group's breakdown of the attack
