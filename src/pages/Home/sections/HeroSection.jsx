import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaArrowRight,
  FaCalendarAlt,
  FaCheck,
  FaHeadset,
  FaHotel,
  FaPassport,
  FaShieldAlt,
  FaStar,
  FaTags,
} from 'react-icons/fa'

import { ROUTES } from '../../../constants/routes'
import heroBg1 from '../../../assets/images/Hero Section Bg 3.png'
import heroBg2 from '../../../assets/images/Hero Section Bg 1.png'
import heroBg3 from '../../../assets/images/Hero Section Bg 4.jpg'
import heroBg4 from '../../../assets/images/Hero Section Bg 5.jpg'
import packageImage from '../../../assets/images/Image 1.png'

const heroBackgrounds = [
  { src: heroBg1, label: 'Airplane flying over a sunset coast' },
  { src: heroBg2, label: 'Mountain lake travel landscape' },
  { src: heroBg3, label: 'International landmarks and suitcase' },
  { src: heroBg4, label: 'Scenic international holiday view' },
]

const trustItems = [
  { icon: FaShieldAlt, title: 'IATA', label: 'Certified' },
  { icon: FaPassport, title: 'Visa', label: 'Assistance' },
  { icon: FaHotel, title: 'Handpicked', label: 'Hotels' },
  { icon: FaHeadset, title: '24/7', label: 'Support' },
  { icon: FaTags, title: 'Best Price', label: 'Guarantee' },
]

const packageIncludes = ['5 Nights & 6 Days', 'Luxury Hotels', 'Daily Breakfast', 'Airport Transfers', 'City Tours']

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
      <div className="absolute inset-0 overflow-hidden">
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
                className="h-full w-full object-cover object-center"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>
      </div>

      <span className="sr-only" role="status" aria-live="polite">
        Showing {heroBackgrounds[activeBgIndex].label}
      </span>

      <div className="absolute inset-0 bg-gradient-to-r from-dark-900/72 via-dark-900/42 to-dark-900/5" />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/68 via-dark-900/8 to-transparent" />
      <div className="grain-overlay" />

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
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

          <div className="mt-12 grid max-w-[44rem] grid-cols-2 overflow-hidden rounded-2xl border border-white/18 bg-dark-900/28 shadow-2xl shadow-black/20 backdrop-blur-md sm:grid-cols-5">
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

        <div className="home-hero-card-wrap mx-auto hidden w-full max-w-[28rem] lg:block">
          <article className="overflow-hidden rounded-[2rem] bg-white text-dark-900 shadow-[0_34px_90px_rgba(0,0,0,0.32)]">
            <div className="grid min-h-[28rem] grid-cols-[1fr_0.9fr]">
              <div className="flex flex-col p-7">
                <span className="mb-4 w-max rounded-full bg-sand-100 px-3 py-2 text-[0.68rem] font-extrabold uppercase tracking-[0.08em] text-dark-700">
                  Popular destination
                </span>
                <h2 className="font-display text-4xl font-bold leading-none text-dark-900">Thailand</h2>
                <p className="mt-2 font-display-label text-xl text-secondary-500">The Land of Smiles</p>

                <ul className="mt-7 grid gap-3">
                  {packageIncludes.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm font-semibold text-dark-700">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-dark-900 text-[0.65rem] text-white">
                        <FaCheck />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-7">
                  <p className="text-sm font-semibold text-dark-400">Starting From</p>
                  <div className="mt-1 flex items-end gap-1.5">
                    <strong className="text-3xl font-extrabold text-dark-900">Rs 89,999</strong>
                    <span className="pb-1 text-sm text-dark-500">/person</span>
                  </div>
                  <Link
                    to={ROUTES.PACKAGES}
                    className="mt-6 inline-flex h-12 items-center justify-center gap-3 rounded-full bg-secondary-500 px-7 text-sm font-extrabold uppercase tracking-[0.04em] text-white transition hover:bg-secondary-600"
                  >
                    View Package
                    <FaArrowRight />
                  </Link>
                </div>
              </div>

              <div className="relative min-h-full overflow-hidden">
                <img src={packageImage} alt="Thailand travel package" className="h-full w-full object-cover object-center" />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
