import React from "react";

const reasons = [
  {
    title: "Melbourne Local Expertise",
    text: "We understand regional challenges & regulations."
  },
  {
    title: "SMB Focused",
    text: "Services tailored to small‑to‑mid businesses – not enterprise."
  },
  {
    title: "Practical & Actionable",
    text: "Clear reports, realistic recommendations you can implement."
  },
  {
    title: "Tailored Service",
    text: "We take time to understand your business context."
  },
  {
    title: "Pure Cybersecurity",
    text: "Deep expertise without general IT distractions."
  }
];

export default function WhyChoose() {
  return (
    <section id="why" className="py-20 bg-neutral-90">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-center mb-12">
          Your Trusted Local Security Partner
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {reasons.map(({ title, text }) => (
            <div key={title} className="flex items-start space-x-4">
              <span className="w-2 h-2 mt-2 rounded-full bg-brand-accent-1"></span>
              <div>
                <h4 className="font-semibold text-lg mb-1">{title}</h4>
                <p className="text-sm text-neutral-10/80">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
