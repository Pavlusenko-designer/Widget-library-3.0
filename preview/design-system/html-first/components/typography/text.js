import { el } from "../../utils/el.js";
import { escapeHtml } from "../../utils/escape-html.js";
import { joinClassNames } from "../../utils/join-class-names.js";

export function text(content, options = {}) {
  const { as = "p", tone = "default", className } = options;
  const toneClass = tone === "muted" ? "phw-card-description" : tone === "overline" ? "phw-overline" : "phw-widget-copy";
  return el(as, { className: joinClassNames(toneClass, className) }, escapeHtml(content));
}

