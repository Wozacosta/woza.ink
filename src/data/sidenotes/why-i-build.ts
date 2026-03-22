import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "why-i-build",
  notes: [
    {
      marker: "Side projects are where I break rules, try new tools, and learn how things actually fail in the wild",
      type: "quote",
      content:
        "\"You mostly learn hacking by hacking.\" Paul Graham has consistently argued that the best way to learn is by building — original ideas don't come from trying to have original ideas, they come from trying to build or understand something slightly too difficult.",
      attribution: "Paul Graham",
      url: "https://paulgraham.com/newthings.html",
    },
    {
      marker: "*permission* to be weird, to `refactor` with abandon, and to throw away things that don't work",
      type: "source",
      content:
        "A 2019 study published in PNAS found that students in active-learning classrooms learned more than those in traditional lectures — but *perceived* they learned less. The comfort of passive listening creates an illusion of understanding. Doing the work feels harder precisely because it forces real engagement.",
      attribution: "Deslauriers et al., PNAS 2019",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6765278/",
    },
    {
      marker: "Ship the core, then iterate. Release > perfect.",
      type: "quote",
      content:
        "\"I actually ship products.\" Pieter Levels set out to launch 12 startups in 12 months — not to succeed at all of them, but to force himself to learn by finishing. His philosophy: the first version of anything always sucks, but with iteration it becomes something. The world doesn't end if something flops.",
      attribution: "Pieter Levels",
      url: "https://levels.io/how-i-build-my-minimum-viable-products/",
    },
    {
      marker: "Keep the scope mercilessly small — scope creep is the silent productivity killer",
      type: "quote",
      content:
        "\"Break the big thing into smaller things. The smaller it is, the easier it is to estimate.\" DHH built both Basecamp and Ruby on Rails as side projects. His shipping principle: either you ship or you die. Keeping scope flexible and focusing on running software matters more than planning.",
      attribution: "David Heinemeier Hansson, *Rework*",
      url: "https://changelog.com/shipit/77",
    },
    {
      marker: "These micro-skills compound — they make the next project faster and better",
      type: "context",
      content:
        "Mathematician Richard Hamming observed: \"Knowledge and productivity are like compound interest. Given two people of approximately the same ability and one person who works ten percent more than the other, the latter will more than twice outproduce the former.\" The more you know, the more you learn; the more you learn, the more you can do.",
      attribution: "Richard Hamming, *You and Your Research* (1986)",
      url: "https://kottke.org/17/06/compound-interest-applied-to-learning",
    },
    {
      marker: "Shipping makes learning visible. It transforms private experiments into public signals.",
      type: "note",
      content:
        "Pieter Levels describes how he \"hit publish again and again, learning on the fly.\" The act of shipping transforms private experiments into public accountability. Building in public — sharing progress, failures, and lessons — creates a feedback loop that accelerates learning far beyond solo tinkering.",
      attribution: "Pieter Levels",
      url: "https://levels.io/startups/",
    },
    {
      marker: "Most of my side projects are intentionally non-commercial \u2014 they\u2019re playgrounds, not startups",
      type: "quote",
      content:
        "\"I'm proud of being used as an example for people who wish to bootstrap, become profitable, stay small, or any of the other motivations for being in business that have little commercial and industrial backing.\" DHH has long argued that a dent in the universe is plenty — you don't need venture capital or unicorn ambitions to build something meaningful.",
      attribution: "David Heinemeier Hansson",
      url: "https://medium.com/signal-v-noise/reconsider-41adf356857f",
    },
  ],
};
