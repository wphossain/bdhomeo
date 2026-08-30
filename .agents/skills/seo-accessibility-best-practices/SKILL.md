---
name: seo-accessibility-best-practices
description: >-
  Comprehensive guidelines for Search Engine Optimization (SEO), OpenGraph social metadata,
  JSON-LD Schema, and WCAG 2.2 Level AA accessibility compliance.
---

# SEO & Accessibility Best Practices

This skill outlines mandatory requirements for search engine visibility, social sharing preview cards, and accessible user interfaces for all users.

## 1. Search Engine Optimization (SEO)
- **Title Tags**: Unique, keyword-optimized title tag per page (under 60 characters).
- **Meta Descriptions**: Compelling summary (140–160 characters) with direct call-to-action.
- **Canonical URLs**: Define `metadataBase` and explicit canonical URLs to eliminate duplicate content issues.
- **Semantic HTML Structure**: Single `<h1>` per page, logical `<section>`, `<article>`, `<header>`, `<footer>`, `<nav>` hierarchy.
- **Sitemap & Robots**: Maintain dynamic `sitemap.ts` and `robots.ts` with correct crawl directives.

## 2. Dynamic OpenGraph & Social Cards
- Provide high-resolution `og:image` (1200x630px) for Facebook, LinkedIn, Twitter/X.
- Include `og:title`, `og:description`, `og:type`, and `twitter:card` ("summary_large_image").

## 3. JSON-LD Structured Data (Schema.org)
- Implement schema for:
  - **LocalBusiness** / **HomeAndConstructionBusiness**: Address, phone, rating, opening hours, geographic coordinates.
  - **Person**: Owner/Specialist credentials, job title, social profiles (`sameAs`).
  - **Service**: Service offerings, price ranges, target audience.
  - **FAQPage**: Question & Answer pairs for Google Rich Snippets.

## 4. WCAG 2.2 Level AA Accessibility
- **Color Contrast**: Minimum 4.5:1 contrast ratio for standard text, 3:1 for large headers.
- **Focus Rings**: Clear, visible focus indicators (`focus-visible:ring-2 focus-visible:ring-[#1a73e8]`) for keyboard navigation.
- **ARIA Attributes**: Add `aria-label`, `aria-expanded`, `aria-controls`, and `aria-hidden` to interactive elements, icons, and collapsible menus.
- **Screen Reader Support**: Provide `alt` text for images and descriptive text for non-textual links.
