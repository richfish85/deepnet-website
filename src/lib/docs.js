import docsNavRaw from "../content/meta/docs-nav.yaml?raw";

const docFiles = import.meta.glob("../content/docs/**/*.mdx", {
  eager: true,
  import: "default",
  query: "?raw",
});

const docs = Object.entries(docFiles).map(([filePath, rawContent]) =>
  buildDocRecord(filePath, rawContent),
);

const docMap = docs.reduce((acc, doc) => {
  acc[doc.slug] = doc;
  acc[doc.route] = doc;
  return acc;
}, {});

const navStructure = parseNavYaml(docsNavRaw);

function buildDocRecord(filePath, rawContent) {
  const { meta, body } = extractFrontMatter(rawContent);
  const slug = sanitizeSegment(meta.slug || deriveSlugFromPath(filePath));
  const category = sanitizeSegment(meta.category || deriveCategoryFromPath(filePath));

  return {
    slug,
    route: `${category}/${slug}`,
    title: meta.title || toTitleCase(slug.replace(/-/g, " ")),
    category,
    tier: meta.tier || "free",
    product: meta.product || "",
    duration: meta.duration || "",
    level: meta.level || "",
    body,
    filePath,
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
    meta[key] = stripQuotes(rawValue);
  });

  return { meta, body };
}

function stripQuotes(value) {
  if (!value && value !== "") return value;

  const trimmed = `${value}`.trim();
  const match = trimmed.match(/^\\?(['"])(.*)\\?\1$/);
  if (match) {
    return match[2];
  }
  return trimmed;
}

function sanitizeSegment(value = "") {
  const stripped = stripQuotes(value);
  return stripped.replace(/^\/+|\/+$/g, "").replace(/\\+/g, "").toLowerCase();
}

function deriveSlugFromPath(filePath) {
  const parts = filePath.split("/");
  const fileName = parts[parts.length - 1] || "";
  return fileName.replace(/\.mdx$/, "");
}

function deriveCategoryFromPath(filePath) {
  const match = filePath.match(/docs\/([^/]+)/);
  return match ? match[1] : "general";
}

function toTitleCase(text) {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function parseNavYaml(raw = "") {
  const sections = [];
  let currentSection = null;
  let currentItem = null;

  raw.split(/\r?\n/).forEach((line) => {
    if (!line.trim()) return;
    if (line.trim() === "sections:") return;

    const indent = line.match(/^\s*/)?.[0].length ?? 0;
    const trimmed = line.trim();

    if (indent === 2 && trimmed.startsWith("- id:")) {
      if (currentSection) sections.push(currentSection);
      currentSection = {
        id: stripQuotes(trimmed.replace("- id:", "").trim()),
        title: "",
        description: "",
        items: [],
      };
      currentItem = null;
      return;
    }

    if (!currentSection) return;

    if (indent === 4 && trimmed.startsWith("title:")) {
      currentSection.title = stripQuotes(trimmed.replace("title:", "").trim());
      return;
    }

    if (indent === 4 && trimmed.startsWith("description:")) {
      currentSection.description = stripQuotes(trimmed.replace("description:", "").trim());
      return;
    }

    if (indent === 4 && trimmed.startsWith("items:")) {
      if (!Array.isArray(currentSection.items)) currentSection.items = [];
      currentItem = null;
      return;
    }

    if (indent === 6 && trimmed.startsWith("-")) {
      const [, rest] = trimmed.split("-", 2);
      const item = {};
      if (rest && rest.includes(":")) {
        const [key, value] = rest.split(":");
        item[key.trim()] = stripQuotes(value.trim());
      }
      currentSection.items.push(item);
      currentItem = item;
      return;
    }

    if (indent >= 8 && currentItem) {
      const [key, value] = trimmed.split(":");
      if (key && value !== undefined) {
        currentItem[key.trim()] = stripQuotes(value.trim());
      }
    }
  });

  if (currentSection) sections.push(currentSection);
  return { sections };
}

export function getDocBySlug(slug) {
  return docMap[slug];
}

export function getDocByRoute(routeSegments = []) {
  if (!routeSegments || routeSegments.length === 0) {
    return null;
  }

  const normalizedSegments = routeSegments
    .map((segment) => sanitizeSegment(segment))
    .filter(Boolean);
  const joined = normalizedSegments.join("/");

  return docMap[joined] || docMap[normalizedSegments[normalizedSegments.length - 1]] || null;
}

export function getDocsGroupedByCategory() {
  const grouped = docs.reduce((acc, doc) => {
    if (!acc[doc.category]) acc[doc.category] = [];
    acc[doc.category].push(doc);
    return acc;
  }, {});

  const navSections = navStructure?.sections || [];
  const usedCategories = new Set();
  const orderedGroups = [];

  navSections.forEach((section) => {
    const sectionDocs = grouped[section.id] || [];
    const docsBySlug = sectionDocs.reduce((map, doc) => {
      map.set(doc.slug, doc);
      return map;
    }, new Map());

    const navOrderedDocs = (section.items || []).reduce((acc, item) => {
      const doc = docsBySlug.get(item.slug);
      if (doc) {
        acc.push(doc);
        docsBySlug.delete(item.slug);
      }
      return acc;
    }, []);

    const remaining = Array.from(docsBySlug.values()).sort((a, b) =>
      a.title.localeCompare(b.title),
    );

    orderedGroups.push({
      category: section.id,
      title: section.title || toTitleCase(section.id.replace("-", " ")),
      description: section.description || "",
      docs: [...navOrderedDocs, ...remaining],
    });

    usedCategories.add(section.id);
  });

  Object.entries(grouped).forEach(([category, categoryDocs]) => {
    if (usedCategories.has(category)) return;
    orderedGroups.push({
      category,
      title: toTitleCase(category.replace("-", " ")),
      description: "",
      docs: categoryDocs.slice().sort((a, b) => a.title.localeCompare(b.title)),
    });
  });

  return orderedGroups;
}

export function getNavStructure() {
  return navStructure;
}

export function getAllDocs() {
  return docs.slice();
}
