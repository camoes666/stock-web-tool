export interface MultaInput {
  avgPrice: number
  qty: number
  addPrice: number
  addQty: number
}

export interface MultaResult {
  newAvgPrice: number
  totalInvestment: number
  breakEven: number
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
}

export interface ReturnRateResult {
  evaluationAmount: number
  profitLoss: number
  returnPercent: number
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
}

export interface AveragingDownTargetResult {
  requiredQty: number
  requiredInvestment: number
  estimatedAvgPrice: number
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

export function calcMulta(input: MultaInput): MultaResult {
  const totalInvestment = input.avgPrice * input.qty + input.addPrice * input.addQty
  const newAvgPrice = totalInvestment / (input.qty + input.addQty)

  return {
    newAvgPrice,
    totalInvestment,
    breakEven: newAvgPrice
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
  const evaluationAmount = input.currentPrice * input.qty
  const profitLoss = (input.currentPrice - input.buyPrice) * input.qty

  return {
    evaluationAmount,
    profitLoss,
    returnPercent: ((input.currentPrice - input.buyPrice) / input.buyPrice) * 100
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

  return {
    requiredQty,
    requiredInvestment,
    estimatedAvgPrice
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
