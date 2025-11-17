import React from "react";
import { Link } from "react-router-dom";

export default function DocsTagPill({ to, children }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-sm text-sky-700 transition hover:bg-sky-100"
    >
      {children}
    </Link>
  );
}
