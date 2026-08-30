---
name: css-animation
description: >-
  Deep guide for CSS animations, transitions, keyframes, scroll-driven animations,
  View Transitions API, and GPU-optimized motion design. Includes easing curves,
  timing strategies, animation choreography, and accessibility patterns.
---

# CSS Animation & Motion Design Skill

This skill covers the full spectrum of CSS-native animation — from micro-interactions to cinematic scroll sequences — optimized for 60fps performance.

---

## 1. The CSS Animation Mental Model

### Two Core Tools
| Tool            | Use For                                               |
| :-------------- | :---------------------------------------------------- |
| `transition`    | State changes triggered by user actions (hover, focus)|
| `@keyframes`    | Self-contained, auto-playing, multi-step animations   |

### The GPU Rule
Only animate these properties to avoid layout repaints (maintain 60fps):
- ✅ `transform` (translate, scale, rotate, skew)
- ✅ `opacity`
- ✅ `filter` (blur, brightness — use sparingly)
- ❌ `width`, `height`, `top`, `left`, `margin`, `padding` — these trigger layout

---

## 2. Easing Curves — The Soul of Animation

```css
/* Built-in easings — don't use `linear` for UX animations */
transition: ... ease-in;        /* Slow start — good for exits */
transition: ... ease-out;       /* Slow end — good for entrances */
transition: ... ease-in-out;    /* Slow both ends — good for moving across screen */

/* Custom cubic-bezier — use for brand personality */
--ease-out-expo:    cubic-bezier(0.16, 1, 0.3, 1);      /* Snappy, energetic entrance */
--ease-out-back:    cubic-bezier(0.34, 1.56, 0.64, 1);  /* Springy overshoot */
--ease-out-quart:   cubic-bezier(0.25, 1, 0.5, 1);      /* Smooth and refined */
--ease-in-expo:     cubic-bezier(0.7, 0, 0.84, 0);      /* Fast exit */
--ease-spring:      cubic-bezier(0.175, 0.885, 0.32, 1.275); /* Bouncy */
```

> 🔧 Use https://cubic-bezier.com to visually design custom curves.

---

## 3. Core Animation Patterns

### Entrance Animations (Fade + Slide)
```css
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes scale-in {
  from { opacity: 0; transform: scale(0.92); }
  to   { opacity: 1; transform: scale(1); }
}

.animate-fade-up {
  animation: fade-up 0.6s var(--ease-out-expo) forwards;
}

/* Stagger children via CSS custom property delay */
.stagger-children > * {
  opacity: 0;
  animation: fade-up 0.5s var(--ease-out-expo) forwards;
}
.stagger-children > *:nth-child(1) { animation-delay: 0ms; }
.stagger-children > *:nth-child(2) { animation-delay: 80ms; }
.stagger-children > *:nth-child(3) { animation-delay: 160ms; }
.stagger-children > *:nth-child(4) { animation-delay: 240ms; }
```

### Loading / Skeleton Animations
```css
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-surface) 25%,
    rgba(255,255,255,0.06) 50%,
    var(--color-surface) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: var(--radius-md);
}
```

### Pulse / Glow (Status Indicators)
```css
@keyframes pulse-ring {
  0%   { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.6); }
  70%  { box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
  100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
}

.status-live {
  animation: pulse-ring 2s ease-out infinite;
}
```

### Floating / Levitation (Hero Elements)
```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-12px); }
}

.floating {
  animation: float 4s var(--ease-in-out) infinite;
}
```

### Gradient Background Shift
```css
@keyframes gradient-shift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animated-gradient {
  background: linear-gradient(-45deg, #6366f1, #8b5cf6, #06b6d4, #10b981);
  background-size: 400% 400%;
  animation: gradient-shift 8s ease infinite;
}
```

---

## 4. Scroll-Driven Animations (CSS Native — No JS Required)

Available in all modern browsers (Chrome 115+, Firefox 110+, Safari 18+).

```css
/* Fade in as element enters viewport */
@keyframes reveal {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

.scroll-reveal {
  animation: reveal linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 30%;
}

/* Parallax header on scroll */
.parallax-header {
  animation: parallax linear;
  animation-timeline: scroll(root);
}

@keyframes parallax {
  from { transform: translateY(0); }
  to   { transform: translateY(-30%); }
}

/* Progress bar tied to scroll position */
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: var(--color-brand);
  transform-origin: left;
  animation: scaleX linear;
  animation-timeline: scroll(root);
  scale: 0 1;  /* shorthand: scaleX */
}

@keyframes scaleX {
  from { scale: 0 1; }
  to   { scale: 1 1; }
}
```

---

## 5. View Transitions API

For page/route transitions in multi-page apps (MPA) and SPAs:

```css
/* Global — smooth crossfade between page navigations */
@view-transition {
  navigation: auto;
}

/* Custom named transitions for specific elements */
.hero-image {
  view-transition-name: hero-img;
}

/* Customize the animation */
::view-transition-old(hero-img) {
  animation: 300ms ease-in both fade-out;
}

::view-transition-new(hero-img) {
  animation: 400ms ease-out both fade-in;
}

/* Slide transition for page content */
::view-transition-old(root) {
  animation: 350ms both slide-out-left;
}
::view-transition-new(root) {
  animation: 350ms both slide-in-right;
}

@keyframes slide-out-left {
  to { transform: translateX(-100%); }
}
@keyframes slide-in-right {
  from { transform: translateX(100%); }
}
```

---

## 6. Animation Choreography

For complex multi-element sequences, plan the timing before coding:

```
T=0ms    T=100ms   T=200ms   T=350ms   T=600ms
  |         |         |         |         |
 BG        NAV      HERO      BADGE      CARDS
fades in  slides   fades up  pops in   stagger in
          in from  from below
          top
```

### Implementation
```css
.nav      { animation: fade-up 0.5s 0.1s var(--ease-out-expo) both; }
.hero     { animation: fade-up 0.7s 0.2s var(--ease-out-expo) both; }
.badge    { animation: scale-in 0.4s 0.35s var(--ease-out-back) both; }
.card     { animation: fade-up 0.5s both; }
.card:nth-child(1) { animation-delay: 0.6s; }
.card:nth-child(2) { animation-delay: 0.7s; }
.card:nth-child(3) { animation-delay: 0.8s; }
```

---

## 7. Performance Rules

| Rule | Details |
| :--- | :------- |
| **Use `will-change` sparingly** | Only add `will-change: transform` immediately before a long animation starts, remove it after. |
| **Avoid animating too many elements** | Cap GPU-composited layers. Too many `will-change` elements crash mobile GPUs. |
| **Prefer `transform` over position** | `transform: translate()` vs `top/left` — the former is GPU-composited. |
| **Test on low-end devices** | Chrome DevTools → Rendering → "Emulate slow 3G + 6x CPU throttle". |
| **Respect reduced motion** | Always provide a `@media (prefers-reduced-motion: reduce)` override. |
