'use client'

import { useState } from 'react'
import { calcTargetPrice, type TargetPriceInput } from '@/lib/calculations'
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

export default function TargetPriceCalculator() {
  const [currency, setCurrency] = useStoredCurrency()
  const [entryPrice, setEntryPrice] = useState('')
  const [profitPercent, setProfitPercent] = useState('')
  const [lossPercent, setLossPercent] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcTargetPrice> | null>(null)

  function handleCalc() {
    const input: TargetPriceInput = {
      entryPrice: Number(entryPrice),
      profitPercent: Number(profitPercent),
      lossPercent: Number(lossPercent)
    }

    if ([input.entryPrice, input.profitPercent, input.lossPercent].some((value) => Number.isNaN(value))) {
      setError('모든 값을 입력해 주세요.')
      setResult(null)
      return
    }

    if (input.entryPrice <= 0 || input.profitPercent <= 0 || input.lossPercent <= 0) {
      setError('모든 입력값은 0보다 커야 합니다.')
      setResult(null)
      return
    }

    if (input.lossPercent >= 100) {
      setError('손절 비율은 100%보다 작아야 합니다.')
      setResult(null)
      return
    }

    setError('')
    setResult(calcTargetPrice(input))
  }

  const moneyExample = getCurrencyExample(currency)
  const currencyLabel = getCurrencyLabel(currency)

  return (
    <div className="grid gap-5">
      <CalculatorSection
        eyebrow="Input"
        title="목표 수익률과 손절 기준을 입력하세요"
        description="진입가를 기준으로 목표가와 손절가를 함께 계산해 매도 기준을 미리 정리할 수 있습니다."
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-800">표시 통화</p>
            <p className="mt-1 text-xs text-slate-500">진입가, 목표가, 손절가를 같은 통화 기준으로 볼 수 있습니다.</p>
          </div>
          <CurrencySelector value={currency} onChange={setCurrency} />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <CalculatorField label={`진입가 (${currencyLabel})`} value={entryPrice} onChange={setEntryPrice} placeholder="50000" helpText={`포지션에 진입한 가격 · ${moneyExample}`} />
          <CalculatorField label="목표 수익률" value={profitPercent} onChange={setProfitPercent} placeholder="12" helpText="도달하고 싶은 수익률(%)" />
          <CalculatorField label="손절 비율" value={lossPercent} onChange={setLossPercent} placeholder="7" helpText="허용할 손실 비율(%)" />
        </div>

        <div className="mt-6 space-y-4">
          <CalculatorActionButton onClick={handleCalc}>목표가 계산하기</CalculatorActionButton>
          {error ? <CalculatorError>{error}</CalculatorError> : null}
        </div>
      </CalculatorSection>

      <CalculatorSection
        eyebrow="Result"
        title="미리 잡아두는 매도 기준"
        description="익절 기준과 손절 기준을 함께 보면 다음 매매 계획을 더 분명하게 세울 수 있습니다."
      >
        {result ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <ResultCard label="목표가" value={formatCurrency(result.targetPrice, currency)} tone="positive" detail="목표 수익률에 도달하는 가격" />
            <ResultCard label="손절가" value={formatCurrency(result.stopLossPrice, currency)} tone="negative" detail="허용 손실 비율 기준의 가격" />
          </div>
        ) : (
          <EmptyResult title="목표가와 손절가가 여기에 표시됩니다." description="진입가와 목표 수익률, 손절 비율을 입력한 뒤 계산해 보세요." />
        )}
      </CalculatorSection>
    </div>
  )
}
