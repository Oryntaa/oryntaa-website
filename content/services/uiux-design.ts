// UI/UX Design (service 5/6). oneLiner + capabilities verbatim; problem/approach/FAQ drafted.
export const uiuxDesign = {
  slug: 'uiux-design',
  name: 'UI/UX Design',
  navLabel: 'UI/UX Design',
  oneLiner: 'Product design and design systems, shaped for how people actually work.',
  heroTitle: 'Designed for the task. Built to ship.',
  heroDescription:
    'Product design and design systems from people who also write the code — shaped around how users actually work, drawn for every state.',
  overview: [
    'Product design done by people who also ship the code — interfaces shaped around how users actually work, and design systems that hold up as the product grows.',
    'We design for real states, not happy paths: empty, loading, error, and edge cases are part of the work. Every screen is drawn to be built.',
    'For teams who want design and engineering speaking the same language.',
  ],
  problems: [
    {
      title: 'Interfaces that fight the user',
      body: 'Screens built around the org chart or the database instead of the task people came to do.',
    },
    {
      title: "Design that doesn't survive build",
      body: 'Beautiful mockups that quietly fall apart the moment real data and real states arrive.',
    },
    {
      title: 'Inconsistent, drifting UI',
      body: 'Without a system, every new screen reinvents spacing, colour, and components, and the product feels stitched together.',
    },
    {
      title: 'AI features nobody understands',
      body: 'Powerful models wrapped in interfaces that never explain what they did or why to trust them.',
    },
  ],
  capabilities: [
    { title: 'Product design' },
    { title: 'Design systems' },
    { title: 'Prototyping' },
    { title: 'UX for AI products' },
  ],
  approach: [
    {
      step: 'Understand',
      body: 'We learn the task and the people doing it before drawing a single screen.',
    },
    {
      step: 'Shape',
      body: 'We design the real flows — including empty, loading, and error states — not just the happy path.',
    },
    {
      step: 'Systemize',
      body: 'Patterns become a token-driven design system so the product stays consistent as it grows.',
    },
    {
      step: 'Ship together',
      body: 'Because we also write the code, designs are drawn to be built and handed off without loss.',
    },
  ],
  technologies: ['Figma', 'React', 'TypeScript', 'Design tokens', 'Storybook'],
  relatedServices: ['saas-mvp', 'ai-solutions', 'web-development'],
  faq: [
    {
      q: 'Design and build, or just design?',
      a: 'Either — but our advantage is doing both. When the designers also ship the code, nothing is lost in handoff.',
    },
    {
      q: 'Work from our brand or start fresh?',
      a: 'We can extend an existing brand and design system or build one from scratch, whichever serves the product.',
    },
    {
      q: 'What is UX for AI?',
      a: 'Designing interfaces that make AI legible and trustworthy — showing what a model did, its confidence, and how to correct it.',
    },
    {
      q: 'Account for real states?',
      a: 'Always. Empty, loading, error, and edge cases are part of the design, not a build-time afterthought.',
    },
    {
      q: 'Deliver a reusable design system?',
      a: 'Yes — a token-driven system with documented components, so the product stays consistent as your team grows.',
    },
  ],
  seo: {
    title: 'UI/UX Design | Oryntaa',
    description:
      'Product design and design systems from people who also write the code — shaped around how users actually work, drawn for every state, not just the happy path.',
  },
  order: 5,
};
