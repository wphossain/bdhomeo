---
name: framer-motion-react
description: >-
  Comprehensive guide for Framer Motion and Motion.dev in React and modern JS.
  Covers variants, layout animations, AnimatePresence, drag gestures, scroll-linked motion, and performance tuning.
---

# Framer Motion & Motion.dev Skill

Framer Motion (and Motion.dev) is the leading animation library for React and modern JavaScript interfaces, offering declarative animation, gesture handling, and layout transitions.

---

## 1. Declarative Motion & Variants

### Basic Motion Component
```tsx
import { motion } from "framer-motion";

export function HeroCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <h2>Interactive Card</h2>
    </motion.div>
  );
}
```

### Staggered Variants Pattern
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export function FeatureGrid({ items }) {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid">
      {items.map((item, idx) => (
        <motion.div key={idx} variants={itemVariants} className="card">
          {item.title}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

---

## 2. Unmounting Animations with `AnimatePresence`

```tsx
import { motion, AnimatePresence } from "framer-motion";

export function Modal({ isOpen, onClose, children }) {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal-backdrop"
          onClick={onClose}
        >
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

---

## 3. Shared Layout Animations (`layoutId`)

Smoothly animate elements moving between different containers or states (e.g. active tab indicators).

```tsx
export function Tabs({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="tab-list">
      {tabs.map((tab) => (
        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="tab">
          {tab.label}
          {activeTab === tab.id && (
            <motion.div
              layoutId="active-pill"
              className="active-indicator"
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
```

---

## 4. Gestures & Drag Controls

```tsx
export function DraggableCard() {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
      dragElastic={0.2}
      whileDrag={{ scale: 1.05, cursor: "grabbing" }}
      className="draggable-box"
    >
      Drag Me Around
    </motion.div>
  );
}
```

---

## 5. Scroll-Linked Motion (`useScroll` & `useTransform`)

```tsx
import { motion, useScroll, useTransform } from "framer-motion";

export function ParallaxHeader() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.div style={{ y, opacity }} className="hero-background">
      <h1>Parallax Banner</h1>
    </motion.div>
  );
}
```

---

## 6. Performance Optimization
- Use `layout` sparingly on large DOM trees to avoid layout thrashing.
- Animate `transform` and `opacity` properties using hardware acceleration.
- Use `willChange` prop or CSS `will-change` on complex animated elements.
