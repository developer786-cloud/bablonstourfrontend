import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  FaArrowRight,
  FaBars,
  FaBriefcase,
  FaChevronDown,
  FaCity,
  FaEnvelope,
  FaFacebookF,
  FaGlobeAsia,
  FaHome,
  FaInstagram,
  FaMapMarkerAlt,
  FaMonument,
  FaMountain,
  FaPen,
  FaPhoneAlt,
  FaRegImages,
  FaSearch,
  FaShieldAlt,
  FaTimes,
  FaUserFriends,
  FaWhatsapp,
  FaYoutube,
  FaPinterestP,
  FaTwitter,
  FaHeadset,
  FaPlaneDeparture,
  FaUmbrellaBeach,
} from 'react-icons/fa'

import { ROUTES } from '../../constants/routes'
import { COMPANY_CONTACT, COMPANY_SOCIALS } from '../../constants/companyContact'
import bablonsLogo from '../../assets/logos/Bablons Logo.png'

const CONTACT_EMAIL = COMPANY_CONTACT.email
const CONTACT_PHONE = COMPANY_CONTACT.phone
const CONTACT_PHONE_HREF = COMPANY_CONTACT.phoneHref
const CONTACT_ADDRESS = COMPANY_CONTACT.address
const WHATSAPP_URL = COMPANY_CONTACT.whatsappUrl

const socialLinks = [
  { name: 'Facebook', icon: FaFacebookF, url: COMPANY_SOCIALS.facebook },
  { name: 'Instagram', icon: FaInstagram, url: COMPANY_SOCIALS.instagram },
  { name: 'X', icon: FaTwitter, url: COMPANY_SOCIALS.x },
  { name: 'Pinterest', icon: FaPinterestP, url: COMPANY_SOCIALS.pinterest },
  { name: 'WhatsApp', icon: FaWhatsapp, url: WHATSAPP_URL },
  { name: 'YouTube', icon: FaYoutube, url: COMPANY_SOCIALS.youtube },
]

const navLinks = [
  { name: 'Home', path: ROUTES.HOME, icon: FaHome },
  {
    name: 'Destinations',
    path: ROUTES.DESTINATIONS,
    icon: FaMapMarkerAlt,
    children: [
      { name: 'Dubai', path: `${ROUTES.DESTINATIONS}/dubai-uae/dubai`, icon: FaCity },
      { name: 'Thailand', path: `${ROUTES.DESTINATIONS}/thailand/bangkok`, icon: FaUmbrellaBeach },
      { name: 'Uzbekistan', path: `${ROUTES.DESTINATIONS}/uzbekistan/tashkent`, icon: FaMonument },
      { name: 'Georgia', path: `${ROUTES.DESTINATIONS}/georgia/tbilisi`, icon: FaMountain },
      { name: 'All Destinations', path: ROUTES.DESTINATIONS, icon: FaGlobeAsia },
    ],
  },
  {
    name: 'Packages',
    mobileName: 'Tour Packages',
    path: ROUTES.PACKAGES,
    icon: FaBriefcase,
    children: [
      { name: 'Group Tours', path: `${ROUTES.PACKAGES}?travelStyle=group`, icon: FaUserFriends },
      { name: 'Family Packages', path: `${ROUTES.PACKAGES}?travelStyle=family`, icon: FaHome },
      { name: 'Honeymoon Trips', path: `${ROUTES.PACKAGES}?travelStyle=honeymoon`, icon: FaPlaneDeparture },
      { name: 'All Packages', path: ROUTES.PACKAGES, icon: FaBriefcase },
    ],
  },
  { name: 'Gallery', path: ROUTES.GALLERY, icon: FaRegImages },
  {
    name: 'About Us',
    path: ROUTES.ABOUT,
    icon: FaUserFriends,
    children: [
      { name: 'About Bablons', path: ROUTES.ABOUT, icon: FaUserFriends },
      { name: 'Travel FAQs', path: ROUTES.FAQ, icon: FaShieldAlt },
    ],
  },
  { name: 'Blogs', path: ROUTES.BLOGS, icon: FaPen },
  {
    name: 'Contact Us',
    path: ROUTES.CONTACT,
    icon: FaEnvelope,
    children: [
      { name: 'Contact Page', path: ROUTES.CONTACT, icon: FaEnvelope },
      { name: 'Call Now', path: CONTACT_PHONE_HREF, icon: FaPhoneAlt, external: true },
      { name: 'Email Us', path: `mailto:${CONTACT_EMAIL}`, icon: FaEnvelope, external: true },
    ],
  },
]

const utilityItems = [
  { icon: FaPlaneDeparture, label: 'Handpicked Experiences' },
  { icon: FaShieldAlt, label: 'Best Price Guarantee' },
  { icon: FaHeadset, label: '24/7 Travel Support' },
]

const MobileMenuLink = ({ item, onNavigate }) => {
  const Icon = item.icon
  const label = item.mobileName || item.name

  if (item.external) {
    return (
      <a
        href={item.path}
        onClick={onNavigate}
        className="flex items-center gap-4 rounded-2xl px-3 py-3 text-[0.95rem] font-bold text-white/92 transition hover:bg-white/10"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/8 text-white">
          <Icon className="h-4.5 w-4.5" />
        </span>
        <span className="min-w-0 flex-1">{label}</span>
      </a>
    )
  }

  return (
    <NavLink
      to={item.path}
      end={item.path === ROUTES.HOME}
      onClick={onNavigate}
      className={({ isActive }) =>
        `flex items-center gap-4 rounded-2xl px-3 py-3 text-[0.95rem] font-bold transition ${
          isActive ? 'bg-white text-primary-950 shadow-[0_14px_30px_rgba(0,0,0,0.16)]' : 'text-white/92 hover:bg-white/10'
        }`
      }
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/8 text-current">
        <Icon className="h-4.5 w-4.5" />
      </span>
      <span className="min-w-0 flex-1">{label}</span>
    </NavLink>
  )
}

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openMobileGroup, setOpenMobileGroup] = useState('Destinations')
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 8)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`site-header fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-300 ${hasScrolled ? 'shadow-[0_14px_38px_rgba(16,39,36,0.12)]' : ''}`}>
      <div className="hidden lg:block">
        <div className="w-full border-b border-sand-200 bg-white">
          <div className="mx-auto flex h-12 w-full max-w-[1500px] items-center justify-between px-5 text-[0.82rem] font-bold text-dark-900 xl:px-7 2xl:px-8">
            <div className="flex min-w-0 items-center gap-6 xl:gap-9">
              {utilityItems.map((item, index) => {
                const Icon = item.icon

                return (
                  <div key={item.label} className="flex items-center gap-3">
                    {index > 0 ? <span className="hidden h-5 w-px bg-dark-900/25 xl:block" aria-hidden="true" /> : null}
                    <span className="inline-flex items-center gap-2.5 whitespace-nowrap">
                      <Icon className="h-3.5 w-3.5 text-primary-900" />
                      {item.label}
                    </span>
                  </div>
                )
              })}
            </div>

            <div className="flex shrink-0 items-center gap-3.5">
              <span className="font-semibold text-dark-800">Follow Us:</span>
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a key={link.name} href={link.url} target="_blank" rel="noreferrer" aria-label={link.name} className="text-dark-900 transition hover:text-secondary-600">
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <nav aria-label="Main navigation">
        <div className="w-full border-b border-sand-200 bg-white">
          <div className="site-header-inner mx-auto flex w-full max-w-[1500px] items-center justify-between gap-3 px-4 text-dark-900 sm:px-6 lg:grid lg:grid-cols-[minmax(250px,0.78fr)_minmax(0,2.15fr)_minmax(190px,0.58fr)] lg:px-5 xl:grid-cols-[minmax(280px,0.82fr)_minmax(0,2.1fr)_minmax(220px,0.68fr)] xl:px-7 2xl:px-8">
            <Link to={ROUTES.HOME} className="group flex min-w-0 shrink-0 items-center gap-3 lg:gap-3.5" aria-label="Bablons Travel home">
              <span className="site-logo-frame transition group-hover:-translate-y-0.5">
                <img src={bablonsLogo} alt="Bablons Travel" className="site-logo-img" />
              </span>
              <span className="hidden leading-tight sm:block">
                <span className="block font-display text-[1.22rem] font-bold text-dark-900 xl:text-[1.34rem]">Bablons Tours</span>
                <span className="mt-0.5 block text-[0.58rem] font-extrabold uppercase tracking-[0.22em] text-secondary-500 xl:text-[0.62rem]">
                 & Entertainments
                </span>
              </span>
            </Link>

            <div className="hidden min-w-0 items-center justify-center gap-1 lg:flex xl:gap-1.5">
              {navLinks.map((link) => {
                const Icon = link.icon

                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === ROUTES.HOME}
                    className={({ isActive }) =>
                      `group/nav relative flex min-w-[4.75rem] flex-col items-center justify-center gap-1 rounded-xl px-1.5 py-2.5 text-center text-[0.66rem] font-extrabold uppercase tracking-[0.04em] transition hover:bg-sand-50 xl:min-w-[5.75rem] xl:px-2 xl:text-[0.72rem] ${
                        isActive ? 'text-secondary-600' : 'text-dark-900 hover:text-secondary-600'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon className={`h-3.5 w-3.5 transition xl:h-4 xl:w-4 ${isActive ? 'text-secondary-600' : 'text-dark-900 group-hover/nav:text-secondary-600'}`} />
                        <span className="inline-flex items-center gap-1">
                          {link.name}
                          {link.hasDropdown ? <span className="text-[0.85rem] leading-none">⌄</span> : null}
                        </span>
                        <span className={`absolute bottom-1 h-0.5 w-7 rounded-full bg-secondary-500 transition xl:w-8 ${isActive ? 'opacity-100' : 'opacity-0 group-hover/nav:opacity-70'}`} />
                      </>
                    )}
                  </NavLink>
                )
              })}
            </div>

            <div className="hidden items-center justify-end gap-2.5 lg:flex xl:gap-3">
              <Link
                to={ROUTES.PACKAGES}
                className="inline-flex h-11 items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-accent-300 to-secondary-500 px-5 text-xs font-extrabold uppercase tracking-[0.04em] text-dark-900 shadow-[0_12px_26px_rgba(217,111,58,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(217,111,58,0.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary-500 xl:px-7 xl:text-sm"
              >
                Book Now
                <FaArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to={ROUTES.PACKAGES}
                aria-label="Search packages"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-dark-900/18 text-dark-900 transition hover:border-secondary-500 hover:bg-secondary-50 hover:text-secondary-600"
              >
                <FaSearch className="h-4 w-4" />
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((value) => !value)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-dark-900/15 bg-white text-dark-900 shadow-[0_10px_24px_rgba(16,39,36,0.12)] transition hover:bg-sand-50 lg:hidden"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-panel"
            >
              {isMobileMenuOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div
          id="mobile-nav-panel"
          className={`fixed inset-0 z-[1001] lg:hidden ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
          aria-hidden={!isMobileMenuOpen}
        >
          <button
            type="button"
            aria-label="Close mobile navigation"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`absolute inset-0 bg-dark-950/55 backdrop-blur-[2px] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          />

          <aside
            className={`absolute bottom-0 right-0 top-0 flex w-[min(92vw,420px)] flex-col overflow-hidden rounded-l-[1.45rem] bg-[radial-gradient(circle_at_20%_0%,rgba(28,120,184,0.4),transparent_35%),linear-gradient(155deg,#06223f_0%,#03182f_48%,#052f55_100%)] text-white shadow-[-22px_0_44px_rgba(0,0,0,0.28)] transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
              <Link to={ROUTES.HOME} onClick={() => setIsMobileMenuOpen(false)} className="flex min-w-0 items-center gap-3" aria-label="Bablons Travel home">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-lg shadow-black/15">
                  <img src={bablonsLogo} alt="Bablons Travel" className="h-12 w-12 object-contain" />
                </span>
                <span className="min-w-0 leading-tight">
                  <span className="block font-display text-2xl font-bold text-white">Bablons</span>
                  <span className="block text-[0.62rem] font-black uppercase tracking-[0.34em] text-white/72">Travel</span>
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white transition hover:bg-white/15"
                aria-label="Close navigation menu"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
              <div className="grid gap-1">
                {navLinks.map((link) => {
                  const Icon = link.icon
                  const hasChildren = Boolean(link.children?.length)
                  const isOpen = openMobileGroup === link.name

                  if (!hasChildren) {
                    return <MobileMenuLink key={link.name} item={link} onNavigate={() => setIsMobileMenuOpen(false)} />
                  }

                  return (
                    <div key={link.name} className="rounded-2xl">
                      <button
                        type="button"
                        onClick={() => setOpenMobileGroup(isOpen ? '' : link.name)}
                        className="flex w-full items-center gap-4 rounded-2xl px-3 py-3 text-left text-[0.95rem] font-bold text-white/92 transition hover:bg-white/10"
                        aria-expanded={isOpen}
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/8 text-white">
                          <Icon className="h-4.5 w-4.5" />
                        </span>
                        <span className="min-w-0 flex-1">{link.mobileName || link.name}</span>
                        <FaChevronDown className={`h-3.5 w-3.5 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>

                      <div className={`grid overflow-hidden transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="min-h-0">
                          <div className="ml-7 border-l border-white/12 py-1 pl-4">
                            {link.children.map((child) => {
                              const ChildIcon = child.icon
                              const childClass = "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/78 transition hover:bg-white/10 hover:text-white"

                              return child.external ? (
                                <a key={child.name} href={child.path} onClick={() => setIsMobileMenuOpen(false)} className={childClass}>
                                  <ChildIcon className="h-4 w-4 shrink-0" />
                                  {child.name}
                                </a>
                              ) : (
                                <NavLink key={child.name} to={child.path} onClick={() => setIsMobileMenuOpen(false)} className={childClass}>
                                  <ChildIcon className="h-4 w-4 shrink-0" />
                                  {child.name}
                                </NavLink>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="my-5 h-px bg-white/12" />

              <div className="space-y-3 text-sm font-semibold text-white/82">
                <a href={CONTACT_PHONE_HREF} className="flex min-w-0 items-center gap-3 rounded-2xl px-2 py-1.5 transition hover:bg-white/10">
                  <FaPhoneAlt className="h-4 w-4 shrink-0 text-accent-300" />
                  <span>{CONTACT_PHONE}</span>
                </a>
                <a href={`mailto:${CONTACT_EMAIL}`} className="flex min-w-0 items-center gap-3 rounded-2xl px-2 py-1.5 transition hover:bg-white/10">
                  <FaEnvelope className="h-4 w-4 shrink-0 text-accent-300" />
                  <span className="truncate">{CONTACT_EMAIL}</span>
                </a>
                <span className="flex min-w-0 items-center gap-3 rounded-2xl px-2 py-1.5">
                  <FaMapMarkerAlt className="h-4 w-4 shrink-0 text-accent-300" />
                  <span className="min-w-0 break-words">{CONTACT_ADDRESS}</span>
                </span>
              </div>

              <div className="mt-5 flex items-center gap-2">
                {socialLinks.slice(0, 5).map((link) => {
                  const Icon = link.icon
                  return (
                    <a key={link.name} href={link.url} target="_blank" rel="noreferrer" aria-label={link.name} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white transition hover:bg-white hover:text-primary-950">
                      <Icon className="h-3.5 w-3.5" />
                    </a>
                  )
                })}
              </div>
            </div>

            <div className="border-t border-white/10 p-4">
              <Link
                to={ROUTES.CONTACT}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#ef1e2d] to-secondary-500 px-5 text-base font-extrabold text-white shadow-[0_18px_30px_rgba(239,30,45,0.26)] transition hover:-translate-y-0.5"
              >
                Get a Quote
                <FaArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
