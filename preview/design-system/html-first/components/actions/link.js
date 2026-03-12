import { el } from "../../utils/el.js";
import { escapeHtml } from "../../utils/escape-html.js";

export function link(content, options = {}) {
  const { href = "#", className, attrs = {} } = options;
  return el("a", { href, className, ...attrs }, escapeHtml(content));
}

