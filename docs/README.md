# Oryntaa Website — Documentation Suite v1

Production documentation for the Oryntaa corporate website (oryntaa.com). This suite is the single source of truth for building the site with Claude Code and generating UI with Claude Design. It supersedes the original grey-structure document where they conflict, and incorporates the decisions from `oryntaa-structure-review.md` and `oryntaa-work-section-map.md` (kept in `/reference`).

## Read order for AI agents

1. `CLAUDE.md` — hard rules, always in context
2. `PROJECT_OVERVIEW.md` → `PRODUCT_REQUIREMENTS.md` — what and why
3. `TECH_STACK.md` → `SYSTEM_ARCHITECTURE.md` → `FOLDER_STRUCTURE.md` — how, structurally
4. `CODING_STANDARDS.md` — how, at the line level
5. `DESIGN_SYSTEM.md` → `COMPONENT_LIBRARY.md` — the visual and component contract
6. `PAGE_SPECIFICATIONS.md` → `CONTENT_ARCHITECTURE.md` → `NAVIGATION_ARCHITECTURE.md` — pages, content, routes
7. Domain docs as the task requires (API, database, SEO, performance, etc.)
8. `ROADMAP_MASTER_PLAN.md` — the execution plan; every build session starts here

## File index

| File | One line |
|---|---|
| CLAUDE.md | Agent operating rules for the repository |
| PROJECT_OVERVIEW.md | Company, positioning, project definition, doc map |
| PRODUCT_REQUIREMENTS.md | Scope, functional and non-functional requirements, launch criteria |
| TECH_STACK.md | Locked stack with rationale and version policy |
| SYSTEM_ARCHITECTURE.md | Rendering model, data flow, boundaries, feature flags |
| FOLDER_STRUCTURE.md | Full repository tree and placement rules |
| CODING_STANDARDS.md | TypeScript, React, naming, and quality rules |
| DESIGN_SYSTEM.md | Tokens, color, type, art direction; Claude Design handoff |
| COMPONENT_LIBRARY.md | Every reusable component: anatomy, variants, props |
| PAGE_SPECIFICATIONS.md | Every v1 page, section by section, with copy |
| CONTENT_ARCHITECTURE.md | Content-as-code collections, schemas, gating |
| NAVIGATION_ARCHITECTURE.md | Nav config, routes, gating, footer, active states |
| API_ARCHITECTURE.md | Server actions, route handlers, mutation pipeline |
| API_DOCUMENTATION.md | Concrete actions and endpoints |
| DATABASE_SCHEMA.md | Supabase schema (leads), RLS, retention |
| SUPABASE_SETUP.md | Project provisioning and key handling |
| STORAGE_ARCHITECTURE.md | Static asset strategy; why no object storage at v1 |
| ENVIRONMENT_VARIABLES.md | Every variable, validation, per-environment values |
| SECURITY_GUIDELINES.md | Headers, form abuse, secrets, PII |
| PERFORMANCE_GUIDELINES.md | Budgets and enforcement; the site is the case study |
| SEO_ARCHITECTURE.md | Metadata factory, sitemap, structured data, OG |
| ACCESSIBILITY_GUIDELINES.md | WCAG 2.1 AA implementation rules |
| ANIMATION_ARCHITECTURE.md | Motion tokens, reveal system, reduced motion |
| ANALYTICS_ARCHITECTURE.md | Cookieless analytics and event taxonomy |
| LOGGING_MONITORING.md | Logger, error capture, alerting |
| TESTING_STRATEGY.md | Unit, component, e2e, a11y, CI gates |
| DEPLOYMENT_GUIDE.md | Vercel setup, domains, environments, launch |
| DEVELOPMENT_WORKFLOW.md | Git, PRs, local setup, content editing |
| ROADMAP_MASTER_PLAN.md | Phases → steps → tasks with dependencies |

## Requirement traceability

Every mandated engineering requirement maps to an owning document: scalable architecture → SYSTEM_ARCHITECTURE; maintainable codebase / consistent naming / strict TypeScript → CODING_STANDARDS; production-ready structure / folder structure / feature-based architecture → FOLDER_STRUCTURE; reusable components / reusable UI system → COMPONENT_LIBRARY; reusable business logic, hooks, services / separation of concerns / clean architecture → SYSTEM_ARCHITECTURE §5 + CODING_STANDARDS §6; code splitting / caching / performance → PERFORMANCE_GUIDELINES; constants and config system / no hardcoded design values / centralized theme → DESIGN_SYSTEM §2 + CODING_STANDARDS §7; environment handling → ENVIRONMENT_VARIABLES; strong validation → API_ARCHITECTURE §3 + CONTENT_ARCHITECTURE §4; reusable database access layer → API_ARCHITECTURE §5 + DATABASE_SCHEMA; state management / optimistic updates → SYSTEM_ARCHITECTURE §6; scalable authentication flow → SYSTEM_ARCHITECTURE §9 (deferred pattern); logging strategy → LOGGING_MONITORING; security → SECURITY_GUIDELINES; responsive layouts → DESIGN_SYSTEM §8 + PAGE_SPECIFICATIONS; animation architecture → ANIMATION_ARCHITECTURE; feature flags → SYSTEM_ARCHITECTURE §7 + CONTENT_ARCHITECTURE §6; future scalability → SYSTEM_ARCHITECTURE §10.
