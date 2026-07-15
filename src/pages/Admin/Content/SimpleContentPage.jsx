import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ConfirmModal from '../../../components/admin/ConfirmModal'
import DataTable from '../../../components/admin/DataTable'
import { contentService } from '../../../services/contentService'

const emptyBlogForm = {
  title: '',
  excerpt: '',
  heroLabel: '',
  category: 'Travel',
  coverImageUrl: '',
  coverImageAlt: '',
  tagsText: '',
  highlightsText: '',
  sectionsText: '',
  internalLinksText: '',
  relatedBlogSlugsText: '',
  metaTitle: '',
  metaDescription: '',
  keywordsText: '',
  canonicalUrl: '',
  ogImage: '',
  isPublished: false,
}

const toLines = (items = []) => items.filter(Boolean).join('\n')

const blogToForm = (blog) => ({
  ...emptyBlogForm,
  ...blog,
  coverImageUrl: blog.coverImage?.url || '',
  coverImageAlt: blog.coverImage?.alt || '',
  tagsText: toLines(blog.tags || []),
  highlightsText: toLines(blog.highlights || []),
  sectionsText: (blog.sections || []).map((section) => `${section.heading}\n${section.body}`).join('\n---\n'),
  internalLinksText: (blog.internalLinks || []).map((link) => `${link.label}|${link.url}|${link.type || 'page'}`).join('\n'),
  relatedBlogSlugsText: toLines(blog.relatedBlogSlugs || []),
  metaTitle: blog.seo?.metaTitle || '',
  metaDescription: blog.seo?.metaDescription || '',
  keywordsText: toLines(blog.seo?.keywords || []),
  canonicalUrl: blog.seo?.canonicalUrl || '',
  ogImage: blog.seo?.ogImage || '',
})

const splitLines = (value = '') => value.split('\n').map((item) => item.trim()).filter(Boolean)
const allowedLinkTypes = ['blog', 'package', 'destination', 'page', 'external']

const normalizeLinkType = (type, url = '') => {
  const normalized = String(type || '').trim().toLowerCase()
  if (allowedLinkTypes.includes(normalized)) return normalized
  if (/^https?:\/\//i.test(url)) return 'external'
  if (url.startsWith('/blogs/')) return 'blog'
  if (url.startsWith('/packages/')) return 'package'
  if (url.startsWith('/destinations/')) return 'destination'
  return 'page'
}

const parseSections = (value = '') =>
  value
    .split(/\n---\n/)
    .map((block) => {
      const [heading, ...bodyParts] = block.split('\n')
      return { heading: heading?.trim(), body: bodyParts.join('\n').trim() }
    })
    .filter((section) => section.heading && section.body)

const parseInternalLinks = (value = '') => {
  const links = []
  const pattern = /([^|\n]+?)\|(https?:\/\/[^\s|]+|\/[^\s|]+)(?:\|(blog|package|destination|page|external))?/gi
  let match = pattern.exec(value)

  while (match) {
    const [, label, url, type] = match
    links.push({ label: label.trim(), url: url.trim(), type: normalizeLinkType(type, url) })
    match = pattern.exec(value)
  }

  return links
}

const blogFormToPayload = (form) => ({
  title: form.title,
  excerpt: form.excerpt,
  heroLabel: form.heroLabel,
  category: form.category || 'Travel',
  coverImage: {
    url: form.coverImageUrl || form.coverImage?.url || '',
    alt: form.coverImageAlt || form.coverImage?.alt || form.title,
  },
  tags: splitLines(form.tagsText),
  highlights: splitLines(form.highlightsText),
  sections: parseSections(form.sectionsText),
  internalLinks: parseInternalLinks(form.internalLinksText),
  relatedBlogSlugs: splitLines(form.relatedBlogSlugsText),
  isPublished: Boolean(form.isPublished),
  seo: {
    metaTitle: form.metaTitle,
    metaDescription: form.metaDescription,
    keywords: splitLines(form.keywordsText),
    canonicalUrl: form.canonicalUrl,
    ogImage: form.ogImage,
  },
})

const SimpleContentPage = ({ type }) => {
  const [rows, setRows] = useState([])
  const [editing, setEditing] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [form, setForm] = useState({})

  const load = useCallback(() => {
    const loaders = { testimonials: contentService.testimonials, blogs: contentService.blogs, newsletter: contentService.newsletter }
    loaders[type]?.().then(setRows)
  }, [type])

  useEffect(() => {
    load()
  }, [load])

  const title = { testimonials: 'Testimonials', blogs: 'Blogs', newsletter: 'Newsletter Subscribers' }[type]
  const startCreate = () => {
    setEditing(null)
    setForm(type === 'blogs' ? emptyBlogForm : { customerName: '', location: '', rating: 5, review: '', isActive: true, isFeatured: false })
  }
  const startEdit = (row) => {
    setEditing(row)
    setForm(type === 'blogs' ? blogToForm(row) : row)
  }
  const save = async (event) => {
    event.preventDefault()
    try {
      if (type === 'blogs') {
        const payload = blogFormToPayload(form)
        editing ? await contentService.updateBlog(editing._id, payload) : await contentService.createBlog(payload)
      } else {
        editing ? await contentService.updateTestimonial(editing._id, form) : await contentService.createTestimonial(form)
      }
      toast.success('Saved')
      setForm({})
      setEditing(null)
      load()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Save failed. Please check the form fields.')
    }
  }
  const remove = async () => {
    if (type === 'blogs') await contentService.deleteBlog(deleteId)
    if (type === 'testimonials') await contentService.deleteTestimonial(deleteId)
    toast.success('Deleted')
    setDeleteId(null)
    load()
  }

  const columns = type === 'newsletter'
    ? [{ key: 'email', label: 'Email' }, { key: 'isActive', label: 'Active', render: (row) => row.isActive ? 'Yes' : 'No' }, { key: 'subscribedAt', label: 'Subscribed', render: (row) => new Date(row.subscribedAt).toLocaleDateString() }]
    : [{ key: 'title', label: 'Title / Name', render: (row) => row.title || row.customerName }, { key: 'status', label: 'Status', render: (row) => row.isPublished || row.isActive ? 'Active' : 'Draft' }, { key: 'createdAt', label: 'Created', render: (row) => row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '-' }, { key: 'actions', label: 'Actions', render: (row) => <div className="flex gap-2"><button onClick={() => startEdit(row)} className="font-bold text-orange-600">Edit</button><button onClick={() => setDeleteId(row._id)} className="font-bold text-red-600">Delete</button></div> }]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-black">{title}</h1>
        {type !== 'newsletter' ? <button onClick={startCreate} className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-black text-white">Add {type === 'blogs' ? 'Blog' : 'Testimonial'}</button> : null}
      </div>
      {Object.keys(form).length ? (
        <form onSubmit={save} className="grid gap-3 rounded-xl bg-white p-4 shadow-sm">
          {type === 'blogs' ? (
            <>
              <input required placeholder="Title" value={form.title || ''} onChange={(event) => setForm({ ...form, title: event.target.value })} className="rounded-lg border p-3" />
              <div className="grid gap-3 md:grid-cols-2">
                <input placeholder="Category" value={form.category || ''} onChange={(event) => setForm({ ...form, category: event.target.value })} className="rounded-lg border p-3" />
                <input placeholder="Hero label" value={form.heroLabel || ''} onChange={(event) => setForm({ ...form, heroLabel: event.target.value })} className="rounded-lg border p-3" />
              </div>
              <textarea placeholder="Excerpt / meta summary" value={form.excerpt || ''} onChange={(event) => setForm({ ...form, excerpt: event.target.value })} className="min-h-24 rounded-lg border p-3" />
              <div className="grid gap-3 md:grid-cols-2">
                <input placeholder="Cover image URL" value={form.coverImageUrl || ''} onChange={(event) => setForm({ ...form, coverImageUrl: event.target.value })} className="rounded-lg border p-3" />
                <input placeholder="Cover image alt text" value={form.coverImageAlt || ''} onChange={(event) => setForm({ ...form, coverImageAlt: event.target.value })} className="rounded-lg border p-3" />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <textarea placeholder="Highlights, one per line" value={form.highlightsText || ''} onChange={(event) => setForm({ ...form, highlightsText: event.target.value })} className="min-h-28 rounded-lg border p-3" />
                <textarea placeholder="Tags, one per line" value={form.tagsText || ''} onChange={(event) => setForm({ ...form, tagsText: event.target.value })} className="min-h-28 rounded-lg border p-3" />
              </div>
              <textarea
                required
                placeholder={'Sections format:\nHeading\nBody paragraph...\n---\nNext heading\nNext body paragraph...'}
                value={form.sectionsText || ''}
                onChange={(event) => setForm({ ...form, sectionsText: event.target.value })}
                className="min-h-44 rounded-lg border p-3"
              />
              <div>
                <textarea placeholder="Internal links, one per line: Label|/packages/example or Label|/packages/example|package" value={form.internalLinksText || ''} onChange={(event) => setForm({ ...form, internalLinksText: event.target.value })} className="min-h-24 w-full rounded-lg border p-3" />
                <p className="mt-1 text-xs font-semibold text-slate-500">
                  Use one link per line. Type is optional and auto-detected from URL.
                </p>
              </div>
              <textarea placeholder="Related blog slugs, one per line" value={form.relatedBlogSlugsText || ''} onChange={(event) => setForm({ ...form, relatedBlogSlugsText: event.target.value })} className="min-h-24 rounded-lg border p-3" />
              <div className="grid gap-3 md:grid-cols-2">
                <input placeholder="SEO title" value={form.metaTitle || ''} onChange={(event) => setForm({ ...form, metaTitle: event.target.value })} className="rounded-lg border p-3" />
                <input placeholder="Canonical URL" value={form.canonicalUrl || ''} onChange={(event) => setForm({ ...form, canonicalUrl: event.target.value })} className="rounded-lg border p-3" />
              </div>
              <textarea placeholder="SEO description" value={form.metaDescription || ''} onChange={(event) => setForm({ ...form, metaDescription: event.target.value })} className="min-h-20 rounded-lg border p-3" />
              <div className="grid gap-3 md:grid-cols-2">
                <textarea placeholder="SEO keywords, one per line" value={form.keywordsText || ''} onChange={(event) => setForm({ ...form, keywordsText: event.target.value })} className="min-h-24 rounded-lg border p-3" />
                <input placeholder="OG image URL" value={form.ogImage || ''} onChange={(event) => setForm({ ...form, ogImage: event.target.value })} className="rounded-lg border p-3" />
              </div>
              <label className="font-bold"><input type="checkbox" checked={Boolean(form.isPublished)} onChange={(event) => setForm({ ...form, isPublished: event.target.checked })} /> Published</label>
            </>
          ) : (
            <>
              <input required placeholder="Customer name" value={form.customerName || ''} onChange={(event) => setForm({ ...form, customerName: event.target.value })} className="rounded-lg border p-3" />
              <input placeholder="Location" value={form.location || ''} onChange={(event) => setForm({ ...form, location: event.target.value })} className="rounded-lg border p-3" />
              <input type="number" min="1" max="5" value={form.rating || 5} onChange={(event) => setForm({ ...form, rating: Number(event.target.value) })} className="rounded-lg border p-3" />
              <textarea required placeholder="Review" value={form.review || ''} onChange={(event) => setForm({ ...form, review: event.target.value })} className="min-h-24 rounded-lg border p-3" />
              <label className="font-bold"><input type="checkbox" checked={Boolean(form.isFeatured)} onChange={(event) => setForm({ ...form, isFeatured: event.target.checked })} /> Featured</label>
              <label className="font-bold"><input type="checkbox" checked={form.isActive !== false} onChange={(event) => setForm({ ...form, isActive: event.target.checked })} /> Active</label>
            </>
          )}
          <div className="flex gap-2">
            <button className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-black text-white">Save</button>
            <button type="button" onClick={() => { setForm({}); setEditing(null) }} className="rounded-lg border px-4 py-2 text-sm font-black">Cancel</button>
          </div>
        </form>
      ) : null}
      <DataTable rows={rows} columns={columns} />
      <ConfirmModal open={Boolean(deleteId)} message="Delete this item permanently?" onClose={() => setDeleteId(null)} onConfirm={remove} />
    </div>
  )
}

export default SimpleContentPage
