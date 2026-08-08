import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import MainLayout from '../layouts/MainLayout'
import HomePage from '../../pages/Home/HomePage'
import DestinationsListPage from '../../pages/Destinations/DestinationsListPage'
import DestinationDetailsPage from '../../pages/Destinations/DestinationDetailsPage'
import PackagesListPage from '../../pages/Packages/PackagesListPage'
import PackageDetailsPage from '../../pages/Packages/PackageDetailsPage'
import BlogsListPage from '../../pages/Blogs/BlogsListPage'
import BlogDetailsPage from '../../pages/Blogs/BlogDetailsPage'
import GalleryPage from '../../pages/Gallery/GalleryPage'
import AboutPage from '../../pages/About/AboutPage'
import ContactPage from '../../pages/Contact/ContactPage'
import NewsPage from '../../pages/News/NewsPage'
import SingleNewsPage from '../../pages/News/SingleNewsPage'
import FAQPage from '../../pages/FAQ/FAQPage'
import PrivacyPolicyPage from '../../pages/Privacy/PrivacyPolicyPage'
import TermsPage from '../../pages/Terms/TermsPage'
import NotFoundPage from '../../pages/NotFound/NotFoundPage'
import AdminRouter from './AdminRouter'

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {AdminRouter}

        {/* Main Layout Routes */}
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.DESTINATIONS} element={<DestinationsListPage />} />
          <Route path={ROUTES.PACKAGES} element={<PackagesListPage />} />
          <Route path={ROUTES.BLOGS} element={<BlogsListPage />} />
          <Route path={ROUTES.GALLERY} element={<GalleryPage />} />
          <Route path={ROUTES.ABOUT} element={<AboutPage />} />
          <Route path={ROUTES.NEWS} element={<NewsPage />} />
          <Route path={ROUTES.SINGLE_NEWS} element={<SingleNewsPage />} />
          <Route path={ROUTES.NEWS_CATEGORY} element={<NewsPage />} />
          <Route path={ROUTES.NEWS_COUNTRY} element={<NewsPage />} />
          <Route path={ROUTES.NEWS_CATEGORY_COUNTRY} element={<NewsPage />} />
          <Route path={ROUTES.NEWS_SEARCH} element={<NewsPage />} />
          <Route path={ROUTES.CONTACT} element={<ContactPage />} />
          <Route path={ROUTES.FAQ} element={<FAQPage />} />
          <Route path={ROUTES.FAQ_DUBAI} element={<FAQPage />} />
          <Route path={ROUTES.FAQ_THAI} element={<FAQPage />} />
          <Route path={ROUTES.FAQ_UZB} element={<FAQPage />} />
          <Route path={ROUTES.FAQ_GEORGIA} element={<FAQPage />} />
          <Route path={ROUTES.FAQ_VISA} element={<FAQPage />} />
          <Route path={ROUTES.FAQ_FLIGHT} element={<FAQPage />} />
          <Route path={ROUTES.FAQ_HOTEL} element={<FAQPage />} />
          <Route path={ROUTES.FAQ_PAYMENT} element={<FAQPage />} />
          <Route path={ROUTES.FAQ_EMI} element={<FAQPage />} />
          <Route path={ROUTES.FAQ_PASSPORT} element={<FAQPage />} />
          <Route path={ROUTES.FAQ_INSURANCE} element={<FAQPage />} />
          <Route path={ROUTES.FAQ_HONEYM} element={<FAQPage />} />
          <Route path={ROUTES.FAQ_FAMILY} element={<FAQPage />} />
          <Route path={ROUTES.FAQ_GROUP} element={<FAQPage />} />
          <Route path={ROUTES.FAQ_CORP} element={<FAQPage />} />
          <Route path={ROUTES.FAQ_STUDENT} element={<FAQPage />} />
          <Route path={ROUTES.FAQ_LUXURY} element={<FAQPage />} />
          <Route path={ROUTES.FAQ_BUDGET} element={<FAQPage />} />
          <Route path={ROUTES.FAQ_PACKING} element={<FAQPage />} />
          <Route path={ROUTES.FAQ_SAFETY} element={<FAQPage />} />
          <Route path={ROUTES.PRIVACY} element={<PrivacyPolicyPage />} />
          <Route path={ROUTES.TERMS} element={<TermsPage />} />
           {/* News & Visa Updates — all 5 routes share NewsPage; it reads
              useParams()/useSearchParams() internally to decide hub vs filtered view.
              NEWS_DETAILS is the single-article page. */}
          <Route path={ROUTES.NEWS} element={<NewsPage />} />
          <Route path={ROUTES.NEWS_DETAILS} element={<SingleNewsPage />} />
          <Route path={ROUTES.NEWS_CATEGORY} element={<NewsPage />} />
          <Route path={ROUTES.NEWS_COUNTRY} element={<NewsPage />} />
          <Route path={ROUTES.NEWS_CATEGORY_COUNTRY} element={<NewsPage />} />
          <Route path={ROUTES.NEWS_SEARCH} element={<NewsPage />} />

          {/* Placeholder routes - will be implemented */}
          <Route path={ROUTES.DESTINATION_DETAILS} element={<DestinationDetailsPage />} />
          <Route path={ROUTES.PACKAGE_DETAILS} element={<PackageDetailsPage />} />
          <Route path={ROUTES.BLOG_DETAILS} element={<BlogDetailsPage />} />
          <Route path={ROUTES.GALLERY_DESTINATION} element={<div className="min-h-screen flex items-center justify-center">Destination Gallery - Coming Soon</div>} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRouter
