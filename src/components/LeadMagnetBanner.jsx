import React from "react";

export default function LeadMagnetBanner() {
  return (
    <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Cheat Sheet</p>
      <h3 className="mt-2 text-2xl font-semibold text-indigo-900">CyberGuard Quick Reference</h3>
      <p className="mt-3 text-sm text-indigo-800">
        Get our printable checklist for hardening Windows, Linux, and AD in under an hour.
      </p>
      <form className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          placeholder="you@company.com"
          className="flex-1 rounded-md border border-indigo-200 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none"
        />
        <button type="submit" className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">
          Send it to me
        </button>
      </form>
    </div>
  );
}
