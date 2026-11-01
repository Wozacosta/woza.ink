---
title: "SearXNG vs Kagi: Two Layers on Top of Someone Else's Index"
date: "2026-11-01"
description: "One is free and you run it yourself. The other costs $10 a month. Both sit on indexes they don't own, and that decides how they rank, how they break and who you end up trusting."
tags: ["web", "privacy", "open-source"]
---

# SearXNG vs Kagi: Two Layers on Top of Someone Else's Index

In February, CJ from Syntax [published a video](https://www.youtube.com/watch?v=9pNMvfwQYE4) about being fed up with AI slop and listicles in search results. The fix was SearXNG, an open-source metasearch engine, running in one Docker container on localhost. A search for how to reverse a string in JavaScript came back with results from Google, Startpage, Brave and DuckDuckGo, and a Stack Overflow answer sat on top because every engine had it.

Nine months later, a fresh install won't do that. Google and Startpage are both off by default now, for reasons that say a lot about how web search works in 2026.

The other popular answer to bad search is Kagi, which charges $10 a month and shows no ads. The two look like opposites, one free and self-hosted, the other paid and closed. But they're the same kind of thing: a layer on top of indexes that someone else built. This post is about what each layer adds, how it breaks and who you're trusting.

---

## Almost nobody has an index

Crawling the web and keeping that copy fresh is the expensive part of search. Kagi compares it to [building a parallel national railroad](https://blog.kagi.com/waiting-dawn-search), and points out that Microsoft spent roughly $100 billion over 20 years on Bing to reach a single-digit market share. Google had 90.06% of the worldwide market in October 2025, by StatCounter's count.

So most alternatives resell. DuckDuckGo says it [largely sources](https://duckduckgo.com/duckduckgo-help-pages/results/sources) its traditional links from Bing. Startpage, according to Kagi, runs on Google's ad-syndication deal. A metasearch engine goes one step further: it asks several of these at once and merges the answers.

![SearXNG and Kagi draw on the same indexes by different routes. Google: SearXNG uses a custom search workaround, Kagi buys results from third-party providers. Bing: off by default in SearXNG, third-party providers for Kagi. Brave: SearXNG reads its result pages, Kagi has a direct license. Mojeek: off by default in SearXNG because of a CAPTCHA, a direct license for Kagi. Only Kagi has an index of its own, for small-web pages and news.](diagram:searxng-kagi-sources)

Kagi does crawl. It has a web index called Teclis and a news index called TinyGem, both aimed at [non-commercial sites and the small web](https://help.kagi.com/kagi/search-details/search-sources.html). But those add flavor to a page that still mostly comes from elsewhere: a typical query calls "a dozen or so different sources."

---

## SearXNG: ranking by agreement

SearXNG is AGPL-licensed, has about 39,000 stars on GitHub, and is a small amount of work to try. You [run the container](https://docs.searxng.org/admin/installation-docker.html), point your browser's default search at `http://localhost:8080/?q=%s`, and that's the setup. DuckDuckGo-style bangs work too, with [two exclamation marks](https://docs.searxng.org/user/search-syntax.html): `!!w` jumps to Wikipedia.

The interesting part is the ranking, because it's [about ten lines of Python](https://github.com/searxng/searxng/blob/master/searx/results.py). A result's weight is the number of engines that returned it, and its score adds up that weight divided by its position on each engine.

- First place on one engine scores 1.
- First place on two engines scores 4.
- Fifth place on three engines scores 1.8.

So a page that's mediocre everywhere beats a page one engine loved. CJ's argument is that this filters slop, since something that shows up across engines is "more than likely going to be a good result."

That's only as good as the engines' independence, and they aren't very independent. If DuckDuckGo mostly reflects Bing, and Startpage reflects Google, then two engines agreeing can be one index counted twice. A content farm that has beaten Google's ranking gets rewarded for it, twice. Agreement measures how widely a page has won at SEO, which isn't the same as whether it's any good.

What SearXNG gives you instead is control. The [hostnames plugin](https://github.com/searxng/searxng/blob/master/searx/plugins/hostnames.py) can remove, demote or boost domains by regex, and each engine has its own weight. You can build a very good personal filter in YAML, by hand, and keep it up yourself.

---

## Why SearXNG keeps breaking

The big engines don't give SearXNG an API. For Google, Brave and DuckDuckGo it reads result pages the way a browser would, on sites that would prefer it didn't. The project's own docs put it plainly: SearXNG [passes through requests from bots](https://github.com/searxng/searxng/blob/master/searx/limiter.py) "and is thus classified as a bot itself."

That has been a long, losing arms race, and 2026 has been rough:

- **Google.** In July the maintainers switched off the main Google engine as ["completely broken"](https://github.com/searxng/searxng/pull/6364) and replaced it with a workaround through Google's custom search widget. The same note says it "will be broken in 2027." The old engine got a fix in August by pretending to be a Nokia phone, and by October people on [home connections were getting 403s](https://github.com/searxng/searxng/issues/6835) again.
- **Startpage.** In September it [put a proof-of-work wall](https://github.com/searxng/searxng/pull/6669) in front of its search endpoint. The engine still works, but it's off by default now.
- **Mojeek.** Also inactive by default, because its CAPTCHA "requires much computer power to solve."
- **Bing.** Off by default for at least three years.

What's left on by default is DuckDuckGo, Brave, that Google workaround, and a set of smaller sources. It's still useful, but it isn't what the video showed, and that's nobody's fault: the video was accurate in February.

The practical cost is that you're the ops team. The docs include a page on [solving a CAPTCHA from your server's IP](https://docs.searxng.org/admin/answer-captcha.html) through an SSH tunnel. Public instances avoid the setup, and [searx.space](https://searx.space/) listed 73 online when I checked, but the docs warn that poorly protected ones are [more vulnerable](https://docs.searxng.org/own-instance.html) to abuse, which brings CAPTCHAs and IP bans.

---

## Kagi: paying for the ranking

Kagi has [three paid plans](https://kagi.com/pricing): $5 for 300 searches, $10 for unlimited, and $25 for unlimited plus better AI models. A trial gives you 100 searches, and a month you don't use is credited back. It's small and says so on a [public stats page](https://kagi.com/stats): 75,692 members and about 878,600 queries a day when I looked.

Its claim is that incentives do most of the work. Since subscribers pay and advertisers don't, it can [push down pages full of ads and trackers](https://help.kagi.com/kagi/search-details/search-sources.html), which it says correlate with low quality. That's a cheap signal against SEO spam, because the spam has to monetize somehow.

On CJ's actual complaint, Kagi has something SearXNG doesn't. [SlopStop](https://help.kagi.com/kagi/features/slopstop.html) lets users report AI slop, each report gets reviewed, and a domain that's mostly AI-generated (typically more than 80% of its pages) gets flagged and downranked. You can also block or promote domains for yourself and scope a search with Lenses, which is the hostnames plugin with a UI.

Then there's the part the pricing page doesn't cover. Kagi [licenses directly](https://blog.kagi.com/waiting-dawn-search) from Mojeek, Brave, Yandex, Wikipedia, Apple and others. It failed with the two that matter most. Microsoft banned reordering or merging results, and then retired the Bing Search APIs in August 2025. Google offers no general search API at all. So Kagi says it uses third-party providers for "SERP-style results," and it's blunt about why:

> There is no legitimate, paid path to comprehensive Google or Bing results for a company like Kagi.

Kagi doesn't name those providers. It does describe Google's lawsuit against the scraping firm SerpApi as Google "moving to close the back door." So your $10 doesn't escape the fragility SearXNG has. It makes the fragility someone else's job, with staff, money and a contract behind it, which is still worth paying for.

---

## Who sees your searches

Both call themselves private, and they mean different things. SearXNG removes tracking from requests: [no cookies, and a random browser profile](https://docs.searxng.org/own-instance.html) per request. Kagi promises [not to log searches](https://help.kagi.com/kagi/privacy/privacy-protection.html) or tie them to an account. It's the same lesson as [wallets and RPCs](/blog/kohaku-private-wallets): someone has to answer the question, so the real issue is who learns it was you.

| Setup | Who sees the query | What links it to you | Who you trust |
|---|---|---|---|
| SearXNG at home | Every engine it calls | Your home IP | Yourself |
| SearXNG on a VPS | Every engine, plus the host | A server IP used only by you | Your host |
| Public SearXNG | Every engine, plus the operator | The operator sees your IP | A stranger |
| Kagi | Kagi, then anonymized calls to sources | Your account | Kagi's policy |
| Kagi with Privacy Pass | Kagi, then anonymized calls to sources | No account link | Kagi, for the query only |

Self-hosting at home has a catch CJ states directly: "they still know me by my IP address." With one user, there's no crowd to hide in, and your whole search history reaches each engine from a single address. The cookies are gone but the pattern isn't. On a public instance you get the crowd, at the price of an operator who [could be logging or selling](https://docs.searxng.org/own-instance.html) your requests without you knowing.

Kagi's default is a policy promise from a closed-source service that holds your email and payment details. Its better option is [Privacy Pass](https://blog.kagi.com/kagi-privacy-pass), where the server can verify that a client has paid but can't tell which client is connecting. That's the strongest guarantee in the table, because it replaces a promise with cryptography, and Kagi also runs a Tor onion service.

The trust question isn't only technical either. Kagi [pays Yandex](https://ounapuu.ee/posts/2025/07/17/kagi/), and some customers have left over it.

---

## Using either one from agents

This is where SearXNG is hardest to beat. JSON output is off by default, but adding `json` to `search.formats` in `settings.yml` turns any query into an API call with `&format=json`. There's a popular [MCP server](https://github.com/ihor-sokoliuk/mcp-searxng), and CJ just vibe coded one. It costs nothing per query, though an agent searching in a loop from one IP is exactly the traffic that gets instances blocked.

Kagi's equivalent is a [paid API](https://kagi.com/api/pricing): $12 per 1,000 searches and $4 per 1,000 extracted pages. That's fine for a product, and steep for a coding agent that searches all day.

The video's other tool has moved too. Perplexica, the self-hosted Perplexity clone, is now [Vane](https://github.com/ItzCrazyKns/Vane), with about 38,000 stars and SearXNG underneath. It's the most complete version of this setup, as long as you remember what "local" covers: your queries still go out to the search engines, and to your LLM provider unless you run the model yourself through Ollama.

---

## What could change this

All of this rests on one company's refusal to sell access, and that may be changing. Under the [remedies in the Google antitrust case](https://blog.kagi.com/waiting-dawn-search), as Kagi summarizes them, Google has to offer search syndication to "Qualified Competitors" with no ad-bundling requirement, and index data at marginal cost. That's exactly what Kagi has been asking for. Google has [appealed](https://ppc.land/google-files-appeal-challenging-six-year-search-remedies/), and I couldn't find whether Kagi has qualified.

Meanwhile, Google's [case against SerpApi](https://searchengineland.com/google-loses-key-dmca-claims-against-serpapi-in-scraping-lawsuit-483185) hasn't gone the way it wanted: a judge dismissed its DMCA claims in July, leaving it room to replead part of them.

If the front door opens, Kagi gets a legal, stable route to Google's results. SearXNG doesn't. A hobbyist's container was never going to be a Qualified Competitor, so it stays at the back door, and the back door keeps getting narrower.

---

## Which one to use

| | SearXNG | Kagi |
|---|---|---|
| **Cost** | Free, plus a server if you want it everywhere | $10 a month for unlimited |
| **Ranking** | Agreement between engines | Their algorithm, ad and tracker penalties |
| **Slop** | Your own hostname rules | Community reports, reviewed by Kagi |
| **Upkeep** | Yours, and it will break | Theirs |
| **Code** | Open source, AGPL | Closed |
| **Agents** | Free JSON API | $12 per 1,000 searches |

For searching as a person, I'd pay for Kagi. Search is used dozens of times a day on every device, and $10 a month is cheap for results that keep working without maintenance. Take the Privacy Pass route if the account link bothers you.

SearXNG is worth running if you already have a home server, if you want an API for your agents, or if you don't want to depend on a company for this at all. Those are good reasons, but go in knowing what you're signing up for. You're not leaving the big indexes behind. You're choosing to scrape them yourself.

The two also combine well: Kagi for you, SearXNG for your agents. Either way, the bigger problem remains that one company decides what's on the floor under both of them.
