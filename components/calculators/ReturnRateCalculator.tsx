'use client'

import { useState } from 'react'
import { CalculatorField, ResultCard } from '@/components/calculators/shared'
import { calcReturnRate, type ReturnRateInput } from '@/lib/calculations'

export default function ReturnRateCalculator() {
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

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-3">
        <CalculatorField label="매수단가 (원)" value={buyPrice} onChange={setBuyPrice} placeholder="50000" />
        <CalculatorField label="현재가 (원)" value={currentPrice} onChange={setCurrentPrice} placeholder="55000" />
        <CalculatorField label="보유 수량 (주)" value={qty} onChange={setQty} placeholder="20" step="1" />
      </div>

      <button
        onClick={handleCalc}
        className="mt-6 w-full rounded-xl bg-sky-600 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
      >
        계산하기
      </button>

      {error ? <p className="mt-4 text-sm text-rose-600">{error}</p> : null}

      {result ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <ResultCard label="평가금액" value={`${Math.round(result.evaluationAmount).toLocaleString('ko-KR')}원`} tone="blue" />
          <ResultCard
            label="평가손익"
            value={`${Math.round(result.profitLoss).toLocaleString('ko-KR')}원`}
            tone={result.profitLoss >= 0 ? 'green' : 'rose'}
          />
          <ResultCard
            label="수익률"
            value={`${result.returnPercent.toFixed(2)}%`}
            tone={result.returnPercent >= 0 ? 'green' : 'rose'}
          />
        </div>
      ) : null}
    </div>
  )
}
