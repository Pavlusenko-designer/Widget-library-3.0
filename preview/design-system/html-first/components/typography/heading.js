import { el } from "../../utils/el.js";
import { escapeHtml } from "../../utils/escape-html.js";
import { joinClassNames } from "../../utils/join-class-names.js";

export function heading(content, options = {}) {
  const { level = 2, style = "card", className } = options;
  const resolvedLevel = Math.min(6, Math.max(1, Number(level) || 2));
  const styleClass = style === "widget" ? "phw-widget-title" : "phw-card-title";
  return el(`h${resolvedLevel}`, { className: joinClassNames(styleClass, className) }, escapeHtml(content));
}

