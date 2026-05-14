import { getGuideBySlug, getGuidesForTool, guides } from '@/lib/guides'

describe('guide registry', () => {
  it('keeps the first published guide in the guides index', () => {
    expect(guides.map((guide) => guide.slug)).toEqual([
      'averaging-down',
      'overseas-capital-gains-tax'
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
})
