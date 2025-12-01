// app/docs/[...slug]/page.tsx (or your route file)
import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import DocLayout from "../../../components/DocLayout.jsx";
import CtaPanel from "../../../components/CtaPanel.jsx";
import { getDocByRoute, getAllDocs } from "../../../lib/docs";
import { parseMarkdownBlocks, tokenizeInline } from "../../../lib/mdx-runtime";
import { Clock, Tag, Box, ChevronRight, Info, ArrowLeft } from "lucide-react";

export default function DocsDynamicPage() {
  const { "*": catchAll } = useParams();
  const slugSegments = catchAll ? catchAll.split("/").filter(Boolean) : [];
  const doc = getDocByRoute(slugSegments);
  const missingSlug = slugSegments.join("/") || "(root)";

  const allDocs = getAllDocs();
  const docIndex = allDocs.findIndex((entry) => entry.route === doc?.route);
  const previous = docIndex > 0 ? allDocs[docIndex - 1] : null;
  const next = docIndex >= 0 && docIndex < allDocs.length - 1 ? allDocs[docIndex + 1] : null;

  // Memoize blocks parsing
  const blocks = useMemo(() => (doc ? parseMarkdownBlocks(doc.body) : []), [doc]);
  
  // Memoize TOC generation
  const tocItems = useMemo(
    () =>
      blocks
        .filter((block) => block.type === "heading" && block.level <= 3)
        .map((block) => ({
          slug: slugify(block.content),
          title: block.content,
        })),
    [blocks],
  );

  if (!doc) {
    return (
      <main className="mx-auto max-w-3xl space-y-6 py-16 px-4">
        <BackToDocs />
        <section className="rounded-xl border border-red-100 bg-red-50 p-8 text-center text-red-800">
          <Info className="mx-auto mb-4 h-10 w-10 text-red-400" />
          <h1 className="text-2xl font-bold">Document not found</h1>
          <p className="text-sm text-red-600 mt-2">
            We couldn&apos;t find any content for <code>{missingSlug}</code>.
          </p>
          <div className="mt-6">
            <Link to="/docs" className="font-semibold underline">Return to Knowledge Base</Link>
          </div>
        </section>
      </main>
    );
  }

  const productSlug = doc.product || "cyberguard-core";
  const productName = productLabel(productSlug);

  return (
    <DocLayout doc={doc} tocItems={tocItems} nextDoc={next} prevDoc={previous}>
      
      {/* 1. Breadcrumb Nav */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link to="/docs" className="hover:text-sky-600 hover:underline transition-colors">Docs</Link>
        <ChevronRight size={14} />
        <span className="font-medium text-gray-900">{doc.category ? capitalize(doc.category) : "General"}</span>
      </nav>

      {/* 2. The "Magazine" Header */}
      <header className="relative mb-12 overflow-hidden rounded-2xl bg-gradient-to-br from-sky-50 to-white border border-sky-100 p-8 sm:p-10">
        <div className="relative z-10">
          {/* Metadata Row */}
          <div className="mb-6 flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-wide">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-sky-700 shadow-sm ring-1 ring-gray-200">
              <Tag size={12} />
              {doc.tier} Tier
            </span>
            {doc.duration && (
              <span className="inline-flex items-center gap-1.5 text-gray-500">
                <Clock size={14} />
                {doc.duration} read
              </span>
            )}
          </div>

          <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            {doc.title}
          </h1>
          
          <div className="flex items-center gap-2 text-sm text-slate-600">
             <Box size={16} className="text-sky-500"/>
             <span>Applies to: <span className="font-medium text-slate-900">{productName}</span></span>
          </div>
        </div>
        
        {/* Decorative Background Blob */}
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-sky-100 opacity-50 blur-3xl" />
      </header>

      {/* 3. Main Content Area with Enhanced Typography */}
      <section className="prose prose-lg prose-slate max-w-none 
        prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 
        prose-a:text-sky-600 prose-a:no-underline prose-a:transition hover:prose-a:text-sky-700 hover:prose-a:underline
        prose-strong:text-slate-900 prose-strong:font-bold
        prose-blockquote:not-italic prose-blockquote:border-l-4 prose-blockquote:border-sky-500 prose-blockquote:bg-sky-50/50 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg
        ">
        {blocks.map((block, index) => (
          <MarkdownBlock key={`${block.type}-${index}`} block={block} />
        ))}
      </section>

      {/* 4. Footer CTA */}
      <div className="mt-16 pt-8 border-t border-gray-100">
        <CtaPanel
          title="Ready to implement this?"
          description={`Turn this concept into a security policy with ${productName}.`}
          cta={`View ${productName} Options`}
          href={`/packages/${productSlug}`}
        />
      </div>
    </DocLayout>
  );
}

function BackToDocs() {
  return (
    <Link to="/docs" className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-sky-600">
      <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
      Back to Knowledge Base
    </Link>
  );
}

/**
 * ENHANCED RENDERER
 * This makes the content look less like a text file and more like a webpage.
 */
function MarkdownBlock({ block }) {
  switch (block.type) {
    case "heading": {
      // Levels 1-6
      const HeadingTag = `h${Math.min(block.level, 6)}`;
      return (
        <HeadingTag id={slugify(block.content)} className="scroll-mt-24 group relative">
           {/* Optional: Add a visual anchor indicator on hover if you like */}
          <InlineTokens text={block.content} />
        </HeadingTag>
      );
    }
    case "paragraph":
      return (
        <p>
          <InlineTokens text={block.content} />
        </p>
      );
    case "list":
      // Styling lists to look like "Action Items"
      return (
        <ul className="list-none space-y-2 pl-0">
          {block.items.map((item, idx) => (
            <li key={idx} className="relative pl-7">
              <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-sky-500"></span>
              <InlineTokens text={item} />
            </li>
          ))}
        </ul>
      );
    case "quote":
      // Transforms > Quotes into "Key Insight" boxes
      return (
        <blockquote className="shadow-sm">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-600">
            <Info size={14} />
            Key Insight
          </div>
          <div className="text-slate-700">
            <InlineTokens text={block.content} />
          </div>
        </blockquote>
      );
    case "code":
      return (
        <div className="not-prose my-6 overflow-hidden rounded-xl bg-slate-900 shadow-md">
          <div className="flex items-center justify-between bg-slate-800 px-4 py-2">
            <span className="text-xs font-mono text-slate-400">{block.language || "text"}</span>
          </div>
          <pre className="overflow-x-auto p-4 text-sm text-slate-50">
            <code className={block.language ? `language-${block.language}` : undefined}>
              {block.content}
            </code>
          </pre>
        </div>
      );
    default:
      return null;
  }
}

// ... Keep InlineTokens, slugify, productLabel, etc. exactly as they were ...

function InlineTokens({ text }) {
  const tokens = tokenizeInline(text);

  return tokens.map((token, index) => {
    switch (token.type) {
      case "strong":
        return (
          <strong key={index} className="font-bold text-slate-900">
            {token.value}
          </strong>
        );
      case "emphasis":
        return (
          <em key={index} className="italic text-slate-800">
            {token.value}
          </em>
        );
      case "code":
        return (
          <code key={index} className="rounded bg-sky-50 px-1.5 py-0.5 text-[0.9em] font-medium text-sky-700 ring-1 ring-inset ring-sky-100">
            {token.value}
          </code>
        );
      case "link":
        return (
          <a
            key={index}
            href={token.href}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-sky-600 underline decoration-sky-300 decoration-2 underline-offset-2 transition hover:text-sky-800 hover:decoration-sky-500"
          >
            {token.value}
          </a>
        );
      default:
        return <React.Fragment key={index}>{token.value}</React.Fragment>;
    }
  });
}

function slugify(value = "") {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function productLabel(slug = "") {
  const map = {
    "front-door-scan": "Front Door™ Scan",
    "cyberguard-core": "CyberGuard Core™",
    "cybershield-360": "CyberShield 360™",
    "deepnet-infrastructure": "DeepNet Infrastructure™",
  };
  return map[slug] || "DeepNet services";
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}