"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/site";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="scroll-row flex items-center gap-5 overflow-x-auto sm:gap-6">
      {NAV_LINKS.map(({ href, label }) => {
        const active = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <li key={href} className="shrink-0">
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className={`relative block py-2 text-[15px] transition-colors ${
                active ? "text-fg" : "text-muted hover:text-fg"
              } after:absolute after:inset-x-0 after:bottom-0.5 after:h-px after:bg-fg after:transition-transform after:duration-200 ${
                active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
              }`}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
