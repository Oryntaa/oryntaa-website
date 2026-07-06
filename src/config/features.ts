/**
 * Feature flags (SYSTEM_ARCHITECTURE §7). Two sources merged: content-derived counts and env
 * overrides. Evaluated at build time — a flag flip is a deploy. Nav, homepage sections, sitemap,
 * and internal links all read THIS module; nothing checks content counts independently.
 *
 * Phase 2: counts are stubbed to 0 until lib/content/derived.ts wires real derivation (Phase 3.1).
 * `config` imports nothing above `lib`, so env overrides read the public flags off process.env
 * directly (referenced statically so Next inlines them at build).
 */

const derived = {
  publishedProjects: 0,
  publishedArticles: 0,
};

function isForcedOn(flag: string | undefined): boolean {
  return flag === '1';
}

export const features = {
  work: {
    enabled: derived.publishedProjects >= 3 || isForcedOn(process.env.NEXT_PUBLIC_FLAG_WORK),
  },
  insights: {
    enabled: derived.publishedArticles >= 3 || isForcedOn(process.env.NEXT_PUBLIC_FLAG_INSIGHTS),
  },
  booking: {
    // Boolean(site.bookingUrl) once content/site.ts lands (Phase 3.3).
    enabled: false,
  },
  newsletter: {
    // Reserved.
    enabled: false,
  },
} as const;

export type FeatureName = keyof typeof features;
