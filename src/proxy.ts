import { NextRequest, NextResponse } from 'next/server';

// ── Crawlers we always let through (search engines + link previews) ─────────
const GOOD_BOTS =
  /googlebot|google-inspectiontool|googleother|adsbot-google|bingbot|bingpreview|duckduckbot|applebot|yandex|baiduspider|slurp|facebookexternalhit|twitterbot|linkedinbot|slackbot|whatsapp|telegrambot|pinterest/i;

// ── Common scraping tools / HTTP libraries that identify themselves ─────────
const SCRAPERS =
  /scrapy|python-requests|python-urllib|aiohttp|httpx|curl\/|wget|httrack|libwww|go-http-client|okhttp|java\/|apache-httpclient|node-fetch|undici|axios|got \(|colly|mechanize|phantomjs|headlesschrome|selenium|puppeteer|playwright|crawler4j|semrushbot|ahrefsbot|mj12bot|dotbot|petalbot|dataforseo|megaindex|blexbot|zoominfobot|bytespider/i;

// Data endpoints that only our own pages should call from a browser.
const DATA_API = /^\/api\/(activities|categories|countries|regions|stats|recommendations|analytics)(\/|$)/;

// Soft per-IP rate limit for the data API (best-effort, per server instance).
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 90;
const hits = new Map<string, { count: number; reset: number }>();

function limited(ip: string) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || rec.reset < now) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    if (hits.size > 5000) for (const [k, v] of hits) if (v.reset < now) hits.delete(k);
    return false;
  }
  rec.count += 1;
  return rec.count > MAX_REQUESTS;
}

function deny(status: number, message: string) {
  return new NextResponse(message, { status, headers: { 'Cache-Control': 'no-store' } });
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ua = request.headers.get('user-agent') ?? '';
  const isGoodBot = GOOD_BOTS.test(ua);

  if (!isGoodBot) {
    // Block self-identified scrapers everywhere, and empty user agents on the API.
    if (SCRAPERS.test(ua) || (pathname.startsWith('/api/') && ua.length < 8)) {
      return deny(403, 'Automated access is not permitted.');
    }
  }

  if (DATA_API.test(pathname)) {
    // Browsers on our own site always send Sec-Fetch-Site: same-origin/same-site.
    const site = request.headers.get('sec-fetch-site');
    if (site && site !== 'same-origin' && site !== 'same-site') {
      return deny(403, 'Forbidden');
    }
    if (!site && request.method === 'GET') {
      // Plain scripts rarely send Sec-Fetch-* headers; require a same-site Referer instead.
      const referer = request.headers.get('referer') ?? '';
      if (!referer || new URL(referer, request.url).host !== request.nextUrl.host) {
        return deny(403, 'Forbidden');
      }
    }
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (limited(ip)) {
      return new NextResponse('Too many requests', { status: 429, headers: { 'Retry-After': '60' } });
    }
  }

  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.svg|robots.txt|sitemap.xml).*)'],
};
