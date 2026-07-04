import { useState } from 'react'
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

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    setSubmitted(false)
    setError('')
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
    </section>
  )
}

export default ContactCTASection
