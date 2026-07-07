import 'server-only';

import { createHash } from 'node:crypto';

import { headers } from 'next/headers';
import { Resend } from 'resend';

import { serverEnv } from '@/lib/env';
import { logger } from '@/lib/logger';

import { LeadNotificationEmail } from './emails/LeadNotificationEmail';
import { leadRepository, type LeadRecord } from './repository';
import type { LeadInput } from './schema';

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const EXTERNAL_TIMEOUT_MS = 5000;

export interface RequestContext {
  userAgent: string | null;
  ipHash: string | null;
}

/** Per-request context derived from headers. Raw IPs are never stored — only a salted hash for spam
 *  forensics (DATABASE_SCHEMA §4). */
export async function requestContext(): Promise<RequestContext> {
  const headerList = await headers();
  const userAgent = headerList.get('user-agent');
  const forwarded = headerList.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() ?? null;
  const salt = serverEnv.LEAD_IP_SALT;
  const ipHash =
    ip !== null && salt !== undefined
      ? createHash('sha256')
          .update(ip + salt)
          .digest('hex')
      : null;
  return { userAgent, ipHash };
}

/** Cloudflare Turnstile server verification (API_ARCHITECTURE §7): 5s timeout. Unprovisioned secret
 *  (local/dev) does not block submission; a real failure does. */
export async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = serverEnv.TURNSTILE_SECRET_KEY;
  if (secret === undefined) {
    logger.warn('turnstile_secret_missing');
    return true;
  }
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      controller.abort();
    }, EXTERNAL_TIMEOUT_MS);
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
      signal: controller.signal,
    });
    clearTimeout(timer);
    const data = (await response.json()) as { success?: boolean };
    return data.success === true;
  } catch (error) {
    logger.error('turnstile_verify_failed', { error: String(error) });
    return false;
  }
}

/** Send the lead notification via Resend, with one retry on transient failure (API_ARCHITECTURE §7).
 *  An unprovisioned Resend key is a warning, not a lead-losing error. */
async function sendLeadEmail(input: LeadInput, cid: string): Promise<void> {
  const apiKey = serverEnv.RESEND_API_KEY;
  const to = serverEnv.LEADS_INBOX;
  if (apiKey === undefined || to === undefined) {
    logger.warn('resend_not_configured', { cid });
    return;
  }
  const resend = new Resend(apiKey);
  const payload = {
    // TODO(content): sending address must be on a Resend-verified domain (SUPABASE/RESEND setup).
    from: 'Oryntaa Leads <leads@oryntaa.com>',
    to,
    replyTo: input.email,
    subject: `New ${input.route} lead — ${input.fullName}`,
    react: LeadNotificationEmail({
      route: input.route,
      fullName: input.fullName,
      email: input.email,
      company: input.company,
      country: input.country,
      services: input.services,
      stage: input.stage,
      timeline: input.timeline,
      budget: input.budget,
      message: input.message,
      sourcePath: input.sourcePath,
    }),
  };

  const { error } = await resend.emails.send(payload);
  if (error !== null) {
    // one retry with a little jitter
    await new Promise((resolve) => setTimeout(resolve, 300 + (cid.charCodeAt(0) % 200)));
    const retry = await resend.emails.send(payload);
    if (retry.error !== null) throw new Error(retry.error.message);
  }
}

/** Orchestrates a new lead: persist FIRST (the lead must survive email failure), then notify. Email
 *  failure is logged + isolated, never surfaced to the visitor (API_ARCHITECTURE §2). */
export async function handleNewLead(input: LeadInput, ctx: RequestContext): Promise<void> {
  const log = logger.child({ action: 'handleNewLead' });
  const record: LeadRecord = {
    route: input.route,
    full_name: input.fullName,
    email: input.email,
    company: input.company ?? null,
    country: input.country ?? null,
    services: input.services,
    stage: input.stage ?? null,
    timeline: input.timeline ?? null,
    budget: input.budget ?? null,
    message: input.message,
    intent: input.intent ?? null,
    source_path: input.sourcePath ?? null,
    user_agent: ctx.userAgent,
    ip_hash: ctx.ipHash,
  };

  const { id } = await leadRepository.insert(record);
  log.info('lead_persisted', { id });

  try {
    await sendLeadEmail(input, id);
    await leadRepository.markNotified(id);
    log.info('lead_notified', { id });
  } catch (error) {
    // Alert path: the lead is saved; email delivery failed. Do not rethrow.
    log.error('lead_email_failed', { id, error: String(error) });
  }
}
