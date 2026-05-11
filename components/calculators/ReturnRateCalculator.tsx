'use client'

import { useState } from 'react'
import { calcReturnRate, type ReturnRateInput } from '@/lib/calculations'
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

export default function ReturnRateCalculator() {
  const [currency, setCurrency] = useStoredCurrency()
  const [buyPrice, setBuyPrice] = useState('')
  const [currentPrice, setCurrentPrice] = useState('')
  const [qty, setQty] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcReturnRate> | null>(null)

  function handleCalc() {
    const input: ReturnRateInput = {
      buyPrice: Number(buyPrice),
      currentPrice: Number(currentPrice),
      qty: Number(qty)
    }

    if ([input.buyPrice, input.currentPrice, input.qty].some((value) => Number.isNaN(value))) {
      setError('모든 값을 입력해 주세요.')
      setResult(null)
      return
    }

    if (input.buyPrice <= 0 || input.currentPrice <= 0 || input.qty <= 0) {
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
    setResult(calcReturnRate(input))
  }

  const moneyExample = getCurrencyExample(currency)
  const currencyLabel = getCurrencyLabel(currency)

  return (
    <div className="grid gap-5">
      <CalculatorSection
        eyebrow="Input"
        title="매수 가격과 현재 가격을 입력하세요"
        description="현재 포지션의 평가금액과 손익, 수익률을 빠르게 점검할 수 있습니다."
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-800">표시 통화</p>
            <p className="mt-1 text-xs text-slate-500">금액 입력과 결과 카드가 선택한 통화 기준으로 표시됩니다.</p>
          </div>
          <CurrencySelector value={currency} onChange={setCurrency} />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <CalculatorField label={`매수 단가 (${currencyLabel})`} value={buyPrice} onChange={setBuyPrice} placeholder="50000" helpText={`처음 매수한 평균 단가 · ${moneyExample}`} />
          <CalculatorField label={`현재 가격 (${currencyLabel})`} value={currentPrice} onChange={setCurrentPrice} placeholder="55000" helpText={`지금 기준의 시장 가격 · ${moneyExample}`} />
          <CalculatorField label="보유 수량" value={qty} onChange={setQty} placeholder="20" step="1" helpText="보유 중인 주식 수량" />
        </div>

        <div className="mt-6 space-y-4">
          <CalculatorActionButton onClick={handleCalc}>수익률 계산하기</CalculatorActionButton>
          {error ? <CalculatorError>{error}</CalculatorError> : null}
        </div>
      </CalculatorSection>

      <CalculatorSection
        eyebrow="Result"
        title="현재 포지션 성과"
        description="평가금액과 손익, 수익률을 분리해서 보여줘 현재 상태를 빠르게 읽을 수 있습니다."
      >
        {result ? (
          <div className="grid gap-4 sm:grid-cols-3">
            <ResultCard label="평가금액" value={formatCurrency(result.evaluationAmount, currency)} tone="muted" detail="현재 가격 기준 총 평가 금액" />
            <ResultCard label="평가손익" value={formatCurrency(result.profitLoss, currency)} tone={result.profitLoss >= 0 ? 'positive' : 'negative'} detail="매수 단가 대비 손익 금액" />
            <ResultCard label="수익률" value={`${result.returnPercent.toFixed(2)}%`} tone={result.returnPercent >= 0 ? 'positive' : 'negative'} detail="평균 매수 단가 대비 수익률" />
          </div>
        ) : (
          <EmptyResult title="계산 결과가 아직 없습니다." description="매수 단가와 현재 가격, 보유 수량을 입력하면 평가손익과 수익률이 여기에 표시됩니다." />
        )}
      </CalculatorSection>
    </div>
  )
}
