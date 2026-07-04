import PackageCard from './PackageCard'
import SectionCard from '../common/SectionCard'
import SectionHeading from '../common/SectionHeading'

const RelatedPackages = ({ packages = [] }) => {
  if (!packages.length) return null

  return (
    <SectionCard>
      <SectionHeading title="Related Packages" description="More trips matched by destination, package type, or tags." />
      <div className="grid gap-4 md:grid-cols-2">
        {packages.map((item) => <PackageCard key={item._id || item.slug} package={item} />)}
      </div>
    </SectionCard>
  )
}

export default RelatedPackages
