export { escapeHtml } from "./utils/escape-html.js";
export { joinClassNames } from "./utils/join-class-names.js";
export { renderAttrs } from "./utils/render-attrs.js";
export { toHtml } from "./utils/to-html.js";
export { el } from "./utils/el.js";

export { container } from "./components/layout/container.js";
export { grid } from "./components/layout/grid.js";
export { stack } from "./components/layout/stack.js";

export { heading } from "./components/typography/heading.js";
export { text } from "./components/typography/text.js";

export { link } from "./components/actions/link.js";
export { button } from "./components/actions/button.js";
export { iconButton } from "./components/actions/icon-button.js";

export { input } from "./components/forms/input.js";
export { fileUpload } from "./components/forms/file-upload.js";
export { select } from "./components/forms/select.js";
export { checkbox } from "./components/forms/checkbox.js";
export { radio } from "./components/forms/radio.js";

export { image } from "./components/media/image.js";
export { icon } from "./components/media/icon.js";
export { tabs } from "./components/navigation/tabs.js";

export { card } from "./composites/card.js";

import { escapeHtml } from "./utils/escape-html.js";
import { joinClassNames } from "./utils/join-class-names.js";
import { renderAttrs } from "./utils/render-attrs.js";
import { toHtml } from "./utils/to-html.js";
import { el } from "./utils/el.js";
import { container } from "./components/layout/container.js";
import { grid } from "./components/layout/grid.js";
import { stack } from "./components/layout/stack.js";
import { heading } from "./components/typography/heading.js";
import { text } from "./components/typography/text.js";
import { link } from "./components/actions/link.js";
import { button } from "./components/actions/button.js";
import { iconButton } from "./components/actions/icon-button.js";
import { input } from "./components/forms/input.js";
import { fileUpload } from "./components/forms/file-upload.js";
import { select } from "./components/forms/select.js";
import { checkbox } from "./components/forms/checkbox.js";
import { radio } from "./components/forms/radio.js";
import { image } from "./components/media/image.js";
import { icon } from "./components/media/icon.js";
import { tabs } from "./components/navigation/tabs.js";
import { card } from "./composites/card.js";

export const htmlFirst = {
  el,
  fragment: toHtml,
  container,
  grid,
  stack,
  heading,
  text,
  link,
  button,
  iconButton,
  tabs,
  icon,
  image,
  input,
  fileUpload,
  select,
  checkbox,
  radio,
  card,
  utils: {
    escapeHtml,
    joinClassNames,
    renderAttrs
  }
};
