import { el } from "../../utils/el.js";
import { escapeHtml } from "../../utils/escape-html.js";

export function select(options = {}) {
  const { name, options: items = [], className, attrs = {} } = options;
  const optionHtml = items
    .map((item) => el("option", { value: item.value, selected: item.selected }, escapeHtml(item.label)))
    .join("");
  return el("select", { name, className, ...attrs }, optionHtml);
}

