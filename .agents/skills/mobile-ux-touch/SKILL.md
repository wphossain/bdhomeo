---
name: mobile-ux-touch
description: >-
  Guidelines for mobile-first user experience, touch target optimization, sticky mobile CTA bars,
  glassmorphism navigation, gesture feedback, and mobile viewport responsive design.
---

# Mobile UX & Touch Optimization Guide

This skill covers design patterns and implementation guidelines for creating exceptional mobile user experiences.

## 1. Touch Targets & Minimum Dimensions
- All interactive buttons, links, toggles, and form inputs must have a minimum touch target size of **44x44 pixels**.
- Maintain minimum 8px spacing between adjacent touch targets to prevent accidental taps.

## 2. Mobile Bottom Navigation & CTA Bars (`MobileCtaBar`)
- Use a sticky, glassmorphic bottom bar for primary conversion actions ("Book Call", "WhatsApp Direct").
- Add `backdrop-blur-md` and subtle top border (`border-t border-white/10` or `border-slate-200`).
- Ensure the bottom bar respects iOS safe areas (`padding-bottom: env(safe-area-inset-bottom)`).

## 3. Mobile Header & Drawer Navigation (`MobileHeader`)
- Provide instant visual feedback on menu toggle (hamburger morphs into X).
- Prevent background body scrolling when mobile navigation drawer is open (`overflow: hidden`).
- Smooth side-slide or fade-in transition with dark backdrop blur overlay.

## 4. Mobile Performance & Viewport Handling
- Set proper `<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />`.
- Prevent horizontal scrollbars (`overflow-x: hidden` on root containers).
- Avoid heavy hover-only states on touch devices; use active state taps (`active:scale-[0.98]`).
