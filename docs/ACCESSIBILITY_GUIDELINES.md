# ACCESSIBILITY_GUIDELINES

Target: **WCAG 2.1 AA** across the site, verified by automated gates (axe in Playwright — zero serious/critical) plus the manual pass in §7. Accessibility failures are release blockers, same class as broken builds.

## 1. Color & contrast (locked in DESIGN_SYSTEM §2)

Normal text ≥ 4.5:1, large text/graphics ≥ 3:1. The system pre-solves the risky pairs: accent text on light = brand-700; button = brand-600 bg + ink text; dark-section accent = brand-400; ink-muted (neutral-600 on canvas ≈ 7:1) is the floor for meta text. **Color is never the only signal** — errors pair color with icon + message; active nav pairs color with the underline; links inside prose are underlined.

## 2. Keyboard

Everything interactive is reachable and operable by keyboard in a logical order. Skip link ("Skip to content") is the first tabbable element. Focus is always visible: the 2px accent outline token — never `outline: none` without a replacement. Radix supplies correct patterns for menus/accordions/dialogs (arrow keys, ESC, focus trap in MobileMenu, focus return on close). The multi-step form moves focus to the step heading on step change; the success/error state receives focus on render.

## 3. Semantics & structure

Landmarks: `header` / `nav aria-label="Main"` / `main id="content"` / `footer`. One `h1` per page; levels never skip (Heading component decouples size from level to make this easy, not to excuse skipping). Cards use a single real link (no nested/duplicate links, no click-handler divs); icon-only buttons carry `aria-label`; decorative images/rules are `alt=""`/`aria-hidden`. Breadcrumbs are a `nav aria-label="Breadcrumb"` with `aria-current="page"`.

## 4. Forms (the highest-stakes surface)

Every control has a visible `<label>` (placeholders never substitute). Errors: message rendered adjacent, linked via `aria-describedby`, control gets `aria-invalid`; on failed submit, focus moves to an error summary at top listing links to each invalid field; server errors use the same wiring. Required fields marked in the label (not color alone). Consent checkbox is a real checkbox with the full statement as its label. Pending submit: button disabled + `aria-busy` + visible spinner with text ("Sending…"). Turnstile's accessible mode enabled. Multi-step: step indicator announces "Step 2 of 2" via `aria-live="polite"`.

## 5. Media & motion

Meaningful images get descriptive alt written with the content (project shots describe what the UI shows). The hero 3D is decorative: `aria-hidden`, still fallback included. `prefers-reduced-motion` is honored globally (ANIMATION_ARCHITECTURE §4): reveals render static, Horizon drift off, accordion/menu transitions become instant. No autoplaying video, no parallax at v1.

## 6. Content accessibility

Link text describes destinations; the mono uppercase eyebrows use CSS `text-transform` (source text stays sentence case for screen readers); reading order matches visual order (mobile order rule guarantees the DOM leads with the message); `lang="en"` on `<html>`; viewport meta permits zoom (`user-scalable` never disabled); touch targets ≥ 44px.

## 7. Verification

Automated per PR: `@axe-core/playwright` on every top-level route + one of each template; zero serious/critical. Manual per phase-close (checklist in ROADMAP): full keyboard walk of the page, VoiceOver pass on hero→CTA and the entire contact flow, 200% zoom layout check, reduced-motion visual check. Launch checklist repeats the manual pass on production.
