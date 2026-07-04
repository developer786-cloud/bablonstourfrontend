import CompanyStats from './sections/CompanyStats'
import CompanyStory from './sections/CompanyStory'
import Mission from './sections/Mission'

import Vision from './sections/Vision'
import TestimonialsSection from '../Home/sections/TestimonialsSection'
import WhyChooseUsSection from '../Home/sections/WhyChooseUsSection'
import ContactCTA from '../Home/sections/ContactCTASection'
const AboutPage = () => {
  return (
    <div className="overflow-hidden bg-[#FFFCF7] text-dark-900">
      <CompanyStory />
      <CompanyStats />
      <Mission />
      <Vision />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <ContactCTA />
    </div>
  )
}

export default AboutPage
