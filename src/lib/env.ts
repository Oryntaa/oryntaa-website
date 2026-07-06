import { z } from 'zod';

/**
 * Environment contract (ENVIRONMENT_VARIABLES §1). Every variable is declared and
 * Zod-validated here, split into server and client objects.
 *
 * Phase 0 note (ROADMAP 0.3 — "optional-safe until services exist"): the service-backed
 * variables are `.optional()` for now so the app boots and builds before Supabase / Resend /
 * Turnstile are provisioned. Phase 10 makes them required at the point the pipeline is wired,
 * and the server values are consumed only through modules that carry `import 'server-only'`
 * (`lib/supabase/admin.ts`, `features/contact/service.ts`) — see CLAUDE.md rule 5.
 *
 * Server secrets are never `NEXT_PUBLIC_`, so Next never inlines them into the client bundle.
 */

const serverSchema = z.object({
  SUPABASE_URL: z.url().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  RESEND_API_KEY: z.string().startsWith('re_').optional(),
  LEADS_INBOX: z.email().optional(),
  TURNSTILE_SECRET_KEY: z.string().min(1).optional(),
  LEAD_IP_SALT: z.string().min(16).optional(),
});

const clientSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url().default('http://localhost:3000'),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_BOOKING_URL: z.url().optional(),
  NEXT_PUBLIC_SHOW_DRAFTS: z.enum(['0', '1']).default('0'),
  NEXT_PUBLIC_FLAG_WORK: z.enum(['0', '1']).optional(),
  NEXT_PUBLIC_FLAG_INSIGHTS: z.enum(['0', '1']).optional(),
});

export type ServerEnv = z.infer<typeof serverSchema>;
export type ClientEnv = z.infer<typeof clientSchema>;

// NEXT_PUBLIC_* values must be referenced statically so Next can inline them.
export const clientEnv: ClientEnv = clientSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  NEXT_PUBLIC_BOOKING_URL: process.env.NEXT_PUBLIC_BOOKING_URL,
  NEXT_PUBLIC_SHOW_DRAFTS: process.env.NEXT_PUBLIC_SHOW_DRAFTS,
  NEXT_PUBLIC_FLAG_WORK: process.env.NEXT_PUBLIC_FLAG_WORK,
  NEXT_PUBLIC_FLAG_INSIGHTS: process.env.NEXT_PUBLIC_FLAG_INSIGHTS,
});

export const serverEnv: ServerEnv = serverSchema.parse({
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  LEADS_INBOX: process.env.LEADS_INBOX,
  TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
  LEAD_IP_SALT: process.env.LEAD_IP_SALT,
});
