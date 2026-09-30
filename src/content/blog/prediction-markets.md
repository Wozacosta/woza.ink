---
title: "Prediction Markets: What the Price Knows, and Who Decides What Happened"
date: "2026-09-30"
description: "How prediction markets turn bets into probabilities, why the price is sometimes wrong, why the oracle is the real product, and how Trueo is trying to build the version Vitalik Buterin has been asking for."
tags: ["web3", "ethereum", "protocols"]
---

# Prediction Markets: What the Price Knows, and Who Decides What Happened

On election night 2024, while TV pundits kept hinting at a comeback, Polymarket's price said it plainly: Trump was over 95% to win. A few days later Vitalik Buterin wrote that Polymarket had shown "the direct truth" while other sources kept stringing viewers along. Prediction markets had their moment.

Two years later they're enormous. Combined monthly volume on Kalshi and Polymarket went from under $5 billion in September 2025 to more than $50 billion in July 2026, when the World Cup kicked off. And in February 2026 the same Vitalik warned that the industry was sliding toward sports betting and short-term crypto wagers: dopamine, not information.

Both things are true, and the tension between them is the story of this post. How a prediction market turns bets into probabilities. Why the price is sometimes wrong. Why the hardest part isn't the market at all, but deciding what actually happened. And how Trueo, a small protocol moving to Ethereum mainnet, is trying to build the version Vitalik has been asking for.

---

## How a prediction market works

Every market is a question with a deadline: *Will X happen before date D?* The market sells two tokens. **YES** pays $1 if X happens. **NO** pays $1 if it doesn't.

![One dollar of collateral mints a YES and a NO share. Their prices are the market's probabilities; at resolution the winning share pays one dollar.](diagram:pm-shares)

The trick is in how the tokens are created. Deposit $1 of collateral and you get one YES and one NO, a **complete set**. A complete set can always be redeemed for $1, before or after resolution, so the two prices have to add up to about $1. If YES is at 0.62, NO is at 0.38.

That price is the probability. If you believe X has a 75% chance and YES trades at 0.62, buying is a good bet: you pay 62 cents for something worth 75 cents in expectation. Everyone who disagrees with the price has a reason to trade until it moves. The price ends up where the people willing to put money down roughly agree.

Trading happens either on an order book, where buyers and sellers post limit orders, which is what Polymarket runs, or against an automated market maker, a smart contract that always quotes a price and shifts it with each trade. Robin Hanson designed the classic market maker for this, the logarithmic market scoring rule, in the early 2000s. Some on-chain markets now use pools of the kind Uniswap made standard; Trueo is one of them.

---

## Why the price is worth reading

In his November 2024 essay ["From prediction markets to info finance"](https://vitalik.eth.limo/general/2024/11/09/infofinance.html), Vitalik describes the two faces of a market like Polymarket: "a betting site for the participants, a news site for everyone else." Most people who benefit from a prediction market never trade on it. They read the price.

He generalizes this into **info finance**: a discipline where you "start from a fact that you want to know", then deliberately design a market to get people to reveal it. Prediction markets are the simplest case. **Decision markets** are the ambitious one: to choose between policies A and B, you run conditional markets on some metric (a token price, a health outcome) under each policy and pick the one the market prices higher. That's futarchy, Hanson's old idea of "vote on values, bet on beliefs."

Two things make this more practical now than it was: blockchains cheap enough to run many small markets, and AI. Vitalik's argument is that AI traders make it possible to have markets on questions too small for humans to bother with, while the market still aggregates and checks what the AIs believe.

---

## Why the price is sometimes wrong

Markets aggregate information, but only through people who are willing and able to trade. Several frictions get in the way.

**Capital has a cost.** Vitalik's 2021 post ["Prediction markets: tales from the election"](https://vitalik.eth.limo/general/2021/02/18/election.html) is the best case study. After the 2020 election was called, the market on whether Trump would lose stayed stuck at around 85 cents for over a month, pricing a 15% chance that he'd overturn the result. Vitalik bet against that, locking up 308,249 DAI for about two months to earn $56,803. That's roughly 175% annualized, which sounds great until you account for the collateral he needed to borrow that DAI: around a million dollars of capital tied up in total. Most rational traders had better things to do with their money. Trump supporters, meanwhile, offset his entire position with about $60,000.

The lesson generalizes. Near 0 or 1, the side that's wrong can hold the price up cheaply, and the side that's right earns little for a lot of locked capital. Long-dated markets make it worse: nobody wants to park money for a year at a zero percent return to correct a small mispricing.

**Thin markets are easy to move.** A market with little liquidity can be pushed around by one motivated trader, sometimes to create a headline rather than to profit.

**Longshots are overpriced.** In betting markets generally, unlikely outcomes tend to trade above their true odds, because people enjoy the lottery-ticket payoff. Prediction markets inherit this.

None of this makes the price useless. It means the price is a good estimate where the market is liquid, short-dated and full of people with an informational edge, and a noisy one elsewhere.

---

## Who decides what happened

There's a part of every prediction market that isn't a market at all: **resolution**. Someone has to decide whether X happened. On a centralized exchange that's the company. On a decentralized one it's an **oracle**, and the oracle is the real product. A market with great liquidity and a bad oracle is a market you can't trust at the end.

Polymarket uses UMA's **optimistic oracle**. Someone proposes an answer and posts a bond. If nobody challenges it within a window, it stands. If someone does, the dispute goes to a vote of UMA token holders, weighted by how many tokens they hold. It's fast and cheap when everyone agrees, which is almost always. The weak spots show up in the rest.

**Token-weighted votes can be bought.** In March 2025, a $7 million market on whether Ukraine would sign a minerals deal with the US before April resolved "Yes", although no deal had been signed. Analysts traced it to one UMA holder voting about 5 million tokens across three accounts, roughly a quarter of the votes cast. Polymarket said it wasn't a market failure and declined to refund.

**Ambiguous rules get interpreted after the fact.** In 2026 a market asked whether Strategy would sell any bitcoin before May 31. Strategy's SEC filing, the market's named resolution source, confirmed it had sold 32 BTC between May 26 and May 31, inside the window. But the filing was published on June 1. The market resolved "No", with a clarification added that confirmation received after the deadline doesn't count. Two traders sued in July, claiming at least $797,198 in damages and asking the court to stop Polymarket from changing settlement rules after outcomes are known.

Both cases are about the same thing: who decides, under which rules, fixed when. That's the gap Trueo is aimed at.

---

## The casino problem

In February 2026, Vitalik, an early Polymarket backer, posted a long critique of where the industry was heading. His worry was that prediction markets were "over-converging to an unhealthy product market fit": short-term crypto price bets and sports betting, things with "dopamine value" but no "long-term fulfillment or societal information value."

The numbers back him up. By August 2026 Kalshi handled about 82% of combined monthly volume, driven heavily by sports contracts.

His argument turns on a simple question: who loses money, and why do they keep coming back? Every market needs informed traders and someone to trade against. If the counterparty is mostly people betting on hunches for fun, the business is a casino with better odds. He was blunt that there is "nothing fundamentally morally wrong with taking money from people with dumb opinions", but a platform that depends on it drifts toward whatever keeps them betting. He called that drift corposlop.

His alternative was **hedging**. Instead of betting, people would use markets as insurance against the risks in their own lives: a local AI looks at what you spend money on and builds a basket of positions that pays out when those costs rise. Push that far enough, he argued, and "we do not need fiat currency at all": people hold productive assets, and personalized prediction-market positions when they want stability. Those are long-dated, low-dopamine markets, exactly the kind the current platforms aren't built for.

---

## Trueo

[Trueo](https://trueo.com) launched on Base in March 2025 as a permissionless prediction market, with its own token, TRUE. On September 21, 2026, it announced it was moving its main deployment to Ethereum mainnet. Vitalik replied:

> Glad to see that Ethereum L1 will have a new strong prediction market contender that is dedicated to decentralization, and being ethical and not corposlop, and to actually trying to do interesting and meaningful things with this class of economic primitive.

It's worth looking at why, because Trueo's design reads almost like a response to the problems above. Three choices stand out.

### 1. The rules are fixed before anyone trades

Every Trueo market commits its title, its resolution criteria and its **approved data sources** on-chain when it's created. They can't be edited afterwards.

That's a direct answer to the Strategy dispute. There, the argument was whether a filing published one day late should count, and the clarification settling it was added after the outcome was known. With the criteria and sources fixed at launch, the question of what counts is decided before anyone has a position to protect. It doesn't remove ambiguity. Someone still has to write good criteria. But it takes away the ability to fix ambiguity after the fact, in either direction.

### 2. Collateral that earns interest

On Trueo you don't trade with bare USDC. You deposit it and receive **TYD**, the True Yield Dollar: a vault token (ERC-4626) built with Yearn, whose strategies aim to match or beat Aave's USDC lending rate on Base. YES and NO shares are backed by TYD, and winners redeem in TYD.

Go back to Vitalik's 2020 trade. The reason the market stayed wrong for a month was that correcting it meant locking capital at a zero percent return. If the locked collateral earns roughly what you'd get by lending it out, holding a position costs nothing but the risk of the bet itself. Trueo's docs say this is the point: yield-bearing collateral is what makes long-term markets viable.

It also matters for the hedging vision. A market meant to insure you against something a year out only works if sitting in it isn't a guaranteed loss against a savings account.

### 3. An escalation ladder instead of a single vote

Trueo's oracle is optimistic, like UMA's, but a dispute doesn't jump straight to a token vote. It climbs a ladder, and each rung is more expensive to reach and more neutral than the last.

![Trueo resolution: rules fixed on-chain at creation, a bonded proposal, then optional escalation to the Oracle Council, TRUE holders, and finally eleven random attesters.](diagram:trueo-escalation)

1. **Proposal.** When the event is over, a resolver proposes the outcome and posts a bond (250 TYD by default). Anyone can challenge within 12 hours by posting a matching bond.
2. **Oracle Council.** A challenged proposal goes to a five-member council, which picks the outcome and decides who gets slashed.
3. **TRUE holders.** The council's decision can be escalated within another 12 hours, with a larger 750 TYD bond. TRUE holders then vote on both the outcome and the slashing.
4. **Attesters.** Finally, someone holding or staking at least 250,000 TRUE can escalate to the last rung: 11 attesters chosen at random, who give the final verdict.

The design idea is that almost every market resolves at step 1, disputes are settled quickly by people who know the rules, and the expensive, slow, more decentralized rungs exist mainly as a threat. Bonds and slashing make frivolous challenges costly and dishonest resolution costlier.

Trading itself is fully on-chain too: YES and NO tokens trade through a custom Uniswap v4 hook, with liquidity supplied by traders and market makers.

### Why Ethereum mainnet

Trueo's stated reasons for leaving Base are integration potential, network effects, and a better fit for a product meant to be permissionless and largely immutable. The logic follows from the oracle: a market is only as credible as the chain that enforces its rules and holds its collateral, and for something meant to be neutral and hard to change, Ethereum L1 is the strongest base layer available. Existing TRUE holders get an open-ended window to migrate, and Base markets expiring after January 31, 2027 are meant to launch on Ethereum instead.

### What's still open

Trueo is promising, not finished, and its own design shows where the hard parts are.

- **The council is trusted.** The five Oracle Council members are selected by the protocol, and during the early governance phase they also set market and oracle parameters. Every council decision can be challenged, which is the safeguard, but the first line of defense is people, not math.
- **Token voting is still token voting.** The TRUE holder rung has the same shape as the UMA vote that went wrong on the Ukraine market. Bonds, slashing and a final random panel make an attack more expensive, not impossible. And the random panel can only be reached by someone holding 250,000 TRUE, so the most neutral rung is also the most expensive to invoke.
- **The oracle is changing.** Trueo named launching the next generation of its oracle as one of its two priorities for the move to Ethereum. The ladder described here is the current design.
- **Liquidity decides everything.** A good oracle can't help a market nobody trades. The other stated priority is bringing in liquidity for key categories, and that's the part no design can guarantee.

---

## What a prediction market is for

Strip away the volume charts and a prediction market is two things glued together: a mechanism for turning beliefs into prices, and a mechanism for deciding what happened. The first is mostly solved; the second is where trust lives.

The industry's current answer to "what is this for?" is sports and fifteen-minute crypto bets, because that's where the revenue is. Vitalik's answer is information and hedging, which needs long-dated markets, collateral that isn't dead money, and resolution nobody can bend after the fact. Trueo is one of the few projects building for that answer on purpose. Whether it works will depend less on its design, which is thoughtful, than on whether enough people want to use prediction markets for something other than gambling.

---

## Further reading

- [From prediction markets to info finance](https://vitalik.eth.limo/general/2024/11/09/infofinance.html): Vitalik's framing of markets as a public good
- [Prediction markets: tales from the election](https://vitalik.eth.limo/general/2021/02/18/election.html): the best first-hand account of why prices stay wrong
- [Vitalik's February 2026 thread](https://x.com/VitalikButerin/status/2022669570788487542): the "unhealthy product market fit" critique and the hedging proposal
- [Trueo docs](https://docs.trueo.com/): the optimistic oracle, Oracle Council, TYD and trading mechanics
- [Trueo moves to Ethereum](https://www.theblock.co/news/defi/2026-09-22-trueo-ethereum-migration-415999): The Block on the migration and Vitalik's reaction
- [Futarchy: vote values, but bet beliefs](https://mason.gmu.edu/~rhanson/futarchy.html): Robin Hanson's original proposal for decision markets
