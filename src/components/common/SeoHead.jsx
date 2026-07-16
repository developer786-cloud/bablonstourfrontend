import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/* ============================================================
   NOTE: The core Organization/TravelAgency JSON-LD (NAP, geo,
   sameAs, contactPoint) now lives ONLY in index.html as a static
   <script type="application/ld+json"> block. That's intentional:
   it's crawled reliably without waiting on JS/hydration, and
   having a second "Organization" block injected here with a
   different @id would create a conflicting duplicate entity in
   Google's eyes. This file only handles what's genuinely
   per-page: title/description/OG/Twitter tags, BreadcrumbList,
   and FAQPage schema.
   ============================================================ */
const SITE_URL = 'https://bablonstravelent.com'
const SITE_NAME = 'Bablons Travel & Entertainment'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg` // same 1200x630 asset referenced in index.html — keep in sync

const defaultKeywords = [
  'Bablons Travel',
  'Bablons Travel Entertainment',
  'best travel agency in Delhi',
  'international tour packages from India',
  'customized tour packages',
  'family holiday packages',
  'honeymoon packages',
  'group tour packages',
  'visa assistance services',
]

/* ============================================================
   PAGE-LEVEL SEO — titles/descriptions now lead with intent +
   a trust/CTA hook, since CTR is a ranking-adjacent signal and
   directly drives leads. Keep titles under ~60 chars, 
   descriptions 140-160 chars.
   ============================================================ */
const pageSeo = {
  '/': {
    title: 'Bablons Travel & Entertainment | International Tour Packages from Delhi',
    description:
      'Plan your next international trip with Bablons Travel & Entertainment — Dubai, Thailand, Bali, Europe & more. Free itinerary + visa help. Call or WhatsApp for a quote today.',
    keywords: [
      'international tour packages from India',
      'best travel agency in Delhi',
      'custom travel planner India',
      'family vacation packages',
      'honeymoon tour packages',
    ],
    breadcrumb: [{ name: 'Home', path: '/' }],
  },
  '/destinations': {
    title: 'International Destinations | Dubai, Georgia, Thailand & More',
    description:
      'Explore top international destinations — Dubai, Georgia, Thailand, Uzbekistan, Bali, Europe & Maldives — with expert planning and visa support from Bablons Travel.',
    keywords: ['international travel destinations', 'best countries to visit from India', 'Dubai holidays', 'Thailand holidays'],
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Destinations', path: '/destinations' }],
  },
  '/packages': {
    title: 'International Holiday Packages | Family, Honeymoon & Luxury Tours',
    description:
      'Browse international holiday packages for Dubai, Thailand, Bali, Europe & Maldives. Custom itineraries, visa help, and hotel booking — get a free quote in 24 hours.',
    keywords: ['international holiday packages', 'honeymoon package from India', 'family tour package from India', 'luxury international package'],
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Packages', path: '/packages' }],
  },
  '/blogs': {
    title: 'Travel Blogs & Holiday Planning Guides | Bablons Travel',
    description:
      'Destination guides, visa tips, packing checklists and budget travel advice from Bablons Travel & Entertainment — plan smarter, travel better.',
    keywords: ['travel blogs India', 'international travel guide', 'holiday planning tips', 'budget travel tips'],
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Blogs', path: '/blogs' }],
  },
  '/gallery': {
    title: 'Travel Gallery | Real Trips, Real Travelers',
    description:
      'See real holiday moments from Bablons Travel customers — Dubai, Bali, Thailand, Europe and more. Get inspired for your next international trip.',
    keywords: ['travel gallery', 'holiday photos', 'international trip gallery'],
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Gallery', path: '/gallery' }],
  },
  '/about': {
    title: 'About Bablons Travel & Entertainment | Trusted Delhi Travel Agency',
    description:
      'Bablons Travel & Entertainment helps travelers across India book stress-free international trips — visa assistance, flights, hotels, and custom holidays.',
    keywords: ['about Bablons Travel', 'trusted travel agency India', 'travel company Delhi'],
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }],
  },
  '/contact': {
    title: 'Contact Bablons Travel | Call or WhatsApp for a Free Quote',
    description:
      'Get in touch with Bablons Travel & Entertainment for international tour packages, visa help, flights and hotels. Call, WhatsApp, or send an enquiry — we reply fast.',
    keywords: ['contact travel agency', 'call travel agent India', 'WhatsApp travel agency'],
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }],
  },
  '/faq': {
    title: 'Travel FAQs | Visa, Booking & International Trip Questions Answered',
    description:
      'Answers on international packages, visa assistance, booking process, payment, cancellation, and more — everything before you book with Bablons Travel.',
    keywords: ['travel FAQs', 'international package questions', 'visa assistance FAQ'],
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'FAQ', path: '/faq' }],
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Bablons Travel & Entertainment',
    description:
      'Read how Bablons Travel & Entertainment handles enquiry details, booking information, communication preferences and website data.',
    keywords: ['Bablons Travel privacy policy', 'travel agency privacy policy'],
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Privacy Policy', path: '/privacy-policy' }],
  },
  '/terms-and-conditions': {
    title: 'Terms and Conditions | Bablons Travel & Entertainment',
    description:
      'Review Bablons Travel & Entertainment terms for travel enquiries, package bookings, payments, itinerary changes and customer responsibilities.',
    keywords: ['Bablons Travel terms', 'travel package booking terms'],
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Terms and Conditions', path: '/terms-and-conditions' }],
  },
}

const getSeoForPath = (pathname) => {
  if (pathname.startsWith('/packages/')) {
    const slug = pathname.split('/packages/')[1]?.replace(/-/g, ' ')
    return {
      title: `${titleCase(slug)} Package | Itinerary, Price & Booking | Bablons Travel`,
      description: `Full itinerary, inclusions, hotel details and pricing guidance for the ${slug} tour package. Visa assistance and booking support included. Get a free quote today.`,
      keywords: ['tour package details', 'international itinerary', 'package inclusions'],
      breadcrumb: [
        { name: 'Home', path: '/' },
        { name: 'Packages', path: '/packages' },
        { name: titleCase(slug), path: pathname },
      ],
    }
  }

  // Real structure is two-level: /destinations/{country-slug}/{city-slug}
  // e.g. /destinations/dubai-uae/dubai, /destinations/georgia/tbilisi
  if (pathname.startsWith('/destinations/')) {
    const parts = pathname.split('/destinations/')[1]?.split('/').filter(Boolean) || []
    const [countrySlug, citySlug] = parts
    const countryName = getCountryName(countrySlug)
    const cityName = citySlug ? titleCase(citySlug.replace(/-/g, ' ')) : null

    // Country-level page: /destinations/{country-slug}
    if (countrySlug && !citySlug) {
      return {
        title: `${countryName} Tour Packages & Travel Guide | Bablons Travel`,
        description: `Explore ${countryName} with Bablons Travel — top cities, attractions, best time to visit, tour packages, visa support and hotels. Get a free itinerary.`,
        keywords: [`${countryName} tour package`, `${countryName} holidays from India`, `${countryName} travel guide`],
        breadcrumb: [
          { name: 'Home', path: '/' },
          { name: 'Destinations', path: '/destinations' },
          { name: countryName, path: `/destinations/${countrySlug}` },
        ],
      }
    }

    // City-level page: /destinations/{country-slug}/{city-slug}
    if (countrySlug && citySlug) {
      return {
        title: `${cityName} Tour Package from India | ${countryName} | Bablons Travel`,
        description: `Plan your trip to ${cityName}, ${countryName} — attractions, itinerary ideas, best time to visit, hotels and visa support. Free customized quote from Bablons Travel.`,
        keywords: [`${cityName} tour package`, `${cityName} package from Delhi`, `${cityName} holidays`, `${countryName} tour package`],
        breadcrumb: [
          { name: 'Home', path: '/' },
          { name: 'Destinations', path: '/destinations' },
          { name: countryName, path: `/destinations/${countrySlug}` },
          { name: cityName, path: pathname },
        ],
      }
    }
  }

  if (pathname.startsWith('/blogs/')) {
    const slug = pathname.split('/blogs/')[1]?.replace(/-/g, ' ')
    return {
      title: `${titleCase(slug)} | Bablons Travel Blog`,
      description: `${titleCase(slug)} — practical travel tips and planning advice from Bablons Travel & Entertainment.`,
      keywords: ['travel guide blog', 'holiday planning blog'],
      breadcrumb: [
        { name: 'Home', path: '/' },
        { name: 'Blogs', path: '/blogs' },
        { name: titleCase(slug), path: pathname },
      ],
    }
  }

  return pageSeo[pathname] || pageSeo['/']
}

const titleCase = (str = '') =>
  str.replace(/\b\w/g, (c) => c.toUpperCase())

// titleCase() mangles slugs like "dubai-uae" -> "Dubai Uae" or acronyms like
// "uae" -> "Uae". Map known country slugs explicitly; falls back to
// titleCase for any new country added to the sitemap before this is updated.
const COUNTRY_NAME_MAP = {
  'dubai-uae': 'UAE',
  georgia: 'Georgia',
  thailand: 'Thailand',
  uzbekistan: 'Uzbekistan',
}
const getCountryName = (slug) => COUNTRY_NAME_MAP[slug] || titleCase(slug?.replace(/-/g, ' '))

const setMeta = (selector, attributes) => {
  let tag = document.head.querySelector(selector)
  if (!tag) {
    tag = document.createElement('meta')
    Object.entries(attributes).forEach(([key, value]) => {
      if (key !== 'content') tag.setAttribute(key, value)
    })
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', attributes.content)
}

const setLink = (rel, href, extraAttrs = {}) => {
  let tag = document.head.querySelector(`link[rel="${rel}"]`)
  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', rel)
    document.head.appendChild(tag)
  }
  tag.setAttribute('href', href)
  Object.entries(extraAttrs).forEach(([k, v]) => tag.setAttribute(k, v))
}

const setJsonLd = (id, data) => {
  let tag = document.head.querySelector(`script[data-jsonld="${id}"]`)
  if (!tag) {
    tag = document.createElement('script')
    tag.setAttribute('type', 'application/ld+json')
    tag.setAttribute('data-jsonld', id)
    document.head.appendChild(tag)
  }
  tag.textContent = JSON.stringify(data)
}

const removeJsonLd = (id) => {
  const tag = document.head.querySelector(`script[data-jsonld="${id}"]`)
  if (tag) tag.remove()
}

/* ---------- Structured data builders (page-specific only) ---------- */

const buildBreadcrumbSchema = (breadcrumb) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumb.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
})

const buildFaqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
})

/* ============================================================
   FAQ content for the /faq page's FAQPage schema. Keep this in
   sync with what's actually rendered on the page — Google can
   penalize schema that doesn't match visible content. Replace
   with your real FAQ copy (5-8 common questions convert best).
   ============================================================ */
const faqData = [
  {
    question: 'How do I book an international tour package with Bablons Travel?',
    answer:
      'Call or WhatsApp us at +91 98102 12399, or fill the enquiry form on our Contact page. Our team will share a customized itinerary and quote within 24 hours.',
  },
  {
    question: 'Does Bablons Travel help with visa assistance?',
    answer:
      'Yes, we provide end-to-end visa assistance for all our international destinations including Dubai, Thailand, Bali, Europe, and more.',
  },
  {
    question: 'Can I get a customized family or honeymoon package?',
    answer:
      'Yes, all our packages can be tailored to your budget, travel dates, and preferences — including family holidays, honeymoon trips, and group tours.',
  },
]

/* ============================================================
   Component
   ============================================================ */
const SeoHead = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    const seo = getSeoForPath(pathname)
    const canonicalUrl = `${SITE_URL}${pathname === '/' ? '/' : pathname}`
    const keywords = [...new Set([...(seo.keywords || []), ...defaultKeywords])].join(', ')

    document.title = seo.title
    setMeta('meta[name="description"]', { name: 'description', content: seo.description })
    setMeta('meta[name="keywords"]', { name: 'keywords', content: keywords })
    setMeta('meta[name="author"]', { name: 'author', content: SITE_NAME })
    setMeta('meta[name="robots"]', {
      name: 'robots',
      content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    })

    // Canonical + language targeting
    setLink('canonical', canonicalUrl)
    setLink('alternate', canonicalUrl, { hreflang: 'en-in' })

    // Open Graph
    setMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
    setMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl })
    setMeta('meta[property="og:title"]', { property: 'og:title', content: seo.title })
    setMeta('meta[property="og:description"]', { property: 'og:description', content: seo.description })
    setMeta('meta[property="og:image"]', { property: 'og:image', content: DEFAULT_IMAGE })
    setMeta('meta[property="og:image:width"]', { property: 'og:image:width', content: '1200' })
    setMeta('meta[property="og:image:height"]', { property: 'og:image:height', content: '630' })
    setMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME })
    setMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'en_IN' })

    // Twitter
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: seo.title })
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: seo.description })
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: DEFAULT_IMAGE })

    // Page-specific structured data (Organization schema lives statically
    // in index.html — see note above — so it's intentionally not touched here)
    if (seo.breadcrumb?.length > 1) {
      setJsonLd('breadcrumb', buildBreadcrumbSchema(seo.breadcrumb))
    } else {
      removeJsonLd('breadcrumb')
    }

    if (pathname === '/faq') {
      setJsonLd('faq', buildFaqSchema(faqData))
    } else {
      removeJsonLd('faq')
    }

    // Scroll focus for a11y + perceived speed on route change
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default SeoHead
