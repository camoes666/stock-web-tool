'use client'

import { useEffect, useState } from 'react'
import { trackCalculatorRun, trackCalculatorView } from '@/lib/analytics'
import { calcFairValue, type FairValueInput } from '@/lib/calculations'
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

export default function FairValueCalculator() {
  const [currency, setCurrency] = useStoredCurrency()
  const [eps, setEps] = useState('')
  const [targetPer, setTargetPer] = useState('')
  const [bps, setBps] = useState('')
  const [targetPbr, setTargetPbr] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcFairValue> | null>(null)

  useEffect(() => {
    trackCalculatorView({
      calculator_name: 'fair-value',
      calculator_category: 'stock'
    })
  }, [])

  function handleCalc() {
    const input: FairValueInput = {
      eps: Number(eps),
      targetPer: Number(targetPer),
      bps: Number(bps),
      targetPbr: Number(targetPbr)
    }

    if ([input.eps, input.targetPer, input.bps, input.targetPbr].some((value) => Number.isNaN(value))) {
      setError('모든 값을 입력해 주세요.')
      setResult(null)
      return
    }

    if (input.eps <= 0 || input.targetPer <= 0 || input.bps <= 0 || input.targetPbr <= 0) {
      setError('모든 입력값은 0보다 커야 합니다.')
      setResult(null)
      return
    }

    setError('')
    setResult(calcFairValue(input))
    trackCalculatorRun({
      calculator_name: 'fair-value',
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
        title="이익과 장부가 기준을 입력하세요"
        description="EPS와 BPS, 목표 배수를 함께 넣어 적정가 범위를 간단하게 추정할 수 있습니다."
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-800">표시 통화</p>
            <p className="mt-1 text-xs text-slate-500">EPS, BPS와 계산 결과를 선택한 통화 단위로 해석할 수 있습니다.</p>
          </div>
          <CurrencySelector value={currency} onChange={setCurrency} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <CalculatorField label={`EPS (${currencyLabel})`} value={eps} onChange={setEps} placeholder="5000" helpText={`주당순이익 · ${moneyExample}`} />
          <CalculatorField label="목표 PER" value={targetPer} onChange={setTargetPer} placeholder="15" helpText="적용하고 싶은 PER 배수" />
          <CalculatorField label={`BPS (${currencyLabel})`} value={bps} onChange={setBps} placeholder="30000" helpText={`주당순자산가치 · ${moneyExample}`} />
          <CalculatorField label="목표 PBR" value={targetPbr} onChange={setTargetPbr} placeholder="1.5" helpText="적용하고 싶은 PBR 배수" />
        </div>

        <div className="mt-6 space-y-4">
          <CalculatorActionButton onClick={handleCalc}>적정가 계산하기</CalculatorActionButton>
          {error ? <CalculatorError>{error}</CalculatorError> : null}
        </div>
      </CalculatorSection>

      <CalculatorSection
        eyebrow="Result"
        title="PER과 PBR 기준 적정가"
        description="서로 다른 두 기준을 함께 보고 평균값까지 참고하면 대략적인 가격 범위를 더 쉽게 가늠할 수 있습니다."
      >
        {result ? (
          <div className="grid gap-4 sm:grid-cols-3">
            <ResultCard label="PER 기준" value={formatCurrency(result.perPrice, currency)} tone="muted" detail="EPS와 목표 PER로 계산한 적정가" />
            <ResultCard label="PBR 기준" value={formatCurrency(result.pbrPrice, currency)} tone="default" detail="BPS와 목표 PBR로 계산한 적정가" />
            <ResultCard label="평균 적정가" value={formatCurrency(result.avgPrice, currency)} tone="positive" detail="두 기준의 단순 평균값" />
          </div>
        ) : (
          <EmptyResult title="적정가 추정 결과가 여기에 표시됩니다." description="EPS, BPS와 목표 배수를 입력한 뒤 적정가를 계산해 보세요." />
        )}
      </CalculatorSection>
    </div>
  )
}
