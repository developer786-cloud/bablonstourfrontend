import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaNewspaper, FaCircleCheck, FaBolt } from "react-icons/fa6";
import {
  adminFetchNewsList,
  adminDeleteNews,
  adminToggleStatus,
  adminToggleFeatured,
} from "../../../services/newService";

const CATEGORIES = [
  { value: "", label: "All Categories" },
  { value: "visa-update", label: "Visa Update" },
  { value: "airline-news", label: "Airline News" },
  { value: "country-news", label: "Country News" },
  { value: "travel-advisory", label: "Travel Advisory" },
  { value: "general", label: "General" },
];

const NewsList = () => {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadNews = useCallback(
    async (page = 1) => {
      setLoading(true);
      setError("");
      try {
        const res = await adminFetchNewsList({
          page,
          limit: 10,
          search: search || undefined,
          category: category || undefined,
          status: status || undefined,
        });
        setItems(res?.data || []);
        setPagination(res?.pagination || { page, totalPages: 1, total: 0 });
      } catch (err) {
        setError("Failed to load news articles.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [search, category, status]
  );

  useEffect(() => {
    loadNews(1);
  }, [loadNews]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this news article? This cannot be undone.")) return;
    try {
      await adminDeleteNews(id);
      await loadNews(pagination.page);
    } catch (err) {
      alert("Failed to delete article.");
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await adminToggleStatus(id);
      await loadNews(pagination.page);
    } catch (err) {
      alert("Failed to update status.");
    }
  };

  const featuredCount = items.filter((item) => item.featured).length
  const publishedCount = items.filter((item) => item.status === "published").length
  const draftCount = items.filter((item) => item.status === "draft").length

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-4 rounded-3xl bg-slate-950/95 px-5 py-4 text-white shadow-lg shadow-slate-950/15">
            <span className="flex h-14 w-14 items-center justify-center rounded-3xl bg-primary-600 text-2xl text-white">
              <FaNewspaper />
            </span>
            <div>
              <p className="text-sm uppercase tracking-[0.26em] text-slate-300">News Admin Center</p>
              <h1 className="mt-2 text-3xl font-semibold text-white">Manage News Articles</h1>
              <p className="mt-2 text-sm text-slate-300">
                Review, publish, feature, and update news posts with one streamlined dashboard.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link to="/admin/news/add" className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-700">
              <FaBolt className="h-4 w-4" />
              Add News
            </Link>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
              Total articles: {pagination.total || 0}
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Search</span>
            <input
              type="text"
              placeholder="Search by title, summary, tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Category</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Status</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            >
              <option value="">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </label>
        </div>

        {error && (
          <div className="mt-4 rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <table className="admin-table mt-6">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Country</th>
            <th>Status</th>
            <th>Featured</th>
            <th>Published</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7}>Loading...</td>
            </tr>
          ) : items.length === 0 ? (
            <tr>
              <td colSpan={7}>No news articles found.</td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>{item.country || "-"}</td>
                <td>
                  <button
                    className={`badge badge--${item.status}`}
                    onClick={() => handleToggleStatus(item._id)}
                    title="Click to toggle publish/draft"
                  >
                    {item.status}
                  </button>
                </td>
                <td>
                  <button
                    className={`star-toggle ${item.featured ? "star-toggle--active" : ""}`}
                    onClick={() => handleToggleFeatured(item._id)}
                    title="Click to toggle featured"
                  >
                    {item.featured ? "★" : "☆"}
                  </button>
                </td>
                <td>{item.publishedAt ? new Date(item.publishedAt).toLocaleDateString("en-IN") : "-"}</td>
                <td className="admin-table__actions">
                  <Link to={`/admin/news/edit/${item._id}`}>Edit</Link>
                  <button onClick={() => handleDelete(item._id)} className="text-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="mt-6 grid gap-4 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700 sm:grid-cols-3">
        <div className="space-y-1 rounded-3xl bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Published</p>
          <p className="text-2xl font-semibold text-slate-950">{publishedCount}</p>
        </div>
        <div className="space-y-1 rounded-3xl bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Drafts</p>
          <p className="text-2xl font-semibold text-slate-950">{draftCount}</p>
        </div>
        <div className="space-y-1 rounded-3xl bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Featured</p>
          <p className="text-2xl font-semibold text-slate-950">{featuredCount}</p>
        </div>
      </div>

      <div className="admin-pagination flex flex-wrap items-center justify-between gap-3 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/40">
        <div className="text-sm text-slate-600">
          Page {pagination.page} of {pagination.totalPages || 1} • {pagination.total} total articles
        </div>
        <div className="flex items-center gap-3">
          <button
            disabled={pagination.page <= 1}
            onClick={() => loadNews(pagination.page - 1)}
            className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <button
            disabled={pagination.page >= pagination.totalPages}
            onClick={() => loadNews(pagination.page + 1)}
            className="rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default NewsList;
