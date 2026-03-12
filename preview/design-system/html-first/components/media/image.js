import { el } from "../../utils/el.js";

export function image(options = {}) {
  const { src, alt = "", className, attrs = {} } = options;
  return el("img", { src, alt, className, ...attrs });
}

