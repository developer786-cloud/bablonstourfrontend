import { useMemo, useState } from 'react'
import {
  FiChevronDown,
  FiClock,
  FiHelpCircle,
  FiMail,
  FiMessageCircle,
  FiPhone,
  FiSearch,
  FiShield,
} from 'react-icons/fi'
import { COMPANY_CONTACT } from '../../constants/companyContact'

const faqs = [
  {
    category: 'Packages & Customization',
    question: 'Can packages be customized?',
    answer:
      'Yes. Every Bablons package can be tailored to your preferences. We can adjust hotels, trip pace, sightseeing, meals, transfers, activities, room types, and trip extensions.',
  },
  {
    category: 'Packages & Customization',
    question: 'Can I create my own itinerary?',
    answer:
      'Absolutely. Tell us your destination, travel dates, group size, budget, and interests. Our travel team will create a personalized itinerary for you.',
  },
  {
    category: 'Packages & Customization',
    question: 'Do you arrange group tours?',
    answer:
      'Yes. Group tours are one of our main services. We can arrange packages for corporate teams, friends groups, college groups, family groups, and special-interest travel groups.',
  },
  {
    category: 'Packages & Customization',
    question: 'What is the minimum group size for a group package?',
    answer:
      'The minimum group size depends on the destination and package type. Most group packages can be planned for 10 to 25 travelers, and larger groups can also be arranged.',
  },
  {
    category: 'Booking & Payment',
    question: 'How do I book a package?',
    answer:
      'You can submit an enquiry from the package page, WhatsApp us, call our team, or fill out the contact form. We will confirm availability, share the final quotation, and guide you through booking.',
  },
  {
    category: 'Booking & Payment',
    question: 'How much advance payment is required?',
    answer:
      'Advance payment depends on the destination, travel dates, hotel availability, and airline requirements. Our team will clearly explain the payment schedule before you confirm the booking.',
  },
  {
    category: 'Booking & Payment',
    question: 'Can I pay in installments?',
    answer:
      'For many packages, payment can be split into planned installments before departure. The exact schedule will be shared in your booking quotation.',
  },
  {
    category: 'Booking & Payment',
    question: 'Will I receive a booking confirmation?',
    answer:
      'Yes. After your booking is confirmed, you will receive your confirmation details, payment summary, itinerary, hotel information, and travel support contact details.',
  },
  {
    category: 'Flights & Visa',
    question: 'Are flights included in the package?',
    answer:
      'Flights may be included or excluded depending on the package. We can also add flights on request. Every quotation clearly mentions what is included before booking.',
  },
  {
    category: 'Flights & Visa',
    question: 'Do you help with visas?',
    answer:
      'Yes. We provide visa guidance, document checklists, and practical support based on the destination and traveler profile. Visa approval always remains subject to embassy or consulate decisions.',
  },
  {
    category: 'Flights & Visa',
    question: 'Do I need travel insurance?',
    answer:
      'Travel insurance is strongly recommended and may be mandatory for some destinations. We can guide you on suitable insurance requirements for your trip.',
  },
  {
    category: 'Hotels & Transport',
    question: 'What type of hotels do you provide?',
    answer:
      'We offer hotel options based on your package and budget, including standard, premium, luxury, family-friendly, and group-friendly stays. Hotel names or categories are confirmed before booking.',
  },
  {
    category: 'Hotels & Transport',
    question: 'Are airport transfers included?',
    answer:
      'Airport transfers are included when listed in your package inclusions. If not included, we can add private or shared airport transfer options.',
  },
  {
    category: 'Hotels & Transport',
    question: 'Will transport be private or shared?',
    answer:
      'This depends on your selected package. Group tours usually use shared group transport, while private tours can include private vehicles and dedicated drivers.',
  },
  {
    category: 'During Your Trip',
    question: 'Will someone support us during the trip?',
    answer:
      'Yes. Our team provides travel support before departure and during your trip. For group tours, a tour coordinator or local support contact may also be available.',
  },
  {
    category: 'During Your Trip',
    question: 'What happens if my flight is delayed?',
    answer:
      'Contact our support team as soon as possible. We will coordinate with the transfer provider or local team and help adjust your arrival arrangements where possible.',
  },
  {
    category: 'Changes & Cancellation',
    question: 'Can I change my travel dates after booking?',
    answer:
      'Date changes are possible depending on hotel, airline, visa, and supplier policies. Any fare difference or change charge will be communicated before changes are confirmed.',
  },
  {
    category: 'Changes & Cancellation',
    question: 'What is your cancellation policy?',
    answer:
      'Cancellation charges depend on the destination, travel date, supplier rules, and services already booked. The applicable cancellation policy will be shared before you make payment.',
  },
  {
    category: 'Planning',
    question: 'How early should I plan my trip?',
    answer:
      'For peak seasons, international holidays, and group tours, we recommend planning at least 6 to 10 weeks in advance. For larger groups, earlier planning gives better hotel and flight options.',
  },
  {
    category: 'Planning',
    question: 'Which destinations do you currently offer?',
    answer:
      'Bablons currently focuses on Dubai and UAE, Thailand, Uzbekistan, and Georgia. We create packages around popular cities and experiences in each destination.',
  },
]

const categories = ['All', ...new Set(faqs.map((faq) => faq.category))]

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [openQuestion, setOpenQuestion] = useState(null)

  const filteredFaqs = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === 'All' || faq.category === activeCategory

      const matchesSearch =
        !query ||
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchTerm])

  const groupedFaqs = filteredFaqs.reduce((groups, faq) => {
    if (!groups[faq.category]) {
      groups[faq.category] = []
    }

    groups[faq.category].push(faq)
    return groups
  }, {})

  const handleToggle = (question) => {
    setOpenQuestion((current) => (current === question ? null : question))
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f8f6]">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#062f2a] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-[#d89b2b] blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-[#1c7768] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#f4c15d]/30 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#f4c15d]">
            <FiHelpCircle />
            Travel help centre
          </div>

          <h1 className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Answers before your journey begins.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
            Find quick answers about packages, group tours, payments, visas,
            hotels, travel support, and booking your next trip with Bablons.
          </p>

          <div className="mx-auto mt-9 max-w-2xl">
            <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white px-4 py-2 shadow-2xl">
              <FiSearch className="shrink-0 text-xl text-[#0b3b35]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search your question..."
                className="w-full border-0 bg-transparent py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 sm:text-base"
              />
            </div>
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-white/70">
            <span className="inline-flex items-center gap-2">
              <FiShield className="text-[#f4c15d]" />
              Clear booking guidance
            </span>
            <span className="inline-flex items-center gap-2">
              <FiClock className="text-[#f4c15d]" />
              Quick travel support
            </span>
            <span className="inline-flex items-center gap-2">
              <FiMessageCircle className="text-[#f4c15d]" />
              Personalized trip planning
            </span>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-10">
          <p className="text-center text-sm font-bold uppercase tracking-[0.14em] text-primary-600">
            Browse by topic
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {categories.map((category) => {
              const isActive = activeCategory === category

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-[#0b3b35] text-white shadow-lg shadow-[#0b3b35]/20'
                      : 'border border-gray-200 bg-white text-gray-600 hover:border-[#0b3b35]/30 hover:text-[#0b3b35]'
                  }`}
                >
                  {category}
                </button>
              )
            })}
          </div>
        </div>

        {Object.keys(groupedFaqs).length > 0 ? (
          <div className="space-y-12">
            {Object.entries(groupedFaqs).map(([category, categoryFaqs]) => (
              <div key={category}>
                <div className="mb-5 flex items-center gap-4">
                  <h2 className="font-serif text-2xl font-bold text-[#102b27] sm:text-3xl">
                    {category}
                  </h2>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>

                <div className="grid gap-4">
                  {categoryFaqs.map((faq) => {
                    const isOpen = openQuestion === faq.question

                    return (
                      <article
                        key={faq.question}
                        className={`overflow-hidden rounded-2xl border bg-white transition ${
                          isOpen
                            ? 'border-[#d89b2b]/50 shadow-lg shadow-[#0b3b35]/10'
                            : 'border-gray-200 hover:border-[#0b3b35]/20'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => handleToggle(faq.question)}
                          aria-expanded={isOpen}
                          className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                        >
                          <span className="text-base font-bold leading-6 text-[#122e2a] sm:text-lg">
                            {faq.question}
                          </span>

                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition ${
                              isOpen
                                ? 'rotate-180 border-[#d89b2b] bg-[#d89b2b] text-white'
                                : 'border-gray-200 bg-gray-50 text-[#0b3b35]'
                            }`}
                          >
                            <FiChevronDown />
                          </span>
                        </button>

                        <div
                          className={`grid transition-all duration-300 ${
                            isOpen
                              ? 'grid-rows-[1fr] opacity-100'
                              : 'grid-rows-[0fr] opacity-0'
                          }`}
                        >
                          <div className="overflow-hidden">
                            <p className="border-t border-gray-100 px-5 py-5 text-sm leading-7 text-gray-600 sm:px-6 sm:text-base">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
            <FiSearch className="mx-auto text-4xl text-primary-600" />
            <h2 className="mt-4 text-xl font-bold text-gray-900">
              No answers found
            </h2>
            <p className="mt-2 text-gray-600">
              Try another keyword or contact our travel team directly.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('')
                setActiveCategory('All')
              }}
              className="mt-5 rounded-full bg-[#0b3b35] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#14564d]"
            >
              Clear search
            </button>
          </div>
        )}
      </section>

      {/* Contact CTA */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-[#0b3b35] px-6 py-10 sm:px-10 lg:flex lg:items-center lg:justify-between lg:px-14 lg:py-14">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#f4c15d]">
              Still have a question?
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl">
              Talk to a travel expert and plan with confidence.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/70">
              Tell us where you want to go, who you are traveling with, and
              your preferred dates. We will help you build the right trip.
            </p>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:mt-0">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#0b3b35] transition hover:bg-[#f4c15d]"
            >
              <FiMail />
              Contact Us
            </a>

            <a
              href={COMPANY_CONTACT.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-bold text-white transition hover:border-[#f4c15d] hover:text-[#f4c15d]"
            >
              <FiPhone />
              Talk to us directly
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default FAQPage
