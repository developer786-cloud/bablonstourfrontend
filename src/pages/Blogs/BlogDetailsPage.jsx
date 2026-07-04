import { Link, Navigate, useParams } from 'react-router-dom'
import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaMapMarkedAlt,
  FaPlaneDeparture,
  FaRegCompass,
} from 'react-icons/fa'
import { ROUTES } from '../../constants/routes'
import { blogPosts, findBlogBySlug } from './blogData'

const getRelatedPosts = (post) => {
  const currentIndex = blogPosts.findIndex((item) => item.slug === post.slug)
  return [1, 2, 3].map((offset) => blogPosts[(currentIndex + offset) % blogPosts.length])
}

const BlogDetailsPage = () => {
  const { slug } = useParams()
  const post = findBlogBySlug(slug)

  if (!post) {
    return <Navigate to={ROUTES.BLOGS} replace />
  }

  const relatedPosts = getRelatedPosts(post)

  return (
    <div className="bg-ivory">
      <section className="relative overflow-hidden bg-primary-900 text-white">
        <img src={post.image} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-900/88 to-primary-900/45" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8 lg:py-20">
          <div>
            <Link to={ROUTES.BLOGS} className="inline-flex items-center gap-2 text-sm font-bold text-accent-200 hover:text-white">
              <FaArrowLeft />
              Back to Blogs
            </Link>
            <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.12em] backdrop-blur">
              <FaRegCompass />
              {post.heroLabel}
            </p>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/84">{post.excerpt}</p>

            <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-white/78">
              <span className="inline-flex items-center gap-2">
                <FaCalendarAlt className="text-accent-300" />
                {post.date}
              </span>
              <span className="inline-flex items-center gap-2">
                <FaClock className="text-accent-300" />
                {post.readTime}
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
              {post.highlights.map((item) => (
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
            {post.sections.map((section, index) => (
              <section key={section.heading}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-900 text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <h2 className="font-display text-2xl font-bold leading-tight text-dark-900 md:text-3xl">{section.heading}</h2>
                </div>
                <p className="text-base leading-8 text-dark-600 md:text-lg">{section.body}</p>
              </section>
            ))}
          </div>
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
        </aside>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-6 grid gap-4 rounded-lg border border-sand-200 bg-white p-6 shadow-card sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.14em] text-secondary-600">
              <FaPlaneDeparture />
              More travel ideas
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-dark-900">Read These Next</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-dark-600">
              Handpicked next reads from the Bablons blog so visitors keep exploring useful travel ideas.
            </p>
          </div>
          <Link to={ROUTES.BLOGS} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary-900 px-5 text-sm font-extrabold text-white hover:bg-primary-800">
            View All Blogs
            <FaArrowRight />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {relatedPosts.map((item, index) => (
            <Link
              key={item.slug}
              to={`/blogs/${item.slug}`}
              className="group overflow-hidden rounded-lg border border-sand-200 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-card-hover"
            >
              <article>
                <div className="relative h-56 overflow-hidden bg-sand-100">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 via-primary-900/12 to-transparent" />
                  <span className="absolute bottom-4 left-4 rounded-full bg-white px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.08em] text-primary-900">
                    Next Idea 0{index + 1}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-dark-500">
                    <span className="text-secondary-600">{item.category}</span>
                    <span>{item.readTime}</span>
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
    </div>
  )
}

export default BlogDetailsPage
