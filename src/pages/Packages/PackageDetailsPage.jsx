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
import { getPackagePrice } from '../../components/package/packageViewUtils'

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
        document.title = item.seo?.metaTitle || `${item.title} | Bablons Travel`
        const description = item.seo?.metaDescription || item.shortDescription || item.description
        if (description) {
          let meta = document.querySelector('meta[name="description"]')
          if (!meta) {
            meta = document.createElement('meta')
            meta.setAttribute('name', 'description')
            document.head.appendChild(meta)
          }
          meta.setAttribute('content', description)
        }
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
