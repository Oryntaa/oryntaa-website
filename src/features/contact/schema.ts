import { z } from 'zod';

import {
  CONTACT_ROUTES,
  CONTACT_SERVICE_OPTIONS,
  PROJECT_BUDGET_OPTIONS,
  PROJECT_STAGE_OPTIONS,
  PROJECT_TIMELINE_OPTIONS,
} from '@/config/constants';

/** One schema, validated twice (client resolver + server action) — API_ARCHITECTURE §3. Strings are
 *  trimmed, email lowercased, lengths capped; enum fields validate against config/constants unions. */
export const leadInputSchema = z.object({
  route: z.enum(CONTACT_ROUTES),
  fullName: z.string().trim().min(2, 'Please enter your name').max(120),
  email: z.string().trim().toLowerCase().pipe(z.email('Enter a valid email')),
  company: z.string().trim().max(120).optional(),
  country: z.string().trim().max(80).optional(),
  services: z.array(z.enum(CONTACT_SERVICE_OPTIONS)).max(6).default([]),
  stage: z.enum(PROJECT_STAGE_OPTIONS).optional(),
  timeline: z.enum(PROJECT_TIMELINE_OPTIONS).optional(),
  budget: z.enum(PROJECT_BUDGET_OPTIONS).optional(),
  message: z.string().trim().min(1, 'Tell us a little about it').max(5000),
  consent: z.coerce.boolean().refine((value) => value, 'Please accept to continue'),
  intent: z.string().max(40).optional(),
  sourcePath: z.string().max(200).optional(),
  // Spam controls (API_ARCHITECTURE §6): honeypot should stay empty (checked by isSpam, which
  // returns a silent success — never a validation error); `ts` is the mount timestamp.
  hp: z.string().max(200).optional(),
  ts: z.coerce.number().optional(),
  turnstileToken: z.string().default(''),
});

export type LeadInput = z.infer<typeof leadInputSchema>;

/** The action's typed result envelope (API_ARCHITECTURE §4); raw internal errors never cross it. */
export type LeadResult =
  | { ok: true }
  | {
      ok: false;
      code: 'VALIDATION' | 'CHALLENGE' | 'UNEXPECTED';
      fieldErrors?: Record<string, string>;
    };
