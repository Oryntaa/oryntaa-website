import { ImageResponse } from 'next/og';

export const runtime = 'edge';

/** Allowlisted OG types → their eyebrow label (API_ARCHITECTURE §6: params are constrained). */
const TYPE_LABEL: Record<string, string> = {
  default: 'AI-First Software Engineering',
  service: 'Services',
  work: 'Selected Work',
  article: 'Insights',
  page: 'Oryntaa',
};

/** GET /api/og?title=…&type=… — branded social card (SEO_ARCHITECTURE §2, API_DOCUMENTATION §2). */
export function GET(request: Request): ImageResponse {
  const { searchParams, origin } = new URL(request.url);
  const title = (searchParams.get('title') ?? 'Oryntaa').slice(0, 100);
  const rawType = searchParams.get('type') ?? 'default';
  const label = TYPE_LABEL[rawType] ?? TYPE_LABEL.default;

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#0c0a09',
        backgroundImage: 'radial-gradient(80% 60% at 15% 100%, rgba(234,88,12,0.35), transparent)',
        padding: '80px',
      }}
    >
      {/* Light lockup reads on the dark card; absolute URL so satori can fetch it at render.
            ImageResponse/satori requires a raw <img>; next/image is unsupported here. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${origin}/brand/oryntaa-logo-light.png`}
        height={72}
        width={242}
        alt=""
        style={{ objectFit: 'contain' }}
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#fb923c',
            marginBottom: 24,
          }}
        >
          {label}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.1,
            color: '#fafaf9',
            maxWidth: 960,
          }}
        >
          {title}
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
