import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { FaGripVertical, FaSearch, FaStar, FaTrash } from 'react-icons/fa'
import { formatPrice } from '../../utils/formatPrice'
import { getHotelPrice } from '../../utils/hotelPrice'
import { packageHotelSuggestionService } from '../../services/packageHotelSuggestionService'

const inputClass = 'h-11 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-700 outline-none focus:border-orange-400'

const ToggleButton = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-lg border px-3 py-2 text-xs font-black transition ${active ? 'border-orange-200 bg-orange-50 text-orange-700' : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'}`}
  >
    {children}
  </button>
)

const PackageSuggestedHotels = ({ packageId, packageCities = [], packageCountry = '', packageCurrency = 'INR' }) => {
  const [suggestions, setSuggestions] = useState([])
  const [matchingHotels, setMatchingHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [starRating, setStarRating] = useState('')
  const [draggedId, setDraggedId] = useState(null)
  const currency = String(packageCurrency || 'INR').toUpperCase()

  const suggestedHotelIds = useMemo(() => new Set(suggestions.map((item) => String(item.hotelId))), [suggestions])

  const loadSuggestions = useCallback(() => {
    if (!packageId) return Promise.resolve()
    return packageHotelSuggestionService.adminList(packageId).then(setSuggestions)
  }, [packageId])

  const loadMatchingHotels = useCallback(() => {
    if (!packageId) return Promise.resolve()
    return packageHotelSuggestionService.matchingHotels(packageId).then(setMatchingHotels)
  }, [packageId])

  useEffect(() => {
    setLoading(true)
    Promise.all([loadSuggestions(), loadMatchingHotels()])
      .catch((error) => toast.error(error.response?.data?.message || 'Suggested hotels failed to load'))
      .finally(() => setLoading(false))
  }, [loadMatchingHotels, loadSuggestions])

  const hotels = useMemo(() => {
    const query = search.trim().toLowerCase()
    return matchingHotels.filter((hotel) => {
      const matchesSearch = !query || String(hotel.hotelName || '').toLowerCase().includes(query)
      const matchesStars = !starRating || Number(hotel.starRating) === Number(starRating)
      return matchesSearch && matchesStars
    })
  }, [matchingHotels, search, starRating])

  const addHotel = async (hotel) => {
    try {
      const response = await packageHotelSuggestionService.create(packageId, {
        hotelId: hotel._id,
        displayOrder: suggestions.length,
      })
      if (response.warning) toast.warn(response.warning)
      else toast.success('Hotel suggested')
      await Promise.all([loadSuggestions(), loadMatchingHotels()])
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not add hotel')
    }
  }

  const updateSuggestion = async (mappingId, payload) => {
    try {
      await packageHotelSuggestionService.update(packageId, mappingId, payload)
      await loadSuggestions()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Suggested hotel update failed')
    }
  }

  const removeSuggestion = async (mappingId) => {
    try {
      await packageHotelSuggestionService.remove(packageId, mappingId)
      toast.success('Suggested hotel removed')
      await loadSuggestions()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Remove failed')
    }
  }

  const reorder = async (targetId) => {
    if (!draggedId || draggedId === targetId) return
    const current = [...suggestions]
    const fromIndex = current.findIndex((item) => item.mappingId === draggedId)
    const toIndex = current.findIndex((item) => item.mappingId === targetId)
    if (fromIndex < 0 || toIndex < 0) return

    const [moved] = current.splice(fromIndex, 1)
    current.splice(toIndex, 0, moved)
    setSuggestions(current.map((item, index) => ({ ...item, displayOrder: index })))
    setDraggedId(null)

    try {
      await Promise.all(current.map((item, index) => packageHotelSuggestionService.update(packageId, item.mappingId, { displayOrder: index })))
      await loadSuggestions()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Reorder failed')
      await loadSuggestions()
    }
  }

  const cityOptions = packageCities.filter(Boolean)
  const formatHotelPrice = (hotel) => formatPrice(getHotelPrice(hotel, currency), currency)

  return (
    <section className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.12em] text-orange-600">Package curation</p>
          <h2 className="mt-1 text-xl font-black text-slate-950">Suggested Hotels</h2>
          <p className="mt-1 text-sm text-slate-500">
            Hotels auto-match by package country ({packageCountry || 'any'}) and cities ({cityOptions.join(', ') || 'any'}).
          </p>
        </div>
        {loading ? <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-500">Loading...</span> : null}
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_140px_auto]">
          <label className="relative">
            <FaSearch className="absolute left-3 top-3.5 text-slate-400" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search hotel name" className={`${inputClass} w-full pl-9`} />
          </label>
          <select value={starRating} onChange={(event) => setStarRating(event.target.value)} className={inputClass}>
            <option value="">Any stars</option>
            {[5, 4, 3, 2, 1].map((star) => <option key={star} value={star}>{star} star</option>)}
          </select>
          <button type="button" onClick={loadMatchingHotels} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-black text-white">Refresh</button>
        </div>

        {!loading && !hotels.length ? (
          <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm font-semibold text-slate-500">
            No matching hotels found for this package country/city. Create a hotel with country <strong>{packageCountry || 'same as package'}</strong> and city <strong>{cityOptions[0] || 'same as package city'}</strong>.
          </div>
        ) : null}

        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          {hotels.map((hotel) => {
            const selected = suggestedHotelIds.has(String(hotel._id))
            return (
              <article key={hotel._id} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                {hotel.thumbnailImage?.url ? <img src={hotel.thumbnailImage.url} alt={hotel.hotelName} className="h-20 w-24 rounded-lg object-cover" /> : <div className="h-20 w-24 rounded-lg bg-slate-100" />}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-black text-slate-950">{hotel.hotelName}</h3>
                  <p className="mt-1 text-xs font-bold text-slate-500">{hotel.cityId || '-'} / {hotel.countryId || '-'} / {hotel.starRating || 0} star</p>
                  <p className="mt-1 text-sm font-black text-orange-600">+ {formatHotelPrice(hotel)}</p>
                  <p className="mt-0.5 text-[0.68rem] font-bold text-slate-400">INR {hotel.priceInr ?? hotel.price ?? 0} / USD {hotel.priceUsd ?? hotel.price ?? 0}</p>
                  <button type="button" disabled={selected} onClick={() => addHotel(hotel)} className={`mt-2 rounded-lg px-3 py-2 text-xs font-black ${selected ? 'bg-slate-100 text-slate-400' : 'bg-orange-500 text-white'}`}>
                    {selected ? 'Added' : 'Add'}
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      <div className="space-y-3">
        {suggestions.map((item, index) => (
          <article
            key={item.mappingId || item.hotelId || item._id || `suggestion-${index}`}
            draggable
            onDragStart={() => setDraggedId(item.mappingId)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => reorder(item.mappingId)}
            className="grid gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm lg:grid-cols-[auto_96px_minmax(0,1fr)_auto]"
          >
            <div className="flex items-center text-slate-300"><FaGripVertical /></div>
            {item.thumbnailImage?.url ? <img src={item.thumbnailImage.url} alt={item.hotelName} className="h-20 w-24 rounded-lg object-cover" /> : <div className="h-20 w-24 rounded-lg bg-slate-100" />}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-black text-slate-950">{item.hotelName}</h3>
                {item.isFeatured ? <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-1 text-[0.68rem] font-black uppercase tracking-wide text-orange-700"><FaStar /> Top Pick</span> : null}
              </div>
              {item.packagePlans?.length ? (
                <div className="mt-1 flex flex-wrap gap-1">
                  {item.packagePlans.map((plan) => (
                    <span key={plan} className="rounded-full bg-orange-100 px-3 py-1.5 text-[0.65rem] font-black uppercase tracking-[0.18em] text-orange-700 ring-1 ring-orange-200">
                      {plan}
                    </span>
                  ))}
                </div>
              ) : null}
              <p className="mt-1 text-sm font-semibold text-slate-500">{item.cityId || '-'} / {item.countryId || '-'} / {item.starRating || 0} star / + {formatPrice(item.hotelPrice || 0, currency)}</p>
              <p className="mt-1 text-xs font-bold text-slate-400">Estimated final: {formatPrice(item.estimatedFinalPrice || 0, currency)}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 lg:justify-end">
              <ToggleButton active={item.isFeatured} onClick={() => updateSuggestion(item.mappingId, { isFeatured: !item.isFeatured })}>Top Pick</ToggleButton>
              <ToggleButton active={item.isActive} onClick={() => updateSuggestion(item.mappingId, { isActive: !item.isActive })}>{item.isActive ? 'Active' : 'Inactive'}</ToggleButton>
              <button type="button" onClick={() => removeSuggestion(item.mappingId)} className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50" aria-label="Remove suggested hotel"><FaTrash /></button>
            </div>
          </article>
        ))}
        {!suggestions.length ? <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm font-semibold text-slate-500">No manually curated hotels yet. Matching hotels above will still appear automatically on the public package page.</div> : null}
      </div>
    </section>
  )
}

export default PackageSuggestedHotels
