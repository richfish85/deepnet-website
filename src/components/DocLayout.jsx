import React from "react";
import DocToc from "./DocToc.jsx";
import DocNextPrev from "./DocNextPrev.jsx";
import LeadMagnetBanner from "./LeadMagnetBanner.jsx";

export default function DocLayout({ doc, tocItems, nextDoc, prevDoc, children }) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 py-16 px-4 lg:flex-row">
      <article className="w-full flex-1 space-y-6">
        {children}
        <DocNextPrev previous={prevDoc} next={nextDoc} />
        <LeadMagnetBanner />
      </article>

      <aside className="w-full max-w-sm space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Doc Info</h2>
          <div className="mt-3 space-y-2 text-sm text-slate-600">
            <p>
              <span className="font-semibold text-slate-900">Category:</span> {doc.category}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Tier:</span> {doc.tier}
            </p>
            {doc.duration && (
              <p>
                <span className="font-semibold text-slate-900">Duration:</span> {doc.duration}
              </p>
            )}
            {doc.level && (
              <p>
                <span className="font-semibold text-slate-900">Level:</span> {doc.level}
              </p>
            )}
          </div>
        </div>
        <DocToc items={tocItems} />
      </aside>
    </div>
  );
}
