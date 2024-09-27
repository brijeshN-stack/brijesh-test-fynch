/** @type {import('next').NextConfig} */

const nextConfig = {
    output: 'standalone',
    reactStrictMode: false,
    async headers() {
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
              value: `
                    default-src 'self';  
                    frame-src 'self' ${process.env.NEXT_PUBLIC_FRAME_SRC_DOMAINS};
                    script-src 'self' 'unsafe-inline' 'unsafe-eval' ${process.env.NEXT_PUBLIC_SCRIPT_SRC_DOMAINS};
                    connect-src 'self' ${process.env.NEXT_PUBLIC_CONNECT_SRC_DOMAINS};
                    style-src 'self' 'unsafe-inline' ${process.env.NEXT_PUBLIC_STYLE_SRC_DOMAINS};  
                    img-src 'self' data: *;
                    font-src 'self';
                    `
                .trim()
                .replace(/\s+/g, ' '),
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
      ];
    },
  };
  export default nextConfig;