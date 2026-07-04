import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaChevronDown, FaHeadset, FaQuestionCircle, FaShieldAlt } from 'react-icons/fa'
import { ROUTES } from '../../../constants/routes'

const faqs = [
  {
    question: 'Can Bablons customize my holiday package?',
    answer:
      'Yes. We can customize hotels, sightseeing, transfers, meals, travel pace, room type, and extra experiences based on your budget and travel style.',
  },
  {
    question: 'Do you help with visas and documents?',
    answer:
      'Yes. Our team guides you with visa requirements, document checklists, travel insurance, and destination-specific planning support.',
  },
  {
    question: 'Are flights included in packages?',
    answer:
      'Flights can be included or excluded depending on the package. Every quotation clearly mentions flights, hotels, transfers, meals, and inclusions.',
  },
  {
    question: 'How do I book a trip?',
    answer:
      'Share your destination, dates, traveler count, and budget through the enquiry form, WhatsApp, call, or contact page. Our travel expert will send a suitable plan.',
  },
]

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="relative overflow-hidden bg-[#FAF8F4] py-16 md:py-20 lg:py-24">
      <div className="section-container">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="section-eyebrow text-secondary-600">
              <FaQuestionCircle className="h-4 w-4" />
              Travel FAQs
            </p>
            <h2 className="mt-4 max-w-xl font-display text-4xl font-bold leading-tight text-dark-900 md:text-5xl">
              Answers before your journey begins.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-dark-600">
              Quick answers about packages, customization, visas, payments, and booking support with Bablons Travel.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-lg border border-sand-200 bg-white p-5 shadow-sm">
                <FaShieldAlt className="h-6 w-6 text-secondary-600" />
                <p className="mt-3 text-sm font-extrabold text-dark-900">Clear planning guidance</p>
                <p className="mt-1 text-sm leading-6 text-dark-500">No hidden confusion before booking.</p>
              </div>
              <div className="rounded-lg border border-sand-200 bg-white p-5 shadow-sm">
                <FaHeadset className="h-6 w-6 text-secondary-600" />
                <p className="mt-3 text-sm font-extrabold text-dark-900">Expert travel support</p>
                <p className="mt-1 text-sm leading-6 text-dark-500">Talk to our team for trip-specific help.</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-sand-200 bg-white p-4 shadow-[0_18px_55px_rgba(16,39,36,0.08)] sm:p-5">
            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index

                return (
                  <article key={faq.question} className="overflow-hidden rounded-lg border border-sand-200 bg-[#FFFCF7]">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="font-bold leading-6 text-dark-900">{faq.question}</span>
                      <FaChevronDown className={`h-4 w-4 shrink-0 text-secondary-600 transition ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                      <div className="overflow-hidden">
                        <p className="border-t border-sand-200 px-5 py-4 text-sm leading-7 text-dark-600">{faq.answer}</p>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>

            <div className="mt-5 flex flex-col gap-3 rounded-lg bg-primary-900 p-5 text-white sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-2xl font-bold">Still have a question?</p>
                <p className="mt-1 text-sm text-white/70">View all FAQs or contact our travel expert.</p>
              </div>
              <Link
                to={ROUTES.FAQ}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-extrabold text-primary-900 hover:bg-accent-200"
              >
                View All FAQs
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FaqSection
