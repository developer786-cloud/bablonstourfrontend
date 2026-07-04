import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const RoleRoute = ({ roles = [] }) => {
  const { user } = useAuth()

  if (!roles.includes(user?.role)) {
    return <Navigate to="/admin/dashboard" replace />
  }

  return <Outlet />
}

export default RoleRoute
