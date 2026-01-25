import Link from "next/link";

export function RssLink() {
  return (
    <Link
      href="/feed.xml"
      className="p-2 text-gray-500 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:focus-visible:ring-gray-500 rounded-md transition-colors"
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
    </Link>
  );
}
