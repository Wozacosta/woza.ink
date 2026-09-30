import { AUTHOR } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} woza.ink</p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          <li>
            <a href={AUTHOR.github} className="hover:text-fg" rel="me noopener noreferrer" target="_blank">
              GitHub
            </a>
          </li>
          <li>
            <a href="/feed.xml" className="hover:text-fg">
              RSS
            </a>
          </li>
          <li>
            <a href="/llms.txt" className="hover:text-fg">
              llms.txt
            </a>
          </li>
          <li>
            <a href="/sitemap.xml" className="hover:text-fg">
              Sitemap
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
