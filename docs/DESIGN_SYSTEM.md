# DESIGN_SYSTEM

The single visual contract for the site. Claude Design generates UI from this document plus the relevant PAGE_SPECIFICATIONS section; Claude Code implements it as tokens in `styles/globals.css` `@theme`. **No value that isn't in this document may appear in generated design or code.**

## 1. Art direction

**Positioning to express:** founder-led, AI-native engineering. Premium through precision — generous whitespace, disciplined type, one bold material — never through clutter or fake scale.

**The differentiating move:** the entire competitive set is blue (Techverx, Arbisoft, NETSOL) or red (SSI). Oryntaa owns **warm light + sunset orange + warm ink**. Do not drift toward tech blue, and do not soften into the generic cream-and-terracotta look — our canvas is a near-white warm neutral, our display face is a geometric grotesque (not a serif), and our orange is saturated and structural, not decorative.

**Signature element — the Horizon.** A soft sunset-gradient light band (accent → transparent, very low opacity, large blur) that sits behind the hero visual and returns in the final CTA section, evoking the Orbit mark and "Building Digital Futures." It is the one recurring atmospheric device; everything else stays flat and precise. Use it exactly twice per page maximum.

**Visual material system (three sources only):**
1. One abstract 3D object family — glass/ceramic sculptural forms tinted in the Sunset ramp on warm neutrals — used for the hero and as section icon stills. Same material, lighting, and camera language everywhere.
2. Real product UI, framed in device/browser mockups (M Techub-style) for all Work media.
3. Real founder photography (consistent treatment: warm neutral backdrop, soft light). **No stock humans, no robot/brain imagery, no cityscapes, ever.**

## 2. Color tokens

Brand ramp (`--color-brand-*`) adopts the Tailwind orange scale — chosen because #EA580C *is* its 600 step, giving a mathematically consistent ramp:

| Token | Hex | | Token | Hex |
|---|---|---|---|---|
| brand-50 | #FFF7ED | | brand-500 | #F97316 |
| brand-100 | #FFEDD5 | | **brand-600** | **#EA580C** |
| brand-200 | #FED7AA | | brand-700 | #C2410C |
| brand-300 | #FDBA74 | | brand-800 | #9A3412 |
| brand-400 | #FB923C | | brand-900 / 950 | #7C2D12 / #431407 |

Neutral ramp (`--color-neutral-*`) = Tailwind **stone** (warm grey): 50 #FAFAF9 · 100 #F5F5F4 · 200 #E7E5E4 · 300 #D6D3D1 · 400 #A8A29E · 500 #78716C · 600 #57534E · 700 #44403C · 800 #292524 · 900 #1C1917 · 950 #0C0A09.

**Semantic tokens** (the only names components use). Light is default; dark sections override via `data-theme="dark"` on `<Section>`:

| Semantic | Light | Dark section |
|---|---|---|
| `--color-canvas` | neutral-50 | neutral-950 |
| `--color-surface` | #FFFFFF | neutral-900 |
| `--color-ink` | neutral-950 | neutral-50 |
| `--color-ink-muted` | neutral-600 | neutral-400 |
| `--color-line` | neutral-200 | neutral-800 |
| `--color-accent` | brand-600 | brand-500 |
| `--color-accent-text` (text/links on canvas) | brand-700 | brand-400 |
| `--color-accent-contrast` (text ON accent) | neutral-950 | neutral-950 |
| `--color-success` / `--color-error` | #15803D / #B91C1C | #4ADE80 / #F87171 |

**Contrast decisions (locked, verified):** body/interactive orange text on light uses **brand-700** (≈4.7:1 on canvas — AA); brand-600 on light is display/large-text and graphics only (≈3.2:1). Primary buttons are **brand-600 background with ink (neutral-950) text** (≈6.5:1 — AA, and a distinctive sunset look); never white text on brand-600 at body sizes. On dark sections, accent text is brand-400.

Gradient token: `--gradient-horizon: radial-gradient(60% 50% at 50% 100%, color-mix(in oklab, var(--color-brand-500) 22%, transparent), transparent 70%)`.

## 3. Implementation of tokens (Tailwind v4)

All of §2, §4–§7 live in `styles/globals.css`:

```css
@import "tailwindcss";
@theme {
  --color-brand-600: #EA580C; /* …full ramps + semantics per §2 */
  --font-display: var(--font-sora);
  --font-body: var(--font-inter);
  --font-mono: var(--font-jetbrains);
  --radius-sm: 0.375rem; --radius-md: 0.625rem;
  --radius-lg: 1rem;     --radius-xl: 1.5rem;
  --shadow-card: 0 1px 2px rgb(12 10 9 / 0.05), 0 8px 24px -12px rgb(12 10 9 / 0.12);
  --shadow-raised: 0 2px 4px rgb(12 10 9 / 0.06), 0 16px 40px -16px rgb(12 10 9 / 0.18);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-in-out-soft: cubic-bezier(0.45, 0, 0.15, 1);
  --duration-fast: 150ms; --duration-base: 250ms; --duration-slow: 450ms;
}
[data-theme="dark"] { /* semantic overrides per §2 */ }
```

Components consume semantics (`bg-canvas`, `text-ink`, `text-accent-text`), never raw ramp steps except in explicitly decorative gradients.

## 4. Typography

| Role | Face | Usage |
|---|---|---|
| Display | **Sora** (600/700) | H1–H3, stats, card titles. Tight tracking (-0.02em) at display sizes. |
| Body/UI | **Inter** (400/500/600) | Paragraphs, nav, buttons, forms. |
| Utility | **JetBrains Mono** (400/500) | Eyebrow labels (uppercase, +0.08em tracking), data details, code. The mono eyebrow is a house signature — every section header carries one. |

Fluid scale (tokens `--text-*`, clamp-based):

| Token | Size | Use |
|---|---|---|
| display-xl | clamp(2.75rem, 1.6rem + 4.6vw, 4.75rem) / 1.05 | Home H1 |
| display-lg | clamp(2.25rem, 1.5rem + 3vw, 3.5rem) / 1.1 | Page H1 |
| display-md | clamp(1.75rem, 1.35rem + 1.6vw, 2.5rem) / 1.15 | Section H2 |
| display-sm | clamp(1.375rem, 1.2rem + 0.7vw, 1.75rem) / 1.25 | H3 / card titles |
| body-lg / body / body-sm | 1.125 / 1 / 0.875rem, lh 1.65 | Lede / default / meta |
| eyebrow | 0.8125rem, lh 1, uppercase mono | Section labels |

Prose (articles/case studies): max-width 68ch, body-lg, headings per scale, styled in `prose.css`.

## 5. Space, layout, radius, elevation

- Spacing uses the default 4px Tailwind scale; **section rhythm tokens**: `--space-section: clamp(4.5rem, 3rem + 6vw, 8rem)` vertical padding for every `<Section>`; intra-section gaps 24/32/48.
- **Container**: content max-width 72rem (1152px), wide variant 80rem for the work grid; gutters 1.25rem mobile / 2rem tablet / 2.5rem desktop. 12-column mental grid on desktop, stacking per PAGE_SPECIFICATIONS mobile orders.
- **Radius**: cards `--radius-lg`, buttons/inputs `--radius-md`, media `--radius-xl`, pills full. **Borders**: 1px `--color-line`; cards are border-first, shadow-second (`--shadow-card` on hover → `--shadow-raised`). Flat, precise, no glassmorphism blur panels.

## 6. Component visual rules (engineering spec in COMPONENT_LIBRARY)

- **Buttons** — primary: accent bg / accent-contrast text / radius-md / 44px min height / hover brand-500 + translate-y-[-1px] equivalent via token · secondary: transparent, 1px ink border, ink text (dark sections: surface border/ink inverted) · link: accent-text + arrow glyph that shifts 2px on hover. Focus: 2px offset ring in accent — always visible.
- **Cards** — surface bg, line border, radius-lg, 28–32px padding; icon slot top (3D still, 40px), title display-sm, body ink-muted; whole card is the link with inner arrow affordance.
- **Eyebrow** — mono, accent-text, preceded by a 16px rule in accent.
- **Inputs** — surface bg, line border, radius-md, 48px height, label always visible above (no placeholder-as-label), error text + border in `--color-error`, described-by wiring per ACCESSIBILITY_GUIDELINES.
- **Dark sections** — exactly the sections PAGE_SPECIFICATIONS marks dark (home AI-First, final CTA, footer). Never two adjacent dark sections.

## 7. Iconography & illustration

Lucide at 1.5px stroke, 20/24px, `--color-ink` (or accent when meaningful). Section-identity icons are **3D stills from the object family**, not line icons. The Orbit mark: clear space = mark height ×0.5; never recolored outside brand-600/ink/white; favicon + OG derive from `/public/brand`.

## 8. Responsive rules

Breakpoints: Tailwind defaults (sm 640 / md 768 / lg 1024 / xl 1280). Mobile order is law: heading → supporting text → CTAs → visual (a visual never precedes the message it supports). Grids collapse 3→2→1 (cards) and 2→1 (split heroes); nav becomes the drawer at <lg; touch targets ≥44px; the hero 3D simplifies to its static still below md and under reduced-motion/save-data.

## 9. Motion (visual intent — engineering in ANIMATION_ARCHITECTURE)

Subtle-to-moderate. Entrances: 12px rise + fade, `--duration-slow`, `--ease-out-quart`, staggered 60ms, once per element. Hovers: `--duration-fast`. The Horizon gradient may drift almost imperceptibly (30s loop) on capable devices only. Nothing moves that carries meaning; the page is complete with all motion off.

## 10. Claude Design handoff protocol

When generating any page: (1) load this file + that page's PAGE_SPECIFICATIONS section; (2) use only §2 colors, §4 type, §5 spacing/radius/shadows — if a needed value is missing, flag it, don't invent it; (3) respect section order, dark-section assignments, and mobile order exactly; (4) put every eyebrow in mono uppercase with the accent rule; (5) primary buttons are orange-with-ink-text — never white-on-orange body text; (6) reserve the hero visual slot with the static-fallback framing; (7) copy comes from PAGE_SPECIFICATIONS verbatim — improve nothing silently; (8) the Horizon appears in hero + final CTA only. Output should look like one designer built every page.
