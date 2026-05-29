import {
  featuredTools,
  findToolBySlug,
  getRelatedTools,
  homepageFeaturedTools,
  secondaryTools
} from '@/lib/tools'

describe('tool presentation metadata', () => {
  it('keeps the six featured calculators in the approved homepage order', () => {
    expect(featuredTools.map((tool) => tool.slug)).toEqual([
      'multa',
      'return-rate',
      'dividend',
      'target-price',
      'compound-return',
      'overseas-capital-gains'
    ])
  })

  it('keeps secondary tools separate from featured tools', () => {
    const featuredSlugs = new Set(featuredTools.map((tool) => tool.slug))

    expect(secondaryTools.every((tool) => !featuredSlugs.has(tool.slug))).toBe(true)
    expect(secondaryTools.map((tool) => tool.slug)).toEqual([
      'fair-value',
      'averaging-down-target',
      'dividend-reinvest',
      'covered-call-distribution'
    ])
  })

  it('includes the overseas capital-gains calculator in the registry', () => {
    expect(findToolBySlug('overseas-capital-gains')).toMatchObject({
      slug: 'overseas-capital-gains',
      href: '/calculators/overseas-capital-gains',
      category: 'calculator'
    })
  })

  it('includes the covered-call distribution calculator in the registry', () => {
    expect(findToolBySlug('covered-call-distribution')).toMatchObject({
      slug: 'covered-call-distribution',
      href: '/calculators/covered-call-distribution',
      category: 'calculator'
    })
  })

  it('surfaces the covered-call distribution calculator on the homepage without adding it to the navbar set', () => {
    expect(homepageFeaturedTools[0]?.slug).toBe('covered-call-distribution')
    expect(featuredTools.map((tool) => tool.slug)).not.toContain('covered-call-distribution')
  })

  it('returns related tools without including the current calculator', () => {
    const multa = findToolBySlug('multa')

    expect(multa).toBeDefined()
    expect(getRelatedTools('multa').map((tool) => tool.slug)).toEqual([
      'averaging-down-target',
      'return-rate',
      'target-price'
    ])
  })
})
