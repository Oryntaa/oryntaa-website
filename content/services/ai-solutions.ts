// AI Solutions & Automation (service 1/6). oneLiner + capabilities verbatim; hero/overview brand
// voice; problem bodies, approach bodies, and FAQ answers drafted for Gate 6 sign-off.
export const aiSolutions = {
  slug: 'ai-solutions',
  name: 'AI Solutions & Automation',
  navLabel: 'AI Solutions & Automation',
  oneLiner:
    'AI that earns its place in production — assistants, retrieval, and automation with evaluation built in.',
  heroTitle: 'AI that earns its place in production.',
  heroDescription:
    'Assistants, retrieval, and automation your team can trust — designed, evaluated, and run in production by senior engineers.',
  overview: [
    'Where Oryntaa applies intelligence to the parts of your business that carry real weight — the workflows that consume skilled hours, the data nobody can query, the product features that need to think.',
    'We build assistants, retrieval systems, and automation with evaluation designed in from the first commit: every system ships with a definition of correct, a way to measure it, and a cost model you can defend to a CFO.',
    'For teams who want AI in production, not in a slide deck — startups building AI-native products and organizations putting years of accumulated data to work.',
  ],
  problems: [
    {
      title: 'Manual processes',
      body: 'Skilled hours disappear into repetitive work that a well-scoped system could handle end to end.',
    },
    {
      title: 'Unused data',
      body: 'Years of information sit in tools nobody can query — value locked behind the wrong interface.',
    },
    {
      title: 'Support load',
      body: 'The same questions arrive again and again, answered by hand instead of by design.',
    },
    {
      title: 'AI pilots that never ship',
      body: 'Demos impress in the room and then stall, because nobody built the evaluation and guardrails to trust them in production.',
    },
  ],
  capabilities: [
    { title: 'LLM applications & assistants' },
    { title: 'Retrieval & knowledge systems' },
    { title: 'Workflow automation' },
    { title: 'AI product features' },
    { title: 'Data foundations & pipelines' },
    { title: 'Evaluation, safety & cost control' },
  ],
  approach: [
    {
      step: 'Find the value',
      body: 'We locate the workflow or dataset where intelligence pays for itself, and define what "correct" means before writing code.',
    },
    {
      step: 'Prove it',
      body: 'A focused prototype tests the hardest assumption against real data, measured against that definition of correct.',
    },
    {
      step: 'Productionize',
      body: 'We harden the winner with evaluation, guardrails, observability, and a cost model you can defend.',
    },
    {
      step: 'Run & improve',
      body: 'Live systems are monitored and tuned as data and usage shift — accuracy and cost tracked over time.',
    },
  ],
  technologies: ['Python', 'PostgreSQL', 'Supabase', 'OpenAI', 'Anthropic', 'Google Cloud'],
  relatedServices: ['saas-mvp', 'web-development', 'cloud-devops'],
  faq: [
    {
      q: 'Will AI actually help us?',
      a: 'Only if it targets a real workflow or dataset. We start by finding where intelligence pays for itself, and prove it on your data before committing to a build.',
    },
    {
      q: 'How long does an AI project take?',
      a: 'A proof of value takes weeks, not months; production hardening follows once the prototype earns it. We scope in phases so you decide at each gate.',
    },
    {
      q: 'What happens to our data?',
      a: 'It stays yours. We design for privacy and control, keep sensitive data where you need it, and are explicit about what any model sees.',
    },
    {
      q: 'Which models do you use?',
      a: 'Whichever fits the task and budget — we work across OpenAI, Anthropic, and Google, and keep the system model-swappable rather than locked in.',
    },
    {
      q: 'What happens after launch?',
      a: 'AI systems drift as data and usage change. We monitor accuracy and cost in production and tune them over time, not just at ship.',
    },
  ],
  seo: {
    title: 'AI Solutions & Automation | Oryntaa',
    description:
      'Production-grade AI — assistants, retrieval, and automation with evaluation, guardrails, and cost control built in from the first commit.',
  },
  order: 1,
};
