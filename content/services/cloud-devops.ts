// Cloud & DevOps (service 6/6). oneLiner + capabilities verbatim; problem/approach/FAQ drafted.
export const cloudDevops = {
  slug: 'cloud-devops',
  name: 'Cloud & DevOps',
  navLabel: 'Cloud & DevOps',
  oneLiner:
    'Architecture, deployment, and observability that keep production fast, safe, and affordable.',
  heroTitle: 'Production that stays boring.',
  heroDescription:
    'Architecture, deployment, and observability that keep your product fast, safe, and affordable — so shipping is routine and outages are rare.',
  overview: [
    'The engineering that keeps everything else running — architecture, deployment, and observability behind a product that stays fast, safe, and affordable.',
    'We treat operations as part of the build: infrastructure defined in code, deploys boring on purpose, monitoring that warns you before users do. Cost is a design constraint, not a quarterly surprise.',
    'For teams whose product has real users and real bills.',
  ],
  problems: [
    {
      title: 'Scary, manual deploys',
      body: 'Releases that depend on one person and a runbook turn every ship into a held breath.',
    },
    {
      title: 'Blind in production',
      body: 'Without observability, you learn about outages from users instead of from your own alerts.',
    },
    {
      title: 'Runaway cloud bills',
      body: 'Costs that nobody designed for arrive as a quarterly surprise instead of a known constraint.',
    },
    {
      title: 'Security as an afterthought',
      body: 'Hardening left until later becomes the gap an incident finds first.',
    },
  ],
  capabilities: [
    { title: 'Architecture & deployment' },
    { title: 'CI/CD' },
    { title: 'Observability' },
    { title: 'Cost & performance' },
    { title: 'Security hardening' },
  ],
  approach: [
    {
      step: 'Assess',
      body: 'We map how your product is built, deployed, and monitored today, and find the risks and the waste.',
    },
    {
      step: 'Automate',
      body: 'Infrastructure as code and a CI/CD pipeline make deploys repeatable, reviewable, and boring on purpose.',
    },
    {
      step: 'Observe',
      body: 'Logging, metrics, and alerts warn you before users do — and make incidents diagnosable, not mysterious.',
    },
    {
      step: 'Harden & tune',
      body: 'We close security gaps and tune cost and performance so production stays safe and affordable as you grow.',
    },
  ],
  technologies: ['AWS', 'Google Cloud', 'Vercel', 'Docker', 'GitHub Actions', 'Terraform'],
  relatedServices: ['web-development', 'saas-mvp', 'ai-solutions'],
  faq: [
    {
      q: 'Which cloud do you work with?',
      a: 'AWS, Google Cloud, and Vercel — we pick for your workload and budget rather than forcing one provider on every project.',
    },
    {
      q: 'Can you fix our deploys/CI/CD?',
      a: 'Yes — we turn manual, risky releases into an automated pipeline where every change is previewed, reviewed, and reversible.',
    },
    {
      q: 'How do you help with cloud costs?',
      a: 'We treat cost as a design constraint: right-sizing, caching, and architecture choices that keep the bill predictable, not surprising.',
    },
    {
      q: 'What does observability give us?',
      a: 'Logs, metrics, and alerts that tell you something is wrong before your users do — and make the cause quick to find.',
    },
    {
      q: 'Do you handle security hardening?',
      a: 'Yes — secrets, headers, access, and dependency hygiene are part of the build, not a task deferred until after an incident.',
    },
  ],
  seo: {
    title: 'Cloud & DevOps | Oryntaa',
    description:
      'Architecture, CI/CD, and observability that keep production fast, safe, and affordable — shipping routine, outages rare.',
  },
  order: 6,
};
