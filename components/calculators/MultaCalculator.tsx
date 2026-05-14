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
  TradingCostFields,
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
  const [brokerFeePercent, setBrokerFeePercent] = useState('0.015')
  const [transactionTaxPercent, setTransactionTaxPercent] = useState('0.20')
  const [extraCost, setExtraCost] = useState('0')
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
      addQty: Number(addQty),
      brokerFeePercent: Number(brokerFeePercent || '0'),
      transactionTaxPercent: Number(transactionTaxPercent || '0'),
      extraCost: Number(extraCost || '0')
    }
    const brokerFee = input.brokerFeePercent ?? 0
    const transactionTax = input.transactionTaxPercent ?? 0
    const additionalCost = input.extraCost ?? 0

    if (
      [input.avgPrice, input.qty, input.addPrice, input.addQty, brokerFee, transactionTax, additionalCost].some(
        (value) => Number.isNaN(value)
      )
    ) {
      setError('모든 값을 입력해 주세요.')
      setResult(null)
      return
    }

    if (input.avgPrice <= 0 || input.qty <= 0 || input.addPrice <= 0 || input.addQty <= 0) {
      setError('현재 단가, 보유 수량, 추가 매수가, 추가 수량은 모두 0보다 커야 합니다.')
      setResult(null)
      return
    }

    if (!Number.isInteger(input.qty) || !Number.isInteger(input.addQty)) {
      setError('보유 수량과 추가 수량은 정수만 입력할 수 있습니다.')
      setResult(null)
      return
    }

    if (brokerFee < 0 || transactionTax < 0 || additionalCost < 0) {
      setError('수수료, 거래세, 기타 비용은 0 이상이어야 합니다.')
      setResult(null)
      return
    }

    setError('')
    setResult(calcMulta(input))
    trackCalculatorRun({
      calculator_name: 'multa',
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
        title="현재 보유분과 추가 매수 조건을 입력하세요"
        description="기본 평균단가와 비용 반영 체감 단가를 함께 계산해 물타기 이후 자금 구조를 더 현실적으로 볼 수 있습니다."
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-800">표시 통화</p>
            <p className="mt-1 text-xs text-slate-500">입력 금액과 결과 카드는 선택한 통화 기준으로 표시됩니다.</p>
          </div>
          <CurrencySelector value={currency} onChange={setCurrency} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <CalculatorField
            label={`현재 평균단가 (${currencyLabel})`}
            value={avgPrice}
            onChange={setAvgPrice}
            placeholder="50000"
            helpText={`현재 보유 주식의 평균 매입 단가입니다. 예: ${moneyExample}`}
          />
          <CalculatorField
            label="보유 수량"
            value={qty}
            onChange={setQty}
            placeholder="100"
            step="1"
            helpText="현재 보유하고 있는 주식 수량"
          />
          <CalculatorField
            label={`추가 매수가 (${currencyLabel})`}
            value={addPrice}
            onChange={setAddPrice}
            placeholder="40000"
            helpText={`추가 매수할 가격입니다. 예: ${moneyExample}`}
          />
          <CalculatorField
            label="추가 수량"
            value={addQty}
            onChange={setAddQty}
            placeholder="50"
            step="1"
            helpText="추가로 매수할 주식 수량"
          />
        </div>

        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
          <p className="text-sm font-semibold text-slate-900">실손익 옵션</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            추가 매수 수수료와 거래세를 반영해 체감 평균단가와 손익분기 가격을 함께 계산합니다.
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
          <CalculatorActionButton onClick={handleCalc}>평균단가 계산하기</CalculatorActionButton>
          {error ? <CalculatorError>{error}</CalculatorError> : null}
        </div>
      </CalculatorSection>

      <CalculatorSection
        eyebrow="Result"
        title="추가 매수 이후 평균 단가"
        description="명목 기준 평균단가와 비용을 반영한 체감 단가를 함께 보여줘 실전 매수 계획에 바로 활용할 수 있습니다."
      >
        {result ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <ResultCard
              label="명목 평균단가"
              value={formatCurrency(result.newAvgPrice, currency)}
              tone="muted"
              detail="추가 매수까지 반영한 기본 평균 매입 단가"
            />
            <ResultCard
              label="총투자금"
              value={formatCurrency(result.totalInvestment, currency)}
              tone="default"
              detail="기존 보유분과 추가 매수분을 합친 금액"
            />
            <ResultCard
              label="손익분기 가격"
              value={formatCurrency(result.breakEven, currency)}
              tone="positive"
              detail="수수료와 거래세를 반영한 본전 기준 가격"
            />
            <ResultCard
              label="총 비용"
              value={formatCurrency(result.totalCost, currency)}
              tone="default"
              detail="추가 매수 수수료와 기타 비용 합계"
            />
            <ResultCard
              label="실질 총투자금"
              value={formatCurrency(result.realTotalInvestment, currency)}
              tone="muted"
              detail="총투자금에 비용까지 포함한 실제 투입 금액"
            />
            <ResultCard
              label="체감 평균단가"
              value={formatCurrency(result.effectiveAvgPrice, currency)}
              tone="default"
              detail="비용을 포함한 주당 체감 단가"
            />
          </div>
        ) : (
          <EmptyResult
            title="입력값을 채우면 평균단가가 여기에 표시됩니다."
            description="보유 평균단가와 추가 매수 조건을 입력한 뒤 계산 버튼을 눌러 주세요."
          />
        )}
        {result ? (
          <p className="mt-4 text-xs leading-5 text-slate-500">
            손익분기 가격은 입력한 수수료와 거래세를 기준으로 계산한 참고값입니다. 실제 주문 조건과 세금 부과 기준은 증권사와 시장에 따라 달라질 수 있습니다.
          </p>
        ) : null}
      </CalculatorSection>
    </div>
  )
}
