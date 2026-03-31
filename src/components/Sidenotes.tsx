"use client";

import { useEffect, useState, useCallback, useRef } from "react";
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

const GAP = 12; // px between sidenotes

export function Sidenotes({ notes }: { notes: Sidenote[] }) {
  const [positions, setPositions] = useState<(number | null)[]>([]);
  const noteRefs = useRef<(HTMLDivElement | null)[]>([]);

  const calculate = useCallback(() => {
    const aside = document.querySelector<HTMLElement>("[data-sidenotes]");
    if (!aside) return;

    const asideTop = aside.getBoundingClientRect().top + window.scrollY;

    // Get ideal positions from markers
    const ideal: (number | null)[] = [];
    notes.forEach((_, i) => {
      const marker = document.querySelector<HTMLElement>(`[data-sn="${i}"]`);
      if (marker) {
        const markerTop = marker.getBoundingClientRect().top + window.scrollY;
        ideal.push(markerTop - asideTop);
      } else {
        ideal.push(null);
      }
    });

    // Resolve overlaps using actual rendered heights
    const resolved = [...ideal];
    let lastBottom = -GAP;

    for (let i = 0; i < resolved.length; i++) {
      if (resolved[i] === null) continue;

      // Don't push above ideal position, only down
      const minTop = lastBottom + GAP;
      if (resolved[i]! < minTop) {
        resolved[i] = minTop;
      }

      // Measure actual height of this note
      const el = noteRefs.current[i];
      const height = el?.offsetHeight ?? 140;
      lastBottom = resolved[i]! + height;
    }

    setPositions(resolved);
  }, [notes]);

  useEffect(() => {
    // Initial + delayed recalc (after fonts/images)
    calculate();
    const t1 = setTimeout(calculate, 300);
    const t2 = setTimeout(calculate, 1000);
    window.addEventListener("resize", calculate);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
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
            ref={(el) => { noteRefs.current[i] = el; }}
            className="absolute left-0 right-0"
            style={{ top: positions[i] ?? i * 160 }}
          >
            <div className="text-[12px] leading-relaxed pb-3">
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
