import { featuredTools, findToolBySlug, getRelatedTools, secondaryTools } from '@/lib/tools'

describe('tool presentation metadata', () => {
  it('keeps the six featured calculators in the approved homepage order', () => {
    expect(featuredTools.map((tool) => tool.slug)).toEqual([
      'multa',
      'return-rate',
      'dividend',
      'target-price',
      'fair-value',
      'compound-return'
    ])
  })

  it('keeps secondary tools separate from featured tools', () => {
    const featuredSlugs = new Set(featuredTools.map((tool) => tool.slug))

    expect(secondaryTools.every((tool) => !featuredSlugs.has(tool.slug))).toBe(true)
    expect(secondaryTools.map((tool) => tool.slug)).toEqual([
      'averaging-down-target',
      'dividend-reinvest'
    ])
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
