import type { Metadata } from 'next'
import ReturnRateCalculator from '@/components/calculators/ReturnRateCalculator'
import JsonLd from '@/components/JsonLd'
import CalculatorLayout from '@/components/layout/CalculatorLayout'

export const metadata: Metadata = {
  title: '수익률 계산기 - 평가손익과 수익률 계산',
  description:
    '매수 단가와 현재 가격, 보유 수량을 입력하면 평가금액과 손익, 수익률을 계산할 수 있습니다. 현재 포지션의 성과를 빠르게 점검할 때 유용합니다.'
}

const explainer = (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold text-slate-900">어떤 판단에 도움이 되나요?</h2>
    <p>수익률 계산기는 현재 포지션이 어느 정도 수익 또는 손실 구간에 있는지 빠르게 점검할 때 유용합니다.</p>
    <h2 className="text-lg font-semibold text-slate-900">계산식</h2>
    <p>현재 가격과 수량으로 평가금액을 계산하고, 매수 단가와의 차이로 평가손익과 수익률을 산출합니다.</p>
    <h2 className="text-lg font-semibold text-slate-900">활용 팁</h2>
    <p>목표가 계산기와 함께 보면 현재 수익률과 앞으로의 익절 기준을 한 흐름에서 점검할 수 있습니다.</p>
  </div>
)

export default function ReturnRatePage() {
  return (
    <>
      <JsonLd name="수익률 계산기" description="평가금액과 손익, 수익률을 계산하는 주식 도구" path="/calculators/return-rate" />
      <CalculatorLayout
        title="수익률 계산기"
        description="매수 단가와 현재 가격을 기준으로 평가손익과 수익률을 빠르게 점검합니다."
        currentSlug="return-rate"
        explainerContent={explainer}
      >
        <ReturnRateCalculator />
      </CalculatorLayout>
    </>
  )
}
