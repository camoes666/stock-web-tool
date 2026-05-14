'use client'

import { useEffect, useState } from 'react'
import { trackCalculatorRun, trackCalculatorView } from '@/lib/analytics'
import { calcAveragingDownTarget, type AveragingDownTargetInput } from '@/lib/calculations'
import {
  CalculatorActionButton,
  CalculatorError,
  CalculatorField,
  CalculatorSection,
  CurrencySelector,
  EmptyResult,
  ResultCard,
  TradingCostFields,
  formatCurrency,
  getCurrencyExample,
  getCurrencyLabel,
  useStoredCurrency
} from '@/components/calculators/shared'

export default function AveragingDownTargetCalculator() {
  const [currency, setCurrency] = useStoredCurrency()
  const [avgPrice, setAvgPrice] = useState('')
  const [qty, setQty] = useState('')
  const [currentPrice, setCurrentPrice] = useState('')
  const [targetAvgPrice, setTargetAvgPrice] = useState('')
  const [brokerFeePercent, setBrokerFeePercent] = useState('0.015')
  const [transactionTaxPercent, setTransactionTaxPercent] = useState('0.20')
  const [extraCost, setExtraCost] = useState('0')
  const [error, setError] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcAveragingDownTarget> | null>(null)

  useEffect(() => {
    trackCalculatorView({
      calculator_name: 'averaging-down-target',
      calculator_category: 'stock'
    })
  }, [])

  function handleCalc() {
    const input: AveragingDownTargetInput = {
      avgPrice: Number(avgPrice),
      qty: Number(qty),
      currentPrice: Number(currentPrice),
      targetAvgPrice: Number(targetAvgPrice),
      brokerFeePercent: Number(brokerFeePercent || '0'),
      transactionTaxPercent: Number(transactionTaxPercent || '0'),
      extraCost: Number(extraCost || '0')
    }
    const brokerFee = input.brokerFeePercent ?? 0
    const transactionTax = input.transactionTaxPercent ?? 0
    const additionalCost = input.extraCost ?? 0

    if (
      [input.avgPrice, input.qty, input.currentPrice, input.targetAvgPrice, brokerFee, transactionTax, additionalCost].some(
        (value) => Number.isNaN(value)
      )
    ) {
      setError('모든 값을 입력해 주세요.')
      setResult(null)
      return
    }

    if (input.avgPrice <= 0 || input.qty <= 0 || input.currentPrice <= 0 || input.targetAvgPrice <= 0) {
      setError('모든 입력값은 0보다 커야 합니다.')
      setResult(null)
      return
    }

    if (!Number.isInteger(input.qty)) {
      setError('보유 수량은 정수만 입력할 수 있습니다.')
      setResult(null)
      return
    }

    if (input.targetAvgPrice <= input.currentPrice) {
      setError('목표 평균단가는 현재가보다 높아야 합니다.')
      setResult(null)
      return
    }

    if (input.targetAvgPrice >= input.avgPrice) {
      setError('목표 평균단가는 현재 평균단가보다 낮아야 합니다.')
      setResult(null)
      return
    }

    if (brokerFee < 0 || transactionTax < 0 || additionalCost < 0) {
      setError('수수료, 거래세, 기타 비용은 0 이상이어야 합니다.')
      setResult(null)
      return
    }

    setError('')
    setResult(calcAveragingDownTarget(input))
    trackCalculatorRun({
      calculator_name: 'averaging-down-target',
      calculator_category: 'stock',
      input_count: 7,
      fee_enabled: brokerFee > 0 || additionalCost > 0,
      tax_enabled: transactionTax > 0
    })
  }

  const moneyExample = getCurrencyExample(currency)
  const currencyLabel = getCurrencyLabel(currency)

  return (
    <div className="grid gap-5">
      <CalculatorSection
        eyebrow="Input"
        title="목표 평균단가를 입력하세요"
        description="현재 평균단가와 현재가 사이에서 어느 지점까지 낮추고 싶은지 정하면 필요한 추가 수량과 실제 필요 자금을 계산합니다."
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-800">표시 통화</p>
            <p className="mt-1 text-xs text-slate-500">단가와 필요 자금은 선택한 통화 기준으로 표시됩니다.</p>
          </div>
          <CurrencySelector value={currency} onChange={setCurrency} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <CalculatorField
            label={`현재 평균단가 (${currencyLabel})`}
            value={avgPrice}
            onChange={setAvgPrice}
            placeholder="50000"
            helpText={`현재 평균 매입 단가입니다. 예: ${moneyExample}`}
          />
          <CalculatorField
            label="보유 수량"
            value={qty}
            onChange={setQty}
            placeholder="100"
            step="1"
            helpText="현재 보유 중인 주식 수량"
          />
          <CalculatorField
            label={`현재가 (${currencyLabel})`}
            value={currentPrice}
            onChange={setCurrentPrice}
            placeholder="40000"
            helpText={`추가 매수 기준 가격입니다. 예: ${moneyExample}`}
          />
          <CalculatorField
            label={`목표 평균단가 (${currencyLabel})`}
            value={targetAvgPrice}
            onChange={setTargetAvgPrice}
            placeholder="45000"
            helpText={`낮추고 싶은 목표 평균단가입니다. 예: ${moneyExample}`}
          />
        </div>

        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
          <p className="text-sm font-semibold text-slate-900">실손익 옵션</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            추가 매수 비용을 함께 반영해 실제 필요 자금과 예상 체감 단가를 확인합니다.
          </p>
          <div className="mt-4">
            <TradingCostFields
              brokerFeePercent={brokerFeePercent}
              transactionTaxPercent={transactionTaxPercent}
              extraCost={extraCost}
              onBrokerFeePercentChange={setBrokerFeePercent}
              onTransactionTaxPercentChange={setTransactionTaxPercent}
              onExtraCostChange={setExtraCost}
            />
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <CalculatorActionButton onClick={handleCalc}>추가 매수량 계산하기</CalculatorActionButton>
          {error ? <CalculatorError>{error}</CalculatorError> : null}
        </div>
      </CalculatorSection>

      <CalculatorSection
        eyebrow="Result"
        title="목표 평균단가를 위한 추가 매수 계획"
        description="필요한 수량과 자금을 명목 기준과 실질 기준으로 나눠 보여줘 실제 집행 계획을 세우기 쉽게 정리합니다."
      >
        {result ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <ResultCard
              label="필요 추가 수량"
              value={`${result.requiredQty.toLocaleString('ko-KR')}주`}
              tone="muted"
              detail="목표 평균단가 달성에 필요한 추가 매수 수량"
            />
            <ResultCard
              label="명목 필요 자금"
              value={formatCurrency(result.requiredInvestment, currency)}
              tone="default"
              detail="현재가 기준 추가 매수 총액"
            />
            <ResultCard
              label="명목 예상 단가"
              value={formatCurrency(result.estimatedAvgPrice, currency)}
              tone="positive"
              detail="추가 매수 후 예상 평균단가"
            />
            <ResultCard
              label="총 비용"
              value={formatCurrency(result.totalCost, currency)}
              tone="default"
              detail="추가 매수 수수료와 기타 비용 합계"
            />
            <ResultCard
              label="실질 필요 자금"
              value={formatCurrency(result.realRequiredInvestment, currency)}
              tone="muted"
              detail="비용까지 포함한 실제 필요 자금"
            />
            <ResultCard
              label="실질 예상 단가"
              value={formatCurrency(result.realEstimatedAvgPrice, currency)}
              tone="positive"
              detail="비용을 포함한 체감 평균단가"
            />
          </div>
        ) : (
          <EmptyResult
            title="추가 매수 계획이 여기에 표시됩니다."
            description="현재 평균단가, 현재가, 목표 평균단가를 입력한 뒤 계산해 보세요."
          />
        )}
        {result ? (
          <p className="mt-4 text-xs leading-5 text-slate-500">
            실질 필요 자금은 입력한 수수료와 기타 비용을 기준으로 계산한 참고값입니다. 실제 주문 체결 조건과 비용 구조에 따라 달라질 수 있습니다.
          </p>
        ) : null}
      </CalculatorSection>
    </div>
  )
}
