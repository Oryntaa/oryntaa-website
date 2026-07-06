import { INSIGHTS_GATE_THRESHOLD, WORK_GATE_THRESHOLD } from '@/config/constants';

import { derived } from '@/lib/content/derived';
import { getSite } from '@/lib/content/site';

/**
 * Feature flags (SYSTEM_ARCHITECTURE §7). Two sources merged: content-derived counts and env
 * overrides. Evaluated at build time — a flag flip is a deploy. Nav, homepage sections, sitemap,
 * and internal links all read THIS module; nothing checks content counts independently.
 *
 * This is the one sanctioned content→config dependency: CONTENT_ARCHITECTURE §6 wires
 * lib/content/derived.ts into this module. It is only ever read server-side (the client receives
 * the resolved nav, never the flags module), so the content loaders never reach a client bundle.
 */

function isForcedOn(flag: string | undefined): boolean {
  return flag === '1';
}

export const features = {
  work: {
    enabled:
      derived.publishedProjects >= WORK_GATE_THRESHOLD ||
      isForcedOn(process.env.NEXT_PUBLIC_FLAG_WORK),
  },
  insights: {
    enabled:
      derived.publishedArticles >= INSIGHTS_GATE_THRESHOLD ||
      isForcedOn(process.env.NEXT_PUBLIC_FLAG_INSIGHTS),
  },
  booking: {
    enabled: Boolean(getSite().bookingUrl),
  },
  newsletter: {
    // Reserved.
    enabled: false,
  },
} as const;

export type FeatureName = keyof typeof features;
