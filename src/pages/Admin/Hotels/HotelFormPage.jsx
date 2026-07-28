import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import ImageUploader from '../../../components/admin/ImageUploader'
import { hotelService } from '../../../services/hotelService'

const packagePlanOptions = ['classic', 'gold', 'platinum', 'premium', 'Elite']

const emptyForm = {
  hotelName: '',
  slug: '',
  countryId: '',
  cityId: '',
  starRating: 4,
  hotelCategory: '',
  packagePlans: [],
  price: 0,
  priceInr: 0,
  priceUsd: 0,
  description: '',
  thumbnailImage: null,
  gallery: [],
  isActive: true,
  featured: false,
  recommended: false,
  topSeller: false,
}

const Field = ({ label, children }) => (
  <label className="block text-sm font-bold text-slate-700">
    <span>{label}</span>
    <div className="mt-1">{children}</div>
  </label>
)

const inputClass = 'w-full rounded-lg border border-slate-200 p-3 text-sm font-semibold text-slate-700 outline-none focus:border-orange-400'

const HotelFormPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!id) return

    let mounted = true

    const loadHotel = async () => {
      try {
        const item = await hotelService.get(id)
        if (!mounted) return

        setForm({
          ...emptyForm,
          ...item,
          priceInr: item.priceInr ?? item.price ?? 0,
          priceUsd: item.priceUsd ?? item.price ?? 0,
          gallery: item.gallery || [],
          packagePlans: item.packagePlans || [],
        })
      } catch (error) {
        toast.error(error.response?.data?.message || 'Unable to load hotel data')
      }
    }

    loadHotel()

    return () => {
      mounted = false
    }
  }, [id])

  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }))
  const addGalleryImage = (image) => setForm((current) => ({ ...current, gallery: [...(current.gallery || []), image] }))
  const removeGalleryImage = (index) => setForm((current) => ({ ...current, gallery: current.gallery.filter((_, itemIndex) => itemIndex !== index) }))

  const submit = async (event) => {
    event.preventDefault()
    if (!form.hotelName.trim()) return toast.error('Hotel name is required')
    if (!form.cityId.trim()) return toast.error('City is required')
    if (!form.countryId.trim()) return toast.error('Country is required')

    setSaving(true)
    try {
      const payload = {
        ...form,
        starRating: Number(form.starRating || 4),
        priceInr: Number(form.priceInr || 0),
        priceUsd: Number(form.priceUsd || 0),
        price: Number(form.priceInr || form.priceUsd || form.price || 0),
      }
      const saved = id ? await hotelService.update(id, payload) : await hotelService.create(payload)
      toast.success(id ? 'Hotel updated' : 'Hotel created')
      navigate(`/admin/hotels/${saved._id}/edit`)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Hotel save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-950">{id ? 'Edit Hotel' : 'Add Hotel'}</h1>
          <p className="text-sm text-slate-500">Create independent hotel data for curated package suggestions.</p>
        </div>
        <button disabled={saving} className="rounded-lg bg-orange-500 px-5 py-3 text-sm font-black text-white disabled:opacity-60">{saving ? 'Saving...' : 'Save Hotel'}</button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Hotel Name"><input required value={form.hotelName} onChange={(event) => set('hotelName', event.target.value)} className={inputClass} /></Field>
          <Field label="Slug"><input value={form.slug || ''} onChange={(event) => set('slug', event.target.value)} placeholder="auto-generated if blank" className={inputClass} /></Field>
          <Field label="Country"><input required value={form.countryId} onChange={(event) => set('countryId', event.target.value)} className={inputClass} /></Field>
          <Field label="City"><input required value={form.cityId} onChange={(event) => set('cityId', event.target.value)} className={inputClass} /></Field>
          <Field label="Star Rating"><input type="number" min="1" max="5" value={form.starRating} onChange={(event) => set('starRating', Number(event.target.value))} className={inputClass} /></Field>
          <Field label="Hotel Category"><input value={form.hotelCategory} onChange={(event) => set('hotelCategory', event.target.value)} placeholder="Luxury, Premium, Family" className={inputClass} /></Field>
          <Field label="Package Plans">
            <div className="grid gap-2">
              {packagePlanOptions.map((plan) => (
                <label key={plan} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={form.packagePlans.includes(plan)}
                    onChange={(event) => {
                      const checked = event.target.checked
                      set('packagePlans', checked ? [...new Set([...(form.packagePlans || []), plan])] : (form.packagePlans || []).filter((item) => item !== plan))
                    }}
                  />
                  {plan}
                </label>
              ))}
            </div>
          </Field>
          <Field label="Price (INR)"><input type="number" min="0" value={form.priceInr} onChange={(event) => set('priceInr', Number(event.target.value))} className={inputClass} placeholder="Add-on price in INR" /></Field>
          <Field label="Price (USD)"><input type="number" min="0" value={form.priceUsd} onChange={(event) => set('priceUsd', Number(event.target.value))} className={inputClass} placeholder="Add-on price in USD" /></Field>
          <div className="mt-7 flex flex-wrap gap-4 text-sm font-bold">
            <label className="flex items-center gap-2"><input type="checkbox" checked={form.isActive} onChange={(event) => set('isActive', event.target.checked)} /> Active</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={form.featured} onChange={(event) => set('featured', event.target.checked)} /> Featured</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={form.recommended} onChange={(event) => set('recommended', event.target.checked)} /> Recommended</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={form.topSeller} onChange={(event) => set('topSeller', event.target.checked)} /> Top Seller</label>
          </div>
          <Field label="Description"><textarea value={form.description} onChange={(event) => set('description', event.target.value)} className={`${inputClass} min-h-32 md:col-span-2`} /></Field>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-black text-slate-950">Thumbnail Image</h2>
          <p className="mt-1 text-sm text-slate-500">Shown in hotel picker and package detail suggestions.</p>
          <div className="mt-4"><ImageUploader onUploaded={(image) => set('thumbnailImage', image)} buttonLabel={form.thumbnailImage?.url ? 'Replace Thumbnail' : 'Upload Thumbnail'} /></div>
          {form.thumbnailImage?.url ? <img src={form.thumbnailImage.url} alt={form.thumbnailImage.alt || ''} className="mt-4 h-44 w-full rounded-xl object-cover" /> : null}
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-black text-slate-950">Gallery</h2>
          <p className="mt-1 text-sm text-slate-500">Optional supporting images for future hotel detail surfaces.</p>
          <div className="mt-4"><ImageUploader onUploaded={addGalleryImage} buttonLabel="Add Gallery Image" /></div>
          {form.gallery?.length ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {form.gallery.map((image, index) => (
                <div key={`${image.url}-${index}`} className="rounded-xl border border-slate-200 p-2">
                  <img src={image.url} alt={image.alt || ''} className="h-28 w-full rounded-lg object-cover" />
                  <button type="button" onClick={() => removeGalleryImage(index)} className="mt-2 rounded-lg border border-red-200 px-3 py-2 text-xs font-black text-red-600">Remove</button>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </form>
  )
}

export default HotelFormPage
