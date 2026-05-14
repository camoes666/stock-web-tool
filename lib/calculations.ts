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
