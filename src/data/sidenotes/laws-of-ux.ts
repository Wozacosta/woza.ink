import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "laws-of-ux",
  notes: [
    {
      marker: "it became a good book",
      type: "source",
      content:
        "*Laws of UX* is published by O'Reilly: the first edition came out in 2020 and the second in January 2024.",
      url: "https://oreilly.com/library/view/laws-of-ux/9781098146955",
    },
    {
      marker: "The version used in interface work today",
      type: "context",
      content:
        "This is the Shannon formulation, proposed by Scott MacKenzie and named for its resemblance to the Shannon–Hartley theorem, though no formal link was established. Fitts's own version used log2(2D/W). The standard for testing pointing devices, ISO 9241-9, is built on it.",
      url: "https://en.wikipedia.org/wiki/Fitts%27s_law",
    },
    {
      marker: "That's why a menu bar pinned to the top of the screen",
      type: "counter",
      content:
        "This is a mouse result. NN/g notes that screen edges offer \"no advantage for touchscreens\", and cites work finding it actually takes longer to hit targets placed around the edges.",
      url: "https://www.nngroup.com/articles/fitts-law/",
    },
    {
      marker: "Reaction time grew with the logarithm",
      type: "note",
      content:
        "The +1 in the formula accounts for uncertainty about whether to respond at all, as well as about which response to make. When options aren't equally likely, the same idea applies with their probabilities, which is why familiar choices are faster.",
      url: "https://en.wikipedia.org/wiki/Hick%27s_law",
    },
    {
      marker: "He suspected there was",
      type: "quote",
      content:
        "\"The number of bits of information is constant for absolute judgment and the number of chunks of information is constant for immediate memory.\" Of the sevens: \"there seems to be a reasonable suspicion that it is nothing more than a coincidence.\"",
      attribution: "George Miller, 1956",
      url: "https://psychclassics.yorku.ca/Miller/",
    },
    {
      marker: "3 to 5 chunks",
      type: "counter",
      content:
        "Cowan says this limit only shows up when rehearsal is prevented, and that its cause remains unclear. Memory span also varies by material: around seven for digits, six for letters and five for words. Some theories reject a fixed number of items altogether.",
      url: "https://en.wikipedia.org/wiki/The_Magical_Number_Seven,_Plus_or_Minus_Two",
    },
    {
      marker: "On average, more options did nothing",
      type: "counter",
      content:
        "Chernev and colleagues objected that a single average is misleading, because choice overload has several causes that a pooled number can wash out. The authors [replied](https://abcwest.cogs.indiana.edu/pmwiki/pdf/scheibehenne.reply.2011.pdf) that dropping contested conditions still left an effect of D = 0.07.",
      url: "https://ideas.repec.org/a/oup/jconrs/v37y2010i3p426-428.html",
    },
    {
      marker: "patients undergoing colonoscopy or lithotripsy",
      type: "source",
      content:
        "Redelmeier and Kahneman, 1996. A 2003 randomized trial by Redelmeier, Katz and Kahneman went further and tested three extra minutes of discomfort at the end of some colonoscopies.",
      url: "https://en.wikipedia.org/wiki/Peak%E2%80%93end_rule",
    },
    {
      marker: "which challenged the belief that two seconds was fast enough",
      type: "context",
      content:
        "The better-known limits are Nielsen's: 0.1 seconds feels instant, 1 second keeps your flow of thought, 10 seconds is the end of your attention. He credits them to work including Miller 1968. That's Robert Miller, a different Miller.",
      url: "https://www.nngroup.com/articles/response-times-3-important-limits/",
    },
    {
      marker: "the article cites no study",
      type: "quote",
      content:
        "\"This Law is not even a future trend since it has been ruling the Web for several years.\"",
      attribution: "Jakob Nielsen, 2000",
      url: "https://www.nngroup.com/articles/end-of-web-design/",
    },
    {
      marker: "that can't be removed, only moved",
      type: "counter",
      content:
        "Bruce Tognazzini's objection: simplify an application and people don't sit back, they attempt more complex tasks. So total complexity may not be conserved at all. The name \"waterbed theory\" captures Tesler's version: push it down here and it rises there.",
      url: "https://en.wikipedia.org/wiki/Law_of_conservation_of_complexity",
    },
  ],
};
