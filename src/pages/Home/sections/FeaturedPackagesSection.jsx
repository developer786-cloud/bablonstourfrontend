import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes'
import { formatPrice } from '../../../utils/formatPrice'
import { getDurationLabel, getPackageDestination, getPackageImages, getPackagePrice } from '../../../components/package/packageViewUtils'
import { packageService } from '../../../services/packageService'
import {
  FaArrowRight,
  FaBuilding,
  FaCalendarAlt,
  FaCar,
  FaFire,
  FaHeadset,
  FaHotel,
  FaInfoCircle,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaMountain,
  FaPassport,
  FaPlane,
  FaRegStar,
  FaSearch,
  FaShieldAlt,
  FaShip,
  FaStar,
  FaSuitcaseRolling,
  FaUserTie,
  FaUsers,
  FaUtensils,
} from 'react-icons/fa'

const tabs = [
  { label: 'All', icon: FaMapMarkedAlt, active: true },
  { label: 'Dubai', icon: FaBuilding },
  { label: 'Thailand', icon: FaShip },
  { label: 'Georgia', icon: FaMountain },
  { label: 'Uzbekistan', icon: FaBuilding },
]

const inclusions = [
  { label: 'Flights*', icon: FaPlane },
  { label: 'Hotels', icon: FaHotel },
  { label: 'Transfers', icon: FaCar },
  { label: 'Breakfast', icon: FaUtensils },
  { label: 'Tour Manager', icon: FaUserTie },
]

const featuredPackage = {
  title: 'Thailand Premium Tour',
  route: 'Bangkok - Pattaya - Phuket',
  duration: '6N / 7D',
  badge: 'Bestseller',
  price: 'Call for Best Price',
  oldPrice: '',
  saveLabel: 'Custom Quote',
  description:
    'Experience crystal beaches, island hopping, premium stays, and vibrant city moments in one seamless Bablons itinerary.',
  image:
    'https://res.cloudinary.com/docgnkjn9/image/upload/v1782808011/bablons-travel/destinations/epbjumeut9qapj3pxkos.jpg',
  href: ROUTES.PACKAGES,
}

const packages = [
  {
    title: 'Dubai Premium Tour',
    route: 'Dubai - Abu Dhabi',
    duration: '5N / 6D',
    tag: 'Trending',
    icon: FaFire,
    price: 'Call Now',
    oldPrice: '',
    saveLabel: 'Best Deal',
    image:
      'https://res.cloudinary.com/docgnkjn9/image/upload/v1782717769/bablons-travel/destinations/uzgbgcqcs2jgjg73sg8i.jpg',
    tone: 'bg-secondary-500',
  },
  {
    title: 'Thailand Premium Tour',
    route: 'Bangkok - Pattaya - Phuket',
    duration: '6N / 7D',
    tag: 'Most Popular',
    icon: FaStar,
    price: 'Call Now',
    oldPrice: '',
    saveLabel: 'Best Deal',
    image:
      'https://res.cloudinary.com/docgnkjn9/image/upload/v1782807660/bablons-travel/destinations/siglcnydp1mfc0cvcyvc.jpg',
    tone: 'bg-rose-500',
  },
  {
    title: 'Georgia Explorer Tour',
    route: 'Tbilisi - Gudauri - Batumi',
    duration: '6N / 7D',
    tag: 'Top Rated',
    icon: FaStar,
    price: 'Call Now',
    oldPrice: '',
    saveLabel: 'Best Deal',
    image:
      'https://res.cloudinary.com/docgnkjn9/image/upload/v1782803773/bablons-travel/destinations/cm8jrm1zri3p8syytt3f.jpg',
    tone: 'bg-primary-700',
  },
  {
    title: 'Uzbekistan Silk Road Tour',
    route: 'Tashkent - Samarkand - Bukhara',
    duration: '6N / 7D',
    tag: 'New Arrival',
    icon: FaStar,
    price: 'Call Now',
    oldPrice: '',
    saveLabel: 'Best Deal',
    image:
      'https://res.cloudinary.com/docgnkjn9/image/upload/v1782799415/bablons-travel/destinations/fsfxf9eqxkvbhkjzdxlf.jpg',
    tone: 'bg-violet-600',
  },
]

const getPackageHref = (travelPackage) => (travelPackage?.slug ? `/packages/${travelPackage.slug}` : ROUTES.PACKAGES)

const getPriceLabel = (travelPackage) => {
  const price = getPackagePrice(travelPackage)
  return price ? formatPrice(price, travelPackage?.pricing?.currency || 'INR') : 'Call for Best Price'
}

const getFeaturedPackageView = (travelPackage) => {
  if (!travelPackage) return featuredPackage

  const price = getPackagePrice(travelPackage)
  const originalPrice = travelPackage.pricing?.originalPrice

  return {
    title: travelPackage.title,
    route: getPackageDestination(travelPackage),
    duration: getDurationLabel(travelPackage),
    badge: travelPackage.featured ? 'Featured Tour' : 'Best Seller',
    price: getPriceLabel(travelPackage),
    oldPrice: originalPrice && originalPrice > price ? formatPrice(originalPrice, travelPackage.pricing?.currency || 'INR') : '',
    saveLabel: originalPrice && originalPrice > price ? `Save ${Math.round(((originalPrice - price) / originalPrice) * 100)}%` : 'Best Deal',
    description:
      travelPackage.shortDescription ||
      travelPackage.description ||
      'A curated Bablons itinerary with hotels, transfers, sightseeing support, and expert travel planning.',
    image: getPackageImages(travelPackage)[0]?.url || featuredPackage.image,
    href: getPackageHref(travelPackage),
  }
}

const getPackageCardView = (travelPackage) => {
  if (!travelPackage?.slug) return null
  const images = getPackageImages(travelPackage)
  const price = getPackagePrice(travelPackage)
  const originalPrice = travelPackage.pricing?.originalPrice

  return {
    title: travelPackage.title,
    route: getPackageDestination(travelPackage),
    duration: getDurationLabel(travelPackage),
    image: images[0]?.url || featuredPackage.image,
    href: getPackageHref(travelPackage),
    type: travelPackage.packageType || 'Tour',
    tag: travelPackage.featured ? 'Popular' : 'Best Seller',
    price: getPriceLabel(travelPackage),
    oldPrice: originalPrice && originalPrice > price ? formatPrice(originalPrice, travelPackage.pricing?.currency || 'INR') : '',
    saveLabel: originalPrice && originalPrice > price ? `Save ${Math.round(((originalPrice - price) / originalPrice) * 100)}%` : 'Best Deal',
    citiesCount: travelPackage.cities?.length || 1,
  }
}

const trustItems = [
  { title: 'Rated 4.9/5', text: 'From 500+ Travelers', icon: FaRegStar, tone: 'text-accent-500' },
  { title: '100% Trusted', text: 'IATA Certified', icon: FaShieldAlt, tone: 'text-emerald-600' },
  { title: 'Visa Assistance', text: 'For All Destinations', icon: FaPassport, tone: 'text-primary-700' },
  { title: 'Best Price Guarantee', text: 'No Hidden Charges', icon: FaStar, tone: 'text-secondary-600' },
  { title: '24x7 Support', text: 'During Your Trip', icon: FaHeadset, tone: 'text-accent-500' },
]

const steps = [
  { title: 'Choose Your Tour', text: 'Select from our handpicked international tours', icon: FaSearch },
  { title: 'Book With Ease', text: 'Secure your spot with a simple booking process', icon: FaCalendarAlt },
  { title: 'Pack Your Bags', text: 'Get set for an unforgettable journey', icon: FaSuitcaseRolling },
  { title: 'Enjoy Your Trip', text: 'Relax and create memories for a lifetime', icon: FaStar },
]

const FeaturedPackagesSection = () => {
  const [livePackages, setLivePackages] = useState([])

  useEffect(() => {
    let mounted = true

    packageService.list({ limit: 4, featured: true })
      .then((data) => {
        if (!mounted) return
        setLivePackages(data.packages || data.items || [])
      })
      .catch(() => {
        if (mounted) setLivePackages([])
      })

    return () => {
      mounted = false
    }
  }, [])

  const selectedFeaturedPackage = useMemo(() => getFeaturedPackageView(livePackages[0]), [livePackages])
  const packageCards = useMemo(() => {
    const liveCards = livePackages.map(getPackageCardView).filter(Boolean).slice(0, 4)
    if (liveCards.length) return liveCards

    return packages.map((pkg) => ({
      ...pkg,
      href: ROUTES.PACKAGES,
      type: pkg.title.split(' ')[0],
      citiesCount: 3,
    }))
  }, [livePackages])

  return (
    <section className="section-shell relative overflow-hidden bg-[#FFFCF7]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[linear-gradient(115deg,rgba(237,245,242,0.86),rgba(255,241,234,0.62),rgba(255,252,247,0))]" />
      <div className="pointer-events-none absolute -right-28 top-8 hidden h-80 w-80 rounded-full bg-secondary-100/55 blur-3xl lg:block" />
      <div className="pointer-events-none absolute -left-28 bottom-20 hidden h-80 w-80 rounded-full bg-primary-100/70 blur-3xl lg:block" />

      <div className="section-container relative">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-4xl font-bold leading-[1.05] text-dark-900 md:text-5xl">
            Popular International Tours
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base font-medium leading-7 text-dark-500">
            Handpicked destinations. Unforgettable experiences.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3 md:gap-4">
          {tabs.map((tab) => {
            const Icon = tab.icon

            return (
              <button
                key={tab.label}
                type="button"
                className={`inline-flex h-12 min-w-[8.5rem] items-center justify-center gap-3 rounded-full border px-5 text-sm font-extrabold shadow-sm transition hover:-translate-y-0.5 ${
                  tab.active
                    ? 'border-primary-900 bg-primary-900 text-white shadow-[0_18px_36px_rgba(16,39,36,0.2)]'
                    : 'border-sand-200 bg-white/90 text-dark-800 hover:border-primary-200 hover:bg-primary-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        <article className="mt-6 overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-[0_24px_70px_rgba(16,39,36,0.12)] lg:grid lg:grid-cols-[1.02fr_1.48fr_0.44fr]">
          <Link to={selectedFeaturedPackage.href || ROUTES.PACKAGES} className="relative block min-h-[18rem] overflow-hidden bg-dark-900 lg:min-h-[23rem]">
            <img
              src={selectedFeaturedPackage.image}
              alt={selectedFeaturedPackage.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/34 via-transparent to-transparent" />
            <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-primary-900 px-4 py-2 text-sm font-extrabold text-white shadow-lg">
              <FaStar className="text-accent-300" />
              {selectedFeaturedPackage.badge}
            </span>
            <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-lg bg-dark-900/78 px-3 py-2 text-sm font-extrabold text-white backdrop-blur">
              <FaCalendarAlt className="text-white/90" />
              {selectedFeaturedPackage.duration}
            </span>
          </Link>

          <div className="relative flex min-h-[19rem] flex-col justify-center overflow-hidden bg-white p-6 md:p-8 lg:p-10">
            <span className="w-fit rounded-lg bg-secondary-50 px-3 py-1.5 text-xs font-black text-secondary-700">
              <FaFire className="mr-1 inline h-3 w-3" />
              Best Seller
            </span>
            <h3 className="mt-4 font-display text-3xl font-bold leading-tight text-dark-900 md:text-4xl">
              {selectedFeaturedPackage.title}
            </h3>
            <p className="mt-3 flex items-center gap-2 text-sm font-extrabold text-secondary-600">
              <FaMapMarkerAlt />
              {selectedFeaturedPackage.route}
            </p>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
              {inclusions.map((item) => {
                const Icon = item.icon

                return (
                  <span key={item.label} className="inline-flex items-center gap-2 text-sm font-bold text-dark-800">
                    <Icon className="h-4 w-4 text-dark-800" />
                    {item.label}
                  </span>
                )
              })}
            </div>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-dark-600 md:text-base">{selectedFeaturedPackage.description}</p>
          </div>

          <div className="flex flex-col justify-center border-t border-sand-200 bg-[#FFFCF7] p-6 lg:border-l lg:border-t-0">
            <p className="text-sm font-semibold text-dark-500">Starting From</p>
            <p className="mt-1 text-4xl font-black leading-none text-dark-900">{selectedFeaturedPackage.price}</p>
            <p className="mt-1 text-sm font-semibold text-dark-500">per person</p>
            {selectedFeaturedPackage.oldPrice ? (
              <div className="mt-5 flex items-center gap-3">
                <span className="text-sm font-black text-red-500 line-through">{selectedFeaturedPackage.oldPrice}</span>
                <span className="rounded-md border border-secondary-300 px-2 py-1 text-xs font-black uppercase text-secondary-600">{selectedFeaturedPackage.saveLabel}</span>
              </div>
            ) : null}
            <Link
              to={selectedFeaturedPackage.href || ROUTES.PACKAGES}
              className="mt-7 inline-flex h-12 items-center justify-center gap-3 rounded-xl bg-primary-900 px-6 text-sm font-extrabold text-white shadow-[0_18px_38px_rgba(16,39,36,0.18)] transition hover:-translate-y-0.5 hover:bg-primary-800"
            >
              View Itinerary
              <FaArrowRight />
            </Link>
            <span className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold text-dark-700">
              <FaInfoCircle />
              Quick Details
            </span>
          </div>
        </article>

        <div className="mt-4 grid overflow-hidden rounded-xl border border-sand-200 bg-white/74 shadow-[0_14px_38px_rgba(16,39,36,0.07)] md:grid-cols-5">
          {trustItems.map((item) => {
            const Icon = item.icon

            return (
              <div key={item.title} className="flex items-center gap-4 border-b border-sand-200 px-5 py-4 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
                <Icon className={`h-7 w-7 shrink-0 ${item.tone}`} />
                <div>
                  <p className="text-sm font-black leading-tight text-dark-900">{item.title}</p>
                  <p className="mt-1 text-xs font-semibold text-dark-500">{item.text}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <h3 className="font-display text-2xl font-bold text-dark-900 md:text-3xl">
            <span className="mr-3 text-accent-600">-</span>
            Popular International Packages
          </h3>
          <Link to={ROUTES.PACKAGES} className="inline-flex items-center gap-2 text-sm font-extrabold text-primary-900 transition hover:text-secondary-600">
            View All Packages
            <FaArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {packageCards.map((pkg) => {
            const TagIcon = pkg.icon

            return (
              <article
                key={pkg.title}
                className="group overflow-hidden rounded-xl border border-sand-200 bg-white shadow-[0_18px_46px_rgba(16,39,36,0.1)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(16,39,36,0.16)]"
              >
                <Link to={pkg.href} className="relative block h-44 overflow-hidden bg-dark-900">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/18 to-transparent" />
                  <div className="absolute left-4 top-4 flex gap-2">
                    <span className="rounded-md bg-primary-700 px-3 py-1 text-[0.66rem] font-black uppercase tracking-wide text-white">
                      {pkg.type}
                    </span>
                    <span className={`inline-flex items-center gap-1 rounded-md px-3 py-1 text-[0.66rem] font-black uppercase tracking-wide text-white ${pkg.tone || 'bg-secondary-500'}`}>
                      {TagIcon ? <TagIcon className="h-3 w-3" /> : null}
                      {pkg.tag}
                    </span>
                  </div>
                  <span className="absolute bottom-3 right-3 rounded-md bg-white/92 px-3 py-1 text-xs font-black text-dark-900 backdrop-blur">
                    {pkg.duration}
                  </span>
                  <span className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs font-extrabold text-white">
                    <FaMapMarkerAlt className="text-accent-300" />
                    {pkg.route}
                  </span>
                </Link>

                <div className="p-5">
                  <h4 className="font-display text-xl font-bold leading-tight text-dark-900">
                    <Link to={pkg.href} className="transition hover:text-secondary-600">
                      {pkg.title}
                    </Link>
                  </h4>

                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-b border-sand-200 pb-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-dark-700">
                      <FaSuitcaseRolling className="h-3 w-3" />
                      {pkg.citiesCount} Cities
                    </span>
                    {inclusions.slice(0, 3).map((item) => {
                      const Icon = item.icon

                      return (
                        <span key={item.label} className="inline-flex items-center gap-1.5 text-xs font-bold text-dark-700">
                          <Icon className="h-3 w-3 text-dark-800" />
                          {item.label.replace('*', '')}
                        </span>
                      )
                    })}
                  </div>

                  <div className="mt-4 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold text-dark-500">Starting From</p>
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <span className="text-2xl font-black leading-none text-dark-900">{pkg.price}</span>
                        {pkg.oldPrice ? <span className="text-xs font-bold text-red-500 line-through">{pkg.oldPrice}</span> : null}
                      </div>
                    </div>
                    <Link
                      to={pkg.href}
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary-900 px-4 text-xs font-extrabold text-white transition hover:bg-primary-800"
                    >
                      View Details
                      <FaArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <h3 className="font-display text-2xl font-bold text-dark-900 md:text-3xl">
            <span className="mr-3 text-accent-600">-</span>
            Country Tour Packages
          </h3>
          <Link to={ROUTES.PACKAGES} className="inline-flex items-center gap-2 text-sm font-extrabold text-primary-900 transition hover:text-secondary-600">
            View All Packages
            <FaArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {packages.map((pkg) => {
            const TagIcon = pkg.icon

            return (
              <article
                key={`country-${pkg.title}`}
                className="group overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-[0_18px_46px_rgba(16,39,36,0.1)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(16,39,36,0.16)]"
              >
                <Link to={ROUTES.PACKAGES} className="relative block h-44 overflow-hidden bg-dark-900">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/18 to-transparent" />
                  <span className={`absolute left-4 top-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-extrabold text-white ${pkg.tone}`}>
                    <TagIcon className="h-3 w-3" />
                    {pkg.tag}
                  </span>
                  <span className="absolute right-4 top-4 rounded-full bg-white/88 px-3 py-1 text-xs font-black text-dark-900 backdrop-blur">
                    {pkg.duration}
                  </span>
                </Link>

                <div className="p-5">
                  <h4 className="font-display text-xl font-bold leading-tight text-dark-900">
                    <Link to={ROUTES.PACKAGES} className="transition hover:text-secondary-600">
                      {pkg.title}
                    </Link>
                  </h4>
                  <p className="mt-1 text-sm font-medium text-dark-500">{pkg.route}</p>

                  <div className="mt-5 grid grid-cols-4 gap-2 border-b border-sand-200 pb-4">
                    {inclusions.slice(0, 4).map((item) => {
                      const Icon = item.icon

                      return (
                        <span key={item.label} className="flex min-w-0 flex-col items-center gap-1 text-center text-[0.68rem] font-semibold text-dark-700">
                          <Icon className="h-4 w-4 text-dark-800" />
                          <span className="w-full truncate">{item.label}</span>
                        </span>
                      )
                    })}
                  </div>

                  <Link
                    to={ROUTES.PACKAGES}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-primary-900 transition group-hover:text-secondary-600"
                  >
                    View Tour
                    <FaArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-5 flex flex-col gap-4 rounded-xl border border-primary-100 bg-primary-50/60 px-5 py-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-primary-900 ring-1 ring-primary-100">
              <FaUsers className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-xl font-bold text-dark-900">Travel in Group & Save More!</h3>
              <p className="mt-1 text-sm leading-6 text-dark-600">Join our group departures and enjoy exciting discounts, expert tour managers and new friendships.</p>
            </div>
          </div>
          <Link to={ROUTES.PACKAGES} className="inline-flex h-12 shrink-0 items-center justify-center gap-3 rounded-xl bg-primary-900 px-7 text-sm font-extrabold text-white transition hover:bg-primary-800">
            View Group Tours
            <FaArrowRight />
          </Link>
        </div>

        <div className="mt-6 rounded-card border border-sand-100 bg-white/72 px-5 py-7 shadow-[0_18px_48px_rgba(16,39,36,0.08)] backdrop-blur">
          <div className="mb-6 flex items-center justify-center gap-5">
            <span className="h-px w-12 bg-accent-400" />
            <h3 className="font-display text-3xl font-bold text-dark-900">How it works</h3>
            <span className="h-px w-12 bg-accent-400" />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon

              return (
                <div key={step.title} className="relative flex items-center gap-4 lg:px-4">
                  {index > 0 ? (
                    <FaArrowRight className="absolute -left-5 top-8 hidden h-5 w-5 text-dark-300 lg:block" />
                  ) : null}
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-secondary-50 text-secondary-600">
                    <Icon className="h-7 w-7" />
                  </span>
                  <div>
                    <h4 className="font-display text-base font-bold text-dark-900">{step.title}</h4>
                    <p className="mt-1 text-sm leading-6 text-dark-600">{step.text}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedPackagesSection
