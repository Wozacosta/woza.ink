import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "building-pomo",
  notes: [
    {
      marker: "Clean, distraction-free timer front-and-center",
      type: "context",
      content:
        "The Pomodoro Technique was invented by Francesco Cirillo in 1987 when he couldn't focus while studying for a sociology exam. He grabbed the first kitchen timer he could find — shaped like a tomato (*pomodoro* in Italian) — and bet himself he could concentrate for just two minutes. He spent the next five years refining the method and has since taught it to millions.",
      attribution: "Francesco Cirillo",
      url: "https://en.wikipedia.org/wiki/Pomodoro_Technique",
    },
    {
      marker: "Overly simple: just a timer — no context, no nudge, no soul.",
      type: "source",
      content:
        "A scoping review of 32 studies (5,270 participants) found that time-structured Pomodoro interventions consistently improved focus by 15-25% and reduced mental fatigue by ~20% compared to self-paced breaks. 88% of studies showed positive outcomes. However, the impact on raw productivity and task completion was more variable than commonly claimed.",
      attribution: "BMC Medical Education, 2025",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12532815/",
    },
    {
      marker: "Feature-bloated: settings, badges, streaks, and a dashboard that screams for attention.",
      type: "quote",
      content:
        "\"Deep work is professional activity performed in a state of distraction-free concentration that pushes your cognitive capabilities to their limit.\" Cal Newport's research on attention residue shows that switching tasks — even briefly checking email — leaves a cognitive residue that saps focus on the next task. The Pomodoro structure combats this by enforcing single-task blocks.",
      attribution: "Cal Newport, *Deep Work* (2016)",
      url: "https://calnewport.com/deep-work-rules-for-focused-success-in-a-distracted-world/",
    },
    {
      marker: "Quick access to calming audio — one click to get into the zone.",
      type: "context",
      content:
        "The concept of \"attention residue\" was identified by business professor Sophie Leroy in her 2009 paper *Why Is It So Hard to Do My Work?*. She found that when you switch from Task A to Task B, part of your mind keeps processing Task A, reducing performance on B. Cal Newport popularized this finding to argue for long, uninterrupted focus blocks.",
      attribution: "Sophie Leroy, 2009",
      url: "https://www.goodreads.com/work/quotes/45502249-deep-work-rules-for-focused-success-in-a-distracted-world",
    },
    {
      marker: "Minimal UI: reduce the number of decisions the user must make while focused.",
      type: "source",
      content:
        "Adobe reported that minimalist design use in mobile apps grew by 147% since 2016, with 44% of designers choosing it for app interfaces. Research shows that clean, uncluttered interfaces reduce cognitive load and create what designers call \"cognitive tranquility\" — a sense of calm that improves both user satisfaction and task completion.",
      url: "https://semnexus.com/less-is-more-minimalist-app-design-interface/",
    },
    {
      marker: "Does this help people focus, or will it distract them?",
      type: "quote",
      content:
        "\"Who you are, what you think, feel, and do, what you love — is the sum of what you focus on.\" Gallagher's central thesis is that our attention literally shapes our experience of reality. Tools that respect attention (rather than competing for it) are a form of user respect.",
      attribution: "Winifred Gallagher, *Rapt*",
      url: "https://www.theglobeandmail.com/arts/sorry-i-wasnt-paying-attention/article4280360",
    },
    {
      marker: "Deep analytics dashboards (tempting, but noisy)",
      type: "counter",
      content:
        "A 2023 study of 87 students compared Pomodoro-style breaks with self-regulated ones. The Pomodoro group reported less fatigue and more motivation, but found no difference in mental effort or task completion. The benefit was mood and a shorter session, not more work done.",
      attribution: "Biwer et al., 2023",
      url: "https://pubmed.ncbi.nlm.nih.gov/36859717/",
    },
  ],
};
