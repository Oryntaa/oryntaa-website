import { routes } from '@/config/routes';

/**
 * Homepage copy (PAGE_SPECIFICATIONS §2), sourced from the founder-approved homepage design.
 * Services / projects / founders / articles are pulled from the content loaders; this module holds
 * the page's static section copy. Eyebrows are sentence-case here and uppercased in CSS
 * (ACCESSIBILITY_GUIDELINES §6).
 */
export const home = {
  hero: {
    eyebrow: 'AI-first software engineering',
    titleLead: 'Intelligent products.',
    titleAccent: 'Engineered to scale.',
    description:
      'Oryntaa is a founder-led engineering company. We design and build web applications, mobile products, and AI systems for organizations that need software to work today and hold up tomorrow.',
    primary: { label: 'Start a Project', href: routes.contact({ intent: 'project' }) },
    secondary: { label: 'Book a Call', href: routes.book },
    capabilities: ['Web', 'Mobile', 'AI', 'SaaS', 'Cloud'],
  },
  stack: {
    heading: 'Engineering with a modern, proven stack.',
  },
  services: {
    eyebrow: 'What we do — technology built around your ambition',
  },
  aiFirst: {
    eyebrow: 'The Oryntaa approach',
    title: 'Software engineering, reimagined with AI.',
    description:
      'We build with intelligence at the core — in the products we ship and in how we ship them.',
    pillars: [
      {
        title: 'AI-powered products',
        body: 'Applications with intelligence in their core loop, not bolted on.',
      },
      {
        title: 'Intelligent automation',
        body: 'Repetitive processes turned into dependable systems.',
      },
      {
        title: 'AI-native engineering',
        body: 'Modern AI applied across the lifecycle, with every line reviewed and owned by senior engineers.',
      },
    ],
    cta: { label: 'Explore AI Solutions', href: routes.service('ai-solutions') },
  },
  stages: {
    eyebrow: 'Start where you are',
    title: 'Built for every stage of ambition.',
    description: 'Built for startups. Engineered for scale. Ready for enterprise.',
    items: [
      {
        quote: 'I have an idea.',
        body: 'Validate before you over-invest. We turn concepts into prototypes and a technical plan you can put in front of stakeholders.',
        link: { label: 'SaaS & MVP Development', href: routes.service('saas-mvp') },
      },
      {
        quote: 'I need the first version.',
        body: "A focused MVP in weeks — the features that prove the model, nothing that doesn't.",
        link: { label: 'SaaS & MVP Development', href: routes.service('saas-mvp') },
      },
      {
        quote: 'It works. Now it needs to scale.',
        body: 'Re-architecture, AI capability, and the engineering that keeps growth from breaking things.',
        link: { label: 'AI Solutions / Cloud & DevOps', href: routes.service('ai-solutions') },
      },
      {
        quote: "We're carrying a legacy system.",
        body: 'Modernization without a rewrite cliff — assessed, planned, and migrated in stages.',
        link: { label: 'Start the conversation', href: routes.contact() },
      },
    ],
    industries: {
      label: 'Recent founding-team work spans',
      tags: [
        'Education',
        'Healthcare Training',
        'Legal',
        'Automotive & Logistics',
        'Recruitment & HR Tech',
        'Consumer',
      ],
    },
  },
  process: {
    eyebrow: 'Our process',
    title: 'From idea to impact.',
    steps: [
      { title: 'Discover', body: 'The business, the users, the real problem.' },
      { title: 'Strategize', body: 'Direction, technology, and a roadmap with priorities.' },
      { title: 'Design', body: 'Experiences shaped around how people actually work.' },
      { title: 'Engineer', body: 'Secure, tested, production-ready systems.' },
      { title: 'Evolve', body: 'Measure, improve, and scale after launch.' },
    ],
  },
  selectedWork: {
    eyebrow: 'Selected work',
    title: 'Built to solve. Designed to matter.',
    viewAll: { label: 'View All Work', href: routes.work },
  },
  why: {
    eyebrow: 'Why Oryntaa',
    title: 'More than a development partner.',
    principles: [
      {
        title: 'Founder-led engineering',
        body: 'Senior engineers on every engagement; the people you meet are the people who build.',
      },
      {
        title: 'AI-first thinking',
        body: "We look for where intelligence creates real value, and say so when it doesn't.",
      },
      {
        title: 'Built for long-term growth',
        body: "Decisions made for the product you'll have in three years, not just the demo next month.",
      },
      {
        title: 'Partnership beyond launch',
        body: 'Shipping is the midpoint of the relationship, not the end.',
      },
    ],
  },
  founders: {
    eyebrow: 'Who we are',
    title: 'Four founders. One shared ambition.',
    description:
      'Oryntaa was founded by four engineers who believe technology should be intelligent, purposeful, and built to last.',
    viewAll: { label: 'Meet Our Leadership', href: routes.leadership },
  },
  insights: {
    eyebrow: 'Insights',
    title: 'Ideas for building what comes next.',
    viewAll: { label: 'Explore All Insights', href: routes.insights },
  },
  cta: {
    title: "Let's build what's next.",
    description: "Tell us where you want to go — we'll bring the engineering to get there.",
    primary: { label: 'Start a Project', href: routes.contact({ intent: 'project' }) },
    secondary: { label: 'Book a Call', href: routes.book },
  },
};
