'use client'

import { useState } from 'react'
import { CalculatorField, ResultCard } from '@/components/calculators/shared'
import { calcCompoundReturn, type CompoundReturnInput } from '@/lib/calculations'

export default function CompoundReturnCalculator() {
  const [principal, setPrincipal] = useState('')
  const [monthlyContribution, setMonthlyContribution] = useState('')
  const [annualRate, setAnnualRate] = useState('')
  const [years, setYears] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcCompoundReturn> | null>(null)

  function handleCalc() {
    const input: CompoundReturnInput = {
      principal: Number(principal),
      monthlyContribution: Number(monthlyContribution),
      annualRate: Number(annualRate),
      years: Number(years)
    }

    if ([input.principal, input.monthlyContribution, input.annualRate, input.years].some((value) => Number.isNaN(value))) {
      setError('모든 값을 입력해 주세요.')
      setResult(null)
      return
    }

    if (input.principal <= 0 || input.monthlyContribution < 0 || input.annualRate < 0 || input.years <= 0) {
      setError('초기 투자금과 투자 기간은 0보다 커야 하며, 적립액과 수익률은 0 이상이어야 합니다.')
      setResult(null)
      return
    }

    setError('')
    setResult(calcCompoundReturn(input))
  }

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <CalculatorField label="초기 투자금 (원)" value={principal} onChange={setPrincipal} placeholder="10000000" />
        <CalculatorField
          label="월 적립액 (원)"
          value={monthlyContribution}
          onChange={setMonthlyContribution}
          placeholder="500000"
        />
        <CalculatorField label="연 수익률 (%)" value={annualRate} onChange={setAnnualRate} placeholder="8" />
        <CalculatorField label="투자 기간 (년)" value={years} onChange={setYears} placeholder="10" />
      </div>

      <button
        onClick={handleCalc}
        className="mt-6 w-full rounded-xl bg-lime-600 py-3 text-sm font-semibold text-white transition hover:bg-lime-700"
      >
        계산하기
      </button>

      {error ? <p className="mt-4 text-sm text-rose-600">{error}</p> : null}

      {result ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <ResultCard label="만기 자산" value={`${Math.round(result.finalAmount).toLocaleString('ko-KR')}원`} tone="green" />
          <ResultCard
            label="투자원금"
            value={`${Math.round(result.totalContribution).toLocaleString('ko-KR')}원`}
            tone="slate"
          />
          <ResultCard
            label="예상 수익"
            value={`${Math.round(result.estimatedProfit).toLocaleString('ko-KR')}원`}
            tone="blue"
          />
        </div>
      ) : null}
    </div>
  )
}
