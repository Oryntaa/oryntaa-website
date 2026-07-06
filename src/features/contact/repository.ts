import 'server-only';

import { supabaseAdmin } from '@/lib/supabase/admin';

/** The row shape written to public.leads (snake_case, matching the migration). */
export interface LeadRecord {
  route: string;
  full_name: string;
  email: string;
  company: string | null;
  country: string | null;
  services: string[];
  stage: string | null;
  timeline: string | null;
  budget: string | null;
  message: string;
  intent: string | null;
  source_path: string | null;
  user_agent: string | null;
  ip_hash: string | null;
}

/** Thrown when a Supabase operation fails, carrying table+op context (API_ARCHITECTURE §5). */
export class RepositoryError extends Error {
  constructor(
    op: string,
    public readonly detail: unknown,
  ) {
    super(`Repository operation failed: ${op}`);
    this.name = 'RepositoryError';
  }
}

/** The only module that touches the leads table (CLAUDE.md rule 5). */
export const leadRepository = {
  async insert(lead: LeadRecord): Promise<{ id: string }> {
    const { data, error } = await supabaseAdmin()
      .from('leads')
      .insert(lead)
      .select('id')
      .single<{ id: string }>();
    if (error !== null) throw new RepositoryError('leads.insert', error);
    return data;
  },

  async markNotified(id: string): Promise<void> {
    const { error } = await supabaseAdmin()
      .from('leads')
      .update({ notified_at: new Date().toISOString() })
      .eq('id', id);
    if (error !== null) throw new RepositoryError('leads.markNotified', error);
  },
};
