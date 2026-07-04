// Public Routes
export const PUBLIC_ROUTES = {
  HOME: '/',
  DESTINATIONS: '/destinations',
  DESTINATION_DETAILS: '/destinations/:countrySlug/:citySlug',
  PACKAGES: '/packages',
  PACKAGE_DETAILS: '/packages/:slug',
  BLOGS: '/blogs',
  BLOG_DETAILS: '/blogs/:slug',
  GALLERY: '/gallery',
  GALLERY_DESTINATION: '/gallery/:destinationId',
  ABOUT: '/about',
  CONTACT: '/contact',
  FAQ: '/faq',
  PRIVACY: '/privacy-policy',
  TERMS: '/terms-and-conditions',
  NOT_FOUND: '/404',
}

// Private Routes (Future)
export const PRIVATE_ROUTES = {
  DASHBOARD: '/dashboard',
  BOOKINGS: '/dashboard/bookings',
  SAVED_PACKAGES: '/dashboard/saved-packages',
  PROFILE: '/dashboard/profile',
  SETTINGS: '/dashboard/settings',
}

// Admin Routes (Future)
export const ADMIN_ROUTES = {
  ADMIN_DASHBOARD: '/admin',
  ADMIN_PACKAGES: '/admin/packages',
  ADMIN_DESTINATIONS: '/admin/destinations',
  ADMIN_BLOGS: '/admin/blogs',
  ADMIN_LEADS: '/admin/leads',
  ADMIN_BOOKINGS: '/admin/bookings',
  ADMIN_SETTINGS: '/admin/settings',
}

// Combine all routes
export const ROUTES = {
  ...PUBLIC_ROUTES,
  ...PRIVATE_ROUTES,
  ...ADMIN_ROUTES,
}

export default ROUTES
