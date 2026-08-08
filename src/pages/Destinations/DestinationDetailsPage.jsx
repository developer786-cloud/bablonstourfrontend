import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  FaArrowRight,
  FaBed,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaCompass,
  FaGlobeAsia,
  FaHeadset,
  FaImages,
  FaInfoCircle,
  FaMapMarkedAlt,
  FaPhoneAlt,
  FaQuestionCircle,
  FaRoute,
  FaShieldAlt,
  FaSuitcaseRolling,
  FaTrophy,
  FaWhatsapp,
} from 'react-icons/fa'

import Button from '../../components/common/Button/Button'
import DestinationOverview from './sections/DestinationOverview'
import Attractions from './sections/Attractions'
import Gallery from './sections/Gallery'
import RelatedPackages from './sections/RelatedPackages'
import RelatedBlogs from './sections/RelatedBlogs'
import DestinationFAQ from './sections/DestinationFAQ'
import RelatedSilo from './sections/RelatedSilo'
import DestinationGuideSections from './sections/DestinationGuideSections'

import { destinationService } from '../../services/destinationService'
import { applyPageSeo, upsertJsonLd, removeJsonLd } from '../../utils/seo'
import { ROUTES } from '../../constants/routes'
import { COMPANY_CONTACT } from '../../constants/companyContact'

import heroFallback from '../../assets/images/Destinastion page bg.webp'


/* =========================================================
   HELPERS
========================================================= */

const normalizeImage = (image, fallbackAlt = '') => ({
  src:
    image?.src ||
    image?.url ||
    (typeof image === 'string' ? image : '') ||
    heroFallback,
  alt:
    image?.alt ||
    fallbackAlt,
})

const normalizeAttractions = (attractions = []) =>
  attractions
    .map((attraction) => ({
      name: attraction?.name || attraction?.title,
      note:
        attraction?.note ||
        attraction?.description ||
        '',
      image: normalizeImage(
        attraction?.image,
        attraction?.name || attraction?.title
      ),
    }))
    .filter((item) => item.name)


const COUNTRY_SLUG_ALIASES = {
  dubai: ['dubai', 'dubai-uae', 'uae', 'united-arab-emirates'],
  'dubai-uae': ['dubai', 'dubai-uae', 'uae', 'united-arab-emirates'],
  uae: ['dubai', 'dubai-uae', 'uae', 'united-arab-emirates'],
  'united-arab-emirates': [
    'dubai',
    'dubai-uae',
    'uae',
    'united-arab-emirates',
  ],
}

const getCountryKey = (slug = '') => {
  const normalized = String(slug).trim().toLowerCase()

  return COUNTRY_SLUG_ALIASES[normalized]?.[0] || normalized
}

const sameCountrySlug = (first = '', second = '') =>
  getCountryKey(first) === getCountryKey(second)


const getResolvedDetails = (city, country) => {
  const backend = city?.details || {}

  return {
    ...backend,

    intro:
      backend.intro ||
      `${city.name} is one of ${country.name}'s most interesting destinations for travelers.`,

    highlights:
      backend.highlights?.length
        ? backend.highlights
        : [
            'Custom itinerary planning',
            'Hotel and transfer assistance',
            'Guided sightseeing',
            'Visa and travel guidance',
          ],

    attractions: backend.attractions || [],

    gallery: backend.gallery || [],

    faqs: backend.faqs || [],
  }
}


/* =========================================================
   BACKEND → VIEW MODEL
========================================================= */

const backendDestinationToView = (destination) => {
  if (!destination) return null

  const countryName = destination.country || destination.name

  const city = {
    slug: destination.citySlug || destination.slug,

    name: destination.name,

    image: normalizeImage(
      destination.heroImage,
      destination.name
    ),

    details: {
      intro:
        destination.overview ||
        destination.shortDescription ||
        `${destination.name} is one of ${countryName}'s standout travel experiences.`,

      highlights: [
        'Custom itinerary planning',
        'Hotel and transfer assistance',
        'Guided sightseeing options',
        'Visa and document guidance',
      ],

      attractions: normalizeAttractions(
        destination.attractions
      ),

      gallery: (destination.gallery || [])
        .map((image) =>
          normalizeImage(image, destination.name)
        )
        .filter((image) => image.src),

      faqs: destination.faqs || [],
    },
  }

  return {
    city,

    country: {
      slug: destination.countrySlug,

      name: countryName,

      travelTips: {
        bestTime:
          destination.bestTimeToVisit ||
          'Ask our travel experts',

        currency:
          destination.currency ||
          'Confirmed during planning',

        language:
          destination.language ||
          'Confirmed during planning',

        timezone:
          destination.timezone ||
          'Confirmed during planning',

        notes: destination.travelTips || [],
      },
    },

    destination,
  }
}


/* =========================================================
   DESTINATION NAV
========================================================= */

const DestinationNav = () => {
  const items = [
    ['overview', 'Overview', FaInfoCircle],
    ['attractions', 'Attractions', FaMapMarkedAlt],
    ['things-to-do', 'Things to Do', FaCompass],
    ['travel-guide', 'Travel Guide', FaRoute],
    ['packages', 'Packages', FaSuitcaseRolling],
    ['faq', 'FAQs', FaQuestionCircle],
    ['gallery', 'Gallery', FaImages],
  ]

  return (
    <div className="relative z-30 -mt-6 px-4">
      <div className="mx-auto max-w-7xl">
        <nav className="overflow-hidden rounded-2xl border border-white/10 bg-[#071f3f]/95 p-2 shadow-[0_20px_60px_rgba(7,31,63,0.22)] backdrop-blur-xl">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {items.map(([id, label, Icon]) => (
              <a
                key={id}
                href={`#${id}`}
                className="
                  inline-flex min-h-11 shrink-0 items-center gap-2
                  rounded-xl px-4
                  text-xs font-bold text-white/80
                  transition
                  hover:bg-white/10
                  hover:text-white
                "
              >
                <Icon className="text-accent-300" />
                {label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}


/* =========================================================
   QUICK FACT
========================================================= */

const QuickFact = ({ icon: Icon, label, value }) => (
  <div className="group flex items-center gap-3 rounded-2xl border border-sand-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-accent-200 hover:shadow-[0_15px_35px_rgba(16,39,36,0.07)]">
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-700">
      <Icon />
    </span>

    <div className="min-w-0">
      <p className="text-[10px] font-black uppercase tracking-[0.12em] text-dark-400">
        {label}
      </p>

      <p className="mt-1 truncate text-sm font-bold text-dark-900">
        {value}
      </p>
    </div>
  </div>
)


/* =========================================================
   ABOUT DESTINATION
========================================================= */

const AboutDestination = ({
  city,
  country,
  details,
}) => {
  return (
    <section
      id="overview"
      className="scroll-mt-28 rounded-[28px] border border-sand-200 bg-white p-6 shadow-[0_16px_50px_rgba(16,39,36,0.05)] sm:p-8"
    >
      <div className="max-w-4xl">
        <p className="section-eyebrow">
          Destination Overview
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#071f3f] sm:text-4xl">
          About {city.name}
        </h2>

        <p className="mt-5 text-base leading-8 text-dark-600">
          {details.intro}
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <QuickFact
          icon={FaGlobeAsia}
          label="Country"
          value={country.name}
        />

        <QuickFact
          icon={FaCalendarAlt}
          label="Best Time"
          value={country.travelTips?.bestTime}
        />

        <QuickFact
          icon={FaClock}
          label="Time Zone"
          value={country.travelTips?.timezone}
        />

        <QuickFact
          icon={FaTrophy}
          label="Travel Style"
          value="Family • Private • Group"
        />
      </div>
    </section>
  )
}


/* =========================================================
   TRAVEL ESSENTIALS
========================================================= */

const TravelEssentials = ({
  cityName,
  travelTips = {},
}) => {
  const items = [
    [
      'Ideal Duration',
      '3–4 Days',
      FaCalendarAlt,
    ],

    [
      'Visa Information',
      'Check current requirements',
      FaShieldAlt,
    ],

    [
      'Travel Style',
      'Private • Family • Group',
      FaTrophy,
    ],

    [
      'Time Zone',
      travelTips.timezone || 'Confirmed during planning',
      FaClock,
    ],

    [
      'Currency',
      travelTips.currency || 'Confirmed during planning',
      FaSuitcaseRolling,
    ],
  ]

  return (
    <section className="rounded-[24px] border border-sand-200 bg-white p-5 shadow-[0_15px_45px_rgba(16,39,36,0.06)]">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.14em] text-accent-600">
          Plan your visit
        </p>

        <h3 className="mt-2 text-2xl font-bold text-[#071f3f]">
          Travel Essentials
        </h3>
      </div>

      <div className="mt-5 divide-y divide-sand-100">
        {items.map(([label, value, Icon]) => (
          <div
            key={label}
            className="flex gap-3 py-4 first:pt-0 last:pb-0"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-700">
              <Icon className="text-sm" />
            </span>

            <div>
              <p className="text-sm font-bold text-dark-900">
                {label}
              </p>

              <p className="mt-1 text-xs leading-5 text-dark-500">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Link
        to={`${ROUTES.CONTACT}?destination=${encodeURIComponent(cityName)}`}
        className="
          mt-5 inline-flex w-full items-center
          justify-center gap-2 rounded-xl
          bg-[#071f3f] px-4 py-3
          text-sm font-bold text-white
          transition hover:bg-primary-800
        "
      >
        Talk to a Travel Expert
        <FaArrowRight className="text-xs" />
      </Link>
    </section>
  )
}


/* =========================================================
   SIDEBAR CTA
========================================================= */

const SidebarCTA = ({
  cityName,
}) => {
  return (
    <section className="relative overflow-hidden rounded-[26px] bg-[#071f3f] p-6 text-white shadow-[0_20px_60px_rgba(7,31,63,0.2)]">
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent-400/20 blur-3xl" />

      <div className="relative">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-accent-200">
          <FaHeadset />
          Travel Experts
        </span>

        <h3 className="mt-4 text-2xl font-bold leading-tight">
          Planning a trip to {cityName}?
        </h3>

        <p className="mt-3 text-sm leading-6 text-white/70">
          Explore our curated packages or speak with our travel team for help with hotels, transfers, sightseeing and itinerary planning.
        </p>

        <div className="mt-6 grid gap-3">
          <Link
            to={`${ROUTES.PACKAGES}?destination=${encodeURIComponent(cityName)}`}
            className="
              inline-flex min-h-11
              items-center justify-center gap-2
              rounded-full bg-accent-500
              px-5 text-sm font-black text-white
              transition hover:bg-accent-600
            "
          >
            Explore Packages
            <FaArrowRight className="text-xs" />
          </Link>

          <a
            href={COMPANY_CONTACT.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="
              inline-flex min-h-11
              items-center justify-center gap-2
              rounded-full
              border border-white/15
              bg-white/5
              px-5 text-sm font-bold text-white
              transition hover:bg-white hover:text-[#071f3f]
            "
          >
            <FaWhatsapp />
            WhatsApp Us
          </a>
        </div>

        <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 text-xs text-white/60">
          <FaCheckCircle className="text-accent-300" />
          Personalized travel support
        </div>
      </div>
    </section>
  )
}


/* =========================================================
   DESTINATION DETAILS PAGE
========================================================= */

const DestinationDetailsPage = () => {
  const {
    countrySlug,
    citySlug,
  } = useParams()

  const routeKey = `${countrySlug}/${citySlug}`

  const [backendState, setBackendState] = useState({
    key: '',
    result: null,
    page: null,
  })


  /* -------------------------------------------------------
     FETCH DESTINATION
  ------------------------------------------------------- */

  useEffect(() => {
    let mounted = true

    setBackendState({
      key: '',
      result: null,
      page: null,
    })

    destinationService
      .get(citySlug, {
        countrySlug,
      })
      .then((page) => {
        if (!mounted) return

        const destination =
          page?.destination || page

        const result =
          destination &&
          sameCountrySlug(
            destination.countrySlug,
            countrySlug
          )
            ? backendDestinationToView(destination)
            : null

        setBackendState({
          key: routeKey,
          result,
          page: result ? page : null,
        })
      })
      .catch(() => {
        if (!mounted) return

        setBackendState({
          key: routeKey,
          result: null,
          page: null,
        })
      })

    return () => {
      mounted = false
    }
  }, [
    citySlug,
    countrySlug,
    routeKey,
  ])


  const loading =
    backendState.key !== routeKey

  const result =
    backendState.key === routeKey
      ? backendState.result
      : null

  const page =
    backendState.key === routeKey
      ? backendState.page
      : null


  /* -------------------------------------------------------
     SEO
  ------------------------------------------------------- */

  useEffect(() => {
    if (!result) return

    const {
      city,
      country,
    } = result

    const path =
      page?.seo?.canonical ||
      `/destinations/${country.slug}/${city.slug}`

    const title =
      page?.seo?.title ||
      result.city?.seo?.metaTitle ||
      `${city.name} Travel Guide | ${country.name} | Bablons Travel`

    const description =
      page?.seo?.description ||
      result.city?.seo?.metaDescription ||
      city.details?.intro ||
      ''

    const image =
      page?.seo?.image ||
      city.image?.src

    const keywords =
      page?.seo?.keywords ||
      [
        `${city.name} travel guide`,
        `${city.name} tourism`,
        `things to do in ${city.name}`,
        `${city.name} tour packages`,
        `${city.name} travel`,
        `${country.name} holidays`,
      ]

    applyPageSeo({
      title,
      description,
      path,
      image,
      keywords,
    })


    const jsonLdEntries =
      page?.jsonLd || []

    jsonLdEntries.forEach(
      (entry, index) => {
        try {
          upsertJsonLd(
            `destination-jsonld-${index}`,
            entry
          )
        } catch {
          // intentionally ignored
        }
      }
    )


    return () => {
      jsonLdEntries.forEach(
        (_, index) => {
          removeJsonLd(
            `destination-jsonld-${index}`
          )
        }
      )

      removeJsonLd('breadcrumb')
      removeJsonLd('faq')
    }
  }, [
    result,
    page,
  ])


  /* -------------------------------------------------------
     LOADING
  ------------------------------------------------------- */

  if (loading) {
    return (
      <main className="min-h-[70vh] bg-[#F8F5EF]">
        <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 py-20">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-accent-600">
              Bablons Travel
            </p>

            <h1 className="mt-3 text-3xl font-bold text-[#071f3f]">
              Preparing your destination guide
            </h1>

            <p className="mt-3 text-sm text-dark-500">
              Loading travel information...
            </p>
          </div>
        </div>
      </main>
    )
  }


  /* -------------------------------------------------------
     NOT FOUND
  ------------------------------------------------------- */

  if (!result) {
    return (
      <main className="min-h-[70vh] bg-[#F8F5EF]">
        <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4 py-20 text-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-accent-600">
              Destination
            </p>

            <h1 className="mt-3 text-4xl font-bold text-[#071f3f]">
              Destination not found
            </h1>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-dark-500">
              We couldn't find the destination you're looking for. Explore our destinations and discover your next journey.
            </p>

            <Link
              to={ROUTES.DESTINATIONS}
              className="mt-7 inline-flex"
            >
              <Button
                size="lg"
                className="rounded-full bg-[#071f3f] px-7 text-white hover:bg-primary-800"
              >
                Explore Destinations
              </Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }


  const {
    city,
    country,
  } = result

  const details =
    getResolvedDetails(
      city,
      country
    )

  const cityWithDetails = {
    ...city,
    details,
  }


  const hasSilo =
    Boolean(
      (page?.related?.hotels || []).length ||
      (page?.related?.nearbyDestinations || []).length
    )


  /* -------------------------------------------------------
     MAIN UI
  ------------------------------------------------------- */

  return (
    <main className="w-full overflow-hidden bg-[#F8F5EF] text-dark-900">

      {/* =================================================
          HERO
      ================================================= */}

      <DestinationOverview
        city={cityWithDetails}
        country={country}
      />


      {/* =================================================
          SECTION NAVIGATION
      ================================================= */}

      <DestinationNav />


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">

          {/* ===============================================
              MAIN COLUMN
          =============================================== */}

          <div className="min-w-0 space-y-7">

            <AboutDestination
              city={city}
              country={country}
              details={details}
            />


            <Attractions
              id="attractions"
              attractions={details.attractions}
              cityName={city.name}
            />


            <div id="things-to-do" className="scroll-mt-28">
              <DestinationGuideSections
                destination={result.destination}
                cityName={city.name}
              />
            </div>


            <RelatedBlogs
              id="related-blogs"
              cityName={city.name}
              initialBlogs={
                page?.related?.blogs || null
              }
            />


            <RelatedPackages
              id="packages"
              cityName={city.name}
              relatedPackages={
                page?.related?.packages || []
              }
              variant="grid"
            />


            <DestinationFAQ
              id="faq"
              faqs={details.faqs}
            />


            <Gallery
              id="gallery"
              gallery={details.gallery}
              fallbackImage={city.image}
              cityName={city.name}
            />

          </div>


          {/* ===============================================
              SIDEBAR
          =============================================== */}

          <aside className="space-y-6 lg:sticky lg:top-24">

            <TravelEssentials
              cityName={city.name}
              travelTips={country.travelTips}
            />


            {page?.related?.packages?.length ? (
              <RelatedPackages
                cityName={city.name}
                relatedPackages={
                  page.related.packages
                }
                variant="compact"
              />
            ) : null}


            {hasSilo ? (
              <RelatedSilo
                related={
                  page?.related || {}
                }
              />
            ) : null}


            <SidebarCTA
              cityName={city.name}
            />

          </aside>

        </div>


        {/* =================================================
            BOTTOM CTA
        ================================================= */}

        <section className="mt-12 overflow-hidden rounded-[32px] bg-[#071f3f] shadow-[0_25px_80px_rgba(7,31,63,0.18)]">

          <div className="relative px-6 py-10 sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-between lg:px-14">

            <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-accent-400/10 blur-3xl" />

            <div className="relative max-w-2xl">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-accent-200">
                Your journey starts here
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Explore {city.name} with Bablons
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
                Discover curated tour packages, comfortable stays, airport transfers and personalized travel support for your next trip.
              </p>
            </div>


            <div className="relative mt-7 flex flex-col gap-3 sm:flex-row lg:mt-0">

              <Link
                to={`${ROUTES.PACKAGES}?destination=${encodeURIComponent(city.name)}`}
                className="
                  inline-flex min-h-12
                  items-center justify-center gap-2
                  rounded-full
                  bg-accent-500
                  px-6
                  text-sm font-black text-white
                  transition hover:bg-accent-600
                "
              >
                View {city.name} Packages
                <FaArrowRight className="text-xs" />
              </Link>


              <a
                href={COMPANY_CONTACT.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="
                  inline-flex min-h-12
                  items-center justify-center gap-2
                  rounded-full
                  border border-white/15
                  bg-white/5
                  px-6
                  text-sm font-bold text-white
                  transition hover:bg-white hover:text-[#071f3f]
                "
              >
                <FaWhatsapp />
                WhatsApp Us
              </a>

            </div>

          </div>

        </section>


        {/* =================================================
            TRUST STRIP
        ================================================= */}

        <div className="mt-6 grid gap-3 sm:grid-cols-3">

          {[
            [
              FaShieldAlt,
              'Trusted Travel Support',
            ],
            [
              FaHeadset,
              'Personalized Assistance',
            ],
            [
              FaPhoneAlt,
              'Easy Travel Consultation',
            ],
          ].map(([Icon, label]) => (
            <div
              key={label}
              className="
                flex items-center justify-center gap-3
                rounded-2xl border border-sand-200
                bg-white px-4 py-4
                text-center
              "
            >
              <Icon className="text-accent-600" />

              <span className="text-xs font-bold text-dark-700">
                {label}
              </span>
            </div>
          ))}

        </div>

      </div>

    </main>
  )
}

export default DestinationDetailsPage