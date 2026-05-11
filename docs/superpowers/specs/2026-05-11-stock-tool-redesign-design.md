# Stock Web Tool Redesign Design

## Overview

This redesign refreshes the current stock calculator project into a hybrid product experience:

- The homepage should feel more premium and editorial than the current landing page.
- The primary job of the site remains fast calculator selection and immediate use.
- Calculator detail pages should become calmer, more task-focused, and easier to scan.

The redesign is intentionally visual and structural only. It does not change the calculator formulas, routing model, or core user flows.

## Goals

- Make the homepage feel intentionally designed instead of a generic card grid.
- Help users choose a calculator faster by promoting the highest-frequency tools first.
- Create a consistent visual system across home and calculator pages.
- Improve readability of inputs, outputs, and explanatory content.
- Preserve mobile usability and low-friction access.

## Non-Goals

- No change to calculator business logic.
- No new calculators in this phase.
- No account system, watchlist, or market-data integration.
- No major SEO architecture changes beyond copy and presentation updates already supported by the current app structure.

## Product Direction

The approved product direction is:

- Tone: hybrid between practical investment utility and premium editorial landing page
- Homepage priority: fastest possible calculator entry
- Homepage curation logic: frequency-of-use first
- Recommended homepage structure: asymmetric curation

This means the site should look more distinctive while still behaving like a quick utility product.

## Information Architecture

### Homepage

The homepage will be reorganized into four layers:

1. First-view asymmetric hero
2. Primary calculator curation
3. Secondary calculator browse area
4. Trust and explanatory content

The first view is not a centered marketing hero. It is a left-aligned, asymmetric composition with immediate calculator entry points.

### Calculator Detail Pages

Each calculator page will be organized into four layers:

1. Compact page intro
2. Input and result workspace
3. Supporting interpretation content
4. Related tools and monetization placements

The detail page should prioritize action over reading.

## Homepage Design

### First View

The homepage first view should contain:

- A left-aligned headline with a short supporting paragraph
- A curated block of top calculators placed prominently in the same viewport
- A visual hierarchy that makes the first click obvious

The homepage should not make users scroll before they can choose a tool.

### Calculator Priority

The prominent calculators in the first view are:

- `multa`
- `return-rate`
- `target-price`

These should receive the largest visual treatment because they best match the selected frequency-first strategy.

### Secondary Browse Area

The remaining calculators should appear below the curated area in a more compact browse section:

- `dividend`
- `fair-value`
- `averaging-down-target`
- `compound-return`
- `dividend-reinvest`

This section should remain easy to scan, but visually subordinate to the top three tools.

### Trust Section

Explanatory copy, caveats, and trust-building content should move below the primary calculator-selection areas. The site should first help the user choose a tool, then explain limitations and usage context.

## Calculator Detail Page Design

### Header

Each calculator page should begin with:

- Calculator title
- One-line explanation
- Minimal context only

The page should avoid large introductory blocks that delay interaction.

### Workspace Layout

Desktop layout should use an asymmetric two-column workspace:

- Left: input form
- Right: result panel

Mobile layout should collapse into a single column without horizontal stress.

### Result Presentation

Results should use a clear hierarchy:

- One primary outcome
- Two or three supporting values
- One short interpretation line

Example pattern:

- Primary: new average price or computed target value
- Secondary: required quantity, total cost, return delta, or yield support metrics
- Interpretation: one sentence summarizing what changed

### Supporting Content

Formula explanation, usage guidance, cautionary notes, and FAQ-style content should sit below the interactive workspace. These sections should help users understand the tool after they complete the core calculation task.

## Visual System

### Typography

The redesign should move away from a generic utility feel and toward a refined sans-serif system.

- Headlines: tight tracking, strong but controlled size
- Body copy: compact line length and strong scanability
- Numeric results: stronger weight and cleaner alignment than paragraph text

The visual emphasis should shift from decorative headline size to clarity of numbers and action points.

### Color

The palette should use:

- Warm sand or stone-tinted background surfaces
- Lighter ivory or white content surfaces
- One restrained accent color only

The accent should be reserved for:

- Primary buttons
- Active states
- Key numbers
- Important navigation emphasis

Avoid saturated finance blue, purple glow, or generic AI-style gradients.

### Containers and Borders

The system should avoid wrapping every element in identical cards.

- Large rounded surfaces only where hierarchy matters
- Thin warm-gray borders for structure
- Wide, soft diffusion shadows rather than hard outer glow

The result should feel premium but calm.

### Inputs and Buttons

Inputs should follow a consistent rule:

- Label above field
- Optional help text below label or field
- Error text below field

Buttons should feel tactile but not playful:

- rounded but not overly soft
- subtle pressed feedback
- no exaggerated glow

### Motion

Motion should remain restrained:

- homepage staged reveal for major blocks
- smooth state transitions for calculator result areas
- no decorative motion that competes with data entry

The purpose of motion is product polish, not spectacle.

## Component Implications

### Homepage Components

Likely affected components:

- `app/page.tsx`
- `components/home/ToolCard.tsx`
- `components/layout/Navbar.tsx`
- new homepage-specific layout primitives if the existing card abstraction cannot express featured and secondary calculator treatments cleanly

The homepage will likely need more than a single reusable card type. It should support at least:

- featured calculator tile
- secondary calculator tile
- compact trust/info block

### Calculator Layout Components

Likely affected components:

- `components/layout/CalculatorLayout.tsx`
- individual calculator components under `components/calculators/`
- shared field and result presentation helpers

The current layout should evolve toward a clearer distinction between:

- input workspace
- output workspace
- explanatory content
- related tools sidebar or section

## Content and Copy Direction

Copy should become clearer and less generic.

- Headlines should be concrete
- Support copy should explain what the user can do immediately
- Avoid filler marketing language
- Avoid overlong intros on calculator pages

Because some current UI strings appear encoding-damaged, text normalization is part of this redesign scope.

## Error, Empty, and Interaction States

The redesign must preserve or improve clarity for all user states:

- default input state
- actively edited form state
- validation error state
- result-visible state

Error messages should remain inline and local to the field or calculator context. Result areas should not collapse visually when values update.

## Responsiveness

The design must keep strong mobile usability.

- asymmetric layouts may expand above `md`
- mobile must collapse to a strict single-column flow
- large homepage tiles must remain tappable and readable
- calculator forms must not feel cramped on small screens

## Monetization Placement

Existing ad slots should remain supported, but placement should stop interrupting the main selection and calculation flows.

- homepage ads should appear after the primary calculator selection area
- detail-page ads should sit in sidebar or lower-content regions without competing with the form/result workspace

## Implementation Guidance

This redesign should be executed in layers:

1. fix text encoding issues and normalize copy
2. rebuild homepage structure and hierarchy
3. update shared visual tokens in global styles
4. update calculator layout shell
5. refine individual calculator panels as needed

This keeps risk low while letting the new design appear early.

## Testing Strategy

The redesign should be verified with:

- visual review at homepage and representative calculator pages
- responsive checks at mobile and desktop breakpoints
- regression check that calculator outputs still appear correctly
- lint and relevant tests for untouched logic stability

Primary representative calculator pages for manual review:

- `multa`
- `return-rate`
- `target-price`

## Risks

- Homepage redesign may accidentally over-prioritize aesthetics over quick tool entry.
- Shared layout changes may affect all calculators at once.
- Typography and spacing changes may expose weak copy or broken encoding more clearly.
- Ad placement changes may create unexpected whitespace if not integrated carefully.

## Recommendation

Proceed with the redesign using asymmetric homepage curation and a more restrained, premium visual system. The implementation should preserve the existing calculator logic and improve the product primarily through layout, hierarchy, copy quality, and interaction clarity.
