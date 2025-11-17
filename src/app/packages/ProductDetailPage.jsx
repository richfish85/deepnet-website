import React from "react";
import { getProductBySlug } from "../../lib/products";
import { parseMarkdownBlocks, tokenizeInline } from "../../lib/mdx-runtime";
import CtaPanel from "../../components/CtaPanel.jsx";

export default function ProductDetailPage({ slug }) {
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <main className="mx-auto max-w-3xl py-16 px-4">
        <h1 className="text-3xl font-bold text-slate-900">Product not found</h1>
        <p className="mt-2 text-slate-600">The requested offer is missing from the content library.</p>
      </main>
    );
  }

  const blocks = parseMarkdownBlocks(product.body);

  return (
    <main className="mx-auto max-w-5xl space-y-10 py-16 px-4">
      <header className="space-y-3 text-center">
        <p className="text-xs uppercase tracking-wide text-slate-500">{product.tier}</p>
        <h1 className="text-4xl font-bold text-slate-900">{product.title}</h1>
        <p className="text-lg text-slate-600">{product.summary}</p>
        <p className="text-2xl font-semibold text-slate-900">{product.price}</p>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">What&apos;s inside</h2>
        <ul className="mt-4 space-y-2 text-slate-700">
          {product.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <span aria-hidden="true">•</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </section>

      <article className="prose prose-slate max-w-none rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        {blocks.map((block, index) => (
          <MarkdownBlock key={`${block.type}-${index}`} block={block} />
        ))}
      </article>

      <CtaPanel
        title="Book a working session"
        description="Bring your environment details and we will co-design the rollout."
        cta={`Discuss ${product.title}`}
        href={`/contact?offer=${product.slug}`}
      />
    </main>
  );
}

function MarkdownBlock({ block }) {
  switch (block.type) {
    case "heading": {
      const HeadingTag = `h${Math.min(block.level, 6)}`;
      return (
        <HeadingTag>
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
    default:
      return null;
  }
}

function InlineTokens({ text }) {
  const tokens = tokenizeInline(text);
  return tokens.map((token, idx) => {
    switch (token.type) {
      case "strong":
        return (
          <strong key={idx} className="font-semibold">
            {token.value}
          </strong>
        );
      case "emphasis":
        return (
          <em key={idx} className="italic">
            {token.value}
          </em>
        );
      case "code":
        return (
          <code key={idx} className="rounded bg-slate-100 px-1 py-0.5 text-sm">
            {token.value}
          </code>
        );
      default:
        return <React.Fragment key={idx}>{token.value}</React.Fragment>;
    }
  });
}
