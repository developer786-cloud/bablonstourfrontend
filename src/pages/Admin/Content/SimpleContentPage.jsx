import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ConfirmModal from '../../../components/admin/ConfirmModal'
import DataTable from '../../../components/admin/DataTable'
import { contentService } from '../../../services/contentService'

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
    setForm(type === 'blogs' ? { title: '', excerpt: '', content: '', category: 'Travel', isPublished: false } : { customerName: '', location: '', rating: 5, review: '', isActive: true, isFeatured: false })
  }
  const startEdit = (row) => {
    setEditing(row)
    setForm(row)
  }
  const save = async (event) => {
    event.preventDefault()
    if (type === 'blogs') {
      editing ? await contentService.updateBlog(editing._id, form) : await contentService.createBlog(form)
    } else {
      editing ? await contentService.updateTestimonial(editing._id, form) : await contentService.createTestimonial(form)
    }
    toast.success('Saved')
    setForm({})
    setEditing(null)
    load()
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
              <input placeholder="Excerpt" value={form.excerpt || ''} onChange={(event) => setForm({ ...form, excerpt: event.target.value })} className="rounded-lg border p-3" />
              <textarea placeholder="Content" value={form.content || ''} onChange={(event) => setForm({ ...form, content: event.target.value })} className="min-h-28 rounded-lg border p-3" />
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
