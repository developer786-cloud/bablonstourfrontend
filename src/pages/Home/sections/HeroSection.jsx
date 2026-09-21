import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaArrowRight,
  FaCalendarAlt,
  FaChevronRight,
  FaHeadset,
  FaHotel,
  FaMapMarkerAlt,
  FaPassport,
  FaPlane,
  FaShieldAlt,
  FaStar,
  FaTags,
} from 'react-icons/fa'

import { ROUTES } from '../../../constants/routes'
import { packageService } from '../../../services/packageService'
import { formatPrice } from '../../../utils/formatPrice'
import { getDurationLabel, getPackageDestination, getPackageImages, getPackagePrice } from '../../../components/package/packageViewUtils'
import SearchPackagesSection from './SearchPackagesSection'
import heroBg1 from '../../../assets/images/Hero Banner 1.png'
import heroBg2 from '../../../assets/images/Hero Section Bg 1.png'
import heroBg3 from '../../../assets/images/Hero Section Bg 3.png'
import heroBg4 from '../../../assets/images/Hero Banner 2.png'
import packageImage from '../../../assets/images/hero banner 4.png'
import packageThumbOne from '../../../assets/images/UzbekIstan For Country.webp'
import packageThumbTwo from '../../../assets/images/Dubai For Country.webp'
import packageThumbThree from '../../../assets/images/Thailand For Country.webp'
import packageThumbFour from '../../../assets/images/Georgia For Country.webp'

const trustItems = [
  { icon: FaShieldAlt, title: 'IATA', label: 'Certified' },
  { icon: FaPassport, title: 'Visa', label: 'Assistance' },
  { icon: FaHotel, title: 'Handpicked', label: 'Hotels' },
  { icon: FaHeadset, title: '24/7', label: 'Support' },
  { icon: FaTags, title: 'Best Price', label: 'Guarantee' },
]

const heroBenefits = [
  { icon: FaPlane, label: 'Flights' },
  { icon: FaHotel, label: 'Hotels' },
  { icon: FaMapMarkerAlt, label: 'Tour Packages' },
  { icon: FaPassport, label: 'Visa Assistance' },
  { icon: FaHeadset, label: '24/7 Support' },
]

const heroBackgrounds = [heroBg1, heroBg2, heroBg3, heroBg4]

const fallbackPackages = [
  { title: 'Santorini, Greece', destination: 'Greece', duration: '7D / 6N', image: packageImage, href: ROUTES.PACKAGES },
  { title: 'Dubai Premium Tour', destination: 'Dubai', duration: '5D / 4N', image: packageThumbTwo, href: ROUTES.PACKAGES },
  { title: 'Bali Escape', destination: 'Bali', duration: '6D / 5N', image: packageThumbThree, href: ROUTES.PACKAGES },
  { title: 'Uzbekistan Silk Road', destination: 'Uzbekistan', duration: '8D / 7N', image: packageThumbOne, href: ROUTES.PACKAGES },
  { title: 'Georgia Explorer', destination: 'Georgia', duration: '7D / 6N', image: packageThumbFour, href: ROUTES.PACKAGES },
]

const getPackageImage = (travelPackage) => getPackageImages(travelPackage)[0]?.url || packageImage

const getPackageView = (travelPackage) => ({
  title: travelPackage.title,
  destination: getPackageDestination(travelPackage),
  duration: getDurationLabel(travelPackage).replace(' Nights / ', 'N / ').replace(' Days', 'D'),
  image: getPackageImage(travelPackage),
  price: getPackagePrice(travelPackage)
    ? `From ${formatPrice(getPackagePrice(travelPackage), travelPackage.pricing?.currency || 'INR')}`
    : 'Call for Best Price',
  href: travelPackage.slug ? `/packages/${travelPackage.slug}` : ROUTES.PACKAGES,
})

const HeroSection = () => {
  const [activeBackground, setActiveBackground] = useState(0)
  const [heroPackages, setHeroPackages] = useState([])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const intervalId = window.setInterval(() => {
      setActiveBackground((current) => (current + 1) % heroBackgrounds.length)
    }, 6000)

    return () => window.clearInterval(intervalId)
  }, [])

  useEffect(() => {
    let mounted = true

    packageService.list({ limit: 5, featured: true })
      .then((data) => {
        if (!mounted) return
        const packages = data?.packages || data?.items || []
        setHeroPackages(packages.length ? packages.map(getPackageView) : fallbackPackages)
      })
      .catch(() => {
        if (mounted) setHeroPackages(fallbackPackages)
      })

    return () => {
      mounted = false
    }
  }, [])

  const visiblePackages = heroPackages.length ? heroPackages : fallbackPackages
  const featuredPackage = visiblePackages[0]
  const supportingPackages = visiblePackages.slice(1, 5)

  return (
    <section className="home-hero relative isolate overflow-hidden text-white">
      <div className="home-hero-media absolute inset-0 overflow-hidden">
        <div
          className="home-hero-background-track flex h-full transition-transform duration-[1400ms] ease-in-out"
          style={{
            width: `${heroBackgrounds.length * 100}%`,
            transform: `translateX(-${activeBackground * (100 / heroBackgrounds.length)}%)`,
          }}
        >
          {heroBackgrounds.map((background, index) => (
            <img
              key={background}
              src={background}
              alt=""
              aria-hidden="true"
              className="home-hero-bg-image h-full shrink-0 object-cover object-center"
              style={{ width: `${100 / heroBackgrounds.length}%` }}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          ))}
        </div>
      </div>

      <div className="home-hero-inner relative z-10 mx-auto grid items-center">
        <div className="home-hero-copy">
          <div className="home-hero-badge mb-6 inline-flex max-w-full flex-wrap items-center gap-3 rounded-full border border-white/28 bg-dark-900/26 px-5 py-3 text-xs font-extrabold uppercase tracking-[0.08em] text-white/95 backdrop-blur-md">
            <FaPlane className="text-accent-300" />
            International holidays from India
          </div>

          <h1 className="home-hero-title max-w-full sm:max-w-3xl">
            <span className="home-hero-title-line">Discover The World,</span>
            <span className="home-hero-title-accent block">Without The Hassle.</span>
          </h1>

          <p className="home-hero-text mt-6 max-w-[20rem] sm:max-w-2xl">
            Curated international holiday packages, visa assistance, luxury stays and end-to-end travel support — all in one place.
          </p>

          <div className="home-hero-benefits mt-7 flex flex-wrap gap-x-7 gap-y-4">
            {heroBenefits.map((benefit) => {
              const Icon = benefit.icon
              return <span key={benefit.label} className="inline-flex items-center gap-2"><Icon />{benefit.label}</span>
            })}
          </div>

          <div className="home-hero-actions mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to={ROUTES.PACKAGES}
              className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-secondary-500 px-9 text-sm font-extrabold uppercase tracking-[0.04em] text-white shadow-[0_18px_38px_rgba(217,111,58,0.32)] transition hover:-translate-y-0.5 hover:bg-secondary-600 hover:shadow-[0_24px_48px_rgba(217,111,58,0.38)]"
            >
              Explore Packages
              <FaArrowRight />
            </Link>
            <Link
              to={ROUTES.CONTACT}
              className="inline-flex h-14 items-center justify-center gap-3 rounded-full border border-white/55 bg-dark-900/20 px-9 text-sm font-extrabold uppercase tracking-[0.04em] text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white hover:text-dark-900"
            >
              Get Free Travel Plan
              <FaCalendarAlt />
            </Link>
          </div>

          <div className="home-hero-rating mt-5 flex items-center gap-3 text-sm font-semibold text-white/85">
            <span className="flex gap-1 text-accent-300" aria-label="Rated 4.9 out of 5 stars">
              {[1, 2, 3, 4, 5].map((star) => <FaStar key={star} />)}
            </span>
            <span><strong className="text-white">4.9/5</strong> Rated by 5,000+ Happy Travelers</span>
          </div>

        </div>

        <div className="home-hero-card-wrap mx-auto hidden w-full max-w-[28rem] lg:translate-x-2 xl:translate-x-4 2xl:translate-x-6 lg:block">
          <article className="home-hero-package-panel relative overflow-hidden rounded-[1.5rem] border border-white/65 bg-white shadow-[0_34px_90px_rgba(0,0,0,0.34)]">
            <img
              src={featuredPackage.image}
              alt={featuredPackage.title}
              className="home-hero-featured-image h-[11rem] w-full object-cover object-center"
              loading="lazy"
            />
            <div className="p-4">
              <div className="flex items-center justify-between gap-3 border-b border-dark-900/10 pb-3">
                <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.08em] text-dark-900">
                  <FaStar className="text-secondary-500" /> Featured Packages
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-dark-500">
                  <FaMapMarkerAlt className="text-secondary-500" /> Worldwide
                </span>
              </div>

              <Link to={featuredPackage.href} className="group block border-b border-dark-900/10 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="truncate text-base font-extrabold text-dark-900">{featuredPackage.title}</h2>
                    <p className="mt-1 text-xs font-semibold text-dark-500">{featuredPackage.duration} <span className="px-1 text-dark-300">|</span> {featuredPackage.price}</p>
                  </div>
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-dark-900 text-white transition group-hover:bg-secondary-500">
                    <FaArrowRight className="text-xs" />
                  </span>
                </div>
              </Link>

              <div className="divide-y divide-dark-900/10">
                {supportingPackages.map((travelPackage) => (
                  <Link key={`${travelPackage.title}-${travelPackage.image}`} to={travelPackage.href} className="group flex items-center gap-3 py-3">
                    <img src={travelPackage.image} alt="" className="h-12 w-12 shrink-0 rounded-xl object-cover" loading="lazy" />
                    <span className="min-w-0 flex-1">
                      <strong className="block truncate text-sm font-extrabold text-dark-900">{travelPackage.title}</strong>
                      <span className="mt-0.5 block truncate text-[0.68rem] font-semibold text-dark-500">{travelPackage.duration} <span className="px-1 text-dark-300">|</span> {travelPackage.price}</span>
                    </span>
                    <FaChevronRight className="shrink-0 text-xs text-dark-400 transition group-hover:translate-x-1 group-hover:text-secondary-500" />
                  </Link>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>

      <SearchPackagesSection className="home-hero-search" trustItems={trustItems} />
    </section>
  )
}

export default HeroSection
