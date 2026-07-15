import { useCallback, useEffect, useState } from 'react'
import { blogService } from '../services/blogService'

export const useBlogs = (params = {}) => {
  const [blogs, setBlogs] = useState([])
  const [categories, setCategories] = useState([])
  const [meta, setMeta] = useState({ page: 1, total: 0, totalPages: 1 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadBlogs = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await blogService.getBlogs(params)
      setBlogs(data.blogs || data.items || [])
      setCategories(data.categories || [])
      setMeta({
        page: data.page || 1,
        total: data.total || 0,
        totalPages: data.totalPages || 1,
      })
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load blogs right now.')
      setBlogs([])
      setCategories([])
    } finally {
      setLoading(false)
    }
  }, [JSON.stringify(params)])

  useEffect(() => {
    loadBlogs()
  }, [loadBlogs])

  return { blogs, categories, meta, loading, error, reload: loadBlogs }
}

export const useBlog = (slug) => {
  const [blog, setBlog] = useState(null)
  const [relatedBlogs, setRelatedBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadBlog = async () => {
      if (!slug) return
      setLoading(true)
      setError('')
      try {
        const data = await blogService.getBlogBySlug(slug)
        if (!isMounted) return
        setBlog(data.blog || data.item || null)
        setRelatedBlogs(data.relatedBlogs || [])
      } catch (err) {
        if (!isMounted) return
        setError(err.response?.data?.message || 'Blog not found.')
        setBlog(null)
        setRelatedBlogs([])
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadBlog()

    return () => {
      isMounted = false
    }
  }, [slug])

  return { blog, relatedBlogs, loading, error }
}
