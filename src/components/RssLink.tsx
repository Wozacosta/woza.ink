export function RssLink() {
  return (
    <a
      href="/feed.xml"
      className="flex h-10 w-10 items-center justify-center rounded-md text-muted transition-colors hover:text-orange-500 dark:hover:text-orange-400"
      aria-label="RSS Feed"
      title="RSS Feed"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 11a9 9 0 0 1 9 9" />
        <path d="M4 4a16 16 0 0 1 16 16" />
        <circle cx="5" cy="19" r="1" />
      </svg>
    </a>
  );
}
