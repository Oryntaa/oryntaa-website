import { track as vercelTrack } from '@vercel/analytics';

import type { ContactIntent } from '@/config/routes';

/** The only tracking entry point (ANALYTICS_ARCHITECTURE §2). Events are typed — an unknown name or
 *  the wrong payload shape fails typecheck — and payloads carry ZERO PII (never field values, never
 *  email). Vercel Web Analytics no-ops in development and off Vercel, so callers fire unconditionally. */
interface EventMap {
  cta_click: { cta: 'start-project' | 'book-call' | 'ghost'; location: string };
  form_step: { step: 1 | 2; route: ContactIntent | 'other' };
  form_submit: { route: ContactIntent | 'other'; services: string[] };
  form_error: { code: 'VALIDATION' | 'CHALLENGE' | 'UNEXPECTED' };
  booking_open: { location: 'contact' | 'cta' };
  project_view: { slug: string };
  filter_use: { type: string };
}

type Primitive = string | number | boolean | null;

/** Vercel's track accepts only flat primitive props — flatten arrays to comma-joined strings. */
function flatten(props: Record<string, unknown>): Record<string, Primitive> {
  const result: Record<string, Primitive> = {};
  for (const [key, value] of Object.entries(props)) {
    result[key] = Array.isArray(value) ? value.join(',') : (value as Primitive);
  }
  return result;
}

export function track<K extends keyof EventMap>(name: K, props: EventMap[K]): void {
  vercelTrack(name, flatten(props));
}
