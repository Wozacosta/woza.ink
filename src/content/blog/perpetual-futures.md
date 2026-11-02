---
title: "Perpetual Futures: A Contract With No Expiry, and Who Pays When It Breaks"
date: "2026-10-31"
description: "How futures work, why crypto removed the expiry date, how funding keeps a perp near spot, what happens when a liquidation can't be filled, and how a bitcoin exchange's product reached oil, gold and the NYSE's parent company."
tags: ["web3", "protocols"]
series: defi-trading
atUri: "at://did:plc:l72dcexjk4ytyh4nhy5vtix4/site.standard.document/3mzbwjw4sma2a"
---

# Perpetual Futures: A Contract With No Expiry, and Who Pays When It Breaks

In 1993 the economist Robert Shiller proposed a futures contract that would never expire. He wanted markets for assets that rarely trade and are hard to price, like houses. Twenty-three years later a bitcoin exchange called BitMEX listed one for bitcoin, a contract designed to do something much simpler: let people trade with leverage without ever rolling a position.

It became the most traded product in crypto. In 2025, perps did [about $62 trillion of volume](https://whale-alert.io/stories/9c7941c063fa/Global-crypto-exchange-volume-reached-79T-in-2025-as-perpetual-futures-618T-far-outpaced-spot-186T-Binance-was-the-largest-contributor), more than three times spot, according to CryptoQuant. On a single day that October, over $19 billion of positions were force-closed. And in 2026 perps left crypto altogether: oil, gold and the S&P 500 now trade this way, US regulators have approved them, and the company that owns the New York Stock Exchange wants to list them.

![Crypto trading volume in 2025, to scale: perps about $61.8 trillion, spot about $18.6 trillion.](diagram:perps-volume)

This post is about how a contract with no end date stays tied to the price of anything, what happens when it doesn't, and who pays.

---

## What a future is

A future is an agreement to trade something at a fixed price on a set date. The buyer is **long** and profits if the price rises. The seller is **short** and profits if it falls. Neither pays the full value upfront. Each posts **margin**, a deposit, and gains and losses move between their accounts as the price changes. That's where the leverage comes from: a small deposit controls a large position.

The expiry date does one important job. On the last day the contract either delivers the asset or settles in cash at the spot price, so at that moment the future and the spot price have to be the same. Before expiry the two can drift apart, and that gap is called the **basis**. But it has to close by the deadline, and traders know it. The calendar is what holds the contract to reality.

Expiry also has costs. Anyone who wants to stay in a position has to **roll** it, closing one contract and opening the next, paying spreads and fees each time. And delivery can bite. On April 20, 2020, the May contract for US crude [settled below minus $37 a barrel](https://www.everycrsreport.com/reports/IN11354.html), one day before expiry, because holders were obliged to take physical oil at a hub in Cushing, Oklahoma, that was essentially full. Traders paid to get out.

---

## Removing the expiry

A perp is a future with the last day deleted. You can hold it for a minute or a year, and there's nothing to roll or deliver.

But with no last day, nothing forces it to meet the spot price. It's a contract that settles against nothing, so in principle it could trade anywhere.

![A dated future is forced to meet the spot price at expiry. A perp has no expiry, so funding pulls it back: above the index longs pay shorts, below it shorts pay longs.](diagram:perps-expiry)

The replacement for the calendar is **funding**: a payment between longs and shorts, made every few hours, that depends on how far the perp has drifted from the asset's real price. Three prices are involved:

- **Index price**: the asset's spot price, usually an average across large exchanges
- **Mark price**: the exchange's fair estimate of the perp's price
- **Last price**: the most recent trade

When the perp trades above the index, longs pay shorts. When it trades below, shorts pay longs. The exchange takes no cut; the money moves between traders.

Dave White's [Cartoon Guide to Perpetual Futures](https://www.paradigm.xyz/writing/the-cartoon-guide-to-perps) calls this a thermostat. If the perp runs hot, holding a long gets expensive and holding a short gets paid, so longs close and new shorts open, which pushes the price down. If it runs cold, the same happens in reverse. Nothing forces the two prices together. Funding only makes being on the wrong side of the gap expensive.

### The formula

Here is how Binance [computes it](https://www.binance.com/en/support/faq/detail/360033525031), for its default 8-hour interval:

```text
F = P + clamp(I - P, -0.05%, +0.05%)

P = average premium of the perp over the index
I = interest rate, 0.01% per 8 hours
```

Say the perp averaged 0.10% above the index during the interval. Then `I - P` is -0.09%, the clamp limits it to -0.05%, and the rate is 0.05%. A $10,000 long pays a short $5. That sounds small until you remember it happens three times a day: 0.05% every 8 hours is about 55% a year.

The clamp has a side effect. Any premium between -0.04% and +0.06% produces exactly 0.01%, so in calm markets funding sits at that one number. Longs then pay shorts about 11% a year by default. The interest term exists because a long perp is economically like borrowing dollars to hold the asset, and borrowing should cost something.

![The formula plotted. Inside the band funding is exactly 0.01%. Outside it, the rate follows the premium.](diagram:perps-funding)

Hyperliquid, the largest on-chain venue, [uses the same formula](https://hyperliquid.gitbook.io/hyperliquid-docs/trading/funding) but pays every hour at one eighth of the rate. A faster loop means less drift between payments.

### Funding is the roll

White's guide has a second model that goes deeper. In its simplified perp, funding is the gap between mark and index, paid per day. Holding that perp, you could sell 1/24 of your position every hour and use the funding to buy 1/24 of a bitcoin. After a day you'd hold the actual asset. So a perp at that setting should be priced like a future expiring in 24 hours.

That changes how to think about the contract. A perp isn't really a future with no expiry. It's a very short future that rolls itself forever, and funding is the cost of the roll.

---

## Who keeps it honest

Funding is only a signal until someone acts on it, and the people who act are arbitrageurs running the **basis trade**, or cash-and-carry.

![Buying one bitcoin on spot and shorting one bitcoin perp cancels the price exposure and leaves the funding payments.](diagram:perps-carry)

Buy $1 of bitcoin and short $1 of the bitcoin perp. If the price moves, one leg's gain cancels the other's loss. What's left is the funding, which is usually positive. When too many people want to be long, the funding rises, more arbitrageurs short the perp to collect it, and that selling is what pushes the perp back down. Traders with leverage demand pay traders without it.

Ethena turned this trade into a stablecoin. USDe is backed by long crypto positions [hedged with short perps](https://cryptobriefing.com/ethena-usde-equity-perpetuals-backing/), and funding pays the yield. That made it a large natural short in the market, and tied its size to funding: supply peaked at about $15 billion in October 2025 and [was below $5 billion](https://cryptobriefing.com/ethena-ends-usde-token-incentives/) by late August 2026 as the yield faded. In August 2026 it was extending the same strategy to equity perps.

---

## Leverage and liquidation

A traditional futures broker can call you for more margin and give you a little time to send it. A crypto exchange runs 24/7 and doesn't wait. It watches every account, and when your equity gets too low it closes you automatically. That's a **liquidation**.

Take a 10x long: $1,000 of margin, a $10,000 position, 0.1 BTC bought at $100,000.

![A 10x long opened at 100,000 with 1,000 dollars of margin is liquidated near 92,300. At 90,000 the margin is gone, and below that the loss belongs to someone else.](diagram:perps-margin)

The naive answer is that you're wiped out at a 10% fall. In practice you're closed earlier, because the exchange requires a **maintenance margin**. At 2.5%, liquidation comes at about $92,300, a 7.7% fall. The space between there and $90,000, the **bankruptcy price**, is the engine's room to get you out before your loss exceeds your deposit.

This is why mark price exists. If liquidations used the last trade, a single large order on a thin book could liquidate thousands of people in a second. So the mark is built to resist that. Hyperliquid [takes the median](https://hyperliquid.gitbook.io/hyperliquid-docs/trading/robust-price-indices) of three inputs: an oracle price adjusted by a moving average, its own order book, and the mid prices of perps on other exchanges.

---

## When a liquidation can't be filled

Perps are zero-sum. For every long there's a short, and a winner's profit is literally the loser's money. So if a loser goes bankrupt with the price still moving, the loss has to land somewhere, or the winner doesn't get paid. Exchanges handle this with a waterfall.

![When a position fails it first goes to the order book, then a backstop such as an insurance fund or liquidator vault, and finally auto-deleveraging closes profitable traders on the other side.](diagram:perps-waterfall)

1. **The book.** The engine sends market orders. Almost every liquidation ends here. If it fills above the bankruptcy price, nobody else is involved.
2. **The backstop.** If the book can't take it, the position goes to a pool of capital. On a centralized exchange that's an insurance fund, built up from liquidation profits. On Hyperliquid, a [liquidator vault](https://hyperliquid.gitbook.io/hyperliquid-docs/trading/liquidations) inside HLP, a community-funded vault, takes over accounts below two thirds of maintenance margin.
3. **Auto-deleveraging.** If an account still goes negative, the exchange closes positions on the other side. [Hyperliquid ranks](https://hyperliquid.gitbook.io/hyperliquid-docs/trading/auto-deleveraging) opposing traders by unrealized profit and leverage, then closes them at the previous mark price against the underwater account.

**ADL** is the part of perps people find hardest to accept. You can be right, in profit, and fully margined, and have your position closed for you because someone else failed. It's also what lets an exchange promise that it has no bad debt. Hyperliquid's docs state the guarantee precisely: "a user who has no open positions will not socialize any losses of the platform." The losses go to people with open positions, and specifically to the winners.

It's worse than it sounds for anyone hedged. If your short was protecting a long somewhere else, ADL removes the hedge at exactly the moment the market is most violent.

---

## October 10

On October 10, 2025, Donald Trump announced a 100% tariff on Chinese imports. Over the next day, [more than $19 billion of positions](https://www.coingecko.com/learn/october-10-crypto-crash-explained) across over 1.6 million accounts were force-closed, by CoinGlass's count, with $3.21 billion going in one minute. It was the largest liquidation day on record, and every step of the waterfall ran at once.

The cascade is the mechanism working against itself. Liquidations are market sells, market sells push the price down, and a lower price triggers the next liquidations. Hyperliquid alone recorded about $10 billion. Its book couldn't absorb the flow, and [ADL closed profitable shorts](https://thedefiant.io/newsletter/defi-daily/the-ultimate-10-10-crash-autopsy). Its vault, buying at distressed prices, reportedly made over $40 million.

![Each forced sale can cause the next one.](diagram:perps-cascade)

The sharpest failure was about collateral. Binance's unified accounts let traders post other assets as margin, and it valued those using its own order books. During the crash, Ethena's USDe fell to $0.65 on Binance while it stayed around $0.99 on Curve and Uniswap. Cross-margined accounts were marked down against a price that existed on one exchange, and some were liquidated on it. wBETH and BNSOL slipped the same way. Binance later paid out $283 million.

![The same dollar token, priced on two sets of venues during the crash.](diagram:perps-usde)

Binance's position is that this wasn't the cause: in [its post-mortem](https://ambcrypto.com/binance-says-macro-shock-not-exchange-failure-drove-octobers-19b-liquidation-cascade/) it says roughly 75% of the day's liquidations came before those prices deviated. Both things can be true. The market was going down regardless, and a bad mark price still took people out who shouldn't have gone.

---

## On-chain perps

Crypto's perp markets grew up on centralized exchanges, which means trusting an operator with both your funds and the liquidation engine. Decentralized venues have tried several ways to remove that.

| Design | Example | How it works | Main trade-off |
| --- | --- | --- | --- |
| Pool and oracle | GMX | Traders take the other side of a liquidity pool at oracle prices | Pool depositors carry the risk, and the oracle is an attack surface |
| Verified order book | Lighter | Matching happens off-chain, with on-chain zk verification | Relies on the operator to stay up |
| App chain | Hyperliquid | A purpose-built L1 runs the order book itself | Fast, but a small validator set controls a lot |

So far Hyperliquid has won this contest. It holds 53–57% of on-chain open interest depending on who's counting. Its bet was that traders want an exchange's speed more than they want a general-purpose chain, and that an on-chain order book is worth building a blockchain for. It also makes everything visible: every position and every liquidation is public, which is why its October 10 numbers look so large next to everyone else's.

The cost showed up on March 26, 2025. A trader opened a large short on JELLYJELLY, a thin memecoin, and the price moved until the position was liquidated. The book couldn't absorb it, so HLP inherited the short and sat on [about $12 million](https://www.theblock.co/post/348314/hyperliquid-delists-jellyjelly-memecoin-amid-whale-manipulation-fiasco) of unrealized losses as the price kept rising. Then, within hours, Hyperliquid's validators voted to delist the market and [settled it at $0.0095](https://decrypt.co/311713/hyperliquid-delists-solana-meme-coin-liquidation-crisis), well below where it was trading. HLP's loss disappeared.

![How a liquidation on a thin market ended in a validator vote.](diagram:perps-jelly)

That's the backstop being rescued by the people who run the chain. It's the same question as in my post on [prediction markets](/blog/prediction-markets): the mechanism is fine until something goes wrong, and then it matters who decides.

---

## Everything becomes a perp

The newest development is that the asset no longer has to be crypto.

Under Hyperliquid's [HIP-3](https://hyperliquid.gitbook.io/hyperliquid-docs/hyperliquid-improvement-proposals-hips/hip-3-builder-deployed-perpetuals), anyone staking 500,000 HYPE can deploy a perp market, choosing its oracle, its specification and its leverage limits. Validators can slash that stake if the operator misbehaves. By October 28, 2026 there were [169 of these markets live](https://www.tokenpost.com/news/investing/42970) holding $4.12 billion of open interest, and the largest were not crypto: the S&P 500, gold and WTI crude. On July 8 these markets [out-traded crypto](https://thedefiant.io/news/defi/builder-deployed-markets-overtake-crypto-on-hyperliquid) on Hyperliquid for the first time.

The attraction is the hours. A perp on oil trades on Sunday. Over the weekend of February 28, as crude surged, Hyperliquid's builder markets [did nearly $720 million](https://oakresearch.io/en/analyses/innovations/what-is-hyperliquid-hip-3-how-it-works-and-use-cases) of volume, while the futures markets that normally set the oil price were closed for the weekend.

There's a design problem hiding in that, though. Funding needs an index to compare against, and on a Sunday the reference market is shut. The thermostat loses its thermometer. The perp trades mostly on its own flow until the market reopens, when it can reprice in one jump, past anyone's liquidation price.

![A sketch: with the index frozen, nothing pulls the perp back until the reference market reopens.](diagram:perps-weekend)

The US, meanwhile, is catching up. On May 29, 2026 the CFTC [approved Kalshi's bitcoin perpetual](https://www.pymnts.com/cpi-posts/cftc-opens-door-to-perpetual-crypto-futures-trading-in-us/), the first in the country, and cleared Coinbase to give US customers access to perps on Deribit. Kalshi added [gold and silver](https://www.pymnts.com/legal/2026/kalshi-gets-cftc-ok-list-precious-metals-futures/) in September. Coinbase has filed for single-stock perps.

The incumbents aren't relaxed about it. CME [sued the CFTC](https://www.dechert.com/knowledge/onpoint/2026/6/addendum-to-perpetual-contracts.html) in June, arguing that these contracts are swaps, not futures, and the CFTC has asked the court to dismiss the case. And on October 29, ICE, which owns the NYSE, announced a deal with trade[XYZ], the largest HIP-3 operator, for a [CFTC-regulated venue](https://startupfortune.com/nyse-owner-ice-strikes-deal-to-bring-hyperliquid-perps-to-the-us/) offering 24/7 perps built on Hyperliquid, subject to approval.

---

## What a perp is

Strip it down and a perp is two ideas. The first is funding, which replaces a date with a price: instead of the calendar forcing convergence, a recurring payment makes divergence expensive. The second is the liquidation waterfall, which replaces a clearinghouse and a margin call with an automatic engine and, at the bottom, a rule for taking money from winners.

The first idea is close to solved. It's simple, it works, and it's now being applied to oil and equities. The second is where every serious failure has happened: a wrong mark price, an empty vault, a validator vote. Perps work almost all the time, and they fail in the moments when the most money is moving. As the product spreads from crypto traders to the S&P 500 at 3am on a Sunday, the question worth asking is what happens on the day it can't track the index, and who was told in advance that they'd pay.

---

## Further reading

- [The Cartoon Guide to Perpetual Futures](https://www.paradigm.xyz/writing/the-cartoon-guide-to-perps): Dave White's four mental models for what a perp is. The best explanation there is.
- [Measuring Asset Values for Cash Settlement in Derivative Markets](https://nber.org/papers/t0131): Shiller's 1993 paper proposing perpetual futures
- [Perpetual Futures Pricing](https://ideas.repec.org/p/nbr/nberwo/32936.html): Ackerer, Hugonnier and Jermann on the theory
- [Binance funding rates](https://www.binance.com/en/support/faq/detail/360033525031): the full formula, caps and intervals
- [Hyperliquid docs on funding](https://hyperliquid.gitbook.io/hyperliquid-docs/trading/funding), [liquidations](https://hyperliquid.gitbook.io/hyperliquid-docs/trading/liquidations) and [auto-deleveraging](https://hyperliquid.gitbook.io/hyperliquid-docs/trading/auto-deleveraging): the clearest public description of how a modern perp engine works
- [The October 10 crypto crash explained](https://www.coingecko.com/learn/october-10-crypto-crash-explained): CoinGecko's timeline of the day
- [The ultimate 10/10 crash autopsy](https://thedefiant.io/newsletter/defi-daily/the-ultimate-10-10-crash-autopsy): The Defiant on the causal chain
- [Perp DEX rankings](https://castlelabs.io/research/perp-dex-rankings): Castle Labs' updated figures for on-chain venues
