import React, { useState } from "react";

export default function ToolkitPage() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <section className="min-h-screen py-20 px-6 bg-white">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4">
          🧰 Download Your Free Cybersecurity HealthCheck Toolkit
        </h1>
        <p className="mb-6 text-gray-700">
          This 1-page interactive PDF helps you self-audit your device, network,
          and personal security hygiene in just 15 minutes — ideal for individuals,
          remote workers, and small businesses.
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
              required
              placeholder="Your Name"
              className="w-full border p-2 rounded"
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Email Address"
              className="w-full border p-2 rounded"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Get the PDF
            </button>
          </form>
        ) : (
          <div className="mt-6 p-4 bg-green-100 text-green-700 rounded">
            ✅ Thank you! Click below to download your toolkit.
            <div className="mt-4">
              <a
                href="/files/DeepNet_HealthCheck_Interactive.pdf"
                download
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                📥 Download PDF
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
