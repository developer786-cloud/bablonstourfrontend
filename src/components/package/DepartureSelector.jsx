import SectionCard from '../common/SectionCard'
import SectionHeading from '../common/SectionHeading'
import { formatPrice } from '../../utils/formatPrice'

const statusLabel = (status) => String(status || 'open').replace('_', ' ')

const DepartureSelector = ({ package: travelPackage, selectedDeparture, onSelect }) => {
  const departures = travelPackage.departures || []

  if (travelPackage.packageType !== 'group') {
    return (
      <SectionCard>
        <SectionHeading title="Choose Your Travel Date" description="This package can be customized around your preferred dates." />
        <input type="date" className="w-full rounded-lg border border-sand-200 bg-sand-50 p-3 text-sm font-bold text-dark-700 sm:max-w-xs" />
      </SectionCard>
    )
  }

  if (!departures.length) {
    return (
      <SectionCard>
        <SectionHeading title="Departures" description="Departure dates are being finalized. Send an inquiry and our team will help you." />
      </SectionCard>
    )
  }

  return (
    <SectionCard>
      <SectionHeading title="Select Departure" description="Choose a group departure to update seats and booking price." />
      <div className="grid gap-3">
        {departures.map((departure) => {
          const selected = selectedDeparture?._id === departure._id
          const soldOut = ['soldout', 'sold_out'].includes(departure.status)
          return (
            <button
              key={departure._id || departure.departureDate}
              type="button"
              disabled={soldOut}
              onClick={() => onSelect(departure)}
              className={`rounded-card-sm border p-4 text-left transition ${selected ? 'border-secondary-500 bg-secondary-50 shadow-card' : 'border-sand-200 bg-white hover:border-secondary-200 hover:bg-sand-50'} ${soldOut ? 'cursor-not-allowed opacity-60' : ''}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-black text-dark-900">{new Date(departure.startDate || departure.departureDate).toLocaleDateString()} - {new Date(departure.endDate || departure.returnDate).toLocaleDateString()}</p>
                  <p className="mt-1 text-sm text-dark-500">{departure.availableSeats ?? 0} of {departure.totalSeats ?? 0} seats available</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-dark-900">{formatPrice(departure.pricePerPerson || departure.price || travelPackage.pricing?.basePrice, travelPackage.pricing?.currency)}</p>
                  <p className="text-xs font-black uppercase tracking-wide text-secondary-600">{statusLabel(departure.status)}</p>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </SectionCard>
  )
}

export default DepartureSelector
