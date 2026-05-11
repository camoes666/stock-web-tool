'use client'

import { useState } from 'react'
import { calcCompoundReturn, type CompoundReturnInput } from '@/lib/calculations'
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

export default function CompoundReturnCalculator() {
  const [currency, setCurrency] = useStoredCurrency()
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
      setError('초기 투자금과 투자 기간은 0보다 커야 하고, 적립금과 수익률은 0 이상이어야 합니다.')
      setResult(null)
      return
    }

    setError('')
    setResult(calcCompoundReturn(input))
  }

  const moneyExample = getCurrencyExample(currency)
  const currencyLabel = getCurrencyLabel(currency)

  return (
    <div className="grid gap-5">
      <CalculatorSection
        eyebrow="Input"
        title="장기 적립 조건을 입력하세요"
        description="초기 투자금, 월 적립금, 기대 수익률을 입력해 복리 성장 경로를 시뮬레이션합니다."
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-800">표시 통화</p>
            <p className="mt-1 text-xs text-slate-500">초기 투자금, 적립금, 만기 자산을 원 또는 달러 기준으로 볼 수 있습니다.</p>
          </div>
          <CurrencySelector value={currency} onChange={setCurrency} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <CalculatorField label={`초기 투자금 (${currencyLabel})`} value={principal} onChange={setPrincipal} placeholder="10000000" helpText={`시작 시점의 투자 원금 · ${moneyExample}`} />
          <CalculatorField label={`월 적립금 (${currencyLabel})`} value={monthlyContribution} onChange={setMonthlyContribution} placeholder="500000" helpText={`매달 추가로 투자할 금액 · ${moneyExample}`} />
          <CalculatorField label="연 수익률" value={annualRate} onChange={setAnnualRate} placeholder="8" helpText="연간 기대 수익률(%)" />
          <CalculatorField label="투자 기간" value={years} onChange={setYears} placeholder="10" helpText="장기 투자 기간(년)" />
        </div>

        <div className="mt-6 space-y-4">
          <CalculatorActionButton onClick={handleCalc}>복리 시뮬레이션하기</CalculatorActionButton>
          {error ? <CalculatorError>{error}</CalculatorError> : null}
        </div>
      </CalculatorSection>

      <CalculatorSection
        eyebrow="Result"
        title="적립식 복리 성장 결과"
        description="만기 자산과 총 납입금, 예상 이익을 분리해서 보여줘 장기 시나리오를 쉽게 비교할 수 있습니다."
      >
        {result ? (
          <div className="grid gap-4 sm:grid-cols-3">
            <ResultCard label="만기 자산" value={formatCurrency(result.finalAmount, currency)} tone="positive" detail="복리와 적립금을 모두 반영한 최종 자산" />
            <ResultCard label="총 납입금" value={formatCurrency(result.totalContribution, currency)} tone="muted" detail="초기 투자금과 월 적립금의 합계" />
            <ResultCard label="예상 이익" value={formatCurrency(result.estimatedProfit, currency)} tone="default" detail="총 납입금을 제외한 예상 이익" />
          </div>
        ) : (
          <EmptyResult title="복리 시뮬레이션 결과가 아직 없습니다." description="초기 투자금과 적립 조건을 입력하면 만기 자산이 여기에 표시됩니다." />
        )}
      </CalculatorSection>
    </div>
  )
}
