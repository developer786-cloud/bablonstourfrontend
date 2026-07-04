import { Link } from 'react-router-dom'
import {
  FaArrowRight,
  FaBookOpen,
  FaCalendarCheck,
  FaCheckCircle,
  FaClock,
  FaCompass,
  FaGlobeAsia,
  FaMapMarkedAlt,
  FaPlaneDeparture,
  FaStar,
} from 'react-icons/fa'
import { ROUTES } from '../../../constants/routes'
import { blogPosts } from '../../Blogs/blogData'

const insights = [
  { icon: FaCalendarCheck, value: 'Monthly', label: 'Fresh updates' },
  { icon: FaGlobeAsia, value: '15+', label: 'Countries' },
  { icon: FaCheckCircle, value: 'Expert', label: 'Trip checklists' },
]

const categoryStyles = {
  'Destination Guide': 'bg-primary-900 text-white',
  Adventure: 'bg-emerald-700 text-white',
  'Budget Tips': 'bg-accent-500 text-white',
  Planning: 'bg-secondary-600 text-white',
  'Family Travel': 'bg-sky-700 text-white',
  Honeymoon: 'bg-rose-700 text-white',
  'Group Tours': 'bg-violet-700 text-white',
}

const LatestBlogsSection = () => {
  const [featured, ...rest] = blogPosts
  const sideReads = rest.slice(0, 3)
  const quickReads = rest.slice(3, 6)

  return (
    <section className="relative overflow-hidden bg-[#fffaf2] py-16 md:py-20 lg:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-sand-200" />

      <div className="section-container relative">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <p className="section-eyebrow text-secondary-600">
              <FaBookOpen className="h-4 w-4" />
              Bablons Travel Journal
            </p>
            <h2 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-[1.06] text-dark-900 md:text-5xl lg:text-6xl">
              Read smarter before
              <span className="block">
                you <span className="text-secondary-600">book</span> the journey
              </span>
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-dark-600">
              Curated destination stories, budget advice, honeymoon ideas, and planning notes made for travelers who want fewer surprises and better trips.
            </p>
          </div>

          <div className="rounded-lg border border-sand-200 bg-white p-5 shadow-[0_18px_50px_rgba(16,39,36,0.08)]">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-primary-900 text-white">
                <FaCompass className="h-6 w-6" />
              </span>
              <div>
                <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-secondary-600">Curated by experts</p>
                <p className="mt-1 text-sm leading-6 text-dark-600">Guides shaped from real itineraries, local timing, visa needs, and traveler questions.</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-sand-200 pt-5">
              {insights.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="rounded-lg bg-sand-50 px-3 py-4 text-center">
                    <Icon className="mx-auto h-5 w-5 text-secondary-600" />
                    <p className="mt-2 text-lg font-black text-dark-900">{item.value}</p>
                    <p className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.06em] text-dark-500">{item.label}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
          <Link
            to={`/blogs/${featured.slug}`}
            className="group relative min-h-[560px] overflow-hidden rounded-lg bg-dark-900 shadow-[0_30px_90px_rgba(16,39,36,0.2)]"
          >
            <img
              src={featured.image}
              alt={featured.title}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/54 to-dark-900/8" />

            <div className="relative flex h-full min-h-[560px] flex-col justify-between p-6 text-white sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/16 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.08em] backdrop-blur">
                  <FaStar className="text-accent-300" />
                  Featured Guide
                </span>
                <span className="rounded-full bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.08em] text-primary-900">
                  {featured.heroLabel}
                </span>
              </div>

              <div className="max-w-2xl">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className={`rounded-full px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.06em] ${categoryStyles[featured.category]}`}>
                    {featured.category}
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/82">
                    <FaClock className="text-accent-300" />
                    {featured.readTime}
                  </span>
                  <span className="text-sm text-white/66">{featured.date}</span>
                </div>
                <p className="mb-3 flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.12em] text-accent-300">
                  <FaMapMarkedAlt />
                  {featured.highlights.slice(0, 2).join(' / ')}
                </p>
                <h3 className="font-display text-4xl font-bold leading-tight md:text-5xl">{featured.title}</h3>
                <p className="mt-5 max-w-xl text-lg leading-8 text-white/82">{featured.excerpt}</p>
                <span className="mt-7 inline-flex h-12 items-center justify-center gap-3 rounded-lg bg-white px-6 text-sm font-extrabold text-primary-900 transition group-hover:-translate-y-0.5 group-hover:bg-accent-300">
                  Read Featured Blog
                  <FaArrowRight />
                </span>
              </div>
            </div>
          </Link>

          <div className="grid gap-4">
            <div className="rounded-lg border border-sand-200 bg-white p-5 shadow-[0_18px_50px_rgba(16,39,36,0.08)]">
              <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-secondary-600">Editor picks</p>
              <h3 className="mt-2 font-display text-3xl font-bold leading-tight text-dark-900">Planning ideas worth saving</h3>
            </div>

            {sideReads.map((blog, index) => (
              <Link
                key={blog.slug}
                to={`/blogs/${blog.slug}`}
                className="group grid overflow-hidden rounded-lg border border-sand-200 bg-white shadow-[0_14px_42px_rgba(16,39,36,0.07)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(16,39,36,0.14)] sm:grid-cols-[178px_1fr]"
              >
                <div className="relative min-h-52 overflow-hidden bg-sand-100 sm:min-h-0">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/56 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-black text-primary-900 shadow-lg">
                    0{index + 1}
                  </span>
                </div>

                <div className="flex flex-col justify-center p-5">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-[0.68rem] font-extrabold uppercase tracking-[0.06em] ${categoryStyles[blog.category]}`}>
                      {blog.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-dark-500">
                      <FaClock className="text-secondary-600" />
                      {blog.readTime}
                    </span>
                  </div>
                  <p className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.1em] text-secondary-600">
                    <FaPlaneDeparture />
                    {blog.heroLabel}
                  </p>
                  <h3 className="font-display text-2xl font-bold leading-tight text-dark-900 transition group-hover:text-secondary-700">
                    {blog.title}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-dark-600">{blog.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {quickReads.map((blog) => (
            <Link
              key={blog.slug}
              to={`/blogs/${blog.slug}`}
              className="group overflow-hidden rounded-lg border border-sand-200 bg-white shadow-[0_14px_42px_rgba(16,39,36,0.07)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(16,39,36,0.13)]"
            >
              <div className="relative h-52 overflow-hidden bg-sand-100">
                <img src={blog.image} alt={blog.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
                <span className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.06em] ${categoryStyles[blog.category]}`}>
                  {blog.category}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs font-bold text-dark-500">
                  <span>{blog.date}</span>
                  <span className="h-1 w-1 rounded-full bg-sand-400" />
                  <span>{blog.readTime}</span>
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-dark-900 group-hover:text-secondary-700">{blog.title}</h3>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-dark-600">{blog.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-primary-800">
                  Read Blog
                  <FaArrowRight className="transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 grid overflow-hidden rounded-lg border border-sand-200 bg-primary-900 text-white shadow-[0_18px_50px_rgba(16,39,36,0.12)] lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="p-6 lg:p-7">
            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-accent-300">Need help choosing?</p>
            <h3 className="mt-2 font-display text-3xl font-bold leading-tight">Turn a travel idea into a ready itinerary.</h3>
            <p className="mt-3 max-w-2xl text-base leading-7 text-white/72">
              Browse the guides, shortlist your destination, and our planners can shape the route, hotels, transfers, and visa support.
            </p>
          </div>

          <div className="flex flex-col gap-3 border-t border-white/12 p-6 sm:flex-row lg:border-l lg:border-t-0 lg:p-7">
            <Link
              to={ROUTES.BLOGS}
              className="inline-flex h-12 items-center justify-center gap-3 rounded-lg bg-white px-7 text-sm font-extrabold text-primary-900 transition hover:-translate-y-0.5 hover:bg-accent-200"
            >
              View All Articles
              <FaArrowRight />
            </Link>
            <Link
              to={ROUTES.CONTACT}
              className="inline-flex h-12 items-center justify-center gap-3 rounded-lg border border-white/24 px-7 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Plan With Expert
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LatestBlogsSection
