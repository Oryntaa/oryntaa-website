# SUPABASE_SETUP

Minimal by design: one project, one table, server-only access. Time to complete: ~20 minutes.

## 1. Project provisioning

1. Create org **Oryntaa** in the Supabase dashboard (owner: the Google Workspace admin account; invite all four founders as members).
2. Create project `oryntaa-website-prod` — region **eu-central-1 (Frankfurt)** (closest strong region to the primary EU/UK client audience; the site itself is CDN-global so this only affects form writes). Strong DB password → straight into the team password manager, never into the repo.
3. Optional but recommended: a second project `oryntaa-website-dev` for local/preview form testing, so test leads never pollute production.

## 2. Apply the schema

Run `docs`-versioned migrations in order via the SQL editor (or `supabase db push` if the CLI is adopted): `0001_leads.sql` (DATABASE_SCHEMA §2–3). Migrations live in `/supabase/migrations` in the repo; the dashboard is never the source of truth — every schema change is a file in a PR.

## 3. Keys → environments

From Project Settings → API: **Project URL** → `SUPABASE_URL` · **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (server-only, never `NEXT_PUBLIC_`). The **anon key is not used anywhere at v1** — do not add it to env; its absence is a guardrail. Set both vars in Vercel (Production = prod project; Preview + Development = dev project) per ENVIRONMENT_VARIABLES.

## 4. Verification checklist (must pass before Phase 10 closes)

- [ ] `select` on `leads` with the anon key via REST returns a permission error.
- [ ] `insert` on `leads` with the anon key fails.
- [ ] `submitLead` end-to-end from a preview deploy writes a row (dev project) and the notification email arrives.
- [ ] RLS shows **enabled, 0 policies** on `leads` in the dashboard.
- [ ] Service-role key confirmed absent from any client bundle (`grep` the `.next` static output in CI — task in TESTING_STRATEGY §5).

## 5. Operational settings

- **Backups:** confirm daily automated backups active (default on paid tier; if on free tier at launch, export a weekly manual backup until upgraded — put a calendar reminder on it).
- **Retention job:** enable `pg_cron`; create the monthly retention job from DATABASE_SCHEMA §4.
- **Access logging:** leave Postgres logs default; the dashboard audit trail covers four-founder access at this scale.
- **Spam triage:** founders mark junk rows `status = 'spam'`; if >5/day, trigger API_ARCHITECTURE §6 escalation.

## 6. What deliberately does not exist

No Supabase Auth config, no Storage buckets, no Edge Functions, no Realtime — each would be unused surface area. Turning any of them on starts with a doc PR (SYSTEM_ARCHITECTURE §9–10, STORAGE_ARCHITECTURE §4).
