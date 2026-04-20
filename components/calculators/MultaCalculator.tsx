'use client'

import { useState } from 'react'
import { calcMulta, type MultaInput } from '@/lib/calculations'
import { CalculatorField, ResultCard } from '@/components/calculators/shared'

export default function MultaCalculator() {
  const [avgPrice, setAvgPrice] = useState('')
  const [qty, setQty] = useState('')
  const [addPrice, setAddPrice] = useState('')
  const [addQty, setAddQty] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcMulta> | null>(null)

  function handleCalc() {
    const input: MultaInput = {
      avgPrice: Number(avgPrice),
      qty: Number(qty),
      addPrice: Number(addPrice),
      addQty: Number(addQty)
    }

    if ([input.avgPrice, input.qty, input.addPrice, input.addQty].some((value) => Number.isNaN(value))) {
      setError('모든 값을 입력해 주세요.')
      setResult(null)
      return
    }

    if (input.avgPrice <= 0 || input.qty <= 0 || input.addPrice <= 0 || input.addQty <= 0) {
      setError('모든 입력값은 0보다 커야 합니다.')
      setResult(null)
      return
    }

    if (!Number.isInteger(input.qty) || !Number.isInteger(input.addQty)) {
      setError('보유 수량과 추가 수량은 정수만 입력할 수 있습니다.')
      setResult(null)
      return
    }

    setError('')
    setResult(calcMulta(input))
  }

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <CalculatorField label="현재 평단가 (원)" value={avgPrice} onChange={setAvgPrice} placeholder="50000" />
        <CalculatorField label="보유 수량 (주)" value={qty} onChange={setQty} placeholder="100" step="1" />
        <CalculatorField label="추가 매수가 (원)" value={addPrice} onChange={setAddPrice} placeholder="40000" />
        <CalculatorField label="추가 수량 (주)" value={addQty} onChange={setAddQty} placeholder="50" step="1" />
      </div>

      <button
        onClick={handleCalc}
        className="mt-6 w-full rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
      >
        계산하기
      </button>

      {error ? <p className="mt-4 text-sm text-rose-600">{error}</p> : null}

      {result ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <ResultCard label="새 평단가" value={`${Math.round(result.newAvgPrice).toLocaleString('ko-KR')}원`} tone="blue" />
          <ResultCard label="총 투자금" value={`${Math.round(result.totalInvestment).toLocaleString('ko-KR')}원`} tone="slate" />
          <ResultCard label="손익분기점" value={`${Math.round(result.breakEven).toLocaleString('ko-KR')}원`} tone="green" />
        </div>
      ) : null}
    </div>
  )
}
