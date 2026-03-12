import { el } from "../../utils/el.js";

export function fileUpload(options = {}) {
  const {
    name,
    accept = ".pdf,.doc,.docx,.txt",
    className,
    required = false,
    attrs = {}
  } = options;

  return el("input", {
    type: "file",
    name,
    accept,
    required,
    className,
    ...attrs
  });
}
