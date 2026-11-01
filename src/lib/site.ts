/** Canonical origin — the apex domain redirects here */
export const SITE_URL = "https://www.woza.ink";
export const SITE_TITLE = "woza.ink";
export const SITE_DESCRIPTION =
  "Samy's corner of the web: small, focused web apps and writing on crypto protocols, AI-assisted coding and developer tools.";

export const AUTHOR = {
  name: "Samy",
  github: "https://github.com/Wozacosta",
};

/** AT-URI of the site.standard.publication record, once it exists */
export const STANDARD_SITE_PUBLICATION: string | null = null;

export const NAV_LINKS = [
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/reading", label: "Reading" },
  { href: "/setup", label: "Setup" },
  { href: "/about", label: "About" },
] as const;
