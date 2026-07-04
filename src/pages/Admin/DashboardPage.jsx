import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaArrowRight,
  FaBlog,
  FaCalendarDays,
  FaEnvelope,
  FaImage,
  FaLocationDot,
  FaNewspaper,
  FaPhone,
  FaPlus,
  FaSuitcaseRolling,
  FaUserGear,
  FaUsers,
} from 'react-icons/fa6'
import { toast } from 'react-toastify'
import DashboardStatCard from '../../components/admin/DashboardStatCard'
import DataTable from '../../components/admin/DataTable'
import StatusBadge from '../../components/admin/StatusBadge'
import { dashboardService } from '../../services/dashboardService'
import useAuth from '../../hooks/useAuth'

const formatDate = (date) => (date ? new Date(date).toLocaleDateString() : '-')
const formatRole = (role) => String(role || 'admin').replace('_', ' ')

const SectionHeader = ({ title, description, action }) => (
  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <h2 className="text-lg font-black text-slate-950">{title}</h2>
      {description ? <p className="text-sm text-slate-500">{description}</p> : null}
    </div>
    {action}
  </div>
)

const QuickActionCard = ({ label, description, path, icon: Icon, tone = 'orange' }) => {
  const tones = {
    orange: 'bg-orange-500 text-white',
    blue: 'bg-blue-600 text-white',
    green: 'bg-emerald-600 text-white',
    purple: 'bg-purple-600 text-white',
    slate: 'bg-slate-900 text-white',
  }

  return (
    <Link
      to={path}
      className="group flex min-h-28 items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
    >
      <div>
        <span className={`mb-3 grid h-10 w-10 place-items-center rounded-lg ${tones[tone]}`}>
          <Icon />
        </span>
        <p className="font-black text-slate-950">{label}</p>
        <p className="mt-1 text-sm leading-5 text-slate-500">{description}</p>
      </div>
      <FaArrowRight className="mt-1 text-slate-300 transition group-hover:translate-x-1 group-hover:text-orange-500" />
    </Link>
  )
}

const ModuleCard = ({ label, value, helper, path, icon: Icon, cta = 'Open' }) => (
  <Link
    to={path}
    className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-orange-200 hover:shadow-md"
  >
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-bold text-slate-500">{label}</p>
        <p className="mt-2 text-3xl font-black text-slate-950">{value ?? 0}</p>
        {helper ? <p className="mt-1 text-xs font-semibold text-slate-400">{helper}</p> : null}
      </div>
      <span className="grid h-11 w-11 place-items-center rounded-lg bg-orange-50 text-orange-600">
        <Icon />
      </span>
    </div>
    <p className="mt-4 inline-flex items-center gap-2 text-sm font-black text-orange-600">
      {cta} <FaArrowRight className="text-xs" />
    </p>
  </Link>
)

const DashboardPage = () => {
  const { user } = useAuth()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dashboardService.overview().then(setData).catch((error) => toast.error(error.response?.data?.message || 'Dashboard failed')).finally(() => setLoading(false))
  }, [])

  const isSuperAdmin = user?.role === 'super_admin'
  const packageHealth = `${data?.activePackages ?? 0} published / ${data?.draftPackages ?? 0} draft / ${data?.archivedPackages ?? 0} archived`

  const quickActions = isSuperAdmin
    ? [
        { label: 'Create Package', description: 'Add a new tour package and publish it when ready.', path: '/admin/packages/new', icon: FaPlus, tone: 'orange' },
        { label: 'Add Destination', description: 'Create country, city, and destination content.', path: '/admin/destinations/new', icon: FaLocationDot, tone: 'blue' },
        { label: 'Upload Media', description: 'Manage Cloudinary images for website content.', path: '/admin/media', icon: FaImage, tone: 'green' },
        { label: 'Add Admin User', description: 'Create or manage back-office team access.', path: '/admin/users', icon: FaUserGear, tone: 'purple' },
      ]
    : [
        { label: 'View Enquiries', description: 'Open new customer enquiries and follow-ups.', path: '/admin/enquiries', icon: FaUsers, tone: 'orange' },
        { label: 'View Packages', description: 'Check package details and availability.', path: '/admin/packages', icon: FaSuitcaseRolling, tone: 'blue' },
        { label: 'View Destinations', description: 'Browse active destination records.', path: '/admin/destinations', icon: FaLocationDot, tone: 'green' },
      ]

  const modules = [
    { label: 'Packages', value: data?.totalPackages, helper: packageHealth, path: '/admin/packages', icon: FaSuitcaseRolling, cta: 'Manage packages' },
    { label: 'Destinations', value: data?.totalDestinations, helper: 'Countries, cities, and travel places', path: '/admin/destinations', icon: FaLocationDot, cta: 'Manage destinations' },
    { label: 'Enquiries', value: data?.totalInquiries, helper: `${data?.newInquiries ?? 0} new / ${data?.followUpInquiries ?? 0} follow-up`, path: '/admin/enquiries', icon: FaUsers, cta: 'Open enquiries' },
    { label: 'Contact Messages', value: data?.contactMessages, helper: `${data?.newContactMessages ?? 0} new messages`, path: '/admin/contact-messages', icon: FaEnvelope, cta: 'View messages' },
  ]

  const superAdminModules = [
    { label: 'Blogs', value: data?.blogs, helper: `${data?.publishedBlogs ?? 0} published posts`, path: '/admin/blogs', icon: FaBlog, cta: 'Manage blogs' },
    { label: 'Testimonials', value: data?.testimonials, helper: 'Traveler trust and review content', path: '/admin/testimonials', icon: FaNewspaper, cta: 'Manage testimonials' },
    { label: 'Newsletter', value: data?.newsletterSubscribers, helper: 'Active subscribers', path: '/admin/newsletter', icon: FaEnvelope, cta: 'View subscribers' },
    { label: 'Admin Users', value: data?.totalAdmins, helper: `${data?.disabledAdmins ?? 0} disabled accounts`, path: '/admin/users', icon: FaUserGear, cta: 'Manage users' },
    { label: 'Media Library', value: 'Upload', helper: 'Images and website media', path: '/admin/media', icon: FaImage, cta: 'Open media' },
    { label: 'Settings', value: 'Config', helper: 'Company and website settings', path: '/admin/settings', icon: FaUserGear, cta: 'Open settings' },
  ]

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl bg-slate-950 shadow-sm">
        <div className="grid gap-6 p-6 text-white lg:grid-cols-[1fr_320px] lg:p-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-300">{formatRole(user?.role)} control panel</p>
            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Dashboard Overview</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/68">
              Complete business summary for packages, enquiries, destinations, content, media, and admin operations.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/10 p-4">
            <p className="text-sm font-bold text-white/62">Logged in as</p>
            <p className="mt-1 text-lg font-black">{user?.name || 'Admin user'}</p>
            <p className="mt-1 text-sm text-white/60">{user?.email}</p>
            <span className="mt-4 inline-flex rounded-full bg-orange-500 px-3 py-1 text-xs font-black uppercase tracking-wide text-white">
              {formatRole(user?.role)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard icon={FaSuitcaseRolling} label="Total Packages" value={data?.totalPackages} />
        <DashboardStatCard icon={FaSuitcaseRolling} label="Active Packages" value={data?.activePackages} tone="green" />
        <DashboardStatCard icon={FaSuitcaseRolling} label="Draft Packages" value={data?.draftPackages} tone="blue" />
        <DashboardStatCard icon={FaLocationDot} label="Total Destinations" value={data?.totalDestinations} tone="blue" />
        <DashboardStatCard icon={FaPhone} label="Total Enquiries" value={data?.totalInquiries} tone="purple" />
        <DashboardStatCard label="New Enquiries" value={data?.newInquiries} tone="blue" />
        <DashboardStatCard label="Follow Ups" value={data?.followUpInquiries} tone="purple" />
        <DashboardStatCard label="Contacted Enquiries" value={data?.contactedInquiries} />
        <DashboardStatCard label="Converted Enquiries" value={data?.convertedInquiries} tone="green" />
        <DashboardStatCard icon={FaCalendarDays} label="Upcoming Departures" value={data?.upcomingGroupDepartures?.length} />
      </div>

      <section>
        <SectionHeader title="Quick Actions" description="Most-used super-admin operations with direct working routes." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((action) => <QuickActionCard key={action.label} {...action} />)}
        </div>
      </section>

      <section>
        <SectionHeader title="Management Modules" description="Everything important is visible from the first page." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[...modules, ...(isSuperAdmin ? superAdminModules : [])].map((module) => <ModuleCard key={module.label} {...module} />)}
        </div>
      </section>

      <section>
        <SectionHeader
          title="Recent Enquiries"
          description="Latest package and trip requests from customers."
          action={<Link to="/admin/enquiries" className="text-sm font-black text-orange-600">View all enquiries</Link>}
        />
        <DataTable
          loading={loading}
          rows={data?.recentInquiries || []}
          columns={[
            { key: 'fullName', label: 'Customer Name' },
            { key: 'phone', label: 'Phone' },
            { key: 'packageTitle', label: 'Package' },
            { key: 'destination', label: 'Destination' },
            { key: 'travelers', label: 'Travelers' },
            { key: 'travelDate', label: 'Travel Date', render: (row) => formatDate(row.travelDate) },
            { key: 'status', label: 'Status', render: (row) => <StatusBadge value={row.status} /> },
            { key: 'createdAt', label: 'Created Date', render: (row) => formatDate(row.createdAt) },
            { key: 'actions', label: 'Action', render: () => <Link to="/admin/enquiries" className="font-black text-orange-600">Open</Link> },
          ]}
        />
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <section>
          <SectionHeader
            title="Contact Messages"
            description="Recent direct website messages."
            action={<Link to="/admin/contact-messages" className="text-sm font-black text-orange-600">View all messages</Link>}
          />
          <DataTable
            loading={loading}
            rows={data?.recentContacts || []}
            emptyText="No recent contact messages"
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'subject', label: 'Subject' },
              { key: 'status', label: 'Status', render: (row) => <StatusBadge value={row.status} /> },
              { key: 'createdAt', label: 'Created', render: (row) => formatDate(row.createdAt) },
            ]}
          />
        </section>

        <section>
          <SectionHeader title="Upcoming Departures" description="Next group tour seats and status." />
          <DataTable
            loading={loading}
            rows={data?.upcomingGroupDepartures || []}
            emptyText="No upcoming group departures"
            columns={[
              { key: 'title', label: 'Package Name' },
              { key: 'departureDate', label: 'Departure Date', render: (row) => formatDate(row.departure?.departureDate) },
              { key: 'totalSeats', label: 'Seats', render: (row) => `${row.departure?.availableSeats ?? 0}/${row.departure?.totalSeats ?? 0}` },
              { key: 'status', label: 'Status', render: (row) => <StatusBadge value={row.departure?.status} /> },
            ]}
          />
        </section>
      </div>
    </div>
  )
}

export default DashboardPage
