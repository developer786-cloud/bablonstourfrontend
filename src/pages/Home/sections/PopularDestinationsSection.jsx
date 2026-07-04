import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaArrowLeft,
  FaArrowRight,
  FaBuilding,
  FaCity,
  FaGlobeAsia,
  FaGripHorizontal,
  FaHeadset,
  FaHeart,
  FaMapMarkerAlt,
  FaRegCompass,
  FaSuitcaseRolling,
  FaUniversity,
} from 'react-icons/fa'
import { ROUTES } from '../../../constants/routes'
import { destinationService } from '../../../services/destinationService'
import dubaiCountryImage from '../../../assets/images/Dubai For Country.webp'
import georgiaCountryImage from '../../../assets/images/Georgia For Country.webp'
import thailandCountryImage from '../../../assets/images/Thailand For Country.webp'
import uzbekistanCountryImage from '../../../assets/images/UzbekIstan For Country.webp'

const countryHeroImages = {
  'dubai-uae': { src: dubaiCountryImage, alt: 'Dubai skyline country destination' },
  dubai: { src: dubaiCountryImage, alt: 'Dubai skyline country destination' },
  georgia: { src: georgiaCountryImage, alt: 'Georgia mountain country destination' },
  thailand: { src: thailandCountryImage, alt: 'Thailand beach country destination' },
  uzbekistan: { src: uzbekistanCountryImage, alt: 'Uzbekistan heritage country destination' },
}

const fallbackCountries = [
  {
    slug: 'dubai-uae',
    name: 'Dubai / UAE',
    region: 'UAE',
    tagline: 'Futuristic skylines, luxury shopping, desert safaris, and endless adventures.',
    heroImage: {
      src: dubaiCountryImage,
      alt: 'Dubai skyline country destination',
    },
    cities: [
      {
        slug: 'dubai',
        name: 'Dubai',
        price: '25,999',
        image: {
          src: 'https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&w=900&q=82',
          alt: 'Burj Khalifa and downtown Dubai',
        },
      },
      {
        slug: 'abu-dhabi',
        name: 'Abu Dhabi',
        price: '31,999',
        image: {
          src: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=900&q=82',
          alt: 'Sheikh Zayed Grand Mosque in Abu Dhabi',
        },
      },
      {
        slug: 'sharjah',
        name: 'Sharjah',
        price: '22,999',
        image: {
          src: 'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=900&q=82',
          alt: 'Traditional UAE waterfront architecture',
        },
      },
    ],
  },
  {
    slug: 'georgia',
    name: 'Georgia',
    region: 'Europe',
    tagline: 'Mountains, culture, old towns, wine routes, and warm hospitality.',
    heroImage: {
      src: georgiaCountryImage,
      alt: 'Georgia mountain country destination',
    },
    cities: [
      {
        slug: 'tbilisi',
        name: 'Tbilisi',
        price: '38,999',
        image: {
          src: 'https://images.unsplash.com/photo-1563284223-333497472e88?auto=format&fit=crop&w=900&q=82',
          alt: 'Tbilisi old town and river',
        },
      },
      {
        slug: 'batumi',
        name: 'Batumi',
        price: '34,999',
        image: {
          src: 'https://images.unsplash.com/photo-1569930784237-ea65a2f40a83?auto=format&fit=crop&w=900&q=82',
          alt: 'Batumi seaside skyline',
        },
      },
      {
        slug: 'kazbegi',
        name: 'Kazbegi',
        price: '41,999',
        image: {
          src: 'https://images.unsplash.com/photo-1560957123-e8e019c66980?auto=format&fit=crop&w=900&q=82',
          alt: 'Kazbegi mountain landscape',
        },
      },
    ],
  },
  {
    slug: 'thailand',
    name: 'Thailand',
    region: 'Asia',
    tagline: 'Beautiful beaches, vibrant nightlife, temples, islands, and rich traditions.',
    heroImage: {
      src: thailandCountryImage,
      alt: 'Thailand beach country destination',
    },
    cities: [
      {
        slug: 'bangkok',
        name: 'Bangkok',
        price: '22,999',
        image: {
          src: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=82',
          alt: 'Bangkok city and temple view',
        },
      },
      {
        slug: 'phuket',
        name: 'Phuket',
        price: '24,999',
        image: {
          src: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=900&q=82',
          alt: 'Clear water beach in Phuket',
        },
      },
      {
        slug: 'pattaya',
        name: 'Pattaya',
        price: '21,999',
        image: {
          src: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=900&q=82',
          alt: 'Thailand coastal city view',
        },
      },
    ],
  },
  {
    slug: 'uzbekistan',
    name: 'Uzbekistan',
    region: 'Central Asia',
    tagline: 'Timeless cities, ancient history, blue domes, and stunning architecture.',
    heroImage: {
      src: uzbekistanCountryImage,
      alt: 'Uzbekistan heritage country destination',
    },
    cities: [
      {
        slug: 'samarkand',
        name: 'Samarkand',
        price: '35,999',
        image: {
          src: 'https://images.unsplash.com/photo-1609153865708-296c841d51c8?auto=format&fit=crop&w=900&q=82',
          alt: 'Samarkand historic mosque details',
        },
      },
      {
        slug: 'tashkent',
        name: 'Tashkent',
        price: '32,999',
        image: {
          src: 'https://images.unsplash.com/photo-1599407384144-31d9f8fb8e2d?auto=format&fit=crop&w=900&q=82',
          alt: 'Tashkent city architecture',
        },
      },
      {
        slug: 'bukhara',
        name: 'Bukhara',
        price: '36,999',
        image: {
          src: 'https://images.unsplash.com/photo-1598969896153-5f3622762b11?auto=format&fit=crop&w=900&q=82',
          alt: 'Bukhara old city in Uzbekistan',
        },
      },
    ],
  },
]

const categoryFilters = [
  { label: 'All Destinations', icon: FaGripHorizontal, active: true },
  { label: 'Asia', icon: FaGlobeAsia },
  { label: 'Europe', icon: FaUniversity },
  { label: 'Middle East', icon: FaBuilding },
  { label: 'Central Asia', icon: FaRegCompass },
]

const normalizeImage = (image, fallbackAlt) => ({
  src: image?.src || image?.url || '',
  alt: image?.alt || fallbackAlt,
})

const normalizeCountries = (countries = []) =>
  countries
    .map((country) => {
      const countryName = country.name || country.country
      const heroImage = normalizeImage(country.heroImage, countryName)

      return {
        ...country,
        slug: country.slug || country.countrySlug,
        name: countryName,
        region: country.region || country.continent || country.category || 'Featured',
        tagline: country.tagline || country.shortDescription || `Explore ${countryName}'s most requested travel experiences.`,
        heroImage,
        cities: (country.cities || [])
          .map((city) => {
            const cityImage = normalizeImage(city.image || city.heroImage, city.name)

            return {
              ...city,
              slug: city.slug,
              name: city.name,
              price: city.price || city.startingPrice || city.fromPrice,
              image: cityImage.src ? cityImage : heroImage,
            }
          })
          .filter((city) => city.slug && city.name && city.image?.src),
      }
    })
    .filter((country) => country.slug && country.name && country.heroImage?.src && country.cities.length)

const getDisplayName = (name = '') => name.replace('Dubai / ', '')

const getCountryHeroImage = (country) => {
  const slugKey = country.slug?.toLowerCase()
  const nameKey = getDisplayName(country.name).toLowerCase()

  return countryHeroImages[slugKey] || countryHeroImages[nameKey] || country.heroImage
}

const SectionIntroCard = ({ icon: Icon, title, description, ctaLabel, to }) => (
  <aside className="flex min-h-[16rem] flex-col justify-between rounded-2xl bg-white/80 p-5 sm:p-6">
    <div>
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-50 text-secondary-600 ring-1 ring-secondary-100">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-8 font-display text-2xl font-bold leading-tight text-dark-900">{title}</h3>
      <p className="mt-3 max-w-[14rem] text-sm leading-6 text-dark-500">{description}</p>
    </div>
    <Link
      to={to}
      className="mt-7 inline-flex min-h-11 w-fit items-center justify-center gap-3 rounded-full border border-sand-300 bg-white px-5 text-xs font-extrabold text-dark-900 shadow-sm transition hover:border-primary-900 hover:bg-primary-900 hover:text-white"
    >
      {ctaLabel}
      <FaArrowRight className="h-3 w-3" />
    </Link>
  </aside>
)

const CountryCard = ({ country }) => (
  <Link
    to={`${ROUTES.DESTINATIONS}#${country.slug}`}
    className="group relative min-h-[24rem] overflow-hidden rounded-2xl bg-[#EAF5F8] shadow-[0_24px_58px_rgba(16,39,36,0.18)] sm:min-h-[27rem] xl:min-h-[29rem]"
  >
    <img
      src={country.heroImage.src}
      alt={country.heroImage.alt}
      className="absolute inset-0 h-full w-full object-contain object-center"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/18 to-transparent" />
    <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[0.68rem] font-extrabold text-dark-900 shadow-sm">
      {country.cities.length} Cities
    </span>
    <span className="absolute bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white text-secondary-600 shadow-lg transition group-hover:bg-secondary-600 group-hover:text-white">
      <FaArrowRight className="h-3.5 w-3.5" />
    </span>
    <div className="absolute inset-x-5 bottom-6 pr-16 text-white">
      <h3 className="font-display text-3xl font-bold leading-none sm:text-4xl">{getDisplayName(country.name)}</h3>
      <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-white/88">
        <FaMapMarkerAlt className="h-3 w-3" />
        {country.region}
      </p>
      <p className="mt-3 line-clamp-2 text-sm font-semibold leading-6 text-white/90 sm:text-base">{country.tagline}</p>
    </div>
  </Link>
)

const CityCard = ({ city, country, carousel = false }) => (
  <Link
    to={`/destinations/${country.slug}/${city.slug}`}
    className={`group relative min-h-[16.5rem] overflow-hidden rounded-2xl bg-dark-900 shadow-[0_18px_42px_rgba(16,39,36,0.15)] ${
      carousel ? 'w-[18rem] flex-none snap-start sm:w-[20rem] xl:w-[21rem]' : ''
    }`}
  >
    <img
      src={city.image.src}
      alt={city.image.alt}
      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/24 to-transparent" />
    <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/45 bg-white/10 text-white backdrop-blur transition group-hover:bg-white group-hover:text-secondary-600">
      <FaHeart className="h-3.5 w-3.5" />
    </span>
    <div className="absolute inset-x-4 bottom-4 text-white">
      <h3 className="font-display text-2xl font-bold leading-none">{city.name}</h3>
      <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-white/88">
        <FaMapMarkerAlt className="h-3 w-3" />
        {getDisplayName(country.name)}
      </p>
    </div>
  </Link>
)

const Metric = ({ icon: Icon, value, label, sublabel }) => (
  <div className="flex min-h-[6.5rem] items-center gap-5 border-b border-sand-200 px-5 py-5 last:border-b-0 sm:border-b-0 lg:border-l lg:first:border-l-0">
    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary-900 text-white shadow-[0_16px_34px_rgba(16,39,36,0.2)]">
      <Icon className="h-5 w-5" />
    </span>
    <div>
      <p className="text-2xl font-extrabold leading-none text-secondary-600">{value}</p>
      <p className="mt-1 text-sm font-extrabold leading-tight text-dark-900">{label}</p>
      <p className="mt-1 text-xs font-semibold text-dark-500">{sublabel}</p>
    </div>
  </div>
)

const PopularDestinationsSection = () => {
  const [backendCountries, setBackendCountries] = useState([])

  useEffect(() => {
    let mounted = true

    destinationService.groups({ active: true })
      .then((data) => {
        if (!mounted) return
        setBackendCountries(normalizeCountries(data.countries || data.destinations || data.items || []))
      })
      .catch(() => {
        if (mounted) setBackendCountries([])
      })

    return () => {
      mounted = false
    }
  }, [])

  const countries = useMemo(() => {
    const liveCountries = backendCountries.slice(0, 4)
    const selectedCountries = liveCountries.length >= 4 ? liveCountries : fallbackCountries

    return selectedCountries.map((country) => ({
      ...country,
      heroImage: getCountryHeroImage(country),
    }))
  }, [backendCountries])

  const cityItems = useMemo(
    () =>
      countries.flatMap((country) => country.cities.map((city) => ({ city, country }))),
    [countries],
  )
  const cityRailRef = useRef(null)
  const cityCount = countries.reduce((total, country) => total + country.cities.length, 0)
  const scrollCities = (direction) => {
    cityRailRef.current?.scrollBy({
      left: direction * 320,
      behavior: 'smooth',
    })
  }

  return (
    <section className="section-shell bg-[#FFFCF7]">
      <div className="mx-auto w-full max-w-[1680px] px-3 sm:px-5 lg:px-7 2xl:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.16em] text-secondary-600">
            <span className="h-px w-10 bg-secondary-400" />
            Explore the world
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] text-dark-900 md:text-5xl lg:text-6xl">
            Explore Popular <span className="text-secondary-600">Destinations</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-dark-500 sm:text-lg">
            From iconic cities to hidden gems, discover handpicked places and start planning your next unforgettable journey.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {categoryFilters.map((category) => {
            const Icon = category.icon

            return (
              <button
                key={category.label}
                type="button"
                className={`inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full border px-5 text-xs font-extrabold shadow-sm transition hover:-translate-y-0.5 ${
                  category.active
                    ? 'border-primary-900 bg-primary-900 text-white shadow-[0_14px_30px_rgba(16,39,36,0.18)]'
                    : 'border-sand-200 bg-white text-dark-800 hover:border-secondary-200 hover:bg-secondary-50 hover:text-secondary-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                {category.label}
              </button>
            )
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-sand-200 bg-white/70 p-3 shadow-[0_20px_60px_rgba(16,39,36,0.08)] backdrop-blur">
          <div className="grid gap-5 lg:grid-cols-[12rem_1fr] xl:grid-cols-[12.5rem_1fr]">
            <SectionIntroCard
              icon={FaGlobeAsia}
              title="Top Countries"
              description="Handpicked countries for unforgettable experiences."
              ctaLabel="View All Countries"
              to={ROUTES.DESTINATIONS}
            />
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4 2xl:gap-6">
              {countries.map((country) => (
                <CountryCard key={country.slug} country={country} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-sand-200 bg-white/70 p-3 shadow-[0_20px_60px_rgba(16,39,36,0.08)] backdrop-blur">
          <div className="grid gap-5 lg:grid-cols-[12rem_1fr] xl:grid-cols-[12.5rem_1fr]">
            <SectionIntroCard
              icon={FaCity}
              title="Popular Cities"
              description="Explore the world's most loved cities."
              ctaLabel={`View All Cities (${cityCount}+)`}
              to={ROUTES.DESTINATIONS}
            />
            <div className="min-w-0 self-center">
              <div
                ref={cityRailRef}
                className="snap-x overflow-x-auto scroll-smooth py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                <div className="flex gap-4">
                  {cityItems.map(({ city, country }, index) => (
                    <CityCard
                      key={`${country.slug}-${city.slug}-${index}`}
                      city={city}
                      country={country}
                      carousel
                    />
                  ))}
                </div>
              </div>
              <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
                <p className="flex items-center justify-center gap-2 text-sm font-semibold text-dark-600">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary-50 text-secondary-600">
                    <FaRegCompass className="h-3.5 w-3.5" />
                  </span>
                  <span className="font-extrabold text-secondary-600">{cityCount}+ Cities</span>
                  Across {countries.length} Amazing Countries
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Previous cities"
                    onClick={() => scrollCities(-1)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-sand-200 bg-white text-dark-700 shadow-sm transition hover:bg-primary-900 hover:text-white"
                  >
                    <FaArrowLeft className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next cities"
                    onClick={() => scrollCities(1)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-sand-200 bg-white text-secondary-600 shadow-sm transition hover:bg-secondary-600 hover:text-white"
                  >
                    <FaArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-[0_20px_60px_rgba(16,39,36,0.08)] sm:grid-cols-2 lg:grid-cols-4">
          <Metric icon={FaGlobeAsia} value={countries.length} label="Countries" sublabel="Across the world" />
          <Metric icon={FaCity} value={`${cityCount}+`} label="Cities" sublabel="Handpicked for you" />
          <Metric icon={FaSuitcaseRolling} value="1000+" label="Tour Packages" sublabel="For every travel style" />
          <Metric icon={FaHeadset} value="24/7" label="Travel Support" sublabel="We're here for you" />
        </div>
      </div>
    </section>
  )
}
console.log(normalizeImage);
export default PopularDestinationsSection
