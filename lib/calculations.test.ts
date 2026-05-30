import {
  calcAveragingDownTarget,
  calcCompoundReturn,
  calcDividend,
  calcCoveredCallDistributionIncome,
  calcCoveredCallTotalReturnScenarios,
  calcDividendReinvest,
  calcFairValue,
  calcMulta,
  calcOverseasCapitalGains,
  calcReturnRate,
  calcTargetPrice
} from '@/lib/calculations'

describe('fee and tax helpers', () => {
  it('calculates overseas capital gains tax with editable defaults', () => {
    const result = calcOverseasCapitalGains({
      buyAmount: 10000,
      sellAmount: 15000,
      buyFxRate: 1350,
      sellFxRate: 1380,
      deductibleExpenses: 50000,
      basicDeduction: 2500000,
      taxRatePercent: 22
    })

    expect(result.krwBuyAmount).toBe(13500000)
    expect(result.krwSellAmount).toBe(20700000)
    expect(result.capitalGain).toBe(7150000)
    expect(result.taxableBase).toBe(4650000)
    expect(result.estimatedTax).toBeCloseTo(1023000, 2)
    expect(result.afterTaxGain).toBeCloseTo(6127000, 2)
  })

  it('calculates real profit after fees and taxes for return-rate flows', () => {
    const result = calcReturnRate({
      buyPrice: 50000,
      currentPrice: 55000,
      qty: 20,
      brokerFeePercent: 0.015,
      transactionTaxPercent: 0.2,
      extraCost: 3000
    })

    expect(result.evaluationAmount).toBe(1100000)
    expect(result.profitLoss).toBe(100000)
    expect(result.totalCost).toBeCloseTo(5515, 2)
    expect(result.realProfitLoss).toBeCloseTo(94485, 2)
    expect(result.realReturnPercent).toBeCloseTo(9.4485, 4)
    expect(result.breakEvenPrice).toBeCloseTo(50265.57, 2)
  })

  it('adds fee-aware investment totals for averaging-down flows', () => {
    const result = calcMulta({
      avgPrice: 50000,
      qty: 100,
      addPrice: 40000,
      addQty: 50,
      brokerFeePercent: 0.015,
      transactionTaxPercent: 0.2,
      extraCost: 10000
    })

    expect(result.totalInvestment).toBe(7000000)
    expect(result.realTotalInvestment).toBeCloseTo(7011050, 2)
    expect(result.effectiveAvgPrice).toBeCloseTo(46740.33, 2)
    expect(result.breakEven).toBeCloseTo(46841.04, 2)
  })

  it('adds fee-aware cash requirements for target-average flows', () => {
    const result = calcAveragingDownTarget({
      avgPrice: 50000,
      qty: 100,
      currentPrice: 40000,
      targetAvgPrice: 45000,
      brokerFeePercent: 0.015,
      extraCost: 5000
    })

    expect(result.requiredQty).toBe(100)
    expect(result.requiredInvestment).toBe(4000000)
    expect(result.realRequiredInvestment).toBeCloseTo(4005600, 2)
    expect(result.realEstimatedAvgPrice).toBeCloseTo(45028, 2)
  })
})

describe('calcMulta', () => {
  it('새 평단가를 계산한다', () => {
    const result = calcMulta({ avgPrice: 50000, qty: 100, addPrice: 40000, addQty: 50 })

    expect(result.newAvgPrice).toBeCloseTo(46666.67, 1)
  })

  it('총 투자금을 계산한다', () => {
    const result = calcMulta({ avgPrice: 50000, qty: 100, addPrice: 40000, addQty: 50 })

    expect(result.totalInvestment).toBe(7000000)
  })
})

describe('calcDividend', () => {
  it('배당수익률과 수령액을 계산한다', () => {
    const result = calcDividend({ stockPrice: 50000, dividendPerShare: 2000, qty: 100 })

    expect(result.yieldPercent).toBe(4)
    expect(result.annualIncome).toBe(200000)
    expect(result.monthlyIncome).toBeCloseTo(16666.67, 1)
  })
})

describe('calcFairValue', () => {
  it('PER, PBR, 평균 적정가를 계산한다', () => {
    const result = calcFairValue({ eps: 5000, targetPer: 15, bps: 30000, targetPbr: 1.5 })

    expect(result.perPrice).toBe(75000)
    expect(result.pbrPrice).toBe(45000)
    expect(result.avgPrice).toBe(60000)
  })
})

describe('calcReturnRate', () => {
  it('평가손익과 수익률을 계산한다', () => {
    const result = calcReturnRate({ buyPrice: 50000, currentPrice: 55000, qty: 20 })

    expect(result.evaluationAmount).toBe(1100000)
    expect(result.profitLoss).toBe(100000)
    expect(result.returnPercent).toBe(10)
  })
})

describe('calcTargetPrice', () => {
  it('목표가와 손절가를 계산한다', () => {
    const result = calcTargetPrice({ entryPrice: 50000, profitPercent: 12, lossPercent: 7 })

    expect(result.targetPrice).toBe(56000)
    expect(result.stopLossPrice).toBe(46500)
  })
})

describe('calcAveragingDownTarget', () => {
  it('목표 평단가에 필요한 추가 수량과 금액을 계산한다', () => {
    const result = calcAveragingDownTarget({
      avgPrice: 50000,
      qty: 100,
      currentPrice: 40000,
      targetAvgPrice: 45000
    })

    expect(result.requiredQty).toBe(100)
    expect(result.requiredInvestment).toBe(4000000)
    expect(result.estimatedAvgPrice).toBe(45000)
  })
})

describe('calcCompoundReturn', () => {
  it('복리 기준 미래 자산을 계산한다', () => {
    const result = calcCompoundReturn({
      principal: 10000000,
      monthlyContribution: 500000,
      annualRate: 8,
      years: 10
    })

    expect(result.finalAmount).toBeCloseTo(111651386.57, 1)
    expect(result.totalContribution).toBe(70000000)
    expect(result.estimatedProfit).toBeCloseTo(41651386.57, 1)
  })
})

describe('calcDividendReinvest', () => {
  it('배당 재투자 후 보유 수량과 자산을 계산한다', () => {
    const result = calcDividendReinvest({
      stockPrice: 50000,
      dividendPerShare: 2000,
      qty: 100,
      years: 3
    })

    expect(result.totalDividends).toBeCloseTo(624320, 1)
    expect(result.finalQty).toBeCloseTo(112.4864, 4)
    expect(result.finalAsset).toBeCloseTo(5624320, 1)
  })
})

describe('calcCoveredCallDistributionIncome', () => {
  it('계좌별 세후 월분배 현금흐름을 계산한다', () => {
    const result = calcCoveredCallDistributionIncome({
      investmentAmount: 10000000,
      pricePerShare: 10000,
      monthlyDistributionPerShare: 120,
      accountType: 'general',
      taxRatePercent: 15.4
    })

    expect(result.quantity).toBe(1000)
    expect(result.monthlyGrossIncome).toBe(120000)
    expect(result.monthlyTax).toBeCloseTo(18480, 2)
    expect(result.monthlyNetIncome).toBeCloseTo(101520, 2)
    expect(result.annualGrossIncome).toBe(1440000)
    expect(result.annualNetIncome).toBeCloseTo(1218240, 2)
  })

  it('applies ISA exemption and separate tax after the limit', () => {
    const result = calcCoveredCallDistributionIncome({
      investmentAmount: 300000000,
      pricePerShare: 10000,
      monthlyDistributionPerShare: 120,
      accountType: 'isa',
      exemptionLimit: 2000000,
      separateTaxRatePercent: 9
    })

    expect(result.quantity).toBe(30000)
    expect(result.annualGrossIncome).toBe(43200000)
    expect(result.annualTax).toBeCloseTo(3708000, 2)
    expect(result.annualNetIncome).toBeCloseTo(39492000, 2)
  })

  it('keeps pension account comparison on a tax-deferred basis', () => {
    const result = calcCoveredCallDistributionIncome({
      investmentAmount: 10000000,
      pricePerShare: 10000,
      monthlyDistributionPerShare: 120,
      accountType: 'pension'
    })

    expect(result.quantity).toBe(1000)
    expect(result.monthlyGrossIncome).toBe(120000)
    expect(result.monthlyTax).toBe(0)
    expect(result.monthlyNetIncome).toBe(120000)
    expect(result.annualTax).toBe(0)
    expect(result.annualNetIncome).toBe(1440000)
  })

  it('derives covered-call total return scenarios from annual net income', () => {
    const result = calcCoveredCallTotalReturnScenarios({
      investmentAmount: 10000000,
      pricePerShare: 10000,
      monthlyDistributionPerShare: 120,
      accountType: 'general',
      taxRatePercent: 15.4
    })

    expect(result.quantity).toBe(1000)
    expect(result.annualNetIncome).toBeCloseTo(1218240, 2)
    expect(result.scenarios).toEqual([
      expect.objectContaining({
        label: '하락 -10%',
        priceChangePercent: -10,
        evaluationProfitLoss: -1000000,
        expectedTotalReturn: 218240
      }),
      expect.objectContaining({
        label: '보합 0%',
        priceChangePercent: 0,
        evaluationProfitLoss: 0,
        expectedTotalReturn: 1218240
      }),
      expect.objectContaining({
        label: '상승 +10%',
        priceChangePercent: 10,
        evaluationProfitLoss: 1000000,
        expectedTotalReturn: 2218240
      })
    ])
  })
})
