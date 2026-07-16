import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import BookingSidebar from '../../components/package/BookingSidebar'
import DepartureSelector from '../../components/package/DepartureSelector'
import GroupTourInfo from '../../components/package/GroupTourInfo'
import HotelDetails from '../../components/package/HotelDetails'
import InclusionsExclusions from '../../components/package/InclusionsExclusions'
import ItineraryTimeline from '../../components/package/ItineraryTimeline'
import PackageFaq from '../../components/package/PackageFaq'
import PackageFinalCTA from '../../components/package/PackageFinalCTA'
import PackageGallery from '../../components/package/PackageGallery'
import PackageHeader from '../../components/package/PackageHeader'
import PackageHeroGallery from '../../components/package/PackageHeroGallery'
import PackageHighlights from '../../components/package/PackageHighlights'
import PackageOverview from '../../components/package/PackageOverview'
import PackageReviews from '../../components/package/PackageReviews'
import RelatedPackages from '../../components/package/RelatedPackages'
import TravelExpertCard from '../../components/package/TravelExpertCard'
import WhyChooseUsCard from '../../components/package/WhyChooseUsCard'
import ErrorState from '../../components/common/ErrorState'
import LoadingSkeleton from '../../components/common/LoadingSkeleton'
import MobileBookingBar from '../../components/common/MobileBookingBar'
import { formatPrice } from '../../utils/formatPrice'
import { packageService } from '../../services/packageService'
import { getDurationLabel, getPackageDestination, getPackageImages, getPackagePrice } from '../../components/package/packageViewUtils'
import { applyPageSeo, buildBreadcrumbSchema, removeJsonLd, upsertJsonLd } from '../../utils/seo'

const uniqueItems = (items = []) => [...new Set(items.map((item) => String(item || '').trim()).filter(Boolean))]

const stripTags = (value = '') => String(value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()

const buildPackageDescription = (travelPackage) => {
  const destination = getPackageDestination(travelPackage)
  const duration = getDurationLabel(travelPackage)
  const summary = stripTags(travelPackage.seo?.metaDescription || travelPackage.shortDescription || travelPackage.description)
  if (summary) return summary.slice(0, 310)

  return `${travelPackage.title} is a ${duration} ${destination} tour package from Bablons Travel with itinerary planning, hotels, transfers, sightseeing support and booking assistance.`
}

const PackageSeoContent = ({ package: travelPackage, priceLabel }) => {
  const destination = getPackageDestination(travelPackage)
  const duration = getDurationLabel(travelPackage)
  const cities = uniqueItems([
    ...(travelPackage.cities || []),
    travelPackage.destination?.city,
    travelPackage.destination?.name,
  ])
  const highlights = uniqueItems([
    ...(travelPackage.highlights || []).map((item) => item.text || item.title),
    ...(travelPackage.inclusions || []).slice(0, 4),
  ]).slice(0, 6)

  return (
    <section className="rounded-card border border-sand-200 bg-white p-5 shadow-card md:p-6">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-secondary-500">Package guide</p>
      <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-dark-900 md:text-3xl">
        {travelPackage.title} itinerary for {destination}
      </h2>
      <p className="mt-3 text-sm leading-7 text-dark-600 md:text-base">
        This {duration} package is planned for travelers who want a clear, comfortable {destination} holiday with expert assistance from India. Bablons Travel helps with route planning, hotel coordination, transfers, sightseeing, visa guidance where applicable, and quote support before booking.
      </p>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div className="rounded-card-sm border border-sand-200 bg-sand-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.12em] text-dark-400">Best for</p>
          <p className="mt-2 font-bold text-dark-900">{travelPackage.packageType?.replace('_', ' ') || 'International'} travelers</p>
        </div>
        <div className="rounded-card-sm border border-sand-200 bg-sand-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.12em] text-dark-400">Duration</p>
          <p className="mt-2 font-bold text-dark-900">{duration}</p>
        </div>
        <div className="rounded-card-sm border border-sand-200 bg-sand-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.12em] text-dark-400">Starting price</p>
          <p className="mt-2 font-bold text-dark-900">{priceLabel}</p>
        </div>
      </div>
      {cities.length || highlights.length ? (
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {cities.length ? (
            <div>
              <h3 className="font-display text-xl font-bold text-dark-900">Cities covered</h3>
              <p className="mt-2 text-sm leading-7 text-dark-600">{cities.join(', ')}</p>
            </div>
          ) : null}
          {highlights.length ? (
            <div>
              <h3 className="font-display text-xl font-bold text-dark-900">Why book this package</h3>
              <ul className="mt-2 space-y-2 text-sm leading-6 text-dark-600">
                {highlights.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  )
}

const PackageDetailsPage = () => {
  const { slug } = useParams()
  const [pageState, setPageState] = useState({
    slug,
    travelPackage: null,
    related: [],
    reviews: { reviews: [], averageRating: 0, reviewCount: 0 },
    loading: true,
    error: '',
  })
  const [selectedDeparture, setSelectedDeparture] = useState(null)

  if (pageState.slug !== slug) {
    setPageState({
      slug,
      travelPackage: null,
      related: [],
      reviews: { reviews: [], averageRating: 0, reviewCount: 0 },
      loading: true,
      error: '',
    })
  }

  useEffect(() => {
    let mounted = true

    Promise.all([
      packageService.get(slug),
      packageService.related(slug).catch(() => []),
      packageService.reviews(slug).catch(() => ({ reviews: [], averageRating: 0, reviewCount: 0 })),
    ])
      .then(([item, relatedItems, reviewData]) => {
        if (!mounted) return
        setPageState({
          slug,
          travelPackage: item,
          related: relatedItems,
          reviews: reviewData,
          loading: false,
          error: '',
        })
        setSelectedDeparture(item.departures?.find((departure) => !['soldout', 'sold_out'].includes(departure.status)) || null)

        const path = `/packages/${item.slug || slug}`
        const destination = getPackageDestination(item)
        const duration = getDurationLabel(item)
        const image = getPackageImages(item)[0]?.url
        const description = buildPackageDescription(item)
        const title = item.seo?.metaTitle || `${item.title} | ${duration} ${destination} Package`
        applyPageSeo({
          title,
          description,
          path,
          image,
          type: 'product',
          keywords: uniqueItems([
            ...(item.seo?.keywords || []),
            item.title,
            `${destination} tour package`,
            `${destination} package from India`,
            ...(item.cities || []).map((city) => `${city} tour package`),
          ]),
        })
        upsertJsonLd('breadcrumb', buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Packages', path: '/packages' },
          { name: item.title, path },
        ]))
        upsertJsonLd('package', {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: item.title,
          description,
          image: image ? [image] : undefined,
          brand: { '@type': 'Brand', name: 'Bablons Travel & Entertainment' },
          category: item.packageType || item.category || 'Tour package',
          offers: {
            '@type': 'Offer',
            url: `https://bablonstravelent.com${path}`,
            priceCurrency: item.pricing?.currency || 'INR',
            price: getPackagePrice(item),
            availability: 'https://schema.org/InStock',
          },
        })
      })
      .catch((err) => {
        if (!mounted) return
        setPageState((state) => ({
          ...state,
          slug,
          travelPackage: null,
          loading: false,
          error: err.response?.data?.message || 'Package not found',
        }))
      })

    return () => {
      mounted = false
      removeJsonLd('package')
    }
  }, [slug])

  const { travelPackage, related, reviews, loading, error } = pageState

  if (loading) {
    return (
      <main className="bg-ivory px-4 py-10">
        <div className="mx-auto max-w-7xl space-y-4">
          <LoadingSkeleton lines={7} />
          <LoadingSkeleton lines={5} />
        </div>
      </main>
    )
  }

  if (error || !travelPackage) {
    return (
      <main className="bg-ivory px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <ErrorState title="Package unavailable" description={error || 'This package could not be loaded.'} />
          <div className="mt-6 text-center"><Link to="/packages" className="font-black text-orange-600">Back to packages</Link></div>
        </div>
      </main>
    )
  }

  const priceLabel = formatPrice(getPackagePrice(travelPackage, selectedDeparture), travelPackage.pricing?.currency || 'INR')

  return (
    <div className="bg-ivory pb-24 lg:pb-0">
      <PackageHeroGallery package={travelPackage} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-5 rounded-full border border-sand-200 bg-white/80 px-4 py-2 text-sm font-bold text-dark-500 shadow-sm backdrop-blur" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-secondary-600">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/packages" className="hover:text-secondary-600">Packages</Link>
          <span className="mx-2">/</span>
          <span className="text-dark-900">{travelPackage.title}</span>
        </nav>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-6">
            <PackageHeader package={travelPackage} reviews={reviews} />
            <PackageSeoContent package={travelPackage} priceLabel={priceLabel} />
            <DepartureSelector package={travelPackage} selectedDeparture={selectedDeparture} onSelect={setSelectedDeparture} />
            <PackageHighlights highlights={travelPackage.highlights} />
            <PackageOverview package={travelPackage} />
            <ItineraryTimeline itinerary={travelPackage.itinerary} />
            <HotelDetails hotels={travelPackage.hotels} />
            <InclusionsExclusions inclusions={travelPackage.inclusions} exclusions={travelPackage.exclusions} />
            <PackageGallery package={travelPackage} />
            <GroupTourInfo package={travelPackage} />
            <PackageFaq faqs={travelPackage.faqs} />
            <PackageReviews {...reviews} />
            <RelatedPackages packages={related} />
            <PackageFinalCTA package={travelPackage} />
          </div>

          <div className="space-y-5">
            <BookingSidebar package={travelPackage} selectedDeparture={selectedDeparture} />
            <TravelExpertCard expert={travelPackage.assignedExpert} packageTitle={travelPackage.title} />
            <WhyChooseUsCard />
          </div>
        </div>
      </main>

      <MobileBookingBar
        priceLabel={priceLabel}
        onBook={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        whatsappMessage={`Hi Bablons Travel, I am interested in ${travelPackage.title}.`}
      />
    </div>
  )
}

export default PackageDetailsPage
