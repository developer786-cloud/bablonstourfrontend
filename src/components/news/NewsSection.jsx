import React from "react";
import { Link } from "react-router-dom";
import NewsCard from "./NewsCard";

const NewsSection = ({ id, title, items = [], viewAllUrl, loading, emptyText = "No news available yet." }) => {
  return (
    <section id={id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">{title}</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950">Latest from {title.toLowerCase()}</h2>
        </div>
        {viewAllUrl && (
          <Link
            to={viewAllUrl}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
          >
            View All
          </Link>
        )}
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="animate-pulse rounded-[1.75rem] border border-slate-200 bg-slate-100 p-6" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-[1.75rem] border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-sm text-slate-500">
          {emptyText}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <NewsCard key={item._id || item.slug} item={item} />
          ))}
        </div>
      )}
    </section>
  );
};

export default NewsSection;
