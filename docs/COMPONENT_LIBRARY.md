# COMPONENT_LIBRARY

Engineering contract for every reusable component. Visual values come from DESIGN_SYSTEM tokens; this file defines anatomy, variants, props, states, and accessibility duties. Build order follows ROADMAP Phase 2/4.

## 1. Principles

Primitives (`components/ui`) are Oryntaa-agnostic and token-driven. Cards and sections are content-aware and typed against `lib/content` types. Every interactive component ships with: keyboard support, visible focus, disabled state, and (where async) pending state. Every component gets a colocated `.test.tsx` covering variants and a11y basics.

## 2. Canonical CVA pattern (Button — the reference implementation)

```tsx
// components/ui/Button.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md font-medium ' +
    'transition-[background-color,transform] duration-fast ease-out-quart ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ' +
    'disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-accent-contrast hover:bg-brand-500 active:translate-y-px',
        secondary: 'border border-ink text-ink hover:bg-ink hover:text-canvas',
        ghost: 'text-accent-text hover:underline underline-offset-4',
      },
      size: {
        sm: 'h-10 px-4 text-body-sm',
        md: 'h-11 px-5 text-body',
        lg: 'h-12 px-6 text-body',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean; // Radix Slot for link-as-button
}
```

Every variant-bearing component in the system replicates this shape. `ButtonLink` wraps it with `next/link` + `routes.ts`.

## 3. Primitive inventory (`components/ui`)

| Component | Variants / notes | A11y duties |
|---|---|---|
| Button / ButtonLink | §2; optional `icon` slot, `isPending` swaps to spinner + `aria-busy` | focus ring, disabled semantics |
| Eyebrow | accent rule + mono uppercase; `as` polymorphic | decorative rule `aria-hidden` |
| Heading | `level` 1–4 × `size` display-* (visual size decoupled from level) | correct heading levels only |
| Badge / Tag | neutral · accent · outline | — |
| Card | container primitive: `padding`, `interactive` (hover elevation) | interactive card = single `<a>` wrapper, no nested links |
| Accordion | Radix; single-open; chevron rotates duration-base | Radix-native; respects reduced motion |
| Dialog | Radix; used for mobile menu variant | focus trap, ESC, `aria-label` |
| Tabs | Radix; work-filter fallback style | roving tabindex native |
| Input / Textarea / Select / Checkbox / RadioGroup | label always rendered; `error?: string` renders message | `aria-invalid`, `aria-describedby` wired to error id |
| Prose | MDX typographic wrapper (prose.css) | — |
| Skeleton | shimmer disabled under reduced motion | `aria-hidden` |
| VisuallyHidden / SkipLink | — | skip link is first tabbable |

## 4. Layout (`components/layout`)

- **Container** — `size: content | wide`; gutters per DESIGN_SYSTEM §5.
- **Section** — the page building block: `theme: light | dark` (sets `data-theme`), `spacing: default | tight`, optional `id` for anchors. All vertical rhythm comes from here; sections never hand-roll padding.
- **SectionHeader** — Eyebrow + Heading + optional lede + optional action slot (right-aligned lg+, stacked below md).
- **Navbar** — server shell + client island; states: top (transparent over canvas), scrolled (surface bg, line border, reduced height), route-active underline in accent; `useScrolled` hook. Renders from `config/navigation.ts` with flags applied.
- **MobileMenu** — Dialog-based full-screen drawer; accordion groups mirror desktop dropdowns; CTA pinned bottom.
- **Footer** — column map from `config/navigation.ts`; dark theme; dynamic year; social links from `content/site.ts`.
- **Breadcrumbs** — detail pages only (work, insights, services); emits BreadcrumbList JSON-LD via `lib/seo`.

## 5. Cards (`components/cards`) — all typed against content types

| Card | Content type | Anatomy |
|---|---|---|
| ServiceCard | `Service` | 3D-still icon 40px → title → one-liner → up-to-3 capability tags → arrow affordance; whole card links |
| ProjectCard | `ProjectMeta` | cover (16:10, radius-xl) → name + type badge → summary → tech tags; hover: cover scales 1.02 |
| FeaturedProjectCard | `ProjectMeta` | large split layout for homepage row; mockup media slot |
| ArticleCard | `ArticleMeta` | cover (optional) → category badge → title → excerpt → date · read time |
| FounderCard | `Founder` | photo (4:5, radius-lg) → name → role → focus line → LinkedIn/GitHub icons; grid renders all four identically |
| StageCard | `Stage` (config) | quoted stage title (display-sm) → 2-line description → path link; the quote styling is the section's device |
| PrincipleCard / ValueCard | config | title + body, borderless list style |
| JobCard | `Opening` | title, dept, location, type → arrow |

## 6. Shared sections (`components/sections/shared`)

- **CtaSection** — dark; Horizon gradient; heading + two buttons; `intent` prop appends `?intent=` to contact route.
- **ProcessSteps** — 5 steps; numbered (sequence is real information); vertical on mobile, horizontal connected line lg+; structure supports future sticky-scroll without rewrite (each step is an independent block).
- **StackStrip** — "Engineering with a modern, proven stack" + monochrome logo row (ink-muted, hover ink); logos from `content/site.ts`; explicitly labeled stack, not partners.
- **RelatedGrid** — generic 3-up grid taking any card renderer (related services/work/articles).
- **FaqAccordion** — Accordion + FAQPage JSON-LD emission hook.
- **IndustriesStrip** — static, unlinked industry names as tags (evidence-backed list from PAGE_SPECIFICATIONS §2.5).

## 7. Motion components (`components/motion`)

- **Reveal** — wraps children; IntersectionObserver once; rise+fade per DESIGN_SYSTEM §9; renders inert (visible) when `prefers-reduced-motion`.
- **Stagger** — orchestrates child Reveals at 60ms offsets.
- **HeroVisual** — the 3D slot: lazy-mounts after LCP on lg+ capable devices; ships `fallback` still (priority-loaded, is never the LCP element — the H1 is); degrades silently on error; obeys save-data and reduced-motion. Budget per PERFORMANCE_GUIDELINES §4.

## 8. Form components (`features/contact/components`)

- **RouteSelector** — pill radio group (Start a Project / General / Partnership / Careers / Something else); presets from `?intent=`; switching routes swaps form variant without losing shared fields.
- **ContactForm** — `useMultiStepForm` (2 steps for project route; single step otherwise); react-hook-form + zodResolver on shared `leadInputSchema`; hidden honeypot field (`company_website`, visually hidden, tab-skipped); `startedAt` timestamp for the time-trap; Turnstile widget mounts step 2; submit via `useActionState(submitLead)` — pending disables + `aria-busy`; server `fieldErrors` map back to inputs; **entered values are never cleared on failure**.
- **SuccessState / ErrorState** — replace the form in-place per PAGE_SPECIFICATIONS §11 copy; success fires `form_submit` analytics event.
- **BookingEmbed** — lazy iframe (Cal.com) behind a click-to-load facade showing provider + "opens booking" note; only if `features.booking`.

## 9. MDX map (`components/mdx`)

h2/h3 (anchor-linked), p, ul/ol, blockquote (accent left rule), `Figure` (Image + caption), `CodeBlock` (Shiki at build, copy button, mono), `Callout` (`type: note | insight | warning`), `Table` wrapper (scrollable), hr. Registered once in `lib/content/mdx.ts`; articles and case studies share the map.

## 10. Definition of done per component

Token-only styling (arbitrary-value check passes) · all variants rendered in the test file · keyboard path verified · reduced-motion behavior implemented where animated · dark-section rendering verified for anything used inside `theme="dark"` · no content strings hardcoded (props or content layer only).
