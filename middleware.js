export const config = {
  matcher: '/((?!assets|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:png|jpg|jpeg|svg|webp|css|js)).*)',
};

export default async function middleware(request) {
  const userAgent = request.headers.get('user-agent') || '';
  const isBot = /bot|googlebot/i.test(userAgent);

  if (isBot) {
    const token = process.env.PRERENDER_TOKEN;
    
    if (!token) {
      return new Response('DEBUG: TOKEN IS MISSING/UNDEFINED', { status: 200 });
    }

    const targetUrl = `https://service.prerender.io/${request.url}`;

    try {
      const response = await fetch(targetUrl, {
        headers: {
          'X-Prerender-Token': token,
        },
      });

      const html = await response.text();

      return new Response(
        `DEBUG INFO:
        Token exists: YES (length: ${token.length})
        Target URL: ${targetUrl}
        Response status: ${response.status}
        Response length: ${html.length}
        First 500 chars of response: ${html.substring(0, 500)}`,
        { status: 200, headers: { 'Content-Type': 'text/plain' } }
      );
    } catch (error) {
      return new Response('DEBUG: FETCH ERROR - ' + error.message, { status: 200 });
    }
  }
}