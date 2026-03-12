import { el } from "../../utils/el.js";
import { joinClassNames } from "../../utils/join-class-names.js";

export function grid(children, options = {}) {
  const { columns = 3, gap = "var(--space-md)", columnsByBreakpoint, className, attrs = {} } = options;
  const isResponsive = Boolean(columnsByBreakpoint);
  const styleParts = [
    "display:grid",
    `gap:${gap}`,
    `--phw-grid-cols-default:${columns}`,
    "grid-template-columns:repeat(var(--phw-grid-cols-current, var(--phw-grid-cols-default)), minmax(0, 1fr))"
  ];

  if (isResponsive) {
    if (columnsByBreakpoint.mobile != null) {
      styleParts.push(`--phw-grid-cols-mobile:${columnsByBreakpoint.mobile}`);
    }
    if (columnsByBreakpoint.tablet != null) {
      styleParts.push(`--phw-grid-cols-tablet:${columnsByBreakpoint.tablet}`);
    }
    if (columnsByBreakpoint.desktop != null) {
      styleParts.push(`--phw-grid-cols-desktop:${columnsByBreakpoint.desktop}`);
    }
    if (columnsByBreakpoint.widescreen != null) {
      styleParts.push(`--phw-grid-cols-widescreen:${columnsByBreakpoint.widescreen}`);
    }
  }

  const style = `${styleParts.join(";")};`;
  return el("div", { className: joinClassNames(className, isResponsive ? "phw-grid-responsive" : ""), style, ...attrs }, children);
}
