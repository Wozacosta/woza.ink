---
title: "Laws of UX: How Many of Them Are Actually Laws?"
date: "2026-10-31"
description: "Fitts's law has seventy years of measurements behind it. Miller's law misquotes its own paper. A tour of the best-known laws of UX, sorted by how far you can trust them."
tags: ["design", "web"]
series: ui-ux
wip: true
---

# Laws of UX: How Many of Them Are Actually Laws?

[Laws of UX](https://lawsofux.com/) is Jon Yablonski's collection of thirty principles for designing interfaces, each with a one-line definition and a few takeaways. It's a good site, and it became a good book. The name, though, does a lot of work. A law sounds like physics. It sounds like something you can't argue with in a design review.

Yablonski knows this. "The whole title can be slightly misleading, 'Laws of UX,' when, in reality, there is no law in UX," [he told Adobe](https://blog.adobe.com/en/publish/2018/04/17/ux-designers-need-check-laws-ux) in 2018.

He's right, and what's interesting is how uneven it is. A few of these are equations that have been measured for seventy years. Some are real findings that get quoted without their fine print. Others are one person's well-argued opinion. They all get the same word.

This post goes through nine of the thirty so far, sorted by how far you can trust them.

![The nine laws in this post, sorted into three tiers by how far you can trust them.](diagram:ux-trust)

---

## Measured: you can calculate these

### Fitts's law

In 1954 the psychologist Paul Fitts had people tap a stylus back and forth between two metal plates, and found that the time it took followed a simple rule. The version used in interface work today is:

```text
T = a + b × log2(D / W + 1)
```

`D` is the distance to the target, `W` its width along the direction of movement, and `a` and `b` are constants that depend on the device. The logarithm is the index of difficulty, measured in bits.

![Three pointing tasks drawn to scale. A far, narrow target scores 4.0 bits. Making it three times wider, or bringing it three times closer, both score 2.6 bits.](diagram:ux-fitts)

So size and distance trade off against each other, and you can compute the exchange rate. The practical advice follows directly: make important targets bigger, put them near where the pointer already is, and leave space between them.

The best trick in the formula is the screen edge. With a mouse, the cursor stops at the edge of the screen however far you push, so a target there is [infinitely deep](https://en.wikipedia.org/wiki/Fitts%27s_law) in that direction. A corner is two edges meeting. That's why a menu bar pinned to the top of the screen is faster to hit than one floating inside a window.

![A menu inside a window can be overshot. A menu bar on the screen edge can't, because the pointer stops there.](diagram:ux-edges)

For touch, the standard has numbers. WCAG 2.2 asks for [at least 24 by 24 CSS pixels](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) at level AA, with exceptions such as enough spacing around the target, and [44 by 44](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html) at level AAA. I measured this site while writing this: on a phone, the tag chips on a post are 20 pixels tall and the "← Blog" link is 16. The spacing exception may let them pass, but they're not the targets you'd choose.

### Hick's law

In 1952 William Hick, and a year later Ray Hyman, measured how long people took to respond when one of several signals could appear. Reaction time grew with the logarithm of the number of options:

```text
T = b × log2(n + 1)
```

Here `n` is the number of equally likely options. Doubling them doesn't double the time. It adds about the same amount each time, so going from 8 options to 16 costs about as much as going from 4 to 8.

![Four options cost 2.3 units, eight cost 3.2, sixteen cost 4.1. Reading a list you don't know grows in a straight line instead.](diagram:ux-hick)

This one is measured, but it's narrower than its reputation. It's usually cited as "more options make people slower, so show fewer." That isn't quite what it says. It describes choosing among options you already know how to respond to. If you're scanning a list you don't know, you read it item by item, which [takes linear time](https://en.wikipedia.org/wiki/Hick%27s_law), and Hick's law doesn't apply. If you're looking for a known name in an alphabetical list, you subdivide it, and something like the logarithm comes back.

Run the formula on the usual advice and it even points the other way. One choice among 16 options costs `log2(17)`, about 4.1 units. Splitting it into two steps of 4 costs `log2(5)` twice, about 4.6. On Hick's numbers, one big decision beats two small ones. There can be very good reasons to split a task into steps, but this law isn't one of them.

---

## Real findings, with fine print

### Miller's law

Laws of UX gives the popular version: "The average person can only keep 7 (plus or minus 2) items in their working memory." That's probably the most quoted line in design, and it comes from a 1956 paper by George Miller that opens wonderfully: "My problem is that I have been persecuted by an integer."

The paper is about something else. Miller noticed that two unrelated limits, how many categories people can judge and how many items they can repeat back, both landed near seven. He suspected there was "nothing more than a coincidence" in that. His real finding was **chunks**: memory is limited by the number of meaningful units, not by the amount of information. `0612345678` is ten items. `06 12 34 56 78` is five. Someone who knows the number by heart holds one.

![The same ten digits as ten items, five chunks or one.](diagram:ux-chunks)

Later work lowered the number anyway. Nelson Cowan puts the central limit at [3 to 5 chunks](https://pmc.ncbi.nlm.nih.gov/articles/PMC2864034/) in young adults.

The classic misuse is "no more than seven items in a menu." A menu stays on the screen. Nobody has to hold it in memory, so the limit doesn't apply. The Laws of UX page says so itself: "Don't use the 'magical number seven' to justify unnecessary design limitations." What survives is chunking, and that's the useful part: group things, and format numbers.

### Choice overload

The famous study: in 2000, Sheena Iyengar and Mark Lepper set up a jam tasting in a supermarket. A table with 24 jams drew [about 60% of passers-by](https://www.atticusli.com/replication-crisis/choice-overload-jam-study/), and 3% of those who stopped bought one. A table with 6 jams drew about 40%, and 30% bought. It became the standard argument for fewer options.

![Per 100 passers-by, 24 jams drew 60 people and sold to about 2. Six jams drew 40 and sold to 12.](diagram:ux-jam)

Then in 2010 Benjamin Scheibehenne and colleagues combined 50 experiments covering 5,036 people, and found ["a mean effect size of virtually zero"](https://ideas.repec.org/a/oup/jconrs/v37y2010i3p409-425.html), with a lot of variation between studies. On average, more options did nothing.

The variation is the real result. A 2015 review by Alexander Chernev and colleagues argued the effect does show up, under certain conditions: the options are complex, the task is hard, the person is unsure what they want, or they're trying to minimize effort. Someone who knows what they're after isn't hurt by a long list. Someone comparing five confusing insurance plans might be. So the useful question is whether people can tell the options apart, not how many there are.

### The peak-end rule

In 1993 Daniel Kahneman and colleagues had people hold a hand in cold water, twice.

![Two trials of cold water. The short one is 60 seconds at 14 degrees. The long one adds 30 seconds at 15 degrees: more discomfort in total, but a milder end. Most people chose to repeat the long one.](diagram:ux-peak-end)

The long trial contains everything unpleasant in the short trial and then some, and most people chose to repeat it anyway. The paper's title says it plainly: "When More Pain Is Preferred to Less: Adding a Better End." A later study of patients undergoing colonoscopy or lithotripsy found they judged the procedure by its worst moment and its final moment, not its length.

For interfaces, the implication is that the worst moment and the last moment do more than their share. An error state and a confirmation screen may matter more to how a product is remembered than the twenty smooth screens between them.

It has limits. One 2008 study found the rule ["not an outstandingly good predictor"](https://en.wikipedia.org/wiki/Peak%E2%80%93end_rule), and experiences lasting a whole day may not follow it. Most of the classic evidence is about short, intense episodes, and using a website is rarely either.

### The aesthetic-usability effect

In 1995, Masaaki Kurosu and Kaori Kashimura at Hitachi [showed 252 people 26 variations](https://www.nngroup.com/articles/aesthetic-usability-effect/) of an ATM interface. How easy people thought a design was tracked how attractive they found it more closely than it tracked how easy it actually was.

![Ratings of how easy an ATM seemed followed how attractive it looked more closely than how easy it was.](diagram:ux-aesthetic)

The fine print is the word *perceived*. The study doesn't show that beautiful interfaces work better. It shows people think they do. NN/g notes the limit: a pretty design can buy forgiveness for minor problems, "but not of large ones."

There's a practical warning here that's easy to miss. If attractiveness buys tolerance, then a polished prototype can hide usability problems from your own test participants. The nicer the mockup, the less honest the feedback.

---

## Good advice with a law's name

### The Doherty threshold

The rule says productivity soars when a computer responds in under 400 milliseconds. It's usually credited to a 1982 IBM paper by Walter Doherty and Arvind Thadani, which challenged the belief that two seconds was fast enough.

![Doherty's 400 milliseconds next to Nielsen's limits of 0.1, 1 and 10 seconds.](diagram:ux-response)

The direction is surely right: faster systems keep people in flow. But the precision isn't. As Kent Beck [puts it](https://newsletter.kentbeck.com/p/the-precious-eyeblink), the number is "a practically motivated threshold, not a universal cognitive constant." It came from a company that sold computers, measuring people using them in 1982. Treat 400 ms as a good budget for an interaction, and don't expect anything to change at 401.

### Jakob's law

"Users spend most of their time on other sites. This means that users prefer your site to work the same way as all the other sites they already know."

Jakob Nielsen [wrote that in 2000](https://www.nngroup.com/articles/end-of-web-design/). It's the only one here named after its author by its author, and the article cites no study. It's an argument, and an excellent one: every convention you break is something a user has to relearn, and they learned the convention somewhere else. A logo that doesn't go home and a cart that isn't top right both have a cost.

![The same page twice. On the left, things are where people learned to expect them.](diagram:ux-jakob)

It's a reason to need a good reason, though, not a ban on anything new. Every convention it protects was once somebody's break from the previous one.

### Tesler's law

Larry Tesler, working at Xerox PARC in the mid-1980s, argued that every application has an inherent amount of complexity that can't be removed, only moved. Someone has to deal with it, the user or the people building the system. His reasoning in [an interview](https://en.wikipedia.org/wiki/Law_of_conservation_of_complexity) was blunt: leave that complexity to the people using the product and "you are penalizing the user to make the engineer's job easier."

It can't be measured, and it's the one I find most useful. It turns "make it simpler" into a better question: simpler for whom, and who picks up the difference? [Clear signing](/blog/clear-signing) is a good example. A transaction on a hardware wallet is exactly as complicated as it was. ERC-7730 moves the work of explaining it from the person signing to the people writing and auditing the descriptors.

![The same complexity, carried by different people. A sketch, not a measurement.](diagram:ux-tesler)

---

## How far to trust them

| Name | What it really is | Trust it for |
| --- | --- | --- |
| Fitts's law | A fitted model, replicated for decades | Sizing and placing targets |
| Hick's law | A model of reaction time among known options | Fast, practiced choices, not menus |
| Miller's law | A misquote of a paper about chunks | Grouping, not counting |
| Choice overload | A real effect under some conditions | Options people can't tell apart |
| Peak-end rule | A lab finding with limits | Short, intense episodes |
| Aesthetic-usability | A correlation in people's ratings | Knowing what your tests can't see |
| Doherty threshold | A vendor's practical number | A speed budget |
| Jakob's law | An argument | Defaulting to convention |
| Tesler's law | An aphorism | Asking who carries the complexity |

The word "law" is doing different jobs in each row. Fitts's law can tell you a button is too small. Miller's law can't tell you how many items go in your navigation, and neither can anything else in this list.

The site is still worth reading. Its value is as a vocabulary: it gives names to things designers notice, so they can talk about them. A name just isn't evidence. When someone cites a law in a design review, the useful follow-up is the one this post tried to ask each time: what was actually measured, on whom, and does that look like what we're building?

---

## Further reading

- [Laws of UX](https://lawsofux.com/): the site itself, all thirty, each with sources worth following
- [The Magical Number Seven, Plus or Minus Two](https://psychclassics.yorku.ca/Miller/): Miller's 1956 paper, which is short, funny and not what you've been told
- [The Magical Mystery Four](https://pmc.ncbi.nlm.nih.gov/articles/PMC2864034/): Cowan on the modern estimate
- [Can There Ever Be Too Many Options?](https://ideas.repec.org/a/oup/jconrs/v37y2010i3p409-425.html): the 2010 choice overload meta-analysis
- [Fitts's Law and Its Applications in UX](https://www.nngroup.com/articles/fitts-law/): NN/g's practical guide
- [Response Times: The 3 Important Limits](https://www.nngroup.com/articles/response-times-3-important-limits/): Nielsen's 0.1, 1 and 10 seconds
