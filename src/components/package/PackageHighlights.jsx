import { FaCircleCheck } from 'react-icons/fa6'
import SectionCard from '../common/SectionCard'
import SectionHeading from '../common/SectionHeading'

const PackageHighlights = ({ highlights = [] }) => {
  if (!highlights.length) return null

  return (
    <SectionCard>
      <SectionHeading title="Package Highlights" />
      <div className="grid gap-3 sm:grid-cols-2">
        {highlights.map((highlight, index) => (
          <div key={`${highlight.title || highlight.text}-${index}`} className="flex gap-3 rounded-xl border border-sand-200 bg-gradient-to-br from-sand-50 to-white p-4">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary-800 text-white">
              <FaCircleCheck className="h-4 w-4" />
            </span>
            <p className="font-bold text-dark-700">{highlight.title || highlight.text}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}

export default PackageHighlights
