# oryntaa-website

The Oryntaa corporate website (oryntaa.com). Next.js 15 (App Router, RSC) · TypeScript (strict) · Tailwind CSS v4.

The documentation suite in [`docs/`](./docs) is the single source of truth. Start with [`docs/CLAUDE.md`](./docs/CLAUDE.md) and [`docs/ROADMAP_MASTER_PLAN.md`](./docs/ROADMAP_MASTER_PLAN.md).

## Local setup

```bash
corepack enable && pnpm install
cp .env.example .env.local   # fill from the team password manager (dev values)
pnpm dev                     # http://localhost:3000
```

`pnpm dev` runs env validation first — a misconfigured local env fails fast with named keys.

## Scripts

| Script | Does |
|---|---|
| `dev` / `build` / `start` | Next standard |
| `lint` / `lint:fix` | ESLint 9 flat config |
| `typecheck` | `tsc --noEmit` |
| `test` / `test:watch` | Vitest + RTL |
| `test:e2e` | Playwright |
| `check:content` / `check:assets` / `check:arbitrary` | content, budget, and token guards |
| `verify` | lint + typecheck + test + `check:*` — run before every PR |

See [`docs/DEVELOPMENT_WORKFLOW.md`](./docs/DEVELOPMENT_WORKFLOW.md) for the full workflow, Git conventions, and PR checklist.

