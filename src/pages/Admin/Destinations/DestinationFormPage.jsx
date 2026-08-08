import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import ImageUploader from '../../../components/admin/ImageUploader'
import { destinationService } from '../../../services/destinationService'

const empty = {
  name: '',
  country: '',
  cityType: 'city',
  shortDescription: '',
  overview: '',
  bestTimeToVisit: '',
  currency: '',
  language: '',
  timezone: '',
  travelTips: [],
  safetyTips: [],
  whyVisit: [],
  thingsToDo: [],
  weatherGuide: {},
  visaInformation: {},
  flightsInformation: {},
  transportation: {},
  foodGuide: {},
  shoppingGuide: {},
  nightlife: {},
  familyTravelGuide: {},
  honeymoonGuide: {},
  luxuryTravelGuide: {},
  budgetGuide: {},
  mapEmbedUrl: '',
  isFeatured: false,
  isActive: true,
  sortOrder: 0,
  heroImage: {},
  seo: {},
  faqs: [],
  relatedBlogSlugs: [],
  featuredBlogSlugs: [],
  blogFetchMode: 'auto',
  maxBlogs: 6,
}

const listToText = (items = []) => items.join('\n')
const textToList = (value = '') => value.split('\n').map((item) => item.trim()).filter(Boolean)
const firstBlockDescription = (items = []) => items[0]?.description || ''
const blockDescription = (block = {}) => block.description || ''

const DestinationFormPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(empty)
  const [countries, setCountries] = useState([])

  useEffect(() => { if (id) destinationService.getRaw(id).then((item) => setForm({ ...empty, ...item })) }, [id])

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
  const setSingleBlockList = (key, title, description) => set(key, description.trim() ? [{ title, description }] : [])
  const setBlockDescription = (key, title, description) => set(key, description.trim() ? { ...(form[key] || {}), title, description } : {})
  const submit = async (e) => {
    e.preventDefault()
    const payload = {
      ...form,
      name: form.cityType === 'country' ? form.country : form.name,
      seo: {
        ...(form.seo || {}),
        keywords: Array.isArray(form.seo?.keywords)
          ? form.seo.keywords
          : String(form.seo?.keywords || '').split(',').map((keyword) => keyword.trim()).filter(Boolean),
      },
    }

    try {
      id ? await destinationService.update(id, payload) : await destinationService.create(payload)
      toast.success('Destination saved')
      navigate('/admin/destinations')
    } catch (error) {
      const message = error.response?.data?.message || 'Destination could not be saved'
      toast.error(message)
    }
  }

  const [previewBlogs, setPreviewBlogs] = useState(null)
  const [previewLoading, setPreviewLoading] = useState(false)
  const preview = async () => {
    if (!id) return
    setPreviewLoading(true)
    try {
      const page = await destinationService.get(id, { include: 'blogs' })
      setPreviewBlogs(page.related?.blogs || [])
    } catch (err) {
      setPreviewBlogs([])
    } finally {
      setPreviewLoading(false)
    }
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
        <label className="space-y-1 text-sm font-bold text-slate-700">
          Best time to visit
          <input value={form.bestTimeToVisit || ''} onChange={(e) => set('bestTimeToVisit', e.target.value)} className="w-full rounded-lg border p-3 font-semibold" />
        </label>
        <label className="space-y-1 text-sm font-bold text-slate-700">
          Currency
          <input value={form.currency || ''} onChange={(e) => set('currency', e.target.value)} className="w-full rounded-lg border p-3 font-semibold" />
        </label>
        <label className="space-y-1 text-sm font-bold text-slate-700">
          Language
          <input value={form.language || ''} onChange={(e) => set('language', e.target.value)} className="w-full rounded-lg border p-3 font-semibold" />
        </label>
        <label className="space-y-1 text-sm font-bold text-slate-700">
          Timezone
          <input value={form.timezone || ''} onChange={(e) => set('timezone', e.target.value)} className="w-full rounded-lg border p-3 font-semibold" />
        </label>
      <div className="md:col-span-2 grid gap-3">
          <h2 className="text-lg font-black">FAQ (for this destination)</h2>
          {(form.faqs || []).map((faq, idx) => (
            <div key={idx} className="rounded-lg border p-3">
              <input placeholder="Question" value={faq.question} onChange={(e) => {
                const next = [...(form.faqs || [])]
                next[idx] = { ...next[idx], question: e.target.value }
                set('faqs', next)
              }} className="w-full rounded-lg border p-2 mb-2" />
              <textarea placeholder="Answer" value={faq.answer} onChange={(e) => {
                const next = [...(form.faqs || [])]
                next[idx] = { ...next[idx], answer: e.target.value }
                set('faqs', next)
              }} className="w-full rounded-lg border p-2" />
              <div className="mt-2 flex gap-2">
                <button type="button" onClick={() => {
                  const next = [...(form.faqs || [])]
                  next.splice(idx, 1)
                  set('faqs', next)
                }} className="text-red-600">Remove</button>
                <button type="button" onClick={() => {
                  const next = [...(form.faqs || [])]
                  if (idx > 0) { const a = next[idx-1]; next[idx-1] = next[idx]; next[idx] = a; set('faqs', next) }
                }} className="text-sm text-slate-700">Move Up</button>
                <button type="button" onClick={() => {
                  const next = [...(form.faqs || [])]
                  if (idx < next.length - 1) { const a = next[idx+1]; next[idx+1] = next[idx]; next[idx] = a; set('faqs', next) }
                }} className="text-sm text-slate-700">Move Down</button>
              </div>
            </div>
          ))}
          <div>
            <button type="button" onClick={() => set('faqs', [...(form.faqs || []), { question: '', answer: '' }])} className="rounded-lg bg-slate-200 px-3 py-2">Add FAQ</button>
          </div>
        </div>
        <label className="font-bold"><input type="checkbox" checked={form.isFeatured} onChange={(e) => set('isFeatured', e.target.checked)} /> Featured</label>
        <label className="font-bold"><input type="checkbox" checked={form.isActive} onChange={(e) => set('isActive', e.target.checked)} /> Active</label>
      </div>
      <div className="grid gap-4 rounded-xl bg-white p-5 shadow-sm md:grid-cols-2">
        <h2 className="md:col-span-2 text-lg font-black">Destination Landing Page Content</h2>
        <textarea placeholder="Why visit this destination" value={firstBlockDescription(form.whyVisit)} onChange={(e) => setSingleBlockList('whyVisit', 'Why visit', e.target.value)} className="rounded-lg border p-3 md:col-span-2" />
        <textarea placeholder="Things to do" value={firstBlockDescription(form.thingsToDo)} onChange={(e) => setSingleBlockList('thingsToDo', 'Things to do', e.target.value)} className="rounded-lg border p-3 md:col-span-2" />
        <textarea placeholder="Weather guide" value={blockDescription(form.weatherGuide)} onChange={(e) => setBlockDescription('weatherGuide', 'Weather guide', e.target.value)} className="rounded-lg border p-3" />
        <textarea placeholder="Visa information" value={blockDescription(form.visaInformation)} onChange={(e) => setBlockDescription('visaInformation', 'Visa information', e.target.value)} className="rounded-lg border p-3" />
        <textarea placeholder="Flights information" value={blockDescription(form.flightsInformation)} onChange={(e) => setBlockDescription('flightsInformation', 'Flights information', e.target.value)} className="rounded-lg border p-3" />
        <textarea placeholder="Transportation" value={blockDescription(form.transportation)} onChange={(e) => setBlockDescription('transportation', 'Transportation', e.target.value)} className="rounded-lg border p-3" />
        <textarea placeholder="Food guide" value={blockDescription(form.foodGuide)} onChange={(e) => setBlockDescription('foodGuide', 'Food guide', e.target.value)} className="rounded-lg border p-3" />
        <textarea placeholder="Shopping guide" value={blockDescription(form.shoppingGuide)} onChange={(e) => setBlockDescription('shoppingGuide', 'Shopping guide', e.target.value)} className="rounded-lg border p-3" />
        <textarea placeholder="Nightlife" value={blockDescription(form.nightlife)} onChange={(e) => setBlockDescription('nightlife', 'Nightlife', e.target.value)} className="rounded-lg border p-3" />
        <textarea placeholder="Family travel guide" value={blockDescription(form.familyTravelGuide)} onChange={(e) => setBlockDescription('familyTravelGuide', 'Family travel guide', e.target.value)} className="rounded-lg border p-3" />
        <textarea placeholder="Honeymoon guide" value={blockDescription(form.honeymoonGuide)} onChange={(e) => setBlockDescription('honeymoonGuide', 'Honeymoon guide', e.target.value)} className="rounded-lg border p-3" />
        <textarea placeholder="Luxury travel guide" value={blockDescription(form.luxuryTravelGuide)} onChange={(e) => setBlockDescription('luxuryTravelGuide', 'Luxury travel guide', e.target.value)} className="rounded-lg border p-3" />
        <textarea placeholder="Budget guide" value={blockDescription(form.budgetGuide)} onChange={(e) => setBlockDescription('budgetGuide', 'Budget guide', e.target.value)} className="rounded-lg border p-3" />
        <label className="space-y-1 text-sm font-bold text-slate-700">
          Google map embed URL
          <input value={form.mapEmbedUrl || ''} onChange={(e) => set('mapEmbedUrl', e.target.value)} className="w-full rounded-lg border p-3 font-semibold" />
        </label>
        <label className="space-y-1 text-sm font-bold text-slate-700 md:col-span-2">
          Travel tips (one per line)
          <textarea value={listToText(form.travelTips || [])} onChange={(e) => set('travelTips', textToList(e.target.value))} className="w-full rounded-lg border p-3 font-semibold" />
        </label>
        <label className="space-y-1 text-sm font-bold text-slate-700 md:col-span-2">
          Safety tips (one per line)
          <textarea value={listToText(form.safetyTips || [])} onChange={(e) => set('safetyTips', textToList(e.target.value))} className="w-full rounded-lg border p-3 font-semibold" />
        </label>
      </div>
      <div className="grid gap-4 rounded-xl bg-white p-5 shadow-sm md:grid-cols-2">
        <h2 className="md:col-span-2 text-lg font-black">Blog Integration / Controls</h2>
        <label className="space-y-1 text-sm font-bold text-slate-700 md:col-span-2">
          Blog Fetch Mode
          <select value={form.blogFetchMode} onChange={(e) => set('blogFetchMode', e.target.value)} className="w-full rounded-lg border p-3 font-semibold">
            <option value="auto">Auto (by tags)</option>
            <option value="manual">Manual (select slugs)</option>
            <option value="hybrid">Hybrid (manual + auto)</option>
          </select>
        </label>
        <label className="space-y-1 text-sm font-bold text-slate-700 md:col-span-2">
          Featured Blog Slugs (one per line)
          <textarea placeholder="related-blog-slug-1\nrelated-blog-slug-2" value={(form.featuredBlogSlugs || []).join('\n')} onChange={(e) => set('featuredBlogSlugs', e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))} className="w-full rounded-lg border p-3 font-semibold" />
        </label>
        <label className="space-y-1 text-sm font-bold text-slate-700 md:col-span-2">
          Manual Related Blog Slugs (one per line)
          <textarea placeholder="related-blog-slug-1\nrelated-blog-slug-2" value={(form.relatedBlogSlugs || []).join('\n')} onChange={(e) => set('relatedBlogSlugs', e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))} className="w-full rounded-lg border p-3 font-semibold" />
        </label>
        <label className="space-y-1 text-sm font-bold text-slate-700">
          Max Blogs to show
          <input type="number" min={0} value={form.maxBlogs} onChange={(e) => set('maxBlogs', Number(e.target.value))} className="w-full rounded-lg border p-3 font-semibold" />
        </label>
      </div>
      <ImageUploader onUploaded={(image) => set('heroImage', image)} />
      <div className="flex gap-3 items-center">
        <button type="submit" className="rounded-lg bg-orange-500 px-5 py-3 text-sm font-black text-white">Save Destination</button>
        <button type="button" onClick={preview} disabled={!id} className="rounded-lg border px-5 py-3 text-sm font-black">{previewLoading ? 'Loading...' : 'Preview Blogs'}</button>
      </div>
      {previewBlogs && (
        <div className="rounded-lg bg-white p-4 mt-4">
          <h3 className="font-black">Preview: Blogs that will show for this destination</h3>
          {previewBlogs.length ? (
            <ul className="mt-2 space-y-2">
              {previewBlogs.map((b) => (
                <li key={b._id} className="border rounded p-2">
                  <a href={`/blogs/${b.slug}`} className="font-semibold text-blue-600">{b.title}</a>
                  <p className="text-sm text-dark-500">{b.excerpt || b.summary || ''}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-dark-500">No blogs matched.</p>
          )}
        </div>
      )}
    </form>
  )
}

export default DestinationFormPage
