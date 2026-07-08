// check:content — build-time content integrity gate (CONTENT_ARCHITECTURE §4). Runs the real Zod
// schemas over every content module + MDX frontmatter and enforces the cross-collection rules:
// unique slugs, referenced slugs/images exist, exactly-3 featured when the work gate passes,
// permission×status, no future publish dates, required SEO fields, and the 140–160 character
// description band from SEO_ARCHITECTURE §2. Fails the build (and `verify`).
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import matter from 'gray-matter';
import type { ZodError, ZodType } from 'zod';

import { aboutPage } from '../content/about-page';
import { openings } from '../content/careers/openings';
import { careersPage } from '../content/careers-page';
import { contactPage } from '../content/contact-page';
import { founders } from '../content/founders';
import { insightsPage } from '../content/insights-page';
import { leadershipPage } from '../content/leadership-page';
import { projects } from '../content/projects';
import { services } from '../content/services';
import { servicesPage } from '../content/services-page';
import { site } from '../content/site';
import { workPage } from '../content/work-page';
import { WORK_GATE_THRESHOLD } from '../src/config/constants';
import {
  articleFrontmatterSchema,
  founderSchema,
  legalFrontmatterSchema,
  openingSchema,
  pageSeoSchema,
  projectMetaSchema,
  serviceSchema,
  siteSchema,
  type ArticleFrontmatter,
  type Founder,
  type PageSeo,
  type ProjectMeta,
  type Service,
} from '../src/lib/content/schemas';

const ROOT = process.cwd();
const PUBLIC_DIR = join(ROOT, 'public');
const errors: string[] = [];

function fail(rule: string, message: string): void {
  errors.push(`  [${rule}] ${message}`);
}

function formatIssues(error: ZodError): string {
  return error.issues
    .map((issue) => `${issue.path.join('.') || '(root)'}: ${issue.message}`)
    .join('; ');
}

function parseEach<T>(schema: ZodType<T>, items: unknown[], label: string): T[] {
  const parsed: T[] = [];
  items.forEach((item, index) => {
    const result = schema.safeParse(item);
    if (result.success) parsed.push(result.data);
    else fail('schema', `${label}[${String(index)}]: ${formatIssues(result.error)}`);
  });
  return parsed;
}

function readMdxFrontmatter(collection: string): { slug: string; data: unknown }[] {
  const dir = join(ROOT, 'content', collection);
  let files: string[];
  try {
    files = readdirSync(dir).filter((file) => file.endsWith('.mdx'));
  } catch {
    return [];
  }
  return files.map((file) => ({
    slug: file.replace(/\.mdx$/, ''),
    data: matter(readFileSync(join(dir, file), 'utf8')).data,
  }));
}

function assertUniqueSlugs(slugs: string[], label: string): void {
  const seen = new Set<string>();
  for (const slug of slugs) {
    if (seen.has(slug)) fail('unique-slug', `${label}: duplicate slug "${slug}"`);
    seen.add(slug);
  }
}

function assertImageExists(path: string, owner: string): void {
  const relative = path.startsWith('/') ? path.slice(1) : path;
  if (!existsSync(join(PUBLIC_DIR, relative))) {
    fail('image', `${owner}: referenced image not found in public/ → "${path}"`);
  }
}

/** SEO_ARCHITECTURE §2: descriptions fill the SERP snippet without being truncated. Below the
 *  band leaves room unused; above it, Google cuts the tail off. */
const DESCRIPTION_MIN = 140;
const DESCRIPTION_MAX = 160;

function assertDescription(description: string, owner: string): void {
  const length = description.trim().length;
  if (length === 0) {
    fail('seo', `${owner}: seo.description is empty`);
    return;
  }
  if (length < DESCRIPTION_MIN || length > DESCRIPTION_MAX) {
    fail(
      'seo',
      `${owner}: seo.description is ${String(length)} chars — SEO_ARCHITECTURE §2 requires ${String(DESCRIPTION_MIN)}–${String(DESCRIPTION_MAX)}`,
    );
  }
}

function assertSeo(seo: { title: string; description: string }, owner: string): void {
  if (seo.title.trim() === '') fail('seo', `${owner}: seo.title is empty`);
  assertDescription(seo.description, owner);
}

// --- Parse every collection against its schema ---
const siteResult = siteSchema.safeParse(site);
if (!siteResult.success) fail('schema', `site: ${formatIssues(siteResult.error)}`);
// site.description is the homepage's meta description (root layout), so it sits in the same band.
else assertDescription(siteResult.data.description, 'site');

// Page-level copy lives in content modules, never in a component (SEO_ARCHITECTURE §2).
const pageSeoModules: { owner: string; seo: PageSeo }[] = [
  { owner: 'services-page', seo: servicesPage.seo },
  { owner: 'about-page', seo: aboutPage.seo },
  { owner: 'leadership-page', seo: leadershipPage.seo },
  { owner: 'careers-page', seo: careersPage.seo },
  { owner: 'contact-page', seo: contactPage.seo },
  { owner: 'work-page', seo: workPage.seo },
  { owner: 'insights-page', seo: insightsPage.seo },
];
for (const page of pageSeoModules) {
  const result = pageSeoSchema.safeParse(page.seo);
  if (!result.success) fail('schema', `${page.owner}: ${formatIssues(result.error)}`);
  else assertSeo(result.data, page.owner);
}

const parsedServices = parseEach<Service>(serviceSchema, services, 'services');
const parsedProjects = parseEach<ProjectMeta>(projectMetaSchema, projects, 'projects');
const parsedFounders = parseEach<Founder>(founderSchema, founders, 'founders');
parseEach(openingSchema, openings, 'openings');

const articleEntries = readMdxFrontmatter('insights');
const parsedArticles: ArticleFrontmatter[] = [];
for (const entry of articleEntries) {
  const result = articleFrontmatterSchema.safeParse(entry.data);
  if (result.success) parsedArticles.push(result.data);
  else fail('schema', `insights/${entry.slug}.mdx: ${formatIssues(result.error)}`);
}
for (const entry of readMdxFrontmatter('legal')) {
  const result = legalFrontmatterSchema.safeParse(entry.data);
  if (!result.success) fail('schema', `legal/${entry.slug}.mdx: ${formatIssues(result.error)}`);
  else assertSeo(result.data.seo, `legal "${entry.slug}"`);
}

// --- Unique slugs per collection ---
assertUniqueSlugs(
  parsedServices.map((service) => service.slug),
  'services',
);
assertUniqueSlugs(
  parsedProjects.map((project) => project.slug),
  'projects',
);
assertUniqueSlugs(
  parsedArticles.map((article) => article.slug),
  'insights',
);
assertUniqueSlugs(
  parsedFounders.map((founder) => founder.slug),
  'founders',
);

// --- Referenced slugs exist ---
const serviceSlugs = new Set(parsedServices.map((service) => service.slug));
const founderSlugs = new Set(parsedFounders.map((founder) => founder.slug));

for (const service of parsedServices) {
  for (const related of service.relatedServices) {
    if (!serviceSlugs.has(related)) {
      fail('ref', `service "${service.slug}": relatedServices references unknown "${related}"`);
    }
  }
  assertSeo(service.seo, `service "${service.slug}"`);
}

for (const project of parsedProjects) {
  for (const used of project.services) {
    if (!serviceSlugs.has(used)) {
      fail('ref', `project "${project.slug}": services references unknown "${used}"`);
    }
  }
  if (project.permission === 'pending' && project.status === 'published') {
    fail(
      'permission',
      `project "${project.slug}": permission "pending" cannot be status "published"`,
    );
  }
  assertSeo(project.seo, `project "${project.slug}"`);
  // Images are only required once a project is publicly renderable (§5); drafts may reference
  // covers/gallery shots that get added before the project is cleared for publish.
  if (project.status === 'published' && project.permission !== 'pending') {
    assertImageExists(project.cover, `project "${project.slug}" cover`);
    for (const shot of project.gallery) {
      assertImageExists(shot, `project "${project.slug}" gallery`);
    }
  }
}

for (const article of parsedArticles) {
  if (!founderSlugs.has(article.author)) {
    fail('ref', `article "${article.slug}": author references unknown founder "${article.author}"`);
  }
  if (article.publishedAt.getTime() > Date.now()) {
    fail('date', `article "${article.slug}": publishedAt is in the future`);
  }
  // `seo` is partial for articles (CONTENT_ARCHITECTURE §2); when a description is authored it
  // still has to sit in the band. Absent, the route falls back to the excerpt.
  if (article.seo.description !== undefined) {
    assertDescription(article.seo.description, `article "${article.slug}"`);
  }
  if (article.cover !== undefined)
    assertImageExists(article.cover, `article "${article.slug}" cover`);
}

for (const founder of parsedFounders) {
  assertImageExists(founder.photo, `founder "${founder.slug}" photo`);
}

// --- Exactly three featured projects once the work gate passes ---
const publishedProjects = parsedProjects.filter(
  (project) => project.status === 'published' && project.permission !== 'pending',
);
if (publishedProjects.length >= WORK_GATE_THRESHOLD) {
  const featuredCount = publishedProjects.filter(
    (project) => project.featured !== undefined,
  ).length;
  if (featuredCount !== 3) {
    fail(
      'featured',
      `work gate is on but ${String(featuredCount)} projects are featured (need exactly 3)`,
    );
  }
}

if (errors.length > 0) {
  console.error('check:content — integrity errors (CONTENT_ARCHITECTURE §4):');
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('check:content ✓ content integrity rules pass');
