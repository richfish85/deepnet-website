import React from "react";
import { Link } from "react-router-dom";

export default function HeroAnimated() {
  return (
    <section className="relative overflow-hidden text-white md:h-[500px] flex items-center justify-center">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark to-white z-0"></div>

      {/* Particle layer */}
      <div className="absolute inset-0 z-0">
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
      <div className="relative z-10 text-center max-w-3xl px-6">
        <p className="uppercase tracking-wider text-sm text-brand-accent-2 mb-3">
          Latest Cyber‑Crime News
        </p>
        <h1 className="font-display text-3xl md:text-5xl font-semibold mb-4">
          Protect Your Business From Emerging Threats
        </h1>
        <p className="text-sm opacity-80 mb-8">
          Secure your systems with DeepNet Solutions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={{ pathname: "/contact", search: "?offer=front-door-scan" }} className="btn-primary">
            Free Consultation
          </Link>
          <a href="/#packages" className="btn-secondary">$400 Promo Scan</a>
        </div>
      </div>
    </section>
  );
}
