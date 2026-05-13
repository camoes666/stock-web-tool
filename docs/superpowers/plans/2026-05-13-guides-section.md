# Guides Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new `/guides` section with a first averaging-down guide, and connect it from the homepage, navbar, calculator page, and sitemap.

**Architecture:** Keep guide metadata in a small registry under `lib/` so the homepage, guide pages, calculator links, and sitemap all read from one source of truth. Reuse the existing card-heavy page structure and extend `CalculatorLayout` with an optional related-guides area instead of building a separate calculator shell.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Jest, Testing Library

---

### Task 1: Add guide registry coverage first

**Files:**
- Create: `lib/guides.test.ts`

- [ ] Define guide registry expectations before implementation.
- [ ] Verify the new test fails because `@/lib/guides` does not exist yet.

### Task 2: Add calculator layout guide-link coverage

**Files:**
- Create: `components/layout/CalculatorLayout.test.tsx`

- [ ] Add a rendering test for an optional related guides section.
- [ ] Verify the test fails because the section is not implemented yet.

### Task 3: Implement guide registry and guide pages

**Files:**
- Create: `lib/guides.ts`
- Create: `app/guides/page.tsx`
- Create: `app/guides/averaging-down/page.tsx`

- [ ] Add the first guide metadata and helper lookups.
- [ ] Build the guide index page and the first averaging-down detail page.

### Task 4: Connect guides into existing entry points

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/layout/Navbar.tsx`
- Modify: `components/layout/CalculatorLayout.tsx`
- Modify: `app/calculators/multa/page.tsx`
- Modify: `app/sitemap.ts`

- [ ] Surface the first guide on the homepage.
- [ ] Add a navbar entry for `/guides`.
- [ ] Add related guide support to calculator layout and link the multa page.
- [ ] Include guide URLs in the sitemap.

### Task 5: Verify

**Files:**
- Verify only

- [ ] Run focused Jest tests for the new registry and layout behavior.
- [ ] Run the full test suite.
- [ ] Run a production build.
