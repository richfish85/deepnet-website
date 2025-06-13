import React, { useState } from "react";

export default function ToolkitPage() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <section className="min-h-[80vh] bg-white py-20 px-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Free Security HealthCheck Toolkit
      </h1>
      <p className="mb-4 text-center text-gray-700">
        Download a 1-page audit checklist to help you protect your business, devices, and identity — in under 15 minutes.
      </p>

      {!unlocked ? (
        <form
          action="https://formspree.io/f/mblyoebn"
          method="POST"
          onSubmit={() => setUnlocked(true)}
          className="space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button type="submit" className="btn-primary w-full">
            Get the Free Toolkit
          </button>
          <p className="text-xs text-gray-500 mt-2">
            We don’t spam. Unsubscribe any time.
          </p>
        </form>
      ) : (
        <div className="text-center mt-8">
          <p className="mb-4 text-green-700 font-semibold">
            ✅ You're in! Click below to download:
          </p>
          <a
            href="/files/DeepNet_HealthCheck_Interactive.pdf"
            download
            className="btn-primary"
          >
            🧰 Download HealthCheck PDF
          </a>
        </div>
      )}
    </section>
  );
}
