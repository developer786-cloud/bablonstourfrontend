import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import ImageUploader from '../../../components/admin/ImageUploader'
import { destinationService } from '../../../services/destinationService'

const empty = { name: '', country: '', cityType: 'city', shortDescription: '', overview: '', bestTimeToVisit: '', currency: '', isFeatured: false, isActive: true, sortOrder: 0, heroImage: {}, seo: {} }

const DestinationFormPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(empty)
  const [countries, setCountries] = useState([])

  useEffect(() => { if (id) destinationService.get(id).then((item) => setForm({ ...empty, ...item })) }, [id])

  useEffect(() => {
    let mounted = true

    destinationService
      .list({ limit: 100 })
      .then((data) => {
        if (!mounted) return
        const rows = data.destinations || data.items || []
        setCountries(rows.map((item) => item.country).filter(Boolean))
      })
      .catch(() => {})

    return () => {
      mounted = false
    }
  }, [])

  const countryOptions = useMemo(() => Array.from(new Set(countries)).sort((first, second) => first.localeCompare(second)), [countries])

  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }))
  const submit = async (e) => {
    e.preventDefault()
    const payload = {
      ...form,
      name: form.cityType === 'country' ? form.country : form.name,
    }

    id ? await destinationService.update(id, payload) : await destinationService.create(payload)
    toast.success('Destination saved')
    navigate('/admin/destinations')
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <h1 className="text-2xl font-black">{id ? 'Edit Destination' : 'Add Destination'}</h1>
      <div className="grid gap-4 rounded-xl bg-white p-5 shadow-sm md:grid-cols-2">
        <label className="space-y-1 text-sm font-bold text-slate-700">
          Country
          <input required list="destination-countries" placeholder="Select or type country" value={form.country} onChange={(e) => set('country', e.target.value)} className="w-full rounded-lg border p-3 font-semibold" />
          <datalist id="destination-countries">
            {countryOptions.map((country) => <option key={country} value={country} />)}
          </datalist>
        </label>
        <label className="space-y-1 text-sm font-bold text-slate-700">
          Type
          <select value={form.cityType} onChange={(e) => set('cityType', e.target.value)} className="w-full rounded-lg border p-3 font-semibold"><option value="city">City</option><option value="region">Region</option><option value="country">Country</option></select>
        </label>
        {form.cityType !== 'country' ? (
          <label className="space-y-1 text-sm font-bold text-slate-700">
            City / Region name
            <input required placeholder="Example: Tbilisi" value={form.name} onChange={(e) => set('name', e.target.value)} className="w-full rounded-lg border p-3 font-semibold" />
          </label>
        ) : null}
        <label className="space-y-1 text-sm font-bold text-slate-700">
          Sort order
          <input type="number" placeholder="Sort order" value={form.sortOrder} onChange={(e) => set('sortOrder', Number(e.target.value))} className="w-full rounded-lg border p-3 font-semibold" />
        </label>
        <textarea placeholder="Short description" value={form.shortDescription} onChange={(e) => set('shortDescription', e.target.value)} className="rounded-lg border p-3 md:col-span-2" />
        <textarea placeholder="Overview" value={form.overview} onChange={(e) => set('overview', e.target.value)} className="rounded-lg border p-3 md:col-span-2" />
        <label className="font-bold"><input type="checkbox" checked={form.isFeatured} onChange={(e) => set('isFeatured', e.target.checked)} /> Featured</label>
        <label className="font-bold"><input type="checkbox" checked={form.isActive} onChange={(e) => set('isActive', e.target.checked)} /> Active</label>
      </div>
      <ImageUploader onUploaded={(image) => set('heroImage', image)} />
      <button className="rounded-lg bg-orange-500 px-5 py-3 text-sm font-black text-white">Save Destination</button>
    </form>
  )
}

export default DestinationFormPage
