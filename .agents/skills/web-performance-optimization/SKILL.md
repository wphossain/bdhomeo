---
name: web-performance-optimization
description: >-
  Expert guide for optimizing Next.js and web performance, Core Web Vitals (LCP, INP, CLS),
  next/image migration, bundle size reduction, dynamic imports, and caching strategies.
---

# Web Performance & Optimization Guide

This skill provides step-by-step procedures and rules for optimizing Next.js 15 applications to achieve 95+ Google PageSpeed Insights scores, zero layout shifts, and sub-second page loads.

## 1. Image Optimization (`next/image`)
- Replace standard `<img>` tags with Next.js `<Image />` component.
- Always provide explicit `width`, `height`, or `fill` with `sizes` attribute.
- For Above-The-Fold hero images, set `priority={true}` to improve Largest Contentful Paint (LCP).
- Set `placeholder="blur"` or use SVG shimmer placeholders for background loading.
- Ensure fallback handling when `src` is missing or empty to avoid `src=""` console errors.

## 2. Core Web Vitals (CWV) Standards
- **LCP (Largest Contentful Paint)**: Keep under 1.2 seconds. Preload key fonts and hero images.
- **INP (Interaction to Next Paint)**: Keep under 100ms. Avoid heavy synchronous JavaScript execution on main thread.
- **CLS (Cumulative Layout Shift)**: Target 0.00. Reserve explicit layout height/width for dynamic components, images, and banners.

## 3. Dynamic Imports & Code Splitting
- Dynamically import heavy interactive components (modal dialogs, video players, heavy chart libraries) using `next/dynamic`.
- Use `ssr: false` for client-only widgets (e.g., interactive canvas, heavy sliders) that don't need SEO prerendering.

## 4. Script & Font Preloading
- Load third-party scripts (Google Tag Manager, Analytics, CallRail) using `next/script` with `strategy="lazyOnload"` or `strategy="afterInteractive"`.
- Use `next/font/google` with `display: 'swap'` and `subsets: ['latin']` to prevent FOIT (Flash of Unstyled Text).

## 5. CSS & DOM Reduction
- Eliminate unused CSS classes and reduce DOM element depth.
- Keep total DOM nodes under 1,500 per page.
