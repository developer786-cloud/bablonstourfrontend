import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '../../components/common/Button/Button'
import DestinationOverview from './sections/DestinationOverview'
import Attractions from './sections/Attractions'
import Gallery from './sections/Gallery'
import RelatedPackages from './sections/RelatedPackages'
import TravelTips from './sections/TravelTips'
import { destinationService } from '../../services/destinationService'
import ContactCTA from '../Home/sections/ContactCTASection'
import herobg from '../../assets/images/Destinastion page bg.webp'
import { applyPageSeo, buildBreadcrumbSchema, removeJsonLd, upsertJsonLd } from '../../utils/seo'


const normalizeImage = (image, fallbackAlt) => ({
  src: image?.src || image?.url || herobg,
  alt: image?.alt || fallbackAlt,
})

const normalizeAttractions = (attractions = []) =>
  attractions.map((attraction) => ({
    name: attraction.name || attraction.title,
    note: attraction.note || attraction.description,
    image: normalizeImage(attraction.image, attraction.name || attraction.title),
  })).filter((attraction) => attraction.name)

const COUNTRY_SLUG_ALIASES = {
  dubai: 'dubai-uae',
  uae: 'dubai-uae',
  'united-arab-emirates': 'dubai-uae',
}

const getCountryKey = (slug = '') => COUNTRY_SLUG_ALIASES[slug] || slug
const sameCountrySlug = (first = '', second = '') => getCountryKey(first) === getCountryKey(second)

const getResolvedDetails = (city, country) => {
  const backend = city.details || {}

  return {
    ...backend,
    intro: backend.intro || `${city.name} is one of ${country.name}'s standout travel experiences.`,
    highlights: backend.highlights?.length ? backend.highlights : [
      'Custom itinerary planning',
      'Hotel and transfer assistance',
      'Guided sightseeing options',
      'Visa and document guidance where applicable',
    ],
    attractions: backend.attractions?.length ? backend.attractions : [],
    gallery: backend.gallery?.length ? backend.gallery : [],
  }
}

const uniqueItems = (items = []) => [...new Set(items.map((item) => String(item || '').trim()).filter(Boolean))]

const DestinationSeoContent = ({ city, country, details }) => {
  const attractionNames = uniqueItems((details.attractions || []).map((attraction) => attraction.name)).slice(0, 6)
  const highlights = uniqueItems(details.highlights || []).slice(0, 6)

  return (
    <section className="mx-auto w-full max-w-[1500px] px-3 py-8 sm:px-4 lg:px-6 2xl:px-8">
      <div className="rounded-3xl border border-sand-200 bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.08)] md:p-7">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-accent-600">Destination guide</p>
        <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-dark-900 md:text-3xl">
          {city.name} travel guide for {country.name} holidays
        </h2>
        <p className="mt-3 text-sm leading-7 text-dark-600 md:text-base">
          {details.intro} Bablons Travel plans {city.name} itineraries with hotel assistance, transfers, sightseeing options, and practical guidance for travelers from India. Use this page to compare highlights, attractions, travel tips, and related packages before requesting a custom quote.
        </p>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {highlights.length ? (
            <div>
              <h3 className="font-display text-xl font-bold text-dark-900">Trip highlights</h3>
              <ul className="mt-2 space-y-2 text-sm leading-6 text-dark-600">
                {highlights.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ) : null}
          {attractionNames.length ? (
            <div>
              <h3 className="font-display text-xl font-bold text-dark-900">Popular attractions</h3>
              <p className="mt-2 text-sm leading-7 text-dark-600">{attractionNames.join(', ')}</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

const backendDestinationToView = (destination) => {
  if (!destination) return null

  const countryName = destination.country || destination.name
  const city = {
    slug: destination.slug,
    name: destination.name,
    image: normalizeImage(destination.heroImage, destination.name),
    details: {
      intro: destination.overview || destination.shortDescription || `${destination.name} is one of ${countryName}'s standout travel experiences.`,
      highlights: [
        'Custom itinerary planning',
        'Hotel and transfer assistance',
        'Guided sightseeing options',
        'Visa and document guidance where applicable',
      ],
      attractions: normalizeAttractions(destination.attractions),
      gallery: (destination.gallery || []).map((image) => normalizeImage(image, destination.name)).filter((image) => image.src),
    },
  }

  return {
    city,
    country: {
      slug: destination.countrySlug,
      name: countryName,
      travelTips: {
        bestTime: destination.bestTimeToVisit || 'Ask our travel team',
        currency: destination.currency || 'Confirmed during planning',
        language: 'Confirmed during planning',
        timezone: 'Confirmed during planning',
      },
    },
  }
}

/**
 * Route: /destinations/:countrySlug/:citySlug
 * Every destination detail page is loaded from the backend. Static
 * destination data is intentionally not used here, so deleting or
 * adding cities in admin is reflected on the public site.
 */
const DestinationDetailsPage = () => {
  const { countrySlug, citySlug } = useParams()
  const routeKey = `${countrySlug}/${citySlug}`
  const [backendState, setBackendState] = useState({ key: '', result: null })

  useEffect(() => {
    let mounted = true

    destinationService.get(citySlug, { countrySlug })
      .then((item) => {
        if (!mounted) return
        const result = sameCountrySlug(item.countrySlug, countrySlug) ? backendDestinationToView(item) : null
        setBackendState({ key: routeKey, result })
      })
      .catch(() => {
        if (mounted) setBackendState({ key: routeKey, result: null })
      })

    return () => {
      mounted = false
    }
  }, [citySlug, countrySlug, routeKey])

  const backendResult = backendState.key === routeKey ? backendState.result : null
  const loading = backendState.key !== routeKey
  const result = backendResult
  const city = result?.city
  const country = result?.country
  const details = useMemo(() => (result && city && country ? getResolvedDetails(city, country) : null), [city, country, result])
  const cityWithDetails = useMemo(() => (city && details ? { ...city, details } : null), [city, details])

  useEffect(() => {
    if (!result || !city || !country || !details) return undefined

    const path = `/destinations/${country.slug}/${city.slug}`
    const attractionNames = uniqueItems((details.attractions || []).map((attraction) => attraction.name))
    const title = `${city.name} Tour Package & Travel Guide | ${country.name}`
    const description = `${details.intro} Explore ${city.name} attractions, travel tips, itinerary ideas and related ${country.name} packages with Bablons Travel.`
    applyPageSeo({
      title,
      description: description.slice(0, 310),
      path,
      image: city.image?.src,
      keywords: uniqueItems([
        `${city.name} tour package`,
        `${city.name} travel guide`,
        `${country.name} holiday package`,
        ...attractionNames.map((name) => `${name} ${city.name}`),
      ]),
    })
    upsertJsonLd('breadcrumb', buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Destinations', path: '/destinations' },
      { name: country.name, path: `/destinations#${country.slug}` },
      { name: city.name, path },
    ]))
    upsertJsonLd('destination', {
      '@context': 'https://schema.org',
      '@type': 'TouristDestination',
      name: `${city.name}, ${country.name}`,
      description,
      image: city.image?.src,
      touristType: ['Families', 'Couples', 'Groups', 'Indian travelers'],
      containsPlace: attractionNames.map((name) => ({ '@type': 'TouristAttraction', name })),
    })

    return () => removeJsonLd('destination')
  }, [city, country, details, result])

  if (loading) {
    return (
      <div className="section-shell bg-white text-center">
        <div className="section-container">
          <p className="section-eyebrow justify-center">Loading</p>
          <h1 className="mt-3 section-heading">Finding destination details...</h1>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="section-shell bg-white text-center">
        <div className="section-container">
          <p className="section-eyebrow justify-center">Not found</p>
          <h1 className="mt-3 section-heading">We couldn't find that destination</h1>
          <p className="mx-auto mt-5 max-w-md text-base leading-7 text-dark-500">
            The destination you're looking for may have moved or doesn't exist. Browse all destinations instead.
          </p>
          <Link to="/destinations" className="mt-8 inline-block">
            <Button size="lg" className="rounded-full bg-dark-800 px-7 text-white hover:bg-dark-900">
              View all destinations
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full overflow-hidden bg-[#FAF8F4] text-dark-900">
      <DestinationOverview city={cityWithDetails} country={country} />
      <DestinationSeoContent city={city} country={country} details={details} />
      <Attractions attractions={details.attractions} cityName={city.name} />
      <Gallery gallery={details.gallery} fallbackImage={city.image} cityName={city.name} />
      <TravelTips travelTips={country.travelTips} countryName={country.name} />
      <RelatedPackages cityName={city.name} />
      <ContactCTA />
    </div>
  )
}

export default DestinationDetailsPage
