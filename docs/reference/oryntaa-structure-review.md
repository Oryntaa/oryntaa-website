# Oryntaa Website — Structure Review & Refined v1 Architecture

**Inputs reviewed:** Master Grey Structure document, brand & development master plan, 15 reference screenshots (Techverx, M Techub, Arbisoft, IR Solutions, Visnext, SSI, NETSOL, Contour Software, plus one enterprise consultancy services page).

**Verdict up front:** The grey structure is architecturally sound — the component system, dynamic content models, CTA discipline, no-fake-content rule, and accessibility/SEO foundations are all correct and should be kept. The problem is not quality; it is sizing. As written, it describes the website of a 200-person firm: roughly 30+ published pages, three parallel taxonomies (Services, Solutions, Industries), and several sections that only work when backed by evidence Oryntaa does not yet have. This review keeps the systems, cuts the launch surface area by more than half, and re-sequences the site around what a four-founder, pre-case-study company can credibly publish on day one.

---

## 1. The strategic call that shapes everything else

The master plan asks the site to feel comparable to Techverx, M Techub, and IR Solutions. That goal should apply to **design quality and information discipline — not to apparent company size.**

Those firms carry mega menus, industry libraries, testimonial walls, and stats bands because they have hundreds of employees and a decade of clients to fill them. If Oryntaa launches the same skeleton with placeholder-grade depth, the site reads as inflated the moment a serious prospect does the thing serious prospects always do: check LinkedIn, count four people, and discount everything the website claimed. Thin pages also damage SEO — Google now rewards a small set of deep pages far more than a wide set of shallow ones.

The stronger position is the honest one: **founder-led, AI-native engineering.** Four senior engineers on every engagement, no account-manager layers, no legacy processes — a company built AI-first rather than retrofitted. That is a genuine differentiator none of the reference sites can claim, and it survives due diligence instead of collapsing under it. One more thing follows from this: for a company selling engineering excellence with no case studies yet, **the website itself is the first case study.** Its speed, polish, and craft carry more persuasive weight than any copy on it.

Everything below applies this principle: launch tight and deep, expand as evidence accumulates. Nothing structural is lost — the deferred branches remain designed and templated, just unpublished.

---

## 2. What the reference screenshots actually teach

**Techverx** is the strongest of the set and the closest model. Note the audience tags on its offer cards ("For Operations Teams Scaling AI" / "For Leaders Building AI Systems") — every offer tells the visitor whether it's for them. Note the outcome-flavored CTAs ("Plan Your AI Build") instead of generic "Contact Us." Note the single coherent visual family: glass/crystal 3D objects reused as section icons, giving the whole site one material language. And note what it puts under the hero instead of client logos: platform logos (Google, AWS, Microsoft) — a credibility move available to companies without a famous client list.

**M Techub** contributes the best conversion pattern on display: stage-based segmentation ("I have an idea" / "I need an MVP" / "I'm ready to scale"). Buyers self-identify by stage faster than by industry or company size, and each card routes them to a tailored path. Its case studies also show the right format — rich device mockups with category tags, not text-heavy write-ups.

**Arbisoft** demonstrates proof placement: a client testimonial embedded directly inside the mega menu, and a filterable testimonial wall. The volume is unavailable to Oryntaa for now, but the principle — put evidence adjacent to the claim it supports — should be baked into the component system so proof slots exist when the proof does.

**SSI and Contour** lean on stats bands (30+ years, 550+ employees, 20M+ hours). Unavailable honestly; note it as a phase-2 pattern and nothing more. **NETSOL** shows platform-led architecture with pill tabs and bento cards — relevant later if Oryntaa ships its own products. The **purple consultancy page** reinforces the Techverx lesson: one abstract visual system carried across every service card.

**IR Solutions and Visnext are the cautionary examples.** Generic AI-city stock imagery, stock office photography, stacked cookie popups, and floating WhatsApp bubbles all pull the perceived quality down a tier regardless of the underlying company. Worth noting: nearly every Pakistani agency in the set runs a floating chat widget. Skipping it is itself a premium signal.

One palette observation worth acting on: **every credible competitor here is blue** (Techverx, Arbisoft, NETSOL, M Techub's accents) or red (SSI). Oryntaa's #EA580C orange is completely unoccupied territory in this competitive set. The Sunset palette isn't just a brand choice — it's shelf differentiation. The design phase should commit to it confidently rather than drifting toward "safe" tech blue.

---

## 3. Page-level decisions

### 3.1 Consolidate: eleven service pages become six

Eleven service pages is a taxonomy, not a menu. Several describe the same engagement from different angles (SaaS, Custom Software, MVP, Product Strategy are all "we build your product"), and Automation appears in both Services and Solutions — a duplication already present in the grey structure. Four founders also cannot substantiate eleven distinct practice areas; six focused pages with real depth will each rank and convert better.

| v1 service page | Absorbs from the original eleven | Slug |
|---|---|---|
| AI Solutions & Automation | AI Solutions / LLM Applications, Automation, Data Engineering | `/services/ai-solutions` |
| Web Development | Web Development | `/services/web-development` |
| Mobile App Development | Mobile App Development | `/services/mobile-app-development` |
| SaaS & MVP Development | SaaS Development, MVP Development, Product Strategy | `/services/saas-mvp-development` |
| UI/UX Design | UI/UX Design | `/services/ui-ux-design` |
| Cloud & DevOps | Cloud & DevOps | `/services/cloud-devops` |

Handling of the absorbed items: Data Engineering and Automation become named capability blocks inside the AI page (with anchor links, so they remain linkable from anywhere). Product Strategy becomes the discovery capability inside SaaS & MVP — it's how engagements start, not a product four developers sell standalone. **Custom Software Development** is the highest-volume head term, so instead of a standalone page, the Services Overview page itself targets "custom software development company" in its metadata and hero copy. Nothing is lost for SEO; authority concentrates instead of fragmenting. The AI page is the flagship — it carries the positioning and should get the deepest content.

### 3.2 Cut from v1, keep the pattern

**Solutions branch (5 pages) — defer entirely.** The Services/Solutions distinction is valid for Arbisoft-scale firms, but at launch it doubles the content burden and splits SEO authority across near-duplicate pages. The grey structure's own service template already contains the solutions layer — every service page has a "Problems We Solve" section. Reintroduce standalone Solutions pages in phase 2, when each can be anchored by at least one real case study. Legacy Modernization, the one solution with distinct demand, survives as a stage card on the homepage (see 3.3) routing to a contact intent.

**Industries branch (9 pages) — defer entirely.** The grey structure correctly bans invented industry expertise, but then an industry page has nothing to stand on: no projects, no compliance track record, no sector clients. Eight thin pages saying "we understand healthcare" without evidence actively harm trust. Keep industries as a static, non-linked strip on the homepage ("built for teams in healthcare, education, finance, logistics…") and build the detail template unpublished. Publish an industry page only when a real project exists in that industry.

**Code of Conduct — remove from the About dropdown.** It's a legitimate page but a legal/governance artifact, not a navigation destination; a prospect never chooses it. Footer-only, alongside Privacy and Terms.

**Homepage sections 10 and 11 (Principles, Mission & Vision) — move to About.** Together with Section 08 they form three consecutive sections of abstract self-description. No reference site does this, because unverifiable virtue statements don't persuade — evidence and specificity do. The homepage keeps one merged differentiation section (see Section 5); Principles and Mission/Vision get their full presentation on About, where visitors go specifically to learn who you are.

### 3.3 Add

**Stage-based entry section (homepage).** Replace Section 05's organization-type cards (Startups/SMEs/Enterprises/Government) with four stage cards modeled on M Techub: *Starting with an idea* → validation and prototyping (routes to SaaS & MVP), *Building the first version* → focused MVP delivery (SaaS & MVP), *Scaling what works* → re-architecture, AI capability, growth engineering (AI Solutions, Cloud & DevOps), *Modernizing what exists* → legacy replatforming (contact intent). Stage segmentation converts better than org-type segmentation because visitors self-identify instantly, and it quietly absorbs the deferred Legacy Modernization solution. The existing line "Built for Startups. Engineered for Scale. Ready for Enterprise." becomes this section's intro.

**"Built with" technology strip (under the hero).** Oryntaa can't show client logos yet and shouldn't fake partner status, but it can honestly show its stack the way Techverx shows platforms: Next.js, React Native, TypeScript, PostgreSQL/Supabase, AWS & Google Cloud, OpenAI & Anthropic. Label it as engineering stack, never as partnerships. This fills the credibility slot under the hero that would otherwise sit empty.

**Engagement models — elevate.** The grey structure mentions engagement models once inside the Services Overview flow; Visnext shows why they deserve real presence. Prospects want to know *how* they can buy before they'll start a conversation. Three models, presented on the Services Overview and referenced on Contact: *Fixed-Scope Delivery* (defined build, defined price), *Dedicated Product Team* (the founding team embedded as your engineering team), *AI Strategy & Prototyping Sprint* (short, low-risk entry engagement — also the natural top-of-funnel offer for the AI-first positioning). Final names are open; the structural slot is not.

**"How We Build" — engineering standards made public.** This is the differentiator hiding in plain sight. The team already operates hard internal standards — strict type safety, database-level security as the primary boundary, tokenized design systems, disciplined review of AI-assisted code. Publishing them (a section on About plus a cornerstone Insights article) does what no competitor in the set does: proves engineering excellence with specifics instead of adjectives. Enterprise evaluators in particular read this material.

**Contact upgrades.** Trim the project form from four steps to two (Step 1: name, email, company, country; Step 2: needs checkboxes, stage, timeline, optional budget, message, attachment, consent). Add embedded call booking (Cal.com or Calendly) at launch, not as a future item — for a services firm, "book a 30-minute call" is the highest-converting, lowest-friction action available and it costs nothing to wire. Add a response-time promise ("we reply within one business day" — then keep it), and a short FAQ: process, timelines, engagement models, IP ownership, communication cadence, how budgets work.

**Launch gating rules (new, explicit).** The grey structure bans fake content but never defines what happens before real content exists. Make it a rule the frontend enforces: **Work** appears in nav and on the homepage only when ≥3 projects with real media are published. **Insights** appears only when ≥3 articles are live. Testimonial, stats, and client-logo components exist in the component library but ship on no page until the content is real. This keeps the launch site coherent instead of visibly unfinished.

---

## 4. Refined navigation and sitemap

**v1 navbar:** `Services · Work · About · Insights · [Start a Project]` — with Work and Insights subject to the gating rules, and Careers living inside the About dropdown and footer. No mega menu at launch: a six-item services dropdown doesn't need one, and mega menus signal breadth the company shouldn't fake yet. The navbar component should handle four or five items gracefully so gated sections can appear without redesign.

```
/                                   v1 — launch
├── /services                       (targets "custom software development company")
│   ├── /ai-solutions               flagship
│   ├── /web-development
│   ├── /mobile-app-development
│   ├── /saas-mvp-development
│   ├── /ui-ux-design
│   └── /cloud-devops
├── /work                           gated: publish at ≥3 real projects
│   └── /[project-slug]
├── /about
│   └── /leadership
├── /careers                        empty state as specified
├── /insights                       gated: publish at ≥3 articles
│   └── /[article-slug]
├── /contact                        form + booking
├── /privacy  /terms  /cookies  /code-of-conduct
└── /404

v2 — added as evidence accumulates (templates built now, unpublished)
├── /solutions/...                  each anchored by ≥1 case study
├── /industries/...                 each anchored by ≥1 sector project
├── additional service pages        split out when volume justifies
└── testimonial wall · stats band · mega menu
```

Phasing this way has a hidden benefit: nothing launched ever needs to be removed or redirected. v2 is purely additive.

---

## 5. Refined homepage flow

Fourteen sections become eleven defined, nine visible at launch:

1. **Hero** — label, headline, subcopy, `Start a Project` + secondary CTA, 3D placeholder as specified. On the headline: the current draft ("We Build Intelligent Digital Products That Move Businesses Forward") is grammatical but interchangeable — six of the fifteen screenshots could run it. Direction to develop in the content phase: shorter and more declarative, e.g. **"Intelligent Products. Engineered to Scale."** with the AI-first label doing the categorization work above it. Full copy exploration belongs to the content phase; the structural note is that the H1 slot should assume ≤8 words.
2. **"Built with" stack strip** — replaces the standalone positioning strip.
3. **Services** — six cards matching the consolidated pages.
4. **AI-First Approach** (dark section) — keep as specified, three pillars.
5. **Start Where You Are** — new stage-based section (replaces org-type "Who We Help"); industries appear here as a static strip.
6. **Process** — keep the five steps as specified.
7. **Selected Work** — gated.
8. **Why Oryntaa** — single merged differentiation section, four items max: AI-First Thinking · Founder-Led Engineering (senior engineers on every engagement, no handoffs) · Built for Long-Term Growth · Partnership Beyond Launch. Principles and Mission/Vision move to About.
9. **Founders** — equal grid of four, as specified; add LinkedIn/GitHub links. Real photos only.
10. **Insights preview** — gated.
11. **Final CTA** — keep as specified.

---

## 6. Trust without clients — the working playbook

Everything above converges on one question: what does a prospect believe before the first case study exists? Five answers, in order of weight.

**Founders' prior shipped work.** If products the four founders built and shipped before Oryntaa can be shown — with the rights holder's permission and honest attribution ("built by our founding team," with role stated) — that is the fastest legitimate path to a real Work section and probably the difference between launching with Work visible or hidden. This is worth resolving before anything else in the content phase.

**Engineering transparency.** The "How We Build" material described in 3.3 — standards, security model, review discipline — is proof by specificity. Competitors claim quality; publishing the actual bar is stronger.

**Three cornerstone articles at launch.** Insights shouldn't wait for phase 2 — it's the only SEO surface a new domain fully controls. Seed with: (1) *How We Build: the Oryntaa engineering standard*, (2) a buyer-facing piece on what AI can and can't do for their business right now, (3) *How we scope an MVP that ships in weeks*. Each doubles as sales collateral to send prospects directly.

**Named humans.** Real bios, real photos, real LinkedIn/GitHub. Four credible senior engineers beat an anonymous "global team" every time — and it's verifiable, which anonymous claims are not.

**The site as evidence.** Perfect Core Web Vitals, flawless responsive behavior, restrained motion, zero broken states. A prospect evaluating an engineering firm judges the one artifact of its engineering they can touch.

And the anti-patterns, straight from the screenshots: no stock people or stock cityscapes, no floating WhatsApp bubble, no stacked cookie popups (one minimal, non-blocking notice), no stats we don't have, no "trusted by industry leaders" phrasing that four founders can't defend in a sales call.

---

## 7. Visual language — lock this before the design phase

The screenshots show two schools: abstract 3D systems (Techverx, NETSOL, the purple consultancy) and photography-led sites (Visnext, IR Solutions). For a four-person AI-first firm producing its own assets, the choice is clear: **one abstract 3D object family + real product UI mockups + real founder photography, and nothing else.** Photography-led requires photos the company doesn't have and ages into stock-image territory; a single sculptural object family (glass/ceramic forms in the Sunset palette against warm neutrals and deep darks) can be generated consistently, reused as section icons Techverx-style, and extended forever. Committing to the orange-anchored palette rather than drifting to tech blue is part of the same decision — see the palette note in Section 2. This is a decision to make now because every section-level design spec in the next phase depends on it.

---

## 8. Build order — deltas to Part XX

The fifteen-phase sequence stands with scope changes: Phase 4 builds six service pages, not eleven; Phase 5 (Solutions/Industries) builds the two detail templates but publishes nothing; the contact phase includes the booking embed and the two-step form. Add one thing the plan is missing entirely: a **content production track running parallel to development** — founder bios and photos, the three cornerstone articles, prior-work write-ups and permissions, and the "How We Build" material. Structure has never been the bottleneck on this project; content will be, and it should start now.

---

## 9. Decisions needed from you

1. **Prior work rights** — can any founder-shipped products be featured in Work with attribution? This decides whether the site launches with a Work section or without one.
2. **Service consolidation** — confirm the six-page structure and the two composite names ("AI Solutions & Automation," "SaaS & MVP Development"), since slugs and nav lock against them.
3. **Booking tool** — Cal.com or Calendly at launch.
4. **Seed articles** — who writes and approves the three cornerstones, and by when.
5. **Secondary CTA** — keep "Let's Talk," or switch to "Book a Call" now that booking ships at launch (my lean: Book a Call — it's concrete and lower-friction).
6. **Industries strip** — which six to eight industry names appear, unlinked, in the homepage stage section.

Once these are confirmed, the structure is locked and the next phase begins: section-by-section content and design specification for the v1 pages — hero to footer, copy, layout, and image direction per section — in the format ready for Claude Design and Claude Code.
