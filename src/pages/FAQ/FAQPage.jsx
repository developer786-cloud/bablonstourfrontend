import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  FiChevronDown,
  FiHelpCircle,
  FiMail,
  FiPhone,
  FiSearch,
  FiShield,
} from 'react-icons/fi'
import { getFaqPageConfig } from './faqContent'

const buildFaqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
})

const FAQPage = () => {
  const location = useLocation()
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [openQuestion, setOpenQuestion] = useState(null)

  const config = useMemo(() => {
    const pageKeyMap = {
      '/dubai/faq': 'dubai',
      '/thailand/faq': 'thailand',
      '/uzbekistan/faq': 'uzbekistan',
      '/georgia/faq': 'georgia',
      '/visa-faq': 'visa',
      '/flight-faq': 'flight',
      '/hotel-faq': 'hotel',
      '/payment-faq': 'payment',
      '/emi-faq': 'emi',
      '/passport-faq': 'passport',
      '/travel-insurance-faq': 'insurance',
      '/honeymoon-faq': 'honeymoon',
      '/family-tour-faq': 'family',
      '/group-tour-faq': 'group',
      '/corporate-tour-faq': 'corporate',
      '/student-tour-faq': 'student',
      '/luxury-tour-faq': 'luxury',
      '/budget-tour-faq': 'budget',
      '/packing-faq': 'packing',
      '/travel-safety-faq': 'safety',
    }

    return getFaqPageConfig(pageKeyMap[location.pathname] || 'master')
  }, [location.pathname])

  const categories = ['All', ...new Set(config.faqs.map((faq) => faq.category))]

  const filteredFaqs = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    return config.faqs.filter((faq) => {
      const matchesCategory = activeCategory === 'All' || faq.category === activeCategory
      const matchesSearch =
        !query ||
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, config.faqs, searchTerm])

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(config.faqs)) }}
      />

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
            {config.heroTitle}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
            {config.heroDescription}
          </p>

          <div className="mx-auto mt-9 max-w-2xl">
            <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white px-4 py-2 shadow-2xl">
              <FiSearch className="shrink-0 text-xl text-[#0b3b35]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder={config.searchPlaceholder}
                className="w-full border-0 bg-transparent py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 sm:text-base"
              />
            </div>
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-white/70">
            {config.highlights.map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <FiShield className="text-[#f4c15d]" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

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
            <h2 className="mt-4 text-xl font-bold text-gray-900">No answers found</h2>
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

      <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gray-200 bg-white p-8">
          <h2 className="font-serif text-2xl font-bold text-[#102b27]">
            Explore more FAQs
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            These related pages strengthen topical coverage and guide users to the next most relevant answer.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-[#0b3b35]">
                Related FAQ pages
              </h3>
              <ul className="mt-3 space-y-2 text-sm">
                {config.relatedFaqs.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} className="text-gray-600 hover:text-[#0b3b35]">
                      {item.label}
                    </Link>
                    <span className="ml-2 text-gray-400">{item.description}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-[#0b3b35]">
                Related travel pages
              </h3>
              <ul className="mt-3 space-y-2 text-sm">
                {config.relatedLinks.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} className="text-gray-600 hover:text-[#0b3b35]">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-[#0b3b35] px-6 py-10 sm:px-10 lg:flex lg:items-center lg:justify-between lg:px-14 lg:py-14">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#f4c15d]">
              Still have a question?
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl">
              Talk to a travel expert and plan with confidence.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/70">
              Tell us where you want to go, who you are traveling with, and your preferred dates. We will help you build the right trip.
            </p>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:mt-0">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#0b3b35] transition hover:bg-[#f4c15d]"
            >
              <FiMail />
              Contact Us
            </Link>

            <a
              href="tel:+919810212399"
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
