import RatingStars from '../common/RatingStars'
import SectionCard from '../common/SectionCard'
import SectionHeading from '../common/SectionHeading'

const HotelDetails = ({ hotels = [] }) => {
  if (!hotels.length) return null

  return (
    <SectionCard>
      <SectionHeading title="Hotel Details" />
      <div className="grid gap-4 md:grid-cols-2">
        {hotels.map((hotel, index) => (
          <article key={`${hotel.name}-${index}`} className="overflow-hidden rounded-card-sm border border-sand-200 bg-white shadow-sm">
            {hotel.image?.url ? <img src={hotel.image.url} alt={hotel.image.alt || hotel.name} className="h-44 w-full object-cover" /> : null}
            <div className="p-4">
              <h3 className="text-lg font-black text-dark-900">{hotel.name}</h3>
              <p className="mt-1 text-sm text-dark-500">{hotel.city || hotel.location}</p>
              <div className="mt-3"><RatingStars rating={hotel.starRating || hotel.stars || 4} /></div>
              <p className="mt-3 text-sm font-bold text-dark-600">{hotel.nights} nights {hotel.mealPlan ? `- ${hotel.mealPlan}` : ''}</p>
              {hotel.amenities?.length ? <p className="mt-2 text-sm text-dark-500">{hotel.amenities.join(', ')}</p> : null}
            </div>
          </article>
        ))}
      </div>
    </SectionCard>
  )
}

export default HotelDetails
