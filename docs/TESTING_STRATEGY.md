# TESTING_STRATEGY

Test what can actually break. A static marketing site's risks concentrate in: the content pipeline, the lead pipeline, navigation/gating logic, and regressions in a11y/performance — the strategy weights effort accordingly rather than chasing coverage percentages.

## 1. Unit tests (Vitest) — pure logic

Targets: `lib/content` loaders + integrity checks (fixture content: valid, invalid, duplicate-slug, missing-ref cases) · Zod schemas (boundary values, normalization: trim/lowercase, honeypot/time-trap logic) · `config/features.ts` gate derivation (counts × env overrides matrix) · `lib/seo` factories (canonical building, noindex on preview) · utils. Convention: colocated `*.test.ts`, table-driven where inputs enumerate.

## 2. Component tests (Vitest + RTL)

Every `ui/` primitive: renders all variants, keyboard interaction (accordion toggles, dialog ESC), error wiring on Input (`aria-describedby` present and linked). Cards render from typed fixtures. ContactForm gets the deepest suite: step navigation preserves values, client validation messages, pending state disables submit, server `fieldErrors` map to inputs, success/error states render the exact PAGE_SPECIFICATIONS copy, values survive a failed submit.

## 3. E2E (Playwright, against a production build)

Critical paths, desktop + mobile viewport each:
1. **Navigate** — home → services dropdown → AI Solutions → related work → project detail → breadcrumbs back; mobile drawer equivalent.
2. **Convert (happy)** — home CTA → contact with `?intent=project` preset → complete both steps (Turnstile test key) → success state → assert row in dev Supabase.
3. **Convert (sad)** — invalid email + short message → inline errors + error summary focus; simulate action failure → error state with inputs preserved.
4. **Gating** — build fixture with work flag off: nav item absent, homepage section absent, sitemap excludes `/work`, SmartLink fallback renders.
5. **Utility** — 404 renders brand state; legal pages render TOC.

## 4. Accessibility & performance gates

`@axe-core/playwright` on `/`, `/services`, one service, `/work`, one project, `/insights`, one article, `/about`, `/contact`, one legal — zero serious/critical (ACCESSIBILITY_GUIDELINES §7). Lighthouse CI per PERFORMANCE_GUIDELINES §1 on home/service/work-detail/contact preview URLs.

## 5. Security-shaped checks in CI

Bundle grep: no service-role/`re_` secrets in `.next/static` (SECURITY_GUIDELINES §4) · arbitrary-value grep (CODING_STANDARDS §7) · dependency audit at high severity · link check (internal hrefs resolve — runs on the built sitemap + crawl).

## 6. CI pipeline (GitHub Actions, blocking on `main` PRs)

```
install → lint → typecheck → unit+component (vitest) → build
       → e2e+axe (playwright, Turnstile test keys, dev Supabase)
       → bundle/secret/arbitrary greps → lighthouse-ci (Vercel preview)
```

All stages required; no skip labels. Flaky-test policy: a test that flakes twice is quarantined *with an issue* the same day — quarantine without an issue fails review.

## 7. What we deliberately don't test at v1

Visual regression snapshots (design is still moving; revisit post-launch with Playwright screenshots on the design-frozen pages) · cross-browser matrix beyond Chromium + WebKit (Playwright default) + a manual Firefox pass at launch · load testing (static + CDN).
