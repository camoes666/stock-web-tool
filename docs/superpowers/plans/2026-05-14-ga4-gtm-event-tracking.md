# GA4 + GTM Event Tracking Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add reusable analytics instrumentation for the stock calculator site so GA4 can measure calculator usage, CTA clicks, share behavior, and 404 traffic through GTM-managed events.

**Current state:** The site already loads `gtag.js` directly in [app/layout.tsx](/C:/Users/USER/code/stock-web-tool/app/layout.tsx:1) using `NEXT_PUBLIC_GA_ID`. There is no GTM container script yet, no shared analytics utility, and no calculator-level event instrumentation.

**Recommendation:** Keep GA4 as the reporting destination, but move event orchestration to `dataLayer -> GTM -> GA4`. Use a small typed client helper in `lib/` so calculator components do not embed raw `window.dataLayer.push(...)` calls everywhere.

**Tech stack:** Next.js App Router, React 19, TypeScript, GA4, GTM

---

### Target Event Set

Ship the first analytics slice with these five events:

- `calculator_view`
  Triggered once when a calculator page is viewed.
- `calculator_run`
  Triggered when a valid calculation completes and result state is updated.
- `calculator_result_copy`
  Triggered when a user copies calculator output.
- `cta_click`
  Triggered when a user clicks related tool cards, guide cards, contact links, or other business CTA links.
- `error_view_404`
  Triggered when a 404 page is rendered.

Use the following standard event params where relevant:

- `page_path`
- `page_title`
- `calculator_name`
- `calculator_category`
- `cta_name`
- `cta_location`
- `share_type`
- `copy_type`
- `referrer`

---

### Architecture

1. Add a client-safe analytics helper under `lib/analytics.ts`.
2. Define typed helper functions such as `trackCalculatorView`, `trackCalculatorRun`, and `trackCtaClick`.
3. Make the helper push plain objects into `window.dataLayer`.
4. Replace the direct GA bootstrap in [app/layout.tsx](/C:/Users/USER/code/stock-web-tool/app/layout.tsx:1) with GTM container loading once `NEXT_PUBLIC_GTM_ID` is available.
5. Keep the implementation resilient when GTM is not configured by making the helper no-op on the server and when `window` is unavailable.
6. Instrument calculator components at the moment a successful result is produced rather than at raw button-click time so invalid submissions do not inflate usage metrics.
7. Instrument shared UI surfaces such as calculator cards and related links through existing reusable components where possible.

Recommended payload shape:

```ts
type DataLayerEvent = {
  event: string
  page_path?: string
  page_title?: string
  calculator_name?: string
  calculator_category?: string
  cta_name?: string
  cta_location?: string
  copy_type?: string
  share_type?: string
  referrer?: string
}
```

---

### File Plan

#### Task 1: Add analytics utility and types first

**Files:**
- Create: `lib/analytics.ts`

- [ ] Declare a `Window` type extension for `dataLayer`.
- [ ] Add a small `pushEvent` helper that safely exits during SSR.
- [ ] Add typed wrappers for the first analytics events:
  - `trackCalculatorView`
  - `trackCalculatorRun`
  - `trackCalculatorResultCopy`
  - `trackCtaClick`
  - `track404View`
- [ ] Ensure each helper auto-includes `page_path` and `page_title` from `window.location` and `document.title` when available.

#### Task 2: Switch bootstrap from direct GA to GTM

**Files:**
- Modify: `app/layout.tsx`

- [ ] Replace the direct `gtag.js` loader with GTM container loading using `NEXT_PUBLIC_GTM_ID`.
- [ ] Keep the existing GA measurement ID only if GTM rollout needs a temporary fallback.
- [ ] Initialize `window.dataLayer` before GTM loads.
- [ ] Document environment variables in code comments only if setup would otherwise be unclear.

Recommended env vars:

- `NEXT_PUBLIC_GTM_ID`
- Optional temporary fallback: `NEXT_PUBLIC_GA_ID`

If migration risk feels high, do this in two phases:

1. Keep the current GA bootstrap and add `dataLayer` event pushes first.
2. Move script ownership fully to GTM after DebugView and GTM Preview validation pass.

#### Task 3: Instrument calculator page views

**Files:**
- Modify:
  - `components/calculators/MultaCalculator.tsx`
  - `components/calculators/ReturnRateCalculator.tsx`
  - `components/calculators/DividendCalculator.tsx`
  - `components/calculators/DividendReinvestCalculator.tsx`
  - `components/calculators/CompoundReturnCalculator.tsx`
  - `components/calculators/TargetPriceCalculator.tsx`
  - `components/calculators/FairValueCalculator.tsx`
  - `components/calculators/AveragingDownTargetCalculator.tsx`

- [ ] Add a mount-time `useEffect` in each calculator component to send `calculator_view`.
- [ ] Use the slug already implied by each file as `calculator_name`.
- [ ] Standardize category values. For this app, use `stock` for all current calculator tools unless a more granular grouping is added later.

Suggested calculator names:

- `multa`
- `return-rate`
- `dividend`
- `dividend-reinvest`
- `compound-return`
- `target-price`
- `fair-value`
- `averaging-down-target`

#### Task 4: Instrument successful calculations

**Files:**
- Modify the same eight calculator components listed above.

- [ ] Fire `calculator_run` only after validation passes and result state is set.
- [ ] Do not fire on invalid inputs.
- [ ] Pass `calculator_name` and `calculator_category`.
- [ ] Optionally include `input_count` if the team wants to compare calculator complexity later.

Implementation note:

- Prefer a small local helper inside each calculator component if the event call is one line.
- If the calculation flow becomes repetitive, factor a shared callback pattern later. Do not block the first rollout on over-abstraction.

#### Task 5: Add result-copy instrumentation where copy UX exists

**Files:**
- Modify whichever calculator or shared components introduce result-copy UI
- Possibly modify: `components/calculators/shared.tsx`

- [ ] If copy actions do not exist yet, do not invent them just for analytics.
- [ ] When a copy button is added, fire `calculator_result_copy` after copy success.
- [ ] Use `copy_type: "result"` for the initial rollout.

This task is intentionally conditional. The current codebase does not yet show a shared copy action.

#### Task 6: Instrument CTA clicks through shared components

**Files:**
- Modify:
  - `components/home/ToolCard.tsx`
  - `components/guides/GuideCard.tsx`
  - `components/layout/Navbar.tsx`
  - `components/layout/CalculatorLayout.tsx`
  - `app/page.tsx`
  - `app/contact/page.tsx` if there are meaningful outbound/contact CTAs

- [ ] Fire `cta_click` for homepage tool-card clicks.
- [ ] Fire `cta_click` for guide-card clicks.
- [ ] Fire `cta_click` for related guide and related tool links inside calculator pages.
- [ ] Fire `cta_click` for top navigation items only if the team wants funnel visibility beyond calculator usage.
- [ ] Standardize `cta_location` values, for example:
  - `home-featured`
  - `home-secondary`
  - `calculator-related-tools`
  - `calculator-related-guides`
  - `navbar`
  - `footer`

Recommended `cta_name` examples:

- `tool-multa`
- `tool-return-rate`
- `guide-averaging-down`
- `nav-guides`
- `nav-contact`

#### Task 7: Add 404 event coverage

**Files:**
- Create or modify: `app/not-found.tsx`

- [ ] If `app/not-found.tsx` does not exist, create it.
- [ ] Fire `error_view_404` on render.
- [ ] Include `referrer` and the current `page_path`.
- [ ] Keep the page user-friendly, but do not expand scope into a larger design pass unless needed.

#### Task 8: Add minimal test coverage for analytics contracts

**Files:**
- Create: `lib/analytics.test.ts`
- Modify existing component tests only where lightweight and valuable

- [ ] Verify the analytics helper safely no-ops without `window`.
- [ ] Verify `pushEvent` appends objects to `window.dataLayer`.
- [ ] Verify wrapper helpers produce the expected `event` names and params.
- [ ] Avoid brittle DOM-event tests for every calculator if unit-level helper coverage plus one representative component test is enough.

---

### GTM Configuration Plan

Configure GTM after the code-level `dataLayer` events exist.

#### GTM Variables

- [ ] Data Layer Variable: `calculator_name`
- [ ] Data Layer Variable: `calculator_category`
- [ ] Data Layer Variable: `cta_name`
- [ ] Data Layer Variable: `cta_location`
- [ ] Data Layer Variable: `copy_type`
- [ ] Data Layer Variable: `referrer`
- [ ] Built-in Variables: Click URL, Page Path, Page URL, Page Title

#### GTM Triggers

- [ ] Custom Event: `calculator_view`
- [ ] Custom Event: `calculator_run`
- [ ] Custom Event: `calculator_result_copy`
- [ ] Custom Event: `cta_click`
- [ ] Custom Event: `error_view_404`

#### GTM Tags

- [ ] GA4 Event tag for `calculator_view`
- [ ] GA4 Event tag for `calculator_run`
- [ ] GA4 Event tag for `calculator_result_copy`
- [ ] GA4 Event tag for `cta_click`
- [ ] GA4 Event tag for `error_view_404`

#### GA4 Conversions

Mark these as conversions first:

- [ ] `calculator_run`
- [ ] `cta_click`
- [ ] `calculator_result_copy` once copy UI is live

Do not mark `calculator_view` as a conversion.

---

### Verification

**Files:**
- Verify only

- [ ] Run `npm test -- analytics` or equivalent focused Jest coverage if test naming supports it.
- [ ] Run the full test suite if analytics touches shared components.
- [ ] Run the Next.js production build.
- [ ] Use GTM Preview mode to confirm each custom event appears with the expected payload.
- [ ] Use GA4 DebugView to confirm events arrive with params.
- [ ] Click through at least one calculator flow, one homepage CTA, and one 404 URL manually.

Manual verification checklist:

1. Visit `/calculators/multa` and confirm `calculator_view`.
2. Complete a valid calculation and confirm `calculator_run`.
3. Click a related tool or guide and confirm `cta_click`.
4. Visit a fake URL like `/does-not-exist` and confirm `error_view_404`.

---

### Rollout Notes

- Start with one representative calculator such as `multa` if the team wants a safer vertical slice.
- Once the event contract is validated, apply the same instrumentation pattern to the remaining calculators.
- Keep naming stable after rollout; changing event names later makes historical reporting messy.
- Prefer adding new params over renaming existing ones.

---

### Assumptions

- The team wants GTM as the long-term tag manager even though GA is currently loaded directly.
- The site does not yet have meaningful share/copy UI across all calculators, so those events may roll out later than `calculator_view` and `calculator_run`.
- Existing Korean text encoding issues in some files are unrelated to analytics work and should not be refactored as part of this task.
