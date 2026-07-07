'use server';

import { randomUUID } from 'node:crypto';

import { FORM_MIN_FILL_MS } from '@/config/constants';

import { logger } from '@/lib/logger';

import { leadInputSchema, type LeadInput, type LeadResult } from './schema';
import { handleNewLead, requestContext, verifyTurnstile } from './service';

/** Decode a FormData submission into the shape the schema expects (services is a repeated field). */
function decode(formData: FormData): Record<string, unknown> {
  const entries: Record<string, unknown> = {};
  for (const [key, value] of formData.entries()) {
    if (key === 'services') continue;
    entries[key] = value;
  }
  entries.services = formData.getAll('services');
  return entries;
}

/** Flatten Zod issues to a { field: message } map for the client to render inline. */
function fieldErrorsOf(error: import('zod').ZodError): Record<string, string> {
  const result: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === 'string' && !(key in result)) result[key] = issue.message;
  }
  return result;
}

/** Honeypot filled, or submitted implausibly fast (time-trap) → treat as a bot. */
function isSpam(data: LeadInput): boolean {
  if (data.hp !== undefined && data.hp !== '') return true;
  if (data.ts !== undefined && Date.now() - data.ts < FORM_MIN_FILL_MS) return true;
  return false;
}

/**
 * The only v1 server action (API_ARCHITECTURE §2). Pipeline: parse → abuse checks → Turnstile →
 * service → typed result. Spam receives a silent `{ ok: true }`; the client never learns the trap.
 */
export async function submitLead(
  _prev: LeadResult | null,
  formData: FormData,
): Promise<LeadResult> {
  const log = logger.child({ action: 'submitLead', cid: randomUUID() });

  const parsed = leadInputSchema.safeParse(decode(formData));
  if (!parsed.success) {
    return { ok: false, code: 'VALIDATION', fieldErrors: fieldErrorsOf(parsed.error) };
  }

  if (isSpam(parsed.data)) {
    log.warn('spam_dropped');
    return { ok: true };
  }

  if (!(await verifyTurnstile(parsed.data.turnstileToken))) {
    return { ok: false, code: 'CHALLENGE' };
  }

  try {
    await handleNewLead(parsed.data, await requestContext());
    log.info('lead_ok');
    return { ok: true };
  } catch (error) {
    log.error('lead_pipeline_failed', { error: String(error) });
    return { ok: false, code: 'UNEXPECTED' };
  }
}
