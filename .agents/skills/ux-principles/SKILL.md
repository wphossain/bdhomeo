---
name: ux-principles
description: >-
  Comprehensive UX design principles covering user psychology, cognitive load,
  micro-interactions, information hierarchy, accessibility (WCAG 2.2), and
  research-driven decision making for frontend developers.
---

# UX Design Principles Skill

This skill provides a framework for making user-centric design decisions grounded in cognitive psychology, accessibility standards, and interaction research.

---

## 1. Core UX Laws Every Developer Must Know

### Fitts's Law
> The time to reach a target is proportional to the distance and inversely proportional to the target size.
- **Implication:** Make buttons and interactive targets large enough and close to where the user's cursor/finger is likely to be.
- **Rule:** Minimum touch target: `44×44px` (iOS HIG, Material Design).
- **Apply:** Place primary CTAs in predictable locations (right-aligned in forms, bottom of dialogs).

### Hick's Law
> The time to make a decision increases with the number and complexity of choices.
- **Implication:** Reduce options presented at one time. Use progressive disclosure for complex features.
- **Apply:** Navigation menus with ≤7 items. Use wizards/stepper flows for multi-step tasks.

### Miller's Law (The Magic Number 7 ± 2)
> People can hold approximately 7 items in working memory at once.
- **Apply:** Group related items into chunks. Navigation: 5–9 items max. Tab groups, card grids, and filter lists should be paginatable.

### Jakob's Law
> Users spend most of their time on other sites, and expect your site to work the same way.
- **Apply:** Follow platform conventions (hamburger menus on mobile, logo top-left, search top-right). Don't innovate in navigation — innovate in content.

### The Peak-End Rule
> People judge an experience based on its peak moment and how it ends, not the average.
- **Apply:** Ensure success states, onboarding completion, and final checkout steps feel delightful. First load and key interactions are your "peaks."

---

## 2. Visual Hierarchy

Use these four attributes to direct user attention:

| Attribute     | Low Priority           | High Priority              |
| :------------ | :--------------------- | :------------------------- |
| **Size**      | Small text / icon      | Large heading / hero text  |
| **Weight**    | Regular (400)          | Bold (700–800)             |
| **Color**     | Muted / low saturation | High saturation / brand    |
| **Space**     | Dense, tight layout    | Generous padding / margins |

### Implementation Checklist
- [ ] Single `<h1>` per page, logically nested hierarchy
- [ ] Primary CTA uses brand color and is visually heavier than secondary
- [ ] Muted text (`color-muted`) used for supporting information only
- [ ] Cards and sections use consistent padding from the spacing scale

---

## 3. Cognitive Load Reduction

### Progressive Disclosure
Reveal information only when it's needed:
```
Step 1 (simple)  →  Step 2 (more detail)  →  Step 3 (advanced options)
```
Never show all options at once. Hide advanced settings behind "Advanced" toggles.

### Chunking
Group related form fields, navigation items, and content into labeled sections.
- Good: Billing Info section, Shipping section — separated with clear headers
- Bad: 15 form fields in a single undifferentiated block

### Feedback Loop (Every Action Needs a Response)
| User Action        | Required Feedback                            |
| :----------------- | :------------------------------------------- |
| Button click        | Visual pressed state (scale down, color shift)|
| Form submission     | Loading state → Success/Error message         |
| File upload         | Progress bar + completion confirmation        |
| Async data load     | Skeleton screen (preferred over spinner)      |
| Destructive action  | Confirmation dialog with consequence preview  |

---

## 4. Accessibility (WCAG 2.2)

### Level AA Requirements (Minimum Standard)
- **1.4.3 Contrast:** Text ≥ 4.5:1, large text ≥ 3:1
- **1.4.4 Resize Text:** Page must be usable at 200% zoom without horizontal scroll
- **2.1.1 Keyboard:** All functionality operable via keyboard alone
- **2.4.7 Focus Visible:** Keyboard focus indicator must be clearly visible
- **3.3.1 Error Identification:** Errors must be identified in text, not just color

### CSS Focus Styles
```css
/* Never do this: */
*:focus { outline: none; }

/* Do this instead — custom visible focus ring: */
:focus-visible {
  outline: 2px solid var(--color-brand);
  outline-offset: 3px;
  border-radius: var(--radius-sm);
}
```

### ARIA Landmark Roles
```html
<header role="banner">
<nav role="navigation" aria-label="Main navigation">
<main role="main">
<section aria-labelledby="section-heading-id">
<aside role="complementary">
<footer role="contentinfo">
```

### `prefers-reduced-motion` — Always Implement
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 5. Micro-Interaction Design

Micro-interactions are small, purposeful animations triggered by a specific user event.

### The Four Parts (per Dan Saffer)
1. **Trigger** — What initiates the micro-interaction (user action or system event)
2. **Rules** — What happens as a result
3. **Feedback** — How the user is informed of the result
4. **Loops & Modes** — Does it repeat? What are the states?

### Common Patterns

```css
/* Button ripple effect on click */
.btn {
  position: relative;
  overflow: hidden;
}
.btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
  opacity: 0;
  transform: scale(0);
  transition: transform 0.4s var(--ease-out-expo), opacity 0.4s;
}
.btn:active::after {
  transform: scale(2.5);
  opacity: 1;
  transition: 0s;
}

/* Hover lift card */
.card {
  transition: transform var(--duration-base) var(--ease-out-expo),
              box-shadow var(--duration-base) var(--ease-out-expo);
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

/* Input focus state */
.input {
  border: 1px solid var(--color-border);
  transition: border-color var(--duration-fast), box-shadow var(--duration-fast);
}
.input:focus {
  border-color: var(--color-brand);
  box-shadow: 0 0 0 3px var(--color-brand-subtle);
}
```

---

## 6. Information Architecture

### Card Sorting (Mental Model Alignment)
Before building navigation, understand how users categorize your content using card sorting exercises.

### Navigation Patterns
| Pattern               | Use When                                              |
| :-------------------- | :---------------------------------------------------- |
| Top nav bar           | 5–10 primary items, content-heavy site                |
| Sidebar nav           | App with deep hierarchy (admin panels, dashboards)    |
| Bottom tab bar        | Mobile apps with 3–5 core sections                   |
| Breadcrumbs           | 3+ hierarchy levels, e-commerce, documentation        |
| Mega menu             | Large catalogs with 50+ categories                   |

### URL & Page Structure
- URLs should be human-readable: `/projects/analytics-dashboard` not `/p?id=42`
- Deep-link to content: every unique view should have a shareable, bookmarkable URL
- Maintain scroll position and form state on browser back navigation
