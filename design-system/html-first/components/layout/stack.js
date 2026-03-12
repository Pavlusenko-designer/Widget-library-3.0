import { el } from "../../utils/el.js";

export function stack(children, options = {}) {
  const { gap = "var(--space-md)", className, attrs = {} } = options;
  return el("div", { className, style: `display:grid;gap:${gap};`, ...attrs }, children);
}

