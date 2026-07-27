import { useEffect, useState } from 'react'
import { FaArrowRight, FaHotel, FaStar } from 'react-icons/fa'
import RatingStars from '../common/RatingStars'
import SectionHeading from '../common/SectionHeading'
import { formatPrice } from '../../utils/formatPrice'
import { getHotelPrice } from '../../utils/hotelPrice'
import { hotelService } from '../../services/hotelService'
import { packageHotelSuggestionService } from '../../services/packageHotelSuggestionService'

const SuggestedHotels = ({ packageId, currency = 'INR', cities = [], country = '' }) => {
  const [hotels, setHotels] = useState([])
  const [allHotels, setAllHotels] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingAll, setLoadingAll] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [selectedId, setSelectedId] = useState('')
  const [browseCity, setBrowseCity] = useState('')

  const packageCities = cities.filter(Boolean)
  const normalizedCurrency = String(currency || 'INR').toUpperCase()

  useEffect(() => {
    if (!packageId) return undefined
    let mounted = true
    setLoading(true)
    packageHotelSuggestionService.publicList(packageId)
      .then((items) => {
        if (!mounted) return
        const suggestions = Array.isArray(items) ? items : []
        setHotels(suggestions)
        const featured = suggestions.find((item) => item.isFeatured)
        setSelectedId(String(featured?.hotelId || suggestions[0]?.hotelId || ''))
      })
      .catch(() => {
        if (mounted) setHotels([])
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [packageId])

  useEffect(() => {
    setBrowseCity((current) => current || packageCities[0] || '')
  }, [packageCities])

  if (!loading && !hotels.length) return null

  const selected = hotels.find((hotel) => String(hotel.hotelId) === selectedId)

  const loadAllHotels = () => {
    if (!browseCity && !country) return
    setShowAll(true)
    if (allHotels.length) return
    setLoadingAll(true)
    hotelService.list({ city: browseCity, country, limit: 24 })
      .then((data) => setAllHotels(data.items || data.hotels || []))
      .catch(() => setAllHotels([]))
      .finally(() => setLoadingAll(false))
  }

  const reloadAllHotels = (city) => {
    setBrowseCity(city)
    setLoadingAll(true)
    hotelService.list({ city, country, limit: 24 })
      .then((data) => setAllHotels(data.items || data.hotels || []))
      .catch(() => setAllHotels([]))
      .finally(() => setLoadingAll(false))
  }

  return (
    <section className="rounded-card border border-sand-200 bg-white p-5 shadow-card md:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <SectionHeading eyebrow="Recommended stays" title="Suggested Hotels" />
        {(browseCity || country) ? (
          <button type="button" onClick={loadAllHotels} className="inline-flex items-center gap-2 text-sm font-black text-secondary-600 hover:text-secondary-700">
            View all hotels{browseCity ? ` in ${browseCity}` : ''}{country ? `, ${country}` : ''}
            <FaArrowRight className="h-3 w-3" />
          </button>
        ) : null}
      </div>

      {loading ? (
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((item) => <div key={item} className="h-44 animate-pulse rounded-card-sm bg-sand-100" />)}
        </div>
      ) : (
        <>
          {selected ? (
            <div className="mt-5 rounded-card-sm border border-secondary-200 bg-secondary-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-secondary-600">Selected estimate</p>
                  <h3 className="mt-1 font-display text-2xl font-bold text-dark-900">{selected.hotelName}</h3>
                  <p className="mt-1 text-xs font-bold text-dark-500">{selected.cityId || '-'} / {selected.countryId || '-'}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-dark-400">Package + hotel</p>
                  <p className="mt-1 text-2xl font-black text-dark-900">{formatPrice(selected.estimatedFinalPrice || 0, normalizedCurrency)}</p>
                </div>
              </div>
            </div>
          ) : null}

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {hotels.map((hotel) => {
              const active = String(hotel.hotelId) === selectedId
              const addOnPrice = hotel.hotelPrice ?? getHotelPrice(hotel, normalizedCurrency)
              return (
                <button
                  key={hotel.mappingId || hotel.hotelId}
                  type="button"
                  onClick={() => setSelectedId(String(hotel.hotelId))}
                  className={`overflow-hidden rounded-card-sm border bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-card ${active ? 'border-secondary-300 ring-2 ring-secondary-100' : 'border-sand-200'}`}
                >
                  <div className="relative h-36 bg-sand-100">
                    {hotel.thumbnailImage?.url ? <img src={hotel.thumbnailImage.url} alt={hotel.hotelName} className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-sand-400"><FaHotel className="h-8 w-8" /></div>}
                    {hotel.isFeatured ? <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-secondary-500 px-3 py-1 text-[0.68rem] font-black uppercase tracking-wide text-white"><FaStar /> Top Pick</span> : null}
                    {hotel.isAutoSuggested ? <span className="absolute right-3 top-3 rounded-full bg-primary-500 px-3 py-1 text-[0.68rem] font-black uppercase tracking-wide text-white">Matched</span> : null}
                  </div>
                  <div className="p-4">
                    <h3 className="line-clamp-1 font-black text-dark-900">{hotel.hotelName}</h3>
                    <p className="mt-1 text-xs font-bold text-dark-500">{hotel.cityId || '-'} / {hotel.countryId || '-'}</p>
                    <div className="mt-2"><RatingStars rating={hotel.starRating || 0} /></div>
                    <div className="mt-3 flex items-end justify-between gap-3">
                      <div>
                        <p className="text-xs font-black uppercase tracking-wide text-dark-400">Hotel add-on</p>
                        <p className="mt-1 font-black text-secondary-600">+ {formatPrice(addOnPrice, normalizedCurrency)}</p>
                      </div>
                      <p className="text-xs font-black text-dark-500">{active ? 'Selected' : 'Select'}</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {showAll ? (
            <div className="mt-6 rounded-card-sm border border-sand-200 bg-sand-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="font-display text-xl font-bold text-dark-900">Browse hotels by city</h3>
                  {country ? <p className="mt-1 text-xs font-bold text-dark-500">Country: {country}</p> : null}
                </div>
                <button type="button" onClick={() => setShowAll(false)} className="text-sm font-black text-secondary-600">Hide</button>
              </div>

              {packageCities.length > 1 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {packageCities.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => reloadAllHotels(city)}
                      className={`rounded-full px-3 py-1.5 text-xs font-black transition ${browseCity === city ? 'bg-secondary-500 text-white' : 'border border-sand-200 bg-white text-dark-600'}`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              ) : null}

              {loadingAll ? <p className="mt-4 text-sm font-bold text-dark-500">Loading hotels...</p> : null}
              {!loadingAll && allHotels.length ? (
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {allHotels.map((hotel) => (
                    <article key={hotel._id} className="flex gap-3 rounded-xl border border-sand-200 bg-white p-3">
                      {hotel.thumbnailImage?.url ? <img src={hotel.thumbnailImage.url} alt={hotel.hotelName} className="h-16 w-20 rounded-lg object-cover" /> : <div className="h-16 w-20 rounded-lg bg-sand-100" />}
                      <div className="min-w-0">
                        <h4 className="truncate font-black text-dark-900">{hotel.hotelName}</h4>
                        <p className="mt-1 text-xs font-bold text-dark-500">{hotel.cityId || '-'} / {hotel.countryId || '-'} / {hotel.starRating || 0} star</p>
                        <p className="mt-1 text-sm font-black text-secondary-600">+ {formatPrice(getHotelPrice(hotel, normalizedCurrency), normalizedCurrency)}</p>
                      </div>
                    </article>
                  ))}
                </div>
              ) : null}
              {!loadingAll && !allHotels.length ? <p className="mt-4 text-sm font-bold text-dark-500">No other active hotels found for this city and country yet.</p> : null}
            </div>
          ) : null}
        </>
      )}
    </section>
  )
}

export default SuggestedHotels
