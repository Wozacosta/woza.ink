export function WipBadge() {
  return (
    <span className="rounded-full border border-line-strong px-2 py-0.5 text-[11px] uppercase leading-none tracking-wide text-muted">
      <span className="sr-only">Work in progress</span>
      <span aria-hidden="true">WIP</span>
    </span>
  );
}
