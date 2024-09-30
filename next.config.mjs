/** @type {import('next').NextConfig} */
const clientName = process?.env?.NEXT_PUBLIC_CLIENT_NAME || 'qa';

const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  async headers() {
    const isProduction = process.env.NODE_ENV === 'production';

    const policies = {
      'default-src': ["'self'"],
      'script-src': ["'self'", "'unsafe-inline'", process.env.NEXT_PUBLIC_SCRIPT_SRC_DOMAINS],
      'style-src': ["'self'", "'unsafe-inline'", process.env.NEXT_PUBLIC_STYLE_SRC_DOMAINS],
      'img-src': ["'self'", 'data:', '*'],
      'font-src': ["'self'"],
      'frame-src': ["'self'", process.env.NEXT_PUBLIC_FRAME_SRC_DOMAINS],
      'connect-src': ["'self'", process.env.NEXT_PUBLIC_CONNECT_SRC_DOMAINS],
    };

    if (!isProduction) {
      policies['script-src'].push("'unsafe-eval'");
    }

    const contentSecurityPolicy = Object.entries(policies)
      .map(([key, values]) => `${key} ${values.join(' ')}`)
      .join('; ');

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=3571000; includeSubDomains; preload',
          },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          {
            key: 'Content-Security-Policy',
            value: contentSecurityPolicy,
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
        ],
      },
      {
        source: '/.well-known/apple-app-site-association',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/.well-known/apple-app-site-association',
        destination: `/${clientName}/apple-app-site-association`,
      },
    ];
  },
};

export default nextConfig;
