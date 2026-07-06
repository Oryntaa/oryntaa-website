# API_DOCUMENTATION

Concrete inventory of every dynamic entry point at v1.

## 1. Server Action: `submitLead`

**Location:** `features/contact/actions.ts` · **Runtime:** Node · **Invoked by:** ContactForm via `useActionState`.

**Input (`leadInputSchema`):**

| Field | Type | Rules |
|---|---|---|
| route | enum `project · general · partnership · careers · other` | required |
| fullName | string | 2–120, trimmed |
| email | string | email(), lowercased |
| company | string? | ≤120 |
| country | string? | ≤80 |
| services | enum[] (service slugs + `not-sure`) | required for `project`, ≥1 |
| stage | enum `idea · planning · design-ready · existing · modernization · not-sure`? | project route |
| timeline | enum `asap · 1-3m · 3-6m · 6m+ · flexible`? | project route |
| budget | enum? (`ranges TBD` config list + `undisclosed`) | optional always |
| message | string | 20–5000 |
| consent | literal true | privacy agreement |
| turnstileToken | string | required |
| startedAt | number (ms epoch) | time-trap: `now − startedAt ≥ FORM_MIN_FILL_MS` (3000) |
| company_website | string | **honeypot — must be empty** |
| sourcePath · intent | string? | captured from URL for attribution |

**Output:** `LeadResult` (API_ARCHITECTURE §4). **Side effects on success:** row in `leads`; notification email to `site.leadsInbox` via Resend (react-email template: all fields + Supabase row link + reply-to set to the visitor); `lead.created` log line; failure of email alone → `lead.email_failed` alert log, visitor still sees success.

## 2. Route Handler: `GET /api/og/[...params]`

**Runtime:** Edge · **Purpose:** brand-consistent Open Graph images. **Params (validated allowlist):** `type` ∈ `page · service · project · article` + `title` (≤90 chars, sanitized) + optional `eyebrow`. Renders `ImageResponse` 1200×630: canvas bg, Horizon gradient footer band, mono eyebrow, Sora title, Orbit mark. **Caching:** `public, immutable, max-age=31536000` (content-addressed by params). Unknown params → 400. Fonts loaded once from bundled subsets.

## 3. Generated files (build-time conventions)

- **`sitemap.ts`** — all static routes + service/project/article slugs from the content layer, **filtered by feature gates and publication rules**; `lastModified` from content dates.
- **`robots.ts`** — allow all, `Sitemap:` absolute URL; on preview deployments emits `Disallow: /` (env-detected via `VERCEL_ENV !== 'production'`).
- **`manifest.ts`** — name, short_name Oryntaa, theme `#EA580C`, background `#FAFAF9`, icons from `/public/brand`.

## 4. Third-party surfaces (outbound only)

| Service | Call | Auth | Failure behavior |
|---|---|---|---|
| Cloudflare Turnstile | `POST /siteverify` | `TURNSTILE_SECRET_KEY` | fail closed → `CHALLENGE` result |
| Resend | `emails.send` | `RESEND_API_KEY` | log + alert, don't fail the visitor |
| Supabase | PostgREST insert via admin client | `SUPABASE_SERVICE_ROLE_KEY` | fail → `UNEXPECTED` (lead not lost silently — visitor sees error state and input is preserved) |
| Cal.com | client iframe embed | none | facade shows link fallback to Cal URL |

## 5. Testing hooks

`submitLead` is testable by injecting service/verify dependencies (module-level DI via parameters with defaults). Playwright e2e uses Turnstile's official test sitekeys (always-pass/always-fail) via env in CI; a seeded test submission is part of the launch checklist and is deleted from `leads` afterward.
