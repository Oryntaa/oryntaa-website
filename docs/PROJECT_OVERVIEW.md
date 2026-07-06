# PROJECT_OVERVIEW

## 1. Company

**Oryntaa** (oryntaa.com) is an AI-first software engineering company founded by four engineers, building web applications, mobile products, AI solutions, and SaaS platforms for startups, SMEs, enterprises, and public-sector organizations. Slogan: **Building Digital Futures.** Primary brand color: **#EA580C** (Sunset palette, Orbit mark).

Founding team: Muhammad Awais (Co-Founder & CEO — React, Next.js, Node.js, React Native), M Usama Manzoor (Co-Founder — Django, React, REST APIs, ML integration), Noman Mustafa (Co-Founder — React, Node.js, REST APIs, AI integrations), Muhammad Adeel Ashraf (Co-Founder — React.js, Django, REST APIs, Python). All four founders are presented equally on the site.

## 2. What this project is

The public corporate and marketing website for Oryntaa. It is a content-driven, statically rendered Next.js application with exactly one dynamic capability at v1: lead capture (contact/project inquiry form). There is no user login, no dashboard, no CMS admin at v1.

**Strategic frame (from the structure review):** Oryntaa launches tight and deep, not wide and thin. The site positions the company as *founder-led, AI-native engineering* — four senior engineers on every engagement — rather than imitating the breadth of 200-person firms. The website itself is treated as the first case study: its speed, accessibility, and craft are marketing claims, enforced by budgets in this suite.

## 3. Locked decisions this suite implements

These were resolved in the two reference documents and are not open questions during the build:

1. **v1 scope:** Home · Services overview + 6 service pages · Work grid + 4 project case studies · About · Leadership · Careers (empty state) · Insights (3 seed articles) + article template · Contact (2-step form + booking) · Legal (privacy, terms, cookies, code of conduct) · 404. Solutions and Industries branches are **deferred to v2**; their templates are not built at v1.
2. **Services (6):** AI Solutions & Automation (flagship) · Web Development · Mobile App Development · SaaS & MVP Development · UI/UX Design · Cloud & DevOps. The Services overview page targets "custom software development company."
3. **Gating rules:** Work appears in nav/homepage only when ≥3 published projects exist; Insights only when ≥3 published articles exist. Gates are computed from the content layer (see CONTENT_ARCHITECTURE §6).
4. **Work section:** Homepage features PrepNowAI, TrackRec, TruckTrader; FairSettle in the grid; Espo Paris and MASI conditional. All publication is blocked on the permissions checklist (see §5 below).
5. **Trust strategy:** honest attribution ("delivered by Oryntaa's founding team"), client-reported metrics only, real founder photos only, no stock humans, no invented stats or testimonials, no floating chat widget.
6. **Database:** Supabase PostgreSQL, minimal — a single `leads` table for form submissions, written server-side only. Answer to "does a company website need a database": yes, for exactly this — leads are the business outcome of the site and must not depend on email deliverability alone. **Supabase Storage is not used at v1** (see STORAGE_ARCHITECTURE).
7. **Analytics:** cookieless (Vercel Analytics + Speed Insights). Consequence: no cookie consent banner at v1.
8. **Visual language:** one abstract 3D/glass object family in the Sunset palette + real product UI mockups + real founder photography. No tech-blue drift — orange is unoccupied territory in the competitive set.

## 4. Deliverable definition

v1 is complete when: every route in NAVIGATION_ARCHITECTURE renders with final content, all performance/accessibility/SEO gates in their respective docs pass in CI and on production, the contact pipeline writes to Supabase and notifies by email end to end, and the launch checklist in DEPLOYMENT_GUIDE is fully checked.

## 5. Pending human inputs (do not block infrastructure work)

Tracked as content tasks in the roadmap; the build proceeds with placeholders clearly marked `TODO(content)`:

- Per-project permission status, role-scope statements, ship years, and the confirmed TrackRec metric (see `reference/oryntaa-work-section-map.md` §4).
- Founder photos, final bios, LinkedIn/GitHub URLs.
- Three cornerstone Insights articles (briefs in PAGE_SPECIFICATIONS §10).
- Booking tool account (default: Cal.com) and its URL.
- Legal page text reviewed by a professional.
- Espo Paris public-site remediation decision; MASI client permission.

## 6. How to use this suite

Claude Code executes `ROADMAP_MASTER_PLAN.md` phase by phase, keeping `CLAUDE.md` in context at all times and pulling the domain doc named by each task. Claude Design generates page UI from `DESIGN_SYSTEM.md` + the relevant `PAGE_SPECIFICATIONS.md` section, never inventing tokens. Humans review at the phase boundaries marked ⛳ in the roadmap.
