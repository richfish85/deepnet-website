import React from "react";
import { Link } from "react-router-dom";

export default function DocNextPrev({ previous, next }) {
  if (!previous && !next) return null;

  return (
    <div className="flex flex-col gap-4 border-t border-slate-100 pt-6 md:flex-row">
      {previous ? (
        <Card label="Previous" doc={previous} />
      ) : (
        <div className="flex-1 rounded-xl border border-dashed border-slate-200 p-4 text-center text-sm text-slate-400">
          No previous doc
        </div>
      )}
      {next ? (
        <Card label="Next" doc={next} align="right" />
      ) : (
        <div className="flex-1 rounded-xl border border-dashed border-slate-200 p-4 text-center text-sm text-slate-400">
          No next doc
        </div>
      )}
    </div>
  );
}

function Card({ label, doc, align = "left" }) {
  return (
    <Link
      to={`/docs/${doc.route}`}
      className={`flex-1 rounded-xl border border-slate-200 bg-white p-4 transition hover:-translate-y-1 hover:shadow-sm ${
        align === "right" ? "text-right" : ""
      }`}
    >
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="text-base font-semibold text-slate-900">{doc.title}</p>
      <p className="text-xs text-slate-500">{doc.category}</p>
    </Link>
  );
}
