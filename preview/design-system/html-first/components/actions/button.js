import { el } from "../../utils/el.js";
import { escapeHtml } from "../../utils/escape-html.js";
import { joinClassNames } from "../../utils/join-class-names.js";

export function button(content, options = {}) {
  const { variant = "primary", className, attrs = {} } = options;
  const variantClass =
    variant === "primary"
      ? "phw-btn phw-btn-primary"
      : variant === "ghost-inverse"
      ? "phw-btn phw-btn-ghost-inverse"
      : "phw-btn";
  return el("button", { type: "button", className: joinClassNames(variantClass, className), ...attrs }, escapeHtml(content));
}
