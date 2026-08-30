---
name: svg-animation-micro
description: >-
  Guide for interactive SVG animations, vector path morphing, SVG line drawing,
  CSS keyframe animation on SVG attributes, stroke-dashoffset techniques, and Lottie/Rive workflows.
---

# SVG Animation & Micro-Interactions Skill

Scalable Vector Graphics (SVG) offer resolution-independent vector illustrations and icons that can be stylized, morphed, and animated via CSS and JavaScript.

---

## 1. SVG Line Drawing (Stroke-Dashoffset Technique)

Animate an SVG path as if it is being drawn live on screen.

```html
<svg viewBox="0 0 100 100" class="draw-icon">
  <path
    id="check-mark"
    d="M20 50 L40 70 L80 30"
    fill="none"
    stroke="#6366f1"
    stroke-width="6"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
```

```css
.draw-icon path {
  /* Set path length (can be calculated dynamically with path.getTotalLength()) */
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: drawLine 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes drawLine {
  to {
    stroke-dashoffset: 0;
  }
}
```

### Dynamic JavaScript Path Length Setup
```javascript
const path = document.querySelector("#check-mark");
const length = path.getTotalLength();

path.style.strokeDasharray = length;
path.style.strokeDashoffset = length;

// Trigger animation
path.getBoundingClientRect(); // Force reflow
path.style.transition = "stroke-dashoffset 1s ease-in-out";
path.style.strokeDashoffset = "0";
```

---

## 2. Interactive SVG Button Micro-Interactions

```html
<button class="icon-btn">
  <svg class="heart-icon" viewBox="0 0 24 24" width="24" height="24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
  <span>Like</span>
</button>
```

```css
.heart-icon {
  fill: transparent;
  stroke: var(--color-text-muted);
  stroke-width: 2;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
              fill 0.3s ease,
              stroke 0.3s ease;
}

.icon-btn:hover .heart-icon {
  transform: scale(1.15);
  stroke: #ef4444;
}

.icon-btn.active .heart-icon {
  fill: #ef4444;
  stroke: #ef4444;
  animation: popHeart 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes popHeart {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.4); }
  100% { transform: scale(1); }
}
```

---

## 3. SVG Path Morphing (GSAP MorphSVG or CSS d attribute)

Modern browsers support animating the CSS `d` path attribute directly if vertex counts match:

```css
.morph-shape {
  d: path("M10 80 Q 52.5 10, 95 80 T 180 80");
  transition: d 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.morph-container:hover .morph-shape {
  d: path("M10 80 Q 52.5 90, 95 80 T 180 80");
}
```

---

## 4. Lottie & Rive Web Integration

### Lottie Web Setup
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js"></script>
<div id="lottie-container" style="width: 200px; height: 200px;"></div>

<script>
  const animation = lottie.loadAnimation({
    container: document.getElementById("lottie-container"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "/assets/success-animation.json"
  });
</script>
```

### Rive Web Canvas Integration
```html
<canvas id="rive-canvas" width="300" height="300"></canvas>
<script src="https://unpkg.com/@rive-app/canvas@latest"></script>
<script>
  const r = new rive.Rive({
    src: "/assets/interactive-character.riv",
    canvas: document.getElementById("rive-canvas"),
    autoplay: true,
    stateMachines: "State Machine 1",
    onLoad: () => {
      r.resizeDrawingSurfaceToCanvas();
    },
  });
</script>
```
