import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { blogService } from '../../../services/blogService'
import { buildSrcSet, buildPlaceholder } from '../../../utils/images'

const getImageUrl = (image) => {
  if (!image) return ''
  if (typeof image === 'string') return image
  return image.src || image.url || ''
}

const getBlogImage = (post) =>
  getImageUrl(post?.image) ||
  getImageUrl(post?.coverImage) ||
  getImageUrl(post?.featuredImage) ||
  getImageUrl(post?.heroImage)

const RelatedBlogs = ({ cityName, initialBlogs = null, id }) => {
  const [blogs, setBlogs] = useState(initialBlogs || [])
  const [loading, setLoading] = useState(initialBlogs ? false : true)

  useEffect(() => {
    let mounted = true
    if (initialBlogs) return () => { mounted = false }
    if (!cityName) {
      setBlogs([])
      setLoading(false)
      return
    }

    setLoading(true)
    blogService
      .getBlogs({ tag: cityName })
      .then((data) => {
        if (!mounted) return
        setBlogs((data.blogs || data.items || []).slice(0, 3))
      })
      .catch(() => {
        if (!mounted) return
        setBlogs([])
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [cityName, initialBlogs])

  if (!cityName && !blogs.length) return null
  if (loading) return null
  if (!blogs.length) return null

  return (
    <section id={id} className="section-shell scroll-mt-[calc(var(--header-height-mobile)+1rem)] bg-white lg:scroll-mt-[calc(var(--header-height-desktop)+1rem)]">
      <div className="section-container">
        <p className="section-eyebrow">Related Articles</p>
        <h2 className="section-heading">Read more about {cityName}</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((post, idx) => {
            const image = getBlogImage(post)
            const imageAlt = post.image?.alt || post.coverImage?.alt || post.featuredImage?.alt || post.title
            const placeholder = image ? buildPlaceholder(image) : null
            return (
              <article key={post._id || `${post.slug}-${idx}`} className="overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-card-hover">
                {image ? (
                  <Link to={`/blogs/${post.slug}`} className="block aspect-[16/10] overflow-hidden bg-gray-100" style={{ backgroundImage: `url(${placeholder})` }}>
                    <img
                      src={image}
                      srcSet={buildSrcSet(image)}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      alt={imageAlt}
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </Link>
                ) : null}
                <div className="p-4">
                  <h3 className="text-lg font-semibold">
                    <Link to={`/blogs/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm text-dark-500">{post.excerpt || post.summary || ''}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default RelatedBlogs