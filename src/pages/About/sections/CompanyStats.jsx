import { FaAward, FaBriefcase, FaGlobeAsia, FaHeadset, FaPassport, FaStar, FaSuitcaseRolling } from 'react-icons/fa'

const stats = [
  { icon: FaSuitcaseRolling, value: '120+', label: 'International trips planned', tone: 'text-secondary-600' },
  { icon: FaGlobeAsia, value: '15+', label: 'Countries covered', tone: 'text-primary-800' },
  { icon: FaStar, value: '4.9/5', label: 'Traveler satisfaction', tone: 'text-accent-600' },
  { icon: FaHeadset, value: '24/7', label: 'Travel support mindset', tone: 'text-secondary-600' },
]

const services = [
  {
    icon: FaSuitcaseRolling,
    title: 'Tailored Tour Packages',
    text: 'Customized holidays based on your budget, travel style, destination interests, hotel comfort, transport needs, guided tours, and essential amenities.',
  },
  {
    icon: FaPassport,
    title: 'Hassle-Free Visa Services',
    text: 'Step-by-step visa assistance with document guidance, updated country requirements, accurate applications, and timely submission support.',
  },
  {
    icon: FaBriefcase,
    title: 'Recruitment for Global Opportunities',
    text: 'Overseas recruitment support for candidates seeking foreign company opportunities, including profile guidance, resume support, and interview preparation.',
  },
]

const CompanyStats = () => {
  return (
    <section className="relative bg-[#FFFCF7] py-12 md:py-14">
      <div className="section-container">
        <div className="-mt-16 grid overflow-hidden rounded-[1.5rem] border border-sand-200 bg-white shadow-[0_30px_90px_rgba(16,39,36,0.16)] md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="border-b border-sand-200 p-6 last:border-b-0 md:even:border-l lg:border-b-0 lg:border-l lg:first:border-l-0 lg:p-7">
                <Icon className={`h-9 w-9 ${stat.tone}`} />
                <p className="mt-5 font-display text-4xl font-bold leading-none text-dark-900">{stat.value}</p>
                <p className="mt-3 text-sm font-extrabold uppercase tracking-[0.08em] text-dark-500">{stat.label}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-10 grid gap-6 rounded-[1.35rem] border border-sand-200 bg-white/76 p-6 shadow-[0_18px_50px_rgba(16,39,36,0.08)] backdrop-blur lg:grid-cols-[auto_1fr_auto] lg:items-center lg:p-7">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-900 text-accent-300">
            <FaAward className="h-7 w-7" />
          </span>
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-secondary-600">Trusted travel partner</p>
            <h2 className="mt-2 font-display text-3xl font-bold leading-tight text-dark-900">Premium planning for families, couples, groups, and business travelers.</h2>
          </div>
          <p className="max-w-md text-base leading-7 text-dark-600">
            We combine destination knowledge, supplier relationships, and practical support so every itinerary feels smooth before the journey begins.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <article key={service.title} className="group rounded-[1.35rem] border border-sand-200 bg-white p-6 shadow-[0_18px_50px_rgba(16,39,36,0.08)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(16,39,36,0.14)]">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-900 text-accent-300 transition group-hover:scale-105">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-bold leading-tight text-dark-900">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-dark-600">{service.text}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CompanyStats
