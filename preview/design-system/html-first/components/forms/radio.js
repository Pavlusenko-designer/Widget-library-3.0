import { el } from "../../utils/el.js";
import { escapeHtml } from "../../utils/escape-html.js";

export function radio(labelText, options = {}) {
  const { name, checked = false, value, className, attrs = {} } = options;
  const field = el("input", { type: "radio", name, value, checked, ...attrs });
  return el("label", { className }, [field, el("span", {}, escapeHtml(labelText))]);
}

