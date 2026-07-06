# PRODUCT_REQUIREMENTS

## 1. Goals

G1. Convert qualified visitors into project conversations (form submission or booked call).
G2. Make Oryntaa's positioning — founder-led, AI-first engineering — legible within 5 seconds of landing.
G3. Substantiate every capability claim with real evidence (projects, standards, named founders).
G4. Rank organically for the consolidated service terms over time (SEO_ARCHITECTURE).
G5. Function as a proof-of-craft artifact: the site's own quality is a sales asset.

## 2. Audiences

Primary: startup founders and product owners evaluating a build partner; SME/enterprise decision-makers evaluating AI capability. Secondary: recruiters/candidates, partners, and clients performing due diligence on the founders. The site must survive due diligence: nothing published may be unverifiable in a sales call.

## 3. Functional requirements by area

**FR-1 Global.** Responsive navbar (top and scrolled states, mobile drawer, active route indication), footer, skip link, 404, consistent CTA system (`Start a Project` primary → `/contact?intent=project`; `Book a Call` secondary → `/contact#book`; exploratory links per page). Gated nav items (Work, Insights) appear only when their content gates pass.

**FR-2 Home.** Eleven-section flow per PAGE_SPECIFICATIONS §2, with Selected Work and Insights sections gated. Hero reserves a 3D visual slot with static-image fallback and reduced-motion behavior.

**FR-3 Services.** Overview page with six service cards + engagement models section; six service detail pages generated from one template fed by the content layer, each with hero, overview, problems-we-solve, capabilities, approach, technologies, related work (dynamic by tag), related services (max 3), FAQ accordion, final CTA.

**FR-4 Work.** Grid with category filters (All / Web / Mobile / AI / SaaS) driven by URL state; project detail template per PAGE_SPECIFICATIONS §5; per-project fields per CONTENT_ARCHITECTURE. Only projects with `status: published` and `permission: granted` render.

**FR-5 About / Leadership / Careers.** About with story, principles, mission/vision, How We Build (engineering standards), leadership preview. Leadership page presents four founders with equal visual weight. Careers renders the empty state when no open roles exist in content.

**FR-6 Insights.** List page with featured article + grid; MDX article template supporting H2/H3, lists, quotes, images, code blocks, tables, callouts; author block, read time, related articles.

**FR-7 Contact.** Route selector (Start a Project / General / Partnership / Careers / Something else) that shapes the form; 2-step project form (Step 1: name*, email*, company, country; Step 2: services multi-select*, stage, timeline, budget [optional], message*, consent*); client + server Zod validation; honeypot + time-trap + Turnstile; persisted to Supabase; email notification via Resend; success and error states that never discard user input; embedded booking (`#book`); response-time promise copy; FAQ accordion. No file attachment at v1.

**FR-8 Legal.** Privacy, Terms, Cookies, Code of Conduct rendered from MDX with last-updated date and table of contents. Placeholder text is clearly marked pending legal review.

## 4. Non-functional requirements (hard gates)

| Area | Requirement | Enforced by |
|---|---|---|
| Performance | LCP ≤ 1.8s (p75 mobile), CLS ≤ 0.05, INP ≤ 200ms; route JS ≤ 160KB gz; hero visual ≤ 400KB and never the LCP element | PERFORMANCE_GUIDELINES, Lighthouse CI |
| Accessibility | WCAG 2.1 AA; zero serious/critical axe violations; full keyboard operability | ACCESSIBILITY_GUIDELINES, Playwright+axe |
| SEO | Unique metadata per route, valid JSON-LD, sitemap/robots, canonical | SEO_ARCHITECTURE |
| Security | CSP + security headers, spam controls, server-only secrets, RLS deny-by-default | SECURITY_GUIDELINES |
| Reliability | Form pipeline observable end to end; failed submissions logged and alerting | LOGGING_MONITORING |
| Quality | Type-check, lint, tests green in CI on every merge | TESTING_STRATEGY |

## 5. Explicitly out of scope for v1

Solutions and Industries page branches; CMS/admin UI; authentication of any kind; blog comments; newsletter (component slot reserved, disabled); multi-language; file uploads; live chat widgets; A/B testing infrastructure; testimonial/stats/client-logo sections (components may exist, no page renders them).

## 6. Success metrics (post-launch)

Form submissions + booked calls per week (primary); scroll depth to Selected Work; CTA click-through by placement; CWV field data staying within budget; indexed pages and impressions for target service terms.

## 7. Launch criteria

All FR complete · all §4 gates green on production URL · content clearance checklist from the work-section map resolved for every published project · legal text reviewed · DNS live on oryntaa.com with www redirect · monitoring and lead alerts verified with a real test submission.
