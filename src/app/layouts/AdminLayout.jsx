import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import AdminHeader from '../../components/admin/AdminHeader'
import AdminSidebar from '../../components/admin/AdminSidebar'

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-[#F7F5F0] lg:flex">
      {mobileOpen ? <button aria-label="Close menu" className="fixed inset-0 z-30 bg-slate-950/50 lg:hidden" onClick={() => setMobileOpen(false)} /> : null}
      <AdminSidebar open={mobileOpen} collapsed={collapsed} onClose={() => setMobileOpen(false)} />
      <div className="min-w-0 flex-1">
        <AdminHeader onMenu={() => setMobileOpen(true)} collapsed={collapsed} onCollapse={() => setCollapsed((value) => !value)} />
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
