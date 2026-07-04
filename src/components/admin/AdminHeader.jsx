import { FaBars, FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import useAuth from '../../hooks/useAuth'

const AdminHeader = ({ onMenu, collapsed, onCollapse }) => {
  const { user } = useAuth()
  return (
    <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between gap-3 border-b border-slate-200 bg-white/90 px-4 py-2 backdrop-blur lg:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button onClick={onMenu} className="rounded-lg border border-slate-200 p-2 lg:hidden"><FaBars /></button>
        <button onClick={onCollapse} className="hidden rounded-lg border border-slate-200 p-2 lg:inline-flex">{collapsed ? <FaChevronRight /> : <FaChevronLeft />}</button>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wide text-orange-600">Bablons Tours & Entertainments</p>
          <h1 className="text-lg font-black text-slate-900">Admin Dashboard</h1>
        </div>
      </div>
      <div className="hidden min-w-0 max-w-[42vw] text-right sm:block">
        <p className="truncate text-sm font-black text-slate-900">{user?.name}</p>
        <p className="truncate text-xs text-slate-500">{user?.email}</p>
      </div>
    </header>
  )
}

export default AdminHeader
