import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6'
import SectionCard from '../common/SectionCard'
import SectionHeading from '../common/SectionHeading'

const List = ({ title, items, icon: Icon, tone }) => (
  <div>
    <h3 className="font-display text-2xl font-bold text-dark-900">{title}</h3>
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-dark-600">
          <Icon className={`mt-1 shrink-0 ${tone}`} /> {item}
        </li>
      ))}
    </ul>
  </div>
)

const InclusionsExclusions = ({ inclusions = [], exclusions = [] }) => {
  if (!inclusions.length && !exclusions.length) return null

  return (
    <SectionCard>
      <SectionHeading title="Inclusions and Exclusions" />
      <div className="grid gap-8 md:grid-cols-2">
        {inclusions.length ? <List title="Included" items={inclusions} icon={FaCircleCheck} tone="text-emerald-600" /> : null}
        {exclusions.length ? <List title="Not Included" items={exclusions} icon={FaCircleXmark} tone="text-red-500" /> : null}
      </div>
    </SectionCard>
  )
}

export default InclusionsExclusions
