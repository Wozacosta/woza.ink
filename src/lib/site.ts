/** Canonical origin — the apex domain redirects here */
export const SITE_URL = "https://www.woza.ink";
export const SITE_TITLE = "woza.ink";
export const SITE_DESCRIPTION =
  "Samy's corner of the web: small, focused web apps and writing on crypto protocols, AI-assisted coding and developer tools.";

export const AUTHOR = {
  name: "Samy",
  github: "https://github.com/Wozacosta",
  bluesky: "https://bsky.app/profile/woza.ink",
};

/** AT-URI of the site.standard.publication record. Also in sequoia.json and public/.well-known */
export const STANDARD_SITE_PUBLICATION =
  "at://did:plc:l72dcexjk4ytyh4nhy5vtix4/site.standard.publication/3mzbwjfrek62i";

export const NAV_LINKS = [
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/reading", label: "Reading" },
  { href: "/setup", label: "Setup" },
  { href: "/about", label: "About" },
] as const;
