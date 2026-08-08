import { Link } from 'react-router-dom'
import { FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa'

const CityCard = ({ citySlug, countrySlug, name, image }) => {
  return (
    <Link
      to={`/destinations/${countrySlug}/${citySlug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_12px_34px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_44px_rgba(15,23,42,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-primary-500"
      aria-label={`Explore ${name}`}
    >
      <div className="relative overflow-hidden">
        <img
          src={image.src}
          alt={image.alt}
          className="aspect-[16/9] h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
        <span className="absolute left-3 top-3 inline-flex rounded-full border border-white/20 bg-white/90 px-2.5 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-slate-700">
          City guide
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="h-3.5 w-3.5 shrink-0 text-accent-600" />
          <h3 className="text-base font-extrabold leading-tight text-dark-900">{name}</h3>
        </div>
        <p className="mt-2 flex-1 text-sm leading-6 text-dark-500">
          Explore packages, highlights, and travel experiences for {name}.
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-accent-600">View details</span>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent-50 text-accent-700 transition group-hover:translate-x-0.5">
            <FaArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export default CityCard
