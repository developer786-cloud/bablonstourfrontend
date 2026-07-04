import { useState } from 'react'
import ImageLightbox from '../common/ImageLightbox'
import SectionCard from '../common/SectionCard'
import SectionHeading from '../common/SectionHeading'
import { getPackageImages } from './packageViewUtils'

const PackageGallery = ({ package: travelPackage }) => {
  const [index, setIndex] = useState(null)
  const images = getPackageImages(travelPackage).slice(1)
  if (!images.length) return null

  return (
    <SectionCard>
      <SectionHeading title="Photo Gallery" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, imageIndex) => (
          <button key={image.url} type="button" onClick={() => setIndex(imageIndex)} className="overflow-hidden rounded-xl bg-slate-100">
            <img src={image.url} alt={image.alt || ''} className="h-40 w-full object-cover transition hover:scale-105" />
          </button>
        ))}
      </div>
      {index !== null ? <ImageLightbox images={images} index={index} onClose={() => setIndex(null)} /> : null}
    </SectionCard>
  )
}

export default PackageGallery
