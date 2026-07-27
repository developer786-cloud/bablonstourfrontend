import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PackageSuggestedHotels from '../../../components/admin/PackageSuggestedHotels'
import StatusBadge from '../../../components/admin/StatusBadge'
import { packageService } from '../../../services/packageService'

const PackageDetailsPage = () => {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  useEffect(() => { packageService.get(id).then(setItem) }, [id])
  if (!item) return <div>Loading package...</div>
  return (
    <div className="space-y-4">
      <Link to="/admin/packages" className="font-bold text-orange-600">Back</Link>
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-3xl font-black">{item.title}</h1>
            <div className="mt-3"><StatusBadge value={item.status} /></div>
          </div>
          <Link to={`/admin/packages/${item._id}/edit`} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-black text-slate-700">Edit Package</Link>
        </div>
        <p className="mt-4 text-slate-600">{item.country?.name} / {item.cities?.join(', ')}</p>
        <p className="mt-2 font-black">{item.pricing?.currency || 'INR'} {item.pricing?.basePrice || 0}</p>
      </div>
      <PackageSuggestedHotels
        packageId={item._id}
        packageCities={item.cities || []}
        packageCountry={item.country?.name || ''}
        packageCurrency={item.pricing?.currency || 'INR'}
      />
    </div>
  )
}

export default PackageDetailsPage
