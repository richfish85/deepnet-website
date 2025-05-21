import React, { useEffect, useState } from "react";
import useCarousel from "../hooks/useCarousel";
import dayjs from "dayjs";

export default function NewsHero() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [index] = useCarousel(articles.length);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchNews() {
      try {
        const key = import.meta.env.VITE_NEWSAPI_KEY;
        const url =
          `https://newsapi.org/v2/top-headlines?` +
          new URLSearchParams({
            q: "cybersecurity OR ransomware OR data breach",
            language: "en",
            pageSize: 5,
            sortBy: "publishedAt",
            apiKey: key
          });
        const res = await fetch(url, { signal: controller.signal });
        const json = await res.json();
        if (json.status !== "ok") throw new Error(json.message || "News error");
        setArticles(json.articles);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
    return () => controller.abort();
  }, []);

  // Fallback headlines if API fails / key not provided
  const fallback = [
    {
      title: "Ransomware gang hits Victorian manufacturer, leaking 200 GB",
      publishedAt: "2025-04-21T02:00:00Z",
      source: { name: "TheAge" }
    },
    {
      title: "Australian SMEs warned: 63 % spike in phishing over Easter weekend",
      publishedAt: "2025-04-20T23:00:00Z",
      source: { name: "ITNews" }
    }
  ];

  const slides = !loading && !error && articles.length ? articles : fallback;
  const slide = slides[index];

  return (
    <section className="relative bg-gradient-to-br from-brand-dark to-brand-primary text-white md:h-[400px] flex items-center justify-center overflow-hidden">
      {/* Overlay pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-6 text-center animate-fade">
        <p className="uppercase tracking-wider text-sm text-brand-accent-2 mb-3">
          Latest Cyber‑Crime News
        </p>
        <h1 className="font-display text-3xl md:text-5xl font-semibold mb-4">
          {slide.title}
        </h1>
        <p className="text-sm opacity-80 mb-8">
          {dayjs(slide.publishedAt).format("D MMM YYYY")} · {slide.source.name}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contact" className="btn-primary">Free Consultation</a>
          <a href="#packages" className="btn-secondary">$400 Promo Scan</a>
        </div>
      </div>

      {/* Simple dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === index ? "bg-brand-accent-1" : "bg-white/30"
            }`}
          ></span>
        ))}
      </div>
    </section>
  );
}