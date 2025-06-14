import React, { useEffect, useState } from "react";
import useCarousel from "../hooks/useCarousel";
import dayjs from "dayjs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


export default function NewsHeroRSSAnimated() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [autoIndex] = useCarousel(5, 8000); // 8s auto-rotate
  const [manualIndex, setManualIndex] = useState(null);

  const displayIndex = manualIndex !== null ? manualIndex : autoIndex;

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

  // Auto resume after manual interaction
  useEffect(() => {
    if (manualIndex === null) return;
    const timer = setTimeout(() => setManualIndex(null), 15000); // reset to auto after 15s
    return () => clearTimeout(timer);
  }, [manualIndex]);

  const fallback = [
    { title: "Major Ransomware Surge Hits Australian SMEs", pubDate: "2025-04-25T00:00:00Z", link: "#" },
    { title: "Melbourne Startup Targeted in Phishing Scam Wave", pubDate: "2025-04-24T00:00:00Z", link: "#" }
  ];

  const slides = !loading && articles.length ? articles : fallback;
  const slide = slides[displayIndex % slides.length];

  const handlePrev = () => {
    const current = manualIndex !== null ? manualIndex : autoIndex;
    setManualIndex((current - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    const current = manualIndex !== null ? manualIndex : autoIndex;
    setManualIndex((current + 1) % slides.length);
  };

  return (
    <section className="relative overflow-hidden text-white md:h-[500px] flex flex-col justify-center">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark to-white z-0"></div>

      {/* Particle layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${4 + Math.random() * 6}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></span>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center backdrop-blur-sm bg-black/30 rounded-lg p-6">
        <p className="uppercase tracking-wider text-sm text-brand-accent-2 mb-3">
          Live Cyber News
        </p>
        <h1 className="font-display text-3xl md:text-5xl font-semibold leading-tight mb-4">
          {slide.title}
        </h1>
        <p className="text-sm opacity-80 mt-4">
          {dayjs(slide.pubDate).format("D MMM YYYY")}
        </p>
      </div>

      {/* Arrows */}
      {/* left arrow */}
        <div className="absolute z-20 left-4 top-1/2 -translate-y-1/2">
        <button
            aria-label="Previous headline"
            onClick={handlePrev}
            className="text-white bg-black/40 hover:bg-black/60 rounded-full p-3"
        >
            <FaChevronLeft size={18} />
        </button>
        </div>

        {/* right arrow */}
        <div className="absolute z-20 right-4 top-1/2 -translate-y-1/2">
        <button
            aria-label="Next headline"
            onClick={handleNext}
            className="text-white bg-black/40 hover:bg-black/60 rounded-full p-3"
        >
            <FaChevronRight size={18} />
        </button>
        </div>


      {/* CTAs */}
      <div className="absolute left-1/2 top-[calc(50%+140px)]
            -translate-x-1/2 flex flex-col sm:flex-row gap-4 z-10">
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
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === displayIndex ? "bg-brand-accent-1" : "bg-blue-300"
            }`}
          ></span>
        ))}
      </div>
    </section>
  );
}
