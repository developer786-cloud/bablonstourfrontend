import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaPaperPlane, FaPlane } from 'react-icons/fa'
import PackageGrid from '../../components/package/PackageGrid'
import PackageSearch from '../../components/package/PackageSearch'
import ErrorState from '../../components/common/ErrorState'
import LoadingSkeleton from '../../components/common/LoadingSkeleton'
import { packageService } from '../../services/packageService'
import packageHeroBg from '../../assets/images/Hero Section Bg 5.jpg'
import ContactCTA from '../Home/sections/ContactCTASection'


const PackagesListPage = () => {
  const [filters, setFilters] = useState({ destination: '', travelStyle: '', budget: '', duration: '', departureDate: '' })
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [visibleCount, setVisibleCount] = useState(8)

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
      const price = travelPackage.pricing?.basePrice || travelPackage.pricing?.pricePerPerson || 0
      const days = travelPackage.duration?.days || 0
      const matchesDestination = destination.toLowerCase().includes(filters.destination.toLowerCase())
      const matchesTravelStyle = filters.travelStyle ? travelPackage.packageType === filters.travelStyle : true
      const matchesBudget = filters.budget ? price <= Number(filters.budget) : true
      const matchesDuration = filters.duration ? days <= Number(filters.duration) : true

      return matchesDestination && matchesTravelStyle && matchesBudget && matchesDuration
    })

    return [...filtered].sort((first, second) => {
      if (sortBy === 'price_low') return (first.pricing?.basePrice || first.pricing?.pricePerPerson || 0) - (second.pricing?.basePrice || second.pricing?.pricePerPerson || 0)
      if (sortBy === 'price_high') return (second.pricing?.basePrice || second.pricing?.pricePerPerson || 0) - (first.pricing?.basePrice || first.pricing?.pricePerPerson || 0)
      if (sortBy === 'newest') return new Date(second.createdAt || 0) - new Date(first.createdAt || 0)
      return Number(second.featured || 0) - Number(first.featured || 0)
    })
  }, [filters, packages, sortBy])

  const visiblePackages = filteredPackages.slice(0, visibleCount)

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <div className="bg-[#fbf7ef]">
      <section className="relative isolate overflow-hidden px-4 pb-24 pt-20 text-dark-900 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
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
            <h1 className="max-w-[20rem] font-display text-[clamp(2.35rem,10vw,4.6rem)] font-bold leading-[1.08] text-[#071b34] sm:max-w-2xl md:text-7xl">
              Our Best Travel Packages
            </h1>
            <p className="mt-6 max-w-[20rem] text-base leading-8 text-dark-600 sm:max-w-xl">
              Handpicked travel experiences for every kind of traveler. Adventure, comfort, memories - all in one place.
            </p>
            <nav className="mt-8 flex items-center gap-3 text-sm font-bold text-dark-600" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-secondary-600">Home</Link>
              <FaArrowRight className="h-3 w-3 text-dark-400" />
              <span className="text-dark-900">Packages</span>
            </nav>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-10 max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <PackageSearch filters={filters} onChange={setFilters} onSubmit={handleSubmit} />
        <div className="mt-12">
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
            <div>
              <p className="text-sm font-bold text-dark-500">{filteredPackages.length} package{filteredPackages.length === 1 ? '' : 's'} found</p>
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
