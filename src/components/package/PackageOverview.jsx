import SectionCard from '../common/SectionCard'
import SectionHeading from '../common/SectionHeading'

const labels = [
  ['flights', 'Flights'],
  ['hotelCategory', 'Hotel Category'],
  ['meals', 'Meals'],
  ['transfers', 'Transfers'],
  ['tourManager', 'Tour Manager'],
  ['visa', 'Visa'],
  ['groupSize', 'Group Size'],
  ['durationText', 'Duration'],
]

const PackageOverview = ({ overview = {} }) => {
  const items = labels.map(([key, label]) => ({ label, value: overview[key] || (key === 'hotelCategory' ? overview.hotel : '') || (key === 'durationText' ? overview.duration : '') })).filter((item) => item.value)
  if (!items.length) return null

  return (
    <SectionCard>
      <SectionHeading title="Trip Overview" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="rounded-xl border border-sand-200 bg-sand-50 p-4">
            <p className="text-xs font-black uppercase tracking-wide text-secondary-500">{item.label}</p>
            <p className="mt-2 font-black text-dark-900">{item.value}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}

export default PackageOverview
