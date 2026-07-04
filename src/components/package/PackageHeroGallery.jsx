import { useState } from 'react'
import Badge from '../common/Badge'
import ImageLightbox from '../common/ImageLightbox'
import { getPackageImages } from './packageViewUtils'

const PackageHeroGallery = ({ package: travelPackage }) => {
  const packageKey = travelPackage?._id || travelPackage?.slug || ''
  const [galleryState, setGalleryState] = useState({ packageKey, activeIndex: 0, lightboxIndex: null })
  const images = getPackageImages(travelPackage)
  const activeIndex = Math.min(galleryState.activeIndex, Math.max(images.length - 1, 0))
  const hero = images[activeIndex] || images[0]
  const hasMultipleImages = images.length > 1

  if (galleryState.packageKey !== packageKey) {
    setGalleryState({ packageKey, activeIndex: 0, lightboxIndex: null })
  }

  if (!hero) {
    return (
    <section className="bg-dark-900 px-4 py-16">
        <div className="mx-auto max-w-7xl rounded-card-sm border border-white/10 bg-white/10 p-12 text-center text-white/70">Package images will appear here after upload.</div>
      </section>
    )
  }

  return (
    <section className="relative isolate overflow-hidden bg-dark-900 px-4 py-6 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(217,111,58,0.22),transparent_32%),linear-gradient(135deg,rgba(16,39,36,1)_0%,rgba(20,53,47,1)_54%,rgba(16,39,36,1)_100%)]" />
      <div className="grain-overlay" />
      <div className={`relative mx-auto grid max-w-7xl gap-3 ${hasMultipleImages ? 'lg:grid-cols-[minmax(0,2fr)_360px]' : ''}`}>
        <button type="button" onClick={() => setGalleryState((state) => ({ ...state, lightboxIndex: activeIndex }))} className="group relative overflow-hidden rounded-card border border-white/12 bg-dark-800 text-left shadow-[0_34px_90px_rgba(0,0,0,0.34)]">
          <img src={hero.url} alt={hero.alt || travelPackage.title} className="h-[340px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[500px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/85 via-dark-900/12 to-transparent" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <Badge tone="dark">{travelPackage.packageType || 'Package'}</Badge>
            {travelPackage.featured ? <Badge>Featured</Badge> : null}
          </div>
          <div className="absolute bottom-5 left-5 max-w-2xl text-white">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-accent-300">Bablons curated holiday</p>
            <h1 className="mt-2 font-display text-4xl font-bold leading-tight sm:text-5xl">{travelPackage.title}</h1>
          </div>
          <span className="absolute bottom-5 right-5 rounded-full border border-white/25 bg-white/16 px-4 py-2 text-sm font-black text-white backdrop-blur-md">
            View {images.length} photo{images.length === 1 ? '' : 's'}
          </span>
        </button>

        {hasMultipleImages ? (
          <div className="grid max-h-[500px] auto-rows-max grid-cols-2 gap-3 overflow-y-auto pr-1 lg:grid-cols-1">
            {images.map((image, index) => (
            <button
              key={`${image.url}-${index}`}
              type="button"
              onClick={() => setGalleryState((state) => ({ ...state, activeIndex: index }))}
              className={`group relative overflow-hidden rounded-card-sm border bg-dark-800 shadow-card transition ${
                activeIndex === index ? 'border-secondary-400 ring-2 ring-secondary-400/45' : 'border-white/12 hover:border-white/35'
              }`}
              aria-label={`Show image ${index + 1} in package hero`}
            >
              <img src={image.url} alt={image.alt || ''} className="h-32 w-full object-cover transition duration-500 group-hover:scale-105 lg:h-[112px]" />
              <div className="absolute inset-0 bg-dark-900/0 transition group-hover:bg-dark-900/12" />
              {activeIndex === index ? (
                <span className="absolute bottom-2 left-2 rounded-full bg-secondary-500 px-3 py-1 text-[0.65rem] font-black uppercase tracking-wide text-white">
                  Showing
                </span>
              ) : null}
            </button>
            ))}
          </div>
        ) : null}
      </div>
      {galleryState.lightboxIndex !== null ? (
        <ImageLightbox images={images} index={galleryState.lightboxIndex} onClose={() => setGalleryState((state) => ({ ...state, lightboxIndex: null }))} />
      ) : null}
    </section>
  )
}

export default PackageHeroGallery
