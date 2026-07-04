import SectionCard from '../common/SectionCard'
import SectionHeading from '../common/SectionHeading'

const PackageFaq = ({ faqs = [] }) => {
  if (!faqs.length) return null

  return (
    <SectionCard>
      <SectionHeading title="Frequently Asked Questions" />
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <details key={`${faq.question}-${index}`} className="rounded-lg border border-slate-200 p-4">
            <summary className="cursor-pointer font-black text-slate-950">{faq.question}</summary>
            <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
          </details>
        ))}
      </div>
    </SectionCard>
  )
}

export default PackageFaq
