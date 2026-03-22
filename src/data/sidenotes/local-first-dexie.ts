import type { ArticleSidenotes } from "./types";

export const sidenotes: ArticleSidenotes = {
  slug: "local-first-dexie",
  notes: [
    {
      heading: "what-does-local-first-actually-mean",
      type: "source",
      content:
        "The term \"local-first\" was defined in the 2019 Ink & Switch paper *Local-First Software: You Own Your Data, in Spite of the Cloud* by Martin Kleppmann, Adam Wiggins, Peter van Hardenberg, and Mark McGranaghan. They identified seven ideals: (1) fast, (2) multi-device, (3) offline-capable, (4) collaborative, (5) long-lived, (6) private, and (7) user-owned. The paper remains the foundational reference for the movement.",
      attribution: "Ink & Switch",
      url: "https://www.inkandswitch.com/essay/local-first/",
    },
    {
      heading: "what-does-local-first-actually-mean",
      type: "context",
      content:
        "The local-first movement is accelerating. There is now a dedicated Local-First Conf (2026 edition), a FOSDEM track for \"Local-First, sync engines, CRDTs,\" and growing adoption in production apps like Notion, Figma, and WhatsApp. About half of developers adopting local-first target offline-heavy use cases (field work, construction, mining); the other half focus on faster UIs for everyday apps.",
      url: "https://www.localfirstconf.com/",
    },
    {
      heading: "dexiejs-indexeddb-for-humans",
      type: "context",
      content:
        "Dexie.js was created by David Fahlander in 2014 for a personal project. He open-sourced it because \"it was so much more fun to put it out as open source.\" It has since grown to 12,000+ GitHub stars, 500,000+ weekly npm downloads, and adoption across 27,000+ repositories. Notable users include WhatsApp, GitHub, Microsoft To-Do, Wire, and Flightradar24.",
      attribution: "David Fahlander",
      url: "https://www.browserstack.com/blog/open-source-spotlight-dexie-js-david-fahlander/",
    },
    {
      heading: "building-a-local-first-app-pattern",
      type: "source",
      content:
        "CRDTs (Conflict-free Replicated Data Types) are the key enabling technology behind local-first sync. Martin Kleppmann describes them as data structures that are \"multi-user from the ground up while also being fundamentally local and private.\" His Automerge library implements a JSON CRDT that allows concurrent edits to automatically merge without conflicts — no central server required.",
      attribution: "Martin Kleppmann",
      url: "https://martin.kleppmann.com/2020/07/06/crdt-hard-parts-hydra.html",
    },
    {
      heading: "building-a-local-first-app-pattern",
      type: "counter",
      content:
        "Kleppmann himself warns that CRDTs are \"easy to implement badly\" — many published algorithms have anomalies that cause strange behavior in edge cases, and naive implementations often have terrible performance. DexieCloud sidesteps this by using property-level last-write-wins by default, which is simpler but can lose concurrent edits to the same field.",
      attribution: "Martin Kleppmann, *CRDTs: The Hard Parts*",
      url: "https://martin.kleppmann.com/2020/07/06/crdt-hard-parts-hydra.html",
    },
    {
      heading: "trade-offs-read-this-before-you-commit-to-local-first",
      type: "note",
      content:
        "Safari's storage behavior is the main cross-browser pain point. In non-PWA Safari, IndexedDB data can be evicted after 7 days of inactivity. Installing the app as a PWA (Add to Home Screen) lifts this restriction. Chrome is far more generous, typically allowing IndexedDB to use up to 80% of total disk space per origin.",
    },
    {
      heading: "when-local-first-is-a-great-fit",
      type: "quote",
      content:
        "From the Ink & Switch paper: \"We believe that data ownership and real-time collaboration are not at odds with each other. It is possible to create software that has all the advantages of cloud apps, while also allowing you to retain full ownership of the data, documents, and files you create.\" This is the thesis that launched the local-first movement.",
      attribution: "Kleppmann et al., Ink & Switch (2019)",
      url: "https://www.inkandswitch.com/essay/local-first/",
    },
    {
      heading: "dexiecloud-sync-without-building-a-backend",
      type: "note",
      content:
        "DexieCloud's property-level merge strategy means that if two users edit *different* fields of the same record concurrently, both changes are preserved. If they edit the *same* field, last-write-wins applies. For most CRUD apps (task managers, notes, trackers) this is sufficient. For collaborative text editing or complex data structures, you'll want a full CRDT like Automerge or Yjs.",
    },
  ],
};
