import { Link } from 'react-router-dom'
import { FaArrowLeft, FaCheckCircle, FaHeadset, FaMapMarkerAlt, FaPlaneDeparture, FaSuitcaseRolling } from 'react-icons/fa'
import { ROUTES } from '../../../constants/routes'

const DestinationOverview = ({ city, country }) => {
  const details = city.details || {}
  const highlights = details.highlights || []

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <img
        src={city.image.src}
        alt={city.image.alt}
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.94)_0%,rgba(15,23,42,0.78)_48%,rgba(15,23,42,0.38)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.05),rgba(15,23,42,0.82))]" />
      <div className="grain-overlay" />

      <div className="section-container relative py-14 md:py-20">
        <Link
          to={ROUTES.DESTINATIONS}
          className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-sm font-bold text-white/82 backdrop-blur transition hover:bg-white hover:text-dark-900"
        >
          <FaArrowLeft className="h-3.5 w-3.5" />
          Back to destinations
        </Link>

        <div className="mt-9 grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-accent-200 ring-1 ring-white/15">
              <FaMapMarkerAlt className="text-accent-300" />
              {country.name}
            </p>
            <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.6rem,10vw,5rem)] font-bold leading-[1.02] text-white">
              {city.name}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82 md:text-xl">
              {details.intro}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={`${ROUTES.PACKAGES}?destination=${encodeURIComponent(city.name)}`} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-accent-500 px-6 text-sm font-extrabold text-white shadow-lg shadow-black/20 transition hover:bg-accent-600">
                <FaSuitcaseRolling />
                View packages
              </Link>
              <Link to={ROUTES.CONTACT} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/22 bg-white/10 px-6 text-sm font-extrabold text-white backdrop-blur transition hover:bg-white hover:text-slate-950">
                <FaHeadset />
                Plan custom trip
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/16 bg-white/[0.11] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.26)] backdrop-blur sm:p-6">
            <p className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.12em] text-accent-300">
              <FaPlaneDeparture />
              Trip support
            </p>
            <div className="mt-5 grid gap-3">
              {highlights.map((highlight) => (
                <p key={highlight} className="flex items-start gap-3 text-sm leading-6 text-white/78">
                  <FaCheckCircle className="mt-1 h-4 w-4 shrink-0 text-accent-300" />
                  {highlight}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DestinationOverview
