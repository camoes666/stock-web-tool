'use client'

import { useState } from 'react'
import { CalculatorField, ResultCard } from '@/components/calculators/shared'
import {
  calcAveragingDownTarget,
  type AveragingDownTargetInput
} from '@/lib/calculations'

export default function AveragingDownTargetCalculator() {
  const [avgPrice, setAvgPrice] = useState('')
  const [qty, setQty] = useState('')
  const [currentPrice, setCurrentPrice] = useState('')
  const [targetAvgPrice, setTargetAvgPrice] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcAveragingDownTarget> | null>(null)

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
  }

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <CalculatorField label="현재 평단가 (원)" value={avgPrice} onChange={setAvgPrice} placeholder="50000" />
        <CalculatorField label="보유 수량 (주)" value={qty} onChange={setQty} placeholder="100" step="1" />
        <CalculatorField label="현재가 (원)" value={currentPrice} onChange={setCurrentPrice} placeholder="40000" />
        <CalculatorField label="목표 평단가 (원)" value={targetAvgPrice} onChange={setTargetAvgPrice} placeholder="45000" />
      </div>

      <button
        onClick={handleCalc}
        className="mt-6 w-full rounded-xl bg-cyan-700 py-3 text-sm font-semibold text-white transition hover:bg-cyan-800"
      >
        계산하기
      </button>

      {error ? <p className="mt-4 text-sm text-rose-600">{error}</p> : null}

      {result ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <ResultCard label="필요한 추가 수량" value={`${result.requiredQty.toLocaleString('ko-KR')}주`} tone="blue" />
          <ResultCard
            label="추가 매수 금액"
            value={`${Math.round(result.requiredInvestment).toLocaleString('ko-KR')}원`}
            tone="slate"
          />
          <ResultCard
            label="예상 새 평단가"
            value={`${Math.round(result.estimatedAvgPrice).toLocaleString('ko-KR')}원`}
            tone="green"
          />
        </div>
      ) : null}
    </div>
  )
}
