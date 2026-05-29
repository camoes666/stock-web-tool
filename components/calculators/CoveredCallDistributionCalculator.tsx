'use client'

import { useEffect, useMemo, useState } from 'react'
import { trackCalculatorRun, trackCalculatorView } from '@/lib/analytics'
import { calcCoveredCallDistributionIncome } from '@/lib/calculations'
import type { AccountType } from '@/lib/etf-income/types'
import type {
  CoveredCallCalculatorAccountDefaults,
  CoveredCallCalculatorEtfOption
} from '@/lib/etf-income/view-model'
import {
  CalculatorActionButton,
  CalculatorError,
  CalculatorField,
  CalculatorSection,
  EmptyResult,
  ResultCard,
  formatCurrency
} from '@/components/calculators/shared'

const accountLabels: Record<AccountType, string> = {
  general: '일반계좌',
  isa: 'ISA',
  pension: '연금계좌'
}

const accountResultNotes: Record<AccountType, string> = {
  general: '배당소득세 기본 가정을 반영한 세후 현금흐름입니다.',
  isa: '비과세 한도 초과분에 대한 분리과세 가정을 반영했습니다.',
  pension: '연금계좌는 과세이연 기준으로 비교하며, 실제 수령 시점 과세는 별도로 확인하세요.'
}

type CoveredCallDistributionComparisonResult = ReturnType<typeof calcCoveredCallDistributionIncome> & {
  accountType: AccountType
}

export default function CoveredCallDistributionCalculator({
  etfOptions,
  accountDefaults
}: {
  etfOptions: CoveredCallCalculatorEtfOption[]
  accountDefaults: CoveredCallCalculatorAccountDefaults
}) {
  const defaultOption = etfOptions[0]
  const [selectedSymbol, setSelectedSymbol] = useState<string>(defaultOption?.symbol ?? '')
  const [investmentAmount, setInvestmentAmount] = useState('10000000')
  const [pricePerShare, setPricePerShare] = useState(String(defaultOption?.priceReference ?? 0))
  const [monthlyDistributionPerShare, setMonthlyDistributionPerShare] = useState(
    String(defaultOption?.monthlyDistributionPerShare ?? 0)
  )
  const [error, setError] = useState('')
  const [results, setResults] = useState<CoveredCallDistributionComparisonResult[] | null>(null)

  useEffect(() => {
    trackCalculatorView({
      calculator_name: 'covered-call-distribution',
      calculator_category: 'stock'
    })
  }, [])

  const selectedEtf = useMemo(
    () => etfOptions.find((option) => option.symbol === selectedSymbol) ?? defaultOption,
    [defaultOption, etfOptions, selectedSymbol]
  )

  function handleEtfChange(value: string) {
    setSelectedSymbol(value)
    const nextOption = etfOptions.find((option) => option.symbol === value)

    if (!nextOption) {
      return
    }

    setPricePerShare(String(nextOption.priceReference))
    setMonthlyDistributionPerShare(String(nextOption.monthlyDistributionPerShare))
  }

  function handleCalc() {
    const parsedInvestmentAmount = Number(investmentAmount)
    const parsedPricePerShare = Number(pricePerShare)
    const parsedMonthlyDistributionPerShare = Number(monthlyDistributionPerShare)

    if (
      [parsedInvestmentAmount, parsedPricePerShare, parsedMonthlyDistributionPerShare].some((value) =>
        Number.isNaN(value)
      )
    ) {
      setError('모든 값을 입력해 주세요.')
      setResults(null)
      return
    }

    if (parsedInvestmentAmount <= 0 || parsedPricePerShare <= 0 || parsedMonthlyDistributionPerShare <= 0) {
      setError('모든 입력값은 0보다 커야 합니다.')
      setResults(null)
      return
    }

    const nextResults = (['general', 'isa', 'pension'] as const).map((accountType) => ({
      accountType,
      ...calcCoveredCallDistributionIncome({
        investmentAmount: parsedInvestmentAmount,
        pricePerShare: parsedPricePerShare,
        monthlyDistributionPerShare: parsedMonthlyDistributionPerShare,
        accountType,
        ...accountDefaults[accountType]
      })
    }))

    setError('')
    setResults(nextResults)
    trackCalculatorRun({
      calculator_name: 'covered-call-distribution',
      calculator_category: 'stock',
      input_count: 3
    })
  }

  return (
    <div className="grid gap-5">
      <CalculatorSection
        eyebrow="Input"
        title="ETF와 투자 금액을 입력하세요"
        description="대표 커버드콜 ETF를 선택하고 투자 금액을 넣으면 일반계좌, ISA, 연금계좌 기준 월 세전·세후 현금흐름을 비교합니다."
      >
        <p className="mb-4 text-sm leading-6 text-slate-500">
          이 계산기는 주가 변동을 제외한 월분배 현금흐름 비교용입니다.
        </p>
        {etfOptions.length === 0 ? (
          <EmptyResult
            title="아직 Supabase에 표시할 ETF 데이터가 없습니다."
            description="etf_products와 etf_distribution_profiles에 최신 ETF와 분배금 데이터를 넣으면 이 계산기에서 바로 선택할 수 있습니다."
          />
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-3">
              <label className="block sm:col-span-3">
                <span className="mb-2 block text-sm font-medium text-slate-800">ETF 선택</span>
                <span className="mb-3 block text-xs leading-5 text-slate-500">
                  기본값은 Supabase seed 기준 대표 커버드콜 ETF입니다.
                </span>
                <select
                  value={selectedSymbol}
                  onChange={(event) => handleEtfChange(event.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                >
                  {etfOptions.map((option) => (
                    <option key={option.symbol} value={option.symbol}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </label>

              <CalculatorField
                label="투자 금액 (원)"
                value={investmentAmount}
                onChange={setInvestmentAmount}
                placeholder="10000000"
                helpText="해당 ETF에 투자할 총 금액입니다."
              />
              <CalculatorField
                label="기준 가격 (원)"
                value={pricePerShare}
                onChange={setPricePerShare}
                placeholder="10000"
                helpText="현재 참고 가격 또는 계산 기준 가격입니다."
              />
              <CalculatorField
                label="주당 월분배금 (원)"
                value={monthlyDistributionPerShare}
                onChange={setMonthlyDistributionPerShare}
                placeholder="120"
                helpText="최근 공시 기준 또는 가정한 월분배금입니다."
              />
            </div>

            <div className="mt-6 space-y-4">
              <CalculatorActionButton onClick={handleCalc}>계좌별 세후 월분배 비교하기</CalculatorActionButton>
              {error ? <CalculatorError>{error}</CalculatorError> : null}
            </div>
          </>
        )}
      </CalculatorSection>

      <CalculatorSection
        eyebrow="Result"
        title={`${selectedEtf?.name ?? '선택한 ETF'} 기준 계좌별 현금흐름 비교`}
        description="월 세전 분배금과 세후 수령액, 연간 누적 현금흐름, 예상 세금을 계좌별로 나란히 비교합니다. 주가 상승이나 하락에 따른 평가손익은 현재 버전에서 제외합니다."
      >
        {results ? (
          <div className="grid gap-4">
            {results.map((result) => (
              <div key={result.accountType} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950">{accountLabels[result.accountType]}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{accountResultNotes[result.accountType]}</p>
                  </div>
                  <p className="text-xs font-medium text-slate-500">보유 수량 {result.quantity.toLocaleString()}주 기준</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                  <ResultCard
                    label="보유 수량"
                    value={`${result.quantity.toLocaleString()}주`}
                    tone="muted"
                    detail="투자 금액 기준으로 매수 가능한 수량"
                  />
                  <ResultCard
                    label="월 세전 분배금"
                    value={formatCurrency(result.monthlyGrossIncome, 'KRW')}
                    detail="주당 월분배금 x 보유 수량"
                  />
                  <ResultCard
                    label="월 세후 수령액"
                    value={formatCurrency(result.monthlyNetIncome, 'KRW')}
                    tone="positive"
                    detail="세금 반영 후 월 기준 현금흐름"
                  />
                  <ResultCard
                    label="연간 세후 수령액"
                    value={formatCurrency(result.annualNetIncome, 'KRW')}
                    detail="12개월 기준 세후 누적 현금흐름"
                  />
                  <ResultCard
                    label="연간 예상 세금"
                    value={formatCurrency(result.annualTax, 'KRW')}
                    tone={result.annualTax > 0 ? 'negative' : 'default'}
                    detail={
                      result.accountType === 'pension'
                        ? '현재 비교는 과세이연 기준이며 수령 시점 과세는 별도 확인이 필요합니다.'
                        : '현재 가정한 세율과 한도를 반영한 연간 예상 세금'
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyResult
            title="계좌별 세후 월분배 비교 결과가 아직 없습니다."
            description="ETF와 투자 금액, 기준 가격, 주당 월분배금을 입력하면 일반계좌, ISA, 연금계좌 비교 결과가 표시됩니다."
          />
        )}
      </CalculatorSection>
    </div>
  )
}
