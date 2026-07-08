import { ImageResponse } from 'next/og';

export const runtime = 'edge';

const WIDTH = 1200;
const HEIGHT = 630;
const TITLE_MAX = 90;
const EYEBROW_MAX = 48;

/** Allowlisted card types → their default eyebrow (API_DOCUMENTATION §2). */
const TYPE_LABEL = {
  page: 'Oryntaa',
  service: 'Services',
  project: 'Selected Work',
  article: 'Insights',
} as const;

const OG_TYPES = ['page', 'service', 'project', 'article'] as const;
type OgCardType = (typeof OG_TYPES)[number];

const ALLOWED_PARAMS = new Set(['title', 'type', 'eyebrow']);

const SPACE = 0x20;
const DEL = 0x7f;

function isOgCardType(value: string): value is OgCardType {
  return (OG_TYPES as readonly string[]).includes(value);
}

/** Collapse control chars + runs of whitespace, then cap (API_DOCUMENTATION §2). These params land
 *  in an image rather than in HTML, but a stray control char breaks satori's text shaper. */
function sanitize(value: string, max: number): string {
  let cleaned = '';
  for (const char of value) {
    const code = char.codePointAt(0) ?? SPACE;
    cleaned += code < SPACE || code === DEL ? ' ' : char;
  }
  return cleaned.replace(/\s+/g, ' ').trim().slice(0, max);
}

/** Bundled Latin subsets, instanced to a single weight (API_DOCUMENTATION §2). Resolved once per
 *  edge isolate: the module-scope promise is shared across every request the isolate serves. */
const fontsPromise = Promise.all([
  fetch(new URL('./fonts/Sora-Bold-latin.ttf', import.meta.url)).then((res) => res.arrayBuffer()),
  fetch(new URL('./fonts/JetBrainsMono-Regular-latin.ttf', import.meta.url)).then((res) =>
    res.arrayBuffer(),
  ),
]);

/** GET /api/og?title=…&type=…&eyebrow=… — branded social card (SEO_ARCHITECTURE §2).
 *  Colors are literal because satori resolves no CSS custom properties; they mirror the
 *  DESIGN_SYSTEM canvas/brand tokens. */
export async function GET(request: Request): Promise<Response> {
  const { searchParams, origin } = new URL(request.url);

  for (const key of searchParams.keys()) {
    if (!ALLOWED_PARAMS.has(key)) {
      return new Response(`Unknown parameter: ${key}`, { status: 400 });
    }
  }

  const rawType = searchParams.get('type') ?? 'page';
  if (!isOgCardType(rawType)) {
    return new Response(`Unknown type: ${rawType}`, { status: 400 });
  }

  const title = sanitize(searchParams.get('title') ?? '', TITLE_MAX);
  const eyebrow = sanitize(searchParams.get('eyebrow') ?? TYPE_LABEL[rawType], EYEBROW_MAX);
  const [sora, mono] = await fontsPromise;

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
            fontFamily: 'JetBrains Mono',
            fontSize: 24,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#fb923c',
            marginBottom: 24,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: 'flex',
            fontFamily: 'Sora',
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.1,
            color: '#fafaf9',
            maxWidth: 960,
          }}
        >
          {title === '' ? 'Oryntaa' : title}
        </div>
      </div>
    </div>,
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        { name: 'Sora', data: sora, weight: 700, style: 'normal' },
        { name: 'JetBrains Mono', data: mono, weight: 400, style: 'normal' },
      ],
    },
  );
}
