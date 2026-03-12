# Design System Token + Widget Analysis

## 1. Tokens found in project

Source: `design-system/html-first/tokens/theme.css`

- Palette tokens:
  - `--palette-primary`, `--palette-secondary`
  - background tokens (`--palette-background-*`)
  - text tokens (`--palette-text-*`)
  - status tokens (`--palette-success`, `--palette-error`, `--palette-disabled`)
- Semantic color aliases:
  - surfaces: `--color-canvas`, `--color-surface`, `--color-surface-muted`, `--color-surface-inverse`
  - text: `--color-text`, `--color-text-muted`, `--color-text-inverse`, `--color-text-placeholder`
  - action/border/status: `--color-primary`, `--color-primary-contrast`, `--color-border`, `--color-success`, `--color-error`
- Spacing scale:
  - `--space-xs` to `--space-2xl`
  - section spacers: `--spacer-small`, `--spacer-medium`, `--spacer-large`
- Radius/shape:
  - `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-pill`
  - control/container specific: `--roundness-button`, `--roundness-input`, `--roundness-image`, `--roundness-container`, `--roundness-modal`
- Typography:
  - families: `--font-primary`, `--font-secondary`, `--font-button`, `--font-display`
  - scale: `--type-scale-xs` to `--type-scale-3xl`
  - semantic roles: `--type-widget-size`, `--type-card-title-size`, `--type-body-size`, etc.
  - line height: `--type-heading-line-height`, `--type-body-line-height`, `--type-compact-line-height`
- Layout + breakpoints:
  - containers: `--container-sm`, `--container-md`, `--container-lg`, `--container-xl`
  - viewport thresholds: `--viewport-mobile` (320), `--viewport-tablet` (768), `--viewport-desktop` (1280), `--viewport-widescreen` (1920)
- Effects/misc:
  - `--shadow-soft`
  - control sizing (`--control-height-*`, `--control-padding-inline`, `--focus-ring-width`)

## 2. Original widget examples and rebuilt mapping

### Widget A

- Original: `phw-static-content-card-view1-v1`
- Pattern: intro + KPI/stat card grid + optional footer CTA
- Rebuilt as:
  - section header: `heading` + `text` + `link`
  - cards: `stack` composition with `text` (meta), `heading`, `text` (description)
  - layout: `container` + `grid` (2-column desktop, 1-column tablet/mobile)

### Widget B

- Original: `phw-static-media-card-view31-v1`
- Pattern: intro + media/text cards with action links
- Rebuilt as:
  - section header: `heading` + `text` + `link`
  - card row: `image` + content `stack` (`heading`, `text`, `link`)
  - layout: responsive `grid` with full-width card tracks

### Widget C

- Original: `phw-static-video-popup-default-v1`
- Pattern: intro + slider/video tiles + popup dialog
- Rebuilt as:
  - section header: `heading` + `text` + `link`
  - video tiles: `image` cover + DS `button` (play) + text/link metadata
  - popup: browser `dialog` + `video` element, with no schema-only display flags

## 3. Guideline compliance checks

- DS-only composition:
  - built from HTML-first components (`container`, `grid`, `stack`, `heading`, `text`, `link`, `button`, `image`) with documented composition patterns
- Tokenized styling:
  - color, spacing, radius, typography, shadows use DS tokens
  - no ad hoc hex color in widget implementation
- Breakpoint model:
  - explicit handling for `320-767`, `768-1279`, `1280-1919`, `1920+`
- Width behavior:
  - shells, grids, cards, text groups use full available width
  - CTAs kept content-sized intentionally
- Content tolerance:
  - uneven copy handled by stack/grid structure
  - action links anchored in each card content flow

## 4. CMS field model (implementation-ready)

- Widget-level:
  - `title` (required)
  - `subtitle` (optional)
  - `ctaLabel`, `ctaHref` (optional)
- Repeating card items:
  - Widget A: `meta`, `title`, `description` (required title, optional description)
  - Widget B: `imageSrc`, `imageAlt`, `title`, `description`, `actionLabel`, `actionHref`
  - Widget C: `coverImageSrc`, `coverImageAlt`, `title`, `subtitle`, `videoSrc`, `transcriptHref`
- Layout intent:
  - optional `cardsPerRow` by breakpoint if CMS requires explicit control
