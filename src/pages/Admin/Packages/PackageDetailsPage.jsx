import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import StatusBadge from '../../../components/admin/StatusBadge'
import { packageService } from '../../../services/packageService'

const PackageDetailsPage = () => {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  useEffect(() => { packageService.get(id).then(setItem) }, [id])
  if (!item) return <div>Loading package...</div>
  return <div className="space-y-4"><Link to="/admin/packages" className="font-bold text-orange-600">Back</Link><div className="rounded-xl bg-white p-6 shadow-sm"><h1 className="text-3xl font-black">{item.title}</h1><div className="mt-3"><StatusBadge value={item.status} /></div><p className="mt-4 text-slate-600">{item.country?.name} / {item.cities?.join(', ')}</p><p className="mt-2 font-black">INR {item.pricing?.basePrice || 0}</p></div></div>
}

export default PackageDetailsPage
