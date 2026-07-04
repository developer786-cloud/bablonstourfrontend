import SectionCard from '../common/SectionCard'
import SectionHeading from '../common/SectionHeading'
import { normalizeMeals } from './packageViewUtils'

const ItineraryTimeline = ({ itinerary = [] }) => {
  if (!itinerary.length) return null

  return (
    <SectionCard>
      <SectionHeading title="Day-by-Day Itinerary" />
      <div className="space-y-4">
        {itinerary.map((day, index) => {
          const meals = normalizeMeals(day.meals)
          return (
            <details key={`${day.day || day.dayNumber}-${index}`} open={index === 0} className="rounded-card-sm border border-sand-200 bg-white p-4 shadow-sm">
              <summary className="cursor-pointer list-none font-black text-dark-900">Day {day.dayNumber || day.day}: {day.title}</summary>
              {day.description ? <p className="mt-3 leading-7 text-dark-600">{day.description}</p> : null}
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide text-dark-500">
                {meals.map((meal) => <span key={meal} className="rounded-full bg-sand-100 px-3 py-1">{meal}</span>)}
                {day.overnightCity ? <span className="rounded-full bg-sand-100 px-3 py-1">Overnight: {day.overnightCity}</span> : null}
                {day.hotelName ? <span className="rounded-full bg-sand-100 px-3 py-1">Hotel: {day.hotelName}</span> : null}
              </div>
              {day.activities?.length ? <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-dark-600">{day.activities.map((activity) => <li key={activity}>{activity}</li>)}</ul> : null}
            </details>
          )
        })}
      </div>
    </SectionCard>
  )
}

export default ItineraryTimeline
