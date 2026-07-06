# NAVIGATION_ARCHITECTURE

## 1. Route map (v1)

| Route | Page | Notes |
|---|---|---|
| `/` | Home | |
| `/services` | Services overview | SEO head-term target |
| `/services/[slug]` | 6 service pages | static params from content |
| `/work` · `/work/[slug]` | Work grid · project detail | **gated** `features.work` |
| `/about` · `/about/leadership` | About · Leadership | |
| `/careers` | Careers | empty state at launch |
| `/insights` · `/insights/[slug]` | Insights · article | **gated** `features.insights` |
| `/contact` | Contact | reads `?intent=` (`project`, `modernization`, `partnership`, `careers`, `general`); `#book` anchor |
| `/privacy` · `/terms` · `/cookies` · `/code-of-conduct` | Legal | footer-only |
| `/404` + catch-all | Not found | |

All routes are defined once in `config/routes.ts` (typed helpers: `routes.home`, `routes.service(slug)`, `routes.contact({ intent })`…). Inline path strings anywhere else fail review.

## 2. Navbar

Desktop order: **Services (dropdown) · Work · About (dropdown) · Insights · [Start a Project]**. Services dropdown: six items + "All Services" footer link — a simple dropdown, deliberately not a mega menu (see structure review; revisit at v2). About dropdown: About Oryntaa · Leadership · Careers. Gated items simply don't render when their flag is off; the layout must look intentional at 3, 4, or 5 items (nav is a flex row, not a fixed grid).

States: **top** — transparent over canvas, full height (72px) · **scrolled** (`useScrolled`, >8px) — surface bg, bottom line border, 60px height, `duration-base` transition · **active route** — 2px accent underline on the trail segment (`/services/*` marks Services). Dropdowns: Radix, open on click (not hover-only), close on ESC/outside, chevron rotates.

## 3. Mobile menu (<lg)

Logo + hamburger (44px target, `aria-expanded`, `aria-controls`). Full-screen Dialog drawer: accordion groups mirror dropdowns; single links flat; Start a Project pinned bottom, full width; body scroll locked; focus trapped; route change closes it. Current page marked with accent dot + `aria-current="page"`.

## 4. Footer (dark theme)

Column map from `config/navigation.ts`:
- **Brand** — Orbit mark + *An AI-first software engineering company building intelligent digital products for organizations worldwide.* + Start a Project button.
- **Services** — six + View All Services.
- **Company** — About · Leadership · Careers · Work* · Insights* · Contact (*gated).
- **Legal** — Privacy · Terms · Cookies · Code of Conduct.
- **Social** — LinkedIn · Instagram · Facebook (from `content/site.ts`).
Bottom bar: `© {currentYear} Oryntaa. All rights reserved.` — year computed, never typed.

## 5. Breadcrumbs

Detail pages only (service, project, article): Home → section → page. Rendered above the hero eyebrow, body-sm ink-muted; emits BreadcrumbList JSON-LD (SEO_ARCHITECTURE §5). Never on Home or top-level pages.

## 6. Cross-linking rules

Every page ends in a CtaSection (no dead ends). Service pages link related work by tag and ≤3 related services; project pages link the services used and the next project (circular order); articles link 2–3 related by category. Gated targets fall back: any link that would point at a gated route renders its fallback (`View Our Work` → `Explore Services`) via a `SmartLink` helper that consults `features`.

## 7. Redirects & URL hygiene

`www.oryntaa.com` → apex 308 (Vercel domain config). Trailing slashes normalized off. No legacy redirects needed at v1 (greenfield); adding v2 routes is purely additive — this is why deferred branches were cut rather than stubbed.

## 8. Future insertion points

v2 Solutions/Industries: new top-level items slot between Services and Work in `config/navigation.ts`; dropdown becomes mega menu only if item count demands it. i18n: `(site)` group nests under `[locale]` with `routes.ts` gaining a locale param — noted so nothing hardcodes locale-free absolute paths outside that module.
