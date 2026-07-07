const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;
const STORAGE_KEY = 'oryntaa_utm';

/** Capture UTM params on the first page view into sessionStorage — cookieless attribution
 *  (ANALYTICS_ARCHITECTURE §4). First view wins; later navigations don't overwrite. */
export function captureUtm(): void {
  if (typeof window === 'undefined') return;
  if (window.sessionStorage.getItem(STORAGE_KEY) !== null) return;
  const params = new URLSearchParams(window.location.search);
  const found: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value !== null && value !== '') found[key] = value;
  }
  if (Object.keys(found).length > 0) {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
  }
}

/** The captured UTM params as a query suffix (e.g. "?utm_source=x") to append to the lead's
 *  source_path at submit, or "" if none. */
export function getUtmSuffix(): string {
  if (typeof window === 'undefined') return '';
  const raw = window.sessionStorage.getItem(STORAGE_KEY);
  if (raw === null) return '';
  try {
    const stored = JSON.parse(raw) as Record<string, string>;
    const query = new URLSearchParams(stored).toString();
    return query === '' ? '' : `?${query}`;
  } catch {
    return '';
  }
}
