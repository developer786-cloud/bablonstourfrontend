import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import ConfirmModal from '../../../components/admin/ConfirmModal'
import DataTable from '../../../components/admin/DataTable'
import Pagination from '../../../components/admin/Pagination'
import SearchFilterBar from '../../../components/admin/SearchFilterBar'
import StatusBadge from '../../../components/admin/StatusBadge'
import useAuth from '../../../hooks/useAuth'
import { packageService } from '../../../services/packageService'

const PackageListPage = () => {
  const { user } = useAuth()
  const [data, setData] = useState({ packages: [], page: 1, totalPages: 1 })
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState(null)
  const canManage = user?.role === 'super_admin'

  const load = useCallback(() => {
    packageService.list({ page, search }).then(setData).catch((error) => toast.error(error.response?.data?.message || 'Failed to load packages')).finally(() => setLoading(false))
  }, [page, search])

  useEffect(() => {
    load()
  }, [load])

  const remove = async () => {
    await packageService.remove(deleteId)
    toast.success('Package deleted')
    setDeleteId(null)
    load()
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="text-2xl font-black text-slate-950">Packages</h1><p className="text-sm text-slate-500">Manage tour package inventory.</p></div>
        {canManage ? <Link to="/admin/packages/new" className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-black text-white">Add Package</Link> : null}
      </div>
      <SearchFilterBar search={search} onSearch={setSearch}><button onClick={() => { setLoading(true); setPage(1); load() }} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-bold text-white">Search</button></SearchFilterBar>
      <DataTable
        loading={loading}
        rows={data.packages || data.items || []}
        columns={[
          { key: 'image', label: 'Cover', render: (row) => row.images?.[0]?.url ? <img src={row.images[0].url} alt="" className="h-12 w-16 rounded object-cover" /> : '-' },
          { key: 'title', label: 'Package Title' },
          { key: 'country', label: 'Country', render: (row) => row.country?.name || '-' },
          { key: 'cities', label: 'Cities', render: (row) => row.cities?.join(', ') || '-' },
          { key: 'packageType', label: 'Travel Style' },
          { key: 'duration', label: 'Duration', render: (row) => `${row.duration?.nights || 0}N / ${row.duration?.days || 0}D` },
          { key: 'price', label: 'Price', render: (row) => `${row.pricing?.currency || 'INR'} ${row.pricing?.basePrice || 0}` },
          { key: 'status', label: 'Status', render: (row) => <StatusBadge value={row.status} /> },
          { key: 'featured', label: 'Featured', render: (row) => row.featured ? 'Yes' : 'No' },
          { key: 'actions', label: 'Actions', render: (row) => <div className="flex gap-2"><Link to={`/admin/packages/${row._id}`} className="font-bold text-blue-600">View</Link>{canManage ? <Link to={`/admin/packages/${row._id}/edit`} className="font-bold text-orange-600">Edit</Link> : null}{canManage ? <button onClick={() => setDeleteId(row._id)} className="font-bold text-red-600">Delete</button> : null}</div> },
        ]}
      />
      <Pagination page={data.page || page} totalPages={data.totalPages || 1} onChange={setPage} />
      <ConfirmModal open={Boolean(deleteId)} message="Delete this package permanently?" onClose={() => setDeleteId(null)} onConfirm={remove} />
    </div>
  )
}

export default PackageListPage
