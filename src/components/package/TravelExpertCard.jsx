import { FaPhone } from 'react-icons/fa6'
import WhatsAppButton from '../common/WhatsAppButton'

const TravelExpertCard = ({ expert = {}, packageTitle }) => {
  const name = expert.name || 'Bablons Travel Expert'

  return (
    <aside className="rounded-card-sm border border-sand-200 bg-white p-5 shadow-card">
      <h3 className="font-display text-2xl font-bold text-dark-900">Your Travel Expert</h3>
      <div className="mt-4 flex items-center gap-3">
        {expert.avatar ? <img src={expert.avatar} alt={name} className="h-12 w-12 rounded-full object-cover" /> : <div className="grid h-12 w-12 place-items-center rounded-full bg-secondary-50 font-black text-secondary-700">BT</div>}
        <div>
          <p className="font-black text-dark-900">{name}</p>
          <p className="text-sm text-dark-500">{expert.specialty || 'International holidays'}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-dark-600">{expert.experience || 'Get help with flights, hotels, transfers, visas, and custom itinerary planning.'}</p>
      <div className="mt-4 grid gap-2">
        {expert.phone ? <a href={`tel:${expert.phone}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-sand-300 px-4 py-3 text-sm font-black text-dark-700 hover:border-secondary-300 hover:text-secondary-600"><FaPhone /> Call</a> : null}
        <WhatsAppButton phone={expert.whatsapp || expert.phone} message={`Hi, I need help with ${packageTitle}.`} />
      </div>
    </aside>
  )
}

export default TravelExpertCard
