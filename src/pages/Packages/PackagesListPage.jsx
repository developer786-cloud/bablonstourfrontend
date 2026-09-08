import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import { FaArrowLeft, FaArrowRight, FaGlobeAsia, FaPaperPlane, FaPlane } from 'react-icons/fa'
import PackageGrid from '../../components/package/PackageGrid'
import PackageSearch from '../../components/package/PackageSearch'
import ErrorState from '../../components/common/ErrorState'
import LoadingSkeleton from '../../components/common/LoadingSkeleton'
import { packageService } from '../../services/packageService'
import { getPackageImages } from '../../components/package/packageViewUtils'
import packageHeroBg from '../../assets/images/Hero Section Bg 5.jpg'
import ContactCTA from '../Home/sections/ContactCTASection'

const defaultFilters = { destination: '', country: '', travelStyle: '', budget: '', duration: '', departureDate: '', featuredOnly: false }

const getPackagePrice = (travelPackage) => Number(travelPackage.pricing?.pricePerPerson || travelPackage.pricing?.basePrice || 0)
const getPackageCountry = (travelPackage) => travelPackage.country?.name || travelPackage.destination?.country || ''
const getDepartureDate = (departure) => departure?.departureDate || departure?.startDate || ''

const matchesBudget = (price, budget) => {
  if (!budget) return true
  if (budget.endsWith('+')) return price >= Number(budget.slice(0, -1))
  if (budget.includes('-')) {
    const [minimum, maximum] = budget.split('-').map(Number)
    return price >= minimum && price <= maximum
  }
  return price <= Number(budget)
}

const PackagesListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState(() => ({
    ...defaultFilters,
    ...Object.fromEntries(Object.keys(defaultFilters).map((key) => [key, searchParams.get(key) || defaultFilters[key]])),
    featuredOnly: searchParams.get('featuredOnly') === 'true',
  }))
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [visibleCount, setVisibleCount] = useState(8)
  const countryRailRef = useRef(null)

  const countryOptions = useMemo(() => [...new Set(packages.map(getPackageCountry).filter(Boolean))].sort(), [packages])
  const packageTypeOptions = useMemo(() => [...new Set(packages.map((travelPackage) => travelPackage.packageType).filter(Boolean))].sort(), [packages])
  const countrySummaries = useMemo(() => {
    const groupedCountries = packages.reduce((countries, travelPackage) => {
      const name = getPackageCountry(travelPackage).trim()
      if (!name) return countries

      const key = name.toLowerCase()
      const current = countries[key] || { name, packages: [], featuredCount: 0 }
      current.packages.push(travelPackage)
      current.featuredCount += travelPackage.featured ? 1 : 0
      countries[key] = current
      return countries
    }, {})

    return Object.values(groupedCountries)
      .map((country) => ({
        ...country,
        image: getPackageImages(country.packages.find((travelPackage) => getPackageImages(travelPackage).length > 0) || country.packages[0])[0]?.url || packageHeroBg,
        lowestPrice: Math.min(...country.packages.map(getPackagePrice)),
      }))
      .sort((first, second) => second.featuredCount - first.featuredCount || second.packages.length - first.packages.length)
  }, [packages])

  useEffect(() => {
    packageService.list({ limit: 100 })
      .then((data) => setPackages(data.packages || data.items || []))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load packages'))
      .finally(() => setLoading(false))
  }, [])

  const filteredPackages = useMemo(() => {
    const filtered = packages.filter((travelPackage) => {
      const destination = [
        travelPackage.destination?.name,
        travelPackage.destination?.country,
        travelPackage.country?.name,
        ...(travelPackage.cities || []),
      ].filter(Boolean).join(' ')
      const country = getPackageCountry(travelPackage)
      const price = getPackagePrice(travelPackage)
      const days = travelPackage.duration?.days || 0
      const matchesDestination = destination.toLowerCase().includes(filters.destination.toLowerCase())
      const matchesCountry = filters.country ? country.toLowerCase() === filters.country.toLowerCase() : true
      const matchesTravelStyle = filters.travelStyle ? travelPackage.packageType === filters.travelStyle : true
      const matchesPrice = matchesBudget(price, filters.budget)
      const matchesDuration = filters.duration ? days <= Number(filters.duration) : true
      const matchesDeparture = filters.departureDate
        ? (travelPackage.departures || []).some((departure) => getDepartureDate(departure).slice(0, 10) === filters.departureDate)
        : true
      const matchesFeatured = filters.featuredOnly ? travelPackage.featured : true

      return matchesDestination && matchesCountry && matchesTravelStyle && matchesPrice && matchesDuration && matchesDeparture && matchesFeatured
    })

    return [...filtered].sort((first, second) => {
      if (sortBy === 'price_low') return getPackagePrice(first) - getPackagePrice(second)
      if (sortBy === 'price_high') return getPackagePrice(second) - getPackagePrice(first)
      if (sortBy === 'newest') return new Date(second.createdAt || 0) - new Date(first.createdAt || 0)
      return Number(second.featured || 0) - Number(first.featured || 0)
    })
  }, [filters, packages, sortBy])

  const visiblePackages = filteredPackages.slice(0, visibleCount)

  const handleFilterChange = (nextFilters) => {
    setFilters(nextFilters)
    setVisibleCount(8)
    const nextParams = new URLSearchParams()
    Object.entries(nextFilters).forEach(([key, value]) => {
      if (value && value !== false) nextParams.set(key, String(value))
    })
    setSearchParams(nextParams, { replace: true })
  }

  const handleReset = () => handleFilterChange(defaultFilters)
  const activeFilterCount = Object.values(filters).filter(Boolean).length

  const handleCountrySelect = (country) => {
    handleFilterChange({ ...filters, country })
    window.requestAnimationFrame(() => document.getElementById('package-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <div className="bg-[#fbf7ef]">
      <section className="relative isolate overflow-hidden px-4 pb-16 pt-14 text-dark-900 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-24">
        <img src={packageHeroBg} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fbf3e8]/96 via-[#fbf3e8]/78 to-[#fbf3e8]/18" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fbf7ef] via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="mb-6 inline-flex max-w-full flex-wrap items-center gap-3 text-sm font-display-label text-secondary-500">
              <span className="h-px w-7 bg-secondary-300" />
              Explore The World
              <FaPlane className="text-dark-700" />
            </p>
            <h1 className="max-w-[20rem] font-display text-[clamp(2.15rem,10vw,4.6rem)] font-bold leading-[1.05] text-[#071b34] sm:max-w-2xl md:text-7xl">
              Our Best Travel Packages
            </h1>
            <p className="mt-4 max-w-[20rem] text-sm leading-7 text-dark-600 sm:mt-6 sm:max-w-xl sm:text-base sm:leading-8">
              Handpicked travel experiences for every kind of traveler. Adventure, comfort, memories - all in one place.
            </p>
            <nav className="mt-6 flex items-center gap-3 text-sm font-bold text-dark-600 sm:mt-8" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-secondary-600">Home</Link>
              <FaArrowRight className="h-3 w-3 text-dark-400" />
              <span className="text-dark-900">Packages</span>
            </nav>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-10 max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <PackageSearch filters={filters} countryOptions={countryOptions} packageTypeOptions={packageTypeOptions} onChange={handleFilterChange} onReset={handleReset} onSubmit={handleSubmit} />
        {!loading && !error && countrySummaries.length ? (
          <section className="mt-12" aria-labelledby="country-packages-heading">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-secondary-500"><FaGlobeAsia /> Explore by country</p>
                <h2 id="country-packages-heading" className="mt-2 font-display text-3xl font-bold text-[#071b34] sm:text-4xl">Find your perfect country</h2>
              </div>
              <div className="flex items-center gap-3">
                <p className="hidden max-w-sm text-sm leading-6 text-dark-500 lg:block">Choose a country to see its best available packages, sorted with featured trips first.</p>
                <div className="hidden shrink-0 gap-2 sm:flex">
                  <button type="button" onClick={() => countryRailRef.current?.scrollBy({ left: -360, behavior: 'smooth' })} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sand-300 bg-white text-dark-700 transition hover:border-secondary-400 hover:bg-secondary-50 hover:text-secondary-600" aria-label="Show previous countries">
                    <FaArrowLeft className="h-3.5 w-3.5" />
                  </button>
                  <button type="button" onClick={() => countryRailRef.current?.scrollBy({ left: 360, behavior: 'smooth' })} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sand-300 bg-white text-dark-700 transition hover:border-secondary-400 hover:bg-secondary-50 hover:text-secondary-600" aria-label="Show more countries">
                    <FaArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
            <div ref={countryRailRef} className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-color:#d96f3a_transparent] [scrollbar-width:thin]">
              {countrySummaries.map((country) => {
                const isSelected = filters.country.toLowerCase() === country.name.toLowerCase()

                return (
                  <button
                    key={country.name}
                    type="button"
                    onClick={() => handleCountrySelect(country.name)}
                    aria-pressed={isSelected}
                    className={`group relative min-h-[15rem] w-[min(82vw,20rem)] flex-none snap-start overflow-hidden rounded-2xl text-left shadow-[0_18px_48px_rgba(16,39,36,0.14)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_62px_rgba(16,39,36,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary-500 sm:w-[20rem] xl:w-[22rem] ${isSelected ? 'ring-4 ring-secondary-400 ring-offset-2' : ''}`}
                  >
                    <img src={country.image} alt={`${country.name} travel packages`} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[0.66rem] font-black uppercase tracking-[0.1em] text-dark-800">{country.packages.length} packages</span>
                    <div className="absolute inset-x-4 bottom-4 text-white">
                      <h3 className="font-display text-2xl font-bold">{country.name}</h3>
                      <p className="mt-1 text-sm font-semibold text-white/80">From {country.lowestPrice.toLocaleString('en-IN')} per person</p>
                      <span className="mt-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.08em] text-secondary-200">View packages <FaArrowRight className="h-3 w-3 transition group-hover:translate-x-1" /></span>
                    </div>
                  </button>
                )
              })}
            </div>
          </section>
        ) : null}
        <div id="package-results" className="mt-12 scroll-mt-8">
          <div className="mb-8 text-center">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-secondary-500">Handpicked experiences</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-[#071b34]">Trending Tour Packages</h2>
            <div className="mt-4 flex items-center justify-center gap-3 text-secondary-500">
              <span className="h-px w-8 bg-secondary-300" />
              <FaPlane className="text-[#071b34]" />
              <span className="h-px w-8 bg-secondary-300" />
            </div>
          </div>

          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm font-bold text-dark-500">{filteredPackages.length} package{filteredPackages.length === 1 ? '' : 's'} found</p>
              {activeFilterCount ? <button type="button" onClick={handleReset} className="text-xs font-black uppercase tracking-[0.1em] text-secondary-600 hover:text-secondary-700">Clear {activeFilterCount} filter{activeFilterCount === 1 ? '' : 's'}</button> : null}
            </div>
            <div className="grid w-full grid-cols-1 gap-3 sm:w-auto sm:grid-cols-2">
              <label className="flex min-w-0 items-center gap-2 text-sm font-semibold text-dark-600">
                Show:
                <select value={visibleCount} onChange={(event) => setVisibleCount(Number(event.target.value))} className="min-w-0 flex-1 rounded-lg border border-sand-300 bg-white px-3 py-2 text-dark-800">
                  <option value="8">8</option>
                  <option value="12">12</option>
                  <option value="16">16</option>
                </select>
              </label>
              <label className="flex min-w-0 items-center gap-2 text-sm font-semibold text-dark-600">
                Sort by:
                <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="min-w-0 flex-1 rounded-lg border border-sand-300 bg-white px-3 py-2 text-dark-800">
                  <option value="popular">Popular</option>
                  <option value="newest">Newest</option>
                  <option value="price_low">Price low</option>
                  <option value="price_high">Price high</option>
                </select>
              </label>
            </div>
          </div>
          {loading ? <LoadingSkeleton lines={6} /> : null}
          {!loading && error ? <ErrorState title="Packages unavailable" description={error} /> : null}
          {!loading && !error ? <PackageGrid packages={visiblePackages} /> : null}
          {!loading && !error && visibleCount < filteredPackages.length ? (
            <div className="mt-10 text-center">
              <button type="button" onClick={() => setVisibleCount((count) => count + 4)} className="rounded-xl border border-[#071b34] bg-white px-10 py-3 text-sm font-black text-[#071b34] transition hover:bg-[#071b34] hover:text-white">
                Load More Packages
              </button>
            </div>
          ) : null}
        </div>

        <section className="mt-16 rounded-card-sm bg-[#061936] p-6 text-white shadow-elevated md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_520px] lg:items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-white/40 bg-white/8 text-2xl sm:h-20 sm:w-20 sm:text-3xl">
                <FaPaperPlane />
              </span>
              <div>
                <h2 className="font-display text-3xl font-bold">Get Exclusive Travel Deals</h2>
                <p className="mt-2 max-w-md text-white/72">Subscribe to get best offers, travel tips and exclusive holiday packages.</p>
              </div>
            </div>
            <form className="flex flex-col gap-3 sm:flex-row">
              <input type="email" placeholder="Enter your email address" className="h-14 min-w-0 flex-1 rounded-xl border border-white/10 bg-white px-5 font-semibold text-dark-900 outline-none" />
              <button className="h-14 rounded-xl bg-secondary-500 px-7 text-sm font-black text-white transition hover:bg-secondary-600">
                Subscribe Now
              </button>
            </form>
          </div>
        </section>
      </section>
      <ContactCTA />
    </div>
  )
}

export default PackagesListPage
