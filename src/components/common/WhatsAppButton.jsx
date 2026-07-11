import { FaCommentDots } from 'react-icons/fa'
import { COMPANY_CONTACT } from '../../constants/companyContact'

export const getWhatsAppUrl = ({ phone, message }) => {
  const number = String(phone || import.meta.env.VITE_COMPANY_WHATSAPP || COMPANY_CONTACT.whatsappNumber).replace(/\D/g, '')
  return `https://wa.me/${number}?text=${encodeURIComponent(message || 'Hi Bablons Travel, I want to know more about this package.')}`
}

const WhatsAppButton = ({ phone, message, children = 'WhatsApp', className = '' }) => (
  <a
    href={getWhatsAppUrl({ phone, message })}
    target="_blank"
    rel="noreferrer"
    className={`inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-black text-white transition hover:bg-emerald-700 ${className}`}
  >
    <FaCommentDots /> {children}
  </a>
)

export default WhatsAppButton
