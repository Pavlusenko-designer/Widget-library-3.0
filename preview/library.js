import {
  button,
  checkbox,
  container,
  grid,
  heading,
  icon,
  iconButton,
  fileUpload,
  image,
  input,
  link,
  radio,
  select,
  stack,
  tabs,
  text
} from "../design-system/html-first/index.js";

const iconNames = ["play", "pause", "save", "close", "chevronRight", "file", "plus", "minus"];

const componentApi = [
  ["actions/button", "content, variant, className, attrs", "primary, default, ghost-inverse"],
  ["actions/icon-button", "iconName, variant, shape, size, label", "default/overlay, circle/square, sm/md/lg"],
  ["actions/link", "content, href, className, attrs", "plain link, inline link, button link"],
  ["forms/input", "name, type, value, placeholder, required", "text-like field primitive"],
  ["forms/file-upload", "name, accept, required, className, attrs", "native file input primitive"],
  ["forms/select", "name, options[], className, attrs", "native select options"],
  ["forms/checkbox", "labelText, name, checked, value", "label-wrapped checkbox"],
  ["forms/radio", "labelText, name, checked, value", "label-wrapped radio"],
  ["layout/container", "children, className, attrs", "widget shell / section wrapper"],
  ["layout/grid", "columns, gap, columnsByBreakpoint", "responsive grid via CSS vars"],
  ["layout/stack", "children, gap", "vertical composition primitive"],
  ["media/icon", "name, size, title", "all declared icon glyphs"],
  ["media/image", "src, alt, className", "image primitive"],
  ["navigation/tabs", "items, activeId, ariaLabel", "accessible tablist state"],
  ["typography/heading", "content, level, style", "widget/card heading styles"],
  ["typography/text", "content, as, tone", "default/muted/overline text"],
  ["composites/card", "(from index export)", "available for compositions"]
];

function allTokens() {
  const styles = getComputedStyle(document.documentElement);
  const tokens = [];
  for (let i = 0; i < styles.length; i += 1) {
    const name = styles[i];
    if (name.startsWith("--")) {
      tokens.push([name, styles.getPropertyValue(name).trim()]);
    }
  }
  return tokens.sort((a, b) => a[0].localeCompare(b[0]));
}

function tokenGroup(tokens, matcher) {
  return tokens.filter(([name]) => matcher(name));
}

function tokenSection(title, items, swatch = false) {
  if (!items.length) {
    return "";
  }
  return `<article class="token-section">
    <h3>${title}</h3>
    <div class="token-grid ${swatch ? "token-grid-swatch" : "token-grid-list"}">
      ${items
        .map(([name, value]) => {
          if (swatch) {
            return `<div class="token-card"><div class="token-swatch" style="background:${value}"></div><div class="token-meta"><div class="token-name code">${name}</div><div class="token-value">${value}</div></div></div>`;
          }
          return `<div class="token-line"><span class="code">${name}</span><span class="code">${value}</span></div>`;
        })
        .join("")}
    </div>
  </article>`;
}

function renderFoundations() {
  const host = document.getElementById("tokenGrid");
  const tokens = allTokens();

  const palettes = tokenGroup(tokens, (n) => n.startsWith("--palette-"));
  const semanticColors = tokenGroup(tokens, (n) => n.startsWith("--color-"));
  const fonts = tokenGroup(tokens, (n) => n.startsWith("--font-"));
  const typography = tokenGroup(tokens, (n) => n.startsWith("--type-"));
  const spacing = tokenGroup(tokens, (n) => n.startsWith("--space-") || n.startsWith("--spacer-"));
  const radii = tokenGroup(tokens, (n) => n.startsWith("--radius-") || n.startsWith("--roundness-"));
  const shadows = tokenGroup(tokens, (n) => n.startsWith("--shadow-") || n.startsWith("--overlay-") || n.startsWith("--state-"));
  const layout = tokenGroup(tokens, (n) => n.startsWith("--container-") || n.startsWith("--viewport-"));

  host.innerHTML = [
    tokenSection("Palette Colors", palettes, true),
    tokenSection("Semantic Colors", semanticColors, true),
    tokenSection("Fonts", fonts),
    tokenSection("Typography Scale & Roles", typography),
    tokenSection("Spacing", spacing),
    tokenSection("Radii & Roundness", radii),
    tokenSection("Shadows / Overlays / States", shadows),
    tokenSection("Layout Containers & Viewports", layout)
  ].join("");
}

function renderComponents() {
  const host = document.getElementById("componentGrid");

  const buttonSet = `<div class="demo-row">
    ${button("Primary")}
    ${button("Default")}
    ${button("Ghost inverse", { variant: "ghost-inverse" })}
    ${link("Secondary", { href: "#", className: "phw-btn phw-btn-secondary phw-btn-inline" })}
    ${link("Tertiary", { href: "#", className: "phw-btn phw-btn-tertiary phw-btn-inline" })}
  </div>`;

  const linkSet = `<div class="demo-row">
    ${link("Plain hyperlink", { href: "#" })}
    ${link("Inline hyperlink", { href: "#", className: "phw-inline-link" })}
    ${link("Button link", { href: "#", className: "phw-btn phw-btn-primary phw-btn-inline" })}
  </div>`;

  const iconSet = `<div class="demo-row">${iconNames.map((name) => `<span class="icon-pill">${icon(name, { size: "md" })}<span>${name}</span></span>`).join("")}</div>`;

  const cards = [
    ["Typography", `${heading("Widget Heading", { level: 2, style: "widget" })}${heading("Card Heading", { level: 3, style: "card" })}${text("Default text tone")}${text("Muted text tone", { tone: "muted" })}${text("Overline text tone", { tone: "overline" })}`],
    ["Buttons", buttonSet],
    ["Hyperlinks", linkSet],
    ["Icons", iconSet],
    ["Icon Buttons", `<div class="demo-row">${iconButton({ iconName: "save", size: "sm", label: "Save" })}${iconButton({ iconName: "pause", size: "md", label: "Pause" })}${iconButton({ iconName: "play", size: "md", label: "Play" })}${iconButton({ iconName: "close", variant: "overlay", size: "lg", label: "Close" })}</div><div class="surface-dark demo-row">${iconButton({ iconName: "chevronRight", variant: "overlay", size: "md", label: "Next" })}</div>`],
    [
      "Forms",
      `<div class="component-demo">
        <div class="demo-row">${input({ placeholder: "Input field", className: "ds-field" })}${select({ className: "ds-field", options: [{ value: "", label: "Choose", selected: true }, { value: "a", label: "Option A" }, { value: "b", label: "Option B" }] })}</div>
        <div class="demo-row">${fileUpload({ name: "resume", className: "ds-field", attrs: { "aria-label": "Upload resume file" } })}</div>
        <div class="demo-row">${checkbox("Checkbox", { name: "cb" })}${radio("Radio A", { name: "r", checked: true })}${radio("Radio B", { name: "r" })}</div>
      </div>`
    ],
    [
      "Layout",
      `${container(
        stack(
          [
            text("Container + stack + grid", { tone: "overline" }),
            grid(["A", "B", "C", "D"].map((x) => `<div class="layout-chip">${x}</div>`), {
              columns: 4,
              columnsByBreakpoint: { mobile: 2, tablet: 2, desktop: 4, widescreen: 4 },
              gap: "var(--space-sm)"
            })
          ],
          { gap: "var(--space-sm)" }
        ),
        { className: "component-demo" }
      )}`
    ],
    [
      "Navigation",
      `${tabs({ items: [{ id: "overview", label: "Overview" }, { id: "usage", label: "Usage" }, { id: "tokens", label: "Tokens" }], activeId: "overview" })}`
    ],
    [
      "Media",
      `<div class="demo-row">${image({ src: "../src-widgets/phw-static-media-card-view31-v1/phw-static-media-card-view31-v1/assets/images/steps_1.png", alt: "Sample media", className: "library-image" })}</div>`
    ]
  ];

  host.innerHTML = cards
    .map(([title, demo]) => `<article class="component-card"><h3 class="component-title">${title}</h3><div class="component-demo">${demo}</div></article>`)
    .join("");
}

function renderProperties() {
  const host = document.getElementById("propertyTables");
  host.innerHTML = `<article class="property-table">
    <table>
      <thead>
        <tr><th>Declared Component</th><th>API Properties</th><th>Declared Styles / Variants</th></tr>
      </thead>
      <tbody>
        ${componentApi
          .map(
            ([component, props, variants]) => `<tr>
              <td class="code">${component}</td>
              <td>${props}</td>
              <td>${variants}</td>
            </tr>`
          )
          .join("")}
      </tbody>
    </table>
  </article>`;
}

renderFoundations();
renderComponents();
renderProperties();
