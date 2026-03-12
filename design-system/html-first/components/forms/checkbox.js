import { el } from "../../utils/el.js";
import { escapeHtml } from "../../utils/escape-html.js";

export function checkbox(labelText, options = {}) {
  const { name, checked = false, value = "on", className, attrs = {} } = options;
  const field = el("input", { type: "checkbox", name, value, checked, ...attrs });
  return el("label", { className }, [field, el("span", {}, escapeHtml(labelText))]);
}

