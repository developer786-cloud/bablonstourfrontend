import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import ImageUploader from '../../../components/admin/ImageUploader'
import { packageService } from '../../../services/packageService'

const emptyForm = {
  title: '',
  slug: '',
  shortDescription: '',
  description: '',
  category: '',
  tagsText: '',
  country: { name: '', code: '', flag: '' },
  destination: { name: '', country: '', city: '', slug: '' },
  citiesText: '',
  packageType: 'group',
  status: 'draft',
  featured: false,
  duration: { nights: 0, days: 1 },
  pricing: { basePrice: 0, pricePerPerson: 0, originalPrice: 0, currency: 'INR', bookingAmount: 0, bookingAdvance: 0, gstPercentage: 5, priceNote: 'per person, twin sharing' },
  featuredImage: null,
  gallery: [],
  images: [],
  groupSettings: { minSize: 20, maxSize: 25, tourManagerIncluded: true },
  groupInfo: { minTravelers: 20, maxTravelers: 25, tourManagerIncluded: true, departuresPerMonth: 2, description: '' },
  overview: { flights: '', hotelCategory: '', meals: '', transfers: '', tourManager: '', visa: '', groupSize: '', durationText: '' },
  highlightsText: '',
  inclusionsText: '',
  exclusionsText: '',
  departures: [],
  itinerary: [],
  hotels: [],
  faqs: [],
  assignedExpert: { name: '', role: '', experience: '', specialty: '', phone: '', whatsapp: '', avatar: '' },
  seo: { metaTitle: '', metaDescription: '', keywords: [] },
  seoKeywordsText: '',
}

const tabs = [
  ['basic', 'Basic information'],
  ['destination', 'Destination and duration'],
  ['pricing', 'Price and booking'],
  ['images', 'Images and gallery'],
  ['content', 'Highlights and overview'],
  ['departures', 'Departures'],
  ['itinerary', 'Itinerary'],
  ['hotels', 'Hotels'],
  ['included', 'Inclusions and exclusions'],
  ['group', 'Group information'],
  ['faqs', 'FAQs'],
  ['seo', 'SEO and publish'],
]

const splitLines = (value) => String(value || '').split('\n').map((item) => item.trim()).filter(Boolean)
const splitComma = (value) => String(value || '').split(',').map((item) => item.trim()).filter(Boolean)
const toDateInput = (value) => (value ? new Date(value).toISOString().slice(0, 10) : '')
const getApiErrorMessage = (error, fallback = 'Package save failed') => {
  const response = error.response?.data
  const firstError = response?.errors?.[0]

  if (firstError?.path && firstError?.message) return `${firstError.path}: ${firstError.message}`
  if (firstError?.message) return firstError.message
  return response?.message || fallback
}

const normalizeForm = (item) => ({
  ...emptyForm,
  ...item,
  country: { ...emptyForm.country, ...(item.country || {}) },
  destination: { ...emptyForm.destination, ...(item.destination || {}), country: item.destination?.country || item.country?.name || '' },
  citiesText: item.cities?.join(', ') || '',
  tagsText: item.tags?.join(', ') || '',
  pricing: { ...emptyForm.pricing, ...(item.pricing || {}), pricePerPerson: item.pricing?.pricePerPerson || item.pricing?.basePrice || 0, bookingAdvance: item.pricing?.bookingAdvance || item.pricing?.bookingAmount || 0 },
  featuredImage: item.featuredImage || item.images?.find((image) => image.type === 'hero') || item.images?.[0] || null,
  gallery: item.gallery?.length ? item.gallery : item.images?.filter((image) => image.type !== 'hero') || [],
  groupSettings: { ...emptyForm.groupSettings, ...(item.groupSettings || {}) },
  groupInfo: { ...emptyForm.groupInfo, ...(item.groupInfo || {}) },
  overview: {
    ...emptyForm.overview,
    ...(item.overview || {}),
    hotelCategory: item.overview?.hotelCategory || item.overview?.hotel || '',
    durationText: item.overview?.durationText || item.overview?.duration || '',
    tourManager: item.overview?.tourManager || item.overview?.guide || '',
  },
  highlightsText: item.highlights?.map((highlight) => highlight.title || highlight.text).join('\n') || '',
  inclusionsText: item.inclusions?.join('\n') || '',
  exclusionsText: item.exclusions?.join('\n') || '',
  departures: (item.departures || []).map((departure) => ({
    ...departure,
    startDate: toDateInput(departure.startDate || departure.departureDate),
    endDate: toDateInput(departure.endDate || departure.returnDate),
  })),
  itinerary: (item.itinerary || []).map((day) => ({
    ...day,
    dayNumber: day.dayNumber || day.day || 1,
    activitiesText: day.activities?.join('\n') || '',
    mealsText: Array.isArray(day.meals) ? day.meals.join(', ') : Object.entries(day.meals || {}).filter(([, included]) => included).map(([meal]) => meal).join(', '),
  })),
  hotels: (item.hotels || []).map((hotel) => ({ ...hotel, amenitiesText: hotel.amenities?.join('\n') || '', city: hotel.city || hotel.location || '', starRating: hotel.starRating || hotel.stars || 4 })),
  faqs: item.faqs || [],
  assignedExpert: { ...emptyForm.assignedExpert, ...(item.assignedExpert || {}) },
  seo: { ...emptyForm.seo, ...(item.seo || {}) },
  seoKeywordsText: item.seo?.keywords?.join(', ') || '',
})

const Field = ({ label, children }) => (
  <label className="block text-sm font-bold text-slate-700">
    <span>{label}</span>
    <div className="mt-1">{children}</div>
  </label>
)

const inputClass = 'w-full rounded-lg border border-slate-200 p-3 text-sm font-semibold text-slate-700 outline-none focus:border-orange-400'

const PackageFormPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyForm)
  const [tab, setTab] = useState('basic')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (id) packageService.get(id).then((item) => setForm(normalizeForm(item)))
  }, [id])

  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }))
  const setNested = (key, name, value) => setForm((current) => ({ ...current, [key]: { ...current[key], [name]: value } }))
  const setArrayItem = (key, index, value) => setForm((current) => ({ ...current, [key]: current[key].map((item, itemIndex) => itemIndex === index ? { ...item, ...value } : item) }))
  const addArrayItem = (key, value) => setForm((current) => ({ ...current, [key]: [...current[key], value] }))
  const removeArrayItem = (key, index) => setForm((current) => ({ ...current, [key]: current[key].filter((_, itemIndex) => itemIndex !== index) }))
  const addGalleryImage = (image) => setForm((current) => ({
    ...current,
    gallery: [...(current.gallery || []), { ...image, type: 'gallery' }],
  }))
  const setFeaturedImage = (image) => setForm((current) => ({
    ...current,
    featuredImage: { ...image, type: 'hero' },
  }))
  const makeGalleryImageFeatured = (index) => setForm((current) => {
    const selected = current.gallery[index]
    if (!selected) return current

    const previousFeatured = current.featuredImage?.url ? { ...current.featuredImage, type: 'gallery' } : null
    return {
      ...current,
      featuredImage: { ...selected, type: 'hero' },
      gallery: [
        ...current.gallery.filter((_, itemIndex) => itemIndex !== index),
        ...(previousFeatured ? [previousFeatured] : []),
      ],
    }
  })

  const buildPayload = (nextStatus = form.status) => {
    const featuredImage = form.featuredImage
    const gallery = form.gallery || []

    return {
      ...form,
      status: nextStatus,
      cities: splitComma(form.citiesText),
      tags: splitComma(form.tagsText),
      country: { ...form.country, name: form.country.name || form.destination.country },
      destination: { ...form.destination, country: form.destination.country || form.country.name },
      pricing: {
        ...form.pricing,
        basePrice: Number(form.pricing.basePrice || form.pricing.pricePerPerson || 0),
        pricePerPerson: Number(form.pricing.pricePerPerson || form.pricing.basePrice || 0),
        originalPrice: Number(form.pricing.originalPrice || 0),
        bookingAmount: Number(form.pricing.bookingAmount || form.pricing.bookingAdvance || 0),
        bookingAdvance: Number(form.pricing.bookingAdvance || form.pricing.bookingAmount || 0),
        gstPercentage: Number(form.pricing.gstPercentage || 0),
      },
      duration: { nights: Number(form.duration.nights || 0), days: Number(form.duration.days || 1) },
      featuredImage,
      gallery,
      images: [featuredImage ? { ...featuredImage, type: 'hero' } : null, ...gallery.map((image) => ({ ...image, type: image.type || 'gallery' }))].filter(Boolean),
      highlights: splitLines(form.highlightsText).map((title) => ({ icon: 'star', title, text: title })),
      inclusions: splitLines(form.inclusionsText),
      exclusions: splitLines(form.exclusionsText),
      departures: form.departures.map((departure) => ({
        ...departure,
        departureDate: departure.startDate,
        returnDate: departure.endDate,
        startDate: departure.startDate,
        endDate: departure.endDate,
        totalSeats: Number(departure.totalSeats || 0),
        bookedSeats: Number(departure.bookedSeats || 0),
        availableSeats: Number(departure.availableSeats || 0),
        price: Number(departure.pricePerPerson || departure.price || 0),
        pricePerPerson: Number(departure.pricePerPerson || departure.price || 0),
        bookingAdvance: Number(departure.bookingAdvance || 0),
      })),
      itinerary: form.itinerary.map((day) => ({
        ...day,
        day: Number(day.dayNumber || day.day || 1),
        dayNumber: Number(day.dayNumber || day.day || 1),
        activities: splitLines(day.activitiesText),
        meals: splitComma(day.mealsText),
      })),
      hotels: form.hotels.map((hotel) => ({
        ...hotel,
        location: hotel.city,
        stars: Number(hotel.starRating || hotel.stars || 4),
        starRating: Number(hotel.starRating || hotel.stars || 4),
        amenities: splitLines(hotel.amenitiesText),
      })),
      seo: { ...form.seo, keywords: splitComma(form.seoKeywordsText) },
    }
  }

  const validatePublish = (payload) => {
    if (payload.status !== 'published') return true
    const missing = []
    if (!payload.title) missing.push('title')
    if (!payload.pricing.basePrice) missing.push('price')
    if (!payload.featuredImage?.url) missing.push('featured image')
    if (!payload.duration.days) missing.push('duration')
    if (!payload.description && !payload.shortDescription) missing.push('description')
    if (missing.length) {
      toast.error(`Cannot publish. Missing: ${missing.join(', ')}`)
      return false
    }
    return true
  }

  const validatePayload = (payload) => {
    const errors = []
    const basePrice = Number(payload.pricing?.basePrice || 0)
    const originalPrice = Number(payload.pricing?.originalPrice || 0)
    const bookingAmount = Number(payload.pricing?.bookingAmount || 0)
    const minTravelers = Number(payload.groupSettings?.minSize || payload.groupInfo?.minTravelers || 0)
    const maxTravelers = Number(payload.groupSettings?.maxSize || payload.groupInfo?.maxTravelers || 0)

    if (!payload.title?.trim()) errors.push({ tab: 'basic', label: 'title' })
    if (!payload.country?.name?.trim()) errors.push({ tab: 'destination', label: 'country' })
    if (!payload.packageType) errors.push({ tab: 'basic', label: 'package type' })
    if (!Number(payload.duration?.days)) errors.push({ tab: 'destination', label: 'duration days' })
    if (Number(payload.duration?.days || 0) < Number(payload.duration?.nights || 0)) errors.push({ tab: 'destination', label: 'days cannot be less than nights' })
    if (!basePrice) errors.push({ tab: 'pricing', label: 'price per person' })
    if (originalPrice && originalPrice < basePrice) errors.push({ tab: 'pricing', label: 'original price cannot be less than price per person' })
    if (bookingAmount && bookingAmount > basePrice) errors.push({ tab: 'pricing', label: 'booking advance cannot exceed price per person' })
    if (minTravelers && maxTravelers && minTravelers > maxTravelers) errors.push({ tab: 'group', label: 'minimum travelers cannot exceed maximum travelers' })

    if (!errors.length) return true

    setTab(errors[0].tab)
    toast.error(`Please check ${errors[0].label}`)
    return false
  }

  const submit = async (event, nextStatus = form.status) => {
    event?.preventDefault()
    const payload = buildPayload(nextStatus)
    if (!validatePayload(payload)) return
    if (!validatePublish(payload)) return
    setSaving(true)
    try {
      const saved = id ? await packageService.update(id, payload) : await packageService.create(payload)
      toast.success(nextStatus === 'published' ? 'Package published' : 'Package saved')
      navigate(`/admin/packages/${saved._id}`)
    } catch (error) {
      toast.error(getApiErrorMessage(error))
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={(event) => submit(event)} className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-950">{id ? 'Edit Package' : 'Add Package'}</h1>
          <p className="text-sm text-slate-500">Create production-ready package data for the public detail page.</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={(event) => submit(event, 'draft')} disabled={saving} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700">Save Draft</button>
          <button type="button" onClick={(event) => submit(event, 'published')} disabled={saving} className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-black text-white">Publish Package</button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map(([key, label]) => (
          <button type="button" key={key} onClick={() => setTab(key)} className={`shrink-0 rounded-lg px-4 py-2 text-xs font-black ${tab === key ? 'bg-orange-500 text-white' : 'bg-white text-slate-600'}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        {tab === 'basic' ? (
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Title"><input required value={form.title} onChange={(e) => set('title', e.target.value)} className={inputClass} /></Field>
            <Field label="Slug"><input value={form.slug || ''} onChange={(e) => set('slug', e.target.value)} className={inputClass} placeholder="auto-generated if blank" /></Field>
            <Field label="Package Type"><select value={form.packageType} onChange={(e) => set('packageType', e.target.value)} className={inputClass}><option value="group">Group Tour</option><option value="honeymoon">Honeymoon</option><option value="family">Family</option><option value="solo">Solo</option><option value="custom">Custom</option><option value="domestic">Domestic</option><option value="international">International</option></select></Field>
            <Field label="Category"><input value={form.category} onChange={(e) => set('category', e.target.value)} className={inputClass} /></Field>
            <Field label="Tags comma separated"><input value={form.tagsText} onChange={(e) => set('tagsText', e.target.value)} className={inputClass} /></Field>
            <Field label="Status"><select value={form.status} onChange={(e) => set('status', e.target.value)} className={inputClass}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></Field>
            <Field label="Short Description"><textarea value={form.shortDescription} onChange={(e) => set('shortDescription', e.target.value)} className={`${inputClass} min-h-24 md:col-span-2`} /></Field>
            <Field label="Description"><textarea value={form.description} onChange={(e) => set('description', e.target.value)} className={`${inputClass} min-h-36 md:col-span-2`} /></Field>
            <label className="flex items-center gap-2 text-sm font-bold"><input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} /> Featured package</label>
          </div>
        ) : null}

        {tab === 'destination' ? (
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Country"><input required value={form.country.name} onChange={(e) => { setNested('country', 'name', e.target.value); setNested('destination', 'country', e.target.value) }} className={inputClass} /></Field>
            <Field label="Country Code"><input value={form.country.code} onChange={(e) => setNested('country', 'code', e.target.value)} className={inputClass} /></Field>
            <Field label="Destination Name"><input value={form.destination.name} onChange={(e) => setNested('destination', 'name', e.target.value)} className={inputClass} /></Field>
            <Field label="Main City"><input value={form.destination.city} onChange={(e) => setNested('destination', 'city', e.target.value)} className={inputClass} placeholder="Example: Dubai" /></Field>
            <Field label="Cities Covered"><input value={form.citiesText} onChange={(e) => set('citiesText', e.target.value)} className={inputClass} placeholder="Dubai, Abu Dhabi, Sharjah" /></Field>
            <div className="md:col-span-2 rounded-xl border border-orange-100 bg-orange-50/70 p-4">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-orange-700">Frontend route preview</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {splitComma(form.citiesText || form.destination.city).length ? splitComma(form.citiesText || form.destination.city).map((city, index) => (
                  <span key={`${city}-${index}`} className="rounded-full bg-white px-3 py-1.5 text-xs font-black text-slate-700 shadow-sm">{index + 1}. {city}</span>
                )) : <span className="text-sm font-semibold text-slate-500">Add cities to show them on package cards and trip overview.</span>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Nights"><input type="number" min="0" value={form.duration.nights} onChange={(e) => set('duration', { ...form.duration, nights: Number(e.target.value) })} className={inputClass} /></Field>
              <Field label="Days"><input type="number" min="1" value={form.duration.days} onChange={(e) => set('duration', { ...form.duration, days: Number(e.target.value) })} className={inputClass} /></Field>
            </div>
          </div>
        ) : null}

        {tab === 'pricing' ? (
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Currency"><input value={form.pricing.currency} onChange={(e) => setNested('pricing', 'currency', e.target.value)} className={inputClass} /></Field>
            <Field label="Price Per Person"><input type="number" value={form.pricing.pricePerPerson} onChange={(e) => { setNested('pricing', 'pricePerPerson', Number(e.target.value)); setNested('pricing', 'basePrice', Number(e.target.value)) }} className={inputClass} /></Field>
            <Field label="Original Price"><input type="number" value={form.pricing.originalPrice} onChange={(e) => setNested('pricing', 'originalPrice', Number(e.target.value))} className={inputClass} /></Field>
            <Field label="Booking Advance"><input type="number" value={form.pricing.bookingAdvance} onChange={(e) => { setNested('pricing', 'bookingAdvance', Number(e.target.value)); setNested('pricing', 'bookingAmount', Number(e.target.value)) }} className={inputClass} /></Field>
            <Field label="GST Percentage"><input type="number" value={form.pricing.gstPercentage} onChange={(e) => setNested('pricing', 'gstPercentage', Number(e.target.value))} className={inputClass} /></Field>
            <Field label="Price Note"><input value={form.pricing.priceNote} onChange={(e) => setNested('pricing', 'priceNote', e.target.value)} className={inputClass} /></Field>
          </div>
        ) : null}

        {tab === 'images' ? (
          <div className="space-y-5">
            <div className="grid gap-5 xl:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h2 className="font-black text-slate-950">Featured / Hero Image</h2>
                <p className="mt-1 text-sm text-slate-500">This image appears first in the single package hero section.</p>
                <div className="mt-4">
                  <ImageUploader onUploaded={setFeaturedImage} buttonLabel={form.featuredImage?.url ? 'Replace Featured Image' : 'Upload Featured Image'} />
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h2 className="font-black text-slate-950">Gallery Images</h2>
                <p className="mt-1 text-sm text-slate-500">Upload multiple other images. These show in package thumbnails, hero selector, and gallery.</p>
                <div className="mt-4">
                  <ImageUploader onUploaded={addGalleryImage} buttonLabel="Add Gallery Image" />
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-black text-slate-950">Current Featured Image</h2>
              {form.featuredImage?.url ? (
                <div className="mt-3 max-w-md rounded-xl border border-orange-200 bg-orange-50 p-3">
                  <img src={form.featuredImage.url} alt={form.featuredImage.alt || ''} className="h-52 w-full rounded-lg object-cover" />
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button type="button" onClick={() => set('featuredImage', null)} className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-black text-red-600">Remove Featured</button>
                    {form.featuredImage.alt ? <span className="rounded-lg bg-white px-3 py-2 text-xs font-bold text-slate-500">{form.featuredImage.alt}</span> : null}
                  </div>
                </div>
              ) : <p className="mt-2 text-sm text-slate-500">No featured image selected yet.</p>}
            </div>

            <div>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="font-black text-slate-950">Package Gallery</h2>
                  <p className="text-sm text-slate-500">{form.gallery.length} image{form.gallery.length === 1 ? '' : 's'} added.</p>
                </div>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {form.gallery.map((image, index) => (
                  <div key={`${image.url}-${index}`} className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
                    <img src={image.url} alt={image.alt || ''} className="h-32 w-full rounded-lg object-cover" />
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button type="button" onClick={() => makeGalleryImageFeatured(index)} className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-black text-white">Set Featured</button>
                      <button type="button" onClick={() => removeArrayItem('gallery', index)} className="rounded-lg border border-red-200 px-3 py-2 text-xs font-black text-red-600">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
              {!form.gallery.length ? <p className="mt-3 rounded-lg border border-dashed border-slate-300 p-4 text-center text-sm text-slate-500">No gallery images yet. Use “Add Gallery Image” above.</p> : null}
            </div>
          </div>
        ) : null}

        {tab === 'content' ? (
          <div className="grid gap-4">
            <Field label="Highlights, one per line"><textarea value={form.highlightsText} onChange={(e) => set('highlightsText', e.target.value)} className={`${inputClass} min-h-28`} /></Field>
            <div className="grid gap-4 md:grid-cols-2">
              {Object.keys(form.overview).map((key) => <Field key={key} label={key}><input value={form.overview[key] || ''} onChange={(e) => setNested('overview', key, e.target.value)} className={inputClass} /></Field>)}
            </div>
          </div>
        ) : null}

        {tab === 'departures' ? (
          <div className="space-y-4">
            <button type="button" onClick={() => addArrayItem('departures', { startDate: '', endDate: '', totalSeats: 20, bookedSeats: 0, availableSeats: 20, status: 'open', pricePerPerson: form.pricing.pricePerPerson, bookingAdvance: form.pricing.bookingAdvance })} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-black text-white">Add Departure</button>
            {form.departures.map((departure, index) => <div key={index} className="grid gap-3 rounded-xl border p-4 md:grid-cols-4"><Field label="Start"><input type="date" value={departure.startDate} onChange={(e) => setArrayItem('departures', index, { startDate: e.target.value })} className={inputClass} /></Field><Field label="End"><input type="date" value={departure.endDate} onChange={(e) => setArrayItem('departures', index, { endDate: e.target.value })} className={inputClass} /></Field><Field label="Seats"><input type="number" value={departure.totalSeats} onChange={(e) => setArrayItem('departures', index, { totalSeats: Number(e.target.value), availableSeats: Number(e.target.value) - Number(departure.bookedSeats || 0) })} className={inputClass} /></Field><Field label="Status"><select value={departure.status} onChange={(e) => setArrayItem('departures', index, { status: e.target.value })} className={inputClass}><option value="open">Open</option><option value="few_seats">Few Seats</option><option value="sold_out">Sold Out</option><option value="cancelled">Cancelled</option></select></Field><Field label="Price"><input type="number" value={departure.pricePerPerson} onChange={(e) => setArrayItem('departures', index, { pricePerPerson: Number(e.target.value) })} className={inputClass} /></Field><Field label="Advance"><input type="number" value={departure.bookingAdvance} onChange={(e) => setArrayItem('departures', index, { bookingAdvance: Number(e.target.value) })} className={inputClass} /></Field><button type="button" onClick={() => removeArrayItem('departures', index)} className="self-end rounded-lg border border-red-200 px-4 py-3 text-sm font-black text-red-600">Remove</button></div>)}
          </div>
        ) : null}

        {tab === 'itinerary' ? (
          <div className="space-y-4">
            <button type="button" onClick={() => addArrayItem('itinerary', { dayNumber: form.itinerary.length + 1, title: '', description: '', activitiesText: '', mealsText: '', overnightCity: '', hotelName: '' })} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-black text-white">Add Day</button>
            {form.itinerary.map((day, index) => <div key={index} className="grid gap-3 rounded-xl border p-4 md:grid-cols-2"><Field label="Day"><input type="number" value={day.dayNumber} onChange={(e) => setArrayItem('itinerary', index, { dayNumber: Number(e.target.value) })} className={inputClass} /></Field><Field label="Title"><input value={day.title} onChange={(e) => setArrayItem('itinerary', index, { title: e.target.value })} className={inputClass} /></Field><Field label="Description"><textarea value={day.description} onChange={(e) => setArrayItem('itinerary', index, { description: e.target.value })} className={`${inputClass} min-h-24`} /></Field><Field label="Activities one per line"><textarea value={day.activitiesText} onChange={(e) => setArrayItem('itinerary', index, { activitiesText: e.target.value })} className={`${inputClass} min-h-24`} /></Field><Field label="Meals comma separated"><input value={day.mealsText} onChange={(e) => setArrayItem('itinerary', index, { mealsText: e.target.value })} className={inputClass} /></Field><Field label="Overnight City"><input value={day.overnightCity} onChange={(e) => setArrayItem('itinerary', index, { overnightCity: e.target.value })} className={inputClass} /></Field><button type="button" onClick={() => removeArrayItem('itinerary', index)} className="rounded-lg border border-red-200 px-4 py-3 text-sm font-black text-red-600">Remove</button></div>)}
          </div>
        ) : null}

        {tab === 'hotels' ? (
          <div className="space-y-4">
            <button type="button" onClick={() => addArrayItem('hotels', { name: '', city: '', starRating: 4, nights: '', mealPlan: '', amenitiesText: '' })} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-black text-white">Add Hotel</button>
            {form.hotels.map((hotel, index) => <div key={index} className="grid gap-3 rounded-xl border p-4 md:grid-cols-2"><Field label="Hotel Name"><input value={hotel.name} onChange={(e) => setArrayItem('hotels', index, { name: e.target.value })} className={inputClass} /></Field><Field label="City"><input value={hotel.city} onChange={(e) => setArrayItem('hotels', index, { city: e.target.value })} className={inputClass} /></Field><Field label="Stars"><input type="number" min="1" max="5" value={hotel.starRating} onChange={(e) => setArrayItem('hotels', index, { starRating: Number(e.target.value) })} className={inputClass} /></Field><Field label="Nights"><input value={hotel.nights} onChange={(e) => setArrayItem('hotels', index, { nights: e.target.value })} className={inputClass} /></Field><Field label="Meal Plan"><input value={hotel.mealPlan} onChange={(e) => setArrayItem('hotels', index, { mealPlan: e.target.value })} className={inputClass} /></Field><Field label="Amenities one per line"><textarea value={hotel.amenitiesText} onChange={(e) => setArrayItem('hotels', index, { amenitiesText: e.target.value })} className={`${inputClass} min-h-24`} /></Field><button type="button" onClick={() => removeArrayItem('hotels', index)} className="rounded-lg border border-red-200 px-4 py-3 text-sm font-black text-red-600">Remove</button></div>)}
          </div>
        ) : null}

        {tab === 'included' ? (
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Inclusions, one per line"><textarea value={form.inclusionsText} onChange={(e) => set('inclusionsText', e.target.value)} className={`${inputClass} min-h-56`} /></Field>
            <Field label="Exclusions, one per line"><textarea value={form.exclusionsText} onChange={(e) => set('exclusionsText', e.target.value)} className={`${inputClass} min-h-56`} /></Field>
          </div>
        ) : null}

        {tab === 'group' ? (
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Min Travelers"><input type="number" value={form.groupInfo.minTravelers} onChange={(e) => setNested('groupInfo', 'minTravelers', Number(e.target.value))} className={inputClass} /></Field>
            <Field label="Max Travelers"><input type="number" value={form.groupInfo.maxTravelers} onChange={(e) => setNested('groupInfo', 'maxTravelers', Number(e.target.value))} className={inputClass} /></Field>
            <Field label="Departures Per Month"><input type="number" value={form.groupInfo.departuresPerMonth} onChange={(e) => setNested('groupInfo', 'departuresPerMonth', Number(e.target.value))} className={inputClass} /></Field>
            <label className="mt-7 flex items-center gap-2 text-sm font-bold"><input type="checkbox" checked={form.groupInfo.tourManagerIncluded} onChange={(e) => setNested('groupInfo', 'tourManagerIncluded', e.target.checked)} /> Tour manager included</label>
            <Field label="Group Description"><textarea value={form.groupInfo.description} onChange={(e) => setNested('groupInfo', 'description', e.target.value)} className={`${inputClass} min-h-28 md:col-span-2`} /></Field>
          </div>
        ) : null}

        {tab === 'faqs' ? (
          <div className="space-y-4">
            <button type="button" onClick={() => addArrayItem('faqs', { question: '', answer: '' })} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-black text-white">Add FAQ</button>
            {form.faqs.map((faq, index) => <div key={index} className="grid gap-3 rounded-xl border p-4"><Field label="Question"><input value={faq.question} onChange={(e) => setArrayItem('faqs', index, { question: e.target.value })} className={inputClass} /></Field><Field label="Answer"><textarea value={faq.answer} onChange={(e) => setArrayItem('faqs', index, { answer: e.target.value })} className={`${inputClass} min-h-24`} /></Field><button type="button" onClick={() => removeArrayItem('faqs', index)} className="w-fit rounded-lg border border-red-200 px-4 py-3 text-sm font-black text-red-600">Remove</button></div>)}
          </div>
        ) : null}

        {tab === 'seo' ? (
          <div className="grid gap-4">
            <Field label="Meta Title"><input value={form.seo.metaTitle || ''} onChange={(e) => setNested('seo', 'metaTitle', e.target.value)} className={inputClass} /></Field>
            <Field label="Meta Description"><textarea value={form.seo.metaDescription || ''} onChange={(e) => setNested('seo', 'metaDescription', e.target.value)} className={`${inputClass} min-h-28`} /></Field>
            <Field label="SEO Keywords comma separated"><input value={form.seoKeywordsText} onChange={(e) => set('seoKeywordsText', e.target.value)} className={inputClass} /></Field>
            <div className="grid gap-4 md:grid-cols-2">
              {Object.keys(form.assignedExpert).map((key) => <Field key={key} label={`Expert ${key}`}><input value={form.assignedExpert[key] || ''} onChange={(e) => setNested('assignedExpert', key, e.target.value)} className={inputClass} /></Field>)}
            </div>
          </div>
        ) : null}
      </div>

      <button disabled={saving} className="rounded-lg bg-orange-500 px-5 py-3 text-sm font-black text-white disabled:opacity-60">{saving ? 'Saving...' : 'Save Package'}</button>
    </form>
  )
}

export default PackageFormPage
