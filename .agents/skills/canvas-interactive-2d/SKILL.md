---
name: canvas-interactive-2d
description: >-
  Guide for high-performance 2D HTML5 Canvas graphics, particle physics simulations,
  mouse interactive mesh networks, fluid dynamics, and 60fps rendering loops.
---

# Interactive 2D Canvas Graphics & Particle Systems Skill

HTML5 2D Canvas is ideal for lightweight background effects, interactive particle meshes, custom physics simulations, and dynamic data visualizations.

---

## 1. Canvas Setup & High-DPI Crisp Rendering

```javascript
export class CanvasApp {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 120 };

    this.resize();
    this.initEvents();
    this.animate();
  }

  resize() {
    // Handle High-DPI Retina screens without blur
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.scale(dpr, dpr);
  }

  initEvents() {
    window.addEventListener("resize", () => this.resize());
    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    window.addEventListener("mouseleave", () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }
}
```

---

## 2. Interactive Constellation / Node Particle System

```javascript
class Particle {
  constructor(w, h) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 1.2;
    this.vy = (Math.random() - 0.5) * 1.2;
    this.radius = Math.random() * 2 + 1;
    this.baseAlpha = Math.random() * 0.5 + 0.3;
  }

  update(w, h, mouse) {
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off boundaries
    if (this.x < 0 || this.x > w) this.vx *= -1;
    if (this.y < 0 || this.y > h) this.vy *= -1;

    // Mouse repulsion / interaction
    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        const angle = Math.atan2(dy, dx);
        this.x -= Math.cos(angle) * force * 3;
        this.y -= Math.sin(angle) * force * 3;
      }
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(99, 102, 241, ${this.baseAlpha})`;
    ctx.fill();
  }
}
```

---

## 3. Render Loop & Connecting Lines (Mesh)

```javascript
animate() {
  this.ctx.clearRect(0, 0, this.width, this.height);

  // Update & Draw Particles
  for (let i = 0; i < this.particles.length; i++) {
    this.particles[i].update(this.width, this.height, this.mouse);
    this.particles[i].draw(this.ctx);

    // Draw connection lines between close particles
    for (let j = i + 1; j < this.particles.length; j++) {
      const dx = this.particles[i].x - this.particles[j].x;
      const dy = this.particles[i].y - this.particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        const opacity = (1 - dist / 100) * 0.25;
        this.ctx.beginPath();
        this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
        this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
        this.ctx.strokeStyle = `rgba(165, 180, 252, ${opacity})`;
        this.ctx.lineWidth = 0.8;
        this.ctx.stroke();
      }
    }
  }

  requestAnimationFrame(() => this.animate());
}
```

---

## 4. Performance Tips
- Use offscreen canvas for rendering repetitive static sprite images.
- Limit total particle count to 100-200 on mobile devices.
- Use spatial partitioning (quadtree) if checking collisions for >500 items.
- Always handle `window.devicePixelRatio` scaling.
