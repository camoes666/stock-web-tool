'use client'

import { useEffect, useState } from 'react'
import { trackCalculatorRun, trackCalculatorView } from '@/lib/analytics'
import { calcMulta, type MultaInput } from '@/lib/calculations'
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

export default function MultaCalculator() {
  const [currency, setCurrency] = useStoredCurrency()
  const [avgPrice, setAvgPrice] = useState('')
  const [qty, setQty] = useState('')
  const [addPrice, setAddPrice] = useState('')
  const [addQty, setAddQty] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcMulta> | null>(null)

  useEffect(() => {
    trackCalculatorView({
      calculator_name: 'multa',
      calculator_category: 'stock'
    })
  }, [])

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
    trackCalculatorRun({
      calculator_name: 'multa',
      calculator_category: 'stock',
      input_count: 4
    })
  }

  const moneyExample = getCurrencyExample(currency)
  const currencyLabel = getCurrencyLabel(currency)

  return (
    <div className="grid gap-5">
      <CalculatorSection
        eyebrow="Input"
        title="현재 보유와 추가 매수 조건을 입력하세요"
        description="현재 평단가와 추가 매수 가격을 바탕으로 새 평단과 총 투자금 변화를 계산합니다."
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-800">표시 통화</p>
            <p className="mt-1 text-xs text-slate-500">입력 예시와 결과 금액이 함께 바뀝니다.</p>
          </div>
          <CurrencySelector value={currency} onChange={setCurrency} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <CalculatorField label={`현재 평단가 (${currencyLabel})`} value={avgPrice} onChange={setAvgPrice} placeholder="50000" helpText={`보유 중인 주식의 평균 매입 단가 · ${moneyExample}`} />
          <CalculatorField label="보유 수량" value={qty} onChange={setQty} placeholder="100" step="1" helpText="현재 들고 있는 주식 수량" />
          <CalculatorField label={`추가 매수가 (${currencyLabel})`} value={addPrice} onChange={setAddPrice} placeholder="40000" helpText={`새로 매수하려는 가격 · ${moneyExample}`} />
          <CalculatorField label="추가 수량" value={addQty} onChange={setAddQty} placeholder="50" step="1" helpText="추가로 살 주식 수량" />
        </div>

        <div className="mt-6 space-y-4">
          <CalculatorActionButton onClick={handleCalc}>새 평단 계산하기</CalculatorActionButton>
          {error ? <CalculatorError>{error}</CalculatorError> : null}
        </div>
      </CalculatorSection>

      <CalculatorSection
        eyebrow="Result"
        title="추가 매수 이후의 평균 단가"
        description="핵심 숫자와 함께 매수 뒤 포지션이 어떻게 달라지는지 한 번에 확인합니다."
      >
        {result ? (
          <div className="grid gap-4 sm:grid-cols-3">
            <ResultCard label="새 평단가" value={formatCurrency(result.newAvgPrice, currency)} tone="muted" detail="추가 매수까지 반영한 평균 매입 단가" />
            <ResultCard label="총 투자금" value={formatCurrency(result.totalInvestment, currency)} tone="default" detail="기존 보유분과 추가 매수분을 합친 금액" />
            <ResultCard label="손익분기 가격" value={formatCurrency(result.breakEven, currency)} tone="positive" detail="수수료를 제외한 단순 기준의 분기 가격" />
          </div>
        ) : (
          <EmptyResult title="입력값을 넣으면 새 평단이 여기에 표시됩니다." description="보유 평단가와 추가 매수 조건을 입력한 뒤 계산 버튼을 눌러 주세요." />
        )}
      </CalculatorSection>
    </div>
  )
}
