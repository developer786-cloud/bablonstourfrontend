import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaArrowRight,
  FaCalendarAlt,
  FaCheck,
  FaHeadset,
  FaHotel,
  FaMapMarkerAlt,
  FaPassport,
  FaShieldAlt,
  FaStar,
  FaTags,
} from 'react-icons/fa'

import { ROUTES } from '../../../constants/routes'
import heroBg6 from '../../../assets/images/hero banner 5.png'
import heroBg4 from '../../../assets/images/Hero Banner 3.jpg'
import heroBg5 from '../../../assets/images/hero banner 4.png'
import heroBg1 from '../../../assets/images/Hero Banner 1.png'
import heroBg2 from '../../../assets/images/Hero Section Bg 1.png'
import heroBg3 from '../../../assets/images/Hero Banner 2.png'
import packageImage from '../../../assets/images/hero banner 4.png'
import packageThumbOne from '../../../assets/images/UzbekIstan For Country.webp'
import packageThumbTwo from '../../../assets/images/Dubai For Country.webp'
import packageThumbThree from '../../../assets/images/Thailand For Country.webp'
import packageThumbFour from '../../../assets/images/Georgia For Country.webp'

const heroBackgrounds = [
  { src: heroBg6, label: 'Cultural heritage tour' },
  { src: heroBg4, label: 'Scenic international holiday view' },
  { src: heroBg5, label: 'Premium international holiday escape' },
  { src: heroBg1, label: 'Airplane flying over a sunset coast' },
  { src: heroBg2, label: 'Mountain lake travel landscape' },
  { src: heroBg3, label: 'International landmarks and suitcase' },
]

const trustItems = [
  { icon: FaShieldAlt, title: 'IATA', label: 'Certified' },
  { icon: FaPassport, title: 'Visa', label: 'Assistance' },
  { icon: FaHotel, title: 'Handpicked', label: 'Hotels' },
  { icon: FaHeadset, title: '24/7', label: 'Support' },
  { icon: FaTags, title: 'Best Price', label: 'Guarantee' },
]

const packageIncludes = ['5 Nights & 6 Days', 'Luxury Hotels', 'Daily Breakfast', 'Airport Transfers', 'City Tours']
const packageThumbnails = [packageImage, packageThumbOne, packageThumbTwo, packageThumbThree, packageThumbFour]

const HeroSection = () => {
  const [activeBgIndex, setActiveBgIndex] = useState(0)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveBgIndex((currentIndex) => (currentIndex + 1) % heroBackgrounds.length)
    }, 4500)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <section className="home-hero relative isolate overflow-hidden text-white">
      <div className="home-hero-media absolute inset-0 overflow-hidden">
        <div
          className="flex h-full transition-transform duration-[1400ms] ease-in-out"
          style={{
            width: `${heroBackgrounds.length * 100}%`,
            transform: `translateX(-${activeBgIndex * (100 / heroBackgrounds.length)}%)`,
          }}
        >
          {heroBackgrounds.map((background, index) => (
            <div
              key={background.src}
              className="h-full shrink-0"
              style={{ width: `${100 / heroBackgrounds.length}%` }}
            >
              <img
                src={background.src}
                alt=""
                aria-hidden="true"
                className="home-hero-bg-image h-full w-full object-cover object-center"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>
      </div>

      <span className="sr-only" role="status" aria-live="polite">
        Showing {heroBackgrounds[activeBgIndex].label}
      </span>

      <div className="home-hero-dots absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {heroBackgrounds.map((background, index) => (
          <button
            key={background.src}
            type="button"
            onClick={() => setActiveBgIndex(index)}
            className={`rounded-full transition-all duration-300 ${
              activeBgIndex === index ? 'h-2 w-9 bg-white' : 'h-2 w-2.5 bg-white/45 hover:bg-white/75'
            }`}
            aria-label={`Show ${background.label}`}
            aria-pressed={activeBgIndex === index}
          />
        ))}
      </div>

      <div className="home-hero-inner relative z-10 mx-auto grid items-center">
        <div className="home-hero-copy">
          <div className="home-hero-badge mb-8 inline-flex max-w-full flex-wrap items-center gap-3 rounded-full border border-white/28 bg-dark-900/26 px-5 py-3 text-xs font-extrabold uppercase tracking-[0.08em] text-white/95 backdrop-blur-md">
            <FaStar className="text-accent-300" />
            International holidays from India
          </div>

          <h1 className="home-hero-title max-w-[20rem] sm:max-w-3xl">
            Discover The World,
            <span className="home-hero-title-accent block">Without The Hassle.</span>
          </h1>

          <p className="home-hero-text mt-6 max-w-[20rem] sm:max-w-2xl">
            From visa to flights, stays to experiences, we handle every detail with care. You just enjoy a perfectly planned international journey.
          </p>

          <div className="home-hero-actions mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to={ROUTES.PACKAGES}
              className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-secondary-500 px-9 text-sm font-extrabold uppercase tracking-[0.04em] text-white shadow-[0_18px_38px_rgba(217,111,58,0.32)] transition hover:-translate-y-0.5 hover:bg-secondary-600 hover:shadow-[0_24px_48px_rgba(217,111,58,0.38)]"
            >
              Explore Tours
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

          <div className="home-hero-trust-grid mt-12 grid max-w-[44rem] grid-cols-2 overflow-hidden rounded-2xl border border-white/18 bg-dark-900/28 shadow-2xl shadow-black/20 backdrop-blur-md sm:grid-cols-5">
            {trustItems.map((item) => {
              const Icon = item.icon

              return (
                <div key={item.title} className="flex min-h-28 flex-col items-center justify-center border-b border-r border-white/12 px-4 py-5 text-center last:border-r-0 even:border-r-0 sm:border-b-0 sm:even:border-r sm:last:border-r-0">
                  <Icon className="mb-3 h-6 w-6 text-secondary-400" />
                  <strong className="text-sm font-extrabold leading-tight text-white">{item.title}</strong>
                  <span className="mt-1 text-sm font-semibold text-white/78">{item.label}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="home-hero-card-wrap mx-auto hidden w-full max-w-[28rem] lg:translate-x-2 xl:translate-x-4 2xl:translate-x-6 lg:block">
          <article className="relative min-h-[34rem] overflow-hidden rounded-[2rem] border border-white/24 bg-dark-900 shadow-[0_34px_90px_rgba(0,0,0,0.34)]">
            <img
              src={packageImage}
              alt="Premium international travel packages"
              className="absolute inset-0 h-full w-full object-cover object-center"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,50,79,0.08)_0%,rgba(7,36,54,0.14)_36%,rgba(5,19,18,0.9)_100%),linear-gradient(90deg,rgba(8,22,23,0.46)_0%,rgba(8,22,23,0.12)_62%)]" />

            <div className="relative flex min-h-[34rem] flex-col p-6">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-2 rounded-full bg-dark-900/62 px-4 py-2 text-[0.68rem] font-extrabold uppercase tracking-[0.07em] text-white shadow-lg shadow-dark-900/20 backdrop-blur-md">
                    <FaStar className="text-accent-300" />
                    Featured Packages
                  </span>
                  <span className="inline-flex items-center gap-2 text-[0.78rem] font-extrabold uppercase tracking-[0.04em] text-white drop-shadow">
                    <FaMapMarkerAlt />
                    Worldwide
                  </span>
                </div>

                <h2 className="mt-10 max-w-[19rem] font-display text-[2.7rem] font-bold leading-none text-white drop-shadow-[0_5px_18px_rgba(0,0,0,0.34)]">
                  Curated Holiday Packages
                </h2>

                <p className="mt-2 font-display-label text-xl text-white/95 drop-shadow-[0_3px_12px_rgba(0,0,0,0.28)]">
                  Premium trips planned end-to-end
                </p>

                <ul className="mt-6 grid gap-3">
                  {packageIncludes.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[0.92rem] font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.28)]">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-secondary-500 text-[0.62rem] text-white">
                        <FaCheck />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto">
                <div className="flex items-end justify-between gap-5 border-y border-white/10 py-5">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-white">
                      Starting From
                    </p>
                    <h3 className="mt-1 text-2xl font-extrabold leading-tight text-white">
                      Call for Best Price
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-white/72">
                      Custom quote per destination
                    </p>
                  </div>

                  <Link to={ROUTES.PACKAGES} className="group inline-flex items-center gap-3 text-sm font-extrabold uppercase tracking-[0.04em] text-white">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary-500 text-lg shadow-[0_14px_28px_rgba(217,111,58,0.34)] transition group-hover:translate-x-1 group-hover:bg-secondary-600">
                      <FaArrowRight />
                    </span>
                    View Package
                  </Link>
                </div>

                <div className="mt-5 grid grid-cols-5 gap-2.5">
                  {packageThumbnails.map((image, index) => (
                    <Link
                      key={image}
                      to={ROUTES.PACKAGES}
                      aria-label={`View package image ${index + 1}`}
                      className="group h-14 overflow-hidden rounded-xl border border-white/16 bg-white/10 shadow-[0_10px_22px_rgba(0,0,0,0.22)]"
                    >
                      <img src={image} alt="" aria-hidden="true" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" loading="lazy" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
