import { el } from "../../utils/el.js";
import { joinClassNames } from "../../utils/join-class-names.js";
import { icon } from "../media/icon.js";

export function iconButton(options = {}) {
  const {
    iconName = "play",
    variant = "default",
    shape = "circle",
    size = "md",
    label = "",
    className,
    attrs = {}
  } = options;

  const variantClass = variant === "overlay" ? "phw-icon-btn phw-icon-btn-overlay" : "phw-icon-btn";
  const shapeClass = shape === "circle" ? "phw-icon-btn-circle" : "phw-icon-btn-square";
  const sizeClass = `phw-icon-btn-${size}`;

  return el(
    "button",
    {
      type: "button",
      "aria-label": label || iconName,
      className: joinClassNames(variantClass, shapeClass, sizeClass, className),
      ...attrs
    },
    icon(iconName, { size })
  );
}
