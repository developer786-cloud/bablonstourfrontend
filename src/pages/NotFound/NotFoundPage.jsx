import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaArrowRight, FaCompass, FaHome, FaMapMarkerAlt, FaRegCommentDots, FaSearch } from 'react-icons/fa'
import { ROUTES } from '../../constants/routes'
import image404 from '../../assets/images/404 Not Fouund.png'

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <section
      className="relative isolate min-h-[calc(100vh-var(--header-height-mobile))] overflow-hidden bg-cover bg-center bg-no-repeat px-4 py-8 sm:px-6 lg:min-h-[calc(100vh-var(--header-height-desktop))] lg:px-8"
      style={{ backgroundImage: `url(${image404})` }}
    >
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,18,34,0.64)_0%,rgba(3,18,34,0.38)_38%,rgba(3,18,34,0.08)_72%,rgba(3,18,34,0)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-36 bg-gradient-to-t from-[#f6f7fb]/50 to-transparent" />

      <div className="mx-auto flex min-h-[calc(100vh-var(--header-height-mobile)-4rem)] max-w-7xl items-center lg:min-h-[calc(100vh-var(--header-height-desktop)-4rem)]">
        <div className="w-full max-w-xl rounded-[1.5rem] border border-white/25 bg-dark-900/56 p-5 text-white shadow-[0_24px_70px_rgba(0,0,0,0.34)] backdrop-blur-[2px] sm:p-7 lg:p-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/16 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-accent-200 shadow-sm">
            <FaSearch className="h-3.5 w-3.5" />
            404 / Route Missing
          </span>

          <p className="mt-5 font-display text-lg italic text-accent-200 sm:text-xl">
            Looks like you took a wrong turn
          </p>

          <h1 className="mt-2 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Page Not Found
          </h1>

          <p className="mt-4 max-w-lg text-base font-semibold leading-7 text-white/88 sm:text-lg">
            The travel route you opened may have moved, expired, or never existed. Your next Bablons journey is still one click away.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              to={ROUTES.HOME}
              className="inline-flex h-12 items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#ef1e2d] to-secondary-500 px-6 py-3 text-sm font-extrabold uppercase tracking-[0.08em] text-white shadow-[0_18px_34px_rgba(239,30,45,0.28)] transition hover:-translate-y-0.5"
            >
              <FaHome className="h-4 w-4" />
              Back to Home
            </Link>
            <Link
              to={ROUTES.PACKAGES}
              className="inline-flex h-12 items-center justify-center gap-3 rounded-full border border-white/24 bg-white/12 px-6 py-3 text-sm font-extrabold uppercase tracking-[0.08em] text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:text-dark-900"
            >
              <FaCompass className="h-4 w-4" />
              Explore Packages
              <FaArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 text-sm font-bold text-white transition hover:bg-white/16 sm:w-auto"
          >
            <FaArrowLeft className="h-3.5 w-3.5" />
            Go Back
          </button>

          <div className="mt-6 grid gap-3 text-left sm:grid-cols-2">
            <Link to={ROUTES.DESTINATIONS} className="rounded-2xl border border-white/16 bg-white/12 p-4 transition hover:-translate-y-0.5 hover:bg-white/18">
              <FaMapMarkerAlt className="h-5 w-5 text-accent-200" />
              <p className="mt-3 text-sm font-black text-white">Explore Destinations</p>
              <p className="mt-1 text-xs font-semibold text-white/62">Dubai, Thailand, Uzbekistan, Georgia and more.</p>
            </Link>
            <Link to={ROUTES.CONTACT} className="rounded-2xl border border-white/16 bg-white/12 p-4 transition hover:-translate-y-0.5 hover:bg-white/18">
              <FaRegCommentDots className="h-5 w-5 text-accent-200" />
              <p className="mt-3 text-sm font-black text-white">Need Help?</p>
              <p className="mt-1 text-xs font-semibold text-white/62">Our travel team can help you find the right page.</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NotFoundPage
