// SaaS & MVP Development (service 4/6). oneLiner + capabilities verbatim; problem/approach/FAQ drafted.
export const saasMvp = {
  slug: 'saas-mvp',
  name: 'SaaS & MVP Development',
  navLabel: 'SaaS & MVP Development',
  oneLiner: 'From scoping to a focused MVP in weeks, on foundations built to iterate.',
  heroTitle: 'From idea to a product people pay for.',
  heroDescription:
    "A focused MVP in weeks — billed, multi-tenant, and built on foundations you won't have to throw away.",
  overview: [
    'Where an idea becomes a product people pay for — from a rough concept to a focused first release, then to the multi-tenant, subscription-billed platform underneath it.',
    'The discipline is restraint: an MVP is the smallest thing that proves the model. We scope hard, build the features that carry the bet, and leave foundations clean enough to grow on.',
    'For founders validating a new product and operators launching a new line.',
  ],
  problems: [
    {
      title: 'Ideas stuck in validation',
      body: 'A promising concept never gets in front of paying users because no one draws the line at a first release.',
    },
    {
      title: 'Scope that never ships',
      body: 'Every feature feels essential, so the launch date slides and the bet goes untested.',
    },
    {
      title: 'Billing bolted on late',
      body: 'Subscriptions and multi-tenancy added after the fact force a painful rebuild right when growth arrives.',
    },
    {
      title: "Foundations that don't scale",
      body: 'A quick prototype becomes the product, and its shortcuts become the ceiling.',
    },
  ],
  capabilities: [
    { title: 'Product strategy & scoping' },
    { title: 'MVP in weeks' },
    { title: 'Billing & subscriptions' },
    { title: 'Multi-tenant foundations' },
    { title: 'Analytics & iteration' },
    { title: 'Path to platform' },
  ],
  approach: [
    {
      step: 'Scope the bet',
      body: 'We find the single assumption the product must prove and cut everything that does not serve it.',
    },
    {
      step: 'Build the MVP',
      body: 'A focused first release in weeks — the features that carry the bet, on clean, extensible foundations.',
    },
    {
      step: 'Launch & bill',
      body: 'Subscriptions, multi-tenancy, and analytics wired in from day one so real usage produces real signal.',
    },
    {
      step: 'Learn & extend',
      body: 'We read what users actually do and extend deliberately toward the platform underneath.',
    },
  ],
  technologies: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Supabase', 'Stripe'],
  relatedServices: ['ai-solutions', 'web-development', 'uiux-design'],
  faq: [
    {
      q: 'How fast can we have an MVP?',
      a: 'Weeks, not quarters — once we have scoped the bet hard. Speed comes from cutting scope, not from cutting corners on the foundation.',
    },
    {
      q: 'What counts as an MVP?',
      a: 'The smallest release that proves your model with paying users — not a demo, and not the full vision. We help you draw that line.',
    },
    {
      q: 'Can you build billing?',
      a: 'Yes — subscriptions, trials, and metered plans on Stripe, wired in from the start so it is never a later rebuild.',
    },
    {
      q: 'Will the MVP scale?',
      a: 'We build the first release on multi-tenant foundations clean enough to grow on, so success does not force a rewrite.',
    },
    {
      q: 'We only have an idea — is that enough?',
      a: 'Yes. Scoping the bet is the first thing we do together; you do not need a spec, just a problem worth solving.',
    },
  ],
  seo: {
    title: 'SaaS & MVP Development | Oryntaa',
    description:
      'From scoping to a focused, billed, multi-tenant MVP in weeks — built on foundations you can grow on, not throw away once the first real users arrive.',
  },
  order: 4,
};
