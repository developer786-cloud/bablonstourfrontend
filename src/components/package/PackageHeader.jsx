import { FaCircleCheck, FaDownload, FaLocationDot } from 'react-icons/fa6'
import Badge from '../common/Badge'
import PriceDisplay from '../common/PriceDisplay'
import RatingStars from '../common/RatingStars'
import WhatsAppButton from '../common/WhatsAppButton'
import { getDurationLabel, getPackageDestination, getPackagePrice } from './packageViewUtils'

const PackageHeader = ({ package: travelPackage, reviews }) => {
  const price = getPackagePrice(travelPackage)
  const originalPrice = travelPackage.pricing?.originalPrice
  const saving = originalPrice && originalPrice > price ? originalPrice - price : 0

  return (
    <section className="rounded-card-sm border border-sand-200/80 bg-white p-5 shadow-card sm:p-7">
      <div className="flex flex-wrap gap-2">
        <Badge>{travelPackage.packageType || 'international'}</Badge>
        {travelPackage.featured ? <Badge tone="green">Featured</Badge> : null}
        <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-3.5 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.12em] text-primary-700">
          <FaCircleCheck /> Verified operator
        </span>
      </div>
      <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-dark-900 sm:text-5xl">{travelPackage.title}</h1>
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm font-bold text-dark-500">
        <span className="inline-flex items-center gap-2"><FaLocationDot className="text-secondary-500" /> {getPackageDestination(travelPackage)}</span>
        <span>{getDurationLabel(travelPackage)}</span>
        <RatingStars rating={reviews?.averageRating || 4.9} count={reviews?.reviewCount || travelPackage.testimonials?.length || 0} />
      </div>
      {travelPackage.shortDescription || travelPackage.description ? (
        <p className="mt-5 max-w-3xl text-base leading-8 text-dark-600">{travelPackage.shortDescription || travelPackage.description}</p>
      ) : null}
      <div className="mt-6 flex flex-col gap-4 rounded-card-sm border border-sand-200 bg-gradient-to-br from-sand-50 to-white p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <PriceDisplay amount={price} originalAmount={originalPrice} currency={travelPackage.pricing?.currency} note={travelPackage.pricing?.priceNote || travelPackage.pricing?.pricingNote || 'per person'} />
          {saving ? <p className="mt-1 text-sm font-bold text-primary-600">You save {saving.toLocaleString('en-IN')} per person</p> : null}
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="#booking" className="rounded-full bg-secondary-500 px-6 py-3 text-sm font-black uppercase tracking-[0.04em] text-white shadow-[0_16px_34px_rgba(217,111,58,0.24)] hover:bg-secondary-600">Check availability</a>
          <WhatsAppButton message={`Hi Bablons Travel, I am interested in ${travelPackage.title}.`} />
          <button type="button" className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-white px-5 py-3 text-sm font-black text-dark-700 hover:border-secondary-300 hover:text-secondary-600">
            <FaDownload /> Itinerary PDF
          </button>
        </div>
      </div>
    </section>
  )
}

export default PackageHeader
