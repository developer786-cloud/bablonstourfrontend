import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import DataTable from '../../../components/admin/DataTable'
import SearchFilterBar from '../../../components/admin/SearchFilterBar'
import StatusBadge from '../../../components/admin/StatusBadge'
import { inquiryService } from '../../../services/inquiryService'

const EnquiryListPage = () => {
  const [data, setData] = useState({ inquiries: [] })
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [note, setNote] = useState('')
  const load = useCallback(() => inquiryService.list({ search }).then(setData).catch(() => toast.error('Failed to load enquiries')), [search])
  useEffect(() => {
    load()
  }, [load])
  const updateStatus = async (id, status) => { await inquiryService.updateStatus(id, status); toast.success('Status updated'); load() }
  const addNote = async () => { await inquiryService.addNote(selected._id, note); toast.success('Note added'); setNote(''); const fresh = await inquiryService.get(selected._id); setSelected(fresh); load() }
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-black">Enquiries</h1>
      <SearchFilterBar search={search} onSearch={setSearch}><button onClick={load} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-bold text-white">Search</button></SearchFilterBar>
      <DataTable rows={data.inquiries || data.items || []} columns={[
        { key: 'fullName', label: 'Customer Name' }, { key: 'phone', label: 'Phone' }, { key: 'email', label: 'Email' }, { key: 'packageTitle', label: 'Package' }, { key: 'destination', label: 'Destination' }, { key: 'travelers', label: 'Travelers' }, { key: 'travelStyle', label: 'Travel Style' }, { key: 'source', label: 'Source' }, { key: 'status', label: 'Status', render: (row) => <StatusBadge value={row.status} /> }, { key: 'actions', label: 'Actions', render: (row) => <button onClick={() => inquiryService.get(row._id).then(setSelected)} className="font-bold text-orange-600">View</button> },
      ]} />
      {selected ? <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xl overflow-y-auto bg-white p-6 shadow-2xl"><button onClick={() => setSelected(null)} className="mb-4 font-bold text-orange-600">Close</button><h2 className="text-2xl font-black">{selected.fullName}</h2><p className="mt-2 text-slate-600">{selected.message}</p><select value={selected.status} onChange={(e) => updateStatus(selected._id, e.target.value)} className="mt-4 rounded-lg border p-3"><option value="new">New</option><option value="contacted">Contacted</option><option value="follow_up">Follow up</option><option value="converted">Converted</option><option value="closed">Closed</option></select><h3 className="mt-6 font-black">Notes</h3>{selected.notes?.map((n) => <p key={n._id} className="mt-2 rounded-lg bg-slate-100 p-3 text-sm">{n.text}</p>)}<textarea value={note} onChange={(e) => setNote(e.target.value)} className="mt-3 w-full rounded-lg border p-3" placeholder="Add follow-up note" /><button onClick={addNote} className="mt-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-black text-white">Add Note</button></div> : null}
    </div>
  )
}

export default EnquiryListPage
