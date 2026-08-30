---
name: web-security-hardening
description: >-
  Essential security guidelines for Next.js applications, rate limiting, input sanitization,
  Supabase RLS policies, security headers, and protection against OWASP Top 10 vulnerabilities.
---

# Web Security & Application Hardening

This skill defines mandatory security standards for web applications, API endpoints, and database interactions.

## 1. API Route Security & Rate Limiting
- Enforce IP-based or Token-based rate limiting on all public form endpoints (`/api/contact`, `/api/admin/fallback-login`).
- Set max request payload limits to prevent Denial of Service (DoS) attacks.
- Validate all incoming JSON body properties using strict schema checkers (e.g. Zod or explicit type boundaries).

## 2. Input Sanitization & XSS Prevention
- Sanitize HTML inputs using `isomorphic-dompurify` before rendering rich text content.
- Prevent Cross-Site Scripting (XSS) by eschewing un-sanitized `dangerouslySetInnerHTML`.
- Escape user-generated content in forms and CMS inputs.

## 3. Database Security & Row Level Security (RLS)
- Keep Supabase `service_role` keys strictly on the server (`server-admin.ts`). Never expose `SUPABASE_SERVICE_ROLE_KEY` to client-side code or public environment variables (`NEXT_PUBLIC_`).
- Enforce strict Row Level Security (RLS) policies on public Supabase tables (`anon` read-only, `authenticated` or `service_role` write-only).

## 4. HTTP Security Headers
- Configure security headers in `next.config.ts` or middleware:
  - `X-Frame-Options: DENY` or `SAMEORIGIN` (prevents clickjacking)
  - `X-Content-Type-Options: nosniff` (prevents MIME sniffing)
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Strict-Transport-Security: max-age=31536000; includeSubDomains` (HSTS)
  - `Content-Security-Policy` (CSP) directives restricting unauthorized script execution.

## 5. Auth Cookies & Session Safety
- Admin cookies must be `HttpOnly`, `Secure` (in production), `SameSite=Lax` or `Strict`, with appropriate `maxAge` expiration.
- Invalidate sessions server-side upon logout.
