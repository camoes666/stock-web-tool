'use client'

import { useEffect, useState } from 'react'
import { trackCalculatorRun, trackCalculatorView } from '@/lib/analytics'
import { calcReturnRate, type ReturnRateInput } from '@/lib/calculations'
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

export default function ReturnRateCalculator() {
  const [currency, setCurrency] = useStoredCurrency()
  const [buyPrice, setBuyPrice] = useState('')
  const [currentPrice, setCurrentPrice] = useState('')
  const [qty, setQty] = useState('')
  const [brokerFeePercent, setBrokerFeePercent] = useState('0.015')
  const [transactionTaxPercent, setTransactionTaxPercent] = useState('0.20')
  const [extraCost, setExtraCost] = useState('0')
  const [error, setError] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcReturnRate> | null>(null)

  useEffect(() => {
    trackCalculatorView({
      calculator_name: 'return-rate',
      calculator_category: 'stock'
    })
  }, [])

  function handleCalc() {
    const input: ReturnRateInput = {
      buyPrice: Number(buyPrice),
      currentPrice: Number(currentPrice),
      qty: Number(qty),
      brokerFeePercent: Number(brokerFeePercent || '0'),
      transactionTaxPercent: Number(transactionTaxPercent || '0'),
      extraCost: Number(extraCost || '0')
    }
    const brokerFee = input.brokerFeePercent ?? 0
    const transactionTax = input.transactionTaxPercent ?? 0
    const additionalCost = input.extraCost ?? 0

    if (
      [input.buyPrice, input.currentPrice, input.qty, brokerFee, transactionTax, additionalCost].some(
        (value) => Number.isNaN(value)
      )
    ) {
      setError('모든 값을 입력해 주세요.')
      setResult(null)
      return
    }

    if (input.buyPrice <= 0 || input.currentPrice <= 0 || input.qty <= 0) {
      setError('매수가, 현재가, 보유 수량은 모두 0보다 커야 합니다.')
      setResult(null)
      return
    }

    if (!Number.isInteger(input.qty)) {
      setError('보유 수량은 정수만 입력할 수 있습니다.')
      setResult(null)
      return
    }

    if (brokerFee < 0 || transactionTax < 0 || additionalCost < 0) {
      setError('수수료, 거래세, 기타 비용은 0 이상이어야 합니다.')
      setResult(null)
      return
    }

    setError('')
    setResult(calcReturnRate(input))
    trackCalculatorRun({
      calculator_name: 'return-rate',
      calculator_category: 'stock',
      input_count: 6,
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
        title="매수가와 현재가를 입력하세요"
        description="기본 수익률과 실손익을 함께 계산해 현재 포지션의 체감 성과를 빠르게 확인할 수 있습니다."
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-800">표시 통화</p>
            <p className="mt-1 text-xs text-slate-500">입력 금액과 결과 카드는 선택한 통화 기준으로 표시됩니다.</p>
          </div>
          <CurrencySelector value={currency} onChange={setCurrency} />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <CalculatorField
            label={`매수가 (${currencyLabel})`}
            value={buyPrice}
            onChange={setBuyPrice}
            placeholder="50000"
            helpText={`평균 매수 단가를 입력하세요. 예: ${moneyExample}`}
          />
          <CalculatorField
            label={`현재가 (${currencyLabel})`}
            value={currentPrice}
            onChange={setCurrentPrice}
            placeholder="55000"
            helpText={`현재 평가 기준 가격입니다. 예: ${moneyExample}`}
          />
          <CalculatorField
            label="보유 수량"
            value={qty}
            onChange={setQty}
            placeholder="20"
            step="1"
            helpText="현재 보유한 주식 수량"
          />
        </div>

        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
          <p className="text-sm font-semibold text-slate-900">실손익 옵션</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            수수료와 거래세를 반영해 명목 수익과 실제 수익 차이를 함께 확인합니다.
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
          <CalculatorActionButton onClick={handleCalc}>수익률 계산하기</CalculatorActionButton>
          {error ? <CalculatorError>{error}</CalculatorError> : null}
        </div>
      </CalculatorSection>

      <CalculatorSection
        eyebrow="Result"
        title="현재 포지션 성과"
        description="명목 손익과 실손익을 나눠 보여줘 비용 반영 전후의 차이를 한눈에 비교할 수 있습니다."
      >
        {result ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <ResultCard
              label="평가금액"
              value={formatCurrency(result.evaluationAmount, currency)}
              tone="muted"
              detail="현재가 기준 총 평가금액"
            />
            <ResultCard
              label="명목 손익"
              value={formatCurrency(result.profitLoss, currency)}
              tone={result.profitLoss >= 0 ? 'positive' : 'negative'}
              detail="비용을 제외한 기본 손익"
            />
            <ResultCard
              label="명목 수익률"
              value={`${result.returnPercent.toFixed(2)}%`}
              tone={result.returnPercent >= 0 ? 'positive' : 'negative'}
              detail="매수가 기준 기본 수익률"
            />
            <ResultCard
              label="총 비용"
              value={formatCurrency(result.totalCost, currency)}
              tone="default"
              detail="매수·매도 수수료, 거래세, 기타 비용 합계"
            />
            <ResultCard
              label="실손익"
              value={formatCurrency(result.realProfitLoss, currency)}
              tone={result.realProfitLoss >= 0 ? 'positive' : 'negative'}
              detail="비용을 모두 반영한 실제 손익"
            />
            <ResultCard
              label="실수익률"
              value={`${result.realReturnPercent.toFixed(2)}%`}
              tone={result.realReturnPercent >= 0 ? 'positive' : 'negative'}
              detail="실손익 기준 수익률"
            />
            <ResultCard
              label="손익분기 가격"
              value={formatCurrency(result.breakEvenPrice, currency)}
              tone="muted"
              detail="수수료와 거래세를 반영한 본전 기준 가격"
            />
          </div>
        ) : (
          <EmptyResult
            title="계산 결과가 아직 없습니다."
            description="매수가, 현재가, 보유 수량을 입력하면 명목 손익과 실손익이 여기에 표시됩니다."
          />
        )}
        {result ? (
          <p className="mt-4 text-xs leading-5 text-slate-500">
            실손익은 입력한 수수료, 거래세, 기타 비용을 기준으로 계산한 참고값입니다. 실제 거래 조건과 세율은 증권사 정책에 따라 달라질 수 있습니다.
          </p>
        ) : null}
      </CalculatorSection>
    </div>
  )
}
