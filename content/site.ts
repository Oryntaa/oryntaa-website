/**
 * Site identity (CONTENT_ARCHITECTURE §1). Plain data — validated by getSite() against siteSchema.
 * TODO(content): bookingUrl (👤, later) and the stack-logo row (drop SVGs in public/images/stack/,
 * then wire them here). Industries are drafted from our project sectors — flag for review.
 */
export const site = {
  name: 'Oryntaa',
  slogan: 'Building Digital Futures',
  description:
    'An AI-first software engineering company building intelligent digital products — assistants, web and mobile platforms, and MVPs — for organizations worldwide.',
  email: 'hello@oryntaa.com',
  socials: {
    linkedin: 'https://www.linkedin.com/company/oryntaa',
    instagram: 'https://www.instagram.com/oryntaa/',
    facebook: 'https://www.facebook.com/people/Oryntaa/61591166057905/',
  },
  stack: [],
  industries: [
    'Healthcare & Education',
    'Recruitment & HR Tech',
    'Automotive & Logistics',
    'Legal & Family',
    'SaaS & Startups',
    'E-commerce & Marketplaces',
  ],
};
