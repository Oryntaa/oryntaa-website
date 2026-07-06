# CONTENT_ARCHITECTURE

Content is code. Everything a visitor reads lives in `/content`, is Zod-validated at build, and ships via deploys. A merge is a publish; a broken field is a failed build, never a broken page.

## 1. Collections

| Collection | Source | Shape |
|---|---|---|
| site | `content/site.ts` | identity, slogan, email, socials, bookingUrl, stack logos, industries strip |
| services | `content/services/*.ts` (6) | structured (see §2) |
| projects | `content/projects/<slug>/meta.ts` + `case-study.mdx` | structured meta + MDX body |
| insights | `content/insights/*.mdx` | frontmatter + MDX body |
| founders | `content/founders.ts` | array of 4 |
| careers | `content/careers/openings.ts` | array (empty at launch) |
| legal | `content/legal/*.mdx` | frontmatter (title, updatedAt) + body |

## 2. Schemas (`lib/content/schemas.ts` — single source; types via `z.infer`)

```ts
export const serviceSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string(),
  navLabel: z.string().max(28),
  oneLiner: z.string().max(160),
  heroTitle: z.string(),
  heroDescription: z.string(),
  overview: z.array(z.string()).min(2),           // paragraphs
  problems: z.array(z.object({ title: z.string(), body: z.string() })).min(4).max(6),
  capabilities: z.array(z.object({ title: z.string(), body: z.string().optional() })).min(4),
  approach: z.array(z.object({ step: z.string(), body: z.string() })).min(3),
  technologies: z.array(z.string()),
  relatedServices: z.array(z.string()).max(3),    // slugs, existence-checked
  faq: z.array(z.object({ q: z.string(), a: z.string() })).min(4).max(6),
  seo: seoSchema,
  order: z.number().int(),
});

export const projectMetaSchema = z.object({
  slug: z.string(), name: z.string(),
  type: z.enum(['web', 'mobile', 'ai', 'saas']),
  oneLiner: z.string().max(180),
  summary: z.string(),
  industry: z.string(),
  services: z.array(z.string()),                  // service slugs
  platform: z.string(),
  year: z.union([z.number().int(), z.literal('TBC')]),
  status: z.enum(['published', 'draft']),
  permission: z.enum(['granted', 'pending', 'anonymized']),
  engagement: z.string(),                         // honest attribution line — REQUIRED
  liveUrl: z.string().url().optional(),
  metrics: z.array(z.object({ label: z.string(), value: z.string(),
    source: z.literal('client-reported') })).optional(),
  featured: z.number().int().min(1).max(3).optional(),
  cover: z.string(), gallery: z.array(z.string()).default([]),
  technologies: z.array(z.string()),
  seo: seoSchema,
});

export const articleFrontmatterSchema = z.object({
  title: z.string(), slug: z.string(),
  category: z.enum(['ai', 'engineering', 'product', 'design', 'oryntaa']),
  excerpt: z.string().max(220),
  author: z.string(),                              // founder slug, existence-checked
  publishedAt: z.coerce.date(),
  status: z.enum(['published', 'draft']),
  cover: z.string().optional(),
  seo: seoSchema.partial(),
});
```

`founderSchema`: slug, name, role, intro, focusAreas[], photo, linkedin?, github?. `openingSchema`: title, slug, department, location, type, description, status.

## 3. Loaders & queries (`lib/content/*`) — the only content boundary

`getServices()`, `getService(slug)`, `getProjects({ type?, publishedOnly: true })`, `getFeaturedProjects()` (exactly 3, ordered by `featured`), `getArticles()`, `getArticle(slug)`, `getRelatedArticles(slug)`, `getFounders()`, `getOpenings()`, `getSite()`. All cached per build (`React.cache`). MDX compiled via `next-mdx-remote/rsc` with the shared component map; reading time computed at load.

## 4. Build-time integrity checks (fail the build)

Zod parse of every module/frontmatter · unique slugs per collection · referenced slugs exist (relatedServices, project.services, article.author) · every referenced image exists on disk · exactly three `featured` projects when work gate passes · `permission: 'pending'` + `status: 'published'` is a hard error · publish dates not in the future · required SEO fields present.

## 5. Publication rules

A project renders only when `status: published` **and** `permission ≠ pending`. Anonymized projects render with `name` replaced by the anonymized label from meta and `liveUrl` omitted. An article renders only when `status: published`. Drafts are visible on preview deployments via `NEXT_PUBLIC_SHOW_DRAFTS=1` (never set in production).

## 6. Gates & flags

`lib/content/derived.ts` exports counts consumed by `config/features.ts`: `publishedProjects`, `publishedArticles`. Gate thresholds (3/3) live in `config/constants.ts`. Everything that varies with a gate — nav, homepage sections, sitemap entries, related-work blocks, success-state buttons — reads `features`, never counts directly.

## 7. Editorial workflow

Add a project: create `content/projects/<slug>/`, fill meta (schema guides you), write `case-study.mdx` per the detail template order, drop media in `public/images/projects/<slug>/`, open a PR — CI validates, preview deploy renders it, review, merge = publish. Same shape for articles. Copy changes to fixed pages go through PAGE_SPECIFICATIONS first, then the corresponding content/config module — the doc and the site never diverge.

## 8. Migration path

If a CMS is ever adopted, only `lib/content` loaders change (fetch instead of import); schemas stay as the contract; pages and components are untouched. This boundary is the reason the layer exists.
