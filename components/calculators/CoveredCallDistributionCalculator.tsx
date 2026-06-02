'use client'

import { useEffect, useMemo, useState } from 'react'
import { trackCalculatorRun, trackCalculatorView } from '@/lib/analytics'
import {
  calcCoveredCallSummaryInsight,
  calcCoveredCallTotalReturnScenarios
} from '@/lib/calculations'
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
  formatCurrency
} from '@/components/calculators/shared'

const accountLabels: Record<AccountType, string> = {
  general: '일반계좌',
  isa: 'ISA',
  pension: '연금계좌'
}

const exampleInvestmentAmounts = [5000000, 10000000, 30000000] as const

const accountResultNotes: Record<AccountType, string> = {
  general: '배당소득세 기본 가정을 반영한 세후 현금흐름입니다.',
  isa: '비과세 한도 초과분에 대한 분리과세 가정을 반영했습니다.',
  pension: '연금계좌는 과세이연 기준으로 비교하며, 실제 수령 시점 과세는 별도로 확인하세요.'
}

type CoveredCallDistributionComparisonResult = ReturnType<typeof calcCoveredCallTotalReturnScenarios> & {
  accountType: AccountType
}

function MetricCard({
  label,
  value,
  detail,
  tone = 'default',
  emphasis = 'compact'
}: {
  label: string
  value: string
  detail: string
  tone?: 'default' | 'positive' | 'negative' | 'muted' | 'info' | 'warning'
  emphasis?: 'hero' | 'compact'
}) {
  const toneClass = {
    default: 'border-slate-200 bg-white text-slate-950',
    positive: 'border-emerald-200 bg-emerald-50/80 text-emerald-950',
    negative: 'border-rose-200 bg-rose-50/80 text-rose-950',
    muted: 'border-brand-100 bg-brand-50/80 text-brand-950',
    info: 'border-sky-200 bg-sky-50/80 text-sky-950',
    warning: 'border-amber-200 bg-amber-50/80 text-amber-950'
  }[tone]

  return (
    <div className={`flex h-full flex-col rounded-2xl border p-4 ${toneClass}`}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] opacity-70">{label}</p>
      <p
        className={`mt-3 whitespace-nowrap font-semibold tracking-tight ${
          emphasis === 'hero'
            ? 'text-[clamp(1.6rem,2.8vw,2.4rem)]'
            : 'whitespace-normal break-keep text-[clamp(1rem,1.55vw,1.5rem)] leading-tight'
        }`}
      >
        {value}
      </p>
      <p className="mt-2 text-xs leading-5 opacity-80">{detail}</p>
    </div>
  )
}

function ScenarioMetricCard({
  label,
  evaluationProfitLoss,
  expectedTotalReturn
}: {
  label: string
  evaluationProfitLoss: number
  expectedTotalReturn: number
}) {
  const tone =
    evaluationProfitLoss > 0 ? 'positive' : evaluationProfitLoss < 0 ? 'negative' : 'default'
  const shellClass =
    evaluationProfitLoss > 0
      ? 'border-emerald-200 bg-emerald-50/70'
      : evaluationProfitLoss < 0
        ? 'border-rose-200 bg-rose-50/70'
        : 'border-slate-200 bg-slate-50/90'

  return (
    <div className={`rounded-2xl border p-4 ${shellClass}`}>
      <p className="text-sm font-semibold text-slate-950">{label}</p>
      <div className="mt-4 grid auto-rows-fr gap-3">
        <MetricCard
          label="평가손익"
          value={formatCurrency(evaluationProfitLoss, 'KRW')}
          detail="기준 가격 대비 손익"
          tone={tone}
        />
        <MetricCard
          label="예상 총수익"
          value={formatCurrency(expectedTotalReturn, 'KRW')}
          detail="연간 세후 분배금 + 평가손익"
          tone={expectedTotalReturn >= 0 ? 'info' : 'negative'}
        />
      </div>
    </div>
  )
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
  const summaryInsight = useMemo(
    () => (results ? calcCoveredCallSummaryInsight(results) : null),
    [results]
  )

  function applyExample(amount: number) {
    if (selectedEtf) {
      setPricePerShare(String(selectedEtf.priceReference))
      setMonthlyDistributionPerShare(String(selectedEtf.monthlyDistributionPerShare))
    }

    setInvestmentAmount(String(amount))
    setError('')
  }

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
      ...calcCoveredCallTotalReturnScenarios({
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
        description="대표 커버드콜 ETF를 선택하고 투자 금액을 넣으면 일반계좌, ISA, 연금계좌 기준 월 세전·세후 현금흐름과 주가 시나리오별 총수익 참고값을 함께 비교합니다."
      >
        <p className="mb-4 text-sm leading-6 text-slate-500">
          처음이면 대표 예시값으로 먼저 계산해본 뒤, 투자 금액과 분배금을 바꿔 보는 흐름이 가장 이해하기 쉽습니다.
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

              <div className="rounded-2xl border border-brand-100 bg-brand-50/80 p-4 sm:col-span-3">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">빠른 예시 입력</p>
                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      {selectedEtf?.name ?? '선택한 ETF'} 기준 가격 {formatCurrency(selectedEtf?.priceReference ?? 0, 'KRW')},
                      주당 월분배금 {formatCurrency(selectedEtf?.monthlyDistributionPerShare ?? 0, 'KRW')}을 기준으로 바로
                      계산해볼 수 있습니다.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exampleInvestmentAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => applyExample(amount)}
                        className="rounded-full border border-brand-200 bg-white px-4 py-2 text-xs font-semibold text-brand-700 transition hover:border-brand-300 hover:bg-brand-50"
                      >
                        {`${Math.round(amount / 10000).toLocaleString()}만원 예시`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

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
        description="월 세전 분배금과 세후 수령액, 연간 누적 현금흐름, 예상 세금을 계좌별로 나란히 비교합니다. 주가 시나리오별 총수익 참고값도 함께 보여줍니다."
      >
        {results ? (
          <div className="grid gap-4">
            {summaryInsight ? (
              <div className="rounded-[1.5rem] border border-sky-200 bg-sky-50/85 p-5 shadow-[0_12px_30px_rgba(14,165,233,0.08)]">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">한눈에 보기</p>
                <div className="mt-4 grid gap-3 lg:grid-cols-2">
                  <div className="rounded-2xl border border-sky-200 bg-white/80 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">가장 유리한 계좌</p>
                    <p className="mt-2 text-base font-semibold text-slate-950">{summaryInsight.leadMessage}</p>
                  </div>
                  <div className="rounded-2xl border border-amber-200 bg-white/80 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">주의 포인트</p>
                    <p className="mt-2 text-base font-semibold text-slate-950">{summaryInsight.cautionMessage}</p>
                  </div>
                </div>
                <p className="mt-4 text-xs leading-5 text-slate-600">입력한 값 기준 참고 해석입니다.</p>
              </div>
            ) : null}

            {results.map((result) => (
              <div
                key={result.accountType}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50/60 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
              >
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950">{accountLabels[result.accountType]}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{accountResultNotes[result.accountType]}</p>
                  </div>
                  <div className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                    보유 수량 {result.quantity.toLocaleString()}주 기준
                  </div>
                </div>

                <div className="mb-4 rounded-2xl border border-slate-200 bg-white/85 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">월별 현금흐름</p>
                  <div className="mt-3 grid gap-4 lg:grid-cols-2">
                    <MetricCard
                      label="월 세후 수령액"
                      value={formatCurrency(result.monthlyNetIncome, 'KRW')}
                      tone="positive"
                      emphasis="hero"
                      detail="세금을 반영한 뒤 매달 손에 들어오는 기준 현금흐름"
                    />
                    <MetricCard
                      label="연간 세후 수령액"
                      value={formatCurrency(result.annualNetIncome, 'KRW')}
                      tone="info"
                      emphasis="hero"
                      detail="12개월 기준으로 누적한 세후 현금흐름"
                    />
                  </div>
                </div>

                <div className="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  <MetricCard
                    label="보유 수량"
                    value={`${result.quantity.toLocaleString()}주`}
                    tone="muted"
                    detail="투자 금액 기준으로 매수 가능한 수량"
                  />
                  <MetricCard
                    label="월 세전 분배금"
                    value={formatCurrency(result.monthlyGrossIncome, 'KRW')}
                    detail="주당 월분배금과 보유 수량을 곱한 세전 금액"
                  />
                  <MetricCard
                    label="연간 예상 세금"
                    value={formatCurrency(result.annualTax, 'KRW')}
                    tone={result.annualTax > 0 ? 'warning' : 'default'}
                    detail={
                      result.accountType === 'pension'
                        ? '현재 비교는 과세이연 기준이며, 실제 수령 시점 과세는 별도로 확인이 필요합니다.'
                        : '현재 가정한 세율과 한도를 반영한 연간 예상 세금'
                    }
                  />
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white/85 p-4">
                  <div className="rounded-2xl border border-brand-100 bg-brand-50/70 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">
                      주가 시나리오 읽는 법
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      월분배가 높아 보여도 주가가 하락하면 실제 남는 총수익은 빠르게 달라질 수 있습니다. 아래 카드는
                      연간 세후 분배금에 주가 변동 손익을 더한 참고값입니다.
                    </p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">하락 시 손실 방어 확인</span>
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">보합 시 현금흐름 확인</span>
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">상승 시 총수익 확인</span>
                  </div>
                  <div className="mt-4 grid gap-4 xl:grid-cols-3">
                    {result.scenarios.map((scenario) => (
                      <ScenarioMetricCard
                        key={scenario.label}
                        label={scenario.label}
                        evaluationProfitLoss={scenario.evaluationProfitLoss}
                        expectedTotalReturn={scenario.expectedTotalReturn}
                      />
                    ))}
                  </div>
                  <p className="mt-4 text-xs leading-5 text-slate-500">
                    이 결과는 기준 가격 대비 단순 시나리오 참고값이며, 실제 분배금 변동과 시장가격 변동은 다를 수 있습니다.
                  </p>
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
