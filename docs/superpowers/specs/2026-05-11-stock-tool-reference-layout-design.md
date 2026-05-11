# Stock Tool Reference Layout Design

## Overview

This design adapts the user's two reference layouts into a stock-calculator product that stays fast, calm, and expandable.

- The homepage should behave like a calculator hub, not a marketing landing page.
- The calculator detail page should feel structured and trustworthy, while still prioritizing immediate calculation.
- The visual tone should use neutral financial-product cues instead of bright consumer-app energy.

This redesign is structural and presentational only. It does not change formulas, routes, or calculator scope.

## Goals

- Make the homepage easier to scan at a glance.
- Shift homepage labeling from tool jargon to user intent.
- Give calculator detail pages a stronger work area with separated input and result panels.
- Keep the system easy to extend as more calculators are added.
- Preserve mobile clarity and low-friction use.

## Non-Goals

- No new calculator formulas.
- No new account or personalization features beyond a lightweight "recently used" surface if implemented.
- No long-form editorial content expansion in this phase.
- No category explosion on day one.

## Product Direction

The approved direction is:

- Homepage inspiration: reference image one, translated into a stock-tool hub
- Calculator page inspiration: reference image two, translated into a lighter, more action-first layout
- Homepage card strategy: purpose-first labeling
- Calculator detail content strategy: balanced information density
- Result layout strategy: separated input card and result card
- Visual tone: neutral finance style with green or navy accents

## Information Architecture

## Homepage

The homepage should be organized into four layers:

1. Utility header or recent-use strip
2. Core calculator grid
3. Expansion path to full calculator list
4. Light trust or explanatory support

The homepage should not lead with a large editorial hero. The first interaction goal is quick tool discovery.

## Calculator Detail Page

Each calculator page should be organized into five layers:

1. Compact title and description block
2. Right-leaning calculator workspace
3. Separated result card below or beside the input card depending on screen size
4. Short supporting explanation blocks
5. Related calculators section

The page should read as a product workspace first and a content page second.

## Homepage Design

## Core Pattern

The homepage should borrow the strongest behavior from the reference:

- a clean, airy frame
- a prominent grid of equally scannable destination cards
- a small recent-use or quick-return surface above the main grid

For this project, the grid should represent concrete stock-calculation tasks rather than broad categories.

## Core Six Cards

The first screen should highlight six cards:

- `추가 매수 판단`
- `수익 점검`
- `배당 예측`
- `목표가 확인`
- `적정가 추정`
- `복리 시뮬레이션`

Each card should use:

- primary label: purpose-oriented user language
- secondary label: actual calculator name

Example:

- `추가 매수 판단`
- `평단 낮추기 · 물타기 계산기`

## Expansion Model

The homepage should be designed to grow without redesign:

- initial screen shows only the core six
- below the core grid, include a clear path to all tools
- when the tool count grows, continue using the same card pattern
- only introduce category groupings later if the full list becomes meaningfully large

This keeps the first screen simple while preserving long-term extensibility.

## Recent-Use Strip

If implemented, the recent-use area should be compact and utility-like:

- one row near the top
- one or a few recently opened calculators
- secondary visual priority compared with the core grid

It should feel like a convenience feature, not the main story.

## Calculator Detail Design

## Layout

The calculator detail page should borrow the two-column confidence of the reference, but reduce content density.

Desktop layout:

- left column: title, one-line summary, short usage framing
- right column: input card followed by result card

Mobile layout:

- title and summary first
- input card next
- result card immediately after
- supporting content below

## Input and Result Separation

The result area should not be embedded into the same visual block as the fields.

Required pattern:

- one dedicated input card
- one dedicated result card

Benefits:

- users can enter values without visually losing the outcome area
- key numbers can be emphasized more strongly
- calculators with multiple outputs remain readable

## Supporting Content

Below the workspace, the page should contain short, practical sections only:

- `계산식`
- `주의사항`
- `활용 팁`

Avoid oversized author boxes, review metadata, or long table-of-contents patterns from the reference. Those fit content-heavy utility sites more than this product.

## Related Tools

Each calculator page should end with three to four related tools. This section supports deeper browsing without cluttering the work area.

## Visual System

## Tone

The design should feel like a tidy financial utility:

- bright overall canvas
- soft neutral surfaces
- restrained green or navy accent
- minimal decorative flourish

The product should feel more trustworthy than playful.

## Color

Use:

- off-white or very light cool-neutral page background
- white or lightly tinted cards
- one primary accent only

Accent usage should be limited to:

- active links
- buttons
- highlighted numbers
- selected or focused states

Avoid bright blue consumer-app energy if it makes the product feel too generic.

## Cards

Homepage cards should be consistent and light:

- calm border
- moderate radius
- subtle shadow or surface lift
- strong title legibility

Calculator cards should be slightly denser and more structured than homepage cards because they serve work, not browsing.

## Typography

Typography should prioritize scan speed:

- strong but not oversized page titles
- clear card titles
- tighter handling of numeric outputs
- supporting copy kept short and readable

Result figures should carry the strongest visual emphasis on calculator pages.

## Motion

Motion should stay minimal:

- soft hover feedback on cards
- focused-state feedback on fields
- restrained updates when result values change

No decorative animation should compete with data entry.

## Component Implications

Likely affected files:

- `app/page.tsx`
- `components/home/ToolCard.tsx`
- `components/layout/CalculatorLayout.tsx`
- calculator components under `components/calculators/`
- `lib/tools.ts` if new presentation metadata is needed

The homepage likely needs presentation metadata for:

- purpose label
- secondary calculator name
- priority order
- optional related-tool relationships

## Content Direction

Homepage copy should be direct and action-oriented.

- Prefer "what you can decide now"
- Avoid abstract finance language when a plain phrase works
- Keep descriptions short enough to scan inside cards

Calculator-page copy should help users interpret results, not bury the tool under explanation.

## Responsiveness

The design should maintain the same logic across screen sizes:

- homepage grid collapses cleanly from desktop to mobile
- detail workspace preserves input then result order on smaller screens
- support sections stay clearly below the main workspace

Nothing in the layout should require side-scrolling or compressed unreadable inputs.

## Testing and Verification Expectations

Implementation should verify:

- homepage card hierarchy remains clear on mobile and desktop
- calculator pages maintain clean separation between input and result
- copy remains readable without overflow in Korean
- additional cards can be added without breaking the grid

## Open Decisions Resolved

The following product questions are now resolved:

- homepage cards should be purpose-first, not calculator-name-first
- initial homepage grid should show six core tools
- calculator detail pages should use balanced information density
- result presentation should use a separated card rather than an inline result area
- overall tone should use neutral finance styling rather than bright blue utility styling
