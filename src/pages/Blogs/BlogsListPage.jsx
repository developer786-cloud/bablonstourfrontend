import { Link } from 'react-router-dom'
import {
  FaArrowRight,
  FaBookOpen,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaGlobeAsia,
  FaMapMarkedAlt,
  FaPlaneDeparture,
  FaSearch,
  FaSuitcaseRolling,
} from 'react-icons/fa'
import { ROUTES } from '../../constants/routes'
import { blogPosts } from './blogData'

const categoryStyles = {
  'Destination Guide': 'bg-primary-900 text-white',
  Adventure: 'bg-emerald-700 text-white',
  'Budget Tips': 'bg-secondary-600 text-white',
  Planning: 'bg-accent-500 text-white',
  'Family Travel': 'bg-sky-700 text-white',
  Honeymoon: 'bg-rose-700 text-white',
  'Group Tours': 'bg-violet-700 text-white',
}

const BlogsListPage = () => {
  const [featuredPost, ...posts] = blogPosts
  const cardPosts = posts.slice(0, 6)

  return (
    <div className="bg-[#fbf7ef]">
      <section className="relative overflow-hidden bg-primary-900 text-white">
        <div className="absolute bottom-0 left-0 h-28 w-full bg-gradient-to-t from-[#fbf7ef] to-transparent" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_430px] lg:px-8 lg:pb-24 lg:pt-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/12 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.12em] backdrop-blur">
              <FaBookOpen className="text-accent-300" />
              Bablons Travel Blog
            </p>
            <h1 className="mt-6 max-w-4xl font-display text-4xl font-bold leading-tight md:text-5xl lg:text-7xl">
              Better travel stories. Smarter holiday planning.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/84">
              Read useful destination guides, family tips, honeymoon ideas, budget notes, and group travel advice written for real Bablons travelers.
            </p>

            <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
              {[
                { icon: FaGlobeAsia, value: '15+', label: 'Countries covered' },
                { icon: FaSuitcaseRolling, value: 'Expert', label: 'Trip planning' },
                { icon: FaPlaneDeparture, value: 'Fresh', label: 'Travel ideas' },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="rounded-lg border border-white/16 bg-white/10 p-4 backdrop-blur">
                    <Icon className="h-5 w-5 text-accent-300" />
                    <p className="mt-3 text-2xl font-black">{item.value}</p>
                    <p className="text-xs font-bold uppercase tracking-[0.08em] text-white/66">{item.label}</p>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {['Visa-aware tips', 'Local images', 'Readable full blogs'].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-bold text-white/82 backdrop-blur">
                  <FaCheckCircle className="text-accent-300" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <Link
            to={`/blogs/${featuredPost.slug}`}
            className="group self-end overflow-hidden rounded-lg border border-white/18 bg-white text-dark-900 shadow-[0_28px_80px_rgba(0,0,0,0.24)]"
          >
            <div className="relative h-72 overflow-hidden">
              <img src={featuredPost.image} alt={featuredPost.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.08em] text-primary-900 shadow-lg">
                Featured
              </span>
            </div>
            <div className="p-6">
              <p className={`inline-flex rounded-full px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.06em] ${categoryStyles[featuredPost.category]}`}>
                {featuredPost.category}
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight group-hover:text-secondary-700">{featuredPost.title}</h2>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-dark-600">{featuredPost.excerpt}</p>
              <div className="mt-5 flex items-center justify-between border-t border-sand-200 pt-4 text-sm font-bold">
                <span className="inline-flex items-center gap-2 text-dark-500">
                  <FaClock className="text-secondary-600" />
                  {featuredPost.readTime}
                </span>
                <span className="inline-flex items-center gap-2 text-primary-800">
                  Read Guide
                  <FaArrowRight className="transition group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 rounded-lg border border-sand-200 bg-white p-4 shadow-[0_24px_80px_rgba(16,39,36,0.14)] md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex items-center gap-3 rounded-lg bg-sand-50 px-4 py-3 text-dark-600">
            <FaSearch className="text-secondary-600" />
            <span className="text-sm font-semibold">Browse destination guides, planning advice, budget tips, family holidays, honeymoon ideas, and group tours.</span>
          </div>
          <Link
            to={ROUTES.CONTACT}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary-900 px-6 text-sm font-extrabold text-white hover:bg-primary-800"
          >
            Plan My Trip
            <FaArrowRight />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-secondary-600">Latest travel blogs</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-dark-900 md:text-4xl">6 Helpful Blogs for Better Trips</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-dark-600">
            Six practical travel blogs covering destinations, budget, family holidays, honeymoons, groups, and booking planning.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cardPosts.map((post, index) => (
            <Link key={post.slug} to={`/blogs/${post.slug}`} className="group flex overflow-hidden rounded-lg border border-sand-200 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-card-hover">
              <article className="flex w-full flex-col">
                <div className="relative h-56 overflow-hidden bg-sand-100">
                  <img src={post.image} alt={post.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/56 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 rounded-full bg-white px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.08em] text-primary-900">
                    Blog 0{index + 1}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap gap-4 text-xs font-bold text-dark-500">
                    <span className={`rounded-full px-3 py-1 text-[0.68rem] font-extrabold uppercase tracking-[0.06em] ${categoryStyles[post.category]}`}>
                      {post.category}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <FaCalendarAlt className="text-secondary-600" />
                      {post.date}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <FaClock className="text-secondary-600" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-bold leading-tight text-dark-900 group-hover:text-secondary-700">{post.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-dark-600">{post.excerpt}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {post.highlights.slice(0, 3).map((item) => (
                      <span key={item} className="rounded-full bg-sand-100 px-3 py-1 text-xs font-bold text-dark-600">
                        {item}
                      </span>
                    ))}
                  </div>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-extrabold text-primary-800">
                    Read Full Blog
                    <FaArrowRight className="transition group-hover:translate-x-1" />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-primary-900 px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.14em] text-accent-300">
              <FaMapMarkedAlt />
              Travel with clarity
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">Found a destination you like?</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-white/78">
              Bablons Travel can turn the idea into a complete package with flights, hotels, sightseeing, transfers, and visa guidance.
            </p>
          </div>
          <Link
            to={ROUTES.CONTACT}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-7 text-sm font-extrabold text-primary-900 hover:bg-accent-100"
          >
            Start Planning
            <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default BlogsListPage
