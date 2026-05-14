'use client'

import { useEffect, useState } from 'react'
import { trackCalculatorRun, trackCalculatorView } from '@/lib/analytics'
import { calcDividendReinvest, type DividendReinvestInput } from '@/lib/calculations'
import {
  CalculatorActionButton,
  CalculatorError,
  CalculatorField,
  CalculatorSection,
  CurrencySelector,
  EmptyResult,
  ResultCard,
  formatCurrency,
  getCurrencyExample,
  getCurrencyLabel,
  useStoredCurrency
} from '@/components/calculators/shared'

export default function DividendReinvestCalculator() {
  const [currency, setCurrency] = useStoredCurrency()
  const [stockPrice, setStockPrice] = useState('')
  const [dividendPerShare, setDividendPerShare] = useState('')
  const [qty, setQty] = useState('')
  const [years, setYears] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcDividendReinvest> | null>(null)

  useEffect(() => {
    trackCalculatorView({
      calculator_name: 'dividend-reinvest',
      calculator_category: 'stock'
    })
  }, [])

  function handleCalc() {
    const input: DividendReinvestInput = {
      stockPrice: Number(stockPrice),
      dividendPerShare: Number(dividendPerShare),
      qty: Number(qty),
      years: Number(years)
    }

    if ([input.stockPrice, input.dividendPerShare, input.qty, input.years].some((value) => Number.isNaN(value))) {
      setError('모든 값을 입력해 주세요.')
      setResult(null)
      return
    }

    if (input.stockPrice <= 0 || input.dividendPerShare <= 0 || input.qty <= 0 || input.years <= 0) {
      setError('모든 입력값은 0보다 커야 합니다.')
      setResult(null)
      return
    }

    if (!Number.isInteger(input.qty) || !Number.isInteger(input.years)) {
      setError('보유 수량과 투자 기간은 정수만 입력할 수 있습니다.')
      setResult(null)
      return
    }

    setError('')
    setResult(calcDividendReinvest(input))
    trackCalculatorRun({
      calculator_name: 'dividend-reinvest',
      calculator_category: 'stock',
      input_count: 4
    })
  }

  const moneyExample = getCurrencyExample(currency)
  const currencyLabel = getCurrencyLabel(currency)

  return (
    <div className="grid gap-5">
      <CalculatorSection
        eyebrow="Input"
        title="배당 재투자 조건을 입력하세요"
        description="배당금을 다시 같은 종목에 투자한다고 가정해 보유 수량과 자산 증가를 추정합니다."
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-800">표시 통화</p>
            <p className="mt-1 text-xs text-slate-500">주가, 배당금, 누적 자산을 같은 통화 기준으로 확인할 수 있습니다.</p>
          </div>
          <CurrencySelector value={currency} onChange={setCurrency} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <CalculatorField label={`현재 주가 (${currencyLabel})`} value={stockPrice} onChange={setStockPrice} placeholder="50000" helpText={`재투자 시 사용할 기준 가격 · ${moneyExample}`} />
          <CalculatorField label={`주당 배당금 (${currencyLabel})`} value={dividendPerShare} onChange={setDividendPerShare} placeholder="2000" helpText={`1주당 연간 배당금 · ${moneyExample}`} />
          <CalculatorField label="보유 수량" value={qty} onChange={setQty} placeholder="100" step="1" helpText="현재 보유한 주식 수량" />
          <CalculatorField label="투자 기간" value={years} onChange={setYears} placeholder="3" step="1" helpText="재투자를 이어갈 기간(년)" />
        </div>

        <div className="mt-6 space-y-4">
          <CalculatorActionButton onClick={handleCalc}>재투자 성장 계산하기</CalculatorActionButton>
          {error ? <CalculatorError>{error}</CalculatorError> : null}
        </div>
      </CalculatorSection>

      <CalculatorSection
        eyebrow="Result"
        title="배당 재투자 후의 성장 추정"
        description="누적 배당금, 예상 보유 수량, 예상 자산을 함께 보면 재투자의 누적 효과를 더 쉽게 읽을 수 있습니다."
      >
        {result ? (
          <div className="grid gap-4 sm:grid-cols-3">
            <ResultCard label="누적 배당금" value={formatCurrency(result.totalDividends, currency)} tone="positive" detail="투자 기간 동안 누적된 배당금" />
            <ResultCard label="예상 보유 수량" value={`${result.finalQty.toFixed(4)}주`} tone="muted" detail="배당 재투자를 모두 반영한 보유 수량" />
            <ResultCard label="예상 자산" value={formatCurrency(result.finalAsset, currency)} tone="default" detail="최종 보유 수량 기준의 자산 추정치" />
          </div>
        ) : (
          <EmptyResult title="배당 재투자 결과가 아직 없습니다." description="주가, 배당금, 보유 수량, 기간을 입력하면 재투자 효과가 여기에 표시됩니다." />
        )}
      </CalculatorSection>
    </div>
  )
}
