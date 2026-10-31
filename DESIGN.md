---
version: alpha
name: "Owj Market Observatory"
description: "Persian real-estate listings and market analytics with a shared dark dashboard shell."
colors:
  primary: "#66308d"
  secondary: "#01ae9b"
  background: "#0c0b10"
  surface: "#16141f"
  text: "#ede9f5"
  textSecondary: "#a39bb5"
typography:
  sans:
    fontFamily: '"Sahel", Tahoma, sans-serif'
  mono:
    fontFamily: '"Sahel", Tahoma, sans-serif'
rounded:
  DEFAULT: "14px"
omitted:
  - section: spacing
    reason: "Existing page-specific spacing remains in styles.css and shared.jsx."
  - section: components
    reason: "This typography change retains the existing shared component implementations."
---

# Owj Market Observatory Design System

## Overview

The product helps Persian-speaking users inspect saved Tehran property listings,
compare prices, and understand scoring evidence. The existing product register is
a dense dark market dashboard with purple and teal accents, Persian labels, RTL
content, and `fa-IR` numbers. Preserve the established shared shell and page layouts.

Runtime CSS and shared components remain canonical; this document records their
accepted visual decisions. The current user explicitly selected the bundled Sahel
font for every screen and control.

## Colors

The documented palette mirrors `T` in `dashboard/src/shared.jsx`. Purple denotes
the primary brand and teal highlights information and actions. Existing semantic
status colors and page-specific chart colors remain defined in their runtime owners.

## Typography

`dashboard/src/typography.css` owns `--font-family` and the local variable font
face. It loads `next-persian-fonts/sahel/Sahel-VF.woff2` directly from the repository.
Vite emits the font into `public/assets`; `dashboard/index.html` preloads the same
asset, and the API server serves it as `font/woff2`.

The font family is `"Sahel", Tahoma, sans-serif`. Use the bundled variable weights
from 400 through 900 and preserve existing sizes, weights, and line heights. The
shared CSS aliases `--sans` and `--mono` both resolve to `--font-family`, including
numeric and technical text. Form controls and code elements inherit the font.
Shared JSX and page-level styles consume the token instead of separate font stacks.
Do not add remote font imports or page-specific font families.

## Layout

Retain the existing desktop navigation, responsive card/table layouts, content
widths, and RTL reading order in `styles.css`, `shared.jsx`, and page components.

## Elevation & Depth

Keep existing dark surface layers, subtle borders, and shared shadows.

## Shapes

Shared panels use the existing 14px radius. Existing control and badge variants
remain defined by their component styles.

## Components

`shared.jsx` owns the shared header, footer, icons, and formatters. Page-specific
loading, error, filtering, navigation, focus, and disabled behavior are retained.
Typography applies equally to these states and to native form controls.

Pricing and location/source panels in `SavedListingDetailPage.jsx` share the
`saved-panel--facts` variant: panel and fact-row backgrounds are `#ffffff`, and
headings, labels, and values are `#000000`. Its scoped styles own this treatment.

`AppNavigation` in `shared.jsx` owns the primary navigation links for the shared
header and dashboard header. The listings link (`/catalog`) is always rendered
outside the scrollable group, including on narrow screens. Loading and error
screens keep `AppHeader` visible, and the current route retains `aria-current`.

## Do's and Don'ts

- Use `var(--font-family)` or inheritance for all application text.
- Keep the original font in the repository and include it in production builds.
- Verify the font loads on both listings and analytics screens at desktop and mobile widths.
- Avoid remote font dependencies and competing page-local font declarations.
