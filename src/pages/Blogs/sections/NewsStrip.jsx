import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaNewspaper } from 'react-icons/fa6'
import { fetchLatestNews } from '../../../services/newService'
import { ROUTES } from '../../../constants/routes'

const NewsStrip = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    fetchLatestNews(3)
      .then((res) => {
        if (!mounted) return
        const list = Array.isArray(res) ? res : res?.data || []
        setItems(list)
      })
      .finally(() => mounted && setLoading(false))

    return () => {
      mounted = false
    }
  }, [])

  if (loading) {
    return null
  }

  if (!items.length) {
    return null
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)] lg:p-10">
        <div className="flex flex-col gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-primary-600">
              <FaNewspaper className="h-4 w-4" /> Latest travel news
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
              Fresh visa, flight, and destination updates
            </h2>
          </div>
          <Link
            to={ROUTES.NEWS}
            className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-700"
          >
            View all news
            <FaArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item._id || item.slug}
              to={`${ROUTES.NEWS}/${item.slug}`}
              className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-950/5 p-6 transition duration-300 hover:-translate-y-1 hover:border-primary-600"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">
                {item.category || 'News'}
              </p>
              <h3 className="mt-3 text-lg font-bold leading-tight text-slate-950 transition group-hover:text-primary-700">
                {item.title}
              </h3>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-700">
                {item.summary}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewsStrip
