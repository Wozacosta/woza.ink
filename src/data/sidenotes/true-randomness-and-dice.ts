import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "true-randomness-and-dice",
  notes: [
    {
      marker: "There are three properties, and almost nothing provides all of them.",
      type: "context",
      content:
        "A fourth property matters in some designs and is easy to forget: **liveness**. A beacon that can't be biased but *can* be withheld is still exploitable — if the party producing the number can decline to publish an unfavorable one, refusing to answer becomes the attack. This is why drand's threshold construction cares as much about no minority being able to *stop* the beacon as about no minority being able to steer it.",
    },
    {
      marker: "TRNG seeds a CSPRNG",
      type: "note",
      content:
        "This architecture is why \"but is it *truly* random?\" is usually the wrong question about a running system. Your TLS session keys are pure arithmetic — deterministic output from a ChaCha20 stream. The physical randomness happened once, at seeding. Provided that seed had 256 real bits, the derived stream is unpredictable for reasons that have nothing to do with physics and everything to do with the cost of breaking a cipher.",
    },
    {
      marker:
        "the kernel community settled on mixing RDRAND into the pool rather than using it directly",
      type: "context",
      content:
        "This was a genuine, public fight. In 2013 a petition asked Linus Torvalds to remove RDRAND support entirely over sabotage concerns; he refused in characteristically direct terms, pointing out that RDRAND was already only one input being mixed into the pool rather than the pool itself. The resolution is a nice piece of defensive design — you get the throughput benefit of hardware entropy while a compromised source degrades the result instead of determining it.",
    },
    {
      marker:
        "the *exact* cycle count of a fixed instruction sequence varies unpredictably",
      type: "source",
      content:
        "Jitter entropy is a strange and somewhat uncomfortable source: it works because modern CPUs are too complex to predict cycle-accurately, which is an argument from *engineering* difficulty rather than physics. Researchers periodically probe how much genuine entropy it yields, and NIST SP 800-90B assessments generally support the conservative estimates the kernel uses. It's the reason a headless cloud VM with no keyboard, no mouse, and no disk history can still seed itself at boot.",
      url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12307882/",
    },
    {
      marker:
        "The old advice — `/dev/random` for keys, `/dev/urandom` for everything else — was wrong for years and is now obsolete.",
      type: "counter",
      content:
        "This advice persists in a remarkable number of textbooks, StackOverflow answers, and internal security wikis, and following it actively causes harm — blocking reads on `/dev/random` have hung production services and stalled boots waiting for \"entropy\" that was never actually needed. Since Linux 5.6 the two devices differ only in behavior before the pool is first initialized. If you learned the old rule, unlearn it.",
      url: "https://www.redhat.com/en/blog/understanding-red-hat-enterprise-linux-random-number-generator-interface",
    },
    {
      marker:
        "Devices have shipped SSH host keys generated seconds after first boot",
      type: "source",
      content:
        "The canonical study is \"Mining Your Ps and Qs\" (Heninger et al., USENIX Security 2012), which scanned the public internet and found that roughly 0.75% of TLS certificates shared keys due to insufficient boot-time entropy, and recovered private keys for around 0.5% of TLS hosts and 1% of SSH hosts outright. Headless embedded devices generating keys on first boot were the dominant cause. The paper is still the best empirical demonstration that this failure mode is real at scale.",
      url: "https://factorable.net/weakkeys12.extended.pdf",
    },
    {
      marker:
        "the camera sensor's own thermal noise probably contributes more entropy than the lamps do",
      type: "note",
      content:
        "Cloudflare has been fairly candid that the lava lamp wall is partly a public engagement exercise — it's in the lobby, it's on the tours, and it makes an abstract concept legible to visitors. The entropy is genuine and it is one input among several, deliberately. The useful takeaway is the design pattern rather than the lamps: mix many independent sources so that no single one being weak or compromised determines the output.",
    },
    {
      marker: "A fair six-sided die produces log₂(6) ≈ **2.585 bits** per roll.",
      type: "note",
      content:
        "Worth sanity-checking the direction of this number. A d6 gives *less* than 3 bits because 6 < 8 — three bits would require 8 equally likely outcomes. A coin gives exactly 1 bit, a d20 about 4.32, and a well-shuffled 52-card deck about 225.6 bits total, which is why a single genuinely random shuffle is close to a 24-word seed's worth of entropy and has almost certainly never occurred twice in history.",
    },
    {
      marker: "introduces **modulo bias**",
      type: "context",
      content:
        "The same bug appears far outside dice. Any `random() % n` where `n` doesn't divide the generator's range evenly produces a skew toward the low values — the classic case being shuffles and random sampling in application code. It's the reason `arc4random_uniform()` exists as a separate function from `arc4random()`, and why Python's `secrets.randbelow()` uses rejection sampling internally rather than a modulo.",
    },
    {
      marker:
        "Casino dice are precision-machined with flush pips and sharp edges",
      type: "context",
      content:
        "Casino-grade dice are held to roughly 0.0005 inch tolerances, with pips drilled and then backfilled with material of identical density so no face is lighter than another. Ordinary retail dice have hollow pips — the 6 face has six cavities of missing material and the 1 face has one, making the die very slightly favor landing 6-up. The effect is small enough to be irrelevant for a board game and large enough to be worth compensating for with extra rolls when generating a key.",
    },
    {
      marker:
        "the last proposer in an epoch can see the result and choose to skip their slot",
      type: "counter",
      content:
        "The precise bound is worth knowing before dismissing RANDAO entirely: a validator controlling the final *k* slots of an epoch gets roughly *k* bits of choice, at the cost of forfeiting those block rewards. For consensus-internal use — committee shuffling, proposer selection — this is a well-understood and acceptable margin. It becomes exploitable exactly when an application's payout exceeds the forfeited rewards, which is a threshold any sizable on-chain lottery clears trivially.",
      url: "https://www.zellic.io/blog/eth2-proof-of-stake-developer-guide/",
    },
    {
      marker: "**15 bits of entropy**, about 32,768 possibilities",
      type: "source",
      content:
        "The changed lines were removed to silence a Valgrind warning about reading uninitialized memory — which was, in isolation, a completely reasonable thing for a maintainer to want to fix. The patch was even discussed on an OpenSSL mailing list beforehand, where it did not receive the scrutiny it needed. It ran undetected from September 2006 to May 2008, and the cleanup afterwards involved regenerating essentially every key produced on Debian and Ubuntu in that window.",
      url: "https://www.schneier.com/blog/archives/2008/05/random_number_b.html",
    },
    {
      marker: "Sony used a constant.",
      type: "quote",
      content:
        "ECDSA's nonce requirement is unforgiving in a way few primitives are: two signatures sharing a nonce let anyone solve for the private key with schoolbook algebra. fail0verflow demonstrated the recovery at 27C3 in December 2010. The lasting fix is RFC 6979 deterministic ECDSA, which derives the nonce from the message and the private key via HMAC — removing the RNG from the signing path entirely, so there is no random number left to get wrong.",
      attribution: "fail0verflow, 27C3 (2010)",
      url: "https://datatracker.ietf.org/doc/html/rfc6979",
    },
    {
      marker:
        "randomness is the one primitive whose failure is undetectable by inspection",
      type: "note",
      content:
        "This is what makes RNG bugs uniquely dangerous compared to other crypto failures. A broken cipher usually fails loudly — output that doesn't decrypt, tests that don't pass, interop that breaks. A broken RNG produces keys of the correct length, in the correct format, that work perfectly for every legitimate operation. The Debian keys functioned normally for two years. Nothing in the system was capable of noticing.",
    },
  ],
};
