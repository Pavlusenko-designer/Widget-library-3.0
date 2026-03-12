# HTML-first Design System Export

Quick-copy bundle of framework-free design-system renderers.

## Structure

- `components/` foundation-like primitives
- `composites/` higher-level assemblies
- `utils/` HTML rendering helpers
- `tokens/theme.css` token stylesheet
- `index.js` top-level exports

## Usage

```js
import { container, heading, text, card } from "./html-first/index.js";
import "./html-first/tokens/theme.css";

const html = container([
  heading("Careers", { style: "widget" }),
  text("HTML-first components with no UI framework.", { tone: "muted" }),
  card({
    eyebrow: "Open role",
    title: "Senior Engineer",
    description: "Build resilient web systems.",
    actionLabel: "Apply",
    actionHref: "#apply"
  })
]);
```

