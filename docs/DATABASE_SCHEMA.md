# DATABASE_SCHEMA

## 1. The decision, restated

Does a company website need a database? For content: **no** — content is code (CONTENT_ARCHITECTURE). For leads: **yes** — a submitted lead is the site's entire business output and must not depend solely on email deliverability. Scope is therefore exactly one table at v1. Anything beyond this table requires a schema PR updating this document.

## 2. Schema (migration `0001_leads.sql`)

```sql
create extension if not exists pgcrypto;

create table public.leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  route         text not null check (route in
                  ('project','general','partnership','careers','other')),
  full_name     text not null check (char_length(full_name) between 2 and 120),
  email         text not null check (position('@' in email) > 1),
  company       text,
  country       text,
  services      text[] not null default '{}',
  stage         text,
  timeline      text,
  budget        text,
  message       text not null check (char_length(message) <= 5000),
  intent        text,
  source_path   text,
  user_agent    text,
  ip_hash       text,          -- sha256(ip + LEAD_IP_SALT); raw IP never stored
  status        text not null default 'new'
                  check (status in ('new','contacted','qualified','closed','spam')),
  notified_at   timestamptz    -- set when Resend send succeeds
);

create index leads_created_at_idx on public.leads (created_at desc);
create index leads_status_idx     on public.leads (status);
```

## 3. Row Level Security — deny by default

```sql
alter table public.leads enable row level security;
-- No policies are created. anon and authenticated therefore have zero access.
revoke all on public.leads from anon, authenticated;
```

The only writer/reader is the server-side service-role client (which bypasses RLS by design and never leaves the server — SECURITY_GUIDELINES §4). This is intentional and must be re-verified in SUPABASE_SETUP §4: an anon-key select/insert against `leads` must fail.

## 4. Data handling & retention (PII)

`leads` contains personal data (name, email, message). Rules: raw IPs are never stored (salted hash only, for spam forensics); the Privacy page discloses collection, purpose, and retention; retention = 24 months, enforced by a scheduled Supabase job (`pg_cron`, monthly `delete from leads where created_at < now() - interval '24 months' and status = 'closed'`) — created in SUPABASE_SETUP §5; deletion requests are honored manually via the dashboard at v1 volume. Supabase daily backups cover restore needs.

## 5. Reading leads at v1

Founders read leads through the Supabase dashboard (table editor, `status` used as a mini-pipeline) plus the email notification per lead. A `/leads` internal UI is explicitly v2 — building auth for four users at launch is scope creep; the seam exists (SYSTEM_ARCHITECTURE §9).

## 6. Future tables (documented triggers, not built)

`newsletter_subscribers` — when the newsletter flag turns on (double-opt-in fields, unsubscribe token). `case_study_inquiries` split from leads — only if routing volume demands it. Any auth-era tables follow the standard: RLS-first policies written before the table is used, repository per table, schema PR updates this file.
