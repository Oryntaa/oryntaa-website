# PAGE_SPECIFICATIONS

Section-by-section contract for every v1 page: purpose, layout, copy, CTA wiring, theme, and mobile order. Copy below is the working draft — refinements happen here (in this file, via PR), never silently in code or design. `TODO(content)` marks pending human inputs.

Global rules: every section is a `<Section>`; every section header uses Eyebrow + Heading; dark sections are only those marked **[dark]**; mobile order is always heading → text → CTAs → visual.

---

## 1. Global copy system

Primary CTA: **Start a Project** → `/contact?intent=project`. Secondary CTA: **Book a Call** → `/contact#book` (config constant `cta.secondary`; one-line switch back to "Let's Talk" if decided). Exploratory verbs: Explore, View, Learn More, Read. Voice: plain, confident, specific; claims four founders can defend in a sales call; no superlatives without evidence; sentence case everywhere except the mono eyebrows (uppercase).

---

## 2. Home (`/`)

### 2.1 Hero
Eyebrow: `AI-FIRST SOFTWARE ENGINEERING`. H1 (display-xl): **Intelligent products. Engineered to scale.** Lede: *Oryntaa is a founder-led engineering company. We design and build web applications, mobile products, and AI systems for organizations that need software to work today and hold up tomorrow.* Buttons: Start a Project · Book a Call. Capability line (mono, ink-muted): `WEB · MOBILE · AI · SAAS · CLOUD`.
Layout: split — text left (7 cols), HeroVisual right (5 cols) with Horizon gradient behind; visual below text on mobile (static still). The H1 is the LCP element.

### 2.2 Stack strip
StackStrip component. Line: *Engineering with a modern, proven stack.* Logos: Next.js, React Native, TypeScript, Node.js, Python, PostgreSQL, Supabase, AWS, Google Cloud, OpenAI, Anthropic. Monochrome; unlinked.

### 2.3 Services
Eyebrow `WHAT WE DO`. H2: **Technology built around your ambition.** Lede: *From first concept to production and scale — six disciplines, one accountable team.* Six ServiceCards (content layer), 3×2 → 2×3 → 1-col. Section action: Explore All Services → `/services`.

### 2.4 AI-First Approach **[dark]**
Eyebrow `THE ORYNTAA APPROACH`. H2: **Software engineering, reimagined with AI.** Lede: *We build with intelligence at the core — in the products we ship and in how we ship them.* Three pillars (3D stills as icons): **AI-powered products** — applications with intelligence in their core loop, not bolted on. / **Intelligent automation** — repetitive processes turned into dependable systems. / **AI-native engineering** — modern AI applied across the lifecycle, with every line reviewed and owned by senior engineers. CTA (ghost): Explore AI Solutions → `/services/ai-solutions`.

### 2.5 Start Where You Are
Eyebrow `START WHERE YOU ARE`. H2: **Built for every stage of ambition.** Intro line: *Built for startups. Engineered for scale. Ready for enterprise.* Four StageCards:
- **"I have an idea."** Validate before you over-invest. We turn concepts into prototypes and a technical plan you can put in front of stakeholders. → SaaS & MVP Development.
- **"I need the first version."** A focused MVP in weeks — the features that prove the model, nothing that doesn't. → SaaS & MVP Development.
- **"It works. Now it needs to scale."** Re-architecture, AI capability, and the engineering that keeps growth from breaking things. → AI Solutions / Cloud & DevOps.
- **"We're carrying a legacy system."** Modernization without a rewrite cliff — assessed, planned, and migrated in stages. → `/contact?intent=modernization`.
IndustriesStrip beneath: *Recent founding-team work spans* — Education · Healthcare Training · Legal · Automotive & Logistics · Recruitment & HR Tech · Consumer.

### 2.6 Process
Eyebrow `OUR PROCESS`. H2: **From idea to impact.** ProcessSteps: 01 Discover — the business, the users, the real problem. 02 Strategize — direction, technology, and a roadmap with priorities. 03 Design — experiences shaped around how people actually work. 04 Engineer — secure, tested, production-ready systems. 05 Evolve — measure, improve, and scale after launch.

### 2.7 Selected Work — *gated: `features.work`*
Eyebrow `SELECTED WORK`. H2: **Built to solve. Designed to matter.** Three FeaturedProjectCards: PrepNowAI, TrackRec, TruckTrader (order fixed). Action: View All Work → `/work`.

### 2.8 Why Oryntaa
Eyebrow `WHY ORYNTAA`. H2: **More than a development partner.** Four items (2×2): **Founder-led engineering** — senior engineers on every engagement; the people you meet are the people who build. / **AI-first thinking** — we look for where intelligence creates real value, and say so when it doesn't. / **Built for long-term growth** — decisions made for the product you'll have in three years, not just the demo next month. / **Partnership beyond launch** — shipping is the midpoint of the relationship, not the end.

### 2.9 Founders
Eyebrow `WHO WE ARE`. H2: **Four founders. One shared ambition.** Lede: *Oryntaa was founded by four engineers who believe technology should be intelligent, purposeful, and built to last.* Four FounderCards, equal grid (photos `TODO(content)`). Action: Meet Our Leadership → `/about/leadership`.

### 2.10 Insights preview — *gated: `features.insights`*
Eyebrow `INSIGHTS`. H2: **Ideas for building what comes next.** Three latest ArticleCards. Action: Explore All Insights.

### 2.11 Final CTA **[dark]**
Horizon gradient. H2: **Let's build what's next.** Lede: *Tell us where you want to go — we'll bring the engineering to get there.* Buttons: Start a Project · Book a Call.

---

## 3. Services overview (`/services`) — SEO target: "custom software development company"

1. **Hero** — Eyebrow `OUR SERVICES`. H1: **Custom software, from strategy to scale.** Lede: *Six disciplines covering the full product journey — delivered by a founding team that stays accountable end to end.* CTA: Start a Project.
2. **Services grid** — six ServiceCards, expanded one-liners + 3 capability tags each.
3. **How services connect** — short prose + diagram slot: discovery feeds design, design feeds engineering, AI and cloud run through everything.
4. **Engagement models** — three cards: **Fixed-Scope Delivery** — a defined build, a defined price, a defined date. Best when the problem is clear. / **Dedicated Product Team** — the founding team embedded as your engineering team, sprint by sprint. Best for ongoing products. / **AI Strategy & Prototyping Sprint** — two to three weeks to find where AI creates value in your business and prove it with a working prototype. The lowest-risk way to start.
5. **Process** — ProcessSteps reused. 6. **Selected Work** (gated). 7. **CtaSection**.

## 4. Service detail template (`/services/[slug]`)

Sections, all fed from the service's content module: Hero (eyebrow = service name; H1 + description + both CTAs + 3D still) → Overview (what/why/who, 2–3 paragraphs) → Problems We Solve (4–6 problem cards) → Capabilities (grid) → Our Approach (service-specific steps) → Technologies (StackStrip subset — supporting, never the hero) → Related Work (projects tagged to service; hidden if none) → Related Services (max 3) → FAQ (4–6, JSON-LD) → CtaSection with service-specific line.

Per-service content briefs (full copy lives in `content/services/*`):
- **AI Solutions & Automation** *(flagship — deepest page)* — H1: *AI that earns its place in production.* Capabilities: LLM applications & assistants · retrieval & knowledge systems · workflow automation · AI product features · data foundations & pipelines (absorbed Data Engineering) · evaluation, safety & cost control. Problems: manual processes, unused data, support load, AI pilots that never ship. FAQ must include "Will AI actually help us?" answered honestly (sometimes no — and the sprint exists to find out).
- **Web Development** — evidence anchor: TruckTrader. Capabilities: web apps · marketplaces & platforms · corporate sites · e-commerce · portals · performance & SEO engineering · integrations.
- **Mobile App Development** — React Native/Expo cross-platform focus; capabilities: iOS+Android from one codebase · offline & sync · push & engagement · store delivery. *(No public case study until MASI clears — omit Related Work.)*
- **SaaS & MVP Development** — evidence anchors: TrackRec, FairSettle, PrepNowAI. Capabilities: product strategy & scoping (absorbed) · MVP in weeks · billing & subscriptions · multi-tenant foundations · analytics & iteration.
- **UI/UX Design** — capabilities: product design · design systems · prototyping · UX for AI products; cross-links PrepNowAI/FairSettle.
- **Cloud & DevOps** — capabilities: architecture & deployment (Vercel/AWS/GCP) · CI/CD · observability · cost & performance · security hardening.

## 5. Work (`/work` + `/work/[slug]`)

**Grid page:** Hero (Eyebrow `OUR WORK`; H1 **Products built with purpose.**; lede includes the attribution frame: *Selected products delivered by Oryntaa's founding team.*) → filter bar (All / Web / Mobile / AI / SaaS — URL param `?type=`) → ProjectCards (published+granted only) → CtaSection.

**Detail template:** Hero (name, type badge, one-liner, cover) → **Snapshot** (definition list: Product/Client · Industry · Services · Platform · Year · Status · *Engagement* — the honest attribution line, e.g. "Delivered by our co-founder as sole full-stack developer, pre-Oryntaa") → Challenge → Approach → Solution → Key Features → Experience (media gallery, mockup treatment) → Technology → Outcomes (qualitative; client-reported metrics only, attributed) → Next Project → CtaSection.

**v1 projects** (source of truth: `reference/oryntaa-work-section-map.md`; each blocked on its permission row): `prepnow` (featured #1) · `trackrec` (featured #2) · `trucktrader` (featured #3) · `fairsettle` (grid) · `espo-paris`, `masi` (drafted, `status: draft` until conditions clear).

## 6. About (`/about`)

Hero (Eyebrow `ABOUT ORYNTAA`; H1 **Technology with intelligence, purpose, and ambition.**) → **Our Story** (`TODO(content)` — founder-written, 3–4 paragraphs: why Oryntaa exists, what's broken in how software gets built, what kind of company this intends to be) → **Mission & Vision** (Mission: *To empower organizations worldwide through intelligent technology and digital products that drive meaningful growth.* Vision: `TODO(content)` — editable slot) → **Principles** (Think beyond the brief · Build with purpose · Quality without compromise · Grow together — each with 1–2 sentences) → **How We Build** (the engineering-standards section: strict type safety end to end; security enforced at the database layer, not the UI; design tokens over hardcoded values; every AI-assisted line reviewed and owned by a senior engineer; documentation as part of delivery — written as promises to clients, cross-linking the cornerstone article) → Leadership preview (4 FounderCards) → Careers preview strip → CtaSection.

## 7. Leadership (`/about/leadership`)

Hero: **The people building Oryntaa.** Four equal founder blocks: photo · name · role (Awais: Co-Founder & CEO; others: Co-Founder — final titles `TODO(content)`) · 2–3 sentence intro · focus areas · LinkedIn/GitHub. No hierarchy by layout or size. Closing CtaSection variant: *Work directly with the people who build.*

## 8. Careers (`/careers`)

Hero: **Build meaningful technology with us.** Why-Oryntaa list (meaningful work · continuous learning · ownership · collaboration · long-term thinking) → Openings from `content/careers/openings.ts`; empty state: **No open positions right now.** *We're always interested in meeting thoughtful, ambitious engineers. Follow Oryntaa on LinkedIn for future roles.* (LinkedIn button; no unsolicited-application form at v1.)

## 9. Insights (`/insights` + `/insights/[slug]`)

List: Hero (**Ideas, perspectives, and what we're learning.**) → Featured (latest) → grid with category filter (AI · Engineering · Product · Design · Oryntaa). Article template: category badge → H1 → summary → author block (founder) → date · read time → cover (optional) → Prose body (MDX map) → share links → related (2–3) → CtaSection.

**Cornerstone briefs** `TODO(content)` (required before `features.insights` passes): 1) *How We Build: the Oryntaa engineering standard* — the public version of §6 How We Build, with real code-level specifics. 2) *What AI can and can't do for your business right now* — buyer-facing, honest, maps to the sprint offer. 3) *An MVP that ships in weeks: how we scope first releases* — method piece anchored in real project patterns.

## 10. Contact (`/contact`)

Hero: **Let's talk about what's next.** Lede: *Whether you have a product idea, a business challenge, or just a question — we'd like to hear it.* Response promise line: *We reply within one business day.* → **RouteSelector** → **ContactForm** (2 steps for project route; fields per PRODUCT_REQUIREMENTS FR-7; `?intent=` presets route and, for `modernization`, pre-selects stage) → **`#book` BookingEmbed**: *Prefer to talk it through? Book a 30-minute call with a founder.* → **FAQ** (6): how engagements start · engagement models · typical timelines · how budgets work · who we'll work with day to day (founders — direct) · IP ownership (yours, in writing) → email fallback from `content/site.ts`.

**Success state (in place):** **Thank you — we'll be in touch.** *Your message is with the founding team. Expect a reply within one business day.* Buttons: Return Home · View Our Work (gated fallback: Explore Services). **Error state:** *Something went wrong on our side — your message wasn't sent. Please try again, or email us directly at {email}.* Inputs preserved, error logged with correlation id.

## 11. Legal (`/privacy`, `/terms`, `/cookies`, `/code-of-conduct`)

MDX-rendered: H1 · last-updated · auto TOC · Prose body · contact block. Cookies page states the cookieless-analytics posture plainly. All text `TODO(content): legal review` before launch.

## 12. Utility

**404:** H1 **This page took a different route.** *The page you're looking for doesn't exist or may have moved.* Buttons: Return Home · Explore Services. **error.tsx:** *Something went wrong. Reload, or head back home.* Both minimal, on-canvas, no Horizon.
