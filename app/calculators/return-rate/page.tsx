import type { Metadata } from 'next'
import ReturnRateCalculator from '@/components/calculators/ReturnRateCalculator'
import JsonLd from '@/components/JsonLd'
import CalculatorLayout from '@/components/layout/CalculatorLayout'

export const metadata: Metadata = {
  title: '수익률 계산기 - 평가손익과 실손익 계산',
  description:
    '매수가, 현재가, 보유 수량을 입력하면 평가금액, 손익, 수익률과 비용 반영 실손익까지 계산할 수 있습니다.'
}

const explainer = (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold text-slate-900">언제 쓰면 좋을까요?</h2>
    <p>
      현재 보유 중인 종목이 어느 정도 수익 구간에 있는지, 수수료와 세금까지 고려하면 실제로 얼마가 남는지 빠르게 보고 싶을 때 유용합니다.
    </p>
    <h2 className="text-lg font-semibold text-slate-900">어떻게 계산하나요?</h2>
    <p>
      현재가와 수량으로 평가금액을 계산한 뒤, 매수가 기준 손익과 수익률을 구합니다. 여기에 수수료, 거래세, 기타 비용을 더해 실손익과 실수익률도 함께 보여줍니다.
    </p>
    <h2 className="text-lg font-semibold text-slate-900">어디에 활용하나요?</h2>
    <p>
      목표가 계산기와 함께 보면 현재 수익 상태와 다음 매매 기준을 같은 흐름에서 확인할 수 있습니다.
    </p>
  </div>
)

export default function ReturnRatePage() {
  return (
    <>
      <JsonLd
        name="수익률 계산기"
        description="평가금액, 손익, 수익률과 실손익을 계산하는 주식 도구"
        path="/calculators/return-rate"
      />
      <CalculatorLayout
        title="수익률 계산기"
        description="매수가와 현재가를 기준으로 평가손익과 수익률, 비용 반영 실손익까지 빠르게 계산합니다."
        currentSlug="return-rate"
        explainerContent={explainer}
      >
        <ReturnRateCalculator />
      </CalculatorLayout>
    </>
  )
}
