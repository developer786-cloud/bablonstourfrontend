import { buildSrcSet, buildSizesForGallery, buildPlaceholder } from '../../../utils/images'
import { useState } from 'react'

const Gallery = ({ gallery, fallbackImage, cityName, id }) => {
  const images = (gallery && gallery.length > 0 ? gallery : [fallbackImage]).filter((image) => image?.src)

  const [loaded, setLoaded] = useState({})

  return (
    <section id={id} className="section-shell scroll-mt-[calc(var(--header-height-mobile)+1rem)] bg-ivory lg:scroll-mt-[calc(var(--header-height-desktop)+1rem)]">
      <div className="section-container">
        <p className="section-eyebrow">Gallery</p>
        <h2 className="mt-3 section-heading">{cityName} in pictures</h2>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => {
            const placeholder = buildPlaceholder(image.src)
            const isLoaded = loaded[index]
            return (
              <div key={`${image.src}-${index}`} className={`overflow-hidden rounded-[24px] border border-sand-200 bg-slate-100 shadow-[0_14px_34px_rgba(16,39,36,0.08)] ${index === 0 ? 'lg:col-span-2' : ''}`}>
                <div
                  className="relative h-72 w-full overflow-hidden bg-cover bg-center lg:h-80"
                  style={{ backgroundImage: `url(${placeholder})` }}
                >
                  <img
                    src={image.src}
                    srcSet={buildSrcSet(image.src)}
                    sizes={buildSizesForGallery()}
                    alt={image.alt}
                    className={`absolute inset-0 h-full w-full object-cover transition duration-500 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                    loading="lazy"
                    onLoad={() => setLoaded((s) => ({ ...s, [index]: true }))}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Gallery
