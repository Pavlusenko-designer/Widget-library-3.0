import { renderAttrs } from "./render-attrs.js";
import { toHtml } from "./to-html.js";

const VOID_ELEMENTS = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);

export function el(tag, attributes = {}, children = "") {
  const attrs = renderAttrs(attributes);

  if (VOID_ELEMENTS.has(tag)) {
    return `<${tag}${attrs} />`;
  }

  return `<${tag}${attrs}>${toHtml(children)}</${tag}>`;
}

