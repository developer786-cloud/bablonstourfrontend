import { Navigate, Route } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import ProtectedRoute from '../../components/admin/ProtectedRoute'
import RoleRoute from '../../components/admin/RoleRoute'
import LoginPage from '../../pages/Admin/LoginPage'
import DashboardPage from '../../pages/Admin/DashboardPage'
import PackageListPage from '../../pages/Admin/Packages/PackageListPage'
import PackageFormPage from '../../pages/Admin/Packages/PackageFormPage'
import PackageDetailsPage from '../../pages/Admin/Packages/PackageDetailsPage'
import DestinationListPage from '../../pages/Admin/Destinations/DestinationListPage'
import DestinationFormPage from '../../pages/Admin/Destinations/DestinationFormPage'
import EnquiryListPage from '../../pages/Admin/Enquiries/EnquiryListPage'
import ContactMessagesPage from '../../pages/Admin/Contacts/ContactMessagesPage'
import AdminUsersPage from '../../pages/Admin/Users/AdminUsersPage'
import MediaLibraryPage from '../../pages/Admin/Media/MediaLibraryPage'
import SimpleContentPage from '../../pages/Admin/Content/SimpleContentPage'
import ProfilePage from '../../pages/Admin/Profile/ProfilePage'
import SettingsPage from '../../pages/Admin/SettingsPage'

const AdminRouter = (
  <>
    <Route path="/admin/login" element={<LoginPage />} />
    <Route element={<ProtectedRoute />}>
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/packages" element={<PackageListPage />} />
        <Route path="/admin/packages/:id" element={<PackageDetailsPage />} />
        <Route element={<RoleRoute roles={['super_admin']} />}>
          <Route path="/admin/packages/new" element={<PackageFormPage />} />
          <Route path="/admin/packages/:id/edit" element={<PackageFormPage />} />
          <Route path="/admin/destinations/new" element={<DestinationFormPage />} />
          <Route path="/admin/destinations/:id/edit" element={<DestinationFormPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/media" element={<MediaLibraryPage />} />
          <Route path="/admin/testimonials" element={<SimpleContentPage type="testimonials" />} />
          <Route path="/admin/blogs" element={<SimpleContentPage type="blogs" />} />
          <Route path="/admin/newsletter" element={<SimpleContentPage type="newsletter" />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
        </Route>
        <Route path="/admin/destinations" element={<DestinationListPage />} />
        <Route path="/admin/enquiries" element={<EnquiryListPage />} />
        <Route path="/admin/contact-messages" element={<ContactMessagesPage />} />
        <Route path="/admin/profile" element={<ProfilePage />} />
      </Route>
    </Route>
  </>
)

export default AdminRouter
