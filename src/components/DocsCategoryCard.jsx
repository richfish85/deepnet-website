import React from "react";

export default function DocsCategoryCard({ title, description, children }) {
  return (
    <section className="flex min-h-[260px] flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-wide text-gray-500">Category</p>
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        {description && <p className="text-sm text-gray-600">{description}</p>}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">{children}</div>
    </section>
  );
}
