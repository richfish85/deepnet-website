import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import DocLayout from "../../../components/DocLayout.jsx";
import CtaPanel from "../../../components/CtaPanel.jsx";
import { getDocByRoute, getAllDocs } from "../../../lib/docs";
import { parseMarkdownBlocks, tokenizeInline } from "../../../lib/mdx-runtime";

export default function DocsDynamicPage() {
  const { "*": catchAll } = useParams();
  const slugSegments = catchAll ? catchAll.split("/").filter(Boolean) : [];
  const doc = getDocByRoute(slugSegments);
  const missingSlug = slugSegments.join("/") || "(root)";

  const allDocs = getAllDocs();
  const docIndex = allDocs.findIndex((entry) => entry.route === doc?.route);
  const previous = docIndex > 0 ? allDocs[docIndex - 1] : null;
  const next = docIndex >= 0 && docIndex < allDocs.length - 1 ? allDocs[docIndex + 1] : null;

  const blocks = useMemo(() => (doc ? parseMarkdownBlocks(doc.body) : []), [doc]);
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
        <section className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
          <h1 className="text-2xl font-semibold">Doc not found</h1>
          <p className="text-sm">
            We couldn&apos;t find any MDX entry for <code>{missingSlug}</code>. Double-check the slug or
            return to the docs directory.
          </p>
        </section>
      </main>
    );
  }

  const productSlug = doc.product || "cyberguard-core";
  const productName = productLabel(productSlug);

  return (
    <DocLayout doc={doc} tocItems={tocItems} nextDoc={next} prevDoc={previous}>
      <BackToDocs />

      <header className="space-y-3">
        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-gray-600">
          <span className="rounded-full bg-gray-100 px-3 py-1">
            {doc.category ? doc.category.replace("-", " ") : "general"}
          </span>
          <span className="rounded-full bg-sky-100 px-3 py-1 text-sky-700">{doc.tier} tier</span>
          {doc.level && <span className="rounded-full bg-gray-900 px-3 py-1 text-white">{doc.level}</span>}
        </div>
        <h1 className="text-4xl font-bold text-gray-900">{doc.title}</h1>
        <p className="text-sm text-gray-500">
          Product: {doc.product || "N/A"} • Duration: {doc.duration || "N/A"}
        </p>
      </header>

      <section className="prose prose-slate max-w-none">
        {blocks.map((block, index) => (
          <MarkdownBlock key={`${block.type}-${index}`} block={block} />
        ))}
      </section>

      <CtaPanel
        title="Continue with a guided engagement"
        description="Turn this lesson into action by pairing it with the matching DeepNet offer."
        cta={`Explore ${productName}`}
        href={`/packages/${productSlug}`}
      />
    </DocLayout>
  );
}

function BackToDocs() {
  return (
    <Link to="/docs" className="inline-flex items-center gap-2 text-sm font-medium text-sky-600">
      <span aria-hidden="true">←</span>
      Back to docs
    </Link>
  );
}

function MarkdownBlock({ block }) {
  switch (block.type) {
    case "heading": {
      const HeadingTag = `h${Math.min(block.level, 6)}`;
      return (
        <HeadingTag id={slugify(block.content)} className="scroll-m-16">
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
      return (
        <ul>
          {block.items.map((item, idx) => (
            <li key={idx}>
              <InlineTokens text={item} />
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote>
          <InlineTokens text={block.content} />
        </blockquote>
      );
    case "code":
      return (
        <pre>
          <code className={block.language ? `language-${block.language}` : undefined}>
            {block.content}
          </code>
        </pre>
      );
    default:
      return null;
  }
}

function InlineTokens({ text }) {
  const tokens = tokenizeInline(text);

  return tokens.map((token, index) => {
    switch (token.type) {
      case "strong":
        return (
          <strong key={index} className="font-semibold">
            {token.value}
          </strong>
        );
      case "emphasis":
        return (
          <em key={index} className="italic">
            {token.value}
          </em>
        );
      case "code":
        return (
          <code key={index} className="rounded bg-slate-100 px-1 py-0.5 text-sm">
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
            className="text-sky-600 underline decoration-dotted"
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
