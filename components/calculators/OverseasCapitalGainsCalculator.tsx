'use client'

import { useState } from 'react'
import { trackCalculatorRun } from '@/lib/analytics'
import {
  calcOverseasCapitalGains,
  type OverseasCapitalGainsInput
} from '@/lib/calculations'
import {
  CalculatorActionButton,
  CalculatorError,
  CalculatorField,
  CalculatorSection,
  EmptyResult,
  ResultCard,
  formatCurrency
} from '@/components/calculators/shared'
import { useCalculatorTracking } from '@/components/calculators/useCalculatorTracking'

const DEFAULT_BASIC_DEDUCTION = '2500000'
const DEFAULT_TAX_RATE = '22'

export default function OverseasCapitalGainsCalculator() {
  const [buyAmount, setBuyAmount] = useState('')
  const [sellAmount, setSellAmount] = useState('')
  const [buyFxRate, setBuyFxRate] = useState('')
  const [sellFxRate, setSellFxRate] = useState('')
  const [deductibleExpenses, setDeductibleExpenses] = useState('0')
  const [basicDeduction, setBasicDeduction] = useState(DEFAULT_BASIC_DEDUCTION)
  const [taxRatePercent, setTaxRatePercent] = useState(DEFAULT_TAX_RATE)
  const [error, setError] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcOverseasCapitalGains> | null>(null)
  const { trackInputStart } = useCalculatorTracking({
    calculatorName: 'overseas-capital-gains',
    calculatorCategory: 'stock',
    hasResult: result !== null
  })

  function applyExample() {
    trackInputStart()
    setBuyAmount('10000')
    setSellAmount('15000')
    setBuyFxRate('1350')
    setSellFxRate('1380')
    setDeductibleExpenses('0')
    setBasicDeduction(DEFAULT_BASIC_DEDUCTION)
    setTaxRatePercent(DEFAULT_TAX_RATE)
    setError('')
  }

  function handleCalc() {
    const input: OverseasCapitalGainsInput = {
      buyAmount: Number(buyAmount),
      sellAmount: Number(sellAmount),
      buyFxRate: Number(buyFxRate),
      sellFxRate: Number(sellFxRate),
      deductibleExpenses: Number(deductibleExpenses || '0'),
      basicDeduction: Number(basicDeduction || '0'),
      taxRatePercent: Number(taxRatePercent || '0')
    }
    const expenseAmount = input.deductibleExpenses
    const deductionAmount = input.basicDeduction ?? 0
    const taxRate = input.taxRatePercent ?? 0

    if (
      [
        input.buyAmount,
        input.sellAmount,
        input.buyFxRate,
        input.sellFxRate,
        expenseAmount,
        deductionAmount,
        taxRate
      ].some((value) => Number.isNaN(value))
    ) {
      setError('모든 값을 올바르게 입력해 주세요.')
      setResult(null)
      return
    }

    if (input.buyAmount <= 0 || input.sellAmount <= 0 || input.buyFxRate <= 0 || input.sellFxRate <= 0) {
      setError('매수·매도 금액과 환율은 모두 0보다 커야 합니다.')
      setResult(null)
      return
    }

    if (expenseAmount < 0 || deductionAmount < 0 || taxRate < 0) {
      setError('필요경비, 기본공제, 세율은 0 이상이어야 합니다.')
      setResult(null)
      return
    }

    setError('')
    setResult(calcOverseasCapitalGains(input))
    trackCalculatorRun({
      calculator_name: 'overseas-capital-gains',
      calculator_category: 'stock',
      input_count: 7,
      fee_enabled: expenseAmount > 0,
      tax_enabled: taxRate > 0
    })
  }

  return (
    <div className="grid gap-5">
      <CalculatorSection
        eyebrow="Input"
        title="해외주식 양도세 계산값을 입력하세요"
        description="미국주식 등 해외주식의 매수·매도 금액과 환율을 넣으면 원화 기준 양도차익과 예상 세금을 빠르게 계산할 수 있습니다."
      >
        <div className="mb-5 rounded-2xl border border-brand-100 bg-brand-50/80 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-950">빠른 예시 입력</p>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                처음이면 미국주식 예시값으로 먼저 계산해본 뒤, 금액과 환율을 바꿔보는 흐름이 가장 이해하기 쉽습니다.
              </p>
            </div>
            <button
              type="button"
              onClick={applyExample}
              className="inline-flex min-w-fit shrink-0 items-center justify-center whitespace-nowrap rounded-full border border-brand-200 bg-white px-5 py-2 text-xs font-semibold leading-none text-brand-700 transition hover:border-brand-300 hover:bg-brand-50"
            >
              미국주식 예시
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
            <p className="text-sm font-semibold text-slate-900">1. 매수 정보</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">매수에 사용한 현지통화 금액과 당시 환율을 입력합니다.</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <CalculatorField
                label="총 매수금액 (현지통화)"
                value={buyAmount}
                onChange={setBuyAmount}
                onFirstInteraction={trackInputStart}
                placeholder="10000"
                helpText="해외주식 매수에 사용한 현지통화 총액"
              />
              <CalculatorField
                label="매수 시 환율 (원)"
                value={buyFxRate}
                onChange={setBuyFxRate}
                onFirstInteraction={trackInputStart}
                placeholder="1350"
                helpText="매수금액을 원화로 환산할 때 쓸 환율"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
            <p className="text-sm font-semibold text-slate-900">2. 매도 정보</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">매도 후 회수한 금액과 매도 시점 환율, 필요경비를 입력합니다.</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <CalculatorField
                label="총 매도금액 (현지통화)"
                value={sellAmount}
                onChange={setSellAmount}
                onFirstInteraction={trackInputStart}
                placeholder="15000"
                helpText="매도 후 회수한 현지통화 총액"
              />
              <CalculatorField
                label="매도 시 환율 (원)"
                value={sellFxRate}
                onChange={setSellFxRate}
                onFirstInteraction={trackInputStart}
                placeholder="1380"
                helpText="매도금액을 원화로 환산할 때 쓸 환율"
              />
              <CalculatorField
                label="필요경비 (원)"
                value={deductibleExpenses}
                onChange={setDeductibleExpenses}
                onFirstInteraction={trackInputStart}
                placeholder="0"
                helpText="수수료 등 필요경비가 있으면 원화 기준으로 입력하세요."
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
            <p className="text-sm font-semibold text-slate-900">3. 세금 옵션</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              기본공제 250만원과 예상 세율 22%는 일반적인 참고값이며, 필요하면 직접 수정할 수 있습니다.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <CalculatorField
              label="기본공제 (원)"
              value={basicDeduction}
              onChange={setBasicDeduction}
              onFirstInteraction={trackInputStart}
              placeholder={DEFAULT_BASIC_DEDUCTION}
              helpText="기본공제 금액"
            />
            <CalculatorField
              label="예상 세율 (%)"
              value={taxRatePercent}
              onChange={setTaxRatePercent}
              onFirstInteraction={trackInputStart}
              placeholder={DEFAULT_TAX_RATE}
              helpText="지방세 포함 기준 예상 세율"
            />
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <CalculatorActionButton onClick={handleCalc}>양도세 계산하기</CalculatorActionButton>
          {error ? <CalculatorError>{error}</CalculatorError> : null}
        </div>
      </CalculatorSection>

      <CalculatorSection
        eyebrow="Result"
        title="원화 기준 예상 양도세"
        description="매수·매도금 환산부터 과세표준과 세후 차익까지 한 단계씩 나눠 보여줍니다."
      >
        {result ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <ResultCard
              label="원화 매수금액"
              value={formatCurrency(result.krwBuyAmount, 'KRW')}
              tone="muted"
              detail="매수금액을 원화로 환산한 값"
            />
            <ResultCard
              label="원화 매도금액"
              value={formatCurrency(result.krwSellAmount, 'KRW')}
              tone="muted"
              detail="매도금액을 원화로 환산한 값"
            />
            <ResultCard
              label="양도차익"
              value={formatCurrency(result.capitalGain, 'KRW')}
              tone={result.capitalGain >= 0 ? 'positive' : 'negative'}
              detail="필요경비까지 차감한 기본 차익"
            />
            <ResultCard
              label="과세표준"
              value={formatCurrency(result.taxableBase, 'KRW')}
              tone="default"
              detail="기본공제 반영 후 과세 대상 금액"
            />
            <ResultCard
              label="예상 세액"
              value={formatCurrency(result.estimatedTax, 'KRW')}
              tone="negative"
              detail="입력한 세율 기준 예상 양도세"
            />
            <ResultCard
              label="세후 예상 차익"
              value={formatCurrency(result.afterTaxGain, 'KRW')}
              tone={result.afterTaxGain >= 0 ? 'positive' : 'negative'}
              detail="세금을 차감한 뒤 남는 예상 차익"
            />
          </div>
        ) : (
          <EmptyResult
            title="계산 결과가 아직 없습니다."
            description="매수·매도 금액과 환율을 입력하면 원화 기준 양도차익과 예상 양도세가 여기에 표시됩니다."
          />
        )}

        {result ? (
          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-900">
            이 계산기는 단일 거래 또는 단순 합산 기준 참고용입니다. 실제 신고 금액은 거래내역, 손익통산 여부, 필요경비 인정 범위에 따라 달라질 수 있습니다.
          </div>
        ) : null}
      </CalculatorSection>
    </div>
  )
}
