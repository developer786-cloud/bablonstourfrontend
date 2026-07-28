import { useEffect, useRef, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { formatPrice } from '../../utils/formatPrice'
import { packageHotelSuggestionService } from '../../services/packageHotelSuggestionService'

const PackageCardSuggestedHotels = ({ packageId, currency = 'INR', onSelectHotel }) => {
  const rootRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [hotels, setHotels] = useState([])
  const [selectedId, setSelectedId] = useState('')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const node = rootRef.current
    if (!node) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { rootMargin: '180px' })

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible || !packageId || loaded) return
    let mounted = true
    packageHotelSuggestionService.publicList(packageId)
      .then((items) => {
        if (!mounted) return
        const suggestions = Array.isArray(items) ? items : []
        setHotels(suggestions.slice(0, 3))
        setLoaded(true)
      })
      .catch(() => {
        if (mounted) setLoaded(true)
      })

    return () => {
      mounted = false
    }
  }, [loaded, packageId, visible])

  const selectHotel = (hotel) => {
    setSelectedId(String(hotel.hotelId))
    onSelectHotel?.(hotel)
  }

  return (
    <div ref={rootRef}>
      {hotels.length ? (
        <div className="mt-4 border-t border-sand-200 pt-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-dark-400">Available Hotels</p>
            <span className="text-[0.68rem] font-black text-secondary-600">Tap to price</span>
          </div>
          <div className="grid gap-2">
            {hotels.map((hotel, index) => {
              const selected = selectedId === String(hotel.hotelId)
              return (
                <button
                  key={hotel.mappingId || hotel.hotelId || hotel._id || `hotel-${index}`}
                  type="button"
                  onClick={() => selectHotel(hotel)}
                  className={`group/hotel flex min-h-[4rem] w-full items-center gap-2 rounded-xl border p-2 text-left transition ${selected ? 'border-secondary-300 bg-secondary-50' : 'border-sand-200 bg-white hover:border-secondary-200 hover:bg-sand-50'}`}
                >
                  {hotel.thumbnailImage?.url ? <img src={hotel.thumbnailImage.url} alt={hotel.hotelName} className="h-12 w-14 shrink-0 rounded-lg object-cover" /> : <div className="h-12 w-14 shrink-0 rounded-lg bg-sand-100" />}
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1">
                      <span className="truncate text-xs font-black text-dark-900">{hotel.hotelName}</span>
                      {hotel.isFeatured ? <span className="shrink-0 rounded-full bg-secondary-500 px-1.5 py-0.5 text-[0.58rem] font-black uppercase text-white">Top</span> : null}
                    </span>
                    {hotel.packagePlans?.length ? (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {hotel.packagePlans.map((plan) => (
                          <span key={plan} className="rounded-full bg-orange-100 px-3 py-1.5 text-[0.65rem] font-black uppercase tracking-[0.18em] text-orange-700 ring-1 ring-orange-200">
                            {plan}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <span className="mt-1 flex flex-wrap items-center gap-1 text-[0.68rem] font-bold text-dark-500">
                      <FaStar className="text-amber-400" /> {hotel.starRating || 0}
                      <span>+</span>
                      <span className="font-black text-secondary-600">{formatPrice(hotel.hotelPrice || 0, currency)}</span>
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default PackageCardSuggestedHotels
