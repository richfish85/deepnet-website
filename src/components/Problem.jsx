import React from "react";

export default function Problem() {
  const items = [
    "No dedicated cybersecurity team",
    "Confusing jargon & unsure where to start",
    "Overwhelming compliance requirements",
    "Concerns around cost of security help",
    "Fear of data breaches or ransomware"
  ];
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-center mb-8">
          Is Cybersecurity Complexity Keeping You Up at Night?
        </h2>
        <ul className="grid md:grid-cols-2 gap-6 text-lg list-disc list-inside">
          {items.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}