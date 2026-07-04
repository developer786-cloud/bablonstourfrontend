import { Link } from 'react-router-dom'
import { FaArrowRight, FaCameraRetro, FaImages, FaMapMarkerAlt, FaRegImages } from 'react-icons/fa'
import { ROUTES } from '../../../constants/routes'
import { galleryImages } from '../../../constants/galleryImages'

const GallerySlide = ({ item, large = false }) => (
  <Link
    to={ROUTES.GALLERY}
    className={`gallery-slider-card group relative overflow-hidden rounded-2xl bg-dark-900 shadow-[0_22px_55px_rgba(16,39,36,0.12)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_75px_rgba(16,39,36,0.18)] ${
      large ? 'aspect-[16/10]' : 'aspect-[4/3]'
    }`}
  >
    <img
      src={item.src}
      alt={item.title}
      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/86 via-dark-900/18 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
      <p className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.08em] text-accent-300">
        <FaMapMarkerAlt className="h-3.5 w-3.5" />
        {item.location}
      </p>
      <h3 className="font-display text-2xl font-bold leading-tight">{item.title}</h3>
    </div>
  </Link>
)

const TravelGallery = () => {
  const featured = galleryImages[0]
  const firstRow = galleryImages.slice(0, 10)
  const secondRow = galleryImages.slice(10)
  const rows = [
    { items: firstRow, direction: 'normal', duration: '44s' },
    { items: secondRow, direction: 'reverse', duration: '48s' },
  ]

  return (
    <section className="section-shell overflow-hidden bg-white">
      <div className="mx-auto w-full max-w-[1680px] px-3 sm:px-5 lg:px-7 2xl:px-8">
        <div className="section-header grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="section-eyebrow">
              <FaCameraRetro className="text-secondary-600" />
              From the road
            </p>
            <h2 className="mt-3 max-w-3xl section-heading">Gallery moments from our journeys</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-dark-500">
              A rich collection of real destination frames, curated for inspiration before your next trip.
            </p>
          </div>

          <Link
            to={ROUTES.GALLERY}
            className="inline-flex h-12 items-center justify-center gap-3 rounded-full border border-dark-800 bg-white px-6 text-sm font-extrabold uppercase tracking-[0.04em] text-dark-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-dark-900 hover:text-white"
          >
            View Gallery
            <FaArrowRight />
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(340px,0.48fr)_minmax(0,1fr)] lg:items-stretch">
          <div className="relative overflow-hidden rounded-2xl border border-sand-200 bg-[#FFFCF7] p-3 shadow-[0_20px_60px_rgba(16,39,36,0.08)]">
            <GallerySlide item={featured} large />
            <div className="mt-4 flex items-center justify-between gap-4 px-2 pb-1">
              <div>
                <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-secondary-600">
                  <FaImages className="h-4 w-4" />
                  Featured frame
                </p>
                <p className="mt-1 text-sm font-semibold text-dark-500">{galleryImages.length} curated gallery images</p>
              </div>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-900 text-white">
                <FaRegImages className="h-4 w-4" />
              </span>
            </div>
          </div>

          <div className="min-w-0 space-y-4">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="gallery-slider-row overflow-hidden">
                <div
                  className="gallery-slider-track flex gap-4"
                  style={{
                    animationDirection: row.direction,
                    animationDuration: row.duration,
                  }}
                >
                  {[...row.items, ...row.items].map((item, index) => (
                    <GallerySlide key={`${item.src}-${index}`} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TravelGallery
