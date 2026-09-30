/** "Mar 14, 2026" — dates are YYYY-MM-DD strings, formatted in UTC so the day never shifts */
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
