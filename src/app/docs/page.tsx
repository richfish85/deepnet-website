// app/docs/page.tsx 
import React from "react";
import DocsCategoryCard from "../../components/DocsCategoryCard";
import DocsListLink from "../../components/DocsListLink"; // Use the new link component
import { getDocsGroupedByCategory } from "../../lib/docs";
import { Shield, Layers, Terminal, Box, BookOpen } from "lucide-react"; 

// Helper to assign icons based on category title
const getIconForCategory = (title) => {
  const t = title.toLowerCase();
  if (t.includes("foundations")) return Layers;
  if (t.includes("blue")) return Shield;
  if (t.includes("red")) return Terminal; // or Crosshair
  if (t.includes("lab")) return Box;
  return BookOpen;
};

export default function DocsLandingPage() {
  const categoryGroups = getDocsGroupedByCategory();

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        
        {/* Header Section: Rewritten for SMB Owners */}
        <section className="mx-auto mb-16 max-w-2xl text-center">
          <div className="inline-flex items-center rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700 mb-4">
            DeepNet Knowledge Base
          </div>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Documentation & <span className="text-sky-600">Resources</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Understand the technology protecting your business. From foundational security concepts to advanced threat detection, we've simplified the complex.
          </p>
        </section>

        {/* Grid Layout */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:gap-10">
          {categoryGroups.map((group) => {
            const Icon = getIconForCategory(group.title);
            
            return (
              <DocsCategoryCard 
                key={group.category} 
                title={group.title} 
                description={group.description}
                icon={Icon}
              >
                {group.docs.map((doc) => (
                  <DocsListLink key={doc.route} to={`/docs/${doc.route}`}>
                    {doc.title}
                  </DocsListLink>
                ))}
              </DocsCategoryCard>
            );
          })}
        </div>

        {/* Support Footer */}
        <div className="mt-20 border-t border-slate-200 pt-10 text-center">
          <p className="text-slate-500">
            Can't find what you're looking for?{" "}
            <a href="/contact" className="font-semibold text-sky-600 hover:underline">
              Contact our security team
            </a>
          </p>
        </div>

      </div>
    </main>
  );
}