import { FaAward, FaHeadset, FaPlaneDeparture, FaShieldAlt } from 'react-icons/fa'
import heroBg from '../../../assets/images/Hero Section Bg 4.jpg'

const heroHighlights = [
  { icon: FaHeadset, title: 'Quick Response', text: 'Under 2 Hours' },
  { icon: FaAward, title: 'Expert Travel', text: 'Consultation' },
  { icon: FaShieldAlt, title: '100% Safe &', text: 'Secure' },
]

const ContactHero = () => {
  return (
    <section className="relative min-h-[360px] overflow-hidden bg-dark-900 text-white md:min-h-[430px]">
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-75"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,40,35,0.9)_0%,rgba(7,55,49,0.74)_48%,rgba(9,35,31,0.42)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_16%,rgba(231,188,96,0.16),transparent_30%),linear-gradient(180deg,rgba(7,28,25,0.06),rgba(2,27,24,0.55))]" />
      <div className="grain-overlay" />

      <div className="section-container relative flex min-h-[360px] items-center py-16 md:min-h-[430px]">
        <div className="max-w-3xl">
          <p className="section-eyebrow text-accent-300">
            <FaPlaneDeparture className="text-accent-400" />
            Let's Connect
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.55rem,11vw,4rem)] font-bold leading-[1.04] text-white md:text-6xl lg:text-7xl">
            We Are Here To Plan
            <span className="block text-accent-400">Your Perfect Journey</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-white/86">
            Have questions or ready to start your next adventure? Our travel experts are just a message away.
          </p>

          <div className="mt-8 grid max-w-3xl gap-4 sm:grid-cols-3 sm:gap-5">
            {heroHighlights.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="flex items-center gap-3 sm:gap-4 sm:border-r sm:border-white/16 sm:pr-5 sm:last:border-r-0">
                  <Icon className="h-9 w-9 text-accent-400" />
                  <div>
                    <h2 className="text-sm font-extrabold text-white">{item.title}</h2>
                    <p className="mt-1 text-sm font-semibold text-white/82">{item.text}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactHero
