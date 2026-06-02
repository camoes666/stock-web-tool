export interface MultaInput {
  avgPrice: number
  qty: number
  addPrice: number
  addQty: number
  brokerFeePercent?: number
  transactionTaxPercent?: number
  extraCost?: number
}

export interface MultaResult {
  newAvgPrice: number
  totalInvestment: number
  realTotalInvestment: number
  effectiveAvgPrice: number
  breakEven: number
  totalCost: number
}

export interface DividendInput {
  stockPrice: number
  dividendPerShare: number
  qty: number
}

export interface DividendResult {
  yieldPercent: number
  annualIncome: number
  monthlyIncome: number
}

export interface FairValueInput {
  eps: number
  targetPer: number
  bps: number
  targetPbr: number
}

export interface FairValueResult {
  perPrice: number
  pbrPrice: number
  avgPrice: number
}

export interface ReturnRateInput {
  buyPrice: number
  currentPrice: number
  qty: number
  brokerFeePercent?: number
  transactionTaxPercent?: number
  extraCost?: number
}

export interface ReturnRateResult {
  evaluationAmount: number
  profitLoss: number
  returnPercent: number
  totalCost: number
  realProfitLoss: number
  realReturnPercent: number
  breakEvenPrice: number
}

export interface OverseasCapitalGainsInput {
  buyAmount: number
  sellAmount: number
  buyFxRate: number
  sellFxRate: number
  deductibleExpenses: number
  basicDeduction?: number
  taxRatePercent?: number
}

export interface OverseasCapitalGainsResult {
  krwBuyAmount: number
  krwSellAmount: number
  capitalGain: number
  taxableBase: number
  estimatedTax: number
  afterTaxGain: number
}

export interface TargetPriceInput {
  entryPrice: number
  profitPercent: number
  lossPercent: number
}

export interface TargetPriceResult {
  targetPrice: number
  stopLossPrice: number
}

export interface AveragingDownTargetInput {
  avgPrice: number
  qty: number
  currentPrice: number
  targetAvgPrice: number
  brokerFeePercent?: number
  transactionTaxPercent?: number
  extraCost?: number
}

export interface AveragingDownTargetResult {
  requiredQty: number
  requiredInvestment: number
  estimatedAvgPrice: number
  realRequiredInvestment: number
  realEstimatedAvgPrice: number
  totalCost: number
}

export interface CompoundReturnInput {
  principal: number
  monthlyContribution: number
  annualRate: number
  years: number
}

export interface CompoundReturnResult {
  finalAmount: number
  totalContribution: number
  estimatedProfit: number
}

export interface DividendReinvestInput {
  stockPrice: number
  dividendPerShare: number
  qty: number
  years: number
}

export interface DividendReinvestResult {
  totalDividends: number
  finalQty: number
  finalAsset: number
}

export interface CoveredCallDistributionIncomeInput {
  investmentAmount: number
  pricePerShare: number
  monthlyDistributionPerShare: number
  accountType: 'general' | 'isa' | 'pension'
  taxRatePercent?: number
  exemptionLimit?: number
  separateTaxRatePercent?: number
}

export interface CoveredCallDistributionIncomeResult {
  quantity: number
  monthlyGrossIncome: number
  monthlyTax: number
  monthlyNetIncome: number
  annualGrossIncome: number
  annualTax: number
  annualNetIncome: number
}

export interface CoveredCallScenarioResult {
  label: string
  priceChangePercent: number
  evaluationProfitLoss: number
  expectedTotalReturn: number
}

export interface CoveredCallTotalReturnResult extends CoveredCallDistributionIncomeResult {
  scenarios: CoveredCallScenarioResult[]
}

export interface CoveredCallSummaryAccountSnapshot {
  accountType: 'general' | 'isa' | 'pension'
  monthlyNetIncome: number
  annualNetIncome: number
  scenarios: CoveredCallScenarioResult[]
}

export interface CoveredCallSummaryInsight {
  leadingAccountType: 'general' | 'isa' | 'pension' | null
  leadingAccountDifference: number
  leadMessage: string
  cautionMessage: string
}

interface TradingCostInput {
  brokerFeePercent?: number
  transactionTaxPercent?: number
  extraCost?: number
}

interface TradingCostBreakdown {
  buyFee: number
  sellFee: number
  transactionTax: number
  extraCost: number
  totalCost: number
}

function toRate(percent: number | undefined) {
  return (percent ?? 0) / 100
}

const coveredCallScenarioRates = [
  { label: '하락 -10%', priceChangePercent: -10 },
  { label: '보합 0%', priceChangePercent: 0 },
  { label: '상승 +10%', priceChangePercent: 10 }
] as const

const coveredCallAccountLabels = {
  general: '일반',
  isa: 'ISA',
  pension: '연금'
} as const

function getTradingCostBreakdown(
  buyAmount: number,
  sellAmount: number,
  costs: TradingCostInput
): TradingCostBreakdown {
  const buyFee = buyAmount * toRate(costs.brokerFeePercent)
  const sellFee = sellAmount * toRate(costs.brokerFeePercent)
  const transactionTax = sellAmount * toRate(costs.transactionTaxPercent)
  const extraCost = costs.extraCost ?? 0

  return {
    buyFee,
    sellFee,
    transactionTax,
    extraCost,
    totalCost: buyFee + sellFee + transactionTax + extraCost
  }
}

export function calcMulta(input: MultaInput): MultaResult {
  const totalInvestment = input.avgPrice * input.qty + input.addPrice * input.addQty
  const newAvgPrice = totalInvestment / (input.qty + input.addQty)
  const costBreakdown = getTradingCostBreakdown(totalInvestment, totalInvestment, input)
  const realTotalInvestment = totalInvestment + costBreakdown.buyFee + (input.extraCost ?? 0)
  const effectiveAvgPrice = realTotalInvestment / (input.qty + input.addQty)
  const sellRateOffset =
    1 - toRate(input.brokerFeePercent) - toRate(input.transactionTaxPercent)

  return {
    newAvgPrice,
    totalInvestment,
    realTotalInvestment,
    effectiveAvgPrice,
    breakEven: effectiveAvgPrice / sellRateOffset,
    totalCost: costBreakdown.buyFee + (input.extraCost ?? 0)
  }
}

export function calcDividend(input: DividendInput): DividendResult {
  const annualIncome = input.dividendPerShare * input.qty

  return {
    yieldPercent: (input.dividendPerShare / input.stockPrice) * 100,
    annualIncome,
    monthlyIncome: annualIncome / 12
  }
}

export function calcFairValue(input: FairValueInput): FairValueResult {
  const perPrice = input.eps * input.targetPer
  const pbrPrice = input.bps * input.targetPbr

  return {
    perPrice,
    pbrPrice,
    avgPrice: (perPrice + pbrPrice) / 2
  }
}

export function calcReturnRate(input: ReturnRateInput): ReturnRateResult {
  const buyAmount = input.buyPrice * input.qty
  const evaluationAmount = input.currentPrice * input.qty
  const profitLoss = evaluationAmount - buyAmount
  const costBreakdown = getTradingCostBreakdown(buyAmount, evaluationAmount, input)
  const sellRateOffset =
    1 - toRate(input.brokerFeePercent) - toRate(input.transactionTaxPercent)

  return {
    evaluationAmount,
    profitLoss,
    returnPercent: ((input.currentPrice - input.buyPrice) / input.buyPrice) * 100,
    totalCost: costBreakdown.totalCost,
    realProfitLoss: profitLoss - costBreakdown.totalCost,
    realReturnPercent: ((profitLoss - costBreakdown.totalCost) / buyAmount) * 100,
    breakEvenPrice: (buyAmount + costBreakdown.buyFee + costBreakdown.extraCost) / input.qty / sellRateOffset
  }
}

export function calcOverseasCapitalGains(
  input: OverseasCapitalGainsInput
): OverseasCapitalGainsResult {
  const krwBuyAmount = input.buyAmount * input.buyFxRate
  const krwSellAmount = input.sellAmount * input.sellFxRate
  const capitalGain = krwSellAmount - krwBuyAmount - input.deductibleExpenses
  const taxableBase = Math.max(0, capitalGain - (input.basicDeduction ?? 0))
  const estimatedTax = taxableBase * toRate(input.taxRatePercent)

  return {
    krwBuyAmount,
    krwSellAmount,
    capitalGain,
    taxableBase,
    estimatedTax,
    afterTaxGain: capitalGain - estimatedTax
  }
}

export function calcTargetPrice(input: TargetPriceInput): TargetPriceResult {
  return {
    targetPrice: Number((input.entryPrice * (1 + input.profitPercent / 100)).toFixed(6)),
    stopLossPrice: Number((input.entryPrice * (1 - input.lossPercent / 100)).toFixed(6))
  }
}

export function calcAveragingDownTarget(
  input: AveragingDownTargetInput
): AveragingDownTargetResult {
  const rawQty =
    ((input.avgPrice - input.targetAvgPrice) * input.qty) /
    (input.targetAvgPrice - input.currentPrice)
  const requiredQty = Math.ceil(rawQty)
  const requiredInvestment = requiredQty * input.currentPrice
  const totalInvestment = input.avgPrice * input.qty + requiredInvestment
  const estimatedAvgPrice = totalInvestment / (input.qty + requiredQty)
  const newBuyFee = requiredInvestment * toRate(input.brokerFeePercent)
  const extraCost = input.extraCost ?? 0
  const realRequiredInvestment = requiredInvestment + newBuyFee + extraCost
  const realEstimatedAvgPrice =
    (input.avgPrice * input.qty + requiredInvestment + newBuyFee + extraCost) /
    (input.qty + requiredQty)

  return {
    requiredQty,
    requiredInvestment,
    estimatedAvgPrice,
    realRequiredInvestment,
    realEstimatedAvgPrice,
    totalCost: newBuyFee + extraCost
  }
}

export function calcCompoundReturn(input: CompoundReturnInput): CompoundReturnResult {
  const months = input.years * 12
  const monthlyRate = Math.pow(1 + input.annualRate / 100, 1 / 12) - 1
  const principalGrowth = input.principal * Math.pow(1 + monthlyRate, months)
  const contributionGrowth =
    monthlyRate === 0
      ? input.monthlyContribution * months
      : input.monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
  const finalAmount = principalGrowth + contributionGrowth
  const totalContribution = input.principal + input.monthlyContribution * months

  return {
    finalAmount,
    totalContribution,
    estimatedProfit: finalAmount - totalContribution
  }
}

export function calcDividendReinvest(
  input: DividendReinvestInput
): DividendReinvestResult {
  let currentQty = input.qty
  let totalDividends = 0

  for (let year = 0; year < input.years; year += 1) {
    const yearDividend = currentQty * input.dividendPerShare
    totalDividends += yearDividend
    currentQty += yearDividend / input.stockPrice
  }

  return {
    totalDividends,
    finalQty: currentQty,
    finalAsset: currentQty * input.stockPrice
  }
}

export function calcCoveredCallDistributionIncome(
  input: CoveredCallDistributionIncomeInput
): CoveredCallDistributionIncomeResult {
  const quantity = Math.floor(input.investmentAmount / input.pricePerShare)
  const monthlyGrossIncome = quantity * input.monthlyDistributionPerShare
  const annualGrossIncome = monthlyGrossIncome * 12

  let annualTax = 0

  if (input.accountType === 'general') {
    annualTax = annualGrossIncome * toRate(input.taxRatePercent)
  } else if (input.accountType === 'isa') {
    const taxableBase = Math.max(0, annualGrossIncome - (input.exemptionLimit ?? 0))
    annualTax = taxableBase * toRate(input.separateTaxRatePercent)
  }

  const annualNetIncome = annualGrossIncome - annualTax
  const monthlyTax = annualTax / 12
  const monthlyNetIncome = annualNetIncome / 12

  return {
    quantity,
    monthlyGrossIncome,
    monthlyTax,
    monthlyNetIncome,
    annualGrossIncome,
    annualTax,
    annualNetIncome
  }
}

export function calcCoveredCallTotalReturnScenarios(
  input: CoveredCallDistributionIncomeInput
): CoveredCallTotalReturnResult {
  const income = calcCoveredCallDistributionIncome(input)

  return {
    ...income,
    scenarios: coveredCallScenarioRates.map((scenario) => {
      const evaluationProfitLoss =
        income.quantity * input.pricePerShare * toRate(scenario.priceChangePercent)

      return {
        ...scenario,
        evaluationProfitLoss,
        expectedTotalReturn: income.annualNetIncome + evaluationProfitLoss
      }
    })
  }
}

export function calcCoveredCallSummaryInsight(
  results: CoveredCallSummaryAccountSnapshot[]
): CoveredCallSummaryInsight {
  if (results.length === 0) {
    return {
      leadingAccountType: null,
      leadingAccountDifference: 0,
      leadMessage: '세후 월수령액 비교 결과가 아직 없습니다.',
      cautionMessage: '입력한 값 기준 참고 해석입니다.'
    }
  }

  const sortedByMonthlyNet = [...results].sort((left, right) => right.monthlyNetIncome - left.monthlyNetIncome)
  const leadingResult = sortedByMonthlyNet[0]
  const runnerUpResult = sortedByMonthlyNet[1] ?? leadingResult
  const leadingAccountDifference = leadingResult.monthlyNetIncome - runnerUpResult.monthlyNetIncome
  const isMeaningfulGap = leadingAccountDifference > 1000

  const leadMessage = isMeaningfulGap
    ? `세후 월수령액 기준으로는 ${coveredCallAccountLabels[leadingResult.accountType]} 계좌가 가장 유리합니다.`
    : '세후 월수령액 기준으로 계좌 간 차이는 크지 않습니다.'

  const downScenarios = results
    .map((result) => result.scenarios.find((scenario) => scenario.priceChangePercent === -10))
    .filter((scenario): scenario is CoveredCallScenarioResult => Boolean(scenario))

  const hasNegativeDownsideReturn = downScenarios.some((scenario) => scenario.expectedTotalReturn < 0)
  const downsideImpact = Math.max(...downScenarios.map((scenario) => Math.abs(scenario.evaluationProfitLoss)))
  const annualNetSpread =
    Math.max(...results.map((result) => result.annualNetIncome)) -
    Math.min(...results.map((result) => result.annualNetIncome))

  let cautionMessage = '입력한 값 기준 참고 해석입니다.'

  if (hasNegativeDownsideReturn) {
    cautionMessage = '주가 -10% 하락 시에는 세후 분배금이 있어도 총수익이 음수로 바뀔 수 있습니다.'
  } else if (downsideImpact > annualNetSpread) {
    cautionMessage = '다만 주가 -10% 하락 시에는 계좌 차이보다 가격 하락 영향이 더 크게 나타납니다.'
  } else {
    cautionMessage = '하락 시나리오에서도 계좌별 세후 차이를 함께 확인해보세요.'
  }

  return {
    leadingAccountType: isMeaningfulGap ? leadingResult.accountType : null,
    leadingAccountDifference,
    leadMessage,
    cautionMessage
  }
}
