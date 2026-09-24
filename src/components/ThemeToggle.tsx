"use client";

import { useEffect, useSyncExternalStore } from "react";

const THEME_KEY = "woza-theme";
const THEME_EVENT = "woza-theme-change";
const DARK_QUERY = "(prefers-color-scheme: dark)";

function subscribe(onChange: () => void) {
  const mediaQuery = window.matchMedia(DARK_QUERY);
  mediaQuery.addEventListener("change", onChange);
  window.addEventListener("storage", onChange);
  window.addEventListener(THEME_EVENT, onChange);
  return () => {
    mediaQuery.removeEventListener("change", onChange);
    window.removeEventListener("storage", onChange);
    window.removeEventListener(THEME_EVENT, onChange);
  };
}

// Stored preference wins; otherwise follow the system setting
function getIsDark() {
  const stored = localStorage.getItem(THEME_KEY);
  return stored === "dark" || (!stored && window.matchMedia(DARK_QUERY).matches);
}

// Unknown on the server; render a placeholder until hydrated
function getServerIsDark(): boolean | null {
  return null;
}

export function ThemeToggle() {
  const isDark = useSyncExternalStore<boolean | null>(
    subscribe,
    getIsDark,
    getServerIsDark,
  );

  // Keep the <html> class in sync, e.g. when the system theme changes
  useEffect(() => {
    if (isDark !== null) {
      document.documentElement.classList.toggle("dark", isDark);
    }
  }, [isDark]);

  const toggle = () => {
    const newDark = !isDark;
    document.documentElement.classList.toggle("dark", newDark);
    localStorage.setItem(THEME_KEY, newDark ? "dark" : "light");
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  if (isDark === null) {
    return <div className="w-9 h-9" aria-hidden="true" />;
  }

  return (
    <button
      onClick={toggle}
      className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:focus-visible:ring-gray-500 rounded-md transition-colors"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
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
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
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
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
