export const config = {
  matcher: '/((?!assets|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:png|jpg|jpeg|svg|webp|css|js)).*)',
};

export default async function middleware(request) {
  const userAgent = request.headers.get('user-agent') || '';
  const isBot = /bot|googlebot|bingbot|yandex|baiduspider|facebookexternalhit|whatsapp|twitterbot|linkedinbot|slackbot|telegrambot|discordbot|embedly|quora link preview|showyoubot|outbrain|pinterest|slurp|ia_archiver|gptbot|chatgpt|perplexitybot|claudebot|anthropic|ccbot/i.test(userAgent);

  if (isBot) {
    const token = process.env.PRERENDER_TOKEN;
    const targetUrl = `https://service.prerender.io/${request.url}`;

    try {
      const response = await fetch(targetUrl, {
        headers: {
          'X-Prerender-Token': token,
        },
      });

      const html = await response.text();

      return new Response(html, {
        status: response.status,
        headers: { 'Content-Type': 'text/html' },
      });
    } catch (error) {
      // Agar prerender fail ho jaye, normal site chalne do (safety fallback)
      return;
    }
  }
}