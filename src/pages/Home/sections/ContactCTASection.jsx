import { useEffect, useRef, useState } from 'react'
import {
  FaArrowRight,
  FaBriefcase,
  FaCalendarAlt,
  FaChevronDown,
  FaEnvelope,
  FaFacebook,
  FaGlobeAsia,
  FaHeadset,
  FaHotel,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaPlaneDeparture,
  FaShieldAlt,
  FaStar,
  FaTag,
  FaTripadvisor,
  FaTimes,
  FaUser,
  FaWhatsapp,
} from 'react-icons/fa'
import ctaBg from '../../../assets/images/Hero Section Bg 5.jpg'
import { COMPANY_CONTACT } from '../../../constants/companyContact'
import { contactService } from '../../../services/contactService'

const stats = [
  {
    icon: FaStar,
    value: '4.9/5',
    label: 'Traveler Rating',
    detail: '(746+ Reviews)',
  },
  {
    icon: FaBriefcase,
    value: '120+',
    label: 'International',
    detail: 'Trips Planned',
  },
  {
    icon: FaGlobeAsia,
    value: '15+',
    label: 'Countries',
    detail: 'Covered',
  },
  {
    icon: FaHeadset,
    value: '24/7',
    label: 'Travel Support',
    detail: 'Always Here',
  },
]

const reviewSources = [
  { name: 'Google', score: '4.9/5' },
  { name: 'facebook', score: '4.8/5', icon: FaFacebook },
  { name: 'Trustpilot', score: '4.9/5', icon: FaStar },
  { name: 'tripadvisor', score: '4.7/5', icon: FaTripadvisor },
]

const assurances = [
  {
    icon: FaShieldAlt,
    title: 'IATA Certified',
    text: 'Trusted Agency',
  },
  {
    icon: FaGlobeAsia,
    title: 'Visa Assistance',
    text: 'Hassle-Free Process',
  },
  {
    icon: FaHotel,
    title: 'Handpicked Hotels',
    text: 'Comfort Guaranteed',
  },
  {
    icon: FaTag,
    title: 'Best Price Guarantee',
    text: 'Value for Money',
  },
  {
    icon: FaHeadset,
    title: '24/7 Support',
    text: "We're Always Here",
  },
]

const formFields = [
  { id: 'name', icon: FaUser, placeholder: 'Your Name', type: 'text' },
  { id: 'destination', icon: FaMapMarkerAlt, placeholder: 'Where do you want to go?', type: 'select' },
  { id: 'month', icon: FaCalendarAlt, placeholder: 'Travel Month', type: 'select' },
  { id: 'budget', icon: FaTag, placeholder: 'Budget (Per Person)', type: 'select' },
  { id: 'email', icon: FaEnvelope, placeholder: 'Email Address', type: 'email' },
  { id: 'phone', icon: FaPhoneAlt, placeholder: 'Phone Number', type: 'tel' },
]

const selectOptions = {
  destination: ['Dubai', 'Bali', 'Singapore', 'Thailand', 'Europe', 'Maldives'],
  month: ['June 2026', 'July 2026', 'August 2026', 'September 2026', 'October 2026'],
  budget: ['INR 50,000 - 75,000', 'INR 75,000 - 1,00,000', 'INR 1,00,000 - 1,50,000', 'INR 1,50,000+'],
}

const initialForm = {
  name: '',
  destination: '',
  month: '',
  budget: '',
  email: '',
  phone: '',
}

const ContactCTASection = () => {
  const [formData, setFormData] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [planFormData, setPlanFormData] = useState(initialForm)
  const [planSubmitted, setPlanSubmitted] = useState(false)
  const [planSubmitting, setPlanSubmitting] = useState(false)
  const [planError, setPlanError] = useState('')
  const [isPlanOpen, setIsPlanOpen] = useState(false)
  const closeButtonRef = useRef(null)

  const openPlanPopup = () => {
    setPlanSubmitted(false)
    setPlanError('')
    setIsPlanOpen(true)
  }

  const closePlanPopup = () => {
    setIsPlanOpen(false)
  }

  useEffect(() => {
    if (!isPlanOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') closePlanPopup()
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [isPlanOpen])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    setSubmitted(false)
    setError('')
  }

  const handlePlanChange = (event) => {
    const { name, value } = event.target
    setPlanFormData((current) => ({ ...current, [name]: value }))
    setPlanSubmitted(false)
    setPlanError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const message = [
      `Destination: ${formData.destination}`,
      `Travel month: ${formData.month}`,
      `Budget: ${formData.budget}`,
      'Lead source: Home page free travel plan CTA',
    ].join('\n')

    try {
      setSubmitting(true)
      setError('')
      await contactService.create({
        fullName: formData.name,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: 'Free Travel Plan Request',
        destination: formData.destination,
        message,
      })
      setSubmitted(true)
      setFormData(initialForm)
    } catch (err) {
      setSubmitted(false)
      setError(err.response?.data?.message || 'Unable to send your request right now. Please call or WhatsApp us.')
    } finally {
      setSubmitting(false)
    }
  }

  const handlePlanSubmit = async (event) => {
    event.preventDefault()

    const message = [
      `Destination: ${planFormData.destination}`,
      `Travel month: ${planFormData.month}`,
      `Budget: ${planFormData.budget}`,
      'Lead source: Floating plan trip enquiry popup',
    ].join('\n')

    try {
      setPlanSubmitting(true)
      setPlanError('')
      await contactService.create({
        fullName: planFormData.name,
        name: planFormData.name,
        email: planFormData.email,
        phone: planFormData.phone,
        subject: 'Plan Trip Enquiry',
        destination: planFormData.destination,
        message,
      })
      setPlanSubmitted(true)
      setPlanFormData(initialForm)
    } catch (err) {
      setPlanSubmitted(false)
      setPlanError(err.response?.data?.message || 'Unable to send your request right now. Please call or WhatsApp us.')
    } finally {
      setPlanSubmitting(false)
    }
  }

  return (
    <section className="relative overflow-hidden bg-dark-900 py-16 text-white md:py-20 lg:py-24">
      <img
        src={ctaBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-80"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,40,35,0.84)_0%,rgba(7,55,49,0.72)_43%,rgba(9,35,31,0.52)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(231,188,96,0.12),transparent_28%),linear-gradient(180deg,rgba(7,28,25,0.06),rgba(2,27,24,0.48))]" />
      <div className="grain-overlay" />

      <div className="section-container relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(360px,430px)] xl:gap-16">
          <div>
            <p className="section-eyebrow text-accent-300">
              <FaPlaneDeparture className="text-accent-400" />
              Start Your Journey
            </p>

            <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.55rem,11vw,4.25rem)] font-bold leading-[1.03] text-white md:text-6xl lg:text-7xl">
              Your Dream Journey
              <span className="block">
                Starts <span className="text-accent-400">Here.</span>
              </span>
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/86 md:text-xl">
              From visa to flights, stays to experiences - we handle every detail so you can enjoy a seamless international holiday.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#free-travel-plan"
                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-accent-500 to-secondary-400 px-7 text-base font-extrabold uppercase tracking-wide text-white shadow-[0_18px_45px_rgba(187,132,44,0.32)] transition hover:-translate-y-0.5 hover:from-accent-400 hover:to-secondary-300"
              >
                <FaPlaneDeparture className="text-2xl" />
                Plan My Trip
              </a>
              <a
                href={COMPANY_CONTACT.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-lg border border-white/24 bg-dark-900/35 px-7 text-base font-extrabold uppercase tracking-wide text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-accent-300/70 hover:bg-white/10"
              >
                <FaWhatsapp className="text-2xl" />
                Whatsapp Us
              </a>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex gap-4 border-white/10 lg:border-r lg:pr-5 last:lg:border-r-0">
                    <Icon className="mt-1 h-9 w-9 text-accent-400" />
                    <div>
                      <span className="block text-3xl font-bold leading-none text-white">{item.value}</span>
                      <span className="mt-3 block text-sm leading-6 text-white">{item.label}</span>
                      <span className="block text-sm leading-6 text-white/75">{item.detail}</span>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-12 max-w-4xl rounded-2xl border border-white/12 bg-dark-900/38 px-6 py-5 backdrop-blur-md">
              <div className="flex items-center justify-center gap-3 text-center sm:gap-4">
                <span className="h-px flex-1 bg-accent-400/35" />
                <p className="max-w-[14rem] text-[0.68rem] font-bold uppercase tracking-[0.18em] text-accent-300 sm:max-w-none sm:tracking-[0.42em]">
                  Trusted by thousands of happy travelers
                </p>
                <span className="h-px flex-1 bg-accent-400/35" />
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {reviewSources.map((source) => {
                  const Icon = source.icon
                  return (
                    <div key={source.name} className="text-center sm:border-r sm:border-white/12 sm:last:border-r-0">
                      <div className="flex min-h-8 items-center justify-center gap-1 text-2xl font-extrabold text-white/86">
                        {Icon ? <Icon className="text-white/80" /> : null}
                        <span>{source.name}</span>
                      </div>
                      <div className="mt-2 flex items-center justify-center gap-1 text-sm text-white/70">
                        <span>{source.score}</span>
                        <span className="flex gap-0.5 text-accent-400" aria-label="5 star rating">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar key={star} className="h-3 w-3" />
                          ))}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <form
            id="free-travel-plan"
            onSubmit={handleSubmit}
            className="relative rounded-2xl border border-white/12 bg-[#082a25]/88 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.36)] backdrop-blur-xl sm:p-6 md:rounded-3xl md:p-8"
          >
            <div className="absolute left-1/2 top-0 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-accent-400 to-secondary-400 text-2xl text-white shadow-[0_18px_40px_rgba(187,132,44,0.35)]">
              <FaCalendarAlt />
            </div>

            <div className="pt-8 text-center">
              <h3 className="font-display text-3xl font-bold leading-tight text-white md:text-4xl">
                Get Your Free
                <span className="block text-accent-300">Travel Plan</span>
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/72 md:text-base">
                Tell us your preferences and we'll craft the perfect itinerary for you.
              </p>
            </div>

            <div className="mt-6 grid gap-3">
              {formFields.map((field) => {
                const Icon = field.icon
                const isSelect = field.type === 'select'

                return (
                  <label key={field.id} className="relative block">
                    <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-accent-300" />
                    {isSelect ? (
                      <>
                        <select
                          name={field.id}
                          value={formData[field.id]}
                          onChange={handleChange}
                          required
                          className="h-14 w-full appearance-none rounded-lg border border-white/14 bg-transparent px-12 text-sm text-white/86 outline-none transition placeholder:text-white/56 focus:border-accent-300 focus:bg-white/5"
                        >
                          <option value="" className="bg-dark-900 text-white">
                            {field.placeholder}
                          </option>
                          {selectOptions[field.id].map((option) => (
                            <option key={option} value={option} className="bg-dark-900 text-white">
                              {option}
                            </option>
                          ))}
                        </select>
                        <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2 text-accent-300" />
                      </>
                    ) : (
                      <input
                        name={field.id}
                        type={field.type}
                        value={formData[field.id]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required
                        className="h-14 w-full rounded-lg border border-white/14 bg-transparent px-12 text-sm text-white outline-none transition placeholder:text-white/62 focus:border-accent-300 focus:bg-white/5"
                      />
                    )}
                  </label>
                )
              })}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-5 inline-flex h-14 w-full items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-accent-500 to-secondary-400 px-5 text-sm font-extrabold uppercase tracking-wide text-white shadow-[0_18px_45px_rgba(187,132,44,0.28)] transition hover:-translate-y-0.5 hover:from-accent-400 hover:to-secondary-300"
            >
              {submitting ? 'Sending Request...' : 'Get My Free Itinerary'}
              <FaArrowRight />
            </button>

            {submitted ? (
              <p className="mt-4 rounded-lg border border-accent-300/25 bg-accent-300/10 px-4 py-3 text-center text-sm text-accent-100">
                Thanks. Our travel expert will contact you shortly.
              </p>
            ) : null}

            {error ? (
              <p className="mt-4 rounded-lg border border-red-300/25 bg-red-500/10 px-4 py-3 text-center text-sm text-red-100">
                {error}
              </p>
            ) : null}

            <p className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-sm text-white/66">
              <span className="inline-flex items-center gap-2">
                <FaShieldAlt className="text-accent-400" />
                100% Safe & Secure
              </span>
              <span className="hidden text-white/36 sm:inline">/</span>
              <span>No Hidden Charges</span>
            </p>
          </form>
        </div>

        <div className="mt-12 grid rounded-2xl border border-white/14 bg-dark-900/45 backdrop-blur-md sm:grid-cols-2 lg:grid-cols-5">
          {assurances.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="flex items-center gap-4 border-white/12 p-5 sm:border-r sm:last:border-r-0 lg:px-7">
                <Icon className="h-9 w-9 text-accent-400" />
                <div>
                  <h4 className="font-semibold text-white">{item.title}</h4>
                  <p className="mt-1 text-sm text-white/62">{item.text}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={openPlanPopup}
        aria-label="Open plan trip enquiry form"
        className="group fixed bottom-[15.5rem] right-4 z-50 inline-flex min-h-14 max-w-[12rem] items-center gap-3 overflow-hidden rounded-xl border border-white/40 bg-[linear-gradient(135deg,#102724_0%,#1d4b42_38%,#d96f3a_100%)] px-3.5 py-2.5 text-left text-white shadow-[0_18px_42px_rgba(16,39,36,0.34),0_8px_20px_rgba(217,111,58,0.24)] ring-1 ring-accent-200/40 transition hover:-translate-y-1 hover:shadow-[0_24px_54px_rgba(16,39,36,0.42),0_12px_26px_rgba(217,111,58,0.3)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-200 sm:right-6 lg:bottom-auto lg:top-1/2 lg:min-h-[4.5rem] lg:max-w-none lg:-translate-y-1/2 lg:rounded-l-2xl lg:rounded-r-none lg:pr-5 lg:hover:-translate-y-[52%]"
      >
        <span className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-[linear-gradient(90deg,rgba(255,255,255,0.22),transparent)] opacity-70 transition group-hover:translate-x-full" />
        <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-secondary-600 shadow-[0_10px_24px_rgba(0,0,0,0.18)] ring-1 ring-white/70">
          <FaPlaneDeparture className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
        <span className="relative min-w-0 leading-tight">
          <span className="mb-1 inline-flex rounded-full bg-accent-300 px-2 py-0.5 text-[0.58rem] font-black uppercase tracking-[0.08em] text-dark-900">
            Free
          </span>
          <span className="block text-[0.72rem] font-black uppercase tracking-[0.08em] text-white sm:text-xs">
            Plan Trip
          </span>
          <span className="hidden text-[0.68rem] font-semibold text-white/78 lg:block">
            Custom itinerary
          </span>
        </span>
        <FaArrowRight className="relative hidden h-3.5 w-3.5 text-accent-200 transition group-hover:translate-x-0.5 sm:block" />
      </button>

      {isPlanOpen ? (
        <div
          className="fixed inset-0 z-[1250] flex items-center justify-center bg-dark-900/76 px-3 py-4 backdrop-blur-sm sm:px-6"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closePlanPopup()
          }}
        >
          <form
            onSubmit={handlePlanSubmit}
            aria-labelledby="plan-trip-popup-title"
            aria-modal="true"
            role="dialog"
            className="relative max-h-[92vh] w-full max-w-[34rem] overflow-y-auto rounded-2xl border border-white/12 bg-[#082a25] p-5 text-white shadow-[0_32px_90px_rgba(0,0,0,0.42)] sm:p-6 md:rounded-3xl md:p-8"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closePlanPopup}
              aria-label="Close plan trip form"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/14 transition hover:bg-white/18 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300"
            >
              <FaTimes className="h-4 w-4" />
            </button>

            <div className="pr-11 text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-accent-400 to-secondary-400 text-2xl text-white shadow-[0_18px_40px_rgba(187,132,44,0.35)]">
                <FaCalendarAlt />
              </span>
              <h3 id="plan-trip-popup-title" className="mt-5 font-display text-3xl font-bold leading-tight text-white md:text-4xl">
                Get Your Free
                <span className="block text-accent-300">Travel Plan</span>
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/72 md:text-base">
                Fill your details and we'll craft the perfect itinerary for you.
              </p>
            </div>

            <div className="mt-6 grid gap-3">
              {formFields.map((field) => {
                const Icon = field.icon
                const isSelect = field.type === 'select'

                return (
                  <label key={field.id} className="relative block">
                    <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-accent-300" />
                    {isSelect ? (
                      <>
                        <select
                          name={field.id}
                          value={planFormData[field.id]}
                          onChange={handlePlanChange}
                          required
                          className="h-14 w-full appearance-none rounded-lg border border-white/14 bg-transparent px-12 text-sm text-white/86 outline-none transition placeholder:text-white/56 focus:border-accent-300 focus:bg-white/5"
                        >
                          <option value="" className="bg-dark-900 text-white">
                            {field.placeholder}
                          </option>
                          {selectOptions[field.id].map((option) => (
                            <option key={option} value={option} className="bg-dark-900 text-white">
                              {option}
                            </option>
                          ))}
                        </select>
                        <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2 text-accent-300" />
                      </>
                    ) : (
                      <input
                        name={field.id}
                        type={field.type}
                        value={planFormData[field.id]}
                        onChange={handlePlanChange}
                        placeholder={field.placeholder}
                        required
                        className="h-14 w-full rounded-lg border border-white/14 bg-transparent px-12 text-sm text-white outline-none transition placeholder:text-white/62 focus:border-accent-300 focus:bg-white/5"
                      />
                    )}
                  </label>
                )
              })}
            </div>

            <button
              type="submit"
              disabled={planSubmitting}
              className="mt-5 inline-flex h-14 w-full items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-accent-500 to-secondary-400 px-5 text-sm font-extrabold uppercase tracking-wide text-white shadow-[0_18px_45px_rgba(187,132,44,0.28)] transition hover:-translate-y-0.5 hover:from-accent-400 hover:to-secondary-300 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {planSubmitting ? 'Sending Request...' : 'Get My Free Itinerary'}
              <FaArrowRight />
            </button>

            {planSubmitted ? (
              <p className="mt-4 rounded-lg border border-accent-300/25 bg-accent-300/10 px-4 py-3 text-center text-sm text-accent-100">
                Thanks. Our travel expert will contact you shortly.
              </p>
            ) : null}

            {planError ? (
              <p className="mt-4 rounded-lg border border-red-300/25 bg-red-500/10 px-4 py-3 text-center text-sm text-red-100">
                {planError}
              </p>
            ) : null}

            <p className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-sm text-white/66">
              <span className="inline-flex items-center gap-2">
                <FaShieldAlt className="text-accent-400" />
                100% Safe & Secure
              </span>
              <span className="hidden text-white/36 sm:inline">/</span>
              <span>No Hidden Charges</span>
            </p>
          </form>
        </div>
      ) : null}
    </section>
  )
}

export default ContactCTASection
