import EmptyState from '../common/EmptyState/EmptyState'
import PackageCard from './PackageCard'

const PackageGrid = ({ packages = [] }) => {
  if (!packages.length) {
    return (
      <EmptyState
        title="No packages found"
        description="Try changing your destination, duration, or budget filters."
      />
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {packages.map((travelPackage) => (
        <PackageCard key={travelPackage.slug || travelPackage.title} package={travelPackage} />
      ))}
    </div>
  )
}

export default PackageGrid
