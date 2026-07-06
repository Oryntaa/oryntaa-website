# ENVIRONMENT_VARIABLES

## 1. Principles

Every variable is declared in `src/lib/env.ts`, Zod-validated, and split into server/client objects. The app cannot boot (dev) or build (CI) with a missing/invalid variable — failures are loud and immediate, never runtime surprises. `NEXT_PUBLIC_` prefix is reserved for values that are genuinely safe in a public bundle; adding one is a review point.

```ts
// src/lib/env.ts (shape)
const server = z.object({
  SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  RESEND_API_KEY: z.string().startsWith('re_'),
  LEADS_INBOX: z.string().email(),
  TURNSTILE_SECRET_KEY: z.string().min(1),
  LEAD_IP_SALT: z.string().min(16),
});
const client = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().min(1),
  NEXT_PUBLIC_BOOKING_URL: z.string().url().optional(),
  NEXT_PUBLIC_SHOW_DRAFTS: z.enum(['0','1']).default('0'),
  NEXT_PUBLIC_FLAG_WORK: z.enum(['0','1']).optional(),      // gate override only
  NEXT_PUBLIC_FLAG_INSIGHTS: z.enum(['0','1']).optional(),
});
```

`import 'server-only'` guards the server object; importing it from a client component fails the build.

## 2. Variable registry

| Variable | Scope | Used by | Notes |
|---|---|---|---|
| SUPABASE_URL | server | supabase admin client | prod vs dev project per env |
| SUPABASE_SERVICE_ROLE_KEY | server | supabase admin client | **highest-sensitivity secret** |
| RESEND_API_KEY | server | contact service | |
| LEADS_INBOX | server | notification recipient | e.g. hello@oryntaa.com |
| TURNSTILE_SECRET_KEY | server | verify call | CI uses Cloudflare test secret |
| LEAD_IP_SALT | server | ip hashing | random ≥16 chars, rotate = old hashes unmatchable (acceptable) |
| NEXT_PUBLIC_SITE_URL | client | metadata base, sitemap, OG | `https://oryntaa.com` in prod; Vercel preview URL otherwise |
| NEXT_PUBLIC_TURNSTILE_SITE_KEY | client | widget | test sitekey in CI |
| NEXT_PUBLIC_BOOKING_URL | client | BookingEmbed + booking flag | absence disables booking cleanly |
| NEXT_PUBLIC_SHOW_DRAFTS | client | content publication rules | `1` on Preview only |
| NEXT_PUBLIC_FLAG_WORK / _INSIGHTS | client | manual gate override | emergency lever; normally unset |

Vercel system vars used read-only: `VERCEL_ENV` (robots noindex on non-production), `VERCEL_GIT_COMMIT_SHA` (logged for correlation).

## 3. Per-environment values

| | Development (local) | Preview (Vercel) | Production |
|---|---|---|---|
| Supabase | dev project | dev project | prod project |
| Turnstile | test keys (always-pass) | real keys | real keys |
| LEADS_INBOX | founder's personal | shared test inbox | hello@oryntaa.com |
| SHOW_DRAFTS | 1 | 1 | 0 |
| SITE_URL | http://localhost:3000 | auto preview URL | https://oryntaa.com |

## 4. Handling rules

`.env.local` for local dev (gitignored); `.env.example` lists every variable with placeholder + one-line comment and is updated in the same PR as any env change. Secrets are set in Vercel dashboard by an owner and mirrored in the team password manager; secrets never appear in code, logs (logger redacts keys matching `/KEY|SECRET|SALT/`), PR descriptions, or screenshots. Rotation: quarterly for RESEND/TURNSTILE, immediately on any suspected exposure for SUPABASE_SERVICE_ROLE_KEY (rotate in Supabase → update Vercel → redeploy).
