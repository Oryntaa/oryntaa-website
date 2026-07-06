/**
 * Founders (CONTENT_ARCHITECTURE §1) — validated by getFounders() against founderSchema.
 * TODO(content): expand `intro` into full bios and replace the shared photo placeholder with real
 * photography in public/images/founders/ (Phase 8 / Gate 8). GitHub handles to add if wanted.
 */
export const founders = [
  {
    slug: 'muhammad-awais',
    name: 'Muhammad Awais',
    role: 'Co-Founder & CEO',
    intro:
      'Co-founder and CEO. Full-stack and mobile engineering across React, Next.js, and Node.js.',
    focusAreas: ['React', 'Next.js', 'Node.js', 'React Native'],
    photo: '/images/founders/placeholder.svg',
    linkedin: 'https://www.linkedin.com/in/muhammad-awais-455435267/',
  },
  {
    slug: 'usama-manzoor',
    name: 'M Usama Manzoor',
    role: 'Co-Founder',
    intro: 'Co-founder. Backend and ML-integration engineering with Django, React, and REST APIs.',
    focusAreas: ['Django', 'React', 'REST APIs', 'ML integration'],
    photo: '/images/founders/placeholder.svg',
    linkedin: 'https://www.linkedin.com/in/usamamanzoor02/',
  },
  {
    slug: 'noman-mustafa',
    name: 'Noman Mustafa',
    role: 'Co-Founder',
    intro:
      'Co-founder. Full-stack engineering and AI integrations with React, Node.js, and REST APIs.',
    focusAreas: ['React', 'Node.js', 'REST APIs', 'AI integrations'],
    photo: '/images/founders/placeholder.svg',
    linkedin: 'https://www.linkedin.com/in/noman-mustafa-95064b34b/',
  },
  {
    slug: 'muhammad-adeel-ashraf',
    name: 'Muhammad Adeel Ashraf',
    role: 'Co-Founder',
    intro: 'Co-founder. Full-stack engineering with React, Django, Python, and REST APIs.',
    focusAreas: ['React.js', 'Django', 'REST APIs', 'Python'],
    photo: '/images/founders/placeholder.svg',
    linkedin: 'https://www.linkedin.com/in/muhammad-adeel-ashraf-24a35541b/',
  },
];
