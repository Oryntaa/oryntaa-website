# ANALYTICS_ARCHITECTURE

## 1. Posture

**Cookieless by design.** Vercel Web Analytics (traffic + custom events) and Speed Insights (field CWV) — both cookie-free and anonymized. Consequences we're buying deliberately: no consent banner (a UX and conversion win aligned with the anti-pattern list), no GA4 (weight + consent burden), and slightly coarser data (no cross-session user journeys) — acceptable because the questions we need answered are page- and event-level. Adding any cookie-based tool later means adding a consent layer first; that trade is documented here so it's made consciously.

## 2. Event taxonomy (`lib/analytics.ts` — the only tracking entry point)

```ts
track('cta_click',    { cta: 'start-project' | 'book-call' | 'ghost', location: SectionId });
track('form_step',    { step: 1 | 2, route: LeadRoute });
track('form_submit',  { route: LeadRoute, services: string[] });   // fired on success state
track('form_error',   { code: 'VALIDATION' | 'CHALLENGE' | 'UNEXPECTED' });
track('booking_open', { location: 'contact' | 'cta' });
track('project_view', { slug: string });                            // work detail mount
track('filter_use',   { type: WorkFilter });
```

Rules: events are typed (union of names + payload shapes — unknown events fail typecheck); payloads contain **zero PII** (never field values, never email); `location` uses stable section ids so copy changes don't break funnels; `sourcePath`/`intent` attribution rides the lead record (DATABASE_SCHEMA), not analytics.

## 3. The funnel this exists to answer

land → scroll into Selected Work (`project_view` proxy via detail visits) → `cta_click` → `form_step 1` → `form_step 2` → `form_submit` / `booking_open`. Weekly review reads: submissions + bookings (the number that matters), step-1→2 drop-off, CTA CTR by location (tells us which sections earn their place), and top content by visits (feeds Insights topics).

## 4. Implementation notes

`<Analytics/>` + `<SpeedInsights/>` mount in the root layout (production only via env check). `track` no-ops in development with a console.debug through the logger, so components call it unconditionally. UTM params: captured on first page view into `sessionStorage` by a tiny util and written into the lead's `source_path` at submit — attribution without cookies. Do not add tracking to legal pages' scroll or any granular behavioral capture; measurement stays proportional to the questions in §3.

## 5. Review cadence & ownership

The Vercel dashboard is checked weekly post-launch (owner: Awais initially); findings that demand action become issues, not memory. Quarterly: prune events nobody has read — an unread event is code debt.
