import { FaCheck, FaHeadset, FaWhatsapp } from 'react-icons/fa'

const whyChoose = ['15+ Years of Experience', '10,000+ Happy Travelers', 'Customized & Hassle-free Travel', 'Best Price Guarantee']

const WhatsappSection = ({ contactDetails }) => {
  return (
    <div className="grid gap-6 md:grid-cols-[0.92fr_1fr] md:items-center">
      <div className="rounded-2xl border border-white/14 bg-white/[0.05] p-6 backdrop-blur">
        <div className="flex items-start gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-accent-300/35 bg-accent-300/10 text-accent-300">
            <FaHeadset className="h-7 w-7" />
          </span>
          <div>
            <h2 className="text-lg font-extrabold text-white">Need Immediate Assistance?</h2>
            <p className="mt-2 text-sm leading-6 text-white/72">Talk to our travel expert now.</p>
            <a
              href={contactDetails.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex h-12 items-center justify-center gap-3 rounded-lg border border-white/16 bg-white/[0.06] px-6 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:border-accent-300/60 hover:bg-white/12"
            >
              <FaWhatsapp className="h-5 w-5 text-green-400" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="border-white/12 md:border-l md:pl-8">
        <h2 className="text-lg font-extrabold text-white">Why Choose Bablons?</h2>
        <ul className="mt-4 grid gap-2">
          {whyChoose.map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm font-semibold text-white/82">
              <FaCheck className="h-3.5 w-3.5 text-accent-400" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default WhatsappSection
