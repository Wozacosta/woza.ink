"use client";

import { useEffect, useState, useRef, useCallback } from "react";
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

const MIN_GAP = 140; // minimum px between sidenotes to avoid overlap

export function Sidenotes({ notes }: { notes: Sidenote[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<number[]>([]);

  const calculate = useCallback(() => {
    if (!containerRef.current) return;

    const containerTop =
      containerRef.current.getBoundingClientRect().top + window.scrollY;

    const raw: number[] = [];
    notes.forEach((_, i) => {
      const marker = document.querySelector<HTMLElement>(`[data-sn="${i}"]`);
      if (marker) {
        const markerTop = marker.getBoundingClientRect().top + window.scrollY;
        raw.push(markerTop - containerTop);
      } else {
        raw.push(raw.length > 0 ? raw[raw.length - 1] + MIN_GAP : 0);
      }
    });

    // resolve overlaps: push down any note that's too close to the previous
    for (let i = 1; i < raw.length; i++) {
      if (raw[i] < raw[i - 1] + MIN_GAP) {
        raw[i] = raw[i - 1] + MIN_GAP;
      }
    }

    setPositions(raw);
  }, [notes]);

  useEffect(() => {
    // calculate after fonts/images settle
    calculate();
    const timer = setTimeout(calculate, 500);
    window.addEventListener("resize", calculate);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculate);
    };
  }, [calculate]);

  if (notes.length === 0 || positions.length === 0) return null;

  return (
    <div ref={containerRef} className="relative">
      {notes.map((note, i) => (
        <div
          key={i}
          className="absolute w-full transition-opacity duration-300"
          style={{ top: positions[i] ?? 0 }}
        >
          <div className="sn-note text-[12px] leading-relaxed pb-4">
            <div className="flex items-center gap-1.5 mb-1">
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${typeDot[note.type]}`} />
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
      ))}
    </div>
  );
}
