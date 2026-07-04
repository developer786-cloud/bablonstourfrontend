import { Link } from 'react-router-dom'
import { FaArrowRight, FaClock, FaMapMarkerAlt, FaStar } from 'react-icons/fa'
import RatingStars from '../common/RatingStars'
import { formatPrice } from '../../utils/formatPrice'
import { getDurationLabel, getPackageDestination, getPackageImages, getPackagePrice } from './packageViewUtils'

const PackageCard = ({ package: travelPackage }) => {
  const title = travelPackage?.title || 'Travel package'
  const slug = travelPackage?.slug || ''
  const destination = typeof travelPackage?.destination === 'string' ? travelPackage.destination : getPackageDestination(travelPackage)
  const image = travelPackage?.image || getPackageImages(travelPackage)[0]?.url
  const duration = travelPackage?.duration && typeof travelPackage.duration === 'string' ? travelPackage.duration : getDurationLabel(travelPackage)
  const price = travelPackage?.price || formatPrice(getPackagePrice(travelPackage), travelPackage?.pricing?.currency || 'INR')
  const originalPrice = travelPackage?.pricing?.originalPrice
  const shortDescription = travelPackage?.shortDescription || travelPackage?.description || 'A curated Bablons Travel itinerary designed for a comfortable, memorable journey.'
  const type = travelPackage?.packageType || 'international'
  const featured = travelPackage?.featured

  const href = slug ? `/packages/${slug}` : '/packages'

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-sand-200 bg-white shadow-card transition duration-500 hover:-translate-y-1.5 hover:border-secondary-200 hover:shadow-card-hover">
      <Link to={href} className="relative block aspect-[16/11] overflow-hidden bg-dark-900">
        {image ? (
          <img src={image} alt={title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-primary-800 to-dark-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/82 via-dark-900/10 to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/22 bg-white/16 px-3 py-1.5 text-[0.66rem] font-black uppercase tracking-[0.12em] text-white backdrop-blur-md">
            {type.replace('_', ' ')}
          </span>
          {featured ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary-500 px-3 py-1.5 text-[0.66rem] font-black uppercase tracking-[0.12em] text-white">
              <FaStar className="h-3 w-3" /> Featured
            </span>
          ) : null}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="flex items-center gap-2 text-sm font-bold text-white/86">
            <FaMapMarkerAlt className="text-accent-300" /> {destination}
          </p>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h2 className="font-display text-2xl font-bold leading-tight text-dark-900">
          <Link to={href} className="transition hover:text-secondary-600">
            {title}
          </Link>
        </h2>
        <p className="mt-3 flex-1 line-clamp-3 text-sm leading-6 text-dark-600">{shortDescription}</p>
        {travelPackage?.testimonials?.length ? <div className="mt-4"><RatingStars rating={4.9} count={travelPackage.testimonials.length} /></div> : null}
        <div className="mt-5 rounded-2xl border border-sand-200 bg-gradient-to-br from-sand-50 to-white p-4">
          <div className="flex items-center justify-between gap-4">
            {duration ? <p className="inline-flex items-center gap-2 text-sm font-black text-dark-600"><FaClock className="text-secondary-500" /> {duration}</p> : null}
            <p className="rounded-full bg-primary-50 px-3 py-1 text-xs font-black uppercase tracking-wide text-primary-700">Verified</p>
          </div>
          <div className="mt-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.12em] text-dark-400">Starting from</p>
              <p className="mt-1 text-2xl font-black text-dark-900">{price}</p>
              {originalPrice && Number(originalPrice) > getPackagePrice(travelPackage) ? (
                <p className="text-sm font-bold text-sand-500 line-through">{formatPrice(originalPrice, travelPackage?.pricing?.currency || 'INR')}</p>
              ) : null}
            </div>
            <Link to={href} className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-secondary-500 text-white shadow-[0_14px_30px_rgba(217,111,58,0.24)] transition group-hover:translate-x-1 group-hover:bg-secondary-600" aria-label={`View ${title}`}>
              <FaArrowRight />
            </Link>
          </div>
        </div>
        <div className="mt-4">
          <Link to={href} className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-sand-300 px-5 py-3 text-sm font-black uppercase tracking-[0.04em] text-dark-800 transition hover:border-secondary-400 hover:bg-secondary-50 hover:text-secondary-700">
            View Package
            <FaArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </article>
  )
}

export default PackageCard
