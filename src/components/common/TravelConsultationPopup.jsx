import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaBriefcase,
  FaCalendarAlt,
  FaCommentDots,
  FaCrown,
  FaGlobeAsia,
  FaHeadset,
  FaHotel,
  FaPassport,
  FaPhoneAlt,
  FaPlane,
  FaShieldAlt,
  FaSmile,
  FaTags,
  FaTimes,
} from 'react-icons/fa'

import logo from '../../assets/logos/Bablons Logo.png'
import popupImage from '../../assets/images/Hero Banner 1.png'
import { COMPANY_CONTACT } from '../../constants/companyContact'
import { ROUTES } from '../../constants/routes'
import { getWhatsAppUrl } from './WhatsAppButton'

const services = [
  { icon: FaPassport, title: 'Visa Assistance' },
  { icon: FaPlane, title: 'Best Flight Deals' },
  { icon: FaHotel, title: 'Premium Hotels' },
  { icon: FaBriefcase, title: 'Custom Packages' },
  { icon: FaHeadset, title: '24/7 Travel Support' },
  { icon: FaTags, title: 'Best Price Guarantee' },
]

const trustItems = [
  { icon: FaShieldAlt, label: 'IATA Certified' },
  { icon: FaTags, label: 'No Hidden Charges' },
  { icon: FaSmile, label: '100% Customer Satisfaction' },
]

const TravelConsultationPopup = () => {
  const [isOpen, setIsOpen] = useState(false)

  const closePopup = useCallback(() => {
    sessionStorage.setItem('bablons-consultation-popup', 'closed')
    setIsOpen(false)
  }, [])

  useEffect(() => {
    if (sessionStorage.getItem('bablons-consultation-popup') === 'closed') return

    const timer = window.setTimeout(() => setIsOpen(true), 1400)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isOpen) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') closePopup()
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [closePopup, isOpen])

  if (!isOpen) return null

  const whatsappUrl = getWhatsAppUrl({
    message: 'Hi Bablons Travel, I need a free travel consultation for my trip.',
  })

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-dark-900/74 px-3 py-4 backdrop-blur-sm sm:px-6" role="presentation">
      <div
        aria-labelledby="consultation-popup-title"
        aria-modal="true"
        className="relative grid max-h-[94vh] w-full max-w-5xl overflow-y-auto rounded-[1.25rem] bg-[#fffaf2] shadow-[0_32px_90px_rgba(0,0,0,0.34)] ring-1 ring-white/70 lg:grid-cols-[1.04fr_0.96fr] lg:overflow-hidden"
        role="dialog"
      >
        <button
          type="button"
          onClick={closePopup}
          aria-label="Close travel consultation popup"
          className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white text-dark-900 shadow-lg ring-1 ring-dark-900/10 transition hover:bg-sand-50"
        >
          <FaTimes className="h-4 w-4" />
        </button>

        <div className="relative flex flex-col px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
          <div className="pointer-events-none absolute left-0 top-0 h-44 w-44 rounded-br-full bg-white/70" />
          <div className="relative flex flex-wrap items-start justify-between gap-4">
            <img src={logo} alt="Bablons Travel & Entertainment" className="h-16 w-auto object-contain sm:h-20" />
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary-500 px-4 py-2 text-xs font-black uppercase tracking-[0.05em] text-white shadow-[0_12px_24px_rgba(217,111,58,0.25)]">
              <FaTags className="h-3.5 w-3.5" />
              Exclusive 20% to 50% Discount
            </span>
          </div>

          <div className="relative mt-5">
            <p className="inline-flex items-center gap-2 rounded-full border border-accent-200 bg-white/80 px-4 py-2 text-[0.7rem] font-black uppercase tracking-[0.06em] text-accent-700 shadow-sm">
              <FaCrown className="h-3.5 w-3.5" />
              Trusted by 500+ happy travelers
            </p>
            <h2 id="consultation-popup-title" className="mt-4 font-display text-[2.8rem] font-bold leading-[0.98] text-dark-900 sm:text-[4.25rem]">
              Your Dream Holiday
              <span className="block text-accent-500">Starts Here!</span>
            </h2>
            <p className="mt-4 max-w-xl text-base font-semibold leading-7 text-sand-700 sm:text-lg">
              Let our travel experts craft the perfect international trip for you.
            </p>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon

              return (
                <div key={service.title} className="flex min-w-0 items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent-200 bg-white text-accent-600 shadow-sm">
                    <Icon className="h-5 w-5" />
                  </span>
                  <strong className="min-w-0 text-sm font-black leading-tight text-dark-900">{service.title}</strong>
                </div>
              )
            })}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link
              to={ROUTES.CONTACT}
              onClick={closePopup}
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-lg bg-secondary-500 px-5 py-3 text-center text-sm font-black uppercase tracking-[0.02em] text-white shadow-[0_16px_34px_rgba(217,111,58,0.28)] transition hover:-translate-y-0.5 hover:bg-secondary-600"
            >
              <FaCalendarAlt className="h-5 w-5" />
              Book Free Consultation
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={closePopup}
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-lg bg-emerald-600 px-5 py-3 text-center text-sm font-black uppercase tracking-[0.02em] text-white shadow-[0_16px_34px_rgba(5,150,105,0.22)] transition hover:-translate-y-0.5 hover:bg-emerald-700"
            >
              <FaCommentDots className="h-5 w-5" />
              Chat on WhatsApp
            </a>
          </div>

          <div className="mt-5 grid gap-3 rounded-xl border border-accent-200 bg-white/74 p-3 shadow-sm sm:grid-cols-3">
            <a href={COMPANY_CONTACT.phoneHref} className="flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-accent-50">
              <FaPhoneAlt className="h-5 w-5 text-accent-600" />
              <span>
                <span className="block text-[0.68rem] font-bold text-sand-600">Call Us</span>
                <strong className="block text-xs font-black text-dark-900">{COMPANY_CONTACT.phoneDisplay}</strong>
              </span>
            </a>
            <a href={COMPANY_CONTACT.emailHref} className="flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-accent-50 sm:border-x sm:border-accent-100">
              <FaCalendarAlt className="h-5 w-5 text-accent-600" />
              <span>
                <span className="block text-[0.68rem] font-bold text-sand-600">Email Us</span>
                <strong className="block break-all text-xs font-black text-dark-900">{COMPANY_CONTACT.email}</strong>
              </span>
            </a>
            <Link to={ROUTES.PACKAGES} onClick={closePopup} className="flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-accent-50">
              <FaGlobeAsia className="h-5 w-5 text-accent-600" />
              <span>
                <span className="block text-[0.68rem] font-bold text-sand-600">Explore</span>
                <strong className="block text-xs font-black text-dark-900">International Packages</strong>
              </span>
            </Link>
          </div>

          <div className="-mx-5 -mb-6 mt-6 grid gap-3 bg-primary-900 px-5 py-4 text-white sm:-mx-8 sm:grid-cols-3 sm:px-8 lg:-mx-10 lg:-mb-8 lg:px-10">
            {trustItems.map((item) => {
              const Icon = item.icon

              return (
                <div key={item.label} className="flex items-center justify-center gap-2 text-center text-xs font-black uppercase tracking-[0.03em] sm:border-r sm:border-white/16 sm:last:border-r-0">
                  <Icon className="h-4 w-4 text-accent-200" />
                  {item.label}
                </div>
              )
            })}
          </div>
        </div>

        <div className="relative min-h-[19rem] overflow-hidden bg-dark-900 lg:min-h-full">
          <img src={popupImage} alt="International holiday destinations planned by Bablons Travel" className="h-full min-h-[19rem] w-full object-cover object-center lg:object-[58%_center]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,39,36,0)_28%,rgba(16,39,36,0.72)_100%)] lg:bg-[linear-gradient(90deg,rgba(255,250,242,0.95)_0%,rgba(255,250,242,0.26)_30%,rgba(16,39,36,0)_58%),linear-gradient(180deg,rgba(16,39,36,0)_50%,rgba(16,39,36,0.68)_100%)]" />
          <span className="absolute bottom-5 right-5 rounded-full bg-dark-900/72 px-4 py-2 text-sm font-black uppercase tracking-[0.04em] text-white backdrop-blur-md">
            Worldwide Holidays
          </span>
        </div>
      </div>
    </div>
  )
}

export default TravelConsultationPopup
