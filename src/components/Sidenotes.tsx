"use client";

import { useEffect, useState, useCallback } from "react";
import type { Sidenote } from "@/data/sidenotes/types";

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

const MIN_GAP = 160;

export function Sidenotes({ notes }: { notes: Sidenote[] }) {
  const [positions, setPositions] = useState<(number | null)[]>([]);

  const calculate = useCallback(() => {
    const aside = document.querySelector<HTMLElement>("[data-sidenotes]");
    if (!aside) return;

    const asideTop = aside.getBoundingClientRect().top + window.scrollY;
    const raw: (number | null)[] = [];

    notes.forEach((_, i) => {
      const marker = document.querySelector<HTMLElement>(`[data-sn="${i}"]`);
      if (marker) {
        const markerTop = marker.getBoundingClientRect().top + window.scrollY;
        raw.push(markerTop - asideTop);
      } else {
        raw.push(null);
      }
    });

    // resolve overlaps
    let lastTop = -MIN_GAP;
    for (let i = 0; i < raw.length; i++) {
      if (raw[i] === null) continue;
      if (raw[i]! < lastTop + MIN_GAP) {
        raw[i] = lastTop + MIN_GAP;
      }
      lastTop = raw[i]!;
    }

    setPositions(raw);
  }, [notes]);

  useEffect(() => {
    calculate();
    const timer = setTimeout(calculate, 600);
    window.addEventListener("resize", calculate);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculate);
    };
  }, [calculate]);

  if (notes.length === 0) return null;

  return (
    <>
      {notes.map((note, i) => {
        if (positions[i] == null && positions.length > 0) return null;
        return (
          <div
            key={i}
            className="absolute left-0 right-0"
            style={{ top: positions[i] ?? i * MIN_GAP }}
          >
            <div className="text-[12px] leading-relaxed pb-4">
              <div className="flex items-center gap-1.5 mb-1">
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${typeDot[note.type]}`}
                />
                <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  {typeLabel[note.type]}
                </span>
                <span className="font-mono text-[10px] text-gray-300 dark:text-gray-600">
                  {i + 1}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">{note.content}</p>
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
          </div>
        );
      })}
    </>
  );
}
