"use client";

import { useEffect, useRef } from "react";

/**
 * Thin bar at the top of the viewport showing how far through the page you are.
 * Updates the DOM directly once per frame (no React re-render per scroll event)
 * and animates `transform`, which doesn't trigger layout.
 */
export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      const progress = total > 0 ? el.scrollTop / total : 0;
      barRef.current?.style.setProperty("transform", `scaleX(${progress})`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px]"
    >
      <div ref={barRef} className="h-full origin-left scale-x-0 bg-fg" />
    </div>
  );
}
