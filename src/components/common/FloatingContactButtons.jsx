import { FaCommentDots, FaPhoneAlt } from 'react-icons/fa'
import { COMPANY_CONTACT } from '../../constants/companyContact'
import { getWhatsAppUrl } from './WhatsAppButton'

const FloatingContactButtons = () => {
  const whatsappUrl = getWhatsAppUrl({
    message: 'Hi Bablons Travel, I need help planning my trip.',
  })

  return (
    <div className="fixed bottom-5 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-7 sm:right-6">
      <a
        href={COMPANY_CONTACT.phoneHref}
        aria-label={`Call Bablons Travel at ${COMPANY_CONTACT.phoneDisplay}`}
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-primary-900 text-white shadow-[0_16px_36px_rgba(9,50,79,0.28)] ring-1 ring-white/45 transition hover:-translate-y-0.5 hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-200 sm:h-16 sm:w-16"
      >
        <FaPhoneAlt className="h-5 w-5 transition group-hover:scale-110 sm:h-6 sm:w-6" />
      </a>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Bablons Travel on WhatsApp"
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-[0_16px_36px_rgba(5,150,105,0.3)] ring-1 ring-white/45 transition hover:-translate-y-0.5 hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200 sm:h-16 sm:w-16"
      >
        <FaCommentDots className="h-6 w-6 transition group-hover:scale-110 sm:h-7 sm:w-7" />
      </a>
    </div>
  )
}

export default FloatingContactButtons
