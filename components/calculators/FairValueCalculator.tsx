'use client'

import { useState } from 'react'
import { calcFairValue, type FairValueInput } from '@/lib/calculations'
import { CalculatorField, ResultCard } from '@/components/calculators/shared'

export default function FairValueCalculator() {
  const [eps, setEps] = useState('')
  const [targetPer, setTargetPer] = useState('')
  const [bps, setBps] = useState('')
  const [targetPbr, setTargetPbr] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcFairValue> | null>(null)

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
  }

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <CalculatorField label="EPS (원)" value={eps} onChange={setEps} placeholder="5000" />
        <CalculatorField label="목표 PER (배)" value={targetPer} onChange={setTargetPer} placeholder="15" />
        <CalculatorField label="BPS (원)" value={bps} onChange={setBps} placeholder="30000" />
        <CalculatorField label="목표 PBR (배)" value={targetPbr} onChange={setTargetPbr} placeholder="1.5" />
      </div>

      <button
        onClick={handleCalc}
        className="mt-6 w-full rounded-xl bg-orange-500 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
      >
        계산하기
      </button>

      {error ? <p className="mt-4 text-sm text-rose-600">{error}</p> : null}

      {result ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <ResultCard label="PER 적정가" value={`${Math.round(result.perPrice).toLocaleString('ko-KR')}원`} tone="orange" />
          <ResultCard label="PBR 적정가" value={`${Math.round(result.pbrPrice).toLocaleString('ko-KR')}원`} tone="slate" />
          <ResultCard label="평균 적정가" value={`${Math.round(result.avgPrice).toLocaleString('ko-KR')}원`} tone="blue" />
        </div>
      ) : null}
    </div>
  )
}
