import HeroSection from './sections/HeroSection'
import SearchPackagesSection from './sections/SearchPackagesSection'
import PopularDestinationsSection from './sections/PopularDestinationsSection'
import RouteDivider from './sections/RouteDivider'
import FeaturedPackagesSection from './sections/FeaturedPackagesSection'
import WhyChooseUsSection from './sections/WhyChooseUsSection'
import TravelGallery from './sections/TravelGallery'
import TestimonialsSection from './sections/TestimonialsSection'
import LatestBlogsSection from './sections/LatestBlogsSection'
import ContactCTASection from './sections/ContactCTASection'
import FaqSection from './sections/FaqSection'

const HomePage = () => {
  return (
    <div className="w-full overflow-hidden bg-[#FAF8F4] text-dark-900">
      <HeroSection />
      <SearchPackagesSection />
      <PopularDestinationsSection />
      <RouteDivider />
      <FeaturedPackagesSection />
      <WhyChooseUsSection />
      <TravelGallery />
      <TestimonialsSection />
      <LatestBlogsSection />
      <ContactCTASection />
      <FaqSection />
    </div>
  )
}

export default HomePage