import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import useAuth from '../../../hooks/useAuth'
import ConfirmModal from '../../../components/admin/ConfirmModal'
import DataTable from '../../../components/admin/DataTable'
import Pagination from '../../../components/admin/Pagination'
import SearchFilterBar from '../../../components/admin/SearchFilterBar'
import StatusBadge from '../../../components/admin/StatusBadge'
import { formatPrice } from '../../../utils/formatPrice'
import { hotelService } from '../../../services/hotelService'

const HotelListPage = () => {
  const { user } = useAuth()
  const [data, setData] = useState({ hotels: [], page: 1, totalPages: 1 })
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({ city: '', country: '', starRating: '', category: '' })
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState(null)

  const load = useCallback(() => {
    setLoading(true)
    hotelService.adminList({ page, search, ...filters })
      .then(setData)
      .catch((error) => toast.error(error.response?.data?.message || 'Failed to load hotels'))
      .finally(() => setLoading(false))
  }, [filters, page, search])

  useEffect(() => {
    load()
  }, [load])

  const remove = async () => {
    try {
      await hotelService.remove(deleteId)
      toast.success('Hotel deleted')
      setDeleteId(null)
      load()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Hotel delete failed')
    }
  }

  const toggle = async (row) => {
    try {
      await hotelService.status(row._id, !row.isActive)
      toast.success('Hotel status updated')
      load()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Status update failed')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-950">Hotels</h1>
          <p className="text-sm text-slate-500">Manage independent hotel inventory for package suggestions.</p>
        </div>
        {user?.role === 'super_admin' ? <Link to="/admin/hotels/new" className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-black text-white">Add Hotel</Link> : null}
      </div>

      <SearchFilterBar search={search} onSearch={setSearch}>
        <input value={filters.country} onChange={(event) => setFilters((current) => ({ ...current, country: event.target.value }))} placeholder="Country" className="h-11 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-orange-400" />
        <input value={filters.city} onChange={(event) => setFilters((current) => ({ ...current, city: event.target.value }))} placeholder="City" className="h-11 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-orange-400" />
        <select value={filters.starRating} onChange={(event) => setFilters((current) => ({ ...current, starRating: event.target.value }))} className="h-11 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-orange-400">
          <option value="">Any stars</option>
          {[5, 4, 3, 2, 1].map((star) => <option key={star} value={star}>{star} star</option>)}
        </select>
        <button type="button" onClick={() => { setPage(1); load() }} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-bold text-white">Search</button>
      </SearchFilterBar>

      <DataTable
        loading={loading}
        rows={data.hotels || data.items || []}
        columns={[
          { key: 'image', label: 'Image', render: (row) => row.thumbnailImage?.url ? <img src={row.thumbnailImage.url} alt="" className="h-12 w-16 rounded object-cover" /> : '-' },
          { key: 'hotelName', label: 'Hotel Name' },
          { key: 'cityId', label: 'City' },
          { key: 'countryId', label: 'Country' },
          { key: 'starRating', label: 'Stars', render: (row) => `${row.starRating || 0} star` },
          { key: 'price', label: 'Price (INR / USD)', render: (row) => `${formatPrice(row.priceInr ?? row.price ?? 0, 'INR')} / ${formatPrice(row.priceUsd ?? row.price ?? 0, 'USD')}` },
          { key: 'isActive', label: 'Status', render: (row) => <StatusBadge value={row.isActive ? 'active' : 'inactive'} /> },
          { key: 'actions', label: 'Actions', render: (row) => <div className="flex flex-wrap gap-2"><Link to={`/admin/hotels/${row._id}/edit`} className="font-bold text-orange-600">Edit</Link><button onClick={() => toggle(row)} className="font-bold text-blue-600">{row.isActive ? 'Deactivate' : 'Activate'}</button><button onClick={() => setDeleteId(row._id)} className="font-bold text-red-600">Delete</button></div> },
        ]}
      />
      <Pagination page={data.page || page} totalPages={data.totalPages || 1} onChange={setPage} />
      <ConfirmModal open={Boolean(deleteId)} message="Delete this hotel permanently?" onClose={() => setDeleteId(null)} onConfirm={remove} />
    </div>
  )
}

export default HotelListPage
