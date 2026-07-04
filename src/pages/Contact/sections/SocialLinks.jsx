import { FaCertificate, FaFacebookF, FaInstagram, FaPinterestP, FaStar, FaTwitter, FaYoutube, FaUsers, FaWhatsapp } from 'react-icons/fa'
import { COMPANY_CONTACT, COMPANY_SOCIALS } from '../../../constants/companyContact'

const socialLinks = [
  { name: 'Facebook', icon: FaFacebookF, url: COMPANY_SOCIALS.facebook, color: 'bg-blue-600' },
  { name: 'Instagram', icon: FaInstagram, url: COMPANY_SOCIALS.instagram, color: 'bg-pink-600' },
  { name: 'X', icon: FaTwitter, url: COMPANY_SOCIALS.x, color: 'bg-slate-950' },
  { name: 'Pinterest', icon: FaPinterestP, url: COMPANY_SOCIALS.pinterest, color: 'bg-red-700' },
  { name: 'YouTube', icon: FaYoutube, url: COMPANY_SOCIALS.youtube, color: 'bg-red-600' },
  { name: 'WhatsApp', icon: FaWhatsapp, url: COMPANY_CONTACT.whatsappUrl, color: 'bg-emerald-600' },
]

const SocialLinks = () => {
  return (
    <div className="grid gap-7 sm:grid-cols-3">
      <div className="border-white/12 sm:border-l sm:pl-7">
        <div className="flex justify-center text-accent-400">
          <FaUsers className="h-14 w-14" />
        </div>
        <div className="mt-2 flex justify-center gap-1 text-accent-400" aria-label="5 star rating">
          {[1, 2, 3].map((star) => (
            <FaStar key={star} className="h-4 w-4" />
          ))}
        </div>
      </div>

      <div className="border-white/12 sm:border-l sm:pl-7">
        <h2 className="text-lg font-extrabold text-white">Follow Us</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {socialLinks.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                aria-label={link.name}
                className={`flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg transition hover:-translate-y-0.5 ${link.color}`}
              >
                <Icon className="h-4 w-4" />
              </a>
            )
          })}
        </div>
      </div>

      <div className="border-white/12 sm:border-l sm:pl-7">
        <h2 className="text-lg font-extrabold text-white">Trusted & Certified</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 text-center">
          <div>
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/18 bg-white/[0.06] text-accent-300">
              <FaCertificate className="h-7 w-7" />
            </span>
            <p className="mt-2 text-sm font-extrabold text-white">IATA</p>
            <p className="mt-1 text-xs text-white/62">Accredited Agent</p>
          </div>
          <div>
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/18 bg-white/[0.06] text-accent-300">
              <FaCertificate className="h-7 w-7" />
            </span>
            <p className="mt-2 text-sm font-extrabold text-white">ISO</p>
            <p className="mt-1 text-xs text-white/62">Certified Company</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SocialLinks
