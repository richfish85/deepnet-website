import React from "react";

const tiers = [
  {
    name: "Front Door™ Scan",
    price: "$400",
    description: "A fast, affordable diagnostic for small businesses who want clarity on external risks before committing to bigger solutions.",
    features: [
      "External vulnerability scan",
      "Website & internet-facing asset sweep",
      "Simple, actionable report",
      "Prioritised quick-fix recommendations",
      "Perfect entry-point for new clients"
    ],
    cta: "Get Front Door™ Scan"
  },

  {
    name: "CyberGuard Core™",
    price: "$1,450",
    description: "A comprehensive internal and external security assessment for businesses ready to understand their real risk posture.",
    features: [
      "Internal & external vulnerability assessment",
      "Lightweight penetration test",
      "Security posture evaluation",
      "Full remediation roadmap",
      "Compliance alignment (Privacy Act, Essential Eight)",
      "Ideal foundation for ongoing security"
    ],
    cta: "Book CyberGuard Core™"
  },

  {
    name: "CyberShield 360™",
    price: "$3,200/mo",
    description: "Full-spectrum managed security: continuous monitoring, regular testing, and priority response. Your outsourced security team.",
    features: [
      "24/7 monitoring & alerting (MDR-style)",
      "Monthly penetration testing",
      "Hardening & patch guidance",
      "Incident support & containment",
      "(Quarterly optional) executive reports",
      "Perfect for businesses without internal security staff"
    ],
    cta: "Start CyberShield 360™"
  },

  {
    name: "DeepNet Infrastructure™",
    price: "Custom Quote",
    description: "A business continuity and resilience program covering backups, disaster recovery, secure infrastructure design, and post-incident rebuilds.",
    features: [
      "Business continuity & disaster recovery planning",
      "Automated & verified backups",
      "Secure infrastructure redesign",
      "Post-incident rebuild & hardening",
      "Cloud / on-prem / hybrid support",
      "High-availability and resilience engineering"
    ],
    cta: "Request Infrastructure Plan"
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
              <a href="/contact" className="btn-primary self-start text-sm">
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}