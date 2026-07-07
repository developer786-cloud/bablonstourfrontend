import {
  FaCalendarAlt,
  FaHotel,
  FaMapMarkerAlt,
  FaPassport,
  FaPlane,
  FaRoute,
  FaShuttleVan,
  FaUserTie,
  FaUsers,
  FaUtensils,
} from 'react-icons/fa'
import SectionCard from '../common/SectionCard'
import SectionHeading from '../common/SectionHeading'

const labels = [
  ['flights', 'Flights', FaPlane, 'bg-sky-50 text-sky-700 ring-sky-100'],
  ['hotelCategory', 'Hotel Category', FaHotel, 'bg-primary-50 text-primary-700 ring-primary-100'],
  ['meals', 'Meals', FaUtensils, 'bg-amber-50 text-amber-700 ring-amber-100'],
  ['transfers', 'Transfers', FaShuttleVan, 'bg-emerald-50 text-emerald-700 ring-emerald-100'],
  ['tourManager', 'Tour Manager', FaUserTie, 'bg-secondary-50 text-secondary-700 ring-secondary-100'],
  ['visa', 'Visa', FaPassport, 'bg-violet-50 text-violet-700 ring-violet-100'],
  ['groupSize', 'Group Size', FaUsers, 'bg-rose-50 text-rose-700 ring-rose-100'],
  ['durationText', 'Duration', FaCalendarAlt, 'bg-accent-50 text-accent-700 ring-accent-100'],
]

const uniqueItems = (items = []) => [...new Set(items.map((item) => String(item || '').trim()).filter(Boolean))]

const PackageOverview = ({ package: travelPackage = {}, overview = travelPackage.overview || {} }) => {
  const coveredCities = uniqueItems([
    ...(travelPackage.cities || []),
    travelPackage.destination?.city,
    travelPackage.destination?.name,
  ])

  const items = labels
    .map(([key, label, Icon, tone]) => ({
      label,
      Icon,
      tone,
      value: overview[key] || (key === 'hotelCategory' ? overview.hotel : '') || (key === 'durationText' ? overview.duration : ''),
    }))
    .filter((item) => item.value)

  if (!items.length && !coveredCities.length) return null

  return (
    <SectionCard className="overflow-hidden">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <SectionHeading
          eyebrow="Package snapshot"
          title="Trip Overview"
          description="A quick look at the essentials included in this itinerary."
        />
        {coveredCities.length ? (
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary-100 bg-primary-50 px-4 py-2 text-sm font-black text-primary-700">
            <FaRoute className="h-4 w-4" />
            {coveredCities.length} {coveredCities.length === 1 ? 'city' : 'cities'} covered
          </div>
        ) : null}
      </div>

      {coveredCities.length ? (
        <div className="mb-5 rounded-card-sm border border-sand-200 bg-gradient-to-br from-sand-50 via-white to-primary-50/60 p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-dark-500">
            <FaMapMarkerAlt className="text-secondary-500" />
            Cities Covered
          </div>
          <div className="flex flex-wrap gap-2">
            {coveredCities.map((city, index) => (
              <span key={`${city}-${index}`} className="inline-flex items-center gap-2 rounded-full border border-white bg-white px-3.5 py-2 text-sm font-black text-dark-800 shadow-sm">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary-50 text-xs text-secondary-600">{index + 1}</span>
                {city}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {items.length ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="group rounded-card-sm border border-sand-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-secondary-200 hover:shadow-card">
            <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl ring-1 ${item.tone}`}>
              <item.Icon className="h-5 w-5" />
            </div>
            <p className="text-xs font-black uppercase tracking-[0.12em] text-dark-400">{item.label}</p>
            <p className="mt-2 text-base font-black leading-snug text-dark-900">{item.value}</p>
          </div>
        ))}
        </div>
      ) : null}
    </SectionCard>
  )
}

export default PackageOverview
