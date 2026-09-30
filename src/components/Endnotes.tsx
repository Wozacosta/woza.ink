import type { RenderedSidenote } from "@/data/sidenotes/types";
import { typeLabel, typeDot } from "./sidenoteStyles";

/** Sidenotes as a numbered list under the article, for screens without the margin column */
export function Endnotes({ notes }: { notes: RenderedSidenote[] }) {
  if (notes.length === 0) return null;

  return (
    <section
      aria-label="Notes"
      className="mt-12 border-t border-line pb-12 pt-8 xl:hidden"
    >
      <h2 className="font-mono text-xs uppercase tracking-widest text-subtle mb-6">
        Notes
      </h2>
      <ol className="space-y-5">
        {notes.map((note, i) => (
          <li key={i} id={`sn-${i + 1}`} className="scroll-mt-8 text-sm leading-relaxed">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="font-mono text-[11px] text-subtle">
                {i + 1}
              </span>
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${typeDot[note.type]}`} />
              <span className="font-mono text-[10px] uppercase tracking-wider text-subtle">
                {typeLabel[note.type]}
              </span>
            </div>
            <p
              className="sn-body text-muted"
              dangerouslySetInnerHTML={{ __html: note.html }}
            />
            {note.attribution && (
              <p className="mt-1 text-xs text-subtle italic">
                — {note.attribution}
              </p>
            )}
            {note.url && (
              <a
                href={note.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-1 text-[11px] font-mono text-subtle hover:text-fg underline decoration-dotted underline-offset-2"
              >
                source →
              </a>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
