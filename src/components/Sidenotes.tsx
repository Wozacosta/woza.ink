"use client";

import { useEffect, useState } from "react";
import type { Sidenote } from "@/data/sidenotes/types";

interface HeadingGroup {
  heading: string;
  notes: Sidenote[];
}

function groupByHeading(notes: Sidenote[]): HeadingGroup[] {
  const map = new Map<string, Sidenote[]>();
  for (const note of notes) {
    const group = map.get(note.heading) ?? [];
    group.push(note);
    map.set(note.heading, group);
  }
  return Array.from(map.entries()).map(([heading, notes]) => ({ heading, notes }));
}

const typeLabel: Record<Sidenote["type"], string> = {
  quote: "Quote",
  source: "Source",
  context: "Context",
  counter: "Counter",
  note: "Note",
};

const typeDot: Record<Sidenote["type"], string> = {
  quote: "bg-amber-400",
  source: "bg-blue-400",
  context: "bg-emerald-400",
  counter: "bg-rose-400",
  note: "bg-gray-400",
};

export function Sidenotes({ notes }: { notes: Sidenote[] }) {
  const [activeHeading, setActiveHeading] = useState<string>("");
  const groups = groupByHeading(notes);

  useEffect(() => {
    const headingIds = [...new Set(notes.map((n) => n.heading))];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveHeading(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    );

    headingIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [notes]);

  if (notes.length === 0) return null;

  return (
    <div className="space-y-6">
      {groups.map(({ heading, notes: groupNotes }) => (
        <div
          key={heading}
          className={`transition-opacity duration-300 ${
            activeHeading === heading ? "opacity-100" : "opacity-40"
          }`}
        >
          {groupNotes.map((note, i) => (
            <div
              key={`${heading}-${i}`}
              className="mb-4 text-[12px] leading-relaxed"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className={`w-1.5 h-1.5 rounded-full ${typeDot[note.type]}`} />
                <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  {typeLabel[note.type]}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {note.content}
              </p>
              {note.attribution && (
                <p className="mt-1 text-[11px] text-gray-400 dark:text-gray-500 italic">
                  — {note.attribution}
                </p>
              )}
              {note.url && (
                <a
                  href={note.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-1 text-[10px] font-mono text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 underline decoration-dotted underline-offset-2"
                >
                  source →
                </a>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
