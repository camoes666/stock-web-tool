export type AccountType = 'general' | 'isa' | 'pension'

export interface EtfProductRecord {
  id: string
  symbol: string
  name: string
  issuer: string
  category: string
  market: string
  distributionCycle: string
  baseIndex: string | null
  description: string | null
  isActive: boolean
}

export interface EtfDistributionProfileRecord {
  id: string
  etfProductId: string
  referenceDate: string
  exDividendDate: string | null
  paymentDate: string | null
  priceReference: number | null
  monthlyDistributionPerShare: number
  annualizedDistributionYield: number | null
  currency: string
  note: string | null
  sourceLabel: string | null
  sourceUrl: string | null
  isLatest: boolean
}

export interface TaxAccountRuleRecord {
  id: string
  accountType: AccountType
  incomeType: string
  taxRate: number | null
  exemptionLimit: number | null
  separateTaxRate: number | null
  financialIncomeGlobalThreshold: number | null
  effectiveFrom: string
  effectiveTo: string | null
  ruleVersion: string
  note: string | null
  sourceLabel: string | null
  sourceUrl: string | null
}
