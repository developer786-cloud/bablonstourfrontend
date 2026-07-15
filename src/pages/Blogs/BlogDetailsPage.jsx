import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaExternalLinkAlt,
  FaMapMarkedAlt,
  FaPlaneDeparture,
  FaRegCompass,
} from 'react-icons/fa'
import { ROUTES } from '../../constants/routes'
import { useBlog } from '../../hooks/useBlogs'
import fallbackOne from '../../assets/images/Hero Banner 1.png'
import fallbackTwo from '../../assets/images/Hero Banner 2.png'
import fallbackThree from '../../assets/images/Hero Banner 3.jpg'
import fallbackFour from '../../assets/images/Hero Section Bg 4.jpg'
import fallbackFive from '../../assets/images/Image.jpg'
import fallbackSix from '../../assets/images/Hero Section Bg 5.jpg'

const SITE_URL = 'https://bablonstravelent.com'
const SITE_NAME = 'Bablons Travel & Entertainment'

const formatDate = (date) => {
  if (!date) return 'Fresh guide'
  return new Intl.DateTimeFormat('en-IN', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(date))
}

const fallbackImages = [fallbackOne, fallbackTwo, fallbackThree, fallbackFour, fallbackFive, fallbackSix]

const getFallbackImage = (post) => {
  const seed = post?.slug || post?.title || ''
  const index = [...seed].reduce((sum, char) => sum + char.charCodeAt(0), 0) % fallbackImages.length
  return fallbackImages[index]
}

const getImage = (post) => post?.coverImage?.url || post?.seo?.ogImage || getFallbackImage(post)
const getReadTime = (post) => post?.readTime || `${post?.readTimeMinutes || 1} min read`
const getPostUrl = (post) => `/blogs/${post.slug}`

const BlogImage = ({ post, className = '' }) => {
  const image = getImage(post)

  return <img src={image} alt={post.coverImage?.alt || post.title} className={`h-full w-full object-cover ${className}`} />
}

const normalizeSections = (post) => {
  if (post?.sections?.length) return post.sections
  if (!post?.content) return []

  return post.content
    .split(/\n{2,}/)
    .map((body, index) => ({
      heading: index === 0 ? 'Travel guide overview' : `Planning note ${index + 1}`,
      body: body.trim(),
    }))
    .filter((section) => section.body)
}

const BlogDetailsPage = () => {
  const { slug } = useParams()
  const { blog: post, relatedBlogs, loading, error } = useBlog(slug)

  useEffect(() => {
    if (!post) return

    const canonicalUrl = post.seo?.canonicalUrl || `${SITE_URL}/blogs/${post.slug}`
    const title = post.seo?.metaTitle || `${post.title} | Bablons Travel Blog`
    const description = post.seo?.metaDescription || post.excerpt
    const image = post.seo?.ogImage || getImage(post)
    const absoluteImage = image?.startsWith('http') ? image : `${SITE_URL}${image}`
    const keywords = [...new Set([...(post.seo?.keywords || []), ...(post.tags || []), post.category].filter(Boolean))].join(', ')

    const setMeta = (selector, attrs) => {
      let tag = document.head.querySelector(selector)
      if (!tag) {
        tag = document.createElement('meta')
        Object.entries(attrs).forEach(([key, value]) => {
          if (key !== 'content') tag.setAttribute(key, value)
        })
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', attrs.content)
    }

    const setLink = (rel, href) => {
      let tag = document.head.querySelector(`link[rel="${rel}"]`)
      if (!tag) {
        tag = document.createElement('link')
        tag.setAttribute('rel', rel)
        document.head.appendChild(tag)
      }
      tag.setAttribute('href', href)
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

    document.title = title
    setLink('canonical', canonicalUrl)
    setMeta('meta[name="description"]', { name: 'description', content: description })
    if (keywords) setMeta('meta[name="keywords"]', { name: 'keywords', content: keywords })
    setMeta('meta[property="og:type"]', { property: 'og:type', content: 'article' })
    setMeta('meta[property="og:title"]', { property: 'og:title', content: title })
    setMeta('meta[property="og:description"]', { property: 'og:description', content: description })
    setMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl })
    setMeta('meta[property="og:image"]', { property: 'og:image', content: absoluteImage })
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title })
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description })
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: absoluteImage })

    setJsonLd('blog-article', {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description,
      image: absoluteImage,
      datePublished: post.publishedAt || post.createdAt,
      dateModified: post.updatedAt || post.publishedAt || post.createdAt,
      author: { '@type': 'Organization', name: post.author || SITE_NAME },
      publisher: { '@type': 'Organization', name: SITE_NAME },
      mainEntityOfPage: canonicalUrl,
      keywords,
    })
  }, [post])

  if (!loading && (error || !post)) {
    return <Navigate to={ROUTES.BLOGS} replace />
  }

  if (loading) {
    return (
      <div className="bg-ivory">
        <section className="bg-primary-900 px-4 py-20 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="h-5 w-36 animate-pulse rounded-full bg-white/20" />
            <div className="mt-8 h-16 max-w-4xl animate-pulse rounded-lg bg-white/20" />
            <div className="mt-5 h-24 max-w-3xl animate-pulse rounded-lg bg-white/14" />
          </div>
        </section>
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-8">
          <div className="h-[34rem] animate-pulse rounded-lg bg-white shadow-card" />
          <div className="h-80 animate-pulse rounded-lg bg-white shadow-card" />
        </section>
      </div>
    )
  }

  const sections = normalizeSections(post)
  const canonicalUrl = post.seo?.canonicalUrl || `${SITE_URL}/blogs/${post.slug}`
  const publishedDate = post.publishedAt || post.createdAt

  return (
    <div className="bg-ivory">
      <section className="relative overflow-hidden bg-primary-900 text-white">
        <BlogImage post={post} className="absolute inset-0 opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-900/88 to-primary-900/45" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8 lg:py-20">
          <div>
            <Link to={ROUTES.BLOGS} className="inline-flex items-center gap-2 text-sm font-bold text-accent-200 hover:text-white">
              <FaArrowLeft />
              Back to Blogs
            </Link>
            <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.12em] backdrop-blur">
              <FaRegCompass />
              {post.heroLabel || post.category || 'Travel Guide'}
            </p>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/84">{post.excerpt}</p>

            <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-white/78">
              <span className="inline-flex items-center gap-2">
                <FaCalendarAlt className="text-accent-300" />
                {formatDate(publishedDate)}
              </span>
              <span className="inline-flex items-center gap-2">
                <FaClock className="text-accent-300" />
                {getReadTime(post)}
              </span>
              <span className="inline-flex items-center gap-2">
                <FaMapMarkedAlt className="text-accent-300" />
                {post.category}
              </span>
            </div>
          </div>

          <aside className="self-end rounded-lg border border-white/18 bg-white/12 p-5 backdrop-blur">
            <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-accent-200">Inside this guide</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(post.highlights?.length ? post.highlights : post.tags || []).slice(0, 8).map((item) => (
                <span key={item} className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-primary-900">
                  {item}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-8">
        <article className="rounded-lg border border-sand-200 bg-white p-6 shadow-card sm:p-8 lg:p-10">
          <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-secondary-600">Bablons Travel Guide</p>
          <div className="mt-8 space-y-10">
            {sections.map((section, index) => (
              <section key={`${section.heading}-${index}`}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-900 text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <h2 className="font-display text-2xl font-bold leading-tight text-dark-900 md:text-3xl">{section.heading}</h2>
                </div>
                <p className="whitespace-pre-line text-base leading-8 text-dark-600 md:text-lg">{section.body}</p>
              </section>
            ))}
          </div>

          {post.internalLinks?.length ? (
            <div className="mt-12 rounded-lg border border-sand-200 bg-sand-50 p-5">
              <h2 className="font-display text-2xl font-bold text-dark-900">Useful links for this trip</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {post.internalLinks.map((link) => {
                  const isExternal = link.url?.startsWith('http')
                  const className = "inline-flex min-h-12 items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 text-sm font-extrabold text-primary-900 shadow-sm transition hover:text-secondary-700"

                  return isExternal ? (
                    <a key={`${link.label}-${link.url}`} href={link.url} target="_blank" rel="noreferrer" className={className}>
                      {link.label}
                      <FaExternalLinkAlt className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <Link key={`${link.label}-${link.url}`} to={link.url} className={className}>
                      {link.label}
                      <FaArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )
                })}
              </div>
            </div>
          ) : null}
        </article>

        <aside className="space-y-6 lg:sticky lg:top-44 lg:self-start">
          <div className="rounded-lg border border-sand-200 bg-white p-6 shadow-card">
            <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-secondary-600">Plan this trip</p>
            <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-dark-900">
              Want this guide turned into an itinerary?
            </h2>
            <p className="mt-3 text-sm leading-6 text-dark-600">
              Share your dates, budget, and traveler count. Our team can shape hotels, transfers, sightseeing, and visa support around your comfort.
            </p>
            <Link
              to={ROUTES.CONTACT}
              className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary-900 px-5 text-sm font-extrabold text-white hover:bg-primary-800"
            >
              Talk to Travel Expert
              <FaArrowRight />
            </Link>
          </div>

          <div className="rounded-lg border border-sand-200 bg-sand-50 p-6">
            <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-secondary-600">Quick checklist</p>
            <div className="mt-4 space-y-3">
              {['Confirm travel month', 'Shortlist hotel style', 'Check visa needs', 'Keep daily pace realistic'].map((item) => (
                <p key={item} className="flex items-center gap-3 text-sm font-semibold text-dark-700">
                  <FaCheckCircle className="text-secondary-600" />
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-sand-200 bg-white p-6 shadow-card">
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-dark-500">Canonical</p>
            <a href={canonicalUrl} className="mt-2 block break-words text-sm font-semibold text-secondary-700" target="_blank" rel="noreferrer">
              {canonicalUrl}
            </a>
          </div>
        </aside>
      </section>

      {relatedBlogs?.length ? (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mb-6 grid gap-4 rounded-lg border border-sand-200 bg-white p-6 shadow-card sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.14em] text-secondary-600">
                <FaPlaneDeparture />
                More travel ideas
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold text-dark-900">Read These Next</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-dark-600">
                Related guides from the Bablons blog so visitors keep exploring useful travel ideas.
              </p>
            </div>
            <Link to={ROUTES.BLOGS} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary-900 px-5 text-sm font-extrabold text-white hover:bg-primary-800">
              View All Blogs
              <FaArrowRight />
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {relatedBlogs.slice(0, 3).map((item, index) => (
              <Link
                key={item.slug}
                to={getPostUrl(item)}
                className="group overflow-hidden rounded-lg border border-sand-200 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-card-hover"
              >
                <article>
                  <div className="relative h-56 overflow-hidden bg-sand-100">
                    <BlogImage post={item} className="transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 via-primary-900/12 to-transparent" />
                    <span className="absolute bottom-4 left-4 rounded-full bg-white px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.08em] text-primary-900">
                      Next Idea {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-dark-500">
                      <span className="text-secondary-600">{item.category}</span>
                      <span>{getReadTime(item)}</span>
                    </div>
                    <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-dark-900 group-hover:text-secondary-700">{item.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-dark-600">{item.excerpt}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-primary-800">
                      Open Blog
                      <FaArrowRight className="transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}

export default BlogDetailsPage
