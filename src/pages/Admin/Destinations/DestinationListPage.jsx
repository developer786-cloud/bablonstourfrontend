import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaCity, FaEdit, FaGlobeAsia, FaImage, FaPlus, FaSearch, FaTrash, FaMapMarkerAlt } from 'react-icons/fa'
import ConfirmModal from '../../../components/admin/ConfirmModal'
import DataTable from '../../../components/admin/DataTable'
import StatusBadge from '../../../components/admin/StatusBadge'
import useAuth from '../../../hooks/useAuth'
import { destinationService } from '../../../services/destinationService'

const getImageUrl = (image) => image?.url || image?.src || ''

const DestinationListPage = () => {
  const { user } = useAuth()
  const [data, setData] = useState({ destinations: [] })
  const [search, setSearch] = useState('')
  const [cityType, setCityType] = useState('')
  const [loading, setLoading] = useState(true)
  const [deleteDestination, setDeleteDestination] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const canManage = user?.role === 'super_admin'

  const rows = useMemo(() => data.destinations || data.items || [], [data])

  const stats = useMemo(() => {
    const active = rows.filter((item) => item.isActive).length
    const countries = new Set(rows.map((item) => item.country).filter(Boolean)).size
    const featured = rows.filter((item) => item.isFeatured).length

    return [
      { label: 'Total destinations', value: rows.length, icon: FaMapMarkerAlt, tone: 'bg-orange-100 text-orange-700' },
      { label: 'Countries', value: countries, icon: FaGlobeAsia, tone: 'bg-blue-100 text-blue-700' },
      { label: 'Active', value: active, icon: FaCity, tone: 'bg-green-100 text-green-700' },
      { label: 'Featured', value: featured, icon: FaImage, tone: 'bg-purple-100 text-purple-700' },
    ]
  }, [rows])

  const load = useCallback(() => {
    setLoading(true)
    destinationService
      .list({ search, cityType: cityType || undefined, limit: 100 })
      .then(setData)
      .catch((error) => toast.error(error.response?.data?.message || 'Failed to load destinations'))
      .finally(() => setLoading(false))
  }, [cityType, search])

  useEffect(() => {
    let mounted = true

    destinationService
      .list({ search, cityType: cityType || undefined, limit: 100 })
      .then((nextData) => {
        if (mounted) setData(nextData)
      })
      .catch((error) => {
        if (mounted) toast.error(error.response?.data?.message || 'Failed to load destinations')
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [cityType, search])

  const remove = async () => {
    if (!deleteDestination?._id) return

    try {
      setDeleting(true)
      await destinationService.remove(deleteDestination._id)
      toast.success('Destination deleted')
      setDeleteDestination(null)
      load()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete destination')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl bg-slate-950 shadow-sm">
        <div className="grid gap-6 p-6 text-white lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-orange-200">
              <FaGlobeAsia />
              Destination Manager
            </p>
            <h1 className="mt-4 text-3xl font-black tracking-tight">Destinations</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              Manage country, region, and city records used on the public destinations page.
            </p>
          </div>
          {canManage ? (
            <Link
              to="/admin/destinations/new"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 text-sm font-black text-white shadow-lg shadow-orange-950/20 transition hover:bg-orange-600"
            >
              <FaPlus />
              Add Destination
            </Link>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-500">{item.label}</p>
                  <p className="mt-2 text-3xl font-black text-slate-950">{item.value}</p>
                </div>
                <span className={`grid h-12 w-12 place-items-center rounded-xl ${item.tone}`}>
                  <Icon />
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-[1fr_220px_auto_auto] lg:items-center">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search destination, country, or city..."
            className="h-11 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-orange-400"
          />
          <select
            value={cityType}
            onChange={(event) => setCityType(event.target.value)}
            className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            aria-label="Filter destination type"
          >
            <option value="">All types</option>
            <option value="country">Country</option>
            <option value="region">Region</option>
            <option value="city">City</option>
          </select>
          <button
            onClick={load}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-bold text-white hover:bg-slate-800"
          >
            <FaSearch />
            Search
          </button>
          <button
            onClick={() => {
              setSearch('')
              setCityType('')
            }}
            className="h-11 rounded-lg border border-slate-200 px-4 text-sm font-bold text-slate-700 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700"
          >
            Reset
          </button>
        </div>
      </div>

      <DataTable
        loading={loading}
        emptyText="No destinations found. Add a country, region, or city to get started."
        rows={rows}
        columns={[
          {
            key: 'destination',
            label: 'Destination',
            render: (row) => {
              const imageUrl = getImageUrl(row.heroImage)
              return (
                <div className="flex min-w-[260px] items-center gap-3">
                  {imageUrl ? (
                    <img src={imageUrl} alt="" className="h-16 w-24 rounded-xl object-cover shadow-sm" />
                  ) : (
                    <span className="grid h-16 w-24 place-items-center rounded-xl bg-slate-100 text-slate-400">
                      <FaImage />
                    </span>
                  )}
                  <div>
                    <p className="font-black text-slate-950">{row.name}</p>
                    <p className="mt-1 line-clamp-1 max-w-xs text-xs font-semibold text-slate-500">{row.shortDescription || row.overview || 'No description added'}</p>
                  </div>
                </div>
              )
            },
          },
          { key: 'country', label: 'Country', render: (row) => row.country || '-' },
          {
            key: 'cityType',
            label: 'Type',
            render: (row) => (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-slate-700">
                {row.cityType || 'city'}
              </span>
            ),
          },
          { key: 'isFeatured', label: 'Featured', render: (row) => row.isFeatured ? 'Yes' : 'No' },
          { key: 'isActive', label: 'Active', render: (row) => <StatusBadge value={row.isActive ? 'active' : 'inactive'} /> },
          { key: 'sortOrder', label: 'Sort', render: (row) => row.sortOrder ?? 0 },
          {
            key: 'actions',
            label: 'Actions',
            render: (row) => canManage ? (
              <div className="flex flex-wrap gap-2">
                <Link
                  className="inline-flex items-center gap-1.5 rounded-lg bg-orange-50 px-3 py-2 text-xs font-black text-orange-700 hover:bg-orange-100"
                  to={`/admin/destinations/${row._id}/edit`}
                >
                  <FaEdit />
                  Edit
                </Link>
                <button
                  onClick={() => setDeleteDestination(row)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs font-black text-red-700 hover:bg-red-100"
                >
                  <FaTrash />
                  Delete
                </button>
              </div>
            ) : (
              <span className="text-slate-400">View only</span>
            ),
          },
        ]}
      />

      <ConfirmModal
        open={Boolean(deleteDestination)}
        title="Delete destination?"
        message={`Delete "${deleteDestination?.name || 'this destination'}" permanently? This cannot be undone.`}
        onClose={() => setDeleteDestination(null)}
        onConfirm={remove}
        confirmLabel={deleting ? 'Deleting...' : 'Delete Destination'}
      />
    </div>
  )
}

export default DestinationListPage
