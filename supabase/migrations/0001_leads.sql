-- 0001_leads.sql — the single v1 table (DATABASE_SCHEMA §2–3).
-- Apply to dev + prod. After applying, run the RLS verification (SUPABASE_SETUP §4):
-- an anon-key select/insert against public.leads MUST fail.

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

-- Row Level Security — deny by default. No policies → anon/authenticated have zero access.
alter table public.leads enable row level security;
revoke all on public.leads from anon, authenticated;
