import type {
  EtfDistributionProfileRecord,
  EtfProductRecord,
  TaxAccountRuleRecord
} from '@/lib/etf-income/types'
import { supabaseAdmin } from '@/lib/supabase/server'

function normalizeProduct(row: Record<string, unknown>): EtfProductRecord {
  return {
    id: String(row.id),
    symbol: String(row.symbol),
    name: String(row.name),
    issuer: String(row.issuer),
    category: String(row.category),
    market: String(row.market),
    distributionCycle: String(row.distribution_cycle),
    baseIndex: row.base_index ? String(row.base_index) : null,
    description: row.description ? String(row.description) : null,
    isActive: Boolean(row.is_active)
  }
}

function normalizeDistributionProfile(row: Record<string, unknown>): EtfDistributionProfileRecord {
  return {
    id: String(row.id),
    etfProductId: String(row.etf_product_id),
    referenceDate: String(row.reference_date),
    exDividendDate: row.ex_dividend_date ? String(row.ex_dividend_date) : null,
    paymentDate: row.payment_date ? String(row.payment_date) : null,
    priceReference: row.price_reference === null ? null : Number(row.price_reference),
    monthlyDistributionPerShare: Number(row.monthly_distribution_per_share),
    annualizedDistributionYield:
      row.annualized_distribution_yield === null ? null : Number(row.annualized_distribution_yield),
    currency: String(row.currency),
    note: row.note ? String(row.note) : null,
    sourceLabel: row.source_label ? String(row.source_label) : null,
    sourceUrl: row.source_url ? String(row.source_url) : null,
    isLatest: Boolean(row.is_latest)
  }
}

function normalizeTaxRule(row: Record<string, unknown>): TaxAccountRuleRecord {
  return {
    id: String(row.id),
    accountType: String(row.account_type) as TaxAccountRuleRecord['accountType'],
    incomeType: String(row.income_type),
    taxRate: row.tax_rate === null ? null : Number(row.tax_rate),
    exemptionLimit: row.exemption_limit === null ? null : Number(row.exemption_limit),
    separateTaxRate: row.separate_tax_rate === null ? null : Number(row.separate_tax_rate),
    financialIncomeGlobalThreshold:
      row.financial_income_global_threshold === null ? null : Number(row.financial_income_global_threshold),
    effectiveFrom: String(row.effective_from),
    effectiveTo: row.effective_to ? String(row.effective_to) : null,
    ruleVersion: String(row.rule_version),
    note: row.note ? String(row.note) : null,
    sourceLabel: row.source_label ? String(row.source_label) : null,
    sourceUrl: row.source_url ? String(row.source_url) : null
  }
}

export function selectActiveTaxRules<T extends Pick<TaxAccountRuleRecord, 'effectiveFrom' | 'effectiveTo'>>(
  rules: T[],
  referenceDate: string
) {
  const target = new Date(referenceDate)

  return rules.filter((rule) => {
    const from = new Date(rule.effectiveFrom)
    const to = rule.effectiveTo ? new Date(rule.effectiveTo) : null

    if (from > target) {
      return false
    }

    if (to && to < target) {
      return false
    }

    return true
  })
}

export async function listEtfProducts() {
  const { data, error } = await supabaseAdmin
    .from('etf_products')
    .select('*')
    .eq('is_active', true)
    .order('name', { ascending: true })

  if (error) {
    throw error
  }

  return (data ?? []).map((row) => normalizeProduct(row))
}

export async function getLatestDistributionProfileBySymbol(symbol: string) {
  const { data, error } = await supabaseAdmin
    .from('etf_distribution_profiles')
    .select('*, etf_products!inner(symbol)')
    .eq('etf_products.symbol', symbol)
    .eq('is_latest', true)
    .limit(1)
    .maybeSingle()

  if (error) {
    throw error
  }

  if (!data) {
    return null
  }

  return normalizeDistributionProfile(data)
}

export async function listLatestDistributionProfiles() {
  const { data, error } = await supabaseAdmin
    .from('etf_distribution_profiles')
    .select('*')
    .eq('is_latest', true)
    .order('reference_date', { ascending: false })

  if (error) {
    throw error
  }

  return (data ?? []).map((row) => normalizeDistributionProfile(row))
}

export async function listDistributionTaxRules(referenceDate: string) {
  const { data, error } = await supabaseAdmin
    .from('tax_account_rules')
    .select('*')
    .eq('income_type', 'distribution')
    .order('effective_from', { ascending: false })

  if (error) {
    throw error
  }

  const normalizedRules = (data ?? []).map((row) => normalizeTaxRule(row))

  return selectActiveTaxRules(normalizedRules, referenceDate)
}
