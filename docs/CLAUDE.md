# CLAUDE.md — Agent Operating Rules (oryntaa-website)

You are building the Oryntaa corporate website. The documentation suite in `/docs` is the source of truth. This file is always in context; load the docs each task names before writing code.

## Hard rules (violations = rejected PR)

1. **Tokens only.** No hex colors, px values, font names, shadows, easings, or durations in components. Everything visual comes from `styles/globals.css` `@theme` per DESIGN_SYSTEM. Tailwind arbitrary values `[...]` are banned (CI enforces).
2. **Strict TypeScript.** No `any`, no non-null `!`, no enums. Types derive from Zod schemas (`z.infer`). Exported functions declare return types.
3. **Server-first.** RSC by default; `'use client'` only at interaction leaves listed in SYSTEM_ARCHITECTURE §6. Justify any new client island in the PR.
4. **Layers point down.** app → components → features → lib → config/content. `lib`/`config` never import components. Server-only modules start with `import 'server-only'`.
5. **One DB path.** Only `features/*/repository.ts` touches Supabase, only via `lib/supabase/admin.ts`. The anon key does not exist in this project.
6. **Copy is law.** Visible text comes from PAGE_SPECIFICATIONS via content/config modules. Never invent, "improve," or hardcode copy. Missing content → render nothing or use the documented placeholder + `TODO(content):` comment.
7. **Routes from `config/routes.ts`.** No inline path strings.
8. **Gates via `config/features.ts`.** Never check content counts directly; never hardcode a gated section on or off.
9. **A11y is built in, not audited in.** Labels, focus, aria wiring, reduced-motion per ACCESSIBILITY_GUIDELINES/ANIMATION_ARCHITECTURE as you build each component.
10. **Docs move with code.** If a change contradicts a doc, update the doc in the same PR — or stop and flag the conflict instead of coding around it.

## Workflow per task

Read the ROADMAP_MASTER_PLAN task + its named docs → implement within the task's file scope → run `pnpm verify` → write/extend the tests the task lists → tick the roadmap checkbox in the PR → stop at ⛳ human-review gates.

## When uncertain

Prefer: the doc over training habits · the narrower diff · asking via PR comment over guessing. Do not add dependencies, env vars, folders, or patterns not in the docs without flagging first (TECH_STACK §6, FOLDER_STRUCTURE rules).

## Definition of done (every task)

Typecheck/lint/tests green · tokens-only styling · keyboard path works · reduced-motion respected where relevant · no console noise · roadmap checkbox ticked · docs consistent.
