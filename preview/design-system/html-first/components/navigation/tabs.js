import { el } from "../../utils/el.js";
import { joinClassNames } from "../../utils/join-class-names.js";

export function tabs(options = {}) {
  const { items = [], activeId, ariaLabel = "Tabs", className, attrs = {} } = options;

  const tabsMarkup = items.map((item, index) => {
    const isActive = item.id === activeId;
    return el(
      "button",
      {
        type: "button",
        role: "tab",
        id: `tab-${item.id}`,
        "aria-selected": isActive ? "true" : "false",
        "aria-controls": item.controls || "",
        tabindex: isActive || (!activeId && index === 0) ? "0" : "-1",
        className: joinClassNames("phw-tab", isActive ? "is-active" : "", item.className),
        "data-tab-id": item.id
      },
      item.label
    );
  });

  return el(
    "div",
    {
      role: "tablist",
      "aria-label": ariaLabel,
      className: joinClassNames("phw-tabs", className),
      ...attrs
    },
    tabsMarkup
  );
}
