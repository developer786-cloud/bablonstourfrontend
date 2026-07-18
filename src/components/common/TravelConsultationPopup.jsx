import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaBarcode,
  FaBriefcase,
  FaCalendarAlt,
  FaCommentDots,
  FaEnvelope,
  FaHeadset,
  FaHotel,
  FaPassport,
  FaPhoneAlt,
  FaPlaneDeparture,
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

const amenities = [
  { icon: FaPassport, title: 'Visa Assistance' },
  { icon: FaPlaneDeparture, title: 'Best Flight Deals' },
  { icon: FaHotel, title: 'Premium Hotels' },
  { icon: FaBriefcase, title: 'Custom Packages' },
  { icon: FaHeadset, title: '24/7 Support' },
  { icon: FaTags, title: 'Best Price Guarantee' },
]

const trustItems = [
  { icon: FaShieldAlt, label: 'IATA Certified' },
  { icon: FaTags, label: 'No Hidden Charges' },
  { icon: FaSmile, label: '500+ Happy Travelers' },
]

const TravelConsultationPopup = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const closeButtonRef = useRef(null)

  const closePopup = useCallback(() => {
    sessionStorage.setItem('bablons-consultation-popup', 'closed')
    setIsVisible(false)
    window.setTimeout(() => setIsOpen(false), 200)
  }, [])

  useEffect(() => {
    if (sessionStorage.getItem('bablons-consultation-popup') === 'closed') return

    const timer = window.setTimeout(() => setIsOpen(true), 1400)
    return () => window.clearTimeout(timer)
  }, [])

  // Trigger enter transition on next frame once mounted, lock background scroll
  useEffect(() => {
    if (!isOpen) return undefined

    const raf = window.requestAnimationFrame(() => setIsVisible(true))
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      window.cancelAnimationFrame(raf)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

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
    <div
      className={`fixed inset-0 z-[1200] flex items-center justify-center bg-dark-900/74 px-3 py-3 backdrop-blur-sm transition-opacity duration-200 sm:px-6 sm:py-4 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      role="presentation"
    >
      {/* Scoped keyframes for the route-indicator plane; respects reduced-motion */}
      <style>{`
        @keyframes bablons-route-fly {
          0% { transform: translateX(0); opacity: 0.4; }
          50% { opacity: 1; }
          100% { transform: translateX(calc(100% - 1.1rem)); opacity: 0.4; }
        }
        .bablons-route-plane { animation: bablons-route-fly 2.8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .bablons-route-plane { animation: none; }
        }
      `}</style>

      <div
        aria-labelledby="consultation-popup-title"
        aria-modal="true"
        role="dialog"
        className={`relative grid max-h-[94vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-[#fffaf2] shadow-[0_32px_90px_rgba(0,0,0,0.34)] ring-1 ring-white/70 transition-all duration-200 motion-reduce:transition-none sm:rounded-[1.25rem] lg:grid-cols-[1.06fr_28px_0.94fr] lg:overflow-hidden ${
          isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-2 scale-[0.97] opacity-0'
        }`}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={closePopup}
          aria-label="Close travel consultation popup"
          className="absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white text-dark-900 shadow-lg ring-1 ring-dark-900/10 transition hover:bg-sand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 sm:right-4 sm:top-4 sm:h-11 sm:w-11"
        >
          <FaTimes className="h-4 w-4" />
        </button>

        {/* LEFT: boarding pass main stub */}
        <div className="relative flex flex-col px-4 pb-5 pt-4 sm:px-8 sm:pb-6 sm:pt-6 lg:px-9 lg:pb-8 lg:pt-7">
          <div className="flex items-center justify-between gap-3 pr-12 sm:pr-14">
            <img src={logo} alt="Bablons Travel & Entertainment" className="h-11 w-auto object-contain sm:h-14" />
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-secondary-500 px-3 py-1.5 text-[0.62rem] font-black uppercase tracking-[0.04em] text-white shadow-[0_10px_20px_rgba(217,111,58,0.25)] sm:px-3.5 sm:text-xs">
              <FaTags className="h-3 w-3" />
              20&ndash;50% Off
            </span>
          </div>

          <span className="mt-5 inline-flex w-fit items-center rounded-full bg-accent-50 px-3 py-1 text-[0.62rem] font-black uppercase tracking-[0.08em] text-accent-700 sm:mt-6">
            Complimentary Consultation
          </span>

          {/* Route indicator — boarding-pass style header, the design's hero moment */}
          <div className="mt-3 flex items-center gap-3">
            <span className="whitespace-nowrap text-[0.62rem] font-black uppercase tracking-[0.08em] text-sand-600 sm:text-xs">Your City</span>
            <div className="relative h-px flex-1 bg-dark-900/15">
              <span className="bablons-route-plane absolute -top-2 left-0 text-accent-500">
                <FaPlaneDeparture className="h-4 w-4" />
              </span>
            </div>
            <span className="whitespace-nowrap text-[0.62rem] font-black uppercase tracking-[0.08em] text-sand-600 sm:text-xs">Dream Destination</span>
          </div>

          <h2
            id="consultation-popup-title"
            className="mt-5 font-display text-[2.15rem] font-bold leading-[1.05] text-dark-900 sm:mt-6 sm:text-[3.4rem]"
          >
            Your Boarding Pass
            <span className="block text-accent-500">to a Dream Holiday</span>
          </h2>
          <p className="mt-3 max-w-xl text-sm font-semibold leading-6 text-sand-700 sm:text-base sm:leading-7">
            One free consultation, and our travel experts start building your international trip &mdash; flights, stay, and visa, sorted.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-3.5 sm:mt-7 sm:grid-cols-3 sm:gap-4">
            {amenities.map((item) => {
              const Icon = item.icon

              return (
                <div key={item.title} className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent-200 bg-white text-accent-600 shadow-sm sm:h-11 sm:w-11">
                    <Icon className="h-4 w-4 sm:h-[1.1rem] sm:w-[1.1rem]" />
                  </span>
                  <strong className="min-w-0 text-xs font-black leading-tight text-dark-900 sm:text-sm">{item.title}</strong>
                </div>
              )
            })}
          </div>

          <div className="mt-6 grid gap-3 sm:mt-7 sm:grid-cols-2">
            <Link
              to={ROUTES.CONTACT}
              onClick={closePopup}
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-lg bg-secondary-500 px-5 py-3 text-center text-sm font-black uppercase tracking-[0.02em] text-white shadow-[0_16px_34px_rgba(217,111,58,0.28)] transition hover:-translate-y-0.5 hover:bg-secondary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2"
            >
              <FaCalendarAlt className="h-5 w-5" />
              Reserve My Consultation
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={closePopup}
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-lg bg-emerald-600 px-5 py-3 text-center text-sm font-black uppercase tracking-[0.02em] text-white shadow-[0_16px_34px_rgba(5,150,105,0.22)] transition hover:-translate-y-0.5 hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
            >
              <FaCommentDots className="h-5 w-5" />
              Chat on WhatsApp
            </a>
          </div>

          <div className="mt-4 flex flex-col gap-2 rounded-xl border border-accent-200 bg-white/85 p-2.5 shadow-[0_12px_30px_rgba(16,39,36,0.08)] sm:flex-row sm:p-2">
            <a
              href={COMPANY_CONTACT.phoneHref}
              className="flex min-h-12 flex-1 items-center gap-3 rounded-lg bg-white px-3 py-2 shadow-sm ring-1 ring-accent-100 transition hover:bg-accent-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent-600 ring-1 ring-accent-100">
                <FaPhoneAlt className="h-3.5 w-3.5" />
              </span>
              <span className="min-w-0 text-sm leading-tight text-dark-900">
                <span className="block text-[0.68rem] font-bold uppercase tracking-wide text-sand-600">Call Us</span>
                <strong className="whitespace-nowrap font-black">{COMPANY_CONTACT.phoneDisplay}</strong>
              </span>
            </a>
            <a
              href={COMPANY_CONTACT.emailHref}
              className="flex min-h-12 flex-1 items-center gap-3 rounded-lg bg-white px-3 py-2 shadow-sm ring-1 ring-accent-100 transition hover:bg-accent-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent-600 ring-1 ring-accent-100">
                <FaEnvelope className="h-3.5 w-3.5" />
              </span>
              <span className="min-w-0 text-sm leading-tight text-dark-900">
                <span className="block text-[0.68rem] font-bold uppercase tracking-wide text-sand-600">Email Us</span>
                <strong className="break-all font-black sm:break-normal">{COMPANY_CONTACT.email}</strong>
              </span>
            </a>
          </div>

          <div className="-mx-4 -mb-5 mt-5 grid gap-3 bg-primary-900 px-4 py-3.5 text-white sm:-mx-8 sm:mt-6 sm:grid-cols-3 sm:px-8 sm:py-4 lg:-mx-9 lg:-mb-8 lg:px-9">
            {trustItems.map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.label}
                  className="flex items-center justify-center gap-2 text-center text-[0.68rem] font-black uppercase tracking-[0.03em] sm:border-r sm:border-white/16 sm:text-xs sm:last:border-r-0"
                >
                  <Icon className="h-4 w-4 text-accent-200" />
                  {item.label}
                </div>
              )
            })}
          </div>
        </div>

        {/* MIDDLE: perforation — the ticket tear between stub and main pass */}
        <div className="relative hidden lg:block" aria-hidden="true">
          <div
            className="absolute inset-y-5 left-1/2 w-px -translate-x-1/2"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to bottom, rgba(16,39,36,0.28) 0px, rgba(16,39,36,0.28) 6px, transparent 6px, transparent 14px)',
            }}
          />
          <span className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#fffaf2] shadow-[0_0_0_1px_rgba(16,39,36,0.12)]">
            <FaPlaneDeparture className="h-3.5 w-3.5 rotate-90 text-accent-500" />
          </span>
        </div>

        {/* RIGHT: image stub with barcode footer */}
        <div className="relative min-h-[15rem] overflow-hidden bg-dark-900 lg:min-h-full">
          <img
            src={popupImage}
            alt="International holiday destinations planned by Bablons Travel"
            className="h-full min-h-[15rem] w-full object-cover object-center lg:object-[58%_center]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,39,36,0)_28%,rgba(16,39,36,0.72)_100%)] lg:bg-[linear-gradient(90deg,rgba(255,250,242,0.9)_0%,rgba(255,250,242,0.2)_26%,rgba(16,39,36,0)_54%),linear-gradient(180deg,rgba(16,39,36,0)_48%,rgba(16,39,36,0.7)_100%)]" />

          <span className="absolute left-5 top-5 rounded-full bg-dark-900/72 px-3.5 py-1.5 text-xs font-black uppercase tracking-[0.04em] text-white backdrop-blur-md">
            Worldwide Holidays
          </span>

          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-dark-900/55 px-5 py-3 backdrop-blur-md">
            <FaBarcode className="h-8 w-auto text-white/85" aria-hidden="true" />
            <span className="font-mono text-[0.65rem] tracking-[0.15em] text-white/70">BAB&bull;2026&bull;INTL</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TravelConsultationPopup