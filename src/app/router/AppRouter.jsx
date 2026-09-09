import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import MainLayout from '../layouts/MainLayout'
import AdminRouter from './AdminRouter'

const HomePage = lazy(() => import('../../pages/Home/HomePage'))
const DestinationsListPage = lazy(() => import('../../pages/Destinations/DestinationsListPage'))
const DestinationDetailsPage = lazy(() => import('../../pages/Destinations/DestinationDetailsPage'))
const PackagesListPage = lazy(() => import('../../pages/Packages/PackagesListPage'))
const PackageDetailsPage = lazy(() => import('../../pages/Packages/PackageDetailsPage'))
const BlogsListPage = lazy(() => import('../../pages/Blogs/BlogsListPage'))
const BlogDetailsPage = lazy(() => import('../../pages/Blogs/BlogDetailsPage'))
const GalleryPage = lazy(() => import('../../pages/Gallery/GalleryPage'))
const AboutPage = lazy(() => import('../../pages/About/AboutPage'))
const ContactPage = lazy(() => import('../../pages/Contact/ContactPage'))
const NewsPage = lazy(() => import('../../pages/News/NewsPage'))
const SingleNewsPage = lazy(() => import('../../pages/News/SingleNewsPage'))
const FAQPage = lazy(() => import('../../pages/FAQ/FAQPage'))
const PrivacyPolicyPage = lazy(() => import('../../pages/Privacy/PrivacyPolicyPage'))
const TermsPage = lazy(() => import('../../pages/Terms/TermsPage'))
const NotFoundPage = lazy(() => import('../../pages/NotFound/NotFoundPage'))
const TripPlannerPage = lazy(() => import('../../pages/TripPlanner/TripPlannerPage'))

const LazyPage = ({ component: Component }) => (
  <Suspense
    fallback={
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600">
        Loading...
      </div>
    }
  >
    <Component />
  </Suspense>
)

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {AdminRouter}

        {/* Main Layout Routes */}
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<LazyPage component={HomePage} />} />
          <Route path={ROUTES.DESTINATIONS} element={<LazyPage component={DestinationsListPage} />} />
          <Route path={ROUTES.PACKAGES} element={<LazyPage component={PackagesListPage} />} />
          <Route path={ROUTES.BLOGS} element={<LazyPage component={BlogsListPage} />} />
          <Route path={ROUTES.GALLERY} element={<LazyPage component={GalleryPage} />} />
          <Route path={ROUTES.ABOUT} element={<LazyPage component={AboutPage} />} />
          <Route path={ROUTES.NEWS} element={<LazyPage component={NewsPage} />} />
          <Route path={ROUTES.NEWS_DETAILS} element={<LazyPage component={SingleNewsPage} />} />
          <Route path={ROUTES.NEWS_CATEGORY} element={<LazyPage component={NewsPage} />} />
          <Route path={ROUTES.NEWS_COUNTRY} element={<LazyPage component={NewsPage} />} />
          <Route path={ROUTES.NEWS_CATEGORY_COUNTRY} element={<LazyPage component={NewsPage} />} />
          <Route path={ROUTES.NEWS_SEARCH} element={<LazyPage component={NewsPage} />} />
          <Route path={ROUTES.CONTACT} element={<LazyPage component={ContactPage} />} />
          <Route path={ROUTES.FAQ} element={<LazyPage component={FAQPage} />} />
          <Route path={ROUTES.FAQ_DUBAI} element={<LazyPage component={FAQPage} />} />
          <Route path={ROUTES.FAQ_THAI} element={<LazyPage component={FAQPage} />} />
          <Route path={ROUTES.FAQ_UZB} element={<LazyPage component={FAQPage} />} />
          <Route path={ROUTES.FAQ_GEORGIA} element={<LazyPage component={FAQPage} />} />
          <Route path={ROUTES.FAQ_VISA} element={<LazyPage component={FAQPage} />} />
          <Route path={ROUTES.FAQ_FLIGHT} element={<LazyPage component={FAQPage} />} />
          <Route path={ROUTES.FAQ_HOTEL} element={<LazyPage component={FAQPage} />} />
          <Route path={ROUTES.FAQ_PAYMENT} element={<LazyPage component={FAQPage} />} />
          <Route path={ROUTES.FAQ_EMI} element={<LazyPage component={FAQPage} />} />
          <Route path={ROUTES.FAQ_PASSPORT} element={<LazyPage component={FAQPage} />} />
          <Route path={ROUTES.FAQ_INSURANCE} element={<LazyPage component={FAQPage} />} />
          <Route path={ROUTES.FAQ_HONEYM} element={<LazyPage component={FAQPage} />} />
          <Route path={ROUTES.FAQ_FAMILY} element={<LazyPage component={FAQPage} />} />
          <Route path={ROUTES.TRIP_PLANNER} element={<LazyPage component={TripPlannerPage} />} />
          <Route path={ROUTES.FAQ_GROUP} element={<LazyPage component={FAQPage} />} />
          <Route path={ROUTES.FAQ_CORP} element={<LazyPage component={FAQPage} />} />
          <Route path={ROUTES.FAQ_STUDENT} element={<LazyPage component={FAQPage} />} />
          <Route path={ROUTES.FAQ_LUXURY} element={<LazyPage component={FAQPage} />} />
          <Route path={ROUTES.FAQ_BUDGET} element={<LazyPage component={FAQPage} />} />
          <Route path={ROUTES.FAQ_PACKING} element={<LazyPage component={FAQPage} />} />
          <Route path={ROUTES.FAQ_SAFETY} element={<LazyPage component={FAQPage} />} />
          <Route path={ROUTES.PRIVACY} element={<LazyPage component={PrivacyPolicyPage} />} />
          <Route path={ROUTES.TERMS} element={<LazyPage component={TermsPage} />} />

          {/* Placeholder routes - will be implemented */}
          <Route path={ROUTES.DESTINATION_DETAILS} element={<LazyPage component={DestinationDetailsPage} />} />
          <Route path={ROUTES.PACKAGE_DETAILS} element={<LazyPage component={PackageDetailsPage} />} />
          <Route path={ROUTES.BLOG_DETAILS} element={<LazyPage component={BlogDetailsPage} />} />
          <Route path={ROUTES.GALLERY_DESTINATION} element={<div className="min-h-screen flex items-center justify-center">Destination Gallery - Coming Soon</div>} />
          <Route path="*" element={<LazyPage component={NotFoundPage} />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRouter
