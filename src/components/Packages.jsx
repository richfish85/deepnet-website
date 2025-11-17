import React from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../lib/products";

export default function Packages() {
  const tiers = getProducts();

  return (
    <section id="packages" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-center mb-12">
          Find the Right Level of Protection
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <div key={tier.slug} className="bg-neutral-90 p-8 rounded-2xl shadow-card flex flex-col">
              <h3 className="font-display text-2xl font-semibold mb-2 text-brand-primary">{tier.title}</h3>
              <p className="text-3xl font-semibold mb-4">{tier.price}</p>
              <p className="mb-6 text-neutral-10/80">{tier.summary}</p>
              <ul className="flex-1 space-y-2 mb-6 list-disc list-inside text-sm">
                {tier.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <div className="flex flex-col gap-3">
                <Link to={`/packages/${tier.slug}`} className="btn-primary self-start text-sm">
                  Explore {tier.title}
                </Link>
                <Link
                  to={{ pathname: "/contact", search: `?offer=${tier.slug}` }}
                  state={{ offerName: tier.title }}
                  className="text-sm font-semibold text-sky-600"
                >
                  {tier.heroCta || "Talk to us"} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
