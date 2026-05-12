# Site Trust Pages Design

## Goal

Add lightweight trust and policy pages that make the site feel legitimate for users and help with ad network readiness.

## Scope

This work adds three static pages and a shared footer entry point:

- `/about`
- `/contact`
- `/privacy`

These pages should be accessible from all major pages through footer links.

## Page Design

### About

The about page explains:

- what Stock Web Tools is
- which calculators the site offers
- that the service is for informational support, not investment advice
- that the site may evolve with more calculators and utility features over time

The tone should be simple, trustworthy, and concise.

### Contact

The contact page is intentionally minimal and should show:

- the contact email `stockwebtools.help@gmail.com`
- a short note about the kinds of questions users can send
- a short expectation that replies may not be immediate

No form is needed at this stage.

### Privacy

The privacy page explains:

- the site currently collects minimal direct user information
- analytics tooling such as Google Analytics may collect usage data
- third-party services such as ad platforms may be added over time
- users contacting by email may provide information voluntarily
- the operator may update the policy when the service changes

This should be written in plain Korean, not legal-heavy copy.

## Navigation

Add a compact footer with links to:

- 소개
- 문의
- 개인정보처리방침

The footer should appear across the main site and calculator pages without distracting from the calculator workflow.

## Metadata

Each page should have its own title and description so the site looks complete in search and review contexts.

## Implementation Notes

- Use static App Router pages under `app/`
- Follow the current visual language
- Keep layouts lightweight and readable on mobile
- Reuse shared spacing and container patterns where possible

## Out of Scope

- contact forms
- backend mail handling
- terms of service
- cookie consent banners
