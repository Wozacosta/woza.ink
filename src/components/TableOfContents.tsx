"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      // Build a map of which headings are visible
      const visibleIds: string[] = [];

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleIds.push(entry.target.id);
        }
      });

      if (visibleIds.length > 0) {
        // Pick the one closest to the top of the viewport
        const topmost = visibleIds.reduce((best, id) => {
          const el = document.getElementById(id);
          const bestEl = document.getElementById(best);
          if (!el || !bestEl) return best;
          return el.getBoundingClientRect().top < bestEl.getBoundingClientRect().top
            ? id
            : best;
        });
        setActiveId(topmost);
      }
    },
    [],
  );

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: "-80px 0px -70% 0px",
      threshold: 0,
    });

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current!.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [headings, handleIntersect]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents">
      <ul className="space-y-1 text-[13px] leading-snug">
        {headings.map(({ id, text, level }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`block py-1 border-l-2 transition-colors duration-150 ${
                level === 3 ? "pl-5" : "pl-3"
              } ${
                activeId === id
                  ? "border-ink dark:border-cream text-ink dark:text-cream font-medium"
                  : "border-transparent text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
