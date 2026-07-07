import 'server-only';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

import { serverEnv } from '@/lib/env';

/**
 * Memoized service-role Supabase client (API_ARCHITECTURE §5, CLAUDE.md rule 5). Server-only — the
 * service-role key bypasses RLS and must never reach the client bundle. Only repositories import
 * this. Throws if the env is not provisioned, so a misconfigured deploy fails loudly.
 */
let client: SupabaseClient | null = null;

export function supabaseAdmin(): SupabaseClient {
  if (client !== null) return client;
  const url = serverEnv.SUPABASE_URL;
  const key = serverEnv.SUPABASE_SERVICE_ROLE_KEY;
  if (url === undefined || key === undefined) {
    throw new Error('Supabase is not configured (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).');
  }
  client = createClient(url, key, { auth: { persistSession: false } });
  return client;
}
