import { FaBriefcase, FaCheckCircle, FaGlobeAsia, FaHotel, FaPassport, FaRoute, FaShieldAlt } from 'react-icons/fa'
import missionBg from '../../../assets/images/testimonialsectionbg.jpg'

const values = [
  {
    icon: FaRoute,
    title: 'Personalized Travel Design',
    text: 'Every traveler is different, so we craft tour packages around your preferences, budget, timing, and comfort level.',
  },
  {
    icon: FaHotel,
    title: 'Complete Trip Handling',
    text: 'Accommodations, local transportation, guided tours, and essential travel details are planned for a hassle-free experience.',
  },
  {
    icon: FaPassport,
    title: 'Visa Expertise',
    text: 'Our team stays updated on country requirements so your visa application is accurate, organized, and submitted on time.',
  },
  {
    icon: FaBriefcase,
    title: 'Global Recruitment Support',
    text: 'We help candidates prepare for foreign company opportunities with profile guidance, resume support, and interview readiness.',
  },
  {
    icon: FaGlobeAsia,
    title: 'International Network',
    text: 'Established relationships with travel and overseas partners help us deliver better guidance, access, and opportunities.',
  },
  {
    icon: FaCheckCircle,
    title: 'Personal Care',
    text: 'We listen carefully, communicate clearly, and shape solutions that suit your journey or career goals.',
  },
]

const Mission = () => {
  return (
    <section className="relative overflow-hidden bg-dark-900 py-16 text-white md:py-20 lg:py-24">
      <img src={missionBg} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-100" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,42,35,0.94)_0%,rgba(1,42,35,0.82)_45%,rgba(1,42,35,0.7)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(231,188,96,0.18),transparent_30%),radial-gradient(circle_at_90%_60%,rgba(255,255,255,0.08),transparent_28%)]" />
      <div className="grain-overlay" />

      <div className="section-container relative">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="section-eyebrow text-accent-300">
              <FaShieldAlt className="text-accent-300" />
              Our mission
            </p>
            <h2 className="mt-4 max-w-xl font-display text-4xl font-bold leading-[1.08] text-white md:text-5xl">
              Seamless travel and global opportunities, handled with expertise.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/72">
              Our mission is to simplify complex travel and overseas processes. Whether you need a memorable vacation, visa assistance, or recruitment guidance for foreign companies, Bablons Tours & Entertainments gives you one trusted place to start.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <article key={value.title} className="rounded-[1.25rem] border border-white/14 bg-white/[0.09] p-6 shadow-[0_18px_55px_rgba(0,0,0,0.16)] backdrop-blur transition hover:-translate-y-1 hover:border-accent-300/50 hover:bg-white/[0.12]">
                  <Icon className="h-7 w-7 text-accent-300" />
                  <h3 className="mt-5 text-lg font-extrabold text-white">{value.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/68">{value.text}</p>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Mission
