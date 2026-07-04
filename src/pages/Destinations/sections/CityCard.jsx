import { Link } from 'react-router-dom'
import { FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa'

const CityCard = ({ citySlug, countrySlug, name, image }) => {
  return (
    <Link
      to={`/destinations/${countrySlug}/${citySlug}`}
      className="group block border-b border-slate-200 bg-white p-3 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-primary-500 sm:border-r"
      aria-label={`Explore ${name}`}
    >
      <div className="overflow-hidden rounded-xl bg-slate-100">
        <img
          src={image.src}
          alt={image.alt}
          className="aspect-[16/9] h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="pt-3">
        <h3 className="flex items-center gap-1.5 text-sm font-extrabold leading-tight text-dark-900">
          <FaMapMarkerAlt className="h-3 w-3 shrink-0 text-dark-400" />
          <span className="truncate">{name}</span>
        </h3>
        <p className="mt-1 line-clamp-2 min-h-10 text-xs leading-5 text-dark-500">
          Explore packages, highlights, and travel experiences for {name}.
        </p>
        <span className="mt-2 inline-flex min-h-9 items-center gap-1.5 text-xs font-extrabold text-accent-600">
          View Details
          <FaArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}

export default CityCard
