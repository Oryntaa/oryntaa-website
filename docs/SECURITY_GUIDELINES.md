# SECURITY_GUIDELINES

Threat model for a marketing site with one form: form abuse/spam, secret leakage, supply-chain risk, header misconfiguration, and PII mishandling. No auth surface exists at v1.

## 1. Security headers (set in `next.config.ts` `headers()`)

| Header | Value |
|---|---|
| Content-Security-Policy | `default-src 'self'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://va.vercel-scripts.com; frame-src https://challenges.cloudflare.com https://cal.com https://*.cal.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self' https://challenges.cloudflare.com https://va.vercel-scripts.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'` — tightened, not loosened, as integrations finalize; any new third-party origin is a PR to this table. |
| Strict-Transport-Security | `max-age=63072000; includeSubDomains; preload` |
| X-Content-Type-Options | `nosniff` |
| Referrer-Policy | `strict-origin-when-cross-origin` |
| Permissions-Policy | `camera=(), microphone=(), geolocation=()` |
| X-Frame-Options | `DENY` (redundant with frame-ancestors; kept for legacy) |

`'unsafe-inline'` for script-src exists only because of Next inline bootstrapping; move to nonces if/when Next's nonce flow is adopted — tracked as a hardening backlog item.

## 2. Form abuse defense (defense in depth, in pipeline order)

1. **Payload caps** — Zod max lengths reject oversized bodies cheaply.
2. **Honeypot** — hidden `company_website` field; any value → silent drop (`{ ok: true }`).
3. **Time-trap** — submissions faster than `FORM_MIN_FILL_MS` (3s) → silent drop.
4. **Turnstile** — server-side `siteverify`; fail-closed with the `CHALLENGE` result so a real user with a blocked challenge gets actionable copy, not silence.
5. **Salted IP hash** stored for forensics; enables future per-IP limiting without ever storing raw IPs.
6. **Escalation seam** — Upstash sliding-window limiter slot documented in API_ARCHITECTURE §6.

## 3. Input & output safety

All external input crosses a Zod boundary before use (form, search params, env, frontmatter). MDX is authored by founders only (repo-committed) — still, no `dangerouslySetInnerHTML` outside vetted MDX rendering; user-submitted lead content is rendered nowhere on the site and is plain-text-escaped in the notification email template. Search params used for presets (`intent`, `type`) validate against literal unions — unknown values fall back to defaults, never echo into markup.

## 4. Secrets & keys

Rules in ENVIRONMENT_VARIABLES §4 apply. Specific hard lines: `SUPABASE_SERVICE_ROLE_KEY` exists only in `lib/supabase/admin.ts` behind `server-only`; CI includes a bundle-grep gate proving no `re_`, `sb_`/service-role, or secret-named strings appear in `.next/static`; the Supabase **anon key is deliberately absent** from the entire project; Vercel deployment protection stays on for previews (no public preview URLs with draft content).

## 5. Supply chain & platform

Exact-pinned framework deps (TECH_STACK §6); weekly batched dependency PRs must pass full CI; `pnpm audit` (or npm equivalent) runs in CI at `high` severity gate. New runtime dependencies require: maintenance check, size check, and a line in TECH_STACK — three questions that kill most impulse installs. GitHub org: 2FA enforced, `main` protected (PR + green CI required), no direct pushes.

## 6. PII & privacy posture

Data collected: lead fields only. No cookies are set by v1 code; analytics are cookieless (ANALYTICS_ARCHITECTURE) — the Cookies legal page says exactly this. Lead data handling per DATABASE_SCHEMA §4 (salted IP hash, 24-month retention, manual deletion honoring). The notification email contains lead PII → founders' inboxes are within Google Workspace with 2FA enforced; no forwarding to personal accounts.

## 7. Incident basics (right-sized for v1)

If a secret leaks: rotate at provider → update Vercel → redeploy → check Supabase logs for misuse → note in `docs/incidents.md`. If spam floods: mark rows, enable the rate-limit seam, tighten Turnstile mode. If defacement/compromise suspected: Vercel instant rollback to last good deployment (DEPLOYMENT_GUIDE §6), then investigate.
