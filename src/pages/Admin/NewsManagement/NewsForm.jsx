import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  adminFetchNewsById,
  adminCreateNews,
  adminUpdateNews,
} from "../../../services/newService";

// NOTE: These are assumed to already exist in your project (used by the Destinations/
// Packages/Blogs admin modules). Swap the paths if your existing services differ.
import { destinationService } from "../../../services/destinationService";
import { packageService } from "../../../services/packageService";
import { blogService } from "../../../services/blogService";

const CATEGORIES = [
  { value: "visa-update", label: "Visa Update" },
  { value: "airline-news", label: "Airline News" },
  { value: "country-news", label: "Country News" },
  { value: "travel-advisory", label: "Travel Advisory" },
  { value: "general", label: "General" },
];

const emptyForm = {
  title: "",
  slug: "",
  summary: "",
  content: "",
  featuredImage: "",
  category: "general",
  country: "",
  tags: "",
  sourceName: "",
  sourceUrl: "",
  publishedAt: "",
  author: "",
  status: "draft",
  featured: false,
  seoTitle: "",
  seoDescription: "",
  keywords: "",
  relatedDestinations: [],
  relatedPackages: [],
  relatedBlogs: [],
};

const NewsForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(emptyForm);
  const [destinations, setDestinations] = useState([]);
  const [packages, setPackages] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Load option lists for interlinking selects.
    const loadOptions = async () => {
      try {
        const [destinationsRes, packagesRes, blogsRes] = await Promise.all([
          destinationService.list?.().catch(() => []),
          packageService.list?.().catch(() => []),
          blogService.getBlogs?.({ limit: 100 }).catch(() => ({ blogs: [] })),
        ])

        setDestinations(Array.isArray(destinationsRes) ? destinationsRes : destinationsRes?.data || [])
        setPackages(Array.isArray(packagesRes) ? packagesRes : packagesRes?.data || [])
        const blogItems = Array.isArray(blogsRes) ? blogsRes : blogsRes?.blogs || blogsRes?.data || []
        setBlogs(blogItems)
      } catch {
        setDestinations([])
        setPackages([])
        setBlogs([])
      }
    }

    loadOptions()
  }, []);

  useEffect(() => {
    if (!isEdit) return;
    adminFetchNewsById(id)
      .then((res) => {
        const n = res?.data || res;
        setForm({
          ...emptyForm,
          ...n,
          tags: (n.tags || []).join(", "),
          keywords: (n.keywords || []).join(", "),
          publishedAt: n.publishedAt ? n.publishedAt.substring(0, 10) : "",
          relatedDestinations: (n.relatedDestinations || []).map((d) => d._id || d),
          relatedPackages: (n.relatedPackages || []).map((p) => p._id || p),
          relatedBlogs: (n.relatedBlogs || []).map((b) => b._id || b),
        });
      })
      .catch((err) => {
        setError(err?.response?.data?.message || "Failed to load news article.");
      });
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleMultiSelect = (name, e) => {
    const values = Array.from(e.target.selectedOptions).map((o) => o.value);
    setForm((prev) => ({ ...prev, [name]: values }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      keywords: form.keywords.split(",").map((k) => k.trim()).filter(Boolean),
      publishedAt: form.publishedAt || undefined,
    };

    try {
      if (isEdit) {
        await adminUpdateNews(id, payload);
      } else {
        await adminCreateNews(payload);
      }
      navigate("/admin/news");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to save news article.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/40 sm:p-8">
        <div className="mb-8 flex flex-col gap-3 border-b border-slate-200 pb-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary-600">News Management</p>
            <h1 className="mt-3 text-3xl font-bold text-slate-950">{isEdit ? "Edit News Article" : "Add News Article"}</h1>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-slate-600">
            Create or update news articles with SEO metadata, featured media, and smart interlinking for faster publishing.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-3xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700 shadow-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
            <div className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-semibold text-slate-800">
                  Title *
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                  />
                </label>

                <label className="space-y-2 text-sm font-semibold text-slate-800">
                  Slug (optional)
                  <input
                    name="slug"
                    value={form.slug}
                    onChange={handleChange}
                    placeholder="e.g. uae-visa-rules-2026"
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                  />
                </label>
              </div>

              <label className="space-y-2 text-sm font-semibold text-slate-800">
                Summary *
                <textarea
                  name="summary"
                  value={form.summary}
                  onChange={handleChange}
                  maxLength={400}
                  rows={4}
                  required
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
              </label>

              <label className="space-y-2 text-sm font-semibold text-slate-800">
                Content *
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  rows={12}
                  required
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
              </label>
            </div>

            <div className="space-y-6">
              <label className="space-y-2 text-sm font-semibold text-slate-800">
                Featured Image URL *
                <input
                  name="featuredImage"
                  value={form.featuredImage}
                  onChange={handleChange}
                  required
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
              </label>

              <div className="grid gap-6 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-semibold text-slate-800">
                  Category
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2 text-sm font-semibold text-slate-800">
                  Country
                  <input
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    placeholder="e.g. UAE, Thailand"
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                  />
                </label>
              </div>

              <label className="space-y-2 text-sm font-semibold text-slate-800">
                Tags (comma separated)
                <input
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
              </label>

              <label className="space-y-2 text-sm font-semibold text-slate-800">
                Author
                <input
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
              </label>

              <div className="grid gap-6 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-semibold text-slate-800">
                  Published Date
                  <input
                    type="date"
                    name="publishedAt"
                    value={form.publishedAt}
                    onChange={handleChange}
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                  />
                </label>

                <label className="space-y-2 text-sm font-semibold text-slate-800">
                  Source Name
                  <input
                    name="sourceName"
                    value={form.sourceName}
                    onChange={handleChange}
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                  />
                </label>
              </div>

              <label className="space-y-2 text-sm font-semibold text-slate-800">
                Source URL
                <input
                  name="sourceUrl"
                  value={form.sourceUrl}
                  onChange={handleChange}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
              </label>

              <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <label className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                  <input
                    type="checkbox"
                    name="status"
                    checked={form.status === "published"}
                    onChange={(e) => setForm((p) => ({ ...p, status: e.target.checked ? "published" : "draft" }))}
                    className="h-5 w-5 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                  />
                  Publish immediately
                </label>

                <label className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={form.featured}
                    onChange={handleChange}
                    className="h-5 w-5 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                  />
                  Mark as Featured
                </label>
              </div>
            </div>
          </div>

          <div className="grid gap-6 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">SEO</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Add meta title, description, and keywords for better search visibility.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-semibold text-slate-800">
                SEO Title
                <input
                  name="seoTitle"
                  value={form.seoTitle}
                  onChange={handleChange}
                  maxLength={70}
                  className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
              </label>

              <label className="space-y-2 text-sm font-semibold text-slate-800">
                SEO Description
                <textarea
                  name="seoDescription"
                  value={form.seoDescription}
                  onChange={handleChange}
                  maxLength={170}
                  rows={3}
                  className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
              </label>
            </div>

            <label className="space-y-2 text-sm font-semibold text-slate-800">
              Keywords (comma separated)
              <input
                name="keywords"
                value={form.keywords}
                onChange={handleChange}
                className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
              />
            </label>
          </div>

          <div className="grid gap-6 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Interlinking</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Choose related destinations, packages, and blogs that should appear alongside this article.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <label className="space-y-2 text-sm font-semibold text-slate-800">
                Related Destinations
                <select
                  multiple
                  value={form.relatedDestinations}
                  onChange={(e) => handleMultiSelect("relatedDestinations", e)}
                  className="h-40 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                >
                  {destinations.map((d) => (
                    <option key={d._id} value={d._id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2 text-sm font-semibold text-slate-800">
                Related Packages
                <select
                  multiple
                  value={form.relatedPackages}
                  onChange={(e) => handleMultiSelect("relatedPackages", e)}
                  className="h-40 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                >
                  {packages.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2 text-sm font-semibold text-slate-800">
                Related Blogs
                <select
                  multiple
                  value={form.relatedBlogs}
                  onChange={(e) => handleMultiSelect("relatedBlogs", e)}
                  className="h-40 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                >
                  {blogs.map((b) => (
                    <option key={b._id} value={b._id}>
                      {b.title}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-slate-600">
              {isEdit ? "Update the news article and publish or save it as draft." : "Create a new news article for the public news feed."}
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate("/admin/news")}
                className="rounded-3xl border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="rounded-3xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/20 transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {saving ? "Saving..." : isEdit ? "Update News" : "Create News"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsForm;
