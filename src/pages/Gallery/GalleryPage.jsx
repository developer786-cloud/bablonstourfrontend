import { Link } from 'react-router-dom'
import {
  FaArrowRight,
  FaAward,
  FaCloudUploadAlt,
  FaCameraRetro,
  FaGlobeAsia,
  FaHeart,
  FaImages,
  FaMapMarkerAlt,
  FaRegImages,
  FaRoute,
} from 'react-icons/fa'
import galleryHeroBg from '../../assets/images/Bablons Tour Bg 2.png'
import { ROUTES } from '../../constants/routes'
import { galleryImages } from '../../constants/galleryImages'

const categories = ['All Frames', 'Cities', 'Nature', 'Culture', 'Luxury', 'Hidden Gems']

const GalleryCard = ({ item, index }) => {
  const featureClass =
    index === 0
      ? 'sm:col-span-2 lg:row-span-2'
      : index === 5 || index === 12
        ? 'lg:col-span-2'
        : index === 9
          ? 'sm:row-span-2'
          : ''

  return (
    <figure
      className={`group relative min-h-[280px] overflow-hidden rounded-2xl bg-dark-900 shadow-[0_18px_48px_rgba(16,39,36,0.12)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(16,39,36,0.18)] ${featureClass}`}
    >
      <img
        src={item.src}
        alt={item.title}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        loading={index < 4 ? 'eager' : 'lazy'}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/88 via-dark-900/20 to-transparent" />
      <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/12 text-white backdrop-blur transition group-hover:bg-white group-hover:text-secondary-600">
        <FaHeart className="h-4 w-4" />
      </span>
      <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white">
        <p className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.08em] text-accent-300">
          <FaMapMarkerAlt className="h-3.5 w-3.5" />
          {item.location}
        </p>
        <h2 className="font-display text-2xl font-bold leading-tight">{item.title}</h2>
      </figcaption>
    </figure>
  )
}

const GalleryPage = () => {
  const heroPolaroids = [
    { title: galleryImages[1].title, image: galleryImages[1].src, rotate: '-rotate-6', offset: 'lg:translate-y-8' },
    { title: galleryImages[2].title, image: galleryImages[2].src, rotate: 'rotate-2', offset: 'lg:-translate-y-2' },
    { title: galleryImages[3].title, image: galleryImages[3].src, rotate: 'rotate-6', offset: 'lg:translate-y-10' },
  ]

  return (
    <div className="overflow-hidden bg-[#FAF8F4] text-dark-900">
      <section className="relative isolate overflow-hidden bg-dark-900 text-white">
        <img
          src={galleryHeroBg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-95"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061820]/96 via-[#09222a]/72 to-[#16110b]/18" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061820] via-transparent to-[#061820]/16" />
        <div className="grain-overlay" />

        <div className="section-container relative grid min-h-[calc(100vh-var(--header-height-mobile))] gap-10 py-10 lg:min-h-[760px] lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.9fr)] lg:items-center lg:py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-accent-300/55 bg-dark-900/28 px-5 py-3 text-xs font-extrabold uppercase tracking-[0.14em] text-accent-200 shadow-[0_18px_45px_rgba(0,0,0,0.22)] backdrop-blur-md">
              <FaCameraRetro className="h-4 w-4" />
              Bablons Travel Gallery
            </div>

            <h1 className="mt-8 max-w-3xl font-display text-[clamp(4rem,8vw,7.6rem)] font-bold leading-[0.88] text-white">
              The world.
              <span className="mt-3 block bg-gradient-to-r from-accent-200 via-[#f3bd62] to-secondary-300 bg-clip-text font-display italic text-transparent drop-shadow-[0_8px_18px_rgba(0,0,0,0.35)]">
                beautifully
              </span>
              captured.
            </h1>

            <div className="mt-5 h-px w-80 max-w-full bg-gradient-to-r from-accent-300 via-accent-200 to-transparent" />

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/84 md:text-xl">
              Step into a curated collection of breathtaking destinations, timeless landmarks, and unforgettable travel moments.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#gallery-collection"
                className="inline-flex min-h-[3.5rem] items-center justify-center gap-3 rounded-full bg-gradient-to-r from-accent-300 to-secondary-300 px-8 py-4 text-sm font-extrabold uppercase tracking-[0.06em] text-dark-900 shadow-[0_20px_55px_rgba(240,195,106,0.26)] transition hover:-translate-y-0.5"
              >
                <FaImages />
                Explore Gallery
              </a>
              <Link
                to={ROUTES.CONTACT}
                className="inline-flex min-h-[3.5rem] items-center justify-center gap-3 rounded-full border border-white/35 bg-dark-900/20 px-8 py-4 text-sm font-extrabold uppercase tracking-[0.06em] text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white hover:text-dark-900"
              >
                Plan From Gallery
                <FaArrowRight />
              </Link>
            </div>

            <div className="mt-10 grid gap-3 border border-white/16 bg-white/[0.08] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:grid-cols-3 lg:max-w-3xl">
              {[
                { icon: FaGlobeAsia, value: '06+', label: 'Destinations', note: 'Handpicked wonders' },
                { icon: FaRegImages, value: `${galleryImages.length}+`, label: 'Premium photos', note: 'High quality gallery' },
                { icon: FaAward, value: '100%', label: 'Authentic moments', note: 'Captured with passion' },
              ].map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="flex items-center gap-4 p-3">
                    <Icon className="h-9 w-9 text-accent-300" />
                    <div>
                      <p className="font-display text-4xl font-bold leading-none text-white">{stat.value}</p>
                      <p className="mt-2 text-xs font-extrabold uppercase tracking-[0.08em] text-white">{stat.label}</p>
                      <p className="mt-1 text-sm text-white/62">{stat.note}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {[
                { icon: FaCameraRetro, title: 'Premium Quality', text: 'Images' },
                { icon: FaAward, title: 'Curated by', text: 'Travel Experts' },
                { icon: FaCloudUploadAlt, title: 'New Galleries', text: 'Added Regularly' },
                { icon: FaHeart, title: 'Save Your', text: 'Favorite Moments' },
                { icon: FaRoute, title: 'Share & Inspire', text: 'Fellow Travelers' },
              ].map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.title} className="flex items-center gap-3 text-white/88">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent-300/45 text-accent-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="text-sm font-medium leading-5">
                      <span className="block">{feature.title}</span>
                      <span className="block text-white/66">{feature.text}</span>
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
          

          <div className="relative hidden min-h-[540px] items-end justify-center lg:flex">
            <div className="absolute right-6 top-10 h-28 w-28 rounded-full border border-accent-300/25" />
            <FaCameraRetro className="absolute left-12 top-28 h-20 w-20 rotate-12 text-accent-300/85" />
            <div className="absolute bottom-4 right-0 flex items-end gap-0">
              {heroPolaroids.map((card) => (
                <figure
                  key={card.title}
                  className={`${card.rotate} ${card.offset} -ml-8 w-52 bg-white p-3 pb-7 shadow-[0_28px_70px_rgba(0,0,0,0.32)] transition duration-500 hover:z-10 hover:-translate-y-3`}
                >
                  <img src={card.image} alt={card.title} className="aspect-[4/3] w-full object-cover" />
                  <figcaption className="mt-3 text-center font-display text-xl italic text-dark-900">
                    {card.title}
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="absolute bottom-0 h-40 w-full bg-gradient-to-t from-[#061820] to-transparent" />
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:hidden">
            {heroPolaroids.map((card) => (
              <div key={card.title} className="bg-white p-2 pb-5 shadow-[0_20px_55px_rgba(0,0,0,0.24)]">
                <img src={card.image} alt={card.title} className="aspect-[4/3] w-full object-cover" />
                <p className="mt-3 text-center font-display text-lg italic text-dark-900">{card.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery-collection" className="mx-auto w-full max-w-[1680px] px-3 py-14 sm:px-5 lg:px-7 lg:py-20 2xl:px-8">
        <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="section-eyebrow">
              <FaRegImages className="text-secondary-600" />
              Visual stories
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight text-dark-900 md:text-5xl">
              A premium gallery of places worth pausing for
            </h2>
          </div>
          <p className="max-w-sm text-base leading-7 text-dark-500">
            Every frame is selected to help visitors imagine the color, texture, and mood of the journey.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((category, index) => (
            <button
              key={category}
              type="button"
              className={`inline-flex min-h-11 items-center rounded-full border px-5 text-xs font-extrabold transition ${
                index === 0
                  ? 'border-primary-900 bg-primary-900 text-white shadow-[0_14px_30px_rgba(16,39,36,0.18)]'
                  : 'border-sand-200 bg-white text-dark-700 hover:border-secondary-200 hover:bg-secondary-50 hover:text-secondary-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid auto-rows-[280px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {galleryImages.map((item, index) => (
            <GalleryCard key={item.src} item={item} index={index} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default GalleryPage
