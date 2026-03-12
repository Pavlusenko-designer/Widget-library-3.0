import { el } from "../../utils/el.js";

export function input(options = {}) {
  const { name, type = "text", value, placeholder, required = false, className, attrs = {} } = options;
  return el("input", { name, type, value, placeholder, required, className, ...attrs });
}

