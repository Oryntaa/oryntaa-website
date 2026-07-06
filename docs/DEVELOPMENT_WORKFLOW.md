# DEVELOPMENT_WORKFLOW

## 1. Local setup (target: <10 minutes)

```bash
git clone git@github.com:oryntaa/oryntaa-website.git && cd oryntaa-website
corepack enable && pnpm install
cp .env.example .env.local        # fill from the team password manager (dev values)
pnpm dev                          # http://localhost:3000
```

`pnpm dev` runs env validation first — a misconfigured local env fails in seconds with named keys, not mid-feature.

## 2. Scripts (single source: package.json)

| Script | Does |
|---|---|
| `dev` / `build` / `start` | Next standard |
| `lint` / `lint:fix` | ESLint flat config |
| `typecheck` | `tsc --noEmit` |
| `test` / `test:watch` | Vitest |
| `test:e2e` | Playwright (expects `build` output) |
| `check:content` | content integrity standalone (fast feedback while writing content) |
| `check:assets` / `check:arbitrary` | budget + token guards |
| `verify` | lint + typecheck + test + check:* — run before every PR |

## 3. Git conventions

Trunk-based: short-lived branches off `main` — `feat/…`, `fix/…`, `content/…`, `docs/…`, `chore/…`. **Conventional Commits** enforced by commitlint: `feat(work): add project filter bar`, `content(insights): publish mvp-scoping article`, `docs(design-system): darken accent-text token`. `main` is protected: PR + green CI + one founder review (author ≠ reviewer). Squash-merge only; the squash title follows the same convention (it becomes the changelog line).

## 4. PR checklist (template in `.github/`)

- [ ] `pnpm verify` green locally; CI green.
- [ ] Screenshots/recording for any visual change (desktop + mobile).
- [ ] Tokens only (no arbitrary values); copy matches PAGE_SPECIFICATIONS (or updates it in this PR).
- [ ] Docs updated in the same PR for any decision this suite covers (stack, env, schema, headers, flags).
- [ ] `TODO(content)` added — not silent placeholders — for anything awaiting human input.
- [ ] Preview URL walked once by keyboard for touched pages.

Review culture: review against the docs, not taste — "this violates CODING_STANDARDS §7" ends discussions; taste debates become doc PRs.

## 5. Working with Claude Code

Sessions start by loading `CLAUDE.md` (always) + the roadmap task's named docs. One roadmap task (or tight cluster) per session/PR — small diffs review fast. The agent updates the roadmap checkboxes in its PR. Humans own: merges, content approval, design sign-off at ⛳ gates, anything touching production credentials.

## 6. Content editing flow (founders)

Structured copy: edit PAGE_SPECIFICATIONS → mirror in the content/config module → PR (docs and site move together). New project/article: CONTENT_ARCHITECTURE §7. Media: export to spec (STORAGE_ARCHITECTURE §2–3) → `public/images/...` → referenced from content → `check:assets` keeps budgets honest. Legal text changes: always via PR with the "reviewed by" note in frontmatter.

## 7. Issue hygiene

GitHub Issues with labels `bug · content · design · perf · a11y · debt`. Anything discovered mid-task that isn't the task becomes an issue, not scope creep. Weekly triage in the ops review; the roadmap tracks build order — issues track everything after.
