# SEO_ARCHITECTURE

## 1. Strategy

Rank the **Services overview** for "custom software development company" and each service page for its consolidated term (deliberately merged pages concentrate authority — the structure review's 11→6 decision is the SEO strategy). Work case studies and Insights articles build topical authority and internal-link equity toward services. Everything ships crawlable static HTML — no client-rendered content exists to hide.

## 2. Metadata factory (`lib/seo/metadata.ts`)

One `buildMetadata({ title, description, path, ogParams })` used by every route's `generateMetadata`. Behavior: title template `%s — Oryntaa` (home: `Oryntaa — AI-First Software Engineering & Digital Products`); descriptions 140–160 chars from content `seo` fields; `metadataBase` from `NEXT_PUBLIC_SITE_URL`; canonical = absolute path (params stripped — `?type=` filters canonicalize to `/work`); OG/Twitter cards wired to `/api/og` with the page's type+title; `robots: noindex` automatically when `VERCEL_ENV !== 'production'`. Titles/descriptions live in content modules, not components — writable without touching code.

## 3. Indexation rules

Indexed: all v1 routes except legal (indexed but low priority) and 404. Never indexed: preview deployments (robots + header), draft content (excluded from build output entirely on production). Sitemap/robots per API_DOCUMENTATION §3 — both derive from the same route+gate source as the nav, so a gated section is consistently absent everywhere.

## 4. On-page rules (enforced in review)

Exactly one `h1` per page (the Heading component makes levels explicit); heading order never skips; the H1 of each service page contains its target term naturally; images carry descriptive `alt` (ACCESSIBILITY_GUIDELINES §5 doubles as image SEO); internal links use descriptive anchors ("Explore AI Solutions", never "click here"); breadcrumbs on all detail pages. Copy remains written for buyers first — no keyword stuffing; the term map lives in each service's `seo` content block.

## 5. Structured data (`lib/seo/jsonld.ts`, rendered as `<script type="application/ld+json">`)

| Type | Where | Key fields |
|---|---|---|
| Organization (+ logo, founders as Person[], sameAs socials) | root layout | one per site |
| WebSite | root layout | name, url |
| Service | each service page | name, provider→Organization, description |
| BreadcrumbList | all detail pages | from the Breadcrumbs component's data |
| Article | insights articles | headline, author→Person, dates, image |
| FAQPage | service + contact FAQs | from the FaqAccordion content |

All JSON-LD builders are typed and fed from the content layer — structured data can't drift from visible content. Validate with Google's Rich Results test as a launch-checklist item.

## 6. Post-launch instrumentation

Google Search Console verified (DNS TXT) at launch; sitemap submitted; Bing Webmaster mirrored. Monthly: query/impression review against the §1 term map; new Insights topics chosen partly from real query data. No SEO plugins/services at v1 — the architecture above is the SEO stack.
