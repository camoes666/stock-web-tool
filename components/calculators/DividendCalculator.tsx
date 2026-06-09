'use client'

import { useState } from 'react'
import { trackCalculatorRun } from '@/lib/analytics'
import { calcDividend, type DividendInput } from '@/lib/calculations'
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
import { useCalculatorTracking } from '@/components/calculators/useCalculatorTracking'

export default function DividendCalculator() {
  const [currency, setCurrency] = useStoredCurrency()
  const [stockPrice, setStockPrice] = useState('')
  const [dividendPerShare, setDividendPerShare] = useState('')
  const [qty, setQty] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcDividend> | null>(null)
  const { trackInputStart } = useCalculatorTracking({
    calculatorName: 'dividend',
    calculatorCategory: 'stock',
    hasResult: result !== null
  })

  function applyExample() {
    trackInputStart()
    setStockPrice('50000')
    setDividendPerShare('2000')
    setQty('100')
    setError('')
  }

  function handleCalc() {
    const input: DividendInput = {
      stockPrice: Number(stockPrice),
      dividendPerShare: Number(dividendPerShare),
      qty: Number(qty)
    }

    if ([input.stockPrice, input.dividendPerShare, input.qty].some((value) => Number.isNaN(value))) {
      setError('모든 값을 입력해 주세요.')
      setResult(null)
      return
    }

    if (input.stockPrice <= 0 || input.dividendPerShare <= 0 || input.qty <= 0) {
      setError('모든 입력값은 0보다 커야 합니다.')
      setResult(null)
      return
    }

    if (!Number.isInteger(input.qty)) {
      setError('보유 수량은 정수만 입력할 수 있습니다.')
      setResult(null)
      return
    }

    setError('')
    setResult(calcDividend(input))
    trackCalculatorRun({
      calculator_name: 'dividend',
      calculator_category: 'stock',
      input_count: 3
    })
  }

  const moneyExample = getCurrencyExample(currency)
  const currencyLabel = getCurrencyLabel(currency)

  return (
    <div className="grid gap-5">
      <CalculatorSection
        eyebrow="Input"
        title="배당과 보유 수량을 입력하세요"
        description="주가, 주당 배당금, 보유 수량만 넣으면 배당수익률과 연간 예상 배당금을 바로 계산할 수 있습니다."
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-800">표시 통화</p>
            <p className="mt-1 text-xs text-slate-500">주가와 배당금, 예상 현금흐름을 같은 통화 기준으로 볼 수 있습니다.</p>
          </div>
          <CurrencySelector value={currency} onChange={setCurrency} />
        </div>

        <div className="mb-5 rounded-2xl border border-brand-100 bg-brand-50/80 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-950">빠른 예시 입력</p>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                처음이면 대표 예시값으로 먼저 계산한 뒤, 주가와 배당금을 바꿔보는 흐름이 가장 이해하기 쉽습니다.
              </p>
            </div>
            <button
              type="button"
              onClick={applyExample}
              className="rounded-full border border-brand-200 bg-white px-4 py-2 text-xs font-semibold text-brand-700 transition hover:border-brand-300 hover:bg-brand-50"
            >
              예시값 채우기
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <CalculatorField label={`현재 주가 (${currencyLabel})`} value={stockPrice} onChange={setStockPrice} onFirstInteraction={trackInputStart} placeholder="50000" helpText={`현재 시장 가격 · ${moneyExample}`} />
          <CalculatorField label={`주당 배당금 (${currencyLabel})`} value={dividendPerShare} onChange={setDividendPerShare} onFirstInteraction={trackInputStart} placeholder="2000" helpText={`1주당 연간 배당금 · ${moneyExample}`} />
          <CalculatorField label="보유 수량" value={qty} onChange={setQty} onFirstInteraction={trackInputStart} placeholder="100" step="1" helpText="현재 보유한 주식 수량" />
        </div>

        <div className="mt-6 space-y-4">
          <CalculatorActionButton onClick={handleCalc}>배당 예측하기</CalculatorActionButton>
          {error ? <CalculatorError>{error}</CalculatorError> : null}
        </div>
      </CalculatorSection>

      <CalculatorSection
        eyebrow="Result"
        title="배당 중심으로 보는 현금흐름"
        description="연간 배당금과 월 환산 금액을 함께 보여줘 배당 흐름을 더 쉽게 읽을 수 있습니다."
      >
        {result ? (
          <div className="grid gap-4 sm:grid-cols-3">
            <ResultCard label="배당수익률" value={`${result.yieldPercent.toFixed(2)}%`} tone="positive" detail="현재 주가 대비 연간 배당수익률" />
            <ResultCard label="연간 배당금" value={formatCurrency(result.annualIncome, currency)} tone="muted" detail="현재 보유 수량 기준의 연간 현금흐름" />
            <ResultCard label="월간 환산" value={formatCurrency(result.monthlyIncome, currency)} tone="default" detail="연간 배당금을 12개월로 단순 환산한 값" />
          </div>
        ) : (
          <EmptyResult title="배당 예측 결과가 아직 없습니다." description="주가와 배당금, 보유 수량을 입력하면 예상 배당 흐름이 표시됩니다." />
        )}
      </CalculatorSection>
    </div>
  )
}
