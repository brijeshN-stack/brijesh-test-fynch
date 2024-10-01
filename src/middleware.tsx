import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const isProduction = process.env.NODE_ENV === 'production';

  const policies = {
    'default-src': ["'self'"],
    'script-src': [`'self'`, `'nonce-${nonce}'`, process.env.NEXT_PUBLIC_SCRIPT_SRC_DOMAINS],
    'style-src': [`'self'`, `'nonce-${nonce}'`, process.env.NEXT_PUBLIC_STYLE_SRC_DOMAINS],
    'frame-src': ["'self'", process.env.NEXT_PUBLIC_FRAME_SRC_DOMAINS],
    'connect-src': ["'self'", process.env.NEXT_PUBLIC_CONNECT_SRC_DOMAINS],
    'img-src': ["'self'", 'data:', '*'],
    'font-src': ["'self'"],
    'frame-ancestors': ["'none'"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
  };

  if (!isProduction) {
    policies['script-src'].push("'unsafe-eval'");
  }

  const contentSecurityPolicy = Object.entries(policies)
    .map(([key, values]) => `${key} ${values.join(' ')}`)
    .join('; ');
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  requestHeaders.set('Content-Security-Policy', contentSecurityPolicy);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set('Content-Security-Policy', contentSecurityPolicy);

  return response;
}
export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
