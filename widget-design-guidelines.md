# Widget Design Guidelines

Status: internal reference for widget creation. Keep unlinked unless explicitly published later.

## Purpose

Use this document when creating or refining reusable site-building widgets for the design system. The goal is to keep widgets scalable, content-tolerant, implementation-ready, and easy to assemble from shared design-system components.

## Priority

This document merges the repository widget guidance with the widget assembly rules.

When there is ambiguity:

- the mandatory assembly rules in this document take priority
- descriptive recommendations apply only if they do not conflict with the mandatory rules

## Scope

This document defines mandatory rules for assembling CMS widget references from existing Storybook components, plus the supporting design guidance needed to keep widgets reusable.

## Source Of Truth

- Storybook is the only source of truth for UI components, variants, and styling.
- Use only existing Storybook components and their documented variants.
- Do not create new visual patterns, tokens, styles, or ad hoc component overrides inside widget implementation.
- Figma may be used as a visual reference, but Storybook and code remain the implementation source of truth.

## Core Rules

1. Build widgets only from design-system components and documented compositions.
2. Put raw visual decisions in `tokens`, not inside widget CSS.
3. Keep widget APIs content-driven and configuration-light.
4. Prefer schema fields that describe layout intent, not one-off visual hacks.
5. Stress-test every widget with short, medium, and long content before treating it as reusable.

## Composition

- Every widget must be assembled from reusable Storybook components.
- A widget may introduce a new composition only if it is built entirely from existing Storybook components.
- Prefer the smallest valid composition and avoid unnecessary nesting.
- Each visible part of the widget must map to a Storybook component or a documented composition of Storybook components.
- Reuse existing button, text, input, image, icon, surface, layout, and card-like components whenever available.

## Styling

- Use only existing design tokens, spacing scale, typography presets, colors, radii, shadows, and grid rules already present in Storybook.
- Do not use hardcoded colors, font sizes, spacing values, border radii, or shadows.
- Do not add one-off CSS unless it is required to connect existing components into layout.
- Widget CSS may control layout, width behavior, wrapping, and alignment, but must not invent ad hoc visual systems.

## Structure

- Every widget must have an explicit content structure.
- Separate single-instance content from repeatable content.
- Optional sections must be explicitly marked as optional.
- Repeated items must use one consistent item structure.
- Keep the schema aligned to the visible content model.

## Breakpoints

All widgets must be designed around these viewport ranges:

- `320-767`: mobile
- `768-1279`: tablet
- `1280-1919`: desktop
- `1920+`: widescreen

Notes:

- Storybook preview widths should use the lower bound of each range: `320`, `768`, `1280`, `1920`.
- Widget CSS should target the full ranges, not arbitrary widths.
- Layout decisions should be intentional at each range, especially card count, spacing, and alignment.
- Do not invent custom breakpoints.

## Width behavior

Default principle: elements should take `100%` of the available container width when that improves layout stability.

Apply full available width to:

- widget shells
- grids
- grid items
- card bodies
- text groups
- links that need stable bottom alignment
- media containers

Do not force `100%` width when the element should size to content:

- primary CTAs in centered hero-style intro areas
- pills, badges, or chips
- short inline actions

If an element should remain content-sized, make that an explicit choice.

## Responsive Behavior

- Every widget must define mobile, tablet, desktop, and widescreen layout using the standard breakpoint model.
- Do not depend on fixed text length or fixed item count for layout to work.
- If row count or item density matters to the design, expose it as layout intent in schema rather than relying on accidental browser behavior.

## Content tolerance

Widgets must survive uneven editorial content.

Always test:

- one-line, two-line, and three-line titles
- short and long paragraph copy
- short and long link labels
- optional eyebrow or metadata presence

Rules:

- never depend on all cards having equal content length
- use layout structure so actions stay aligned even when copy lengths differ
- avoid clipping, overlap, and accidental collapse
- prefer `text-wrap: balance` or `pretty` only as polish, not as a structural fix
- the widget must support empty optional fields without breaking layout
- define min and max repeatable item count when applicable

## Header areas

Widget intro areas should usually have the same usable width as the main content container.

Do:

- align the intro block to the widget container
- allow heading and supporting text to use the available width
- center text only when the layout calls for it

Avoid:

- narrow artificial width caps that make the intro feel disconnected from the rest of the widget
- centering children in ways that shrink them to content width unless that is intentional

## Card-based widget rules

For card grids:

- card count per row should be configurable in schema when layout intent matters
- cards should fill their grid track width
- media should fill the card width
- card body should use a top content area and a bottom action area
- bottom actions should stay aligned even with uneven copy

For orphan cards in partial rows:

- center them intentionally when the design benefits from it
- do not rely on browser auto-placement if the result looks accidental
- keep cards full-width inside their grid tracks

## Spacing

Spacing should come from token values and behave predictably across breakpoints.

Rules:

- tighten only where hierarchy still reads clearly
- use larger spacing between major zones than inside a single content block
- keep mobile gutters explicit; never let content touch viewport edges
- do not solve content problems by squeezing spacing below a readable baseline

## Typography

Typography should come from design-system text styles.

Rules:

- headings, body copy, overlines, captions, and validation text should use tokenized styles
- widget CSS may control width, wrapping, and alignment, but not invent ad hoc text scales
- use the primary font system for heading-led content and the secondary system for body and controls

## Interaction states

If a widget contains interactive cards or controls:

- define hover, focus, pressed, disabled, empty, loading, and error states only when relevant to the widget
- interaction must use existing supported patterns only
- do not introduce interaction patterns that are not already supported by platform implementation
- define states using existing tokens and supported platform behavior
- preview-only states used for Storybook or Figma capture must stay outside CMS schema
- do not encode presentation-only preview behavior into persisted widget data

## Schema design

Schema fields should expose reusable decisions, for example:

- `cardsPerRow`
- content groups
- CTA labels and destinations
- optional eyebrow/meta fields

Avoid schema fields that represent:

- pixel nudges
- one-off spacing overrides
- visual fixes for a single mockup

## Editability

- Every editable field must be explicitly identified for CMS handoff.
- For each field, specify whether it is required, optional, repeatable, or fixed.
- Do not expose style controls to CMS unless they already exist as approved variants.

## Handoff

Every widget reference must include:

- widget name
- purpose
- content structure
- component mapping
- responsive behavior
- required states
- field list for CMS mapping

The handoff must be implementation-ready and unambiguous.

Recommended handoff package:

- Storybook docs page for the live widget, usage snippet, token names, responsive notes, and foundations used
- colocated widget spec file in the widget folder
- schema-backed fixture showing realistic short, medium, and long content

## Before marking a widget reusable

Check all of the following:

- it works at `320`, `768`, `1280`, and `1920`
- it tolerates uneven content length
- it uses DS components only
- it uses token-based spacing, colors, and typography
- important elements use full available width where appropriate
- content-sized actions are intentionally content-sized
- last-row alignment looks intentional
- Storybook preview reflects the standard breakpoint model
- CMS-editable fields are explicit
- handoff is clear enough for another developer to implement without asking layout questions

## Promotion path

If a widget introduces repeated patterns:

1. move raw style decisions into `tokens`
2. move repeated primitives into `foundations`
3. move repeated assemblies into `composites`
4. keep the widget focused on content structure and layout intent
