import React from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../lib/products";

export default function PackagesIndexPage() {
  const products = getProducts();

  return (
    <main className="mx-auto max-w-6xl space-y-10 py-16 px-4">
      <section className="text-center space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-500">DeepNet Packages</p>
        <h1 className="text-4xl font-bold text-slate-900">Accelerators for every maturity level</h1>
        <p className="text-lg text-slate-600">
          Each offer below maps to a documented playbook, detailed content, and a tailored ramp-up plan.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        {products.map((product) => (
          <article key={product.slug} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">{product.tier}</p>
                <h2 className="text-2xl font-semibold text-slate-900">{product.title}</h2>
              </div>
              <p className="text-xl font-semibold text-slate-900">{product.price}</p>
            </div>
            <p className="mt-4 text-sm text-slate-600">{product.summary}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span aria-hidden="true">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to={`/packages/${product.slug}`} className="btn-primary text-sm">
                Explore {product.title}
              </Link>
              <Link
                to={{ pathname: "/contact", search: `?offer=${product.slug}` }}
                state={{ offerName: product.title }}
                className="text-sm font-semibold text-sky-600"
              >
                Talk to sales →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
