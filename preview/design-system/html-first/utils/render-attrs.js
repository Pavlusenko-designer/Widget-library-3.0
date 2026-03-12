import { escapeHtml } from "./escape-html.js";

export function renderAttrs(attributes = {}) {
  const pairs = Object.entries(attributes)
    .flatMap(([key, value]) => {
      if (value == null || value === false) {
        return [];
      }

      if (key === "className") {
        return value ? [`class="${escapeHtml(value)}"`] : [];
      }

      if (value === true) {
        return [escapeHtml(key)];
      }

      return [`${escapeHtml(key)}="${escapeHtml(value)}"`];
    })
    .join(" ");

  return pairs.length ? ` ${pairs}` : "";
}

