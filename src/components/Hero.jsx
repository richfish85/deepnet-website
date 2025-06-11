import React from "react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-brand-dark to-brand-primary text-white">
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-4xl md:text-6xl font-semibold mb-6 leading-tight">
          Protect Your Melbourne Business From Cyber Threats.
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl mb-10">
          DeepNet Solutions provides expert, tailored cybersecurity services for
          small‑to‑mid sized businesses. Get the protection you need without an
          in‑house team.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/contact" className="btn-primary">Free Consultation</a>
          <a href="/#packages" className="btn-secondary">$400 Promo Scan</a>
        </div>
      </div>
    </section>
  );
}
