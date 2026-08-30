---
name: gsap-animation
description: >-
  Production-grade GSAP (GreenSock Animation Platform) guide for web developers.
  Covers Tweens, Timelines, ScrollTrigger, Flip, MotionPath, and integration
  with vanilla JS and React. Includes choreography patterns and performance strategy.
---

# GSAP Animation Skill

GSAP is the industry-standard JavaScript animation engine powering high-performance, production-grade web animations. This skill covers real-world usage patterns used by award-winning websites.

---

## 1. Core Concepts

### Tween — Single Property Animation
```javascript
// gsap.to() — animate FROM current state TO target
gsap.to(".hero-title", {
  y: 0,
  opacity: 1,
  duration: 0.8,
  ease: "expo.out",
  delay: 0.2
});

// gsap.from() — animate FROM values TO current state
gsap.from(".card", {
  y: 40,
  opacity: 0,
  duration: 0.6,
  ease: "power3.out"
});

// gsap.fromTo() — explicit start and end values
gsap.fromTo(".badge",
  { scale: 0, opacity: 0 },
  { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
);
```

### Easing Reference
```javascript
// Standard easings
"none"           // Linear
"power1.out"     // Gentle ease out
"power2.out"     // Medium ease out (good default)
"power3.out"     // Strong ease out
"power4.out"     // Very strong ease out
"expo.out"       // Exponential — snappy, energetic
"circ.out"       // Circular — very fast end
"back.out(1.7)"  // Overshoot / spring
"elastic.out(1, 0.3)" // Bouncy elastic
"bounce.out"     // Bouncing ball

// Direction variants: .in | .out | .inOut
"power2.inOut"   // For elements moving across screen
```

---

## 2. Timelines — Choreographing Sequences

```javascript
// Basic timeline
const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.7 } });

tl
  .from(".header",     { y: -60, opacity: 0 })
  .from(".hero-badge", { scale: 0, opacity: 0, ease: "back.out(2)" }, "-=0.3")
  .from(".hero-title", { y: 40, opacity: 0 }, "-=0.4")
  .from(".hero-sub",   { y: 20, opacity: 0 }, "-=0.4")
  .from(".hero-cta",   { y: 20, opacity: 0 }, "-=0.3")
  .from(".cards > *",  { y: 30, opacity: 0, stagger: 0.1 }, "-=0.2");
```

### Timeline Position Notation
```javascript
tl.from(".el", opts)        // After previous
tl.from(".el", opts, "+=0.5") // 0.5s after previous ends
tl.from(".el", opts, "-=0.3") // 0.3s before previous ends (overlap)
tl.from(".el", opts, "0.5")   // At exactly 0.5s from start of timeline
tl.from(".el", opts, "<")     // Same start as previous
tl.from(".el", opts, "<0.2")  // 0.2s after previous START
```

---

## 3. ScrollTrigger — Scroll-Powered Animations

```javascript
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Fade in as section enters viewport
gsap.from(".section-title", {
  y: 50,
  opacity: 0,
  duration: 1,
  ease: "expo.out",
  scrollTrigger: {
    trigger: ".section-title",
    start: "top 85%",     // When top of element hits 85% from top of viewport
    end: "bottom 20%",
    toggleActions: "play none none reverse", // onEnter, onLeave, onEnterBack, onLeaveBack
  }
});

// Pin element during scroll (for storytelling sequences)
ScrollTrigger.create({
  trigger: ".sticky-section",
  start: "top top",
  end: "+=600px",        // Pin for 600px of scroll distance
  pin: true,
  pinSpacing: true,
});

// Scrub animation (animate in sync with scroll position)
gsap.to(".hero-parallax", {
  yPercent: -30,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true,         // true = snap to scroll, number = lag in seconds
  }
});

// Batch — animate groups as they scroll into view
ScrollTrigger.batch(".card", {
  onEnter: elements => {
    gsap.from(elements, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
    });
  },
  once: true,  // Only animate once
  start: "top 90%",
});
```

---

## 4. FLIP Plugin — Smooth Layout Transitions

FLIP (First, Last, Invert, Play) enables buttery-smooth transitions when elements change position, size, or parent in the DOM.

```javascript
import { Flip } from "gsap/Flip";
gsap.registerPlugin(Flip);

// Capture the current state BEFORE DOM changes
const state = Flip.getState(".cards .card");

// Make your DOM changes (move, resize, reorder, filter)
filteredContainer.appendChild(targetCard);

// Animate from old state to new state
Flip.from(state, {
  duration: 0.7,
  ease: "power3.out",
  stagger: 0.05,
  absolute: true,  // Use position: absolute during the transition
  onLeave: elements => gsap.to(elements, { opacity: 0, scale: 0.8, duration: 0.4 }),
  onEnter: elements => gsap.from(elements, { opacity: 0, scale: 0.8, duration: 0.4 }),
});
```

---

## 5. High-Performance Patterns

### `gsap.quickTo()` — For Frequent Updates (Mouse Tracking)
```javascript
// Instead of calling gsap.to() on every mousemove (expensive):
const xTo = gsap.quickTo(".cursor", "x", { duration: 0.3, ease: "power3" });
const yTo = gsap.quickTo(".cursor", "y", { duration: 0.3, ease: "power3" });

document.addEventListener("mousemove", e => {
  xTo(e.clientX);
  yTo(e.clientY);
});
```

### `gsap.ticker` — Syncing with the Render Loop
```javascript
// Add a function to GSAP's render tick (synced with requestAnimationFrame)
gsap.ticker.add(time => {
  // Called every frame — use for continuous updates
  mesh.rotation.y = time * 0.5;
});

// Remove when done
gsap.ticker.remove(myFunction);
```

### Cleanup (Critical for SPAs / React)
```javascript
// React useEffect cleanup
useEffect(() => {
  const ctx = gsap.context(() => {
    // All GSAP animations created inside here are scoped
    gsap.from(".hero", { opacity: 0, y: 40, duration: 1 });

    ScrollTrigger.create({ /* ... */ });
  }, containerRef); // Scope to containerRef

  return () => ctx.revert(); // Kill all animations on unmount
}, []);
```

---

## 6. Text Animation Patterns

```javascript
// Word-by-word reveal (requires splitting text manually or with SplitText plugin)
const words = document.querySelectorAll(".split-word");

gsap.from(words, {
  y: "100%",
  opacity: 0,
  duration: 0.6,
  ease: "power3.out",
  stagger: 0.05,
  scrollTrigger: {
    trigger: ".text-container",
    start: "top 80%",
    once: true,
  }
});

// Typewriter counter animation
gsap.to({ val: 0 }, {
  val: 2500,
  duration: 2.5,
  ease: "power2.out",
  onUpdate: function() {
    document.querySelector(".counter").textContent =
      Math.round(this.targets()[0].val).toLocaleString();
  }
});
```

---

## 7. Three.js + GSAP Integration

```javascript
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// GSAP can animate ANY numeric property on a Three.js object
const mesh = new THREE.Mesh(geometry, material);

// Animate on load
gsap.from(mesh.rotation, {
  y: Math.PI * 2,
  duration: 2,
  ease: "expo.out",
});

// Scroll-driven 3D rotation
gsap.to(mesh.rotation, {
  y: Math.PI * 2,
  ease: "none",
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: 1,
  }
});

// Mouse parallax on a 3D object
const xTo = gsap.quickTo(mesh.rotation, "y", { duration: 0.6, ease: "power2" });
const yTo = gsap.quickTo(mesh.rotation, "x", { duration: 0.6, ease: "power2" });

document.addEventListener("mousemove", e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 0.5;
  const y = (e.clientY / window.innerHeight - 0.5) * 0.3;
  xTo(x);
  yTo(y);
});
```

---

## 8. Accessibility — `prefers-reduced-motion`

```javascript
// Always check before running heavy animations
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  // Run full animation
  gsap.from(".hero", { opacity: 0, y: 60, duration: 1 });
} else {
  // Simplified or instant transition
  gsap.set(".hero", { opacity: 1, y: 0 });
}

// Or configure GSAP globally
if (prefersReducedMotion) {
  gsap.globalTimeline.timeScale(100); // Fast-forward all animations
}
```
