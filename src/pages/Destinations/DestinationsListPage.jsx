import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaChevronDown, FaGlobeAsia, FaHeadset, FaMapMarkerAlt, FaRegStar, FaSearch, FaShieldAlt } from 'react-icons/fa'
import Button from '../../components/common/Button/Button'
import { ROUTES } from '../../constants/routes'
import herobg from '../../assets/images/Destinastion page bg.webp'
import CountrySection from './sections/CountrySection'
import { destinationService } from '../../services/destinationService'
import ContactCTA from '../Home/sections/ContactCTASection'


const normalizeImage = (image, fallbackAlt) => ({
  src: image?.src || image?.url || '',
  alt: image?.alt || fallbackAlt,
})

const fallbackImage = (alt = 'Travel destination') => ({
  src: herobg,
  alt,
})

const normalizeCountries = (countries = []) =>
  countries
    .map((country) => {
      const countryName = country.name || country.country
      const heroImage = normalizeImage(country.heroImage, countryName)
      const fallbackHero = heroImage.src ? heroImage : fallbackImage(countryName)

      return {
        ...country,
        slug: country.slug || country.countrySlug,
        name: countryName,
        tagline: country.tagline || country.shortDescription || `Explore ${countryName}'s most requested travel experiences.`,
        heroImage: fallbackHero,
        cities: (country.cities || [])
          .map((city) => {
            const cityImage = normalizeImage(city.image || city.heroImage, city.name)

            return {
              ...city,
              slug: city.slug,
              name: city.name,
              image: cityImage.src ? cityImage : fallbackHero,
            }
          })
          .filter((city) => city.slug && city.name),
        travelTips: country.travelTips || {},
      }
    })
    .filter((country) => country.slug && country.name)

const getDisplayName = (name = '') => name.replace('Dubai / ', '')

const heroFeatures = [
  { title: 'Best Price Guarantee', description: 'We ensure the best prices', icon: FaShieldAlt },
  { title: 'Handpicked Destinations', description: 'Curated just for you', icon: FaRegStar },
  { title: '24/7 Support', description: 'We are always here', icon: FaHeadset },
  { title: 'Memorable Experiences', description: 'Make memories for life', icon: FaGlobeAsia },
]

/**
 * Replaces the previous 6-country generic-card version of this page
 * (Uzbekistan, Georgia, Azerbaijan, Turkey, Thailand, Dubai — one card
 * each, all linking to the same /packages route with no destination
 * filter). That version couldn't represent individual cities at all.
 *
 * This version: 4 countries (Dubai/UAE, Thailand, Uzbekistan, Georgia —
 * Azerbaijan and Turkey dropped per direction), each showing its full
 * city list. Every city is its own clickable card linking to
 * /destinations/{country-slug}/{city-slug} — see CityCard.jsx.
 *
 * Export name kept as DestinationsListPage so existing route
 * definitions / imports elsewhere in the app don't need to change.
 */
const DestinationsListPage = () => {
  const [backendCountries, setBackendCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCountry, setActiveCountry] = useState('all')

  useEffect(() => {
    let mounted = true

    destinationService.groups({ active: true })
      .then((data) => {
        if (!mounted) return
        setBackendCountries(normalizeCountries(data.countries || data.destinations || data.items || []))
        setError('')
      })
      .catch((err) => {
        if (!mounted) return
        setError(err.response?.data?.message || 'Live destinations are unavailable right now.')
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  const countries = useMemo(() => backendCountries, [backendCountries])
  const cityCount = countries.reduce((sum, country) => sum + country.cities.length, 0)
  const countryNames = countries.length ? countries.map((country) => country.name).join(', ') : 'your backend destinations'
  const filteredCountries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return countries
      .filter((country) => activeCountry === 'all' || country.slug === activeCountry)
      .map((country) => {
        if (!query) return country

        const countryMatch = country.name.toLowerCase().includes(query)
        const cities = countryMatch
          ? country.cities
          : country.cities.filter((city) => city.name.toLowerCase().includes(query))

        return { ...country, cities }
      })
      .filter((country) => country.cities.length || country.name.toLowerCase().includes(query))
  }, [activeCountry, countries, searchQuery])
  return (
    <div className="w-full overflow-hidden bg-[#F8FAFC] text-dark-900">
      <section className="relative overflow-hidden bg-dark-900 text-dark-900 shadow-[0_28px_90px_rgba(16,39,36,0.16)]">
          <img
            src={herobg}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/10 to-white/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-white/5" />

        <div className="relative mx-auto grid min-h-[520px] w-full max-w-[1500px] gap-8 px-3 py-10 sm:px-4 sm:py-12 lg:grid-cols-[minmax(0,1fr)_350px] lg:items-center lg:px-6 lg:py-14 xl:grid-cols-[minmax(0,1fr)_390px] 2xl:px-8">
            <div>
              <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm font-extrabold text-dark-700">
                <Link to={ROUTES.HOME} className="transition hover:text-dark-950">Home</Link>
                <span className="text-dark-500">&gt;</span>
                <span className="text-dark-950">Destinations</span>
              </nav>

              <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.4rem,7vw,4.4rem)] font-bold leading-[1.02] text-dark-950">
                Explore Destinations Around the <span className="text-accent-700">World</span>
              </h1>

              <p className="mt-4 max-w-2xl text-base font-semibold leading-8 text-dark-800 sm:text-lg">
                Discover {cityCount} city experiences from your backend across {countryNames}. Choose your dream destination and start your journey with Bablons.
              </p>

              <div className="mt-6 grid gap-3 rounded-2xl bg-white p-3 text-dark-900 shadow-2xl shadow-black/20 sm:grid-cols-[minmax(0,1fr)_180px_140px] lg:max-w-3xl">
                <label className="flex min-h-12 items-center gap-3 rounded-xl bg-slate-50 px-4 focus-within:ring-2 focus-within:ring-primary-500">
                  <FaMapMarkerAlt className="h-4 w-4 shrink-0 text-dark-400" />
                  <input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search cities or destinations..."
                    className="w-full bg-transparent text-sm font-semibold text-dark-700 outline-none placeholder:text-dark-400"
                  />
                </label>

                <label className="relative flex min-h-12 items-center gap-3 rounded-xl bg-slate-50 px-4 focus-within:ring-2 focus-within:ring-primary-500">
                  <FaGlobeAsia className="h-4 w-4 shrink-0 text-dark-400" />
                  <select
                    value={activeCountry}
                    onChange={(event) => setActiveCountry(event.target.value)}
                    className="w-full appearance-none bg-transparent text-sm font-bold text-dark-700 outline-none"
                    aria-label="Filter by country"
                  >
                    <option value="all">All Countries</option>
                    {countries.map((country) => (
                      <option key={country.slug} value={country.slug}>{getDisplayName(country.name)}</option>
                    ))}
                  </select>
                  <FaChevronDown className="pointer-events-none absolute right-4 h-3 w-3 text-dark-400" />
                </label>

                <a href="#destination-countries" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent-500 px-5 text-sm font-extrabold text-white shadow-lg shadow-accent-500/25 transition hover:bg-accent-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500">
                  <FaSearch className="h-3.5 w-3.5" />
                  Search
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-white/70 bg-white/72 p-5 shadow-2xl shadow-black/15 backdrop-blur-md">
              {heroFeatures.map((feature, index) => {
                const Icon = feature.icon

                return (
                  <div key={feature.title} className={`flex items-center gap-4 ${index === 0 ? '' : 'border-t border-dark-900/10 pt-4'} ${index === heroFeatures.length - 1 ? '' : 'pb-4'}`}>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-dark-900/8 text-dark-800 ring-1 ring-dark-900/10">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-sm font-extrabold text-dark-950">{feature.title}</p>
                      <p className="mt-1 text-sm font-semibold text-dark-700">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
      </section>

      <section className="mx-auto w-full max-w-[1500px] px-3 py-9 sm:px-4 lg:px-6 lg:py-12 2xl:px-8">
        <div className="text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-accent-500">Top Countries</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-dark-900 sm:text-3xl">Choose a country to explore its beautiful cities</h2>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {countries.map((country) => (
            <a
              key={country.slug}
              href={`#${country.slug}`}
              className="group relative min-h-[250px] overflow-hidden rounded-2xl bg-dark-900 shadow-[0_18px_48px_rgba(15,23,42,0.14)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_62px_rgba(15,23,42,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500"
              onClick={() => setActiveCountry(country.slug)}
            >
              <img src={country.heroImage.src} alt={country.heroImage.alt} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/92 via-dark-900/22 to-transparent" />
              <div className="absolute inset-x-4 bottom-4">
                <span className="inline-flex rounded-full bg-white/92 px-3 py-1 text-[0.68rem] font-extrabold uppercase tracking-wide text-dark-700">
                  {country.cities.length} cities
                </span>
                <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-white">{getDisplayName(country.name)}</h3>
                <p className="mt-1 line-clamp-2 text-sm leading-5 text-white/82">{country.tagline}</p>
                <span className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-4 text-xs font-extrabold text-accent-600 shadow-sm">
                  Explore {getDisplayName(country.name)}
                  <FaArrowRight className="h-3 w-3" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <nav id="destination-countries" aria-label="Jump to country" className="mx-auto w-full max-w-[1500px] px-3 pb-4 sm:px-4 lg:px-6 2xl:px-8">
        <div className="mb-4 text-center">
          <h2 className="font-display text-2xl font-bold text-dark-900 sm:text-3xl">Explore Cities by Country</h2>
        </div>
        <div className="flex justify-center">
          <div className="flex max-w-full flex-wrap justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm sm:rounded-full">
            <button
              type="button"
              onClick={() => setActiveCountry('all')}
              className={`inline-flex min-h-10 shrink-0 items-center rounded-full px-5 text-xs font-extrabold transition ${activeCountry === 'all' ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/20' : 'text-dark-600 hover:bg-slate-50'}`}
            >
              All
            </button>
            {countries.map((country) => (
              <button
                key={country.slug}
                type="button"
                onClick={() => setActiveCountry(country.slug)}
                className={`inline-flex min-h-10 shrink-0 items-center rounded-full px-5 text-xs font-extrabold transition ${activeCountry === country.slug ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/20' : 'text-dark-600 hover:bg-slate-50'}`}
              >
                {getDisplayName(country.name)}
              </button>
          ))}
          </div>
        </div>
      </nav>

      <div className="mx-auto w-full max-w-[1500px] space-y-4 px-3 pb-6 pt-1 sm:px-4 lg:space-y-5 lg:px-6 lg:pb-8 2xl:px-8">
        {loading ? (
          <div className="mb-8 rounded-2xl border border-sand-200 bg-white p-4 text-center text-sm font-bold text-dark-500 shadow-sm">
            Loading latest destinations...
          </div>
        ) : null}
        {!loading && error && !backendCountries.length ? (
          <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-center text-sm font-bold text-amber-800">
            Backend destinations are unavailable right now. {error}
          </div>
        ) : null}
        {filteredCountries.map((country) => (
          <CountrySection
            key={country.slug}
            countrySlug={country.slug}
            name={country.name}
            tagline={country.tagline}
            heroImage={country.heroImage}
            cities={country.cities}
          />
        ))}
        {!loading && !filteredCountries.length ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="font-display text-2xl font-bold text-dark-900">No backend destination found</p>
            <p className="mt-2 text-sm text-dark-500">Add active city destinations from the admin panel to show them here.</p>
          </div>
        ) : null}
      </div>

      <section className="bg-white pb-14 pt-8 lg:pb-20 lg:pt-12">
        <div className="section-container">
          <div className="flex flex-col items-center gap-6 rounded-3xl bg-dark-900 px-5 py-8 text-center shadow-xl shadow-black/10 sm:flex-row sm:justify-between sm:text-left lg:px-10 lg:py-10">
            <div className="flex items-center gap-4 sm:max-w-2xl">
              <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-accent-300 sm:flex">
                <FaHeadset className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-white sm:text-2xl">Need help choosing?</h2>
                <p className="mt-1 text-sm leading-6 text-white/65">Our travel experts are here to help you plan the perfect trip.</p>
              </div>
            </div>
            <a href={ROUTES.CONTACT} className="w-full shrink-0 sm:w-auto">
              <Button size="lg" className="w-full rounded-full bg-white px-7 font-bold text-dark-900 hover:bg-sand-100 sm:w-auto">
                Talk to an expert
              </Button>
            </a>
          </div>
        </div>
        <br />

        <ContactCTA />
      </section>
    </div>
  )
}

export default DestinationsListPage
