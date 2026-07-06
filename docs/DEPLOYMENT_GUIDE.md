# DEPLOYMENT_GUIDE

## 1. Vercel project setup

Import the GitHub repo into the Oryntaa Vercel team (created under the Google Workspace identity; all four founders members). Framework preset: Next.js — no build overrides (learned the hard way on past projects: platform command overrides that bypass the framework are how deployments silently break). Node version pinned via `package.json engines`. Enable: Web Analytics, Speed Insights, Deployment Protection (previews require Vercel auth).

## 2. Environments

| Vercel env | Branch | Purpose | Key env differences |
|---|---|---|---|
| Production | `main` | oryntaa.com | prod Supabase, real keys, drafts off |
| Preview | every PR branch | review + e2e target | dev Supabase, drafts on, noindex |
| Development | local | day-to-day | `.env.local`, Turnstile test keys |

Full variable matrix in ENVIRONMENT_VARIABLES §3. Set production values before the first domain attach so no deploy ever runs half-configured.

## 3. Domains & DNS

`oryntaa.com` = primary; `www.oryntaa.com` added and set to **redirect (308) to apex**. DNS at the registrar: A/ALIAS + CNAME per Vercel's instructions; TTL dropped to 300 pre-cutover. Google Workspace MX records untouched — verify email flow after any DNS edit. SSL: Vercel-managed (auto-renew); HSTS preload submission only after two stable weeks (it's hard to undo).

## 4. Release flow

PR → CI green → preview reviewed (design/content on real URL) → squash-merge to `main` → production deploy → **post-deploy smoke** (2 min): home renders, one service page, `/contact` form loads Turnstile, no console errors, `robots.txt` correct. Content changes follow the identical path — a merge is a publish (CONTENT_ARCHITECTURE §7). No deploys after 18:00 PKT Fridays unless it's a fix.

## 5. Launch checklist (one-time)

- [ ] All ROADMAP phases 0–15 closed; Phase 16 items green.
- [ ] Production env vars complete; test lead submitted on production → row in prod Supabase + notification received → row deleted.
- [ ] Domains attached; www→apex verified; SSL valid; MX/email verified.
- [ ] `robots.txt` allows; sitemap live and submitted (Search Console + Bing); Rich Results validation passes (SEO_ARCHITECTURE §5).
- [ ] Lighthouse ≥95 on the four key routes **on production**; Speed Insights receiving data.
- [ ] Manual a11y pass on production (ACCESSIBILITY_GUIDELINES §7).
- [ ] Uptime monitor live; log alerts configured or fallback noted (LOGGING_MONITORING §4).
- [ ] Legal pages reviewed text in place; content clearance checklist (work map §4) resolved for every published project.
- [ ] 404 verified; social OG cards previewed (LinkedIn/X debuggers).
- [ ] Backups confirmed (SUPABASE_SETUP §5); rollback rehearsed once (§6).

## 6. Rollback & incident basics

Vercel → Deployments → previous good → **Promote to Production** (instant, no rebuild). DB is append-only at v1, so rollbacks are always safe. If a bad content merge ships: fix-forward via revert PR (still a normal deploy). Post-incident: one-paragraph note in `docs/incidents.md` — what, impact, fix, prevention.

## 7. Post-launch cadence

Week 1: daily smoke + Speed Insights glance. Steady state: the weekly ops review (LOGGING_MONITORING §6) + dependency PR batch. Any infra change (new third-party, new env var, new header) lands with its doc updated in the same PR — the suite stays true or it stops being trusted.
