import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  FaArrowRight,
  FaCalendarAlt,
  FaCar,
  FaClock,
  FaFacebookF,
  FaGlobeAsia,
  FaHome,
  FaHeadset,
  FaHotel,
  FaInstagram,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaPinterestP,
  FaPlane,
  FaShieldAlt,
  FaSuitcaseRolling,
  FaTags,
  FaTwitter,
  FaUsers,
  FaWhatsapp,
  FaYoutube,
} from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { ROUTES } from '../../constants/routes'
import { COMPANY_CONTACT, COMPANY_SOCIALS } from '../../constants/companyContact'
import bablonsLogo from '../../assets/logos/Bablons Logo.png'
import footerBg from '../../assets/images/Hero Section Bg 5.jpg'

const footerLinks = {
  Company: [
    { name: 'About Us', path: ROUTES.ABOUT },
    { name: 'Our Story', path: ROUTES.ABOUT },
    { name: 'Blog', path: ROUTES.BLOGS },
    { name: 'Gallery', path: ROUTES.GALLERY },
    { name: 'Careers', path: ROUTES.CONTACT },
    { name: 'Contact Us', path: ROUTES.CONTACT },
  ],
  Destinations: [
    { name: 'Uzbekistan', path: ROUTES.DESTINATIONS },
    { name: 'Georgia', path: ROUTES.DESTINATIONS },
    { name: 'Azerbaijan', path: ROUTES.DESTINATIONS },
    { name: 'Turkey', path: ROUTES.DESTINATIONS },
    { name: 'Thailand', path: ROUTES.DESTINATIONS },
    { name: 'Dubai', path: ROUTES.DESTINATIONS },
    { name: 'Bali', path: ROUTES.DESTINATIONS },
    { name: 'View All Destinations', path: ROUTES.DESTINATIONS },
  ],
  Support: [
    { name: 'Contact Us', path: ROUTES.CONTACT },
    { name: 'FAQ', path: ROUTES.FAQ },
    { name: 'Privacy Policy', path: ROUTES.PRIVACY },
    { name: 'Terms & Conditions', path: ROUTES.TERMS },
    { name: 'Payment Policy', path: ROUTES.TERMS },
    { name: 'Cancellation Policy', path: ROUTES.TERMS },
  ],
}

const services = [
  { icon: FaHotel, name: 'Custom Tour Packages' },
  { icon: FaHotel, name: 'Hotel Bookings' },
  { icon: FaShieldAlt, name: 'Visa Assistance' },
  { icon: FaCar, name: 'Airport Transfers' },
  { icon: FaShieldAlt, name: 'Travel Insurance' },
  { icon: FaUsers, name: 'MICE & Group Travel' },
]

const socialLinks = [
  { name: 'Facebook', icon: FaFacebookF, url: COMPANY_SOCIALS.facebook },
  { name: 'Instagram', icon: FaInstagram, url: COMPANY_SOCIALS.instagram },
  { name: 'X', icon: FaTwitter, url: COMPANY_SOCIALS.x },
  { name: 'Pinterest', icon: FaPinterestP, url: COMPANY_SOCIALS.pinterest },
  { name: 'WhatsApp', icon: FaWhatsapp, url: COMPANY_CONTACT.whatsappUrl },
  { name: 'YouTube', icon: FaYoutube, url: COMPANY_SOCIALS.youtube },
]

const trustItems = [
  { icon: FaShieldAlt, title: 'Visa Assistance', description: 'End-to-end visa support for a hassle-free journey' },
  { icon: FaHotel, title: 'Handpicked Hotels', description: 'Carefully selected stays for your comfort' },
  { icon: FaHeadset, title: '24/7 Travel Support', description: "We're with you before, during and after your trip" },
  { icon: FaTags, title: 'Best Price Guarantee', description: 'Competitive prices with no hidden charges' },
]

const contactItems = [
  { icon: FaPhoneAlt, label: COMPANY_CONTACT.phoneDisplay, href: COMPANY_CONTACT.phoneHref },
  { icon: MdEmail, label: COMPANY_CONTACT.email, href: COMPANY_CONTACT.emailHref },
  { icon: FaMapMarkerAlt, label: COMPANY_CONTACT.address },
  { icon: FaClock, label: COMPANY_CONTACT.hours },
]

const mobileFooterActions = [
  { name: 'Home', path: ROUTES.HOME, icon: FaHome },
  { name: 'Destinations', path: ROUTES.DESTINATIONS, icon: FaMapMarkedAlt },
  { name: 'Packages', path: ROUTES.PACKAGES, icon: FaSuitcaseRolling },
  { name: 'Plan Trip', path: ROUTES.CONTACT, icon: FaCalendarAlt },
]

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { pathname } = useLocation()
  const hasMobileBookingBar = /^\/packages\/[^/]+/.test(pathname)

  return (
    <footer className={`relative overflow-hidden border-t border-sand-200 bg-[#FFFCF7] text-primary-900 ${hasMobileBookingBar ? '' : 'pb-24 sm:pb-0'}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(217,111,58,0.08),transparent_24%),radial-gradient(circle_at_90%_65%,rgba(231,188,96,0.18),transparent_30%)]" />

      <section className="relative border-b border-sand-200">
        <img src={footerBg} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover object-center opacity-12" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFFCF7] via-[#FFFCF7]/94 to-[#FFFCF7]/82" />
        <div className="relative mx-auto grid max-w-[100rem] gap-7 px-4 py-10 sm:px-6 md:px-8 lg:grid-cols-[1fr_auto] lg:items-center xl:px-10">
          <div className="flex items-start gap-4 sm:gap-5">
            <span className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full border border-accent-300/60 bg-accent-300/12 text-secondary-600 shadow-sm sm:flex">
              <FaPlane className="h-7 w-7 -rotate-12" />
            </span>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-secondary-600">Plan your next escape</p>
              <h2 className="mt-3 max-w-3xl font-display text-[clamp(2rem,8vw,3rem)] font-bold leading-tight text-primary-900 md:text-5xl">
                Ready for Your Next International <span className="text-accent-500">Journey?</span>
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-dark-600">
                Let our travel experts craft a personalized itinerary filled with comfort, confidence, and unforgettable experiences.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link to={ROUTES.CONTACT} className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-gradient-to-r from-accent-400 to-secondary-600 px-7 text-sm font-extrabold text-white shadow-[0_16px_36px_rgba(217,111,58,0.22)] transition hover:-translate-y-0.5">
              Plan My Holiday
              <FaArrowRight />
            </Link>
            <a href={COMPANY_CONTACT.phoneHref} className="inline-flex h-14 items-center justify-center gap-3 rounded-full border border-primary-900/20 bg-white/80 px-7 text-sm font-extrabold text-primary-900 shadow-sm transition hover:bg-primary-900 hover:text-white">
              <FaPhoneAlt />
              Talk to an Expert
            </a>
          </div>
        </div>
      </section>

      <div className="relative mx-auto max-w-[100rem] px-4 py-14 sm:px-6 md:px-8 xl:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_2.4fr_1.05fr]">
          <div>
            <Link to={ROUTES.HOME} className="inline-flex items-center gap-4">
              <img src={bablonsLogo} alt="Bablons Travel" className="h-16 w-16 object-contain" />
              <span>
                <span className="block font-display text-3xl font-bold leading-none text-primary-900">Bablons Tours</span>
                <span className="mt-2 block text-sm font-extrabold uppercase tracking-[0.28em] text-accent-500">& Entertainments</span>
                </span>
              
            </Link>
            <p className="mt-7 max-w-sm text-base leading-8 text-dark-600">
              Premium international travel experiences across Central Asia, the Middle East, the Caucasus, and Asia, crafted with precision and personal care.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-sand-200 bg-white text-primary-900 shadow-sm transition hover:border-accent-300 hover:bg-accent-300"
                    aria-label={link.name}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>

          <div className="grid gap-8 rounded-2xl border border-sand-200 bg-white/58 p-5 shadow-[0_18px_70px_rgba(16,39,36,0.07)] sm:grid-cols-2 sm:p-7 lg:rounded-3xl xl:grid-cols-4">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-sm font-extrabold uppercase tracking-[0.1em] text-secondary-600">{category}</h3>
                <span className="mt-3 block h-px w-12 bg-accent-400" />
                <ul className="mt-5 space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link to={link.path} className="text-sm font-semibold text-dark-700 transition hover:text-secondary-600">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-[0.1em] text-secondary-600">Services</h3>
              <span className="mt-3 block h-px w-12 bg-accent-400" />
              <ul className="mt-5 space-y-4">
                {services.map((service) => {
                  const Icon = service.icon
                  return (
                    <li key={service.name} className="flex items-start gap-3 text-sm font-semibold leading-6 text-dark-700">
                      <Icon className="mt-1 h-4 w-4 shrink-0 text-secondary-600" />
                      {service.name}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-sand-200 bg-white/86 p-5 shadow-[0_18px_55px_rgba(16,39,36,0.08)] sm:p-7 lg:rounded-3xl">
            <h3 className="font-display text-2xl font-bold leading-tight text-primary-900">
              Contact Our
              <span className="block text-secondary-600">Travel Experts</span>
            </h3>
            <ul className="mt-7 space-y-5">
              {contactItems.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.label} className="flex min-w-0 items-start gap-4 text-sm font-semibold text-dark-700">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-50 text-secondary-600">
                      <Icon className="h-4 w-4" />
                    </span>
                    {item.href ? <a href={item.href} className="min-w-0 break-words transition hover:text-secondary-600">{item.label}</a> : <span className="min-w-0 break-words">{item.label}</span>}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="mt-8 grid gap-7 lg:grid-cols-[1.45fr_0.9fr]">
          <div className="grid overflow-hidden rounded-3xl border border-sand-200 bg-white/78 shadow-[0_18px_55px_rgba(16,39,36,0.07)] sm:grid-cols-2 lg:grid-cols-4">
            {trustItems.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="border-b border-sand-200 p-5 last:border-b-0 sm:p-6 sm:even:border-l lg:border-b-0 lg:border-l lg:first:border-l-0">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-accent-300/45 bg-accent-300/10 text-secondary-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h4 className="mt-4 text-base font-extrabold text-primary-900">{item.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-dark-600">{item.description}</p>
                </div>
              )
            })}
          </div>

          <div className="rounded-2xl border border-sand-200 bg-white/86 p-5 shadow-[0_18px_55px_rgba(16,39,36,0.08)] sm:p-7 lg:rounded-3xl">
            <h3 className="font-display text-2xl font-bold text-primary-900">Travel Inspiration Delivered</h3>
            <p className="mt-3 text-sm leading-7 text-dark-600">
              Get exclusive offers, destination guides, and travel tips straight to your inbox.
            </p>
            <form className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email address"
                aria-label="Email address for newsletter"
                className="h-14 min-w-0 flex-1 rounded-xl border border-sand-200 bg-white px-5 text-sm text-dark-900 outline-none placeholder:text-dark-300 focus:border-accent-300"
              />
              <button type="button" className="h-14 rounded-xl bg-gradient-to-r from-accent-400 to-secondary-600 px-6 text-sm font-extrabold text-white transition hover:-translate-y-0.5">
                Subscribe
                <FaArrowRight className="ml-2 inline h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 border-t border-sand-200 pt-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4 text-dark-600">
              <FaGlobeAsia className="h-8 w-8 shrink-0 text-secondary-600" />
              <p className="text-sm leading-6">
                &copy; {currentYear} Bablons Tours & Entertainment.
                <span className="block">All Rights Reserved.</span>
              </p>
            </div>
            <p className="font-display-label text-xl text-accent-500 sm:text-2xl">Crafting Journeys. Creating Memories.</p>
            <div className="flex flex-wrap items-center gap-5 text-sm font-semibold text-dark-700">
              <Link to={ROUTES.PRIVACY} className="transition hover:text-secondary-600">Privacy Policy</Link>
              <span className="h-4 w-px bg-dark-900/20" />
              <Link to={ROUTES.TERMS} className="transition hover:text-secondary-600">Terms & Conditions</Link>
              <span className="h-4 w-px bg-dark-900/20" />
              <Link to={ROUTES.HOME} className="transition hover:text-secondary-600">Sitemap</Link>
              <span className="h-4 w-px bg-dark-900/20" />
              <Link to={ROUTES.CONTACT} className="transition hover:text-secondary-600">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>

      {!hasMobileBookingBar && (
        <nav
          className="fixed inset-x-3 bottom-3 z-[60] rounded-[1.35rem] border border-white/70 bg-white/94 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_18px_48px_rgba(16,39,36,0.22)] backdrop-blur-xl sm:hidden"
          aria-label="Mobile quick navigation"
        >
          <div className="grid grid-cols-4 gap-1">
            {mobileFooterActions.map((item) => {
              const Icon = item.icon

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === ROUTES.HOME}
                  className={({ isActive }) =>
                    [
                      'group flex h-[4.1rem] min-w-0 flex-col items-center justify-center gap-1 rounded-2xl px-1 text-center text-[0.68rem] font-extrabold leading-none transition active:scale-[0.97]',
                      isActive
                        ? 'bg-primary-900 text-white shadow-[0_10px_24px_rgba(16,39,36,0.22)]'
                        : 'text-dark-600 hover:bg-sand-50 hover:text-primary-900',
                    ].join(' ')
                  }
                  aria-label={item.name}
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={[
                          'flex h-8 w-8 items-center justify-center rounded-full transition',
                          isActive ? 'bg-white/14 text-accent-300' : 'bg-sand-100 text-secondary-600 group-hover:bg-white',
                        ].join(' ')}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <span className="block max-w-full truncate">{item.name}</span>
                    </>
                  )}
                </NavLink>
              )
            })}
          </div>
        </nav>
      )}
    </footer>
  )
}

export default Footer
