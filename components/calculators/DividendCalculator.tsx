'use client'

import { useState } from 'react'
import { calcDividend, type DividendInput } from '@/lib/calculations'
import { CalculatorField, ResultCard } from '@/components/calculators/shared'

export default function DividendCalculator() {
  const [stockPrice, setStockPrice] = useState('')
  const [dividendPerShare, setDividendPerShare] = useState('')
  const [qty, setQty] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcDividend> | null>(null)

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
  }

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4">
        <CalculatorField label="현재 주가 (원)" value={stockPrice} onChange={setStockPrice} placeholder="50000" />
        <CalculatorField
          label="주당 배당금 (원)"
          value={dividendPerShare}
          onChange={setDividendPerShare}
          placeholder="2000"
        />
        <CalculatorField label="보유 수량 (주)" value={qty} onChange={setQty} placeholder="100" step="1" />
      </div>

      <button
        onClick={handleCalc}
        className="mt-6 w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
      >
        계산하기
      </button>

      {error ? <p className="mt-4 text-sm text-rose-600">{error}</p> : null}

      {result ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <ResultCard label="배당수익률" value={`${result.yieldPercent.toFixed(2)}%`} tone="green" />
          <ResultCard label="연간 수령액" value={`${Math.round(result.annualIncome).toLocaleString('ko-KR')}원`} tone="slate" />
          <ResultCard label="월 환산액" value={`${Math.round(result.monthlyIncome).toLocaleString('ko-KR')}원`} tone="blue" />
        </div>
      ) : null}
    </div>
  )
}
