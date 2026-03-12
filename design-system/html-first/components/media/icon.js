import { el } from "../../utils/el.js";
import { joinClassNames } from "../../utils/join-class-names.js";

const ICONS = {
  play: {
    viewBox: "0 0 24 24",
    path: "M8.5 6.5L18 12L8.5 17.5V6.5Z"
  },
  close: {
    viewBox: "0 0 24 24",
    path: "M6.7 5.3L12 10.6L17.3 5.3L18.7 6.7L13.4 12L18.7 17.3L17.3 18.7L12 13.4L6.7 18.7L5.3 17.3L10.6 12L5.3 6.7L6.7 5.3Z"
  },
  chevronRight: {
    viewBox: "0 0 24 24",
    path: "M9 6L15 12L9 18"
  },
  file: {
    viewBox: "0 0 24 24",
    path: "M7 3H13L18 8V21H7V3ZM12 4V9H17"
  },
  plus: {
    viewBox: "0 0 24 24",
    path: "M12 6V18M6 12H18"
  },
  save: {
    viewBox: "0 0 24 24",
    path: "M7 4H17V20L12 16.5L7 20V4Z"
  },
  minus: {
    viewBox: "0 0 24 24",
    path: "M6 12H18"
  },
  pause: {
    viewBox: "0 0 24 24",
    path: "M9 7V17M15 7V17"
  }
};

const SIZES = {
  sm: "var(--icon-size-sm)",
  md: "var(--icon-size-md)",
  lg: "var(--icon-size-lg)"
};

export function icon(name, options = {}) {
  const { className, size = "md", title, attrs = {} } = options;
  const selected = ICONS[name] ?? ICONS.play;
  const resolvedSize = SIZES[size] ?? SIZES.md;
  const children = [
    title ? el("title", {}, title) : "",
    el("path", {
      d: selected.path,
      fill: name === "play" ? "currentColor" : "none",
      stroke: name === "play" ? "none" : "currentColor",
      "stroke-width": name === "play" ? null : "1.8",
      "stroke-linecap": name === "play" ? null : "round",
      "stroke-linejoin": name === "play" ? null : "round"
    })
  ];

  return el(
    "svg",
    {
      viewBox: selected.viewBox,
      width: resolvedSize,
      height: resolvedSize,
      "aria-hidden": title ? null : "true",
      role: title ? "img" : null,
      className: joinClassNames("phw-icon", className),
      ...attrs
    },
    children
  );
}

