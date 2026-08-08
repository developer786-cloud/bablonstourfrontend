import React from "react";
import { Link } from "react-router-dom";

const CATEGORY_LABELS = {
  "visa-update": "Visa Update",
  "airline-news": "Airline News",
  "country-news": "Country News",
  "travel-advisory": "Travel Advisory",
  general: "News",
};

const NewsCard = ({ item }) => {
  const publishedDate = item.publishedAt
    ? new Date(item.publishedAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <Link
      to={`/news/${item.slug}`}
      className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg"
    >
      <div className="relative overflow-hidden bg-slate-100">
        <img
          src={item.featuredImage}
          alt={item.title}
          loading="lazy"
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {item.featured && (
          <span className="absolute left-4 top-4 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 shadow-sm">
            Featured
          </span>
        )}
      </div>
      <div className="space-y-3 p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.24em] text-primary-700">
          <span className="rounded-full bg-primary-50 px-3 py-1 font-semibold">
            {CATEGORY_LABELS[item.category] || item.category || "News"}
          </span>
          {item.country && <span className="text-slate-400">{item.country}</span>}
        </div>
        <h3 className="text-xl font-semibold leading-tight text-slate-950 transition group-hover:text-primary-700">
          {item.title}
        </h3>
        <p className="line-clamp-3 text-sm leading-6 text-slate-600">{item.summary}</p>
        {publishedDate && (
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>{publishedDate}</span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
              Read more
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default NewsCard;
