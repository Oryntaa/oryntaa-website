import { routes } from '@/config/routes';

// About page copy (PAGE_SPECIFICATIONS §6). Mission is verbatim from the spec; principle and
// how-we-build points follow the spec. Story + vision are founder-written slots, drafted in brand
// voice for review.
export const aboutPage = {
  seo: {
    title: 'About',
    description:
      'Oryntaa is an AI-first software engineering company — founder-led, senior engineers on every engagement, quality without compromise, built for long-term growth.',
  },
  hero: {
    eyebrow: 'About Oryntaa',
    title: 'Technology with intelligence, purpose, and ambition.',
  },
  story: {
    eyebrow: 'Our story',
    title: 'Why Oryntaa exists.',
    // TODO(content): founder-written — drafted for review (PAGE_SPECIFICATIONS §6).
    paragraphs: [
      'Oryntaa was founded by four engineers who had built software inside startups and enterprises alike — and kept seeing the same failure. Products that dazzled in the demo and quietly broke six months later, when the person who understood them had moved on and nobody had written down how any of it worked.',
      "We started Oryntaa to build the other kind of software. The kind where senior engineers stay accountable from first concept to production, where quality is the baseline rather than the upsell, and where decisions are made for the product you'll have in three years — not the one due next month.",
      "We're AI-first because intelligence, applied honestly, changes what a small team can build — and we're just as honest about where it doesn't yet belong. Either way, every line is reviewed and owned by a person.",
    ],
  },
  missionVision: {
    eyebrow: 'Mission & vision',
    mission: {
      label: 'Mission',
      body: 'To empower organizations worldwide through intelligent technology and digital products that drive meaningful growth.',
    },
    vision: {
      label: 'Vision',
      // TODO(content): editable founder slot — drafted for review.
      body: 'To be the engineering partner organizations trust with their most important products — where intelligent technology and senior craft are inseparable.',
    },
  },
  principles: {
    eyebrow: 'Principles',
    title: 'What we hold to.',
    items: [
      {
        title: 'Think beyond the brief',
        body: 'The brief is the starting point, not the ceiling. We ask what you are really trying to achieve, and design for that.',
      },
      {
        title: 'Build with purpose',
        body: 'Every feature earns its place. We build what moves the outcome, not what fills a backlog.',
      },
      {
        title: 'Quality without compromise',
        body: "Tested, secure, and maintainable is the baseline, not the upgrade. We don't ship what we wouldn't run ourselves.",
      },
      {
        title: 'Grow together',
        body: 'Your success is the metric. We are a partner through launch and the years after, not a vendor through a deadline.',
      },
    ],
  },
  howWeBuild: {
    eyebrow: 'How we build',
    title: 'Standards we hold ourselves to.',
    intro: 'Not aspirations — the promises behind every engagement.',
    items: [
      {
        title: 'Strict type safety, end to end',
        body: 'Whole classes of bugs are caught before they ever reach you.',
      },
      {
        title: 'Security at the database layer',
        body: 'Access rules live where they cannot be bypassed — not bolted onto the UI.',
      },
      {
        title: 'Design tokens over hardcoded values',
        body: 'Every screen stays consistent, and changes once — everywhere.',
      },
      {
        title: 'Senior-owned, AI-assisted',
        body: 'Every AI-assisted line is reviewed and owned by a senior engineer. Speed never costs accountability.',
      },
      {
        title: 'Documentation as delivery',
        body: 'What we build, you can understand, run, and hand to the next engineer.',
      },
    ],
    articleLink: { label: 'Read the engineering standard', href: routes.article('how-we-build') },
  },
  leadership: {
    eyebrow: 'Leadership',
    title: 'Four founders. One shared standard.',
    viewAll: { label: 'Meet the team', href: routes.leadership },
  },
  careers: {
    eyebrow: 'Careers',
    title: 'Build meaningful technology with us.',
    body: 'We are always interested in meeting thoughtful, ambitious engineers who care how software is made.',
    cta: { label: 'View careers', href: routes.careers },
  },
} as const;
