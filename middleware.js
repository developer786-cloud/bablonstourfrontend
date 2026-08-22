export const config = {
  matcher: '/((?!assets|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:png|jpg|jpeg|svg|webp|css|js)).*)',
};

export default async function middleware(request) {
  const userAgent = request.headers.get('user-agent') || '';
  const isBot = /bot|googlebot/i.test(userAgent);

  if (isBot) {
    return new Response('MIDDLEWARE TRIGGERED - BOT DETECTED - UA: ' + userAgent, { status: 200 });
  }

  return new Response('MIDDLEWARE TRIGGERED - NOT A BOT - UA: ' + userAgent, { status: 200 });
}