import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "multisig-security-model",
  notes: [
    {
      marker:
        "2-of-3 is the only small configuration that moves both dials the right way",
      type: "note",
      content:
        "The full small-*n* table is worth internalizing. **1-of-2**: loss resistance up, theft resistance *down* (either key drains it). **2-of-2**: theft resistance up, loss resistance down. **2-of-3**: both up. **3-of-5**: both up further, at real coordination cost. Everything above 3-of-5 for an individual is usually someone enjoying the setup more than the security.",
    },
    {
      marker:
        "**Bare multisig** (2010) put all the public keys directly in the output script",
      type: "context",
      content:
        "Bare multisig is still valid Bitcoin script and still occasionally used — mostly for data embedding rather than actual custody, since the public keys are arbitrary 33-byte fields nobody checks. It's also the origin of a persistent piece of chain trivia: a nontrivial amount of non-financial data lives in the UTXO set as fake pubkeys inside bare multisig outputs.",
    },
    {
      marker: "keys and signatures are *linearly aggregatable*",
      type: "context",
      content:
        "This is the one concrete thing Schnorr gives Bitcoin that ECDSA couldn't. In Schnorr, the sum of the signatures under the sum of the keys is a valid signature — the math is linear. ECDSA's verification equation has an inversion in it that breaks this. Satoshi's choice of ECDSA in 2008 wasn't a technical judgment so much as a licensing one: Schnorr was under patent until 2008 and simply wasn't in OpenSSL.",
    },
    {
      marker: "One unresponsive signer and nobody can spend.",
      type: "counter",
      content:
        "Taproot softens this in practice, because the same output can commit to *both* a MuSig2 key path and a script path with a conventional threshold fallback. Happy path: everyone signs, one aggregate signature, maximum privacy, minimum fee. Someone's unreachable: fall back to the script path, pay more, reveal more. You only expose the fallback if you actually use it — which is arguably the single best piece of design in taproot.",
    },
    {
      marker:
        "the full private key never exists anywhere, at any point, including at setup",
      type: "source",
      content:
        "Distributed key generation is the property that separates FROST from both script multisig and naive key-splitting schemes like Shamir's Secret Sharing. With SSS, someone has to hold the whole key to split it, and someone has to reassemble it to sign — two moments of total exposure. FROST's participants generate their shares interactively and the complete key is never materialized on any machine.",
      url: "https://www.spark.money/research/frost-threshold-signatures-explained",
    },
    {
      marker: "Ethereum has no native multisig.",
      type: "note",
      content:
        "This is a design consequence, not an oversight. Ethereum deliberately kept the base account model minimal on the theory that anything expressible in contract code shouldn't be consensus logic. It's the same reasoning that gave Ethereum a rich contract layer and Bitcoin a rich script layer — and it's why the Bybit attack was even possible, since a contract with an upgrade path is a contract that can be pointed somewhere else.",
    },
    {
      marker: "The critical difference is **where the rule lives**",
      type: "counter",
      content:
        "Vendors selling MPC often present it as strictly better than multisig — cheaper, chain-agnostic, more private, all true. The unstated cost is that consensus stops being your backstop. With on-chain multisig, a bug in your signing software still can't move funds without the threshold, because the network refuses the transaction. With MPC, the signing protocol *is* the enforcement, and a sufficiently broken implementation produces a perfectly valid signature over whatever it was tricked into signing.",
    },
    {
      marker:
        "Every signature was valid. Every key stayed secret. The cryptography worked perfectly.",
      type: "note",
      content:
        "$1.44 billion, February 21, 2025 — the largest theft in the history of the industry, and it required breaking exactly zero cryptography. The attackers compromised a developer laptop, reached Safe's cloud infrastructure, and changed what a webpage displayed. Every layer people spend their security budget on held. The layer nobody was watching was the one rendering the transaction.",
      url: "https://www.sygnia.co/blog/sygnia-investigation-bybit-hack/",
    },
    {
      marker: "A hash is not information.",
      type: "quote",
      content:
        "\"Blind signing\" is the industry's term for approving a transaction your device can only show you as a hash. It has been a known problem for years and remains largely unsolved for complex contract calls — the hardware wallet often lacks the screen, the parser, or the ABI to render what it's signing. The mitigation isn't better hardware, it's independent verification: decode the calldata on a second machine, on separate infrastructure, and compare.",
      attribution: "a16z crypto, on the Bybit post-mortem",
      url: "https://a16zcrypto.com/posts/article/bybit-hack-lessons/",
    },
    {
      marker:
        "Bitcoin multisig recovery needs the keys *and* the wallet descriptor",
      type: "note",
      content:
        "Output descriptors are the standardized fix for what used to be a genuine footgun. A descriptor is a single string encoding the script type, the participating xpubs, the threshold, and the derivation paths — everything needed to reconstruct addresses. Before descriptors, recovering a multisig from seeds alone meant guessing script types and derivation paths until addresses matched. Back up the descriptor with the seeds; it contains no secrets and losing it can still lose the wallet.",
      url: "https://github.com/bitcoin/bitcoin/blob/master/doc/descriptors.md",
    },
    {
      marker:
        "Multisig is a good primitive, and it defends a narrower perimeter than its reputation suggests.",
      type: "counter",
      content:
        "The strongest counter-argument to this whole article: Bybit is a single data point, and a survivorship-biased one. Multisig quietly prevents an unknowable number of single-key compromises every year, and those never make headlines because nothing happens. That's fair. The narrower claim still holds — multisig defends the signature layer specifically, and reasoning about it as general-purpose \"more security\" is how organizations end up with nine signers all looking at one compromised screen.",
    },
  ],
};
