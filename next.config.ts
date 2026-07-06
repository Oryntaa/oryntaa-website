import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Allow SVGs (the founder photo placeholder is an SVG), sandboxed and script-free per Next's
    // safe pattern. Real founder photography (raster) replaces the placeholder in Phase 8.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
