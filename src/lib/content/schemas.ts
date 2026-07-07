import { z } from 'zod';

/**
 * The single content contract (CONTENT_ARCHITECTURE §2). Every content module and MDX frontmatter
 * is parsed against these at build; a bad field fails the build, never ships a broken page. Types
 * are derived with `z.infer` — hand-written duplicates are defects (CODING_STANDARDS §2).
 *
 * `seoSchema` is finalized in Phase 12 (SEO_ARCHITECTURE); title/description are the required floor.
 */
export const seoSchema = z.object({
  title: z.string().max(60),
  description: z.string().max(160),
  ogImage: z.string().optional(),
  noindex: z.boolean().optional(),
});

export const serviceSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string(),
  navLabel: z.string().max(28),
  oneLiner: z.string().max(160),
  heroTitle: z.string(),
  heroDescription: z.string(),
  overview: z.array(z.string()).min(2),
  problems: z
    .array(z.object({ title: z.string(), body: z.string() }))
    .min(4)
    .max(6),
  capabilities: z.array(z.object({ title: z.string(), body: z.string().optional() })).min(4),
  approach: z.array(z.object({ step: z.string(), body: z.string() })).min(3),
  technologies: z.array(z.string()),
  relatedServices: z.array(z.string()).max(3),
  faq: z
    .array(z.object({ q: z.string(), a: z.string() }))
    .min(4)
    .max(6),
  seo: seoSchema,
  order: z.number().int(),
});

export const projectMetaSchema = z.object({
  slug: z.string(),
  name: z.string(),
  type: z.enum(['web', 'mobile', 'ai', 'saas']),
  oneLiner: z.string().max(180),
  summary: z.string(),
  industry: z.string(),
  services: z.array(z.string()),
  platform: z.string(),
  year: z.union([z.number().int(), z.literal('TBC')]),
  status: z.enum(['published', 'draft']),
  permission: z.enum(['granted', 'pending', 'anonymized']),
  engagement: z.string(),
  anonymizedName: z.string().optional(),
  liveUrl: z.url().optional(),
  metrics: z
    .array(z.object({ label: z.string(), value: z.string(), source: z.literal('client-reported') }))
    .optional(),
  featured: z.number().int().min(1).max(3).optional(),
  cover: z.string(),
  gallery: z.array(z.string()).default([]),
  technologies: z.array(z.string()),
  seo: seoSchema,
});

export const articleFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  category: z.enum(['ai', 'engineering', 'product', 'design', 'oryntaa']),
  excerpt: z.string().max(220),
  author: z.string(),
  publishedAt: z.coerce.date(),
  status: z.enum(['published', 'draft']),
  cover: z.string().optional(),
  seo: seoSchema.partial(),
});

export const founderSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string(),
  role: z.string(),
  intro: z.string(),
  focusAreas: z.array(z.string()),
  photo: z.string(),
  linkedin: z.url().optional(),
  github: z.url().optional(),
});

export const openingSchema = z.object({
  title: z.string(),
  slug: z.string(),
  department: z.string(),
  location: z.string(),
  type: z.enum(['full-time', 'part-time', 'contract', 'internship']),
  description: z.string(),
  status: z.enum(['open', 'closed']),
});

export const legalFrontmatterSchema = z.object({
  title: z.string(),
  updatedAt: z.coerce.date(),
});

export const siteSchema = z.object({
  name: z.string(),
  slogan: z.string(),
  description: z.string(),
  email: z.email(),
  socials: z.object({
    linkedin: z.url().optional(),
    instagram: z.url().optional(),
    facebook: z.url().optional(),
  }),
  bookingUrl: z.url().optional(),
  stack: z.array(z.object({ name: z.string(), logo: z.string() })),
  industries: z.array(z.string()),
});

export type Seo = z.infer<typeof seoSchema>;
export type Service = z.infer<typeof serviceSchema>;
export type ProjectMeta = z.infer<typeof projectMetaSchema>;
export type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>;
export type Founder = z.infer<typeof founderSchema>;
export type Opening = z.infer<typeof openingSchema>;
export type LegalFrontmatter = z.infer<typeof legalFrontmatterSchema>;
export type Site = z.infer<typeof siteSchema>;
