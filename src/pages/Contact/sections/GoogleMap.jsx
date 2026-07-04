import { FaMapMarkerAlt, FaStar } from 'react-icons/fa'

const GoogleMap = ({ contactDetails = {} }) => {
  const mapQuery = encodeURIComponent(`${contactDetails.company || ''} ${contactDetails.address || ''}`.trim())

  return (
    <div id="google-map" className="relative mt-10 overflow-hidden rounded-[1.35rem] border border-sand-200 bg-white shadow-[0_24px_70px_rgba(16,39,36,0.12)]">
      <iframe
        title={`Map of ${contactDetails.company || 'location'}`}
        src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
        className="h-[320px] w-full border-0 grayscale-[0.12] md:h-[380px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      <div className="pointer-events-none absolute left-5 top-5 max-w-xs rounded-xl border border-sand-200 bg-white p-5 shadow-[0_18px_45px_rgba(16,39,36,0.16)]">
        <h3 className="text-sm font-extrabold text-dark-900">{contactDetails.company}</h3>
        <p className="mt-3 text-sm leading-6 text-dark-600">{contactDetails.address}</p>
        <p className="mt-3 flex items-center gap-2 text-sm font-bold text-dark-800">
          4.9
          <span className="flex gap-0.5 text-accent-500" aria-label="4.9 star rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar key={star} className="h-3.5 w-3.5" />
            ))}
          </span>
          <span className="font-medium text-dark-400">(Traveler Reviews)</span>
        </p>
        <p className="mt-3 inline-flex items-center gap-2 text-sm font-extrabold text-secondary-600">
          <FaMapMarkerAlt className="h-4 w-4" />
          View larger map
        </p>
      </div>
    </div>
  )
}

export default GoogleMap
