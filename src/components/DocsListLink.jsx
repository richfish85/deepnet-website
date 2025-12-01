// components/DocsListLink.jsx
import React from "react";
import { ChevronRight } from "lucide-react"; // or use a simple SVG arrow

export default function DocsListLink({ to, children }) {
  return (
    <a
      href={to}
      className="group flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-sky-50 hover:text-sky-700 hover:pl-4"
    >
      <span className="truncate">{children}</span>
      <ChevronRight className="h-4 w-4 opacity-0 text-sky-500 transition-opacity group-hover:opacity-100" />
    </a>
  );
}