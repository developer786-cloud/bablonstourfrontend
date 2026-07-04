import WhatsAppButton from './WhatsAppButton'

const MobileBookingBar = ({ priceLabel, onBook, whatsappMessage }) => (
  <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white p-3 shadow-[0_-12px_30px_rgba(15,23,42,0.12)] lg:hidden">
    <div className="mx-auto flex max-w-7xl items-center gap-3">
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold text-slate-500">From</p>
        <p className="truncate text-base font-black text-slate-950">{priceLabel}</p>
      </div>
      <button type="button" onClick={onBook} className="rounded-lg bg-orange-500 px-4 py-3 text-sm font-black text-white">
        Book Now
      </button>
      <WhatsAppButton message={whatsappMessage} className="px-3" />
    </div>
  </div>
)

export default MobileBookingBar
