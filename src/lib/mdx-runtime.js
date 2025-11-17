export function parseMarkdownBlocks(text) {
  const sanitized = text.replace(/\r/g, "");
  const lines = sanitized.split("\n");
  const blocks = [];

  let paragraphBuffer = [];
  let currentList = null;
  let inCodeFence = false;
  let codeLanguage = "";
  let codeLines = [];

  const flushParagraph = () => {
    if (paragraphBuffer.length === 0) return;
    blocks.push({
      type: "paragraph",
      content: paragraphBuffer.join(" ").trim(),
    });
    paragraphBuffer = [];
  };

  const flushList = () => {
    if (!currentList) return;
    blocks.push({
      type: "list",
      ordered: false,
      items: currentList,
    });
    currentList = null;
  };

  const flushCodeBlock = () => {
    if (!inCodeFence) return;
    blocks.push({
      type: "code",
      language: codeLanguage,
      content: codeLines.join("\n"),
    });
    inCodeFence = false;
    codeLanguage = "";
    codeLines = [];
  };

  lines.forEach((line) => {
    if (line.trim().startsWith("```")) {
      if (inCodeFence) {
        flushCodeBlock();
      } else {
        flushParagraph();
        flushList();
        inCodeFence = true;
        codeLanguage = line.trim().slice(3).trim();
        codeLines = [];
      }
      return;
    }

    if (inCodeFence) {
      codeLines.push(line);
      return;
    }

    if (/^\s*$/.test(line)) {
      flushParagraph();
      flushList();
      return;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      const level = headingMatch[1].length;
      blocks.push({
        type: "heading",
        level,
        content: headingMatch[2].trim(),
      });
      return;
    }

    const listMatch = line.match(/^\s*-\s+(.*)$/);
    if (listMatch) {
      flushParagraph();
      if (!currentList) currentList = [];
      currentList.push(listMatch[1].trim());
      return;
    }

    const quoteMatch = line.match(/^\s*>\s?(.*)$/);
    if (quoteMatch) {
      flushParagraph();
      flushList();
      blocks.push({
        type: "quote",
        content: quoteMatch[1].trim(),
      });
      return;
    }

    paragraphBuffer.push(line.trim());
  });

  flushParagraph();
  flushList();
  flushCodeBlock();

  return blocks;
}

export function tokenizeInline(text) {
  const tokens = [];
  let index = 0;

  const pushText = (value) => {
    if (!value) return;
    tokens.push({ type: "text", value });
  };

  while (index < text.length) {
    if (text.startsWith("**", index)) {
      const closeIndex = text.indexOf("**", index + 2);
      if (closeIndex !== -1) {
        tokens.push({ type: "strong", value: text.slice(index + 2, closeIndex) });
        index = closeIndex + 2;
        continue;
      }
    }

    if (text[index] === "*" && text[index + 1] !== "*") {
      const closeIndex = text.indexOf("*", index + 1);
      if (closeIndex !== -1) {
        tokens.push({ type: "emphasis", value: text.slice(index + 1, closeIndex) });
        index = closeIndex + 1;
        continue;
      }
    }

    if (text[index] === "`") {
      const closeIndex = text.indexOf("`", index + 1);
      if (closeIndex !== -1) {
        tokens.push({ type: "code", value: text.slice(index + 1, closeIndex) });
        index = closeIndex + 1;
        continue;
      }
    }

    if (text[index] === "[") {
      const closingBracket = text.indexOf("]", index + 1);
      const openingParen = text.indexOf("(", closingBracket);
      const closingParen = text.indexOf(")", openingParen);

      if (closingBracket !== -1 && openingParen !== -1 && closingParen !== -1) {
        const label = text.slice(index + 1, closingBracket);
        const href = text.slice(openingParen + 1, closingParen);
        tokens.push({ type: "link", value: label, href });
        index = closingParen + 1;
        continue;
      }
    }

    let nextSpecial = text.length;
    ["**", "*", "`", "["].forEach((token) => {
      const position = text.indexOf(token, index + 1);
      if (position !== -1 && position < nextSpecial) {
        nextSpecial = position;
      }
    });

    pushText(text.slice(index, nextSpecial));
    index = nextSpecial;
  }

  return tokens;
}
