const productFiles = import.meta.glob("../content/products/**/*.mdx", {
  eager: true,
  import: "default",
  query: "?raw",
});

const products = Object.entries(productFiles).map(([path, raw]) => parseProduct(path, raw));
const productsMap = products.reduce((acc, prod) => {
  acc[prod.slug] = prod;
  return acc;
}, {});

function parseProduct(path, raw) {
  const { meta, body } = extractFrontMatter(raw);
  const slug = meta.slug || deriveSlugFromPath(path);

  return {
    slug,
    title: meta.title || slug,
    price: meta.price || "",
    tier: meta.tier || "",
    summary: meta.summary || "",
    features: meta.features || [],
    heroCta: meta.cta || "",
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
    meta[key] = parseValue(rawValue);
  });

  return { meta, body };
}

function parseValue(value) {
  if (!value) return value;
  const clean = value.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
  if (clean.startsWith("[") && clean.endsWith("]")) {
    return clean
      .slice(1, -1)
      .split(",")
      .map((entry) => entry.trim().replace(/^"(.*)"$/, "$1"));
  }
  return clean;
}

function deriveSlugFromPath(path) {
  return path.split("/").pop().replace(/\.mdx$/, "");
}

export function getProducts() {
  return products.slice();
}

export function getProductBySlug(slug) {
  return productsMap[slug];
}
