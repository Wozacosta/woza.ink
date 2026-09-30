"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { interactiveDiagrams } from "@/data/diagrams";
import type { InteractiveDiagramConfig } from "@/data/diagrams/types";

const STEP_MS = 3200;

/**
 * Progressive enhancement for diagrams rendered from markdown: finds
 * <figure data-diagram> elements that have a config in src/data/diagrams and
 * mounts controls into them. Without JS the static SVG is unchanged.
 */
export function InteractiveDiagrams() {
  const [mounts, setMounts] = useState<
    { figure: HTMLElement; container: HTMLElement; config: InteractiveDiagramConfig }[]
  >([]);

  useEffect(() => {
    const created: typeof mounts = [];
    document.querySelectorAll<HTMLElement>("figure.diagram[data-diagram]").forEach((figure) => {
      const config = interactiveDiagrams[figure.dataset.diagram ?? ""];
      if (!config || figure.dataset.interactive) return;
      const container = document.createElement("div");
      figure.insertBefore(container, figure.querySelector("figcaption"));
      figure.dataset.interactive = "true";
      created.push({ figure, container, config });
    });
    // Portals need the containers created above, which only exist after mount
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounts(created);
    return () => {
      for (const { figure, container } of created) {
        container.remove();
        delete figure.dataset.interactive;
      }
    };
  }, []);

  return (
    <>
      {mounts.map(({ figure, container, config }, i) =>
        createPortal(<Diagram figure={figure} config={config} />, container, String(i)),
      )}
    </>
  );
}

function Diagram({ figure, config }: { figure: HTMLElement; config: InteractiveDiagramConfig }) {
  const [focus, setFocus] = useState<string | null>(null);
  const [step, setStep] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const last = config.steps.length - 1;
  const node = config.nodes.find((n) => n.id === focus);

  const select = useCallback((id: string | null) => {
    setPlaying(false);
    setStep(null);
    setFocus((current) => (current === id ? null : id));
  }, []);

  // Make each box focusable and clickable
  useEffect(() => {
    const svg = figure.querySelector("svg");
    if (!svg) return;
    const boxes = [...svg.querySelectorAll<SVGGElement>("[data-node]")];
    for (const box of boxes) {
      const info = config.nodes.find((n) => n.id === box.dataset.node);
      box.setAttribute("tabindex", "0");
      box.setAttribute("role", "button");
      if (info) box.setAttribute("aria-label", `${info.title}: show details`);
    }
    const onClick = (e: Event) => {
      const box = (e.target as Element).closest<SVGGElement>("[data-node]");
      select(box?.dataset.node ?? null);
    };
    const onKey = (e: KeyboardEvent) => {
      const box = (e.target as Element).closest<SVGGElement>("[data-node]");
      if (box && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        select(box.dataset.node ?? null);
      }
    };
    svg.addEventListener("click", onClick);
    svg.addEventListener("keydown", onKey);
    return () => {
      svg.removeEventListener("click", onClick);
      svg.removeEventListener("keydown", onKey);
      for (const box of boxes) ["tabindex", "role", "aria-label"].forEach((a) => box.removeAttribute(a));
    };
  }, [figure, config, select]);

  // Reflect the current step or selection onto the SVG
  useEffect(() => {
    let nodes: string[] = [];
    let edges: string[] = [];
    if (step !== null) {
      ({ nodes, edges } = config.steps[step]);
    } else if (node) {
      nodes = [node.id, ...node.links];
      edges = node.links.flatMap((l) => [`${node.id}-${l}`, `${l}-${node.id}`]);
    }
    const active = nodes.length > 0;
    figure.toggleAttribute("data-active", active);
    figure.querySelectorAll<SVGElement>("[data-node]").forEach((el) => {
      el.classList.toggle("is-on", nodes.includes(el.dataset.node!));
      el.classList.toggle("is-focus", el.dataset.node === focus);
    });
    figure.querySelectorAll<SVGElement>("[data-edge]").forEach((el) => {
      const on = edges.includes(el.dataset.edge!);
      el.classList.toggle("is-on", on);
      el.classList.toggle("is-flow", on && step !== null && el.tagName === "path");
    });
  }, [figure, config, step, node, focus]);

  // Autoplay the tour; it stops by itself on the last step
  const isPlaying = playing && step !== null && step < last;
  useEffect(() => {
    if (!isPlaying) return;
    const t = setTimeout(() => setStep((s) => (s === null ? s : s + 1)), STEP_MS);
    return () => clearTimeout(t);
  }, [isPlaying, step]);

  const startOrToggle = () => {
    setFocus(null);
    if (step === null || step === last) {
      setStep(0);
      setPlaying(true);
    } else {
      setPlaying(!isPlaying);
    }
  };
  const go = (to: number) => {
    setPlaying(false);
    setFocus(null);
    setStep(Math.max(0, Math.min(last, to)));
  };
  const reset = () => {
    setPlaying(false);
    setStep(null);
    setFocus(null);
  };

  const button =
    "inline-flex h-9 items-center justify-center rounded-full border border-line-strong px-3.5 text-sm font-medium text-fg transition-colors hover:bg-surface disabled:opacity-40 disabled:hover:bg-transparent";
  const playLabel = isPlaying ? "Pause" : step === null ? config.tourLabel : step === last ? "Replay" : "Play";

  return (
    <div className="not-prose mt-5 space-y-3 px-5 sm:px-0">
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={startOrToggle} className={`${button} gap-1.5`} aria-pressed={isPlaying}>
          <span aria-hidden="true">{isPlaying ? "❚❚" : "▶"}</span>
          {playLabel}
        </button>
        {step !== null && (
          <>
            <button type="button" onClick={() => go(step - 1)} disabled={step === 0} className={`${button} w-9 px-0`} aria-label="Previous step">
              ←
            </button>
            <button type="button" onClick={() => go(step + 1)} disabled={step === last} className={`${button} w-9 px-0`} aria-label="Next step">
              →
            </button>
            <span className="font-mono text-xs text-subtle">
              {step + 1} / {last + 1}
            </span>
          </>
        )}
        {(step !== null || focus) && (
          <button type="button" onClick={reset} className="ml-auto text-sm text-subtle underline decoration-dotted underline-offset-4 hover:text-fg">
            Reset
          </button>
        )}
      </div>
      <div aria-live="polite" className="min-h-[5.5rem] rounded-lg border border-line bg-surface px-4 py-3 text-[15px] leading-relaxed text-muted">
        {step !== null ? (
          <p>
            <span className="mr-2 font-mono text-xs text-subtle">Step {step + 1}</span>
            <span className="text-fg">{config.steps[step].text}</span>
          </p>
        ) : node ? (
          <p>
            <span className="font-semibold text-fg">{node.title}.</span> {node.description}
          </p>
        ) : (
          <p>{config.intro}</p>
        )}
      </div>
    </div>
  );
}
