---
name: nextjs-admin-security
description: >-
  Guidelines for building secure, high-performance CMS admin backends in Next.js,
  route protection, role-based access control, cache revalidation, and smooth administrative UX.
---

# Next.js Secure Admin Backend & CMS Architecture

This skill provides architectural rules and security practices for administrative backends and CMS panels in Next.js 15.

## 1. Route Protection & Middleware Authentication
- Protect all `/admin` routes using Next.js Middleware (`middleware.ts`).
- Validate Supabase session or HTTP-only auth token before rendering admin pages.
- Redirect unauthenticated requests to `/admin/login` with `returnUrl` preservation.

## 2. Server-Only Data Mutations
- Route all database mutations (create, update, delete) through secure server endpoints (`/api/admin`) or Server Actions.
- Wrap data mutations with `getAdminClient()` using `service_role` keys on the server only.
- Validate permission claims on every POST/PUT/DELETE request.

## 3. Cache Revalidation (`revalidatePath`)
- Upon updating blog posts, case studies, or site settings, invoke `revalidatePath()` for affected routes (`/`, `/blog`, `/portfolio`).
- Mark dynamic admin route groups as `export const dynamic = 'force-dynamic'` in `layout.tsx` to prevent static build page data errors.

## 4. Administrative UX & Feedback
- Provide instant loading skeletons (`animate-pulse`) for CMS lists and editors.
- Implement optimistic UI updates or clear toast notifications on saves.
- Provide auto-save or draft preservation for blog and case study rich-text editors.
