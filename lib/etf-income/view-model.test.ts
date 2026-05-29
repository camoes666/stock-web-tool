import type {
  EtfDistributionProfileRecord,
  EtfProductRecord,
  TaxAccountRuleRecord
} from '@/lib/etf-income/types'
import { buildCoveredCallCalculatorSeed } from '@/lib/etf-income/view-model'

const products: EtfProductRecord[] = [
  {
    id: 'etf-1',
    symbol: '498400',
    name: 'KODEX 200타겟위클리커버드콜',
    issuer: '삼성자산운용',
    category: 'covered_call',
    market: 'KRX',
    distributionCycle: 'monthly',
    baseIndex: 'KOSPI200',
    description: '대표 커버드콜 ETF',
    isActive: true
  },
  {
    id: 'etf-2',
    symbol: '491160',
    name: 'KODEX 반도체타겟위클리커버드콜',
    issuer: '삼성자산운용',
    category: 'covered_call',
    market: 'KRX',
    distributionCycle: 'monthly',
    baseIndex: 'KRX 반도체',
    description: '반도체 커버드콜 ETF',
    isActive: true
  },
  {
    id: 'etf-3',
    symbol: '999999',
    name: '분배금 없는 ETF',
    issuer: '테스트운용사',
    category: 'covered_call',
    market: 'KRX',
    distributionCycle: 'monthly',
    baseIndex: null,
    description: null,
    isActive: true
  }
]

const distributionProfiles: EtfDistributionProfileRecord[] = [
  {
    id: 'profile-1',
    etfProductId: 'etf-1',
    referenceDate: '2026-05-29',
    exDividendDate: '2026-05-29',
    paymentDate: '2026-06-03',
    priceReference: 10000,
    monthlyDistributionPerShare: 120,
    annualizedDistributionYield: 14.4,
    currency: 'KRW',
    note: null,
    sourceLabel: 'manual seed',
    sourceUrl: 'https://example.com',
    isLatest: true
  },
  {
    id: 'profile-2',
    etfProductId: 'etf-2',
    referenceDate: '2026-05-29',
    exDividendDate: '2026-05-29',
    paymentDate: '2026-06-03',
    priceReference: 12500,
    monthlyDistributionPerShare: 95,
    annualizedDistributionYield: 9.12,
    currency: 'KRW',
    note: null,
    sourceLabel: 'manual seed',
    sourceUrl: 'https://example.com',
    isLatest: true
  }
]

const taxRules: TaxAccountRuleRecord[] = [
  {
    id: 'rule-1',
    accountType: 'general',
    incomeType: 'distribution',
    taxRate: 15.4,
    exemptionLimit: null,
    separateTaxRate: null,
    financialIncomeGlobalThreshold: 20000000,
    effectiveFrom: '2026-01-01',
    effectiveTo: null,
    ruleVersion: '2026-v1',
    note: null,
    sourceLabel: null,
    sourceUrl: null
  },
  {
    id: 'rule-2',
    accountType: 'isa',
    incomeType: 'distribution',
    taxRate: null,
    exemptionLimit: 2000000,
    separateTaxRate: 9,
    financialIncomeGlobalThreshold: 20000000,
    effectiveFrom: '2026-01-01',
    effectiveTo: null,
    ruleVersion: '2026-v1',
    note: null,
    sourceLabel: null,
    sourceUrl: null
  },
  {
    id: 'rule-3',
    accountType: 'pension',
    incomeType: 'distribution',
    taxRate: null,
    exemptionLimit: null,
    separateTaxRate: null,
    financialIncomeGlobalThreshold: null,
    effectiveFrom: '2026-01-01',
    effectiveTo: null,
    ruleVersion: '2026-v1',
    note: null,
    sourceLabel: null,
    sourceUrl: null
  }
]

describe('buildCoveredCallCalculatorSeed', () => {
  it('builds ETF options only for products with latest distribution profiles', () => {
    const seed = buildCoveredCallCalculatorSeed(products, distributionProfiles, taxRules)

    expect(seed.etfOptions).toEqual([
      {
        symbol: '498400',
        name: 'KODEX 200타겟위클리커버드콜',
        priceReference: 10000,
        monthlyDistributionPerShare: 120
      },
      {
        symbol: '491160',
        name: 'KODEX 반도체타겟위클리커버드콜',
        priceReference: 12500,
        monthlyDistributionPerShare: 95
      }
    ])
  })

  it('maps per-account defaults from active tax rules', () => {
    const seed = buildCoveredCallCalculatorSeed(products, distributionProfiles, taxRules)

    expect(seed.accountDefaults).toEqual({
      general: {
        taxRatePercent: 15.4
      },
      isa: {
        exemptionLimit: 2000000,
        separateTaxRatePercent: 9
      },
      pension: {}
    })
  })
})
