import React, { useEffect, useState } from "react";
import useCarousel from "../hooks/useCarousel";
import dayjs from "dayjs";

const backgrounds = Array.from({ length: 20 }, (_, i) => `/assets/hero/hero${i + 1}.png`);

export default function NewsHeroRSS() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentBg, setCurrentBg] = useState(backgrounds[0]);
  const [nextBg, setNextBg] = useState(null);
  const [fade, setFade] = useState(false);

  const [slideIndex] = useCarousel(5, 8000); // slower 8s news rotation

  useEffect(() => {
    async function fetchRSS() {
      try {
        const feeds = [
          "https://api.rss2json.com/v1/api.json?rss_url=https://www.securityweek.com/feed/",
          "https://api.rss2json.com/v1/api.json?rss_url=https://www.darkreading.com/rss.xml",
          "https://api.rss2json.com/v1/api.json?rss_url=https://www.cyberscoop.com/feed/"
        ];
        const fetches = feeds.map((url) => fetch(url).then((res) => res.json()));
        const results = await Promise.all(fetches);

        const news = results
          .flatMap((feed) => feed.items || [])
          .filter((item) => item.title && item.pubDate)
          .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
          .slice(0, 5);

        setArticles(news);
      } catch (err) {
        console.error("RSS fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRSS();
  }, []);

  // Handle background transitions
  useEffect(() => {
    const next = backgrounds[slideIndex % backgrounds.length];
    const img = new Image();
    img.src = next;
    img.onload = () => {
      setNextBg(next);
      setFade(true);
      setTimeout(() => {
        setCurrentBg(next);
        setFade(false);
        setNextBg(null);
      }, 1500); // match transition duration
    };
  }, [slideIndex]);

  const fallback = [
    { title: "Major Ransomware Surge Hits Australian SMEs", pubDate: "2025-04-25T00:00:00Z", link: "#" },
    { title: "Melbourne Startup Targeted in Phishing Scam Wave", pubDate: "2025-04-24T00:00:00Z", link: "#" }
  ];

  const slides = !loading && articles.length ? articles : fallback;
  const slide = slides[slideIndex % slides.length];

  if (loading) {
    return (
      <section className="relative text-white md:h-[500px] flex items-center justify-center overflow-hidden bg-brand-dark animate-pulse">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl px-6 text-center">
          <div className="h-8 w-40 bg-white/20 rounded-md mx-auto mb-6"></div>
          <div className="h-12 w-80 bg-white/30 rounded-md mx-auto mb-4"></div>
          <div className="h-6 w-32 bg-white/20 rounded-md mx-auto mb-8"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative text-white md:h-[500px] flex flex-col justify-center overflow-hidden">
      {/* Background Layers */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-in-out scale-110 animate-zoompan`}
        style={{
          backgroundImage: `url(${currentBg})`,
          zIndex: 1
        }}
      ></div>

      {nextBg && (
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ${fade ? 'opacity-100' : 'opacity-0'} scale-110 animate-zoompan`}
          style={{
            backgroundImage: `url(${nextBg})`,
            zIndex: 2
          }}
        ></div>
      )}

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none z-10"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none z-10"></div>

      {/* Main text */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center mb-10 backdrop-blur-sm bg-black/30 rounded-lg p-6">
        <p className="uppercase tracking-wider text-sm text-brand-accent-2 mb-3">
          Live Cyber News
        </p>
        <h1 className="font-display text-3xl md:text-5xl font-semibold leading-tight">
          {slide.title}
        </h1>
        <p className="text-sm opacity-80 mt-4">
          {dayjs(slide.pubDate).format("D MMM YYYY")}
        </p>
      </div>

      {/* Fixed CTAs */}
      <div className="relative z-20 flex flex-col sm:flex-row gap-4 justify-center mb-6">
        <a
          href={slide.link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          Read Full Story
        </a>
        <a href="#contact" className="btn-primary">
          Free Consultation
        </a>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full ${i === slideIndex ? "bg-brand-accent-1" : "bg-white/30"}`}
          ></span>
        ))}
      </div>

      {/* Zoom + Pan Keyframes */}
      <style>
        {`
          @keyframes zoompan {
            0% {
              transform: scale(1.1) translateX(0px);
            }
            100% {
              transform: scale(1.2) translateX(30px);
            }
          }
        `}
      </style>
    </section>
  );
}
