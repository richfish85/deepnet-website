import React from "react";

export default function DocToc({ items = [] }) {
  if (!items.length) return null;

  return (
    <nav className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Contents</p>
      <ul className="mt-4 space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.slug}>
            <a href={`#${item.slug}`} className="text-slate-600 hover:text-slate-900">
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
