import { Link } from 'react-router-dom'
import { FaArrowRight, FaGlobeAsia, FaHeadset, FaPlaneDeparture, FaShieldAlt, FaStar } from 'react-icons/fa'
import { ROUTES } from '../../../constants/routes'
import heroBg from '../../../assets/images/Hero Section Bg 5.jpg'
import storyImage from '../../../assets/images/about page image.jpg'

const highlights = [
  { icon: FaShieldAlt, title: 'Seamless Travel', text: 'Tour packages, visa guidance, and travel support under one roof' },
  { icon: FaGlobeAsia, title: 'Global Reach', text: 'International holidays and overseas opportunities through trusted networks' },
  { icon: FaHeadset, title: 'Personal Consultant', text: 'Real experts who listen, plan, guide, and stay reachable' },
]

const CompanyStory = () => {
  return (
    <section className="relative overflow-hidden bg-dark-900 text-white">
      <img src={heroBg} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-95" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,40,35,0.78)_0%,rgba(7,55,49,0.64)_46%,rgba(9,35,31,0.28)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_14%,rgba(231,188,96,0.12),transparent_30%),linear-gradient(180deg,rgba(7,28,25,0.02),rgba(2,27,24,0.44))]" />
      <div className="grain-overlay" />

      <div className="section-container relative grid min-h-[660px] items-center gap-10 py-14 md:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-20">
        <div className="max-w-4xl">
          <p className="section-eyebrow text-accent-300">
            <FaPlaneDeparture className="text-accent-400" />
            About Bablons Tours
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.55rem,11vw,4.25rem)] font-bold leading-[1.03] text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.24)] md:text-6xl lg:text-7xl">
            Your Trusted Partner For
            <span className="block">
              Travel, Visa & <span className="text-accent-400">Opportunities.</span>
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/88 md:text-xl">
            In today's fast-paced world, planning travel can feel overwhelming. Bablons Tours & Entertainments makes it simple with customized tour packages, hassle-free visa assistance, and overseas recruitment guidance designed around your goals.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/76">
            From serene beach holidays and mountain adventures to cultural journeys and global career opportunities, our team brings together planning expertise, reliable partners, and personalized service for a smooth end-to-end experience.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to={ROUTES.CONTACT}
              className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-gradient-to-r from-accent-500 to-secondary-500 px-8 text-sm font-extrabold uppercase tracking-[0.06em] text-white shadow-[0_18px_45px_rgba(187,132,44,0.28)] transition hover:-translate-y-0.5"
            >
              Plan With Us
              <FaArrowRight />
            </Link>
            <Link
              to={ROUTES.PACKAGES}
              className="inline-flex h-14 items-center justify-center gap-3 rounded-full border border-white/22 bg-white/8 px-8 text-sm font-extrabold uppercase tracking-[0.06em] text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/14"
            >
              Explore Packages
            </Link>
          </div>

          <div className="mt-9 grid max-w-3xl gap-4 sm:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="rounded-2xl border border-white/14 bg-dark-900/30 p-4 backdrop-blur-md">
                  <Icon className="h-7 w-7 text-accent-400" />
                  <h2 className="mt-3 text-sm font-extrabold text-white">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-white/72">{item.text}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[500px] lg:mr-0">
          <div className="absolute -left-6 top-8 z-10 hidden rounded-2xl border border-white/16 bg-dark-900/62 p-5 text-white shadow-[0_20px_60px_rgba(0,0,0,0.24)] backdrop-blur-md md:block">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-400 text-dark-900">
                <FaStar className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-3xl font-bold leading-none">4.9/5</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-white/62">Traveler rating</p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-white/18 bg-white/10 p-2.5 shadow-[0_30px_85px_rgba(0,0,0,0.3)] backdrop-blur">
            <img src={storyImage} alt="Premium travel experience planned by Bablons Tours" className="h-[360px] w-full rounded-[1.25rem] object-cover sm:h-[420px] lg:h-[460px]" />
          </div>

        
        </div>
      </div>
    </section>
  )
}

export default CompanyStory
