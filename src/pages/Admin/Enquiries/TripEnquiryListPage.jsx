import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import DataTable from '../../../components/admin/DataTable'
import StatusBadge from '../../../components/admin/StatusBadge'
import tripEnquiryService from '../../../services/tripEnquiryService'
import { ADMIN_ROUTES } from '../../../constants/routes'

const TripEnquiryListPage = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('')
  const [selected, setSelected] = useState(null)
  const navigate = useNavigate()

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await tripEnquiryService.list(status ? { status } : {})
      setItems(data.items || [])
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Could not load trip planner requests')
    } finally { setLoading(false) }
  }, [status])

  useEffect(() => { load() }, [load])

  const changeStatus = async (id, nextStatus) => {
    try { await tripEnquiryService.updateStatus(id, nextStatus); toast.success('Status updated'); load() }
    catch (error) { toast.error(error?.response?.data?.message || 'Could not update status') }
  }

  return <div className="space-y-4">
    <div className="flex flex-wrap items-center justify-between gap-3"><div><h1 className="text-2xl font-black">Trip planner requests</h1><p className="text-sm text-slate-500">Custom itinerary requests submitted from the public planner.</p></div><select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"><option value="">All statuses</option>{['new', 'contacted', 'itinerary_sent', 'converted', 'closed'].map((item) => <option key={item} value={item}>{item.replace('_', ' ')}</option>)}</select></div>
    <DataTable loading={loading} rows={items} emptyText="No trip planner requests yet" columns={[
      { key: 'name', label: 'Traveler' }, { key: 'phone', label: 'Phone' },
      { key: 'destinations', label: 'Destinations', render: (row) => row.destinations?.join(', ') },
      { key: 'duration', label: 'Duration', render: (row) => `${row.nights}N / ${row.days}D` },
      { key: 'status', label: 'Status', render: (row) => <StatusBadge value={row.status} /> },
      { key: 'actions', label: 'Actions', render: (row) => <div className="flex gap-3"><button onClick={() => setSelected(row)} className="font-bold text-orange-600">View</button><button onClick={() => navigate(ADMIN_ROUTES.ITINERARY_BUILDER_FOR_ENQUIRY(row._id))} className="font-bold text-slate-900">Build itinerary</button></div> },
    ]} />
    {selected && <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xl overflow-y-auto bg-white p-6 shadow-2xl"><button onClick={() => setSelected(null)} className="font-bold text-orange-600">Close</button><h2 className="mt-4 text-2xl font-black">{selected.name}</h2><div className="mt-4 grid gap-2 text-sm text-slate-700"><p><b>Phone:</b> {selected.phone}</p><p><b>Email:</b> {selected.email}</p><p><b>City:</b> {selected.city}</p><p><b>Trip:</b> {selected.destinations?.join(', ')} · {selected.nights}N/{selected.days}D</p><p><b>Travelers:</b> {selected.travelers?.adults} adults, {selected.travelers?.children?.length || 0} children</p>{selected.travelMonth && <p><b>Travel month:</b> {selected.travelMonth}</p>}{selected.budget && <p><b>Budget:</b> {selected.budget}</p>}{selected.notes && <p><b>Notes:</b> {selected.notes}</p>}</div><select value={selected.status} onChange={(event) => { changeStatus(selected._id, event.target.value); setSelected((item) => ({ ...item, status: event.target.value })) }} className="mt-6 rounded-lg border p-3">{['new', 'contacted', 'itinerary_sent', 'converted', 'closed'].map((item) => <option key={item} value={item}>{item.replace('_', ' ')}</option>)}</select><button onClick={() => navigate(ADMIN_ROUTES.ITINERARY_BUILDER_FOR_ENQUIRY(selected._id))} className="ml-3 rounded-lg bg-slate-900 px-4 py-3 text-sm font-bold text-white">Build itinerary</button></div>}
  </div>
}

export default TripEnquiryListPage
