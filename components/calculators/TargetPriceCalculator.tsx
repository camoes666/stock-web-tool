'use client'

import { useState } from 'react'
import { CalculatorField, ResultCard } from '@/components/calculators/shared'
import { calcTargetPrice, type TargetPriceInput } from '@/lib/calculations'

export default function TargetPriceCalculator() {
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
      setError('손절률은 100보다 작아야 합니다.')
      setResult(null)
      return
    }

    setError('')
    setResult(calcTargetPrice(input))
  }

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-3">
        <CalculatorField label="진입가 (원)" value={entryPrice} onChange={setEntryPrice} placeholder="50000" />
        <CalculatorField label="목표 수익률 (%)" value={profitPercent} onChange={setProfitPercent} placeholder="12" />
        <CalculatorField label="손절률 (%)" value={lossPercent} onChange={setLossPercent} placeholder="7" />
      </div>

      <button
        onClick={handleCalc}
        className="mt-6 w-full rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
      >
        계산하기
      </button>

      {error ? <p className="mt-4 text-sm text-rose-600">{error}</p> : null}

      {result ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <ResultCard label="목표가" value={`${Math.round(result.targetPrice).toLocaleString('ko-KR')}원`} tone="green" />
          <ResultCard label="손절가" value={`${Math.round(result.stopLossPrice).toLocaleString('ko-KR')}원`} tone="rose" />
        </div>
      ) : null}
    </div>
  )
}
