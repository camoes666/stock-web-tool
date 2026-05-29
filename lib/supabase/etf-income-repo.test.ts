describe('etf income repository helpers', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_SUPABASE_URL: 'https://example.supabase.co',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: 'public-key',
      SUPABASE_SERVICE_ROLE_KEY: 'secret-key'
    }
  })

  afterAll(() => {
    process.env = originalEnv
  })

  it('keeps only rules active on the reference date', async () => {
    const { selectActiveTaxRules } = await import('@/lib/supabase/etf-income-repo')
    const rules = [
      {
        accountType: 'general',
        effectiveFrom: '2026-01-01',
        effectiveTo: null,
        ruleVersion: '2026-v1'
      },
      {
        accountType: 'isa',
        effectiveFrom: '2026-01-01',
        effectiveTo: '2026-05-20',
        ruleVersion: '2026-v1'
      },
      {
        accountType: 'isa',
        effectiveFrom: '2026-05-21',
        effectiveTo: null,
        ruleVersion: '2026-v2'
      }
    ]

    expect(selectActiveTaxRules(rules, '2026-05-29')).toEqual([
      {
        accountType: 'general',
        effectiveFrom: '2026-01-01',
        effectiveTo: null,
        ruleVersion: '2026-v1'
      },
      {
        accountType: 'isa',
        effectiveFrom: '2026-05-21',
        effectiveTo: null,
        ruleVersion: '2026-v2'
      }
    ])
  })

  it('treats effective_to as inclusive', async () => {
    const { selectActiveTaxRules } = await import('@/lib/supabase/etf-income-repo')
    const rules = [
      {
        accountType: 'pension',
        effectiveFrom: '2026-01-01',
        effectiveTo: '2026-05-29',
        ruleVersion: '2026-v1'
      }
    ]

    expect(selectActiveTaxRules(rules, '2026-05-29')).toEqual(rules)
  })
})
