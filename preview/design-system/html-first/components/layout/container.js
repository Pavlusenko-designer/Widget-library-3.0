import { el } from "../../utils/el.js";

export function container(children, options = {}) {
  const { className = "phw-widget-shell", attrs = {} } = options;
  return el("div", { className, ...attrs }, children);
}

