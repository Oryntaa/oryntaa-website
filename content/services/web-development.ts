// Web Development (service 2/6). oneLiner + capabilities verbatim; problem/approach/FAQ drafted.
export const webDevelopment = {
  slug: 'web-development',
  name: 'Web Development',
  navLabel: 'Web Development',
  oneLiner: 'Web applications, marketplaces, and platforms engineered for performance and search.',
  heroTitle: 'Web development built to perform.',
  heroDescription:
    'Web applications, marketplaces, and platforms engineered for the two things that decide their fate in production — speed and search.',
  overview: [
    "Oryntaa's core discipline — the web applications, marketplaces, and platforms a business runs on, engineered for how fast they feel and how well they're found.",
    'Built on Next.js and TypeScript, with performance and SEO treated as engineering requirements from the first commit — server-rendered where it matters, measured against real Core Web Vitals.',
    'For teams shipping something real on the web — not a brochure that could have been a template.',
  ],
  problems: [
    {
      title: 'Slow, heavy pages',
      body: 'Bloated bundles and unmeasured performance quietly cost conversions and rankings alike.',
    },
    {
      title: 'Invisible to search',
      body: 'Client-only rendering and thin metadata leave the best content unindexed and unfound.',
    },
    {
      title: "Marketplaces that don't scale",
      body: 'Search, filtering, and inventory that work at a hundred listings buckle at a hundred thousand.',
    },
    {
      title: 'Fragile integrations',
      body: 'Third-party feeds and payment flows bolted on late become the thing that breaks in production.',
    },
  ],
  capabilities: [
    { title: 'Web applications' },
    { title: 'Marketplaces & platforms' },
    { title: 'Corporate sites' },
    { title: 'E-commerce' },
    { title: 'Portals' },
    { title: 'Performance & SEO engineering' },
    { title: 'Integrations' },
  ],
  approach: [
    {
      step: 'Architect',
      body: 'We choose the rendering model and data shape for your traffic and content before a line of UI is built.',
    },
    {
      step: 'Build',
      body: 'Typed, server-first components assembled from a token-driven system so the site stays consistent as it grows.',
    },
    {
      step: 'Optimize',
      body: 'Performance and SEO are measured against real Core Web Vitals and tuned until the numbers hold.',
    },
    {
      step: 'Launch & scale',
      body: 'We ship on a preview-per-change pipeline and keep the platform fast as inventory and traffic climb.',
    },
  ],
  technologies: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Supabase', 'Vercel'],
  relatedServices: ['saas-mvp', 'ai-solutions', 'cloud-devops'],
  faq: [
    {
      q: 'What do you build web apps with?',
      a: 'Next.js and TypeScript, server-rendered where it helps performance and search, on a stack (Supabase, Vercel) chosen for reliability over novelty.',
    },
    {
      q: 'Will my site actually rank?',
      a: 'We treat SEO as an engineering requirement — server rendering, clean metadata, structured data, and real Core Web Vitals measured, not assumed.',
    },
    {
      q: 'Can you build a marketplace, not just a site?',
      a: 'Yes — faceted search, listings at scale, dealer/inventory feeds, and payment or financing integrations are core to what we ship.',
    },
    {
      q: 'How do you handle performance?',
      a: 'It is a budget, not an afterthought: we measure against Core Web Vitals throughout the build and keep bundles and images honest.',
    },
    {
      q: 'Existing site or start fresh?',
      a: 'Either. We can rebuild what is slowing you down or extend what works — we start from where the value is, not from a rewrite by reflex.',
    },
  ],
  seo: {
    title: 'Web Development | Oryntaa',
    description:
      'Web apps, marketplaces, and platforms on Next.js and TypeScript — engineered for real performance and search, not brochure templates.',
  },
  order: 2,
};
