import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaCalendarAlt, FaChevronDown, FaGlobeAsia, FaHeadset, FaMapMarkerAlt, FaSearch, FaThumbsUp, FaUserFriends, FaUsers, FaWallet } from 'react-icons/fa'
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
    <section className="relative z-30 -mt-24 px-4 pb-16 sm:px-6 lg:-mt-28 lg:px-8 lg:pb-24">
      <div className="mx-auto max-w-[74rem] overflow-hidden rounded-[1.75rem] border border-sand-200 bg-white shadow-[0_28px_80px_rgba(16,39,36,0.18)]">
        <form onSubmit={handleSearch} className="grid gap-0 border-b border-sand-200 lg:grid-cols-[1.08fr_1fr_0.9fr_0.95fr_auto]">
          <label className="group flex min-h-[6.25rem] items-center gap-4 border-b border-sand-200 px-6 py-5 lg:border-b-0 lg:border-r">
            <FaMapMarkerAlt className="h-7 w-7 shrink-0 text-dark-900" />
            <span className="min-w-0 flex-1">
              <span className="block text-[0.7rem] font-extrabold uppercase tracking-[0.08em] text-dark-700">Where to?</span>
              <input
                type="text"
                placeholder="Any Destination"
                value={searchParams.destination}
                onChange={(event) => setSearchParams({ ...searchParams, destination: event.target.value })}
                className="mt-1 w-full bg-transparent text-base font-bold text-dark-900 outline-none placeholder:text-dark-900"
              />
            </span>
            <FaChevronDown className="h-3 w-3 shrink-0 text-dark-500 transition group-focus-within:rotate-180" />
          </label>

          <label className="group flex min-h-[6.25rem] items-center gap-4 border-b border-sand-200 px-6 py-5 lg:border-b-0 lg:border-r">
            <FaCalendarAlt className="h-7 w-7 shrink-0 text-dark-900" />
            <span className="min-w-0 flex-1">
              <span className="block text-[0.7rem] font-extrabold uppercase tracking-[0.08em] text-dark-700">Travel Month</span>
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

          <label className="group flex min-h-[6.25rem] items-center gap-4 border-b border-sand-200 px-6 py-5 lg:border-b-0 lg:border-r">
            <FaWallet className="h-7 w-7 shrink-0 text-dark-900" />
            <span className="min-w-0 flex-1">
              <span className="block text-[0.7rem] font-extrabold uppercase tracking-[0.08em] text-dark-700">Budget</span>
              <select
                value={searchParams.budget}
                onChange={(event) => setSearchParams({ ...searchParams, budget: event.target.value })}
                className="mt-1 w-full appearance-none bg-transparent text-base font-bold text-dark-900 outline-none"
              >
                <option value="">Any Budget</option>
                <option value="50000-80000">₹50,000 - ₹80,000</option>
                <option value="80000-120000">₹80,000 - ₹1,20,000</option>
                <option value="120000+">₹1,20,000+</option>
              </select>
            </span>
            <FaChevronDown className="h-3 w-3 shrink-0 text-dark-500 transition group-focus-within:rotate-180" />
          </label>

          <label className="group flex min-h-[6.25rem] items-center gap-4 border-b border-sand-200 px-6 py-5 lg:border-b-0 lg:border-r">
            <FaUserFriends className="h-7 w-7 shrink-0 text-dark-900" />
            <span className="min-w-0 flex-1">
              <span className="block text-[0.7rem] font-extrabold uppercase tracking-[0.08em] text-dark-700">Travelers</span>
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

          <div className="flex items-center px-6 py-5">
            <button
              type="submit"
              className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-secondary-500 px-8 text-sm font-extrabold uppercase tracking-[0.04em] text-white shadow-[0_14px_32px_rgba(217,111,58,0.28)] transition hover:-translate-y-0.5 hover:bg-secondary-600 lg:w-auto"
            >
              <FaSearch />
              Search Packages
            </button>
          </div>
        </form>

        <div className="grid bg-[#fffdf9] sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon

            return (
              <div key={item.label} className="flex min-h-[7.25rem] items-center justify-center gap-5 border-b border-sand-200 px-6 py-6 last:border-b-0 sm:even:border-l lg:border-b-0 lg:border-l lg:first:border-l-0">
                <Icon className="h-9 w-9 shrink-0 text-secondary-500" />
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
