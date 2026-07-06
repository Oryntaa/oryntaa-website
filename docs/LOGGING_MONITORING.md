# LOGGING_MONITORING

Right-sized observability: the static plane needs almost nothing; the lead pipeline must be fully observable because a silent failure there is lost revenue.

## 1. Logger (`lib/logger.ts`)

Thin structured logger over console (Vercel captures stdout as structured logs): levels `debug|info|warn|error`; JSON lines in production, pretty in dev; `logger.child({ action, cid })` binds context; automatic redaction of values whose keys match `/key|secret|salt|token|password/i` and of email addresses in error paths; `console.*` banned elsewhere (CODING_STANDARDS §8). Every server-side log line carries: `cid` (correlation id), `action`, `VERCEL_GIT_COMMIT_SHA` (short), and event name.

## 2. What gets logged (complete v1 inventory)

| Event | Level | Payload |
|---|---|---|
| `lead.created` | info | cid, route, hasCompany, servicesCount (no PII) |
| `lead.spam_dropped` | warn | cid, trap: 'honeypot' \| 'time' |
| `lead.challenge_failed` | warn | cid |
| `lead.email_failed` | error | cid, resend error code — **alert-worthy** |
| `lead.pipeline_failed` | error | cid, stage, wrapped error — **alert-worthy** |
| `og.invalid_params` | warn | received keys |
| `env.invalid` | error (boot/build) | offending keys (names only) |

Client-side: no log shipping at v1; the root error boundary reports through `form_error`/render fallbacks only.

## 3. Error capture

v1 relies on Vercel's function logs + the typed pipeline (every failure path returns through code that logs first). **Sentry is a pre-approved v1.1 addition** — the decision trigger: first time a production issue can't be diagnosed from Vercel logs, or within 30 days of launch, whichever comes first. When added: `@sentry/nextjs`, server + client, PII scrubbing on, sample rate 0.1 for traces, and the CSP in SECURITY_GUIDELINES gains its ingest origin in the same PR.

## 4. Alerting (v1 = simple and reliable)

- **New lead** → the Resend notification email *is* the business alert (to `LEADS_INBOX`, checked daily by rota).
- **Pipeline failure** (`lead.email_failed`, `lead.pipeline_failed`) → Vercel log-based alert (Notifications → log drains/alert rule) to a founders' channel/inbox. If Vercel plan tier lacks log alerts at setup time, fallback: a lightweight external uptime+keyword monitor (see §5) plus a weekly manual log review — noted in the launch checklist which one is active.
- **Deploy failures** → Vercel default notifications on.

## 5. Uptime & external checks

One external uptime monitor (UptimeRobot/BetterStack free tier): `GET /` every 5 min + `GET /contact` (renders form markup) + SSL expiry alert. Alerts to the founders' channel. That's the entire v1 pager — appropriate for a static site where Vercel carries platform SLOs.

## 6. Weekly operational review (10 minutes, rota'd)

Leads in Supabase vs notification emails received (reconcile — any gap is a §2 error hunt) · error-level log lines · Speed Insights vs budgets · uptime report. Findings become issues; the review itself is a checklist in `docs/ops-review.md` after launch.
