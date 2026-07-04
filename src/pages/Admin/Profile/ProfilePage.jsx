import useAuth from '../../../hooks/useAuth'

const ProfilePage = () => {
  const { user } = useAuth()
  return <div className="rounded-xl bg-white p-6 shadow-sm"><h1 className="text-2xl font-black">Profile</h1><p className="mt-4"><strong>Name:</strong> {user?.name}</p><p><strong>Email:</strong> {user?.email}</p><p><strong>Role:</strong> {user?.role}</p></div>
}

export default ProfilePage
