# ROADMAP_MASTER_PLAN

The execution plan. Claude Code works this document top to bottom, one task (or tight cluster) per session/PR, ticking checkboxes as it goes. ⛳ marks human review gates — do not proceed past one until a founder signs off. `👤` marks human-only tasks (accounts, content, credentials); they run in parallel and never block the next engineering task unless stated.

## 0. Ordering rationale (read once, then build)

**Infrastructure before features.** Phases 0–4 build the machine that makes pages cheap: tooling, tokens, layout, content pipeline, component library. Every page phase (5–11) then becomes assembly — compose sections from the library, feed them from the content layer. This is why the homepage, despite being "page one," is Phase 5: building it first would mean hand-rolling everything it needs, then refactoring.

**Design system before components, components before pages.** Tokens (Phase 1) are the vocabulary; components (Phase 4) are sentences; pages (5–11) are documents. Skipping a level reintroduces the hardcoded values the whole suite exists to prevent.

**API-first vs frontend-first, answered per plane.** The static plane is *content-schema-first*: schemas (Phase 3) are the API of this site — pages are pure functions of validated content, so schemas precede any page. The dynamic plane (the one real API) is built **backend-first inside Phase 10**: schema → repository → service → action → only then the form UI. The form is wired to a working pipeline on day one of its existence, never to a mock.

**Deployment on day one.** Vercel + CI go live in Phase 0 so every subsequent PR has a preview URL and every quality gate runs from the first commit. Launch (Phase 16) is a checklist, not an event, because deployment was never deferred.

**External services early.** Resend domain verification and DNS propagation have lead time — provisioning happens in Phase 0 even though nothing consumes those keys until Phase 10.

**Motion and hardening late, deliberately.** Animation (13) and performance/a11y hardening (14) polish real pages; doing them earlier polishes things that change. But a11y *construction* rules apply from the first component — Phase 14 verifies, it doesn't retrofit.

Dependency spine: `0 → 1 → 2 → 3 → 4 → (5…11 in order) → 12 → 13 → 14 → 15 → 16`, with the 👤 content track feeding Phases 5–11 and gating only Phase 16.

---

## Phase 0 — Foundation: repo, tooling, deployment

**Goal:** a deployed, CI-guarded, correctly-configured empty app. **Depends on:** nothing. **Docs:** TECH_STACK, FOLDER_STRUCTURE, CODING_STANDARDS, ENVIRONMENT_VARIABLES, DEPLOYMENT_GUIDE, TESTING_STRATEGY §6.

**Step 0.1 — Repository & app scaffold**
- [ ] Create GitHub repo `oryntaa/oryntaa-website`; protect `main` (PR + CI required).
- [x] `create-next-app` (TS, App Router, Tailwind v4, src dir, pnpm); pin exact versions per TECH_STACK §6; set `engines`.
- [x] Apply tsconfig strict flags (CODING_STANDARDS §2); path alias `@/*`.
- [x] Lay the FOLDER_STRUCTURE skeleton (empty dirs + `.gitkeep`, `config/`, `content/`, `docs/` = this suite, `CLAUDE.md` symlink).

**Step 0.2 — Quality tooling**
- [x] ESLint 9 flat config: typescript-eslint strict, import order, `no-console`, react rules; Prettier + tailwind plugin; printWidth 100.
- [x] Husky + lint-staged (staged files: eslint --fix, prettier).
- [x] commitlint (Conventional Commits) + PR template (DEVELOPMENT_WORKFLOW §4).
- [x] Vitest + RTL setup with one seed test; Playwright installed with one seed spec (skipped until Phase 2).
- [x] Scripts: `verify`, `check:content` (stub), `check:assets`, `check:arbitrary` (the grep guards, wired but trivially green).

**Step 0.3 — Environment & CI**
- [ ] `src/lib/env.ts` per ENVIRONMENT_VARIABLES §1 (all keys, optional-safe until services exist); `.env.example`.
- [ ] GitHub Actions pipeline per TESTING_STRATEGY §6 (lighthouse job stubbed until Phase 2 gives it pages).
- [ ] `src/lib/logger.ts` per LOGGING_MONITORING §1.

**Step 0.4 — Deployment & external provisioning** 👤 (engineering pairs where marked)
- [ ] 👤 Vercel team + project import; env vars (placeholders where services pending); Deployment Protection on; Analytics + Speed Insights toggled.
- [ ] 👤 Supabase org + `oryntaa-website-prod` / `-dev` projects (SUPABASE_SETUP §1) — keys into Vercel + password manager.
- [ ] 👤 Resend account; **start domain verification for oryntaa.com now** (DNS records via Workspace admin).
- [ ] 👤 Cloudflare Turnstile site created (real keys) — test keys documented for CI.
- [ ] Verify a hello-world production deploy on the vercel.app domain; smoke the headers config placeholder.

**DoD / ⛳ Gate 0:** CI green on a trivial PR; preview URL works; `pnpm verify` <2 min; founders can all run the repo locally.

---

## Phase 1 — Design tokens & theme

**Goal:** the entire DESIGN_SYSTEM exists as code; nothing visual will ever be defined elsewhere. **Depends on:** 0. **Docs:** DESIGN_SYSTEM (all), CODING_STANDARDS §7.

**Step 1.1 — Token implementation**
- [ ] `styles/globals.css` `@theme`: brand + neutral ramps, semantic tokens, `[data-theme="dark"]` overrides, radius/shadow/easing/duration, `--gradient-horizon`, fluid type scale variables, `--space-section`.
- [ ] next/font setup (Sora, Inter, JetBrains Mono) in root layout; font CSS vars wired into `@theme`.
- [ ] `prose.css` base per DESIGN_SYSTEM §4.

**Step 1.2 — Token guards & reference page**
- [ ] `check:arbitrary` now enforcing (fails on `[...]` in className).
- [ ] Internal `/dev/tokens` route (dev-only, excluded from build in production): renders ramps, semantic pairs on light/dark, type scale, spacing, radii, shadows — the visual QA surface for this phase.

**DoD / ⛳ Gate 1:** founders review `/dev/tokens` on a preview against DESIGN_SYSTEM §2–5 and sign off the palette/type in browser reality. This gate exists because every later pixel inherits it.

---

## Phase 2 — Layout shell & navigation

**Goal:** every future page drops into a finished shell. **Depends on:** 1. **Docs:** NAVIGATION_ARCHITECTURE, COMPONENT_LIBRARY §4, ACCESSIBILITY_GUIDELINES §2–3.

**Step 2.1 — Structural primitives**
- [ ] `Container`, `Section` (theme prop → data-theme, spacing), `SectionHeader`, `SkipLink`, `VisuallyHidden`.
- [ ] `config/routes.ts` + `config/navigation.ts` (typed maps, gate-aware filtering helper).
- [ ] `config/features.ts` with counts stubbed to 0 (real derivation lands Phase 3) — gating logic testable now.

**Step 2.2 — Navbar & footer**
- [ ] `Navbar` (server shell + client island): top/scrolled states (`useScrolled`), desktop dropdowns (Radix), active-route logic, CTA button.
- [ ] `MobileMenu` (Dialog drawer per spec) with focus trap, scroll lock, route-change close.
- [ ] `Footer` per NAVIGATION_ARCHITECTURE §4 (dark theme — first real dark-section consumer).
- [ ] Root layout assembly: fonts, skip link, header/main/footer landmarks; `error.tsx` + `not-found.tsx` shells (final copy Phase 11).

**Step 2.3 — First real e2e**
- [ ] Playwright: nav walk desktop + mobile drawer; axe on the shell; Lighthouse CI job activated on `/`.

**DoD / ⛳ Gate 2:** keyboard-only walk of nav/drawer passes; gated items disappear when flags forced off; founders approve the shell on preview.

---

## Phase 3 — Content architecture

**Goal:** the content pipeline exists, validates, and gates. **Depends on:** 2 (for SmartLink integration points). **Docs:** CONTENT_ARCHITECTURE, PAGE_SPECIFICATIONS (as fixture source).

**Step 3.1 — Schemas & loaders**
- [ ] `lib/content/schemas.ts` (all schemas from CONTENT_ARCHITECTURE §2).
- [ ] Loaders + `React.cache` wrappers; MDX compile util with the component map registered (map components arrive Phase 4 — register placeholders that throw descriptively).
- [ ] `lib/content/derived.ts` counts → `config/features.ts` real derivation + env overrides.

**Step 3.2 — Integrity gate**
- [ ] `check:content` implementing every §4 rule (unique slugs, ref existence, image existence, featured-count, permission×status, dates, SEO presence); wired into `verify` + CI.
- [ ] Unit suite: fixture-driven valid/invalid cases per rule.

**Step 3.3 — Seed content**
- [ ] `content/site.ts` (real identity data; booking URL optional-pending 👤).
- [ ] `content/founders.ts` (names/roles real; photos/bios `TODO(content)` placeholders that pass schema).
- [ ] Six `content/services/*.ts` drafted **in full** from PAGE_SPECIFICATIONS §4 briefs (real copy work — flagged for Gate 3 review).
- [ ] Project meta for all six projects with correct `status`/`permission` values from the work map (four `pending` until 👤 clearance; case-study MDX stubs).
- [ ] Legal MDX stubs with `TODO(content): legal review` frontmatter.

**DoD / ⛳ Gate 3:** `check:content` red/green demonstrably works (PR shows a failing fixture); founders review the six service modules' copy; gates compute correctly (work off, insights off at this point).

---

## Phase 4 — Component library

**Goal:** every reusable piece from COMPONENT_LIBRARY exists, tested, before any page consumes it. **Depends on:** 1, 3 (typed content props). **Docs:** COMPONENT_LIBRARY, ACCESSIBILITY_GUIDELINES §1–5.

**Step 4.1 — UI primitives** — [ ] Button/ButtonLink (canonical CVA) · [ ] Eyebrow · [ ] Heading · [ ] Badge/Tag · [ ] Card · [ ] Accordion · [ ] Dialog (already partly via MobileMenu — consolidate) · [ ] Tabs · [ ] form controls (Input, Textarea, Select, Checkbox, RadioGroup) with error wiring · [ ] Prose · [ ] Skeleton. Each: variants test + a11y assertions.

**Step 4.2 — Cards** — [ ] ServiceCard · [ ] ProjectCard · [ ] FeaturedProjectCard · [ ] ArticleCard · [ ] FounderCard · [ ] StageCard · [ ] PrincipleCard · [ ] JobCard — all rendering from typed fixtures.

**Step 4.3 — Shared sections & MDX map** — [ ] CtaSection · [ ] ProcessSteps · [ ] StackStrip · [ ] RelatedGrid · [ ] FaqAccordion (+JSON-LD hook stub) · [ ] IndustriesStrip · [ ] Breadcrumbs · [ ] MDX map (h2/h3 anchors, Figure, CodeBlock via Shiki, Callout, Table, blockquote) replacing Phase 3 placeholders.

**Step 4.4 — Motion shells** — [ ] Reveal/Stagger (inert-capable; animation values land Phase 13 — build the reduced-motion/SSR-safe machinery now) · [ ] HeroVisual with still-only behavior (3D layer is Phase 13).

**DoD / ⛳ Gate 4:** dev-only `/dev/library` route renders the full inventory on light + dark; component test suite green; founders sign off card designs (this is the cheapest moment to adjust visual direction — say so explicitly in the review request).

---

## Phase 5 — Homepage

**Goal:** the eleven-section home assembled per PAGE_SPECIFICATIONS §2. **Depends on:** 4. **Docs:** PAGE_SPECIFICATIONS §1–2, DESIGN_SYSTEM §1/§10.

**Step 5.1** — [ ] Hero (H1 = LCP, Horizon gradient, HeroVisual still slot, capability line) · [ ] StackStrip wired to site content · [ ] Services section (cards from content).
**Step 5.2** — [ ] AI-First dark section (3-pillar layout; 3D still placeholders 👤 pending renders) · [ ] Start Where You Are (StageCards + IndustriesStrip) · [ ] Process.
**Step 5.3** — [ ] Selected Work behind `features.work` (renders nothing while gate off — verify both states via flag override) · [ ] Why Oryntaa · [ ] Founders grid · [ ] Insights preview (gated) · [ ] Final CTA.
**Step 5.4** — [ ] Home e2e + axe; Lighthouse budget assertion; metadata via placeholder factory (real factory Phase 12).

**DoD / ⛳ Gate 5:** founders review the complete homepage (both gate states) on preview, desktop + phone in hand, against §2 copy verbatim.

---

## Phase 6 — Services system

**Goal:** overview + template + six live service pages. **Depends on:** 4 (5 for shared sections reuse). **Docs:** PAGE_SPECIFICATIONS §3–4.

**Step 6.1** — [ ] `/services` overview (hero, grid, how-services-connect, engagement models, process, gated work, CTA).
**Step 6.2** — [ ] `[slug]` template: all sections fed from the service module; Related Work by tag (empty-safe); Related Services; FAQ accordion.
**Step 6.3** — [ ] `generateStaticParams`; per-service review pass of rendered copy; e2e: overview → detail → related hop; axe both.

**DoD / ⛳ Gate 6:** all six pages read as finished pages (not templates) — founders spot-check AI Solutions and one more in depth.

---

## Phase 7 — Work system

**Goal:** grid + detail template + the four publishable case studies drafted. **Depends on:** 4; content 👤 clearance gates *publication*, not construction. **Docs:** PAGE_SPECIFICATIONS §5, work map.

**Step 7.1** — [ ] `/work` grid with URL-param filter (`?type=`), published+granted filtering, canonicalization to `/work`.
**Step 7.2** — [ ] Detail template: hero, Snapshot (definition list incl. mandatory `engagement` line), narrative sections from MDX, gallery, tech, outcomes (client-reported labeling), next-project, breadcrumbs.
**Step 7.3** — [ ] Case-study MDX drafted for PrepNowAI, TrackRec, TruckTrader, FairSettle from the work map angles (`TODO(content)` on unconfirmed facts); Espo/MASI remain `draft`.
**Step 7.4** — [ ] Flip `permission` per 👤 clearance as it arrives; when 3 published → **work gate turns on**: verify nav/home/sitemap all light up together; e2e gating spec updated to the on-state.

**DoD / ⛳ Gate 7:** founders read all four case studies for factual accuracy against the permissions sheet — this gate is about honesty, not pixels.

---

## Phase 8 — About, Leadership, Careers

**Depends on:** 4. **Docs:** PAGE_SPECIFICATIONS §6–8.
- [ ] `/about` (story `TODO(content)` 👤, principles, mission/vision, **How We Build**, leadership preview, careers strip, CTA).
- [ ] `/about/leadership` (four equal blocks; links from founders content).
- [ ] `/careers` with openings loader + designed empty state.
- [ ] e2e + axe pass. **⛳ Gate 8:** founders approve How We Build wording (it's a public engineering promise) and their own bios/photos when landed.

---

## Phase 9 — Insights system

**Depends on:** 4 (MDX map). **Docs:** PAGE_SPECIFICATIONS §9.
- [ ] `/insights` list: featured + grid + category filter (URL param).
- [ ] Article template: Prose rendering, author block, read time, share links, related, breadcrumbs.
- [ ] Publish founder-written cornerstone articles as they land 👤 (engineering may seed one internal-authored draft for template QA, marked draft).
- [ ] Insights gate flips at 3 published — same all-surfaces verification as Phase 7.4. **⛳ Gate 9:** article template review with a real article in it.

---

## Phase 10 — Contact & conversion (the dynamic plane)

**Goal:** the lead pipeline, backend-first, then the form, then booking. **Depends on:** 4; Supabase/Resend/Turnstile provisioning from Phase 0. **Docs:** API_ARCHITECTURE, API_DOCUMENTATION, DATABASE_SCHEMA, SUPABASE_SETUP, SECURITY_GUIDELINES §2, PAGE_SPECIFICATIONS §10.

**Step 10.1 — Data & pipeline (no UI yet)**
- [ ] `/supabase/migrations/0001_leads.sql` applied to dev + prod; RLS verification checklist (SUPABASE_SETUP §4) executed and pasted into the PR.
- [ ] `leadInputSchema` (shared) · repository · service (persist→notify order, email-failure isolation) · `submitLead` action with honeypot/time-trap/Turnstile verify · react-email template.
- [ ] Unit tests: schema edges, spam traps, pipeline failure paths (DI mocks).

**Step 10.2 — Form UI**
- [ ] RouteSelector + intent presets from URL · two-step ContactForm (`useMultiStepForm`, RHF+zodResolver, value persistence, Turnstile mount step 2, `useActionState` wiring, error mapping, a11y per ACCESSIBILITY_GUIDELINES §4).
- [ ] Success/Error states with exact copy; analytics events stubbed to logger (real analytics Phase 15).

**Step 10.3 — Booking + page assembly**
- [ ] BookingEmbed facade (gated on `NEXT_PUBLIC_BOOKING_URL` 👤) · contact page per §10 (hero, promise line, form, `#book`, FAQ, email fallback).
- [ ] e2e: happy path against dev Supabase (row asserted), sad paths, preset from `?intent=`; axe.

**DoD / ⛳ Gate 10:** a founder submits a real test lead on preview → row + email verified → deleted. The pipeline's failure alert path demonstrated once (forced email failure in dev shows the error log).

---

## Phase 11 — Legal & utility

**Depends on:** 4 (Prose). — [ ] Legal template (TOC gen, updatedAt) rendering four MDX docs · [ ] final 404/error copy + design · [ ] `TODO(content): legal review` tracked 👤. **Gate:** none (Gate 16 covers legal sign-off).

## Phase 12 — SEO layer

**Depends on:** all pages existing (5–11). **Docs:** SEO_ARCHITECTURE, API_DOCUMENTATION §2–3.
- [ ] `lib/seo/metadata.ts` factory replacing per-page placeholders; content `seo` blocks finalized.
- [ ] JSON-LD builders wired (Organization/WebSite root; Service/Breadcrumb/Article/FAQ per page).
- [ ] `/api/og` edge route (param allowlist, fonts, brand layout) + per-type wiring; `og-fallback.png`.
- [ ] `sitemap.ts` / `robots.ts` / `manifest.ts` (gate-aware, env-aware noindex).
- [ ] Rich Results + OG debugger validation on preview. **⛳ Gate 12:** spot-check titles/descriptions table + OG cards.

## Phase 13 — Motion layer

**Depends on:** 12 (pages stable). **Docs:** ANIMATION_ARCHITECTURE, PERFORMANCE_GUIDELINES §4.
- [ ] Activate Reveal/Stagger values site-wide per the sanctioned map; micro-interactions verified pure-CSS where specced.
- [ ] Horizon ambient drift (capability-gated); hero 3D layer integrated under the HeroVisual protocol with 👤 final render assets — or explicit still-only decision recorded.
- [ ] Reduced-motion visual QA on every animated surface; INP/CLS re-checked. **⛳ Gate 13:** motion feel review (founders on real devices).

## Phase 14 — Performance & accessibility hardening

**Depends on:** 13. **Docs:** PERFORMANCE_GUIDELINES, ACCESSIBILITY_GUIDELINES §7.
- [ ] Bundle audit per route vs 160KB (kill offenders: import shape, dynamic splits) · image `sizes` audit · font subset check.
- [ ] Lighthouse budgets enforced on all four key routes; WebPageTest mid-tier Android run archived.
- [ ] Full manual a11y pass (keyboard, VoiceOver flows, 200% zoom, reduced motion) with findings fixed. **⛳ Gate 14:** budgets green on preview production-build; a11y checklist signed.

## Phase 15 — Analytics, logging, monitoring

**Depends on:** 10 (events have targets), 14. **Docs:** ANALYTICS_ARCHITECTURE, LOGGING_MONITORING.
- [ ] `lib/analytics.ts` typed events replacing stubs; Analytics/SpeedInsights mounted (prod-only); UTM capture util.
- [ ] Log alert rule (or documented fallback) for `lead.email_failed`/`lead.pipeline_failed`; uptime monitor 👤; weekly ops-review checklist committed.
- [ ] Verify events appear in Vercel dashboard from preview exercise. **Gate:** folded into 16.

## Phase 16 — QA, content completion, launch

**Depends on:** everything; 👤 content track complete. **Docs:** DEPLOYMENT_GUIDE §5.
- [ ] Sweep all `TODO(content)` to zero (grep is the audit); permissions sheet resolved; legal reviewed; founder photos/bios live; ≥3 projects + ≥3 articles published (gates naturally on).
- [ ] Full regression: e2e suite, axe suite, `verify`, fresh Lighthouse on production build.
- [ ] Execute DEPLOYMENT_GUIDE §5 checklist line by line (domains, DNS, Search Console, test lead on production, OG debuggers, rollback rehearsal).
- [ ] ⛳ **Launch sign-off:** all four founders approve on production URL. Ship. Start the Week-1 cadence (DEPLOYMENT_GUIDE §7).

---

## Parallel 👤 content-production track (start immediately, feeds Gates 5–16)

Founder photos (consistent treatment) → Phase 5/8 · founder bios + story + vision statement → Phase 8 · 3D object family renders (hero still, pillar stills, service icons) → Phases 5–6/13 · project permissions/roles/years/metrics sheet → Phase 7.4 · Espo remediation decision + MASI permission → post-launch grid additions · three cornerstone articles → Phase 9 · booking account + URL → Phase 10.3 · legal text review → Phase 16 · Resend domain verified → Phase 10.1.

## Change control

Scope changes enter as PRs to this file (add/modify tasks) — never as silent scope creep inside an unrelated PR. A phase is closed when every checkbox is ticked and its gate is signed; closed phases reopen only via a new task, not by editing history.
