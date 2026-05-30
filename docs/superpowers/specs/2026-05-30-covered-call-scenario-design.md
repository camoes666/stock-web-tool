# Covered Call Scenario Design

Date: 2026-05-30

## Goal

Add a first-pass total return scenario layer to the covered call distribution calculator so users can compare account-level after-tax cash flow and simple price-move outcomes in one place.

The current calculator answers:

- How much monthly and annual after-tax distribution income remains by account type?

The new first version should also answer:

- What happens to expected total return if the ETF price falls, stays flat, or rises?

## Scope

This is a version 1 upgrade for the existing covered call calculator at `/calculators/covered-call-distribution`.

Included:

- Keep the current input fields unchanged
- Keep the current account comparison flow unchanged
- Add three fixed price scenarios: `-10%`, `0%`, `+10%`
- Show scenario-based evaluation profit/loss and expected total return by account
- Add clear guidance that this is a simplified reference scenario

Not included:

- User-entered custom scenario percentages
- Multi-period simulation
- Distribution changes by scenario
- ETF-specific volatility assumptions
- Separate tabs or major interaction redesign

## Recommended Approach

Use a two-layer result layout inside the existing result area.

1. Keep the current "after-tax distribution cash flow" section as the first result block.
2. Add a new "price scenario total return" section below it for each account card.

This approach is recommended because it preserves the current calculator's strongest message, keeps the UI easy to understand, and adds the new concept without forcing extra inputs.

Other approaches considered:

- Add only a small summary card below the current result. This is lighter, but the message is too weak.
- Split results into tabs such as "cash flow" and "total return." This is more extensible, but too heavy for a first version.

## Calculation Model

Inputs remain:

- ETF selection
- Investment amount
- Reference price per share
- Monthly distribution per share

Existing calculation remains:

- Quantity = `floor(investmentAmount / pricePerShare)`
- Annual after-tax distribution income = current account-specific calculation

New scenario calculation:

- Scenario price change = one of `-10%`, `0%`, `+10%`
- Evaluation profit/loss = `quantity * pricePerShare * scenarioRate`
- Expected total return = `annualNetIncome + evaluationProfitLoss`

Version 1 intentionally uses a simple linear model. It does not attempt to model how covered call distributions may change when price changes.

## Result UX

Each account result card should present two result blocks.

First block:

- Monthly after-tax income
- Annual after-tax income
- Existing quantity and tax context

Second block:

- Scenario rows or mini cards for `-10%`, `0%`, `+10%`
- Each scenario shows:
- Evaluation profit/loss
- Expected total return

Suggested section title:

- `주가 시나리오별 예상 총수익`

Suggested explanation:

- `월분배 현금흐름에 더해 기준 가격 대비 주가 변동이 생기면 총수익이 어떻게 달라지는지 참고용으로 보여줍니다.`

## Messaging And Trust

The scenario section must include a caution note to avoid overstating precision.

Suggested note:

- `이 결과는 기준 가격 대비 단순 시나리오 계산이며, 실제 분배금 변동과 시장가격 변동은 다를 수 있습니다.`

This keeps the tool useful without implying a forecast.

## Error Handling

Reuse the current validation rules for numeric input.

No new validation is needed for version 1 because scenario values are fixed and internal.

## Testing

Add tests for:

- Scenario evaluation profit/loss for each fixed rate
- Expected total return calculation based on annual after-tax income plus scenario profit/loss
- Rendering of all three fixed scenarios in the calculator UI
- Presence of the caution note in the result area

## Success Criteria

Version 1 is successful if:

- Users can still complete the current calculator flow without extra complexity
- The result clearly shows that high distribution alone does not equal high total return
- The scenario section is understandable on first view, especially on mobile
- The explanation and caution note reduce the risk of misreading the output as a forecast
