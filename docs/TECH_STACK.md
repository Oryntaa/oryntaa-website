# TECH_STACK

Locked stack. Adding, removing, or major-upgrading anything here requires updating this file in the same PR.

## 1. Core

| Layer | Choice | Rationale |
|---|---|---|
| Framework | **Next.js 15 (App Router, RSC)** | Static-first rendering, per-route metadata, image/font optimization, first-class Vercel target. Pin the latest stable 15.x at init; majors are adopted only via a dedicated migration task. |
| Language | **TypeScript (strict)** | Non-negotiable. See CODING_STANDARDS §2. |
| UI runtime | **React 19** | Ships with Next 15; `useActionState` powers form states. |
| Styling | **Tailwind CSS v4** | CSS-first `@theme` tokens make the design system the single styling source; arbitrary values are banned (CODING_STANDARDS §7). |
| Variants | **class-variance-authority + tailwind-merge + clsx** (`cn()` util) | Typed component variants; the standard pattern for every UI primitive. |
| Headless primitives | **Radix UI** (Accordion, Dialog, DropdownMenu, Tabs) | Accessibility-correct interactive behavior; fully restyled with our tokens. Used selectively — not a theme kit. |
| Motion | **Motion** (`motion` package, formerly Framer Motion) | Declarative reveals + `useReducedMotion`. Only where ANIMATION_ARCHITECTURE allows. |
| Icons | **lucide-react** | Tree-shakeable, consistent stroke; custom brand glyphs added as local SVG components. |
| Fonts | **next/font/google**: Sora (display), Inter (body/UI), JetBrains Mono (labels/data) | Self-hosted via next/font, zero layout shift. See DESIGN_SYSTEM §4. |

## 2. Content

| Concern | Choice | Rationale |
|---|---|---|
| Structured content | **Typed TS modules in `/content`, Zod-parsed at build** | Services, projects, founders, site config are code: versioned, reviewed, type-safe. No CMS overhead for a four-developer company. |
| Long-form | **MDX** via `next-mdx-remote/rsc` + `gray-matter`, frontmatter Zod-validated | Insights articles, case-study bodies, legal pages. Invalid content fails the build, not production. |
| Reading time | `reading-time` | Article metadata. |

## 3. Data & services (v1 = minimal by design)

| Concern | Choice | Rationale |
|---|---|---|
| Database | **Supabase PostgreSQL** — one `leads` table | Real need confirmed: lead capture must not depend on email deliverability. Server-side writes only; RLS denies all client access. See DATABASE_SCHEMA. |
| Object storage | **None at v1** | All media is repo-static through `next/image`. Decision + future triggers in STORAGE_ARCHITECTURE. |
| Auth | **None at v1** | No user-facing accounts. The Supabase Auth "client trinity" pattern is pre-documented in SYSTEM_ARCHITECTURE §9 for future portal work. |
| Email | **Resend + react-email** | Lead notifications with a typed template. |
| Spam defense | **Cloudflare Turnstile** + honeypot + time-trap | Privacy-friendly, no cookies, free tier. |
| Forms | **react-hook-form + Zod** (schemas shared client/server) | One schema, validated twice. |
| Booking | **Cal.com embed** (URL from config; swappable) | Lowest-friction conversion path; pending final account. |

## 4. Platform & quality

| Concern | Choice |
|---|---|
| Hosting/CD | **Vercel** — preview per PR, production on `main`. Analytics + Speed Insights enabled (cookieless). |
| Lint/format | ESLint 9 (flat config) + `typescript-eslint` strict + Prettier + `prettier-plugin-tailwindcss` |
| Tests | Vitest + React Testing Library (unit/component) · Playwright (e2e) · `@axe-core/playwright` (a11y) · Lighthouse CI (budgets) |
| Hooks/CI | Husky + lint-staged pre-commit; GitHub Actions pipeline per TESTING_STRATEGY §6 |
| Env validation | Zod-parsed `src/lib/env.ts` (fails fast at boot/build) |

## 5. Explicitly rejected (and why)

Global state libraries (Redux/Zustand) — no client-global state exists; server components + local state + URL state suffice. TanStack Query — no client data fetching at v1. CMS (Sanity/Payload/Strapi) — overhead without an editor audience; content-as-code wins for this team; revisit if non-developers must edit. GA4 — cookie consent burden and weight; cookieless analytics chosen instead. shadcn/ui as a kit — we use the same architecture (Radix + CVA) but every component is bespoke to the design system. styled-components/CSS-in-JS — conflicts with token architecture and RSC. Contentlayer — unmaintained; our Zod pipeline replaces it.

## 6. Version policy

Exact versions pinned in `package.json` (no `^` for framework-critical packages: next, react, tailwindcss). Renovate/Dependabot PRs are batched weekly; anything touching next/react/tailwind majors becomes a roadmap task with its own testing pass.
