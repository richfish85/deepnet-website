// components/DocsCategoryCard.jsx
import React from "react";

export default function DocsCategoryCard({ title, description, icon: Icon, children }) {
  return (
    <section className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-sky-100">
      {/* Card Header */}
      <div className="p-6 pb-4">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
          {Icon && <Icon size={24} strokeWidth={2} />}
        </div>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        {description && <p className="mt-2 text-sm leading-relaxed text-gray-500">{description}</p>}
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gray-100" />

      {/* Links List */}
      <div className="flex-1 bg-gray-50/50 p-4">
        <div className="flex flex-col gap-1">
          {children}
        </div>
      </div>
      
      {/* 'View All' prompt (Optional visual cue) */}
      <div className="bg-gray-50 px-6 pb-4 text-xs font-semibold text-sky-600 opacity-0 transition-opacity group-hover:opacity-100">
        Browse Category &rarr;
      </div>
    </section>
  );
}