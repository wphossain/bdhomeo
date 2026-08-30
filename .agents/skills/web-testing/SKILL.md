---
name: web-testing
description: Guidelines and runbook for testing frontend web applications, layout responsiveness, DOM interactions, accessibility, and visual aesthetics.
---

# Web Testing Skill

This skill provides step-by-step procedures for validating frontend web applications across functional correctness, cross-device responsiveness, visual design fidelity, and accessibility.

## 1. Static Validation & HTML/CSS Linting
- **Semantic Structure**: Validate proper use of `<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, and `<footer>`.
- **Heading Hierarchy**: Ensure a single `<h1>` tag with logically nested `<h2>` and `<h3>` tags.
- **Link & Image Integrity**: Verify all `href` attributes, local asset paths, and `alt` text for images.
- **Form Elements**: Ensure `<input>` elements have associated `<label>` or `aria-label` attributes.

## 2. Responsiveness & Viewport Checks
- Test layouts across key viewport breakpoints:
  - Mobile portrait: `375px` - `480px`
  - Mobile landscape / Tablet: `640px` - `768px`
  - Desktop / Widescreen: `1024px` - `1440px`
- Verify no horizontal overflow (`body { overflow-x: hidden; }` or unintended fixed widths).
- Check touch targets: buttons and clickable items should have at least `44x44px` touch bounding area.

## 3. Interactive Verification
- Verify hover, focus, and active states for buttons, links, and form controls.
- Check smooth scrolling behavior on internal `#anchor` links.
- Test client-side state transitions and modal/drawer open and close triggers.

## 4. Accessibility (a11y)
- Verify color contrast ratios meet WCAG AA standards (minimum 4.5:1 for normal text).
- Ensure all interactive elements are reachable and operable via keyboard navigation (`Tab`, `Enter`, `Space`).
