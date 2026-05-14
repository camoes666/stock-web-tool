'use client'

import { useEffect, useState } from 'react'
import { trackCalculatorRun, trackCalculatorView } from '@/lib/analytics'
import { calcAveragingDownTarget, type AveragingDownTargetInput } from '@/lib/calculations'
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

export default function AveragingDownTargetCalculator() {
  const [currency, setCurrency] = useStoredCurrency()
  const [avgPrice, setAvgPrice] = useState('')
  const [qty, setQty] = useState('')
  const [currentPrice, setCurrentPrice] = useState('')
  const [targetAvgPrice, setTargetAvgPrice] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcAveragingDownTarget> | null>(null)

  useEffect(() => {
    trackCalculatorView({
      calculator_name: 'averaging-down-target',
      calculator_category: 'stock'
    })
  }, [])

  function handleCalc() {
    const input: AveragingDownTargetInput = {
      avgPrice: Number(avgPrice),
      qty: Number(qty),
      currentPrice: Number(currentPrice),
      targetAvgPrice: Number(targetAvgPrice)
    }

    if ([input.avgPrice, input.qty, input.currentPrice, input.targetAvgPrice].some((value) => Number.isNaN(value))) {
      setError('모든 값을 입력해 주세요.')
      setResult(null)
      return
    }

    if (input.avgPrice <= 0 || input.qty <= 0 || input.currentPrice <= 0 || input.targetAvgPrice <= 0) {
      setError('모든 입력값은 0보다 커야 합니다.')
      setResult(null)
      return
    }

    if (!Number.isInteger(input.qty)) {
      setError('보유 수량은 정수만 입력할 수 있습니다.')
      setResult(null)
      return
    }

    if (input.targetAvgPrice <= input.currentPrice) {
      setError('목표 평단가는 현재가보다 높아야 합니다.')
      setResult(null)
      return
    }

    if (input.targetAvgPrice >= input.avgPrice) {
      setError('목표 평단가는 현재 평단가보다 낮아야 합니다.')
      setResult(null)
      return
    }

    setError('')
    setResult(calcAveragingDownTarget(input))
    trackCalculatorRun({
      calculator_name: 'averaging-down-target',
      calculator_category: 'stock',
      input_count: 5
    })
  }

  const moneyExample = getCurrencyExample(currency)
  const currencyLabel = getCurrencyLabel(currency)

  return (
    <div className="grid gap-5">
      <CalculatorSection
        eyebrow="Input"
        title="목표 평단가를 입력하세요"
        description="현재 평단과 현재가 사이에서 원하는 평단까지 낮추려면 얼마나 더 사야 하는지 계산합니다."
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-800">표시 통화</p>
            <p className="mt-1 text-xs text-slate-500">평단가와 필요 금액이 선택한 통화 기준으로 표시됩니다.</p>
          </div>
          <CurrencySelector value={currency} onChange={setCurrency} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <CalculatorField label={`현재 평단가 (${currencyLabel})`} value={avgPrice} onChange={setAvgPrice} placeholder="50000" helpText={`현재 평균 매입 단가 · ${moneyExample}`} />
          <CalculatorField label="보유 수량" value={qty} onChange={setQty} placeholder="100" step="1" helpText="현재 보유 수량" />
          <CalculatorField label={`현재가 (${currencyLabel})`} value={currentPrice} onChange={setCurrentPrice} placeholder="40000" helpText={`추가 매수 기준 가격 · ${moneyExample}`} />
          <CalculatorField label={`목표 평단가 (${currencyLabel})`} value={targetAvgPrice} onChange={setTargetAvgPrice} placeholder="45000" helpText={`낮추고 싶은 목표 평균 단가 · ${moneyExample}`} />
        </div>

        <div className="mt-6 space-y-4">
          <CalculatorActionButton onClick={handleCalc}>추가 매수량 계산하기</CalculatorActionButton>
          {error ? <CalculatorError>{error}</CalculatorError> : null}
        </div>
      </CalculatorSection>

      <CalculatorSection
        eyebrow="Result"
        title="목표 평단에 필요한 추가 매수"
        description="필요한 수량과 금액을 분리해 보여줘 실제 자금 계획을 세우기 쉽게 합니다."
      >
        {result ? (
          <div className="grid gap-4 sm:grid-cols-3">
            <ResultCard label="필요 추가 수량" value={`${result.requiredQty.toLocaleString('ko-KR')}주`} tone="muted" detail="목표 평단에 도달하기 위해 더 사야 하는 수량" />
            <ResultCard label="필요 금액" value={formatCurrency(result.requiredInvestment, currency)} tone="default" detail="현재가 기준 추가 매수 총액" />
            <ResultCard label="예상 새 평단" value={formatCurrency(result.estimatedAvgPrice, currency)} tone="positive" detail="추가 매수 후 예상되는 평균 단가" />
          </div>
        ) : (
          <EmptyResult title="추가 매수 계획이 여기에 표시됩니다." description="현재 평단, 현재가, 목표 평단가를 입력한 뒤 계산해 보세요." />
        )}
      </CalculatorSection>
    </div>
  )
}
