import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NewsSEO from "../../components/news/NewsSEO";
import NewsSection from "../../components/news/NewsSection";
import { ROUTES } from "../../constants/routes";
import {
  fetchFeaturedNews,
  fetchLatestNews,
  fetchNewsByCategory,
} from "../../services/newService";
import newsHeroBg from "../../assets/images/News Page BG Image.png";

const topicPills = [
  { label: "Featured", id: "featured" },
  { label: "Latest", id: "latest" },
  { label: "Visa Updates", id: "visa-updates" },
  { label: "Airline News", id: "airline-news" },
  { label: "Country News", id: "country-news" },
];

const NewsPage = () => {
  const [featured, setFeatured] = useState([]);
  const [latest, setLatest] = useState([]);
  const [visaUpdates, setVisaUpdates] = useState([]);
  const [airlineNews, setAirlineNews] = useState([]);
  const [countryNews, setCountryNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadAll = async () => {
      try {
        const [featuredRes, latestRes, visaRes, airlineRes, countryRes] = await Promise.all([
          fetchFeaturedNews(6),
          fetchLatestNews(8),
          fetchNewsByCategory("visa-update", 6),
          fetchNewsByCategory("airline-news", 6),
          fetchNewsByCategory("country-news", 6),
        ]);

        if (!mounted) return;
        setFeatured(Array.isArray(featuredRes) ? featuredRes : featuredRes?.data || []);
        setLatest(Array.isArray(latestRes) ? latestRes : latestRes?.data || []);
        setVisaUpdates(Array.isArray(visaRes) ? visaRes : visaRes?.data || []);
        setAirlineNews(Array.isArray(airlineRes) ? airlineRes : airlineRes?.data || []);
        setCountryNews(Array.isArray(countryRes) ? countryRes : countryRes?.data || []);
      } catch (err) {
        console.error("Failed to load news sections:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadAll();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <NewsSEO
        title="Travel News | Visa Updates, Airline Alerts & Country Advisories"
        description="Stay updated with the latest travel news, visa updates, airline announcements, and country travel advisories for international travelers."
        url="/news"
      />

      <main className="bg-slate-50 text-slate-950">
        <section
          className="relative overflow-hidden bg-slate-950 text-white"
          style={{
            backgroundImage: `url(${newsHeroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-slate-950/75" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_36%)] mix-blend-screen" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-white/90 backdrop-blur-sm">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_20px_rgba(110,231,183,0.45)]"></span>
                  Travel news you can trust
                </div>

                <div className="space-y-4">
                  <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                    Travel News
                  </h1>
                  <p className="max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
                    Read the latest travel advisories, flight announcements, and destination updates curated for international travelers. One clean hub for the news that matters before you book.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <Link
                    to={ROUTES.PACKAGES}
                    className="inline-flex items-center justify-center rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-primary-700"
                  >
                    Explore Travel Plans
                  </Link>
                  <Link
                    to={ROUTES.CONTACT}
                    className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white/15"
                  >
                    Ask Travel Expert
                  </Link>
                  <span className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
                    Updated daily
                  </span>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.35)] backdrop-blur-xl">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">News categories</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {topicPills.map((topic) => (
                    <a
                      key={topic.id}
                      href={`#${topic.id}`}
                      className="rounded-3xl border border-white/10 bg-white/10 px-5 py-4 text-left text-sm font-semibold text-white transition hover:border-primary-300 hover:bg-white/15"
                    >
                      {topic.label}
                    </a>
                  ))}
                </div>
                <div className="mt-8 rounded-[1.75rem] bg-slate-950/70 p-6 text-sm text-slate-300 ring-1 ring-white/10">
                  <p className="font-semibold text-white">What’s inside</p>
                  <ul className="mt-4 space-y-3 text-sm leading-6">
                    <li>• Visa updates, travel alerts and policy changes</li>
                    <li>• Airline news, baggage updates and schedule changes</li>
                    <li>• Country travel advisories and destination insights</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="space-y-10">
            <NewsSection id="featured" title="Featured News" items={featured} loading={loading} />
            <NewsSection id="latest" title="Latest News" items={latest} loading={loading} />
            <NewsSection
              id="visa-updates"
              title="Visa Updates"
              items={visaUpdates}
              loading={loading}
              viewAllUrl="/news?category=visa-update"
            />
            <NewsSection
              id="airline-news"
              title="Airline News"
              items={airlineNews}
              loading={loading}
              viewAllUrl="/news?category=airline-news"
            />
            <NewsSection
              id="country-news"
              title="Country News"
              items={countryNews}
              loading={loading}
              viewAllUrl="/news?category=country-news"
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default NewsPage;
