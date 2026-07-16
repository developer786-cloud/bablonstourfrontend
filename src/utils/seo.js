const SITE_URL = 'https://bablonstravelent.com'
const SITE_NAME = 'Bablons Travel & Entertainment'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`

const normalizePath = (path = '/') => (path === '/' ? '/' : `/${String(path).replace(/^\/+/, '').replace(/\/+$/, '')}`)

const absoluteUrl = (path = '/') => {
  if (/^https?:\/\//i.test(path)) return path
  return `${SITE_URL}${normalizePath(path)}`
}

const upsertMeta = (selector, attrs) => {
  let tag = document.head.querySelector(selector)
  if (!tag) {
    tag = document.createElement('meta')
    Object.entries(attrs).forEach(([key, value]) => {
      if (key !== 'content') tag.setAttribute(key, value)
    })
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', attrs.content || '')
}

const upsertLink = (rel, href, attrs = {}) => {
  let tag = document.head.querySelector(`link[rel="${rel}"]`)
  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', rel)
    document.head.appendChild(tag)
  }
  tag.setAttribute('href', href)
  Object.entries(attrs).forEach(([key, value]) => tag.setAttribute(key, value))
}

export const upsertJsonLd = (id, data) => {
  let tag = document.head.querySelector(`script[data-jsonld="${id}"]`)
  if (!tag) {
    tag = document.createElement('script')
    tag.setAttribute('type', 'application/ld+json')
    tag.setAttribute('data-jsonld', id)
    document.head.appendChild(tag)
  }
  tag.textContent = JSON.stringify(data)
}

export const removeJsonLd = (id) => {
  const tag = document.head.querySelector(`script[data-jsonld="${id}"]`)
  if (tag) tag.remove()
}

export const applyPageSeo = ({
  title,
  description,
  path,
  keywords = [],
  image = DEFAULT_IMAGE,
  type = 'website',
}) => {
  const canonical = absoluteUrl(path || window.location.pathname)
  const safeTitle = title || SITE_NAME
  const safeDescription = description || 'Plan international holidays with Bablons Travel & Entertainment.'

  document.title = safeTitle
  upsertMeta('meta[name="description"]', { name: 'description', content: safeDescription })
  upsertMeta('meta[name="robots"]', {
    name: 'robots',
    content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  })
  if (keywords.length) upsertMeta('meta[name="keywords"]', { name: 'keywords', content: keywords.join(', ') })
  upsertLink('canonical', canonical)
  upsertLink('alternate', canonical, { hreflang: 'en-in' })

  upsertMeta('meta[property="og:type"]', { property: 'og:type', content: type })
  upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical })
  upsertMeta('meta[property="og:title"]', { property: 'og:title', content: safeTitle })
  upsertMeta('meta[property="og:description"]', { property: 'og:description', content: safeDescription })
  upsertMeta('meta[property="og:image"]', { property: 'og:image', content: image || DEFAULT_IMAGE })
  upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME })
  upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'en_IN' })

  upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
  upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: safeTitle })
  upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: safeDescription })
  upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image || DEFAULT_IMAGE })

  return canonical
}

export const buildBreadcrumbSchema = (items = []) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
})

export const SITE_CONSTANTS = {
  SITE_URL,
  SITE_NAME,
  DEFAULT_IMAGE,
  absoluteUrl,
}
