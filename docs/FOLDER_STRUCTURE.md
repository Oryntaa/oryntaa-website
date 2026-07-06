# FOLDER_STRUCTURE

Feature-based where features exist, content-domain-based where the "feature" is content. Placement is a rule, not a preference — CI review rejects files in the wrong layer.

```
oryntaa-website/
├── .github/workflows/ci.yml            # lint · typecheck · test · build · lhci
├── .husky/                             # pre-commit: lint-staged
├── docs/                               # THIS SUITE, versioned with the code
├── public/
│   ├── brand/                          # orbit mark, wordmark, favicons, og-fallback
│   ├── images/
│   │   ├── founders/                   # real photography only
│   │   ├── projects/<slug>/            # cover.png, shots/*, mockups/*
│   │   └── sections/                   # hero fallback, 3d stills
│   └── fonts/                          # only if a non-Google face is licensed later
├── content/                            # CONTENT LAYER — data, no React
│   ├── site.ts                         # identity, contact channels, social, bookingUrl
│   ├── founders.ts
│   ├── services/                       # one .ts per service (6)
│   │   └── ai-solutions.ts …
│   ├── projects/                       # one folder per project
│   │   └── prepnow/{meta.ts, case-study.mdx}
│   ├── insights/                       # one .mdx per article (frontmatter = schema)
│   ├── careers/openings.ts             # [] at launch → empty state
│   └── legal/{privacy,terms,cookies,code-of-conduct}.mdx
├── src/
│   ├── app/
│   │   ├── (site)/                     # route group: the public site
│   │   │   ├── layout.tsx              # navbar + footer + skip link
│   │   │   ├── page.tsx                # home
│   │   │   ├── services/{page.tsx, [slug]/page.tsx}
│   │   │   ├── work/{page.tsx, [slug]/page.tsx}
│   │   │   ├── about/{page.tsx, leadership/page.tsx}
│   │   │   ├── careers/page.tsx
│   │   │   ├── insights/{page.tsx, [slug]/page.tsx}
│   │   │   ├── contact/page.tsx
│   │   │   └── (legal)/{privacy,terms,cookies,code-of-conduct}/page.tsx
│   │   ├── api/og/[...params]/route.tsx  # edge OG images
│   │   ├── sitemap.ts · robots.ts · manifest.ts
│   │   ├── error.tsx · not-found.tsx · layout.tsx (root: fonts, analytics, metadata base)
│   ├── components/
│   │   ├── ui/                         # primitives: Button, Badge, Card, Accordion,
│   │   │   …                           # Dialog, Input, Select, Textarea, Checkbox,
│   │   │                               # Tabs, Eyebrow, Heading, Prose, Skeleton
│   │   ├── layout/                     # Navbar, MobileMenu, Footer, Container,
│   │   │                               # Section, SkipLink, Breadcrumbs
│   │   ├── sections/                   # page sections, grouped by page
│   │   │   ├── home/ · services/ · work/ · about/ · insights/ · contact/ · shared/
│   │   │   └── shared/{CtaSection, ProcessSteps, RelatedGrid, StackStrip}
│   │   ├── cards/                      # ServiceCard, ProjectCard, ArticleCard,
│   │   │                               # FounderCard, StageCard, PrincipleCard, JobCard
│   │   ├── motion/                     # Reveal, Stagger, HeroVisual (+ fallback)
│   │   └── mdx/                        # MDX component map: Callout, Figure, CodeBlock…
│   ├── features/
│   │   └── contact/
│   │       ├── components/             # ContactForm, StepAbout, StepProject, RouteSelector,
│   │       │                           # SuccessState, ErrorState, BookingEmbed
│   │       ├── actions.ts              # 'use server' submitLead
│   │       ├── schema.ts               # Zod: shared client/server
│   │       ├── service.ts              # orchestration: persist + notify
│   │       ├── repository.ts           # ONLY module touching `leads`
│   │       └── email.tsx               # react-email template
│   ├── lib/
│   │   ├── content/                    # loaders + queries: services.ts, projects.ts,
│   │   │                               # insights.ts, mdx.ts, schemas.ts
│   │   ├── seo/{metadata.ts, jsonld.ts}
│   │   ├── supabase/admin.ts           # service-role client, imports 'server-only'
│   │   ├── analytics.ts                # track() event helper
│   │   ├── logger.ts
│   │   ├── env.ts                      # Zod-validated env (client+server split)
│   │   └── utils/{cn.ts, dates.ts, slug.ts}
│   ├── config/
│   │   ├── features.ts                 # flags (SYSTEM_ARCHITECTURE §7)
│   │   ├── navigation.ts               # typed nav + footer maps
│   │   ├── routes.ts                   # route constants — no string literals in links
│   │   └── constants.ts                # limits, timings, misc config values
│   └── styles/
│       ├── globals.css                 # @theme tokens (the design system source)
│       └── prose.css                   # article typography
├── tests/{unit,e2e}/                   # Playwright specs, a11y specs
├── .env.example · eslint.config.mjs · lighthouserc.json
├── next.config.ts · postcss.config.mjs · tsconfig.json
└── package.json · CLAUDE.md (symlinked from docs)
```

## Placement rules

1. **`app/` composes, never computes.** No fetch logic, no business logic, no literal copy beyond metadata — pages import content and sections.
2. **A component is `ui/` only if it knows nothing about Oryntaa.** The moment it imports content types, it belongs in `cards/` or `sections/`.
3. **Anything a second feature would need moves down a layer** (component → ui, function → lib) in the same PR that needs it.
4. **`content/` contains zero React.** Data and MDX only; rendering lives in `components/mdx`.
5. **Server-only modules** (`supabase/admin`, `env.server` parts, `features/contact/service|repository`) start with `import 'server-only'`.
6. **One component per file; file name = export name.** Barrel files only at `components/ui/index.ts`.
7. **Route strings never appear inline** — always `config/routes.ts` (`routes.service('ai-solutions')`), so renames are one-line changes and the link-checker has one source to verify.
