import { Link } from 'react-router-dom'
import { FaArrowRight, FaCalendarCheck, FaClipboardCheck, FaComments, FaPlaneDeparture } from 'react-icons/fa'
import { ROUTES } from '../../../constants/routes'
import visionImage from '../../../assets/images/about page image 2.png'

const processSteps = [
  {
    icon: FaComments,
    title: 'Understand Your Goal',
    text: 'We begin with your destination, budget, travel style, visa need, or overseas career objective so the plan starts in the right direction.',
  },
  {
    icon: FaClipboardCheck,
    title: 'Build the Right Solution',
    text: 'Our team shapes the itinerary, visa checklist, document flow, or recruitment preparation plan around your exact requirement.',
  },
  {
    icon: FaCalendarCheck,
    title: 'Guide Every Detail',
    text: 'Dates, documents, applications, payments, interview preparation, confirmations, and support are aligned step by step.',
  },
]

const Vision = () => {
  return (
    <section className="relative overflow-hidden bg-[#FFFCF7] py-16 md:py-20 lg:py-24">
      <div className="absolute right-0 top-0 hidden h-[30rem] w-[42rem] bg-[radial-gradient(circle_at_center,rgba(217,111,58,0.1),transparent_65%)] lg:block" />
      <div className="absolute left-[6%] top-24 hidden h-56 w-[34rem] rounded-full border border-dashed border-sand-300/80 lg:block" />

      <div className="section-container relative grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="relative">
          <div className="overflow-hidden rounded-[2rem] border border-sand-200 bg-white p-3 shadow-[0_28px_80px_rgba(16,39,36,0.14)]">
            <img src={visionImage} alt="Travel planning documents and journey inspiration" className="h-[360px] w-full rounded-[1.5rem] object-fit sm:h-[460px] lg:h-[520px]" />
          </div>
          <div className="absolute -bottom-7 left-4 right-4 rounded-[1.25rem] border border-sand-200 bg-white p-4 shadow-[0_18px_50px_rgba(16,39,36,0.14)] sm:left-7 sm:right-7 sm:p-5">
            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-secondary-600">Our vision</p>
            <p className="mt-2 font-display text-xl font-bold leading-tight text-dark-900 sm:text-2xl">To become a trusted name for premium travel, visa guidance, and overseas opportunity support.</p>
          </div>
        </div>

        <div>
          <p className="section-eyebrow text-secondary-600">
            <FaPlaneDeparture className="h-4 w-4" />
            How we plan
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.08] text-dark-900 md:text-5xl">
            Every smooth journey starts with clear guidance and careful execution.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-dark-600">
            We combine travel knowledge, visa awareness, recruitment support, and clear communication so you always know what is included, what comes next, and who to call when you need help.
          </p>

          <div className="mt-8 grid gap-4">
            {processSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <article key={step.title} className="grid gap-4 rounded-[1.25rem] border border-sand-200 bg-white/82 p-5 shadow-[0_14px_40px_rgba(16,39,36,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(16,39,36,0.13)] sm:grid-cols-[auto_1fr]">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-900 text-accent-300">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-secondary-600">Step 0{index + 1}</p>
                    <h3 className="mt-1 text-lg font-extrabold text-dark-900">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-dark-600">{step.text}</p>
                  </div>
                </article>
              )
            })}
          </div>

          <Link
            to={ROUTES.CONTACT}
            className="mt-8 inline-flex h-14 items-center justify-center gap-3 rounded-full bg-primary-900 px-8 text-sm font-extrabold uppercase tracking-[0.06em] text-white shadow-[0_16px_38px_rgba(16,39,36,0.2)] transition hover:-translate-y-0.5 hover:bg-primary-800"
          >
            Start Planning
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Vision
