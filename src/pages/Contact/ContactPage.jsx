import ContactHero from './sections/ContactHero'
import ContactForm from './sections/ContactForm'
import GoogleMap from './sections/GoogleMap'
import OfficeInfo from './sections/OfficeInfo'
import SocialLinks from './sections/SocialLinks'
import WhatsappSection from './sections/WhatsappSection'
import { COMPANY_CONTACT } from '../../constants/companyContact'

const contactDetails = {
  company: 'Bablons Tours & Entertainments',
  phone: COMPANY_CONTACT.phoneDisplay,
  phoneHref: COMPANY_CONTACT.phoneHref,
  email: COMPANY_CONTACT.email,
  emailHref: COMPANY_CONTACT.emailHref,
  address: '28.6292858, 77.0755844',
  mapUrl: 'https://www.google.com/maps/place/28%C2%B037%2745.4%22N+77%C2%B004%2732.1%22E/@28.6292858,77.0730095,17z/data=!3m1!4b1!4m4!3m3!8m2!3d28.6292858!4d77.0755844?hl=en&entry=ttu',
  mapEmbedUrl: 'https://www.google.com/maps?q=28.6292858,77.0755844&z=17&output=embed',
  hours: COMPANY_CONTACT.hours,
  whatsappUrl: COMPANY_CONTACT.whatsappUrl,
}

const ContactPage = () => {
  return (
    <div className="bg-[#FFFCF7] text-dark-900">
      <ContactHero />
      <section className="relative overflow-hidden py-14 md:py-16 lg:py-20">
        <div className="absolute left-0 top-12 hidden h-72 w-72 rounded-full bg-secondary-500/10 blur-3xl lg:block" />
        <div className="absolute right-0 top-0 hidden h-[28rem] w-[38rem] bg-[radial-gradient(circle_at_center,rgba(16,39,36,0.08),transparent_65%)] lg:block" />

        <div className="section-container relative">
          <div className="grid gap-9 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <OfficeInfo contactDetails={contactDetails} />
            <ContactForm contactDetails={contactDetails} />
          </div>

          <GoogleMap contactDetails={contactDetails} />
        </div>
      </section>
      <section className="bg-dark-900 py-10 text-white">
        <div className="section-container grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <WhatsappSection contactDetails={contactDetails} />
          <SocialLinks />
        </div>
      </section>
    </div>
  )
}

export default ContactPage
