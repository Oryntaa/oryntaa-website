import { routes } from '@/config/routes';

// Services overview page copy (PAGE_SPECIFICATIONS §3). Hero + engagement models verbatim from the
// spec; the "how services connect" prose follows the spec's described content.
export const servicesPage = {
  hero: {
    eyebrow: 'Our services',
    title: 'Custom software, from strategy to scale.',
    description:
      'Six disciplines covering the full product journey — delivered by a founding team that stays accountable end to end.',
    cta: { label: 'Start a Project', href: routes.contact({ intent: 'project' }) },
  },
  grid: {
    eyebrow: 'What we do',
    title: 'Six disciplines, one accountable team.',
  },
  connect: {
    eyebrow: 'How it fits together',
    title: 'One thread, from concept to scale.',
    body: 'Discovery feeds design, design feeds engineering, and AI and cloud run through everything. You are not handing off between vendors at each stage — the same founding team carries the work from first concept to production and the scaling that follows.',
  },
  engagementModels: {
    eyebrow: 'Engagement models',
    title: 'Ways to work with us.',
    items: [
      {
        title: 'Fixed-Scope Delivery',
        body: 'A defined build, a defined price, a defined date. Best when the problem is clear.',
      },
      {
        title: 'Dedicated Product Team',
        body: 'The founding team embedded as your engineering team, sprint by sprint. Best for ongoing products.',
      },
      {
        title: 'AI Strategy & Prototyping Sprint',
        body: 'Two to three weeks to find where AI creates value in your business and prove it with a working prototype. The lowest-risk way to start.',
      },
    ],
  },
};
