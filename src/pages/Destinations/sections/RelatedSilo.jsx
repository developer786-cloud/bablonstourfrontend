import { Link } from 'react-router-dom'
import { FaBed, FaMapMarkedAlt } from 'react-icons/fa'

const RelatedSilo = ({ related = {} }) => {
  const { hotels = [], nearbyDestinations = [] } = related
  if (!hotels.length && !nearbyDestinations.length) return null

  return (
    <div className="space-y-6">
      {hotels.length ? (
        <section className="rounded-[24px] border border-sand-200 bg-white p-5 shadow-[0_18px_50px_rgba(16,39,36,0.08)]">
          <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-accent-600">
            <FaBed className="h-3 w-3" />
            Recommended stays
          </p>
          <ul className="mt-4 space-y-1">
            {hotels.slice(0, 5).map((h) => (
              <li key={h._id}>
                <Link
                  to={`/hotels/${h.slug || h._id}`}
                  className="block rounded-lg px-2.5 py-2 text-sm font-semibold text-dark-700 transition hover:bg-accent-50/60 hover:text-accent-700"
                >
                  {h.hotelName || h.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {nearbyDestinations.length ? (
        <section className="rounded-[24px] border border-sand-200 bg-white p-5 shadow-[0_18px_50px_rgba(16,39,36,0.08)]">
          <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-accent-600">
            <FaMapMarkedAlt className="h-3 w-3" />
            Nearby destinations
          </p>
          <ul className="mt-4 space-y-1">
            {nearbyDestinations.slice(0, 5).map((d) => (
              <li key={d._id}>
                <Link
                  to={`/destinations/${d.countrySlug}/${d.slug}`}
                  className="block rounded-lg px-2.5 py-2 text-sm font-semibold text-dark-700 transition hover:bg-accent-50/60 hover:text-accent-700"
                >
                  {d.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  )
}

export default RelatedSilo
