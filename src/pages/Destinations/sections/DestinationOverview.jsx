import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaArrowRight,
  FaArrowLeft,
  FaCalendarAlt,
  FaCheckCircle,
  FaEnvelope,
  FaLanguage,
  FaMapMarkerAlt,
  FaPlaneDeparture,
  FaPhoneAlt,
  FaSuitcaseRolling,
  FaUser,
  FaUsers,
} from 'react-icons/fa'
import { ROUTES } from '../../../constants/routes'
import { buildSrcSet, buildSizesForHero, buildPlaceholder } from '../../../utils/images'
import Breadcrumb from '../../../components/common/Breadcrumb'

const MAX_VISIBLE_HIGHLIGHTS = 4

const initialForm = {
  name: '',
  email: '',
  phone: '',
  travelDate: '',
  travelers: '2 Travelers',
}

const HeroAnimationStyles = () => (
  <style>{`
    @keyframes heroFadeUp {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .hero-animate {
      animation: heroFadeUp 0.6s ease-out both;
      animation-delay: var(--hero-delay, 0s);
    }
    @media (prefers-reduced-motion: reduce) {
      .hero-animate {
        animation: none;
        opacity: 1;
        transform: none;
      }
    }
  `}</style>
)

const DestinationOverview = ({ city, country }) => {
  const details = city.details || {}
  const highlights = details.highlights || []
  const visibleHighlights = highlights.slice(0, MAX_VISIBLE_HIGHLIGHTS)
  const travelTips = country.travelTips || {}

  const [imageLoaded, setImageLoaded] = useState(false)
  const placeholder = city.image?.src ? buildPlaceholder(city.image.src) : undefined

  useEffect(() => {
    // no-op for hero animations; removed hero enquiry form and sticky bar
  }, [])

  // hero enquiry removed — contact form handled on Contact page

  return (
    <>
      <HeroAnimationStyles />

      <section className="relative flex min-h-[660px] flex-col overflow-hidden bg-[#061b35] text-white lg:min-h-[700px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: placeholder ? `url(${placeholder})` : undefined }}
        >
          <img
            src={city.image.src}
            srcSet={buildSrcSet(city.image.src)}
            sizes={buildSizesForHero()}
            alt={city.image.alt}
            className={`h-full w-full object-cover transition duration-700 ${imageLoaded ? 'scale-100 opacity-90' : 'scale-105 opacity-0'}`}
            loading="eager"
            fetchPriority="high"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,18,38,0.96)_0%,rgba(5,29,59,0.82)_48%,rgba(5,29,59,0.28)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,18,38,0.12),rgba(3,18,38,0.82))]" />
        <div className="grain-overlay" />

        <div className="section-container relative flex flex-1 flex-col justify-between py-8 md:py-10">
          <div className="hero-animate flex flex-wrap items-center justify-between gap-4" style={{ '--hero-delay': '0.1s' }}>
            <Breadcrumb country={country} cityName={city.name} />
            <Link
              to={ROUTES.DESTINATIONS}
              className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-sm font-bold text-white/82 backdrop-blur transition hover:bg-white hover:text-dark-900 sm:hidden"
            >
              <FaArrowLeft className="h-3.5 w-3.5" />
              Back
            </Link>
          </div>

          <div className="mt-10">
            <div className="max-w-3xl">
              <p
                className="hero-animate font-display text-3xl italic leading-none text-accent-300"
                style={{ '--hero-delay': '0.2s' }}
              >
                Explore
              </p>
              <h1
                className="hero-animate mt-3 max-w-4xl font-display text-[clamp(3.3rem,10vw,6.5rem)] font-bold leading-[0.95] text-white"
                style={{ '--hero-delay': '0.28s' }}
              >
                {city.name}
              </h1>
              <p
                className="hero-animate mt-6 max-w-2xl text-base leading-8 text-white/84 md:text-lg"
                style={{ '--hero-delay': '0.36s' }}
              >
                {details.intro}
              </p>

              {visibleHighlights.length ? (
                <ul
                  className="hero-animate mt-5 flex max-w-2xl flex-wrap gap-2"
                  style={{ '--hero-delay': '0.4s' }}
                >
                  {visibleHighlights.map((highlight, index) => (
                    <li
                      key={`${highlight}-${index}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-xs font-semibold text-white/80"
                    >
                      <FaCheckCircle className="h-3 w-3 shrink-0 text-accent-300" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              ) : null}

              <div
                className="hero-animate mt-9 grid max-w-xl grid-cols-1 gap-5 text-sm sm:grid-cols-2"
                style={{ '--hero-delay': '0.44s' }}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-accent-300/40 bg-accent-300/12 text-accent-300">
                    <FaMapMarkerAlt />
                  </span>
                  <span><strong className="block text-white">Capital City</strong><span className="text-white/70">of {country.name}</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-accent-300/40 bg-accent-300/12 text-accent-300">
                    <FaPlaneDeparture />
                  </span>
                  <span><strong className="block text-white">Best Time</strong><span className="text-white/70">{travelTips.bestTime || 'Ask our expert'}</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-accent-300/40 bg-accent-300/12 text-accent-300">
                    <FaLanguage />
                  </span>
                  <span><strong className="block text-white">Language</strong><span className="text-white/70">{travelTips.language || 'Confirmed during planning'}</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-accent-300/40 bg-accent-300/12 text-accent-300">
                    <FaCheckCircle />
                  </span>
                  <span><strong className="block text-white">Currency</strong><span className="text-white/70">{travelTips.currency || 'Confirmed during planning'}</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default DestinationOverview