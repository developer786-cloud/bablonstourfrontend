import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import DataTable from '../../../components/admin/DataTable'
import StatusBadge from '../../../components/admin/StatusBadge'
import { contactService } from '../../../services/contactService'

const ContactMessagesPage = () => {
  const [data, setData] = useState({ contacts: [] })
  const load = useCallback(() => {
    contactService.list().then(setData).catch(() => toast.error('Failed to load contacts'))
  }, [])

  useEffect(() => {
    load()
  }, [load])
  const update = async (id, status) => { await contactService.updateStatus(id, status); toast.success('Status updated'); load() }
  return <div className="space-y-4"><h1 className="text-2xl font-black">Contact Messages</h1><DataTable rows={data.contacts || data.items || []} columns={[{ key: 'fullName', label: 'Name' }, { key: 'phone', label: 'Phone' }, { key: 'email', label: 'Email' }, { key: 'subject', label: 'Subject' }, { key: 'status', label: 'Status', render: (row) => <StatusBadge value={row.status} /> }, { key: 'actions', label: 'Actions', render: (row) => <select value={row.status} onChange={(e) => update(row._id, e.target.value)} className="rounded border p-2"><option value="new">New</option><option value="read">Read</option><option value="replied">Replied</option><option value="closed">Closed</option></select> }]} /></div>
}

export default ContactMessagesPage
