import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowRight, FaCalendarAlt, FaChevronDown, FaGlobeAsia, FaHeadset, FaMapMarkerAlt, FaSearch, FaThumbsUp, FaUserFriends, FaUsers, FaWallet } from 'react-icons/fa'
import { ROUTES } from '../../../constants/routes'

const stats = [
  { icon: FaUsers, value: '5000+', label: 'Happy Travellers' },
  { icon: FaGlobeAsia, value: '30+', label: 'Countries Covered' },
  { icon: FaThumbsUp, value: '98%', label: 'Client Satisfaction' },
  { icon: FaHeadset, value: '24/7', label: 'Travel Support' },
]

const SearchPackagesSection = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useState({ destination: '', month: '', budget: '', travelers: '2' })

  const handleSearch = (event) => {
    event.preventDefault()
    const params = new URLSearchParams()

    Object.entries(searchParams).forEach(([key, value]) => {
      const trimmedValue = value.trim()
      if (trimmedValue) params.set(key, trimmedValue)
    })

    const queryString = params.toString()
    navigate(queryString ? `${ROUTES.PACKAGES}?${queryString}` : ROUTES.PACKAGES)
  }

  return (
    <section className="relative z-30 -mt-28 px-4 pb-16 sm:px-6 lg:-mt-32 lg:px-8 lg:pb-24">
      <div className="mx-auto max-w-[88rem] overflow-hidden rounded-[2rem] border border-white/75 bg-white/95 shadow-[0_32px_90px_rgba(16,39,36,0.24)] backdrop-blur-xl">
        <div className="flex items-center justify-between gap-5 border-b border-sand-200/70 bg-[linear-gradient(105deg,#fffaf3_0%,#ffffff_52%,#eef6f2_100%)] px-6 py-3.5 sm:px-7">
          <div className="flex items-center gap-3">
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-secondary-500 text-[0.7rem] text-white shadow-[0_6px_14px_rgba(217,111,58,0.28)] after:absolute after:-inset-1 after:rounded-full after:border after:border-secondary-500/30">
              <FaSearch />
            </span>
            <div>
              <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-secondary-600">Your journey, designed around you</p>
              <p className="mt-0.5 text-sm font-bold text-dark-900">Start planning your next escape</p>
            </div>
          </div>
          <span className="hidden rounded-full border border-dark-900/10 bg-white/75 px-4 py-2 text-[0.68rem] font-extrabold uppercase tracking-[0.08em] text-dark-700 sm:inline-flex">Personalised in minutes</span>
        </div>
        <form onSubmit={handleSearch} className="grid gap-0 border-b border-sand-200/80 lg:grid-cols-[1.15fr_1fr_0.95fr_1fr_auto]">
          <label className="group flex min-h-[7.25rem] items-center gap-4 border-b border-sand-200/80 px-6 py-5 transition-colors hover:bg-[#fffaf4] focus-within:bg-[#fffaf4] sm:px-7 lg:border-b-0 lg:border-r">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary-500/10 text-secondary-600 transition group-focus-within:bg-secondary-500 group-focus-within:text-white">
              <FaMapMarkerAlt className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[0.68rem] font-extrabold uppercase tracking-[0.1em] text-dark-700">Where to?</span>
              <input
                type="text"
                placeholder="Any Destination"
                value={searchParams.destination}
                onChange={(event) => setSearchParams({ ...searchParams, destination: event.target.value })}
                className="mt-1 w-full bg-transparent text-base font-bold text-dark-900 outline-none placeholder:text-dark-500"
              />
            </span>
            <FaChevronDown className="h-3 w-3 shrink-0 text-dark-500 transition group-focus-within:rotate-180" />
          </label>

          <label className="group flex min-h-[7.25rem] items-center gap-4 border-b border-sand-200/80 px-6 py-5 transition-colors hover:bg-[#fffaf4] focus-within:bg-[#fffaf4] sm:px-7 lg:border-b-0 lg:border-r">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary-500/10 text-secondary-600 transition group-focus-within:bg-secondary-500 group-focus-within:text-white">
              <FaCalendarAlt className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[0.68rem] font-extrabold uppercase tracking-[0.1em] text-dark-700">Travel Month</span>
              <select
                value={searchParams.month}
                onChange={(event) => setSearchParams({ ...searchParams, month: event.target.value })}
                className="mt-1 w-full appearance-none bg-transparent text-base font-bold text-dark-900 outline-none"
              >
                <option value="">Any Month</option>
                <option value="january">January</option>
                <option value="february">February</option>
                <option value="march">March</option>
                <option value="april">April</option>
                <option value="may">May</option>
                <option value="june">June</option>
                <option value="july">July</option>
                <option value="august">August</option>
                <option value="september">September</option>
                <option value="october">October</option>
                <option value="november">November</option>
                <option value="december">December</option>
              </select>
            </span>
            <FaChevronDown className="h-3 w-3 shrink-0 text-dark-500 transition group-focus-within:rotate-180" />
          </label>

          <label className="group flex min-h-[7.25rem] items-center gap-4 border-b border-sand-200/80 px-6 py-5 transition-colors hover:bg-[#fffaf4] focus-within:bg-[#fffaf4] sm:px-7 lg:border-b-0 lg:border-r">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary-500/10 text-secondary-600 transition group-focus-within:bg-secondary-500 group-focus-within:text-white">
              <FaWallet className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[0.68rem] font-extrabold uppercase tracking-[0.1em] text-dark-700">Budget</span>
              <select
                value={searchParams.budget}
                onChange={(event) => setSearchParams({ ...searchParams, budget: event.target.value })}
                className="mt-1 w-full appearance-none bg-transparent text-base font-bold text-dark-900 outline-none"
              >
                <option value="">Any Budget</option>

                <option value="20000-50000">₹35,000 - ₹50,000</option>
                <option value="50000-80000">₹50,000 - ₹80,000</option>
                <option value="80000-120000">₹80,000 - ₹1,20,000</option>
                <option value="120000+">₹1,20,000+</option>
              </select>
            </span>
            <FaChevronDown className="h-3 w-3 shrink-0 text-dark-500 transition group-focus-within:rotate-180" />
          </label>

          <label className="group flex min-h-[7.25rem] items-center gap-4 border-b border-sand-200/80 px-6 py-5 transition-colors hover:bg-[#fffaf4] focus-within:bg-[#fffaf4] sm:px-7 lg:border-b-0 lg:border-r">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary-500/10 text-secondary-600 transition group-focus-within:bg-secondary-500 group-focus-within:text-white">
              <FaUserFriends className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[0.68rem] font-extrabold uppercase tracking-[0.1em] text-dark-700">Travelers</span>
              <select
                value={searchParams.travelers}
                onChange={(event) => setSearchParams({ ...searchParams, travelers: event.target.value })}
                className="mt-1 w-full appearance-none bg-transparent text-base font-bold text-dark-900 outline-none"
              >
                <option value="1">1 Traveler</option>
                <option value="2">2 Travelers</option>
                <option value="3">3 Travelers</option>
                <option value="4">4 Travelers</option>
                <option value="5+">5+ Travelers</option>
                
              </select>
            </span>
            <FaChevronDown className="h-3 w-3 shrink-0 text-dark-500 transition group-focus-within:rotate-180" />
          </label>

          <div className="relative flex min-h-[7.25rem] items-center overflow-hidden bg-dark-900 px-6 py-5 sm:px-7">
            <span aria-hidden="true" className="absolute -right-10 -top-10 h-28 w-28 rounded-full border-[18px] border-secondary-500/25" />
            <button
              type="submit"
              className="group relative inline-flex h-[3.75rem] w-full items-center justify-center gap-3 rounded-2xl bg-secondary-500 px-8 text-sm font-extrabold uppercase tracking-[0.04em] text-white shadow-[0_14px_32px_rgba(217,111,58,0.32)] transition duration-300 hover:-translate-y-0.5 hover:bg-secondary-600 hover:shadow-[0_20px_38px_rgba(217,111,58,0.42)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:w-auto"
            >
              <FaSearch />
              Find My Trip
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </form>

        <div className="grid bg-[#fffdf9] sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon

            return (
              <div key={item.label} className="flex min-h-[8rem] items-center justify-center gap-4 border-b border-sand-200/80 px-6 py-6 last:border-b-0 sm:even:border-l lg:border-b-0 lg:border-l lg:first:border-l-0">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary-500/10 text-secondary-600">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <div className="text-3xl font-extrabold leading-none text-dark-900">{item.value}</div>
                  <div className="mt-2 text-sm font-medium text-dark-600">{item.label}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default SearchPackagesSection
