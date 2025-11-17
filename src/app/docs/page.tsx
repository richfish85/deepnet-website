import React from "react";
import DocsCategoryCard from "../../components/DocsCategoryCard.jsx";
import DocsTagPill from "../../components/DocsTagPill.jsx";
import { getDocsGroupedByCategory } from "../../lib/docs";

export default function DocsLandingPage() {
  const categoryGroups = getDocsGroupedByCategory();

  return (
    <main className="mx-auto max-w-5xl space-y-10 py-16 px-4">
      <section className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-500">DeepNet</p>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Documentation</h1>
        <p className="text-lg text-gray-600">
          Explore the CyberGuard knowledge base. Every doc is authored in MDX with rich frontmatter,
          making it easy to power contextual navigation, search, and access controls.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        {categoryGroups.map((group) => (
          <DocsCategoryCard key={group.category} title={group.title} description={group.description}>
            {group.docs.map((doc) => (
              <DocsTagPill key={doc.route} to={`/docs/${doc.route}`}>
                {doc.title}
              </DocsTagPill>
            ))}
          </DocsCategoryCard>
        ))}
      </div>
    </main>
  );
}
