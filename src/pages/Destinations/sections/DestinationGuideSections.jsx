import { FaHeart, FaMapSigns, FaShieldAlt, FaUtensils } from 'react-icons/fa'

const hasText = (value) => String(value || '').trim().length > 0

const hasBlock = (block) =>
  Boolean(block && (hasText(block.title) || hasText(block.description) || (Array.isArray(block.items) && block.items.some(hasText))))

const GuideBlock = ({ block, fallbackTitle }) => {
  if (!hasBlock(block)) return null

  const items = (block.items || []).filter(hasText)

  return (
    <article className="rounded-[22px] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-white p-6 shadow-[0_14px_36px_rgba(15,23,42,0.06)]">
      <div className="inline-flex rounded-full bg-accent-50 px-2.5 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-accent-700">
        Insider guide
      </div>
      <h3 className="mt-3 text-lg font-black text-dark-900">{block.title || fallbackTitle}</h3>
      {hasText(block.description) ? <p className="mt-3 text-sm leading-6 text-dark-500">{block.description}</p> : null}
      {items.length ? (
        <ul className="mt-4 space-y-2 text-sm leading-6 text-dark-600">
          {items.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  )
}

const ListSection = ({ title, items = [], icon: Icon }) => {
  const filtered = items.filter(hasText)
  if (!filtered.length) return null

  return (
    <section className="section-shell bg-white">
      <div className="section-container">
        <p className="section-eyebrow">{Icon ? <Icon /> : null} Expert guide</p>
        <h2 className="mt-3 section-heading">{title}</h2>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {filtered.map((item) => (
            <p key={item} className="rounded-[20px] border border-slate-200 bg-slate-50 p-5 text-sm font-semibold leading-6 text-dark-700 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
              {item}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

const DestinationGuideSections = ({ destination, cityName }) => {
  if (!destination) return null

  const whyVisit = destination.whyVisit || []
  const thingsToDo = destination.thingsToDo || []
  const planningBlocks = [
    ['Weather guide', destination.weatherGuide],
    ['Visa information', destination.visaInformation],
    ['Flights information', destination.flightsInformation],
    ['Transportation', destination.transportation],
  ]
  const experienceBlocks = [
    ['Food guide', destination.foodGuide],
    ['Shopping guide', destination.shoppingGuide],
    ['Nightlife', destination.nightlife],
    ['Family travel guide', destination.familyTravelGuide],
    ['Honeymoon guide', destination.honeymoonGuide],
    ['Luxury travel guide', destination.luxuryTravelGuide],
    ['Budget guide', destination.budgetGuide],
  ]

  const hasWhyVisit = whyVisit.some(hasBlock)
  const hasThingsToDo = thingsToDo.some(hasBlock)
  const hasPlanning = planningBlocks.some(([, block]) => hasBlock(block))
  const hasExperience = experienceBlocks.some(([, block]) => hasBlock(block))
  const itineraries = (destination.suggestedItineraries || []).filter((item) => hasText(item.title) || hasText(item.summary))
  const videos = (destination.videos || []).filter((video) => hasText(video.url))
  const news = (destination.latestTravelNews || []).filter(hasBlock)
  const reviews = (destination.reviews || []).filter((review) => hasText(review.comment))

  return (
    <>
      {hasWhyVisit ? (
        <section className="section-shell bg-white">
          <div className="section-container">
            <p className="section-eyebrow"><FaHeart /> Why visit</p>
            <h2 className="mt-3 section-heading">Why visit {cityName}</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {whyVisit.map((block, index) => <GuideBlock key={index} block={block} fallbackTitle={`Reason ${index + 1}`} />)}
            </div>
          </div>
        </section>
      ) : null}

      {hasThingsToDo ? (
        <section id="things-to-do" className="section-shell scroll-mt-[calc(var(--header-height-mobile)+1rem)] bg-ivory lg:scroll-mt-[calc(var(--header-height-desktop)+1rem)]">
          <div className="section-container">
            <p className="section-eyebrow"><FaMapSigns /> Things to do</p>
            <h2 className="mt-3 section-heading">Best things to do in {cityName}</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {thingsToDo.map((block, index) => <GuideBlock key={index} block={block} fallbackTitle={`Experience ${index + 1}`} />)}
            </div>
          </div>
        </section>
      ) : null}

      {hasPlanning ? (
        <section id="travel-guide" className="section-shell scroll-mt-[calc(var(--header-height-mobile)+1rem)] bg-white lg:scroll-mt-[calc(var(--header-height-desktop)+1rem)]">
          <div className="section-container">
            <p className="section-eyebrow">Plan smarter</p>
            <h2 className="mt-3 section-heading">{cityName} travel planning guide</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {planningBlocks.map(([title, block]) => <GuideBlock key={title} block={block} fallbackTitle={title} />)}
            </div>
          </div>
        </section>
      ) : null}

      {hasExperience ? (
        <section className="section-shell bg-ivory">
          <div className="section-container">
            <p className="section-eyebrow"><FaUtensils /> Local experiences</p>
            <h2 className="mt-3 section-heading">How to experience {cityName}</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {experienceBlocks.map(([title, block]) => <GuideBlock key={title} block={block} fallbackTitle={title} />)}
            </div>
          </div>
        </section>
      ) : null}

      <ListSection title={`Safety tips for ${cityName}`} items={destination.safetyTips || []} icon={FaShieldAlt} />

      {itineraries.length ? (
        <section className="section-shell bg-white">
          <div className="section-container">
            <p className="section-eyebrow">Suggested itineraries</p>
            <h2 className="mt-3 section-heading">Trip ideas for {cityName}</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {itineraries.map((itinerary, index) => (
                <article key={`${itinerary.title}-${index}`} className="rounded-[22px] border border-slate-200 bg-white p-6 shadow-[0_14px_36px_rgba(15,23,42,0.06)]">
                  <p className="text-xs font-black uppercase tracking-wide text-accent-600">{itinerary.duration || 'Flexible duration'}</p>
                  <h3 className="mt-2 text-lg font-black text-dark-900">{itinerary.title}</h3>
                  {hasText(itinerary.summary) ? <p className="mt-3 text-sm leading-6 text-dark-500">{itinerary.summary}</p> : null}
                  {(itinerary.days || []).length ? (
                    <ol className="mt-4 space-y-3 text-sm text-dark-600">
                      {itinerary.days.map((day, dayIndex) => (
                        <li key={dayIndex}>
                          <span className="font-black text-dark-900">{day.title || `Day ${dayIndex + 1}`}</span>
                          {hasText(day.description) ? <span className="block leading-6">{day.description}</span> : null}
                        </li>
                      ))}
                    </ol>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {destination.mapEmbedUrl || videos.length || news.length || reviews.length ? (
        <section className="section-shell bg-ivory">
          <div className="section-container">
            <p className="section-eyebrow">More travel signals</p>
            <h2 className="mt-3 section-heading">Explore {cityName} deeper</h2>
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {destination.mapEmbedUrl ? (
                <iframe
                  title={`${cityName} map`}
                  src={destination.mapEmbedUrl}
                  loading="lazy"
                  className="min-h-[320px] w-full rounded-2xl border border-sand-200 bg-white"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : null}
              {videos.length ? (
                <div className="rounded-[22px] border border-slate-200 bg-white p-6 shadow-[0_14px_36px_rgba(15,23,42,0.06)]">
                  <h3 className="text-lg font-black text-dark-900">Travel videos</h3>
                  <div className="mt-4 space-y-3">
                    {videos.map((video, index) => (
                      <a key={`${video.url}-${index}`} href={video.url} className="block text-sm font-bold text-primary-700 hover:text-primary-800" target="_blank" rel="noreferrer">
                        {video.title || `Watch ${cityName} video`}
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
              {news.map((block, index) => <GuideBlock key={`news-${index}`} block={block} fallbackTitle="Latest travel update" />)}
              {reviews.length ? (
                <div className="rounded-[22px] border border-slate-200 bg-white p-6 shadow-[0_14px_36px_rgba(15,23,42,0.06)]">
                  <h3 className="text-lg font-black text-dark-900">Customer reviews</h3>
                  <div className="mt-4 space-y-4">
                    {reviews.slice(0, 4).map((review, index) => (
                      <blockquote key={`${review.name}-${index}`} className="text-sm leading-6 text-dark-600">
                        "{review.comment}"
                        <span className="mt-2 block font-black text-dark-900">{review.name || 'Bablons traveller'} - {review.rating || 5}/5</span>
                      </blockquote>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}

export default DestinationGuideSections
