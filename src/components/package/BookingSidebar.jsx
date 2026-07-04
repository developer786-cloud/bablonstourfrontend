import { useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import PriceDisplay from '../common/PriceDisplay'
import WhatsAppButton from '../common/WhatsAppButton'
import { packageService } from '../../services/packageService'
import { formatPrice } from '../../utils/formatPrice'
import { getPackagePrice } from './packageViewUtils'

const BookingSidebar = ({ package: travelPackage, selectedDeparture }) => {
  const [form, setForm] = useState({ travelerCount: 2, customerName: '', phone: '', email: '' })
  const [submitting, setSubmitting] = useState(false)

  const totals = useMemo(() => {
    const travelers = Math.max(Number(form.travelerCount || 1), 1)
    const price = getPackagePrice(travelPackage, selectedDeparture)
    const subtotal = price * travelers
    const gstPercentage = travelPackage.pricing?.gstPercentage ?? 5
    const gst = Math.round((subtotal * gstPercentage) / 100)
    const advancePerPerson = selectedDeparture?.bookingAdvance || travelPackage.pricing?.bookingAdvance || travelPackage.pricing?.bookingAmount || 0
    return {
      travelers,
      price,
      subtotal,
      gst,
      total: subtotal + gst,
      advance: advancePerPerson * travelers,
      currency: travelPackage.pricing?.currency || 'INR',
    }
  }, [form.travelerCount, selectedDeparture, travelPackage])

  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  const submit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    try {
      await packageService.inquiry(travelPackage.slug, {
        ...form,
        selectedDeparture: selectedDeparture?._id,
      })
      toast.success('Inquiry submitted. Our team will contact you shortly.')
      setForm({ travelerCount: 2, customerName: '', phone: '', email: '' })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Inquiry submission failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <aside id="booking" className="overflow-hidden rounded-card-sm border border-primary-700/30 bg-dark-900 p-5 text-white shadow-elevated lg:sticky lg:top-24">
      <div className="rounded-xl bg-white p-4 text-dark-900">
        <PriceDisplay amount={totals.price} originalAmount={travelPackage.pricing?.originalPrice} currency={totals.currency} note={travelPackage.pricing?.priceNote || 'per person'} />
      </div>
      {selectedDeparture ? (
        <p className="mt-3 rounded-lg border border-accent-300/30 bg-accent-300/12 p-3 text-sm font-bold text-accent-100">
          Selected: {new Date(selectedDeparture.startDate || selectedDeparture.departureDate).toLocaleDateString()}
        </p>
      ) : null}

      <form onSubmit={submit} className="mt-5 space-y-3">
        <label className="block text-sm font-bold text-white/86">
          Travelers
          <input type="number" min="1" value={form.travelerCount} onChange={(event) => set('travelerCount', event.target.value)} className="mt-1 w-full rounded-lg border border-white/10 bg-white p-3 text-dark-900" />
        </label>
        <label className="block text-sm font-bold text-white/86">
          Full name
          <input required value={form.customerName} onChange={(event) => set('customerName', event.target.value)} className="mt-1 w-full rounded-lg border border-white/10 bg-white p-3 text-dark-900" />
        </label>
        <label className="block text-sm font-bold text-white/86">
          Phone number
          <input required value={form.phone} onChange={(event) => set('phone', event.target.value)} className="mt-1 w-full rounded-lg border border-white/10 bg-white p-3 text-dark-900" />
        </label>
        <label className="block text-sm font-bold text-white/86">
          Email optional
          <input type="email" value={form.email} onChange={(event) => set('email', event.target.value)} className="mt-1 w-full rounded-lg border border-white/10 bg-white p-3 text-dark-900" />
        </label>

        <div className="space-y-2 rounded-lg border border-white/10 bg-white/10 p-4 text-sm text-white/84">
          <div className="flex justify-between"><span>Package subtotal</span><strong>{formatPrice(totals.subtotal, totals.currency)}</strong></div>
          <div className="flex justify-between"><span>GST</span><strong>{formatPrice(totals.gst, totals.currency)}</strong></div>
          <div className="flex justify-between border-t border-white/10 pt-2 text-base text-white"><span>Total estimate</span><strong>{formatPrice(totals.total, totals.currency)}</strong></div>
          <div className="flex justify-between text-accent-200"><span>Advance amount</span><strong>{formatPrice(totals.advance, totals.currency)}</strong></div>
        </div>

        <button disabled={submitting} className="w-full rounded-full bg-secondary-500 px-5 py-3 text-sm font-black uppercase tracking-[0.04em] text-white shadow-[0_16px_34px_rgba(217,111,58,0.28)] hover:bg-secondary-600 disabled:opacity-60">
          {submitting ? 'Submitting...' : 'Book Now'}
        </button>
        <button type="submit" disabled={submitting} className="w-full rounded-full border border-white/25 px-5 py-3 text-sm font-black text-white hover:bg-white hover:text-dark-900 disabled:opacity-60">
          Get Custom Quote
        </button>
        <WhatsAppButton message={`Hi Bablons Travel, I want to inquire about ${travelPackage.title}.`} className="w-full" />
      </form>

      <div className="mt-4 grid gap-2 text-xs font-bold text-white/58">
        <span>Secure booking assistance</span>
        <span>Free consultation before confirmation</span>
        <span>24/7 destination support</span>
      </div>
    </aside>
  )
}

export default BookingSidebar
