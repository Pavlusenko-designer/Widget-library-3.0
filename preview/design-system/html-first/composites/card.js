import { el } from "../utils/el.js";
import { heading } from "../components/typography/heading.js";
import { text } from "../components/typography/text.js";
import { link } from "../components/actions/link.js";

export function card(options = {}) {
  const { eyebrow, title, description, actionLabel, actionHref = "#", className = "phw-card" } = options;

  return el("article", { className }, [
    eyebrow ? text(eyebrow, { as: "p", tone: "overline" }) : "",
    title ? heading(title, { level: 3, style: "card" }) : "",
    description ? text(description, { as: "p", tone: "muted" }) : "",
    actionLabel ? link(actionLabel, { href: actionHref }) : ""
  ]);
}

