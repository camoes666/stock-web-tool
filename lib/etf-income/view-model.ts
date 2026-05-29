import type {
  AccountType,
  EtfDistributionProfileRecord,
  EtfProductRecord,
  TaxAccountRuleRecord
} from '@/lib/etf-income/types'

export interface CoveredCallCalculatorEtfOption {
  symbol: string
  name: string
  priceReference: number
  monthlyDistributionPerShare: number
}

export type CoveredCallCalculatorAccountDefaults = Record<
  AccountType,
  {
    taxRatePercent?: number
    exemptionLimit?: number
    separateTaxRatePercent?: number
  }
>

export interface CoveredCallCalculatorSeed {
  etfOptions: CoveredCallCalculatorEtfOption[]
  accountDefaults: CoveredCallCalculatorAccountDefaults
}

const emptyAccountDefaults: CoveredCallCalculatorAccountDefaults = {
  general: {},
  isa: {},
  pension: {}
}

export function buildCoveredCallCalculatorSeed(
  products: EtfProductRecord[],
  distributionProfiles: EtfDistributionProfileRecord[],
  taxRules: TaxAccountRuleRecord[]
): CoveredCallCalculatorSeed {
  const distributionProfileByProductId = new Map(
    distributionProfiles.map((profile) => [profile.etfProductId, profile] as const)
  )

  const etfOptions = products
    .filter((product) => distributionProfileByProductId.has(product.id))
    .map((product) => {
      const profile = distributionProfileByProductId.get(product.id)!

      return {
        symbol: product.symbol,
        name: product.name,
        priceReference: profile.priceReference ?? 0,
        monthlyDistributionPerShare: profile.monthlyDistributionPerShare
      }
    })

  const accountDefaults = taxRules.reduce<CoveredCallCalculatorAccountDefaults>((acc, rule) => {
    if (rule.accountType === 'general' && rule.taxRate !== null) {
      acc.general = {
        taxRatePercent: rule.taxRate
      }
    }

    if (rule.accountType === 'isa') {
      acc.isa = {
        exemptionLimit: rule.exemptionLimit ?? undefined,
        separateTaxRatePercent: rule.separateTaxRate ?? undefined
      }
    }

    if (rule.accountType === 'pension') {
      acc.pension = {}
    }

    return acc
  }, { ...emptyAccountDefaults })

  return {
    etfOptions,
    accountDefaults
  }
}
