import { FaCalendarAlt, FaChevronDown, FaMapMarkerAlt, FaSearch, FaWallet } from 'react-icons/fa'

const PackageSearch = ({ filters, onChange, onSubmit }) => {
  const handleChange = (event) => {
    onChange({
      ...filters,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-sand-200/70 bg-white p-4 shadow-[0_24px_70px_rgba(16,39,36,0.12)] md:p-5">
      <div className="grid grid-cols-1 gap-0 divide-y divide-sand-200 lg:grid-cols-[1.15fr_0.9fr_0.8fr_0.9fr_0.9fr_auto] lg:divide-x lg:divide-y-0 lg:items-center">
        <div className="px-2 py-3 md:px-4">
          <label className="mb-2 block text-xs font-bold text-dark-500">
            Destination
          </label>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-secondary-500" />
            <input
              name="destination"
              type="text"
              placeholder="Select Destination"
              value={filters.destination}
              onChange={handleChange}
              className="h-8 min-w-0 flex-1 bg-transparent text-sm font-semibold text-dark-900 outline-none placeholder:text-dark-600"
            />
          </div>
        </div>

        <div className="px-2 py-3 md:px-4">
          <label className="mb-2 block text-xs font-bold text-dark-500">
            Travel Style
          </label>
          <div className="flex items-center gap-2">
            <select name="travelStyle" value={filters.travelStyle || ''} onChange={handleChange} className="h-8 min-w-0 flex-1 appearance-none bg-transparent text-sm font-semibold text-dark-900 outline-none">
              <option value="">Select Style</option>
              <option value="group">Group Tour</option>
              <option value="family">Family</option>
              <option value="honeymoon">Honeymoon</option>
              <option value="custom">Custom</option>
            </select>
            <FaChevronDown className="h-3 w-3 text-dark-400" />
          </div>
        </div>

        <div className="px-2 py-3 md:px-4">
          <label className="mb-2 block text-xs font-bold text-dark-500">
            Duration
          </label>
          <div className="flex items-center gap-2">
            <select name="duration" value={filters.duration} onChange={handleChange} className="h-8 min-w-0 flex-1 appearance-none bg-transparent text-sm font-semibold text-dark-900 outline-none">
              <option value="">Any Duration</option>
              <option value="5">Up to 5 days</option>
              <option value="7">Up to 7 days</option>
              <option value="10">Up to 10 days</option>
            </select>
            <FaChevronDown className="h-3 w-3 text-dark-400" />
          </div>
        </div>

        <div className="px-2 py-3 md:px-4">
          <label className="mb-2 block text-xs font-bold text-dark-500">
            Departure Date
          </label>
          <div className="flex items-center gap-2">
            <input name="departureDate" type="date" value={filters.departureDate || ''} onChange={handleChange} className="h-8 min-w-0 flex-1 bg-transparent text-sm font-semibold text-dark-900 outline-none" />
            <FaCalendarAlt className="h-3.5 w-3.5 text-secondary-500" />
          </div>
        </div>

        <div className="px-2 py-3 md:px-4">
          <label className="mb-2 block text-xs font-bold text-dark-500">
            Budget (Per Person)
          </label>
          <div className="flex items-center gap-2">
            <FaWallet className="text-secondary-500" />
            <select name="budget" value={filters.budget} onChange={handleChange} className="h-8 min-w-0 flex-1 appearance-none bg-transparent text-sm font-semibold text-dark-900 outline-none">
              <option value="">Any Budget</option>
              <option value="50000">Under Rs 50,000</option>
              <option value="100000">Under Rs 1,00,000</option>
              <option value="200000">Under Rs 2,00,000</option>
            </select>
            <FaChevronDown className="h-3 w-3 text-dark-400" />
          </div>
        </div>

        <button type="submit" className="mt-3 inline-flex h-14 items-center justify-center gap-3 rounded-xl bg-[#071b34] px-6 text-sm font-black text-white transition hover:bg-secondary-600 lg:ml-4 lg:mt-0">
          Search Packages
          <FaSearch />
        </button>
      </div>
    </form>
  )
}

export default PackageSearch
