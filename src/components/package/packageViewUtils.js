import { formatPrice } from '../../utils/formatPrice'

const brokenImageIds = new Set([
  'yirbvrec6lzea3u7fxrq',
  'sjmt3lmugqzbrgklwzqz',
])

const isUsableImage = (image) => {
  if (!image?.url) return false
  return !Array.from(brokenImageIds).some((id) => image.url.includes(id) || image.publicId?.includes(id))
}

export const getPackageImages = (travelPackage = {}) => {
  const images = []
  const featuredFromImages = travelPackage.images?.find((image) => image.type === 'hero')
  const featured = travelPackage.featuredImage?.url ? travelPackage.featuredImage : featuredFromImages
  if (featured?.url) images.push({ ...featured, type: 'hero' })
  if (travelPackage.gallery?.length) images.push(...travelPackage.gallery.map((image) => ({ ...image, type: image.type || 'gallery' })))
  if (travelPackage.images?.length) images.push(...travelPackage.images.map((image) => ({ ...image, type: image.type || 'gallery' })))

  return images.filter((image, index, list) => isUsableImage(image) && list.findIndex((item) => item.url === image.url) === index)
}

export const getPackagePrice = (travelPackage = {}, departure) =>
  departure?.pricePerPerson || departure?.price || travelPackage.pricing?.pricePerPerson || travelPackage.pricing?.basePrice || 0

export const getPackageDestination = (travelPackage = {}) =>
  travelPackage.destination?.name || travelPackage.destination?.city || travelPackage.country?.name || travelPackage.destination || 'Featured destination'

export const getDurationLabel = (travelPackage = {}) => {
  const nights = travelPackage.duration?.nights || 0
  const days = travelPackage.duration?.days || 0
  return days ? `${nights} Nights / ${days} Days` : travelPackage.overview?.durationText || travelPackage.overview?.duration || 'Custom duration'
}

export const getPriceLabel = (travelPackage = {}, departure) =>
  `${formatPrice(getPackagePrice(travelPackage, departure), travelPackage.pricing?.currency || 'INR')} ${travelPackage.pricing?.priceNote || 'per person'}`

export const normalizeMeals = (meals) => {
  if (Array.isArray(meals)) return meals
  if (!meals || typeof meals !== 'object') return []
  return Object.entries(meals).filter(([, included]) => included).map(([meal]) => meal)
}
