# CODING_STANDARDS

## 1. Baseline

Every rule here is enforced by tooling where possible (tsconfig, ESLint, Prettier, CI) and by review where not. "It works" is not a merge criterion; "it follows this document" is.

## 2. TypeScript — strict, no ceremony exceptions

`tsconfig.json` must set: `strict: true`, `noUncheckedIndexedAccess: true`, `noImplicitOverride: true`, `exactOptionalPropertyTypes: true`, `noFallthroughCasesInSwitch: true`, `verbatimModuleSyntax: true`.

- **`any` is banned** (`@typescript-eslint/no-explicit-any`: error). Unknown input is `unknown` and must be narrowed — usually by a Zod schema, which is the project's canonical narrowing tool.
- **Non-null assertions (`!`) are banned** except in tests. Prove it or guard it.
- **Type inference is preferred locally; boundaries are explicit.** Exported functions declare return types. Component props are named `interface <Name>Props` in the same file.
- **`type` for unions/compositions, `interface` for object shapes.** Enums are banned — use `as const` objects + derived unions.
- **Derive, don't duplicate.** Types flow from Zod (`z.infer`) and from content schemas; hand-written duplicates of schema types are defects.
- Discriminated unions for all result types: `{ ok: true; data } | { ok: false; code; message }`.

## 3. React & Next conventions

- **Server Components by default.** `'use client'` appears only at interaction leaves; adding it to a section wrapper to "make things easier" is a rejected pattern.
- Components are function declarations (`export function ServiceCard(props: ServiceCardProps)`), not arrow consts.
- No `useEffect` for derivable state; effects are for real external synchronization only. Every effect carries a one-line comment naming the external system it syncs.
- Event handlers: `handleX` internally, `onX` in props.
- Images: `next/image` exclusively; every image has meaningful `alt` (or `alt=""` if decorative) and explicit `sizes` when `fill`.
- Links: internal via `next/link` + `config/routes.ts`; external links set `rel="noopener noreferrer"`.
- Keys are stable ids from content, never array index.

## 4. Naming conventions

| Thing | Convention | Example |
|---|---|---|
| Components / files | PascalCase / match export | `ProjectCard.tsx` |
| Hooks | `useX` camelCase | `usePrefersReducedMotion` |
| Server actions | verb + noun | `submitLead` |
| Zod schemas | `xSchema` | `leadInputSchema` |
| Content modules | kebab-case slug | `ai-solutions.ts` |
| Constants | SCREAMING_SNAKE in `config/constants.ts` only | `FORM_MIN_FILL_MS` |
| CSS tokens | `--category-name` | `--color-accent` |
| Booleans | `is/has/can/should` | `isGated` |
| Routes/slugs | kebab-case | `/saas-mvp-development` |

## 5. Imports

Order (ESLint-enforced): node builtins → external → `@/config` → `@/lib` → `@/features` → `@/components` → relative → styles. Path alias `@/*` → `src/*`; no `../../..` chains. No default exports except Next-required files (`page`, `layout`, `route`, `error`, `not-found`).

## 6. Reusability & separation rules

- The **CVA pattern** is the only way UI variants exist (see COMPONENT_LIBRARY §2 for the canonical Button). Boolean-prop styling forks (`primary?: boolean`) are banned.
- The **repository pattern** is the only way the database is touched; the **service layer** is the only place persistence and notification are orchestrated; **actions** only validate, call the service, and shape the response (API_ARCHITECTURE).
- Copy-pasting a block a second time is the signal to extract it — into `sections/shared`, `ui`, or `lib` per FOLDER_STRUCTURE placement rules — in that same PR.

## 7. No hardcoded values — the two bans

1. **Design values.** No hex colors, px sizes, font names, shadows, easings, or durations outside `styles/globals.css` `@theme`. Tailwind **arbitrary values (`h-[37px]`, `text-[#EA580C]`) are banned**; a CI grep (`scripts/check-arbitrary.mjs`) fails the build on `\[[^\]]*\]` inside `className` except the whitelisted `data-[...]`/`aria-[...]` variants. If a needed value is missing, add a token first.
2. **Config values.** No magic numbers/strings in logic. Limits, timings, external URLs, and feature parameters live in `config/constants.ts` or `content/site.ts`; env-dependent values go through `lib/env.ts`.

## 8. Validation & error handling

All external input (form fields, search params, env, MDX frontmatter) passes through Zod before use — parse at the boundary, trust types inside. Errors: never swallow; either handle meaningfully or log via `lib/logger` and rethrow/return a typed failure. `console.log` is banned outside `logger.ts` (ESLint `no-console`).

## 9. Comments & docs

Comments explain *why*, not *what*. Every exported function in `lib/` and `features/*/service|repository` gets a one-to-three-line JSDoc. `TODO(content): …` marks pending human inputs and is greppable; `TODO` without a scope tag fails lint.

## 10. Formatting & hygiene

Prettier owns formatting (no debates): 2-space, single quotes, no semicolons debate — semicolons **on**, printWidth 100, `prettier-plugin-tailwindcss` sorts classes. Dead code is deleted, not commented out. Files > ~250 lines are a smell to split. Commits follow Conventional Commits (DEVELOPMENT_WORKFLOW §3).
