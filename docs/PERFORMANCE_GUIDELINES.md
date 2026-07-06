# PERFORMANCE_GUIDELINES

The site's speed is a marketing claim ("the site is the first case study"). Budgets are therefore product requirements with CI enforcement, not aspirations.

## 1. Budgets (hard gates)

| Metric | Budget | Where enforced |
|---|---|---|
| LCP | ≤ 1.8s p75 mobile | Lighthouse CI (lab) + Speed Insights (field) |
| CLS | ≤ 0.05 | same |
| INP | ≤ 200ms | field (Speed Insights); lab TBT ≤ 200ms proxy |
| Route JS | ≤ 160KB gzip per route | `next build` output check in CI |
| Lighthouse Performance | ≥ 95 (home, service, work detail, contact) | Lighthouse CI budgets file |
| Any single image | per STORAGE_ARCHITECTURE §3 caps | pre-commit script |
| Hero visual (3D + still + runtime) | ≤ 400KB total, never the LCP element | HeroVisual review + LCP assertion in e2e |

`lighthouserc.json` pins these; a red budget blocks merge exactly like a failing test.

## 2. Rendering & code-splitting strategy

Static-first (SYSTEM_ARCHITECTURE §2) means TTFB is CDN-bound; the fight is client JS. Rules: server components by default — a `'use client'` addition in review requires justification; route-level splitting is automatic, and below-fold interactive islands (BookingEmbed, HeroVisual, work FilterBar on mobile) load via `next/dynamic`; Radix imports are per-primitive; lucide icons imported individually; **no barrel-file imports of icon/large libs**. Third-party script policy: Vercel Analytics + Turnstile only; Turnstile loads on the contact route only; anything else needs a documented case here.

## 3. Assets

Fonts: three families, subset latin, `display: swap` via next/font (self-hosted, preloaded automatically); ≤ 2 weights display, ≤ 3 body, 1–2 mono. Images: next/image everywhere with accurate `sizes`; `priority` on exactly one image per route (and only if it's actually the LCP candidate); AVIF-first. The Horizon gradient is CSS, not an image. 3D stills exported at 2× display size max.

## 4. The hero visual protocol

The H1 text is the designed LCP element — it renders instantly from server HTML. HeroVisual: static still paints first (plain `next/image`, not priority unless measured otherwise); the animated/3D layer lazy-mounts after `requestIdleCallback` + `lg` viewport + no `prefers-reduced-motion` + no `Save-Data`; failure → still remains, silently. If the 3D asset can't hit 400KB, it ships as the still only — the design degrades gracefully by construction.

## 5. Runtime discipline

Animations use transform/opacity only (ANIMATION_ARCHITECTURE §5); IntersectionObservers are shared via the Reveal system, not per-component; no layout reads in scroll handlers (`useScrolled` uses a passive listener + rAF); accordions/dialogs render content lazily (`forceMount` off). Long lists don't exist at v1 (grids ≤ ~12 items); virtualization is a non-goal.

## 6. Verification cadence

Per PR: Lighthouse CI on the four key routes (preview URL) + bundle size diff comment. Weekly post-launch: Speed Insights review against §1; regressions become bugs with the offending commit range attached. Before launch: WebPageTest run on a mid-tier Android profile, 4G — the launch checklist includes its filmstrip.
