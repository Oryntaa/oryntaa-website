# SYSTEM_ARCHITECTURE

## 1. Shape of the system

```
                    ┌────────────────────────────────────────────┐
                    │                 VERCEL EDGE                │
                    │  CDN cache · security headers · redirects │
                    └───────────────┬────────────────────────────┘
                                    │
                 ┌──────────────────┴───────────────────┐
                 │            NEXT.JS APP               │
                 │                                      │
   build time ──▶│  CONTENT LAYER (/content, Zod)  ───▶ │──▶ static HTML/RSC
                 │  services · projects · articles     │    for every route
                 │  founders · site config · flags     │
                 │                                      │
   request  ───▶ │  SERVER ACTION: submitLead()         │
                 │   validate → verify Turnstile →      │
                 │   persist → notify → respond         │
                 └───────┬───────────────┬──────────────┘
                         │               │
                  ┌──────▼─────┐   ┌─────▼─────┐
                  │  SUPABASE  │   │  RESEND   │
                  │  leads     │   │  email    │
                  │  (RLS deny)│   │  notify   │
                  └────────────┘   └───────────┘
```

Two planes, deliberately separated: a **static content plane** (everything a visitor reads — generated at build from the content layer) and a **thin dynamic plane** (exactly one mutation: lead submission). This separation is the scalability model: content scales by CDN, the mutation scales by being tiny.

## 2. Rendering strategy per route class

| Routes | Strategy |
|---|---|
| All pages (`/`, `/services/*`, `/work/*`, `/about*`, `/careers`, `/insights/*`, `/contact`, legal) | **Static** at build (`generateStaticParams` for dynamic slugs). Content changes ship as deploys — the content layer lives in the repo, so a merge *is* a publish. ISR is intentionally unused at v1. |
| `sitemap.xml`, `robots.txt`, `manifest` | Generated at build from the content layer + nav config. |
| `/api/og/[...]` | Edge runtime, `ImageResponse`, cached immutable per params. |
| Lead submission | Server Action (Node runtime), dynamic by nature. |

## 3. Layered architecture and dependency direction

```
app/ (routes, layouts, metadata)          ← thin: composition only
  ↓ may import
components/ (ui · layout · sections · mdx) ← presentation
  ↓ may import
features/<domain>/ (contact, work-filters) ← feature logic: actions, schemas, hooks
  ↓ may import
lib/ (content, seo, analytics, utils, env) ← pure infrastructure
  ↓ may import
config/ + content/ + styles/               ← data and tokens; import nothing above
```

Rules: imports only point downward; `lib` and `config` never import React components; `app` contains no business logic — a page file composes sections and wires metadata, nothing else. Server-only modules (`supabase-admin`, `resend`, `env.server`) import `server-only` so a client bundle including them fails the build.

## 4. Reusable business logic, hooks, and services

- **Services** (pure, framework-free): `lib/content/*` (load/parse/query collections), `lib/seo/*` (metadata + JSON-LD factories), `features/contact/service.ts` (persist + notify orchestration).
- **Hooks** (client, thin): `useReveal` (viewport entrance), `useMediaQuery`, `usePrefersReducedMotion`, `useScrolled` (navbar state), `useMultiStepForm` (step index + persistence of entered values).
- **Repositories**: `features/contact/repository.ts` is the only module that touches the `leads` table (see API_ARCHITECTURE §5). Adding a table means adding a repository — never inline queries.

## 5. Separation of concerns, concretely

A section component (`components/sections/home/HeroSection.tsx`) receives typed content as props and renders it; it never loads content itself. The page (`app/(site)/page.tsx`) loads content via `lib/content` and passes it down. Form UI (`features/contact/components/*`) owns interaction state; the server action owns the pipeline; the repository owns persistence; the email template owns notification rendering. Any file doing two of these jobs is a defect.

## 6. State management and caching

**Server-first.** Default is React Server Components with zero client JS. Client islands (`'use client'`) exist only for: navbar interactivity, accordions/dialogs (Radix), the work filter bar, the contact form, reveal animations, and the hero visual. State lives in: local component state → URL search params (work filters, `?intent=`) → nothing else. No global store. **Caching:** build-time static output + Vercel CDN + immutable hashed assets; fonts/images per PERFORMANCE_GUIDELINES; the only runtime cache concern is `/api/og` cache headers. **Optimistic updates:** not applicable at v1 — the one mutation (lead submit) uses `useActionState` pending/disabled semantics with full-fidelity error return instead (never clear the user's input). The pattern for future optimistic UI (mutate local → fire action → reconcile) is documented here so later features adopt it consistently.

## 7. Feature flags

Typed, config-driven, two sources merged in `config/features.ts`:

```ts
// Derived flags come from the content layer; overrides come from env.
export const features = {
  work:      { enabled: derived.publishedProjects >= 3 || envFlag('NEXT_PUBLIC_FLAG_WORK') },
  insights:  { enabled: derived.publishedArticles  >= 3 || envFlag('NEXT_PUBLIC_FLAG_INSIGHTS') },
  booking:   { enabled: Boolean(site.bookingUrl) },
  newsletter:{ enabled: false }, // reserved
} as const;
```

Flags are evaluated at build time (static site — a flag flip is a deploy). Nav, homepage sections, sitemap, and internal links all read the same flags module; nothing checks content counts independently.

## 8. Error handling model

- Build-time: invalid content (Zod), invalid env, and broken internal links (link-check task) fail the build.
- Runtime server: the action returns a typed discriminated union `{ ok: true } | { ok: false; code; fieldErrors? }`; unexpected errors are logged with a correlation id and surfaced as `code: 'UNEXPECTED'`.
- Runtime client: root `error.tsx` and `not-found.tsx` styled per PAGE_SPECIFICATIONS §12; component-level failures in the hero visual degrade to the static fallback silently.

## 9. Authentication — deferred pattern (do not build at v1)

When a portal/admin arrives, adopt the Supabase client trinity: `lib/supabase/client.ts` (browser, anon key), `lib/supabase/server.ts` (server components/actions, cookie-bound), `middleware.ts` (session refresh); RLS remains the primary security boundary with policies per role. Nothing at v1 may preclude this: keep `/app/(site)` as a route group so `(portal)` can be added beside it.

## 10. Future scalability planning

Growth paths and their pre-cut seams: **v2 Solutions/Industries** → new collections + templates, zero architectural change. **CMS later** → `lib/content` is the only content boundary; swap its loaders for CMS fetchers, page code untouched. **i18n** → route group `[locale]` insertion point noted in NAVIGATION_ARCHITECTURE §8; copy already centralized in content/config. **Traffic growth** → static plane needs nothing; lead volume → add rate limiting (Upstash) at the action seam. **Attachments/media uploads** → STORAGE_ARCHITECTURE §4 trigger conditions.
