import { Link } from 'react-router-dom'
import { FaArrowRight, FaSuitcaseRolling } from 'react-icons/fa'
import Button from '../../../components/common/Button/Button'
import { ROUTES } from '../../../constants/routes'
import { buildSrcSet } from '../../../utils/images'

const getImageUrl = (image) => {
  if (!image) return ''
  if (typeof image === 'string') return image
  return image.src || image.url || ''
}

const getPackageImage = (travelPackage) =>
  getImageUrl(travelPackage?.image) ||
  getImageUrl(travelPackage?.featuredImage) ||
  getImageUrl(travelPackage?.heroImage) ||
  getImageUrl(travelPackage?.images?.[0]) ||
  getImageUrl(travelPackage?.gallery?.[0])

const RelatedPackages = ({ cityName, relatedPackages = [], variant = 'grid', id }) => {
  const hasPackages = Array.isArray(relatedPackages) && relatedPackages.length > 0
  const isCompact = variant === 'compact'
  const maxCards = isCompact ? 3 : 6

  return (
    <section id={id} className={isCompact ? 'scroll-mt-[calc(var(--header-height-desktop)+1rem)] rounded-[24px] border border-sand-200 bg-white p-5 shadow-[0_18px_50px_rgba(16,39,36,0.08)]' : 'section-shell bg-white'}>
      <div className={isCompact ? '' : 'section-container'}>
        <p className={isCompact ? 'text-xs font-extrabold uppercase tracking-[0.14em] text-accent-600' : 'section-eyebrow'}>
          Plan your trip
        </p>
        <h2 className={isCompact ? 'mt-2 text-lg font-bold text-dark-900' : 'mt-3 section-heading'}>
          Packages featuring {cityName}
        </h2>
        {!isCompact ? (
          <p className="mt-5 max-w-xl text-base leading-7 text-dark-500">
            See current itineraries that include {cityName}, or tell us your dates and we'll build one around it.
          </p>
        ) : null}

        {hasPackages ? (
          <div className={isCompact ? 'mt-4 space-y-3' : 'mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'}>
            {relatedPackages.slice(0, maxCards).map((p) => {
              const image = getPackageImage(p)
              const alt = p.featuredImage?.alt || p.images?.[0]?.alt || p.gallery?.[0]?.alt || p.title

              if (isCompact) {
                return (
                  <Link
                    key={p._id}
                    to={`/packages/${p.slug}`}
                    className="group flex items-center gap-3 rounded-2xl border border-sand-200 p-2.5 transition hover:border-accent-200 hover:bg-accent-50/40"
                  >
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-sand-100">
                      {image ? (
                        <img src={image} alt={alt} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" loading="lazy" />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-dark-800 to-primary-700" />
                      )}
                    </div>
                    <span className="line-clamp-2 text-sm font-semibold text-dark-900">{p.title}</span>
                  </Link>
                )
              }

              return (
                <Link key={p._id} to={`/packages/${p.slug}`} className="group overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-card-hover">
                  <div className="aspect-[16/10] overflow-hidden bg-sand-100">
                    {image ? (
                      <img
                        src={image}
                        srcSet={buildSrcSet(image)}
                        sizes="(min-width: 768px) 33vw, 100vw"
                        alt={alt}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-dark-800 to-primary-700" />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-dark-900">{p.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-dark-500">{p.shortDescription || p.summary || p.excerpt || p.description || ''}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className={isCompact ? 'mt-4 flex flex-col gap-3' : 'mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center'}>
            <Link to={`${ROUTES.PACKAGES}?destination=${encodeURIComponent(cityName)}`} className={isCompact ? 'w-full' : ''}>
              <Button size={isCompact ? 'md' : 'lg'} className={`rounded-full bg-dark-800 text-white hover:bg-dark-900 ${isCompact ? 'w-full justify-center' : 'px-7'}`}>
                <FaSuitcaseRolling />
                View packages
              </Button>
            </Link>
            <Link
              to={ROUTES.CONTACT}
              className="inline-flex items-center gap-2 text-sm font-bold text-primary-700 hover:text-primary-800"
            >
              Ask us to build a custom itinerary
              <FaArrowRight className="h-3 w-3" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default RelatedPackages
