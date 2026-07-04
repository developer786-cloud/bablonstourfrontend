import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import DataTable from '../../../components/admin/DataTable'
import StatusBadge from '../../../components/admin/StatusBadge'
import { authService } from '../../../services/authService'

const AdminUsersPage = () => {
  const [users, setUsers] = useState([])
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const load = useCallback(() => {
    authService.listAdmins().then(setUsers).catch(() => toast.error('Failed to load admin users'))
  }, [])

  useEffect(() => {
    load()
  }, [load])
  const create = async (e) => { e.preventDefault(); await authService.createAdmin(form); toast.success('Admin created'); setForm({ name: '', email: '', password: '' }); load() }
  const toggle = async (row) => { await authService.updateAdminStatus(row._id, !row.isActive); toast.success('Admin status updated'); load() }
  return <div className="space-y-4"><h1 className="text-2xl font-black">Admin Users</h1><form onSubmit={create} className="grid gap-3 rounded-xl bg-white p-4 shadow-sm md:grid-cols-4"><input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-lg border p-3" /><input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="rounded-lg border p-3" /><input required type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="rounded-lg border p-3" /><button className="rounded-lg bg-orange-500 px-4 py-2 font-black text-white">Create Admin</button></form><DataTable rows={users} columns={[{ key: 'name', label: 'Name' }, { key: 'email', label: 'Email' }, { key: 'role', label: 'Role' }, { key: 'isActive', label: 'Active Status', render: (row) => <StatusBadge value={row.isActive ? 'active' : 'inactive'} /> }, { key: 'lastLogin', label: 'Last Login', render: (row) => row.lastLogin ? new Date(row.lastLogin).toLocaleString() : '-' }, { key: 'createdAt', label: 'Created Date', render: (row) => new Date(row.createdAt).toLocaleDateString() }, { key: 'actions', label: 'Actions', render: (row) => <button onClick={() => toggle(row)} className="font-bold text-orange-600">{row.isActive ? 'Disable' : 'Enable'}</button> }]} /></div>
}

export default AdminUsersPage
