import { getGuideBySlug, getGuidesForTool, guides } from '@/lib/guides'

describe('guide registry', () => {
  it('keeps the published guides in the expected SEO order', () => {
    expect(guides.map((guide) => guide.slug)).toEqual([
      'covered-call-monthly-distribution-trap',
      'averaging-down',
      'overseas-capital-gains-tax',
      'return-rate-with-fees',
      'dividend-yield-vs-dividend-income',
      'target-price-and-stop-loss',
      'compound-return-assumptions',
      'fair-value-per-pbr'
    ])
  })

  it('returns the covered-call guide by slug', () => {
    expect(getGuideBySlug('covered-call-monthly-distribution-trap')).toMatchObject({
      slug: 'covered-call-monthly-distribution-trap',
      href: '/guides/covered-call-monthly-distribution-trap',
      relatedToolSlugs: ['covered-call-distribution']
    })
  })

  it('returns guides connected to the covered-call calculator', () => {
    expect(getGuidesForTool('covered-call-distribution').map((guide) => guide.slug)).toEqual([
      'covered-call-monthly-distribution-trap'
    ])
  })

  it('returns the averaging-down guide by slug', () => {
    expect(getGuideBySlug('averaging-down')).toMatchObject({
      slug: 'averaging-down',
      href: '/guides/averaging-down',
      relatedToolSlugs: ['multa']
    })
  })

  it('returns guides connected to the multa calculator', () => {
    expect(getGuidesForTool('multa').map((guide) => guide.slug)).toEqual(['averaging-down'])
  })

  it('returns the overseas capital-gains guide by slug', () => {
    expect(getGuideBySlug('overseas-capital-gains-tax')).toMatchObject({
      slug: 'overseas-capital-gains-tax',
      href: '/guides/overseas-capital-gains-tax',
      relatedToolSlugs: ['overseas-capital-gains']
    })
  })

  it('returns the fee-aware return-rate guide by slug', () => {
    expect(getGuideBySlug('return-rate-with-fees')).toMatchObject({
      slug: 'return-rate-with-fees',
      href: '/guides/return-rate-with-fees',
      relatedToolSlugs: ['return-rate']
    })
  })

  it('returns guides connected to the dividend calculator', () => {
    expect(getGuidesForTool('dividend').map((guide) => guide.slug)).toEqual([
      'dividend-yield-vs-dividend-income'
    ])
  })

  it('returns guides connected to the target-price calculator', () => {
    expect(getGuidesForTool('target-price').map((guide) => guide.slug)).toEqual([
      'target-price-and-stop-loss'
    ])
  })

  it('returns guides connected to the compound-return calculator', () => {
    expect(getGuidesForTool('compound-return').map((guide) => guide.slug)).toEqual([
      'compound-return-assumptions'
    ])
  })

  it('returns guides connected to the fair-value calculator', () => {
    expect(getGuidesForTool('fair-value').map((guide) => guide.slug)).toEqual([
      'fair-value-per-pbr'
    ])
  })
})
