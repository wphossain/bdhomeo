---
name: ui-design-system
description: >-
  Deep guide for building scalable UI design systems using CSS custom properties,
  design tokens, typography scales, color theory, and component architecture.
  Covers the full pipeline from Figma design to production code.
---

# UI Design System Skill

This skill teaches how to build and maintain a production-grade design system for web applications — from token architecture to reusable component patterns.

---

## 1. Design Token Architecture

Design tokens are the atomic source of truth for your design system. They replace hardcoded values with semantic names.

### Token Hierarchy (3 Layers)

```
Primitive Tokens     →    Semantic Tokens     →    Component Tokens
(Raw values)              (Contextual meaning)      (Specific use)
------------------         ----------------         ----------------
--color-indigo-500         --color-brand-primary     --btn-bg-color
--space-4                  --spacing-section-gap     --card-padding
--font-size-lg             --text-body-size          --label-font-size
```

### Implementing Tokens with CSS Custom Properties

```css
/* _tokens.css — Single source of truth */
:root {
  /* === PRIMITIVE: Color Palette === */
  --hue-brand: 245;
  --color-indigo-400: hsl(var(--hue-brand), 80%, 70%);
  --color-indigo-500: hsl(var(--hue-brand), 72%, 60%);
  --color-indigo-600: hsl(var(--hue-brand), 68%, 50%);

  /* === SEMANTIC: Intent-based === */
  --color-brand:         var(--color-indigo-500);
  --color-brand-hover:   var(--color-indigo-600);
  --color-brand-subtle:  hsl(var(--hue-brand), 72%, 60%, 0.12);

  /* === PRIMITIVE: Spacing (4pt grid) === */
  --space-1: 0.25rem;  /* 4px  */
  --space-2: 0.5rem;   /* 8px  */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */

  /* === TYPOGRAPHY SCALE (Major Third: 1.250) === */
  --text-xs:   0.64rem;
  --text-sm:   0.8rem;
  --text-base: 1rem;
  --text-lg:   1.25rem;
  --text-xl:   1.563rem;
  --text-2xl:  1.953rem;
  --text-3xl:  2.441rem;
  --text-4xl:  3.052rem;

  /* === ELEVATION / SHADOW === */
  --shadow-sm:  0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  --shadow-md:  0 4px 6px -1px rgba(0,0,0,0.3), 0 2px 4px -2px rgba(0,0,0,0.3);
  --shadow-lg:  0 10px 25px -5px rgba(0,0,0,0.4), 0 8px 10px -6px rgba(0,0,0,0.4);
  --shadow-glow: 0 0 20px rgba(99, 102, 241, 0.3);

  /* === RADIUS === */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  /* === TIMING === */
  --duration-fast:   150ms;
  --duration-base:   250ms;
  --duration-slow:   400ms;
  --duration-slower: 700ms;

  /* === EASING === */
  --ease-out-expo:   cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-back:   cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-in-out:     cubic-bezier(0.645, 0.045, 0.355, 1);
  --ease-spring:     cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
```

---

## 2. Color Theory for UI

### Building a Palette from a Single Hue
```css
/* Generate a full palette from one HSL hue using lightness steps */
--palette-50:  hsl(245, 100%, 97%);
--palette-100: hsl(245, 95%,  93%);
--palette-200: hsl(245, 90%,  85%);
--palette-300: hsl(245, 85%,  75%);
--palette-400: hsl(245, 80%,  65%);
--palette-500: hsl(245, 72%,  55%);  /* Primary */
--palette-600: hsl(245, 68%,  46%);  /* Hover */
--palette-700: hsl(245, 65%,  38%);
--palette-800: hsl(245, 60%,  28%);
--palette-900: hsl(245, 55%,  18%);
```

### Contrast Rule (WCAG AA)
- Normal text on background: minimum **4.5:1**
- Large text (18px+ bold): minimum **3:1**
- UI components and focus indicators: minimum **3:1**
- Use tool: https://webaim.org/resources/contrastchecker/

### Dark Mode Toggle Pattern
```css
[data-theme="dark"] {
  --color-bg:      hsl(220, 25%, 8%);
  --color-surface: hsl(220, 20%, 12%);
  --color-border:  hsl(220, 15%, 20%);
  --color-text:    hsl(220, 15%, 90%);
  --color-muted:   hsl(220, 10%, 55%);
}

[data-theme="light"] {
  --color-bg:      hsl(0, 0%, 100%);
  --color-surface: hsl(220, 30%, 97%);
  --color-border:  hsl(220, 15%, 88%);
  --color-text:    hsl(220, 25%, 10%);
  --color-muted:   hsl(220, 10%, 45%);
}
```

---

## 3. Typography System

```css
/* Use a fluid type scale with clamp() for responsive typography */
.text-hero {
  font-size: clamp(2.5rem, 5vw + 1rem, 4.5rem);
  line-height: 1.1;
  letter-spacing: -0.03em;
  font-weight: 800;
}

.text-title   { font-size: clamp(1.5rem, 3vw, 2.25rem); font-weight: 700; }
.text-heading { font-size: clamp(1.2rem, 2vw, 1.75rem); font-weight: 600; }
.text-body    { font-size: 1rem;   line-height: 1.65; }
.text-small   { font-size: 0.875rem; line-height: 1.5; }
.text-xs      { font-size: 0.75rem;  letter-spacing: 0.02em; }

/* Font pairing strategy */
/* Heading: Outfit / Syne / Cal Sans (display, high contrast weight) */
/* Body:    Inter / DM Sans / Plus Jakarta Sans (neutral, readable) */
/* Mono:    JetBrains Mono / Fira Code (for code snippets) */
```

---

## 4. Component Architecture Principles

### The Variant Pattern
```css
/* Base component */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: var(--text-sm);
  transition: all var(--duration-base) var(--ease-out-expo);
  cursor: pointer;
  border: 1px solid transparent;
}

/* Variants via data attributes (preferred) or modifier classes */
.btn[data-variant="primary"]  { background: var(--color-brand); color: white; }
.btn[data-variant="outline"]  { border-color: var(--color-border); background: transparent; }
.btn[data-variant="ghost"]    { background: transparent; color: var(--color-brand); }
.btn[data-size="sm"]          { padding: var(--space-1) var(--space-3); font-size: var(--text-xs); }
.btn[data-size="lg"]          { padding: var(--space-3) var(--space-6); font-size: var(--text-base); }
```

---

## 5. Spacing System (4pt Grid)

All spacing values should be multiples of 4px. This creates visual harmony and rhythm.

| Token       | Value   | Common Use                   |
| :---------- | :------ | :--------------------------- |
| `--space-1` | 4px     | Tight gaps, icon padding     |
| `--space-2` | 8px     | Button padding (vertical)    |
| `--space-3` | 12px    | Input padding, small gaps    |
| `--space-4` | 16px    | Default padding, list gaps   |
| `--space-6` | 24px    | Card padding, section gaps   |
| `--space-8` | 32px    | Large component gaps         |
| `--space-12`| 48px    | Section vertical padding     |
| `--space-16`| 64px    | Page section spacing         |
| `--space-24`| 96px    | Hero section padding         |

---

## 6. Figma → Code Workflow

1. **Establish tokens in Figma** using the Tokens Studio plugin or Variables panel.
2. **Export tokens** as JSON (use the Figma MCP server to pull them directly).
3. **Transform with Style Dictionary** to generate CSS custom properties.
4. **Validate** rendered output against Figma specs using pixel-perfect comparison tools.
5. **Document** every token and component in a living Storybook or standalone design docs page.
