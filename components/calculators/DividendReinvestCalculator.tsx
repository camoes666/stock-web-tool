'use client'

import { useState } from 'react'
import { CalculatorField, ResultCard } from '@/components/calculators/shared'
import {
  calcDividendReinvest,
  type DividendReinvestInput
} from '@/lib/calculations'

export default function DividendReinvestCalculator() {
  const [stockPrice, setStockPrice] = useState('')
  const [dividendPerShare, setDividendPerShare] = useState('')
  const [qty, setQty] = useState('')
  const [years, setYears] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcDividendReinvest> | null>(null)

  function handleCalc() {
    const input: DividendReinvestInput = {
      stockPrice: Number(stockPrice),
      dividendPerShare: Number(dividendPerShare),
      qty: Number(qty),
      years: Number(years)
    }

    if ([input.stockPrice, input.dividendPerShare, input.qty, input.years].some((value) => Number.isNaN(value))) {
      setError('모든 값을 입력해 주세요.')
      setResult(null)
      return
    }

    if (input.stockPrice <= 0 || input.dividendPerShare <= 0 || input.qty <= 0 || input.years <= 0) {
      setError('모든 입력값은 0보다 커야 합니다.')
      setResult(null)
      return
    }

    if (!Number.isInteger(input.qty) || !Number.isInteger(input.years)) {
      setError('보유 수량과 투자 기간은 정수만 입력할 수 있습니다.')
      setResult(null)
      return
    }

    setError('')
    setResult(calcDividendReinvest(input))
  }

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <CalculatorField label="현재 주가 (원)" value={stockPrice} onChange={setStockPrice} placeholder="50000" />
        <CalculatorField
          label="주당 배당금 (원)"
          value={dividendPerShare}
          onChange={setDividendPerShare}
          placeholder="2000"
        />
        <CalculatorField label="보유 수량 (주)" value={qty} onChange={setQty} placeholder="100" step="1" />
        <CalculatorField label="투자 기간 (년)" value={years} onChange={setYears} placeholder="3" step="1" />
      </div>

      <button
        onClick={handleCalc}
        className="mt-6 w-full rounded-xl bg-teal-600 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
      >
        계산하기
      </button>

      {error ? <p className="mt-4 text-sm text-rose-600">{error}</p> : null}

      {result ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <ResultCard
            label="누적 배당금"
            value={`${Math.round(result.totalDividends).toLocaleString('ko-KR')}원`}
            tone="green"
          />
          <ResultCard label="예상 보유 수량" value={`${result.finalQty.toFixed(4)}주`} tone="blue" />
          <ResultCard
            label="예상 자산"
            value={`${Math.round(result.finalAsset).toLocaleString('ko-KR')}원`}
            tone="slate"
          />
        </div>
      ) : null}
    </div>
  )
}
