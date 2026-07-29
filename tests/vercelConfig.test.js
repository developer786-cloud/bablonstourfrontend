const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

test('vercel config preserves sitemap and robots routes before the SPA fallback', () => {
  const configPath = path.join(__dirname, '..', 'vercel.json')
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
  const rewrites = config.rewrites || []

  const sitemapRewrite = rewrites.find((entry) => entry.source === '/sitemap.xml')
  const robotsRewrite = rewrites.find((entry) => entry.source === '/robots.txt')
  const spaFallback = rewrites.find((entry) => entry.source === '/(.*)')

  assert.ok(sitemapRewrite, 'Expected a dedicated rewrite for /sitemap.xml')
  assert.ok(robotsRewrite, 'Expected a dedicated rewrite for /robots.txt')
  assert.ok(spaFallback, 'Expected a catch-all SPA rewrite')

  const sitemapIndex = rewrites.findIndex((entry) => entry.source === '/sitemap.xml')
  const robotsIndex = rewrites.findIndex((entry) => entry.source === '/robots.txt')
  const fallbackIndex = rewrites.findIndex((entry) => entry.source === '/(.*)')

  assert.ok(sitemapIndex < fallbackIndex, 'The sitemap rewrite should appear before the SPA fallback')
  assert.ok(robotsIndex < fallbackIndex, 'The robots rewrite should appear before the SPA fallback')
})
