const funnelFiles = import.meta.glob("../content/funnels/**/*.mdx", {
  eager: true,
  import: "default",
  query: "?raw",
});

const funnels = Object.entries(funnelFiles).map(([path, raw]) => parseFunnel(path, raw));
const funnelMap = funnels.reduce((acc, funnel) => {
  acc[funnel.slug] = funnel;
  return acc;
}, {});

function parseFunnel(path, raw) {
  const { meta, body } = extractFrontMatter(raw);
  const slug = meta.slug || deriveSlugFromPath(path);
  return {
    slug,
    title: meta.title || slug,
    docSlug: meta.docSlug || "",
    productSlug: meta.productSlug || "",
    cta: meta.cta || "",
    body,
  };
}

function extractFrontMatter(rawContent) {
  if (!rawContent.startsWith("---")) {
    return { meta: {}, body: rawContent.trim() };
  }
  const closingIndex = rawContent.indexOf("\n---", 3);
  if (closingIndex === -1) {
    return { meta: {}, body: rawContent.trim() };
  }
  const metaBlock = rawContent.slice(3, closingIndex).trim();
  const body = rawContent.slice(closingIndex + 4).trim();
  const meta = {};
  metaBlock.split(/\r?\n/).forEach((line) => {
    if (!line.trim()) return;
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) return;
    const key = line.slice(0, colonIndex).trim();
    const rawValue = line.slice(colonIndex + 1).trim();
    meta[key] = rawValue.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
  });
  return { meta, body };
}

function deriveSlugFromPath(path) {
  return path.split("/").pop().replace(/\.mdx$/, "");
}

export function getFunnels() {
  return funnels.slice();
}

export function getFunnelBySlug(slug) {
  return funnelMap[slug];
}
