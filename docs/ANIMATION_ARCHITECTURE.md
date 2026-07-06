# ANIMATION_ARCHITECTURE

Motion is a finishing layer (roadmap Phase 13), never load-bearing: every page is complete, comprehensible, and attractive with all animation removed — that's also exactly what reduced-motion users get.

## 1. Tokens (single source: DESIGN_SYSTEM §3)

Durations `--duration-fast|base|slow` (150/250/450ms) · easings `--ease-out-quart` (entrances/hovers), `--ease-in-out-soft` (layout shifts like accordion). No component defines its own timing values — Motion components read tokens via CSS vars.

## 2. The three sanctioned motion classes

1. **Entrances** — `Reveal` / `Stagger` (COMPONENT_LIBRARY §7): opacity 0→1 + translateY 12px→0, duration-slow, ease-out-quart, stagger 60ms, triggered once at 20% viewport intersection. Applied to: section headers, card grids, hero text block, process steps, founder grid. Never applied to: navbar, footer, form controls, legal/utility pages.
2. **Micro-interactions** — hover/press states at duration-fast: button bg + 1px lift, card shadow raise + cover scale 1.02, link arrow 2px shift, accordion chevron rotate. CSS-only (no JS) wherever possible.
3. **Ambient** — exactly two: the Horizon gradient drift (30s loop, opacity oscillation ±10%, `lg+` and `prefers-reduced-motion: no-preference` only) and whatever idle motion the hero 3D layer carries under HeroVisual's protocol (PERFORMANCE_GUIDELINES §4).

Page transitions: none at v1 — static-site navigation speed *is* the transition. Scroll-jacking, parallax, cursor effects: banned.

## 3. Implementation pattern

`Reveal` uses the `motion` library on the client with a shared IntersectionObserver; server-rendered HTML ships **visible by default** and the initial hidden state is applied only after hydration confirms motion is allowed — content is never invisible to non-JS clients, crawlers, or reduced-motion users (also protects LCP: the H1 is never inside a Reveal on any route's above-fold).

```tsx
export function Reveal({ children, delay = 0 }: RevealProps) {
  const prefersReduced = usePrefersReducedMotion();
  if (prefersReduced) return <>{children}</>;
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1], delay }}>
      {children}
    </motion.div>
  );
}
```

## 4. Reduced motion & data saving

`usePrefersReducedMotion` (matchMedia, SSR-safe) gates all three classes: entrances render inert, micro-interactions keep color changes but drop movement (pure-CSS via the `motion-safe:` variant), ambient layers don't mount. `Save-Data` additionally suppresses the hero 3D mount. There is no "animations toggle" UI — the OS preference is the toggle.

## 5. Performance rules

Transform/opacity only (no width/height/top/left animation); `will-change` never set permanently (Motion manages compositing); one shared observer via the Reveal system; ambient loops pause when `document.hidden`; accordion height animation uses Radix's CSS-var pattern (measured height, still transform-free content). Any animation implicated in an INP/CLS regression is removed first, optimized second.

## 6. Where motion is specified

PAGE_SPECIFICATIONS names *what* animates per section only where it deviates from the defaults above; otherwise the defaults apply. New motion ideas enter through this document — if it isn't one of the three classes, it doesn't ship.
