export function toHtml(value) {
  if (Array.isArray(value)) {
    return value.map((item) => toHtml(item)).join("");
  }

  if (value == null || value === false) {
    return "";
  }

  return String(value);
}

