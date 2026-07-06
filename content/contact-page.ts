// Contact page copy (PAGE_SPECIFICATIONS §10). Hero, promise line, success + error states verbatim
// from the spec; FAQ answers drafted around the spec's six topics.
export const contactPage = {
  hero: {
    eyebrow: 'Contact',
    title: "Let's talk about what's next.",
    description:
      "Whether you have a product idea, a business challenge, or just a question — we'd like to hear it.",
    promise: 'We reply within one business day.',
  },
  routes: [
    { value: 'project', label: 'Start a Project', description: 'You have something to build.' },
    { value: 'general', label: 'General', description: 'A question or something else.' },
    { value: 'partnership', label: 'Partnership', description: 'Build together or refer work.' },
    { value: 'careers', label: 'Careers', description: 'Join the founding team.' },
    { value: 'other', label: 'Something else', description: 'Anything not covered above.' },
  ],
  aside: {
    eyebrow: 'What to expect',
    steps: [
      {
        title: 'We read it ourselves',
        body: 'No bots, no gatekeepers — a founder reads every message that comes in.',
      },
      {
        title: 'We reply within a day',
        body: 'Expect a considered response within one business day, not an autoresponder.',
      },
      {
        title: 'We scope it together',
        body: 'If it looks like a fit, we set up a call with a founder to scope the work.',
      },
    ],
    directLabel: 'Prefer email? Reach us directly at',
  },
  booking: {
    title: 'Prefer to talk it through?',
    description: 'Book a 30-minute call with a founder.',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Questions, answered.',
    items: [
      {
        q: 'How do engagements start?',
        a: 'Usually a short call to understand the problem, then a written proposal with scope, price, and timeline. Where there are real unknowns, we often start with a short discovery or an AI prototyping sprint.',
      },
      {
        q: 'What are your engagement models?',
        a: 'Three: fixed-scope delivery for well-defined builds, a dedicated product team for ongoing work, and a two-to-three-week AI strategy and prototyping sprint to find and prove value fast.',
      },
      {
        q: 'What are typical timelines?',
        a: 'An MVP is typically weeks, not months. Larger builds are scoped in phases with a decision point at each one, so you are never committing to the whole roadmap up front.',
      },
      {
        q: 'How do budgets work?',
        a: 'We scope to a fixed price wherever the problem is clear, and work in sprints where it is not. Either way, you will know what you are spending before we start.',
      },
      {
        q: 'Who will we work with day to day?',
        a: 'The founders — directly. The senior engineers you meet are the people who build; there are no account managers and no handoffs.',
      },
      {
        q: 'Who owns the IP?',
        a: 'You do — in writing. All code, designs, and deliverables are yours.',
      },
    ],
  },
  success: {
    title: "Thank you — we'll be in touch.",
    body: 'Your message is with the founding team. Expect a reply within one business day.',
  },
  error: {
    // {email} is appended as a mailto link by the form.
    body: "Something went wrong on our side — your message wasn't sent. Please try again, or email us directly at",
  },
} as const;
