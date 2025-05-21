import React from "react";

const tiers = [
  {
    name: "Basic Scan",
    price: "$400",
    description: "Automated external scan to uncover common vulnerabilities.",
    features: [
      "Website & internet‑facing assets",
      "Simple, easy‑to‑read report",
      "Quick recommendations"
    ],
    cta: "Get Promo Scan"
  },
  {
    name: "Comprehensive Assessment",
    price: "From $3,000",
    description: "In‑depth internal & external analysis with compliance checks.",
    features: [
      "Vulnerability scanning & penetration test",
      "Compliance mapping (Privacy Act, PCI)",
      "Detailed remediation roadmap"
    ],
    cta: "Request Quote"
  },
  {
    name: "Managed Security",
    price: "From $1,500/mo",
    description: "Continuous monitoring, MDR & regular testing.",
    features: [
      "24/7 security monitoring",
      "Monthly penetration testing",
      "Dedicated incident support"
    ],
    cta: "Free Consultation"
  }
];

export default function Packages() {
  return (
    <section id="packages" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-center mb-12">
          Find the Right Level of Protection
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="bg-neutral-90 p-8 rounded-2xl shadow-card flex flex-col"
            >
              <h3 className="font-display text-2xl font-semibold mb-2 text-brand-primary">
                {tier.name}
              </h3>
              <p className="text-3xl font-semibold mb-4">{tier.price}</p>
              <p className="mb-6 text-neutral-10/80">{tier.description}</p>
              <ul className="flex-1 space-y-2 mb-6 list-disc list-inside text-sm">
                {tier.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a href="#contact" className="btn-primary self-start text-sm">
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}