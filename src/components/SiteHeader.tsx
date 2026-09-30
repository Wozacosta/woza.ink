import Link from "next/link";
import { NavLinks } from "@/components/NavLinks";
import { RssLink } from "@/components/RssLink";
import { ThemeToggle } from "@/components/ThemeToggle";

/**
 * Phones: logo + icons on the first row, nav on a second, swipeable row.
 * sm and up: everything on one row.
 */
export function SiteHeader() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 px-5 pt-3 sm:h-16 sm:flex-nowrap sm:px-8 sm:pt-0">
        <Link
          href="/"
          className="py-2 text-lg font-bold tracking-tight text-fg"
          aria-label="woza.ink home"
        >
          woza.ink
        </Link>
        <div className="flex items-center gap-1 sm:order-last">
          <RssLink />
          <ThemeToggle />
        </div>
        <nav aria-label="Main" className="order-last -mx-5 w-[calc(100%+2.5rem)] px-5 sm:order-none sm:mx-0 sm:ml-auto sm:w-auto sm:px-0">
          <NavLinks />
        </nav>
      </div>
    </header>
  );
}
