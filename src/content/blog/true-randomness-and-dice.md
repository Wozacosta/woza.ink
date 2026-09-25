---
title: "Where Randomness Actually Comes From"
date: "2026-08-21"
description: "True RNG vs pseudorandom, how your machine actually collects entropy, why 100 dice rolls make a Bitcoin seed, and the three different things people mean when they say 'random'."
tags: ["security", "cryptography", "protocols", "bitcoin"]
---

# Where Randomness Actually Comes From

Ask for a random number and you'll get one. Ask where it came from and things get interesting fast.

Most randomness failures aren't failures of the algorithm. They're failures of definition — someone needed one kind of randomness and reached for a tool that provides a different kind. The number looked random. It was even statistically random. It just wasn't the property that was actually needed.

There are three properties, and almost nothing provides all of them.

---

## The three properties

**Unpredictability.** Nobody can guess the next value, even knowing every previous one. This is what cryptographic keys need. A nonce that an attacker can predict is not a nonce.

**Unbiasability.** No participant can *influence* the outcome, even a little, even at the cost of giving up their turn. This is what lotteries, leader election, and any adversarial draw need. A value can be completely unpredictable to outsiders and still be quietly steerable by whoever generates it.

**Verifiability.** Anyone can confirm after the fact that the value was generated honestly. This is what public draws need — where you don't want participants to *trust* you, because trusting you is the thing they'd rather not do.

`/dev/urandom` gives you unpredictability. It gives you no verifiability whatsoever — you cannot prove to anyone that you didn't just pick your favorite number. A blockchain commit-reveal scheme gives you verifiability and can be made unbiasable, and is often entirely predictable to the first participant. These are different tools.

Pick the wrong one and the failure is usually silent, which is what makes this category of bug so nasty.

---

## True random vs pseudorandom

A **TRNG** (true random number generator) harvests entropy from a physical process believed to be fundamentally unpredictable: thermal noise, shot noise, radioactive decay, quantum measurement, oscillator jitter. Its output is non-deterministic. It is also slow, sometimes biased, and hard to verify — a serious problem because a broken hardware RNG and a working one produce output that looks identical.

A **PRNG** is a deterministic algorithm. Feed it a seed, get a long stream that passes statistical tests. Same seed, same stream, always. Fast and reproducible — exactly what you want for simulations and games. `Math.random()` and `rand()` live here, and neither belongs anywhere near a key.

A **CSPRNG** is a PRNG with an extra guarantee: given any amount of output, you cannot compute the next value or recover the seed in practical time. ChaCha20-based generators, HMAC-DRBG, and the Linux kernel's RNG are in this family.

The practical architecture nearly everything uses is **TRNG seeds a CSPRNG**. Collect a few hundred bits of real physical entropy — slow, awkward, once — then stretch it into gigabytes of unpredictable output with fast symmetric cryptography. You need true randomness exactly once, at the start. Everything after that is arithmetic.

This is why the seed is where the bodies are buried.

---

## What your computer actually does

The Linux kernel maintains an entropy pool fed from several sources: interrupt timing, disk and network jitter, keyboard and mouse events where available, and dedicated hardware.

**RDRAND** is Intel's on-die generator — a circuit whose output depends on [thermal noise fluctuations inside the CPU](https://www.redhat.com/en/blog/understanding-random-number-generators-and-their-limitations-linux), conditioned and exposed as a single instruction. It's fast and it works. It is also completely unauditable: you cannot inspect it, and it's a single silicon block from a single vendor. After 2013 made state-level RNG sabotage a documented concern rather than a hypothetical, the kernel community settled on mixing RDRAND into the pool rather than using it directly. That way a backdoored RDRAND degrades your entropy instead of owning it outright.

**Jitter entropy** exploits something less obvious: on a modern out-of-order CPU with caches, branch prediction, and DRAM refresh cycles, the *exact* cycle count of a fixed instruction sequence varies unpredictably. Measure that variance with `RDTSC` and you have an entropy source requiring no special hardware. The kernel's `jitterentropy` module does this, and it's the reason headless VMs with no keyboard and no disk activity can still boot with a properly seeded pool.

### The urandom question, settled

The old advice — `/dev/random` for keys, `/dev/urandom` for everything else — was wrong for years and is now obsolete.

Since Linux 5.6, `/dev/random` blocks only before the pool is first initialized. After that, both devices draw from the same CSPRNG and are cryptographically identical. The "entropy depletion" mental model behind the old advice was never correct: a CSPRNG seeded with 256 bits doesn't run out of randomness, any more than AES runs out of encryption.

**Use `getrandom(2)`.** It blocks until the pool is initialized, then never blocks again, and it can't fail due to file descriptor exhaustion the way opening `/dev/urandom` can. In userland: `getrandom()` on Linux, `arc4random_buf()` on BSD and macOS, `BCryptGenRandom` on Windows, `crypto.randomBytes()` in Node, `secrets` in Python. Never the language's default random module.

The dangerous window is **early boot**, especially on embedded devices and freshly cloned VM images — no disk history, no user input, no accumulated jitter. Devices have shipped SSH host keys generated seconds after first boot, and researchers have found thousands of them sharing keys across the internet.

---

## Physical entropy theater

Some setups are famous mostly for being fun to look at.

Cloudflare's San Francisco lobby has a wall of **lava lamps** filmed by a camera whose frames feed an entropy pool. Their London office uses a chaotic pendulum; Singapore uses a radioactive source measuring uranium decay.

It's real entropy. It's also somewhat theatrical, and Cloudflare is upfront that it's one input among many rather than the main source. Chaotic fluid in wax is hard to predict, but the camera sensor's own thermal noise probably contributes more entropy than the lamps do.

The **ANU Quantum Random Numbers Server** is a more rigorous version: it measures vacuum fluctuations of the electromagnetic field — quantum noise, unpredictable as a matter of physics rather than practical difficulty — and streams the output publicly.

Which surfaces the obvious problem with all remote randomness: **you're trusting a third party and a network path**. Randomness delivered over the wire is randomness someone else generated and could have recorded. For anything that matters, remote entropy is something you *mix in*, never something you rely on.

---

## Dice: the case for doing it by hand

Which brings us to the most paranoid and most practical technique in the seed-generation toolkit.

When you generate a Bitcoin wallet, the hardware device picks 128 or 256 bits from its internal RNG. You have no way to verify that RNG. If it's backdoored — or merely broken — your seed is predictable and everything derived from it is gone. This isn't hypothetical: multiple wallets have shipped with entropy bugs, and Android's `SecureRandom` flaw in 2013 drained real Bitcoin wallets through repeated ECDSA nonces.

Dice fix this by moving the entropy source somewhere you can see it.

### The arithmetic

A fair six-sided die produces log₂(6) ≈ **2.585 bits** per roll.

- 128 bits (12-word seed): 128 / 2.585 ≈ **50 rolls**
- 256 bits (24-word seed): 256 / 2.585 ≈ **99.04 → 100 rolls**

Rolling beyond the target adds nothing. Once you've supplied 256 bits into a 256-bit seed, additional rolls are discarded.

### Converting rolls to bits without introducing bias

This is where people go wrong, and the failure is invisible.

**The trap.** Mapping a die to binary by taking the value mod 2, or mapping 1–6 onto 0–5 and then reducing mod 4, introduces **modulo bias** — some outputs become more likely than others. It still looks random. It still passes a casual eyeball test. You've quietly lost entropy in a way that's hard to detect and impossible to fix after the fact.

Three correct approaches:

**Rejection sampling.** Use only rolls of 1–4, mapping them to 2 bits each; reject 5s and 6s entirely. Perfectly uniform, easy to do by hand, wasteful — you'll discard a third of your rolls, needing about 192 throws to collect 128 usable ones for 256 bits.

**Binary reduction.** 1–3 → `0`, 4–6 → `1`. Exactly one unbiased bit per roll. Dead simple, verifiable in your head, and needs 256 rolls for a 24-word seed. That's a long evening.

**Hash the transcript.** Roll 100 times, write down the digits as a string, and SHA-256 the result. The hash acts as a randomness extractor: feed in ≥256 bits of entropy in any format and get a uniform 256-bit output. This is what Coldcard and most offline seed tools do, and it's the right default — the arithmetic is done by a function you can audit rather than by you at 1am.

### Details that actually matter

**Your dice are probably biased.** Cheap dice have rounded corners, hollowed-out pips, and uneven density. Casino dice are precision-machined with flush pips and sharp edges *precisely because* ordinary dice measurably favor certain faces. The bias is small — but you're at 2.585 bits per roll with no margin to spare.

Fortunately, the hash-the-transcript method is fairly forgiving here. A slightly biased die reduces entropy per roll rather than destroying it, so rolling 120 times with mediocre dice comfortably clears 256 bits. Roll extra. It's cheap.

**Verify the tool offline.** Generating the seed on an airgapped machine and then typing it into a website defeats the entire exercise. The whole point was avoiding a black box.

**Consider mixing rather than replacing.** Some wallets let you XOR dice entropy with the device's internal RNG. That's strictly better than either alone: you're protected if the hardware is backdoored *and* if your dice are loaded, because compromising the result requires compromising both.

---

## Randomness other people have to trust

Everything so far assumed you generate randomness for yourself. The problem changes completely when the output has to convince a skeptic.

**Commit-reveal** is the foundational trick. Publish `hash(secret)` first. Reveal `secret` later. Anyone can check the hash matches, so you're bound to a value you chose before seeing anything else. This is what "provably fair" online gambling runs on: a hashed **server seed** published up front, a player-supplied **client seed**, and a **nonce** incrementing per round, run through HMAC-SHA256. The player contributes entropy the operator can't control, and after the server seed is revealed every past round can be recomputed and checked.

It's an elegant construction with a narrow guarantee: the operator did not change the outcome after your bet. It says nothing about whether the game's odds are what the operator claims, and it doesn't satisfy any major gaming regulator. Licensed markets require certification from labs like GLI or eCOGRA, which test the generator's statistical behavior over time rather than the integrity of individual rounds. The two mechanisms answer different questions, and crypto casinos advertising "provably fair" as equivalent to a license are eliding that.

**Blockchain randomness** has the same shape with adversarial validators added.

Ethereum's `PREVRANDAO` exposes the beacon chain's RANDAO accumulator — each proposer mixes in a BLS signature they can't forge. This works fine for consensus-internal purposes like committee assignment. It is *not* safe for high-value application randomness, because the last proposer in an epoch can see the result and choose to skip their slot, discarding an unfavorable outcome. One bit of bias, available for the price of one missed block reward. If your lottery pays more than that, someone will buy it.

**VRFs** solve this differently. A verifiable random function produces a value plus a proof that the value was derived correctly from a specific input and a specific private key. [Chainlink VRF](https://docs.chain.link/vrf) publishes both on-chain, so the contract verifies the proof before accepting the number. Nobody — not the oracle, not the developer, not a validator — can substitute a different value. You are still trusting that the oracle answers at all.

**drand** takes the threshold approach: a league of independent operators produces a jointly-generated random beacon on a fixed schedule, where no minority can predict or bias the output and no single operator can withhold it. No other option here distributes control as widely. Its values are public the instant they're produced, so you can't use them for anything requiring privacy.

---

## When it goes wrong

The failure cases are worth knowing because they're all the same failure.

**Debian OpenSSL (2006–2008).** A developer removed two lines that fed uninitialized memory into the entropy pool — they made Valgrind complain. The seed collapsed to the process ID: **15 bits of entropy**, about 32,768 possibilities. Every SSH and SSL key generated on affected Debian systems for nearly two years was brute-forceable in minutes. The code was correct in every other respect.

**Sony PlayStation 3 (2010).** ECDSA requires a fresh random nonce for every signature. Sony used a constant. With two signatures under the same nonce, the private key falls out by simple algebra. fail0verflow demonstrated it on stage. Sony's console signing key was recovered not through a cryptographic weakness but through a missing call to a random number generator.

**Android SecureRandom (2013).** An initialization flaw caused repeated nonces in ECDSA signatures, and Bitcoin wallets on Android leaked their private keys on-chain to anyone watching for the pattern.

The common thread: in every case the cryptography was sound, correctly implemented, and standards-compliant. The randomness underneath it was not, and nothing in the layer above noticed. There is no test that distinguishes a good key from a predictable one by looking at it. The entropy is either there at generation time or it never was.

---

## Practical summary

**For keys and nonces.** Use the OS. `getrandom()`, `arc4random_buf()`, `BCryptGenRandom`, `crypto.randomBytes()`. Never a language's default `random`. Never roll your own generator. Watch out for early boot on embedded hardware and cloned VM images.

**For simulations and games.** A fast PRNG is correct and a CSPRNG is a waste. Seed it explicitly and log the seed so your runs reproduce.

**For a wallet seed you're serious about.** Dice, hashed with SHA-256, on an airgapped device, ideally XORed with the hardware RNG rather than replacing it. Roll 100 times for 256 bits, or 120 if your dice came from a board game. Pair it with [multisig](/blog/multisig-security-model) if the amount justifies the operational overhead.

**For anything a stranger must verify.** Commit-reveal at minimum. A VRF if a contract consumes it. drand if you need a continuous public beacon. Never `PREVRANDAO` or a block hash for anything valuable.

The recurring lesson across all of it: randomness is the one primitive whose failure is undetectable by inspection. A weak key looks exactly like a strong one. You cannot test your way to confidence after the fact — you can only be careful about where the entropy came from in the first place.

---

## Further reading

- [Random number generation — ArchWiki](https://wiki.archlinux.org/title/Random_number_generation) — the most practical overview of Linux entropy sources
- [Understanding RNGs and their limitations in Linux](https://www.redhat.com/en/blog/understanding-random-number-generators-and-their-limitations-linux) — Red Hat on RDRAND, jitter entropy, and what the pool actually does
- [Schneier on the Debian RNG bug](https://www.schneier.com/blog/archives/2008/05/random_number_b.html) — contemporaneous analysis of the two-line change
- [Console Hacking 2010 (fail0verflow, 27C3)](https://media.ccc.de/v/27c3-4087-en-console_hacking_2010) — the talk that demonstrated the PS3 nonce reuse and key recovery
- [Chainlink VRF documentation](https://docs.chain.link/vrf) — how on-chain verifiable randomness is constructed
- [drand](https://drand.love/) — the distributed randomness beacon, and the League of Entropy
- [ANU Quantum Random Numbers](https://qrng.anu.edu.au/) — vacuum fluctuation measurements, streamed live
- [Multisig: What It Actually Protects You From](/blog/multisig-security-model) — the other half of key security, and what it does and doesn't cover
