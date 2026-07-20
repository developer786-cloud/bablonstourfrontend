import { useState } from 'react'
import { FaArrowRight, FaCalendarAlt, FaChevronDown, FaLock, FaPaperPlane } from 'react-icons/fa'
import { contactService } from '../../../services/contactService'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  destination: '',
  travelDate: '',
  message: '',
}

const subjects = ['International Holiday', 'Visa Assistance', 'Flight & Hotel Package', 'Group Tour', 'Custom Itinerary,Honeymoon Trip', 'Other']
const destinations = ["Dubai",
  "Georgia",
  "Thailand",
  "Uzbekistan",

  "Burj Khalifa",
  "Deira Dubai",
  "Dubai City",
  "Dubai Desert",
  "Dubai Mall",
  "Dubai Marina",
  "Global Village",
  "Jumeirah Beach",
  "Jumeirah Beach Residence",
  "Palm Jumeirah",

  "Bakuriani",
  "Batumi",
  "Gudauri",
  "Kazbegi",
  "Kutaisi",
  "Mestia",
  "Sighnaghi",
  "Tbilisi",

  "Ayutthaya",
  "Bangkok",
  "Chiang Mai",
  "Hua Hin",
  "Krabi",
  "Pattaya",
  "Phuket",

  "Andijan",
  "Bukhara",
  "Khiva",
  "Margilan",
  "Nukus",
  "Samarkand",
  "Shahrisabz",
  "Tashkent",
  "Termez", ]

const ContactForm = () => {
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

    try {
      setSubmitting(true)
      setError('')
      await contactService.create({
        fullName: formData.name,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        destination: formData.destination,
        travelDate: formData.travelDate || null,
        message: formData.message,
      })
      setSubmitted(true)
      setFormData(initialForm)
    } catch (err) {
      setSubmitted(false)
      setError(err.response?.data?.message || 'Unable to send your message right now. Please call or WhatsApp us.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = 'h-12 w-full rounded-lg border border-white/22 bg-transparent px-4 text-sm text-white outline-none transition placeholder:text-white/52 focus:border-accent-300 focus:bg-white/5'
  const labelClass = 'mb-2 block text-sm font-semibold text-white'

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit}
      className="rounded-[1.35rem] border border-white/12 bg-[#062f29] p-5 text-white shadow-[0_28px_80px_rgba(16,39,36,0.24)] sm:p-6 md:p-8"
    >
      <h2 className="font-display text-[clamp(2rem,8vw,2.5rem)] font-bold leading-tight text-white">Send Us a Message</h2>
      <span className="mt-4 block h-0.5 w-16 rounded-full bg-accent-400" />

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label>
          <span className={labelClass}>Your Name <span className="text-accent-300">*</span></span>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            required
            placeholder="Enter your name"
            className={inputClass}
          />
        </label>

        <label>
          <span className={labelClass}>Your Email <span className="text-accent-300">*</span></span>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            required
            placeholder="Enter your email"
            className={inputClass}
          />
        </label>

        <label>
          <span className={labelClass}>Phone Number <span className="text-accent-300">*</span></span>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            type="tel"
            required
            placeholder="Enter your phone number"
            className={inputClass}
          />
        </label>

        <label className="relative">
          <span className={labelClass}>Subject <span className="text-accent-300">*</span></span>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className={`${inputClass} appearance-none pr-11`}
          >
            <option value="" className="bg-dark-900 text-white">Select a subject</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject} className="bg-dark-900 text-white">{subject}</option>
            ))}
          </select>
          <FaChevronDown className="pointer-events-none absolute bottom-4 right-4 h-3 w-3 text-accent-300" />
        </label>

        <label className="relative">
          <span className={labelClass}>Destination of Interest</span>
          <select
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className={`${inputClass} appearance-none pr-11`}
          >
            <option value="" className="bg-dark-900 text-white">Where do you want to go?</option>
            {destinations.map((destination) => (
              <option key={destination} value={destination} className="bg-dark-900 text-white">{destination}</option>
            ))}
          </select>
          <FaChevronDown className="pointer-events-none absolute bottom-4 right-4 h-3 w-3 text-accent-300" />
        </label>

        <label className="relative">
          <span className={labelClass}>Travel Date</span>
          <input
            name="travelDate"
            value={formData.travelDate}
            onChange={handleChange}
            type="date"
            className={`${inputClass} pr-11`}
          />
          <FaCalendarAlt className="pointer-events-none absolute bottom-4 right-4 h-4 w-4 text-accent-300" />
        </label>
      </div>

      <label className="mt-5 block">
        <span className={labelClass}>Message <span className="text-accent-300">*</span></span>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
          placeholder="Tell us more about your travel plans..."
          className="w-full rounded-lg border border-white/22 bg-transparent px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/52 focus:border-accent-300 focus:bg-white/5"
        />
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 inline-flex h-14 w-full items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-accent-500 to-secondary-500 px-6 text-base font-extrabold text-white shadow-[0_18px_45px_rgba(187,132,44,0.24)] transition hover:-translate-y-0.5 hover:from-accent-400 hover:to-secondary-400"
      >
        {submitting ? 'Sending...' : 'Send Message'}
        <FaPaperPlane className="h-4 w-4" />
      </button>

      {submitted ? (
        <p className="mt-4 rounded-lg border border-accent-300/25 bg-accent-300/10 px-4 py-3 text-center text-sm text-accent-100">
          Thank you. Our travel expert will get back to you shortly.
        </p>
      ) : null}

      {error ? (
        <p className="mt-4 rounded-lg border border-red-300/25 bg-red-500/10 px-4 py-3 text-center text-sm text-red-100">
          {error}
        </p>
      ) : null}

      <p className="mt-5 flex flex-wrap items-center justify-center gap-2 text-center text-sm text-white/72">
        <FaLock className="h-4 w-4 text-accent-300" />
        We respect your privacy. Your information is safe with us.
        <FaArrowRight className="hidden h-3 w-3 text-accent-300 sm:inline" />
      </p>
    </form>
  )
}

export default ContactForm
