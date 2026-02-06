---
title: "Local-First Web Apps with Dexie and DexieCloud"
date: "2026-02-06"
description: "Your app should work without the internet. Here's how to build local-first web apps using IndexedDB, Dexie.js, and DexieCloud for seamless sync."
tags: ["web", "local-first", "tutorial"]
---

# Local-First Web Apps with Dexie and DexieCloud

Here's a question: what happens to your web app when the internet goes out?

If the answer is "it breaks," you've built a cloud-first app. The server is the source of truth, and without it, your app is a loading spinner.

Local-first flips that model. The device is the source of truth. The app works offline by default. The cloud is just a sync layer — nice to have, not required.

## Why Local-First?

Traditional web apps follow a simple loop: user does something, app sends a request to the server, server responds, UI updates. Every interaction depends on a round-trip to the cloud.

This creates problems:

- **Latency** — Every action waits for a network response. Even on fast connections, that's noticeable
- **Fragility** — Spotty Wi-Fi, airplane mode, tunnel — your app stops working
- **Data ownership** — Your users' data lives on your servers. If you shut down, their data disappears

Local-first fixes all three. Data lives on the user's device. Reads and writes happen against a local database. The UI updates instantly. Sync happens in the background when a connection is available.

The result: apps that feel native, work offline, and give users actual ownership of their data.

## IndexedDB: The Browser's Built-in Database

Every modern browser ships with IndexedDB — a full key-value database that can store structured data, blobs, and files. It's transactional, supports indexes, and can hold hundreds of megabytes.

It's also painful to use directly. The API is callback-based, verbose, and feels like it was designed in 2011 (because it was). Here's what creating a simple store and adding a record looks like with raw IndexedDB:

```javascript
const request = indexedDB.open("MyDatabase", 1);
request.onupgradeneeded = (event) => {
  const db = event.target.result;
  const store = db.createObjectStore("tasks", { keyPath: "id" });
  store.createIndex("status", "status");
};
request.onsuccess = (event) => {
  const db = event.target.result;
  const tx = db.transaction("tasks", "readwrite");
  tx.objectStore("tasks").add({ id: 1, title: "Buy milk", status: "todo" });
};
```

It works, but nobody wants to write apps like this.

## Dexie.js: IndexedDB for Humans

[Dexie.js](https://dexie.org) wraps IndexedDB in a clean, promise-based API. Same storage engine underneath, but the developer experience is completely different:

```javascript
import Dexie from "dexie";

const db = new Dexie("MyDatabase");
db.version(1).stores({
  tasks: "++id, status, date",
});

// Add a task
await db.tasks.add({ title: "Buy milk", status: "todo", date: new Date() });

// Query tasks
const todos = await db.tasks.where("status").equals("todo").toArray();

// Update
await db.tasks.update(1, { status: "done" });

// Delete
await db.tasks.delete(1);
```

That's it. No callbacks, no transaction boilerplate, no `onupgradeneeded`. Dexie handles schema versioning, migrations, and indexing for you. It supports compound indexes, multi-entry indexes, and full CRUD with a fluent query API.

If you've used an ORM before, Dexie feels familiar. Except the database runs in the browser.

## Building a Local-First App

Let's say you're building a task manager. With Dexie, your data layer is trivial:

```javascript
import Dexie from "dexie";

const db = new Dexie("TaskManager");
db.version(1).stores({
  tasks: "++id, status, project, dueDate",
  projects: "++id, name",
});
```

Your UI reads and writes directly to this local database. No API calls, no loading states for basic operations. The data is right there, on the device, available instantly.

This is the core of local-first: **your app's primary data source is the local database, not a remote server.**

But what about sync? What if your user has multiple devices? What if they want to collaborate with others?

## DexieCloud: Sync Without a Backend

This is where [Dexie Cloud](https://dexie.org/cloud) comes in. It's a sync service built specifically for Dexie.js that adds:

- **Two-way sync** — Local changes push to the cloud, remote changes pull down
- **Built-in authentication** — Email OTP, no password management needed
- **Access control** — Share data between users with fine-grained permissions
- **Conflict resolution** — Handles concurrent edits automatically
- **Service Worker sync** — Changes sync even after the app is closed

The setup is minimal. You install the add-on, point it at your DexieCloud URL, and your existing Dexie database gains sync powers:

```javascript
import Dexie from "dexie";
import dexieCloud from "dexie-cloud-addon";

const db = new Dexie("TaskManager", { addons: [dexieCloud] });
db.version(1).stores({
  tasks: "++id, status, project, dueDate",
  projects: "++id, name",
});

db.cloud.configure({
  databaseUrl: "https://your-db-id.dexie.cloud",
  requireAuth: true,
});
```

That's the entire backend. No Express server, no PostgreSQL, no REST endpoints, no WebSocket handlers. Your existing Dexie code keeps working — reads and writes still hit IndexedDB first. DexieCloud handles sync in the background.

Users log in on a new device, and their data appears. They go offline, keep working, come back online — changes sync automatically. On Chromium browsers, edits can even push via Service Worker Background Sync after the app is closed (Firefox and Safari don't support this yet, but changes will sync the next time the app opens).

## The Architecture

Here's what the data flow actually looks like:

```
User Action
    ↓
Local IndexedDB (Dexie.js)  ← instant, always available
    ↓
UI Updates Immediately
    ↓
Background Sync (DexieCloud)
    ↓
Cloud Database
    ↓
Other Devices Pull Changes
```

The key insight: the user never waits for the network. The local database is the source of truth. The cloud is an eventually-consistent replica.

## Trade-offs

Local-first isn't free. Here's what you're signing up for:

- **Storage limits** — IndexedDB storage varies by browser. Chrome allows up to about 60% of remaining disk space per origin, while Safari can evict data after 7 days without user interaction. For most apps this isn't an issue, but it's worth knowing — and worth prompting users to install your app as a PWA, which gets more generous storage treatment
- **Conflict resolution** — When two devices edit the same record offline, something has to give. DexieCloud uses a last-write-wins strategy by default at the property level, which works well for most cases. But you should understand how your app behaves in conflict scenarios and whether you need custom merge logic
- **Initial data size** — If your app has millions of records, syncing everything to the client isn't practical. Local-first works best when each user's dataset is reasonably scoped
- **DexieCloud pricing** — The free tier supports 3 users with 100MB. Production starts at $0.12/user/month. You can also self-host for full control

## When to Go Local-First

Local-first makes the most sense for:

- **Personal tools** — Note apps, task managers, habit trackers, journals
- **Productivity apps** — Where instant response matters
- **Field apps** — Anything used in areas with unreliable connectivity
- **Privacy-sensitive apps** — Where users should own their data

It's less ideal for apps that are inherently collaborative in real-time (like Google Docs), or apps where the server needs to be the authority (like banking).

## Getting Started

1. **Install Dexie:** `npm install dexie`
2. **Define your schema** with `db.version(1).stores({})`
3. **Build your app** reading and writing to the local database
4. **Add sync later** with `npm install dexie-cloud-addon` when you need it

That's the beauty of this approach — you can start fully local and add sync as a layer on top. Adding DexieCloud does require some schema adjustments (like ownership fields for access control), but your core data logic stays the same.

The web platform already gives you a database. Dexie makes it usable. DexieCloud makes it sync. Your users get apps that are fast, offline-capable, and respect their data.

That's what local-first is about.

---

*Want to learn more about open protocols and user-controlled tech? Read about [Matrix](/blog/matrix-protocol), the decentralized messaging protocol, or [RSS](/blog/what-is-rss), the feed format that puts you in charge.*
