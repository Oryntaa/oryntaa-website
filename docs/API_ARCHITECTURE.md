# API_ARCHITECTURE

The dynamic surface is deliberately tiny: one mutation (lead submission) plus generated assets (OG images, sitemap, robots). This document defines the patterns; API_DOCUMENTATION defines the concrete instances.

## 1. Server Actions vs Route Handlers

- **Mutations from our own UI → Server Actions.** Progressive enhancement, typed end to end, no client fetch code, no CORS surface. `submitLead` is the only v1 action.
- **Resources addressed by URL → Route Handlers.** `/api/og/*` (edge), `sitemap.ts`, `robots.ts`, `manifest.ts` (build-time file conventions).
- REST/JSON endpoints for third parties: none at v1. If one ever exists, it gets a versioned path (`/api/v1/*`), Zod-validated body, and the standard response envelope below.

## 2. The mutation pipeline (mandatory shape for every action, now and future)

```
input → parse (Zod) → abuse checks → verify (Turnstile) → service → repository → notify → typed result
```

```ts
// features/contact/actions.ts
'use server';
export async function submitLead(prev: LeadResult | null, formData: FormData): Promise<LeadResult> {
  const log = logger.child({ action: 'submitLead', cid: crypto.randomUUID() });
  // 1. Parse & validate — same schema the client used
  const parsed = leadInputSchema.safeParse(decode(formData));
  if (!parsed.success) return fail('VALIDATION', zodFieldErrors(parsed.error));
  // 2. Abuse checks — honeypot filled, or submitted faster than FORM_MIN_FILL_MS
  if (isSpam(parsed.data)) { log.warn('spam_dropped'); return ok(); } // silent success
  // 3. Turnstile server verification
  if (!(await verifyTurnstile(parsed.data.turnstileToken))) return fail('CHALLENGE');
  // 4. Orchestrate
  try {
    await contactService.handleNewLead(parsed.data, requestContext());
    return ok();
  } catch (e) {
    log.error('lead_pipeline_failed', e);
    return fail('UNEXPECTED');
  }
}
```

Rules: actions never touch the database or Resend directly; `service.ts` orchestrates (persist first — the lead must survive even if email fails; email failure is logged + alerted, not surfaced to the visitor); `repository.ts` is the only module importing the Supabase admin client.

## 3. Validation strategy

One Zod schema per input (`features/contact/schema.ts`), imported by both the client resolver and the action — a field cannot drift between the two. Server re-validation is non-negotiable (the client is advisory). Normalization inside the schema: trim strings, lowercase email, cap lengths (message ≤ 5000), strip control characters. `intent` and enum fields validated against literal unions from `config/constants.ts`.

## 4. Response envelope

```ts
type LeadResult =
  | { ok: true }
  | { ok: false; code: 'VALIDATION' | 'CHALLENGE' | 'UNEXPECTED';
      fieldErrors?: Record<string, string>; };
```

The client maps `code` to PAGE_SPECIFICATIONS copy; raw internal messages never cross the boundary. Spam receives `{ ok: true }` by design — no oracle for bots.

## 5. Reusable database access layer

`lib/supabase/admin.ts` exports a memoized service-role client (`import 'server-only'`). Repositories wrap it per table:

```ts
// features/contact/repository.ts
import 'server-only';
export const leadRepository = {
  async insert(lead: LeadRecord): Promise<{ id: string }> {
    const { data, error } = await supabaseAdmin.from('leads')
      .insert(lead).select('id').single();
    if (error) throw new RepositoryError('leads.insert', error);
    return data;
  },
};
```

Conventions every future repository follows: typed inputs/outputs (schema-derived), errors wrapped in `RepositoryError` with table+op context, no query building in services or actions, no client-side Supabase usage anywhere at v1.

## 6. Abuse & rate limiting posture

v1: honeypot + time-trap + Turnstile + payload caps + Vercel platform mitigation — sufficient for a marketing site's single form. The seam for real rate limiting (per-IP sliding window via Upstash) is step 2 of the pipeline; adding it later touches one function. Escalation trigger: >5 spam rows/day reaching the table, or any abuse of `/api/og` (then: param allowlist already constrains it; add cache-key normalization).

## 7. External calls

Turnstile verify and Resend send both get: 5s timeout, one retry with jitter for 5xx (Resend only), and structured log entries with the correlation id. No external call ever blocks static rendering.
