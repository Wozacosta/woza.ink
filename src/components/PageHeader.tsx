import type { ReactNode } from "react";

/** Title block shared by the top-level pages */
export function PageHeader({
  title,
  description,
  meta,
  children,
  width = "max-w-3xl",
}: {
  title: ReactNode;
  description?: ReactNode;
  /** Small monospace line under the description (counts, dates) */
  meta?: ReactNode;
  /** Extra content under the header, e.g. filters */
  children?: ReactNode;
  width?: "max-w-3xl" | "max-w-6xl";
}) {
  return (
    <header className={`mx-auto ${width} px-5 pb-8 pt-10 sm:px-8 sm:pb-10 sm:pt-16`}>
      <h1 className="text-4xl font-bold tracking-tight text-fg md:text-5xl">{title}</h1>
      {description && (
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{description}</p>
      )}
      {meta && <p className="mt-3 font-mono text-sm text-subtle">{meta}</p>}
      {children}
    </header>
  );
}
