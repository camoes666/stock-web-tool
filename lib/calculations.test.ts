import {
  calcAveragingDownTarget,
  calcCompoundReturn,
  calcDividend,
  calcDividendReinvest,
  calcFairValue,
  calcMulta,
  calcReturnRate,
  calcTargetPrice
} from '@/lib/calculations'

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
