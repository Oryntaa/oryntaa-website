const DATE_SHORT = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});
const DATE_LONG = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

/** "Jun 24, 2026" — article/card dates. */
export function formatDate(date: Date): string {
  return DATE_SHORT.format(date);
}

/** "June 24, 2026" — legal "last updated" lines. */
export function formatDateLong(date: Date): string {
  return DATE_LONG.format(date);
}

/** First + second initial for monogram avatars, e.g. "Muhammad Awais" → "MA". */
export function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase();
}
