import React from "react";

export default function CtaPanel({ title, description, cta, href }) {
  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Recommended action</p>
      <h3 className="mt-2 text-2xl font-semibold text-emerald-900">{title}</h3>
      {description && <p className="mt-3 text-sm text-emerald-800">{description}</p>}
      <a href={href} className="mt-4 inline-flex items-center text-sm font-semibold text-emerald-900 underline">
        {cta} →
      </a>
    </div>
  );
}
