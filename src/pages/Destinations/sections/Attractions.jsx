import { FaMapMarkedAlt } from 'react-icons/fa'

const Attractions = ({ attractions, cityName, id }) => {
  if (!attractions || attractions.length === 0) {
    return (
      <section id={id} className="section-shell scroll-mt-[calc(var(--header-height-mobile)+1rem)] bg-white lg:scroll-mt-[calc(var(--header-height-desktop)+1rem)]">
        <div className="section-container">
          <p className="section-eyebrow">Things to do</p>
          <h2 className="mt-3 section-heading">Top attractions in {cityName}</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-dark-500">
            Our travel team can help you shortlist sightseeing, hotel areas, transfers, and day plans for {cityName}.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id={id} className="section-shell scroll-mt-[calc(var(--header-height-mobile)+1rem)] bg-white lg:scroll-mt-[calc(var(--header-height-desktop)+1rem)]">
      <div className="section-container">
        <div className="max-w-3xl">
          <p className="section-eyebrow">Things to do</p>
          <h2 className="mt-3 section-heading">Top attractions in {cityName}</h2>
          <p className="mt-4 text-base leading-7 text-dark-500">
            Curated experiences that make the city feel effortless, whether you prefer iconic landmarks, slow travel, or something memorable for a couple or family.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {attractions.map((attraction) => (
            <article
              key={attraction.name}
              className="group overflow-hidden rounded-[24px] border border-sand-200 bg-white shadow-[0_16px_42px_rgba(16,39,36,0.07)] transition duration-300 hover:-translate-y-1 hover:border-accent-200 hover:shadow-[0_22px_56px_rgba(16,39,36,0.13)]"
            >
              {attraction.image?.src ? (
                <div className="overflow-hidden">
                  <img src={attraction.image.src} alt={attraction.image.alt || attraction.name} className="h-48 w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                </div>
              ) : null}
              <div className="flex items-start gap-4 p-5">
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent-700">
                  <FaMapMarkedAlt className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="font-bold text-dark-900">{attraction.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-dark-500">{attraction.note}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Attractions
