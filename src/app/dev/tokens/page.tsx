import { notFound } from 'next/navigation';

/*
 * Internal design-token QA surface (ROADMAP 1.2). Renders the DESIGN_SYSTEM tokens — ramps,
 * semantic pairs on light + dark, type scale, spacing, radii, shadows, the Horizon — as the
 * Gate 1 review surface. Available locally and on Vercel Preview; excluded from production.
 * Swatches read the live token custom properties directly so the page reflects globals.css.
 */

const BRAND_STEPS = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
const NEUTRAL_STEPS = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

const SEMANTIC_TOKENS = [
  'canvas',
  'surface',
  'ink',
  'ink-muted',
  'line',
  'accent',
  'accent-text',
  'accent-contrast',
  'success',
  'error',
];

const TYPE_SCALE = [
  { name: 'display-xl', className: 'font-display text-display-xl' },
  { name: 'display-lg', className: 'font-display text-display-lg' },
  { name: 'display-md', className: 'font-display text-display-md' },
  { name: 'display-sm', className: 'font-display text-display-sm' },
  { name: 'body-lg', className: 'font-body text-body-lg' },
  { name: 'body', className: 'font-body text-body' },
  { name: 'body-sm', className: 'font-body text-body-sm' },
];

const RADII = [
  { name: 'sm', className: 'rounded-sm' },
  { name: 'md', className: 'rounded-md' },
  { name: 'lg', className: 'rounded-lg' },
  { name: 'xl', className: 'rounded-xl' },
];

interface SwatchProps {
  token: string;
  label: string;
}

function Swatch({ token, label }: SwatchProps): React.JSX.Element {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="border-line h-16 rounded-md border"
        style={{ backgroundColor: `var(${token})` }}
      />
      <span className="text-body-sm text-ink-muted font-mono">{label}</span>
    </div>
  );
}

interface TokenSectionProps {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}

function TokenSection({ eyebrow, title, children }: TokenSectionProps): React.JSX.Element {
  return (
    <section className="border-line flex flex-col gap-6 border-t py-12">
      <header className="flex flex-col gap-2">
        <span className="text-eyebrow text-accent-text font-mono uppercase">{eyebrow}</span>
        <h2 className="font-display text-display-sm text-ink">{title}</h2>
      </header>
      {children}
    </section>
  );
}

function SemanticPanel({ theme }: { theme: 'light' | 'dark' }): React.JSX.Element {
  return (
    <div
      data-theme={theme === 'dark' ? 'dark' : undefined}
      className="border-line flex flex-col gap-4 rounded-lg border p-6"
      style={{ backgroundColor: 'var(--color-canvas)' }}
    >
      <span className="text-eyebrow text-ink-muted font-mono uppercase">{theme}</span>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {SEMANTIC_TOKENS.map((name) => (
          <Swatch key={name} token={`--color-${name}`} label={name} />
        ))}
      </div>
    </div>
  );
}

export default function DevTokensPage(): React.JSX.Element {
  // Dev + Preview only; the production build renders this as a 404.
  if (process.env.VERCEL_ENV === 'production') {
    notFound();
  }

  return (
    <main className="mx-auto flex max-w-5xl flex-col px-6 py-16">
      <header className="flex flex-col gap-3 pb-8">
        <span className="text-eyebrow text-accent-text font-mono uppercase">Design system</span>
        <h1 className="font-display text-display-lg text-ink">Token reference</h1>
        <p className="text-body-lg text-ink-muted max-w-2xl">
          Live values from styles/globals.css. Gate 1 review surface — check the palette, type, and
          spacing against DESIGN_SYSTEM §2–§5.
        </p>
      </header>

      <TokenSection eyebrow="Color" title="Brand ramp">
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
          {BRAND_STEPS.map((step) => (
            <Swatch key={step} token={`--color-brand-${step}`} label={`brand-${step}`} />
          ))}
        </div>
      </TokenSection>

      <TokenSection eyebrow="Color" title="Neutral ramp">
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
          {NEUTRAL_STEPS.map((step) => (
            <Swatch key={step} token={`--color-neutral-${step}`} label={`neutral-${step}`} />
          ))}
        </div>
      </TokenSection>

      <TokenSection eyebrow="Color" title="Semantic tokens (light + dark)">
        <div className="grid gap-6 md:grid-cols-2">
          <SemanticPanel theme="light" />
          <SemanticPanel theme="dark" />
        </div>
      </TokenSection>

      <TokenSection eyebrow="Type" title="Fluid scale">
        <div className="flex flex-col gap-5">
          {TYPE_SCALE.map((item) => (
            <div key={item.name} className="flex flex-col gap-1">
              <span className="text-body-sm text-ink-muted font-mono">{item.name}</span>
              <span className={`${item.className} text-ink`}>Building Digital Futures</span>
            </div>
          ))}
          <div className="flex flex-col gap-1">
            <span className="text-body-sm text-ink-muted font-mono">eyebrow</span>
            <span className="text-eyebrow text-accent-text font-mono uppercase">What we do</span>
          </div>
        </div>
      </TokenSection>

      <TokenSection eyebrow="Space" title="Section rhythm & gaps">
        <div className="flex flex-col gap-2">
          <span className="text-body-sm text-ink-muted font-mono">--space-section</span>
          <div
            className="bg-accent w-full rounded-md"
            style={{ blockSize: 'var(--space-section)' }}
          />
        </div>
        <div className="flex flex-col gap-4">
          {[
            { label: 'gap-6 (24px)', className: 'gap-6' },
            { label: 'gap-8 (32px)', className: 'gap-8' },
            { label: 'gap-12 (48px)', className: 'gap-12' },
          ].map((row) => (
            <div key={row.label} className="flex flex-col gap-1">
              <span className="text-body-sm text-ink-muted font-mono">{row.label}</span>
              <div className={`flex ${row.className}`}>
                <div className="bg-accent h-8 w-8 rounded-sm" />
                <div className="bg-accent h-8 w-8 rounded-sm" />
                <div className="bg-accent h-8 w-8 rounded-sm" />
              </div>
            </div>
          ))}
        </div>
      </TokenSection>

      <TokenSection eyebrow="Shape" title="Radii & elevation">
        <div className="flex flex-wrap gap-6">
          {RADII.map((r) => (
            <div key={r.name} className="flex flex-col items-center gap-2">
              <div className={`border-line bg-surface h-20 w-20 border ${r.className}`} />
              <span className="text-body-sm text-ink-muted font-mono">radius-{r.name}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-8 pt-2">
          <div className="flex flex-col items-center gap-2">
            <div className="bg-surface shadow-card h-20 w-32 rounded-lg" />
            <span className="text-body-sm text-ink-muted font-mono">shadow-card</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="bg-surface shadow-raised h-20 w-32 rounded-lg" />
            <span className="text-body-sm text-ink-muted font-mono">shadow-raised</span>
          </div>
        </div>
      </TokenSection>

      <TokenSection eyebrow="Atmosphere" title="Horizon gradient">
        <div
          className="border-line flex h-56 items-end justify-center rounded-xl border"
          style={{
            backgroundColor: 'var(--color-canvas)',
            backgroundImage: 'var(--gradient-horizon)',
          }}
        >
          <span className="text-body-sm text-ink-muted pb-6 font-mono">--gradient-horizon</span>
        </div>
      </TokenSection>
    </main>
  );
}
