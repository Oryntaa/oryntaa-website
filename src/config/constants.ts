/** Misc config values — no magic numbers in logic (CODING_STANDARDS §4/§7). */

/** Pixels scrolled before the navbar switches to its compact (surface + border) state. */
export const NAV_SCROLL_THRESHOLD = 8;

/** A collection's gate lights up once this many items are published (CONTENT_ARCHITECTURE §6). */
export const WORK_GATE_THRESHOLD = 3;
export const INSIGHTS_GATE_THRESHOLD = 3;

/** Contact form — the literal unions the lead schema validates against (API_ARCHITECTURE §3). */
export const CONTACT_ROUTES = ['project', 'general', 'partnership', 'careers', 'other'] as const;
export const CONTACT_SERVICE_OPTIONS = [
  'AI Solutions & Automation',
  'Web Development',
  'Mobile App Development',
  'SaaS & MVP Development',
  'UI/UX Design',
  'Cloud & DevOps',
] as const;
export const PROJECT_STAGE_OPTIONS = [
  'I have an idea',
  'I need the first version',
  'It works, now it needs to scale',
  'We are carrying a legacy system',
] as const;
export const PROJECT_TIMELINE_OPTIONS = [
  'As soon as possible',
  '1–3 months',
  '3–6 months',
  'Just exploring',
] as const;
export const PROJECT_BUDGET_OPTIONS = [
  'Under $10k',
  '$10k–$25k',
  '$25k–$50k',
  '$50k+',
  'Not sure yet',
] as const;

/** Time-trap: a submission faster than this (ms from form mount) is treated as a bot. */
export const FORM_MIN_FILL_MS = 3000;
