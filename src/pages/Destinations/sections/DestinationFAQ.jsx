import { useEffect } from 'react'
import { upsertJsonLd, removeJsonLd } from '../../../utils/seo'

const DestinationFAQ = ({ faqs = [], id }) => {
  useEffect(() => {
    if (!faqs || !faqs.length) return

    const payload = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    }

    upsertJsonLd('faq', payload)
    return () => removeJsonLd('faq')
  }, [faqs])

  if (!faqs || !faqs.length) return null

  return (
    <section id={id} className="section-shell scroll-mt-[calc(var(--header-height-mobile)+1rem)] bg-white lg:scroll-mt-[calc(var(--header-height-desktop)+1rem)]">
      <div className="section-container">
        <p className="section-eyebrow">Frequently Asked</p>
        <h2 className="mt-3 section-heading">Questions about this destination</h2>
        <div className="mt-8 divide-y divide-sand-200 overflow-hidden rounded-[24px] border border-sand-200 bg-white shadow-[0_14px_34px_rgba(16,39,36,0.07)]">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-5 md:p-6">
              <h3 className="font-bold text-dark-900">{faq.question}</h3>
              <p className="mt-2 text-sm leading-7 text-dark-500">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DestinationFAQ
